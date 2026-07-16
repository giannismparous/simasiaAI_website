import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './ChatWindow.css';
import { answerQuestion } from '../chatbot/services/chatService';
import { useLanguage } from '../contexts/LanguageContext';
import SimakiAvatar from './SimakiAvatar';

const msgEase = [0.16, 1, 0.3, 1];
/** Fast reveal: ms between ticks; multiple chars per tick. */
const TYPE_MS = 6;
const CHARS_PER_TICK = 3;
const SOURCE_CHARS_PER_TICK = 4;
const SOURCE_GAP_MS = 28;

function renderMessageText(text) {
  const parts = String(text || '').split(/(\/#contact|\/book-demo)/gi);
  return parts.map((part, i) => {
    if (/^\/book-demo$/i.test(part)) {
      return (
        <Link key={`bd-${i}`} to="/book-demo" className="message-inline-link">
          /book-demo
        </Link>
      );
    }
    if (/^\/#contact$/i.test(part)) {
      return (
        <Link
          key={`ct-${i}`}
          to={{ pathname: '/', hash: 'contact' }}
          className="message-inline-link"
        >
          /#contact
        </Link>
      );
    }
    return <React.Fragment key={`t-${i}`}>{part}</React.Fragment>;
  });
}

function ChatWindow({ onClose, isClosing, messages, setMessages, initialShowOptions = false }) {
  const { language } = useLanguage();
  const lastResolvedQueryRef = useRef('');

  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showOptions, setShowOptions] = useState(initialShowOptions);
  const [inputFocused, setInputFocused] = useState(false);
  const [hasPrefilled, setHasPrefilled] = useState(false);
  const inputRef = useRef(null);
  const panelRef = useRef(null);
  const typewriterRef = useRef(null);

  const suggestedQuestions = useMemo(() => {
    return language === 'el'
      ? [
          { id: 1, text: 'Τι μπορεί να κάνει το DialogosAI για μένα;' },
          { id: 2, text: 'Πώς βοηθά η SimasiaAI οργανισμούς;' },
          { id: 3, text: 'Μπορώ να κλείσω demo;' },
        ]
      : [
          { id: 1, text: 'What can DialogosAI do for me?' },
          { id: 2, text: 'How does SimasiaAI help organizations?' },
          { id: 3, text: 'Can I book a demo?' },
        ];
  }, [language]);

  const hasConversation = messages.length > 0;
  const showSuggestionChips = showOptions && !isLoading;
  const isIdle = !hasConversation;

  useEffect(() => {
    if (initialShowOptions && !hasPrefilled && messages.length === 0) {
      setInputValue(suggestedQuestions[0].text);
      setHasPrefilled(true);
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [initialShowOptions, hasPrefilled, messages.length, suggestedQuestions]);

  useEffect(() => {
    return () => {
      if (typewriterRef.current?.timer) clearTimeout(typewriterRef.current.timer);
    };
  }, []);

  const stopTypewriter = () => {
    if (typewriterRef.current?.timer) {
      clearTimeout(typewriterRef.current.timer);
      typewriterRef.current.timer = null;
    }
  };

  /**
   * Reveal bot text, then Πηγές label + each source title, with a smooth typewriter.
   */
  const startTypewriter = (botId, initialTarget = '') => {
    stopTypewriter();
    const sourcesLabel = language === 'el' ? 'Πηγές' : 'Sources';
    const state = {
      botId,
      target: initialTarget,
      shown: 0,
      sources: [],
      confidence: 0,
      bookDemoCta: false,
      contactCta: false,
      done: false,
      phase: 'text', // text → sourcesLabel → sourcesItems → idle
      labelTarget: sourcesLabel,
      labelShown: 0,
      sourceIndex: 0,
      sourceChar: 0,
      timer: null,
    };
    typewriterRef.current = state;

    const patchBot = (patch) => {
      setMessages((prev) =>
        prev.map((m) => (m.id === botId ? { ...m, ...patch } : m))
      );
    };

    const tick = () => {
      const tw = typewriterRef.current;
      if (!tw || tw.botId !== botId) return;

      if (tw.phase === 'text') {
        if (tw.shown < tw.target.length) {
          tw.shown = Math.min(tw.target.length, tw.shown + CHARS_PER_TICK);
          patchBot({
            text: tw.target.slice(0, tw.shown),
            isTyping: true,
            isTypingSources: false,
            sources: [],
            typedSourcesLabel: '',
            typedSourceCount: 0,
            typingSourceTitle: '',
            confidence: 0,
          });
          tw.timer = setTimeout(tick, TYPE_MS);
          return;
        }

        if (!tw.done) {
          tw.timer = setTimeout(tick, 28);
          return;
        }

        // Text finished — move to sources (or finish if none)
        if (!tw.sources?.length) {
          patchBot({
            text: tw.target,
            sources: [],
            confidence: tw.confidence,
            bookDemoCta: tw.bookDemoCta,
            contactCta: tw.contactCta,
            isTyping: false,
            isTypingSources: false,
            typedSourcesLabel: '',
            typedSourceCount: 0,
            typingSourceTitle: '',
          });
          tw.timer = null;
          return;
        }

        tw.phase = 'sourcesLabel';
        tw.labelShown = 0;
        patchBot({
          text: tw.target,
          isTyping: false,
          isTypingSources: true,
          sources: tw.sources,
          bookDemoCta: tw.bookDemoCta,
          contactCta: tw.contactCta,
          typedSourcesLabel: '',
          typedSourceCount: 0,
          typingSourceTitle: '',
          confidence: tw.confidence,
        });
        tw.timer = setTimeout(tick, SOURCE_GAP_MS);
        return;
      }

      if (tw.phase === 'sourcesLabel') {
        if (tw.labelShown < tw.labelTarget.length) {
          tw.labelShown = Math.min(tw.labelTarget.length, tw.labelShown + SOURCE_CHARS_PER_TICK);
          patchBot({
            typedSourcesLabel: tw.labelTarget.slice(0, tw.labelShown),
            isTypingSources: true,
          });
          tw.timer = setTimeout(tick, TYPE_MS);
          return;
        }
        tw.phase = 'sourcesItems';
        tw.sourceIndex = 0;
        tw.sourceChar = 0;
        tw.timer = setTimeout(tick, SOURCE_GAP_MS);
        return;
      }

      if (tw.phase === 'sourcesItems') {
        const list = tw.sources || [];
        if (tw.sourceIndex >= list.length) {
          patchBot({
            text: tw.target,
            sources: list,
            confidence: tw.confidence,
            bookDemoCta: tw.bookDemoCta,
            contactCta: tw.contactCta,
            isTyping: false,
            isTypingSources: false,
            typedSourcesLabel: tw.labelTarget,
            typedSourceCount: list.length,
            typingSourceTitle: '',
          });
          tw.timer = null;
          return;
        }

        const title = String(list[tw.sourceIndex]?.title || '');
        if (tw.sourceChar < title.length) {
          tw.sourceChar = Math.min(title.length, tw.sourceChar + SOURCE_CHARS_PER_TICK);
          patchBot({
            typedSourcesLabel: tw.labelTarget,
            typedSourceCount: tw.sourceIndex,
            typingSourceTitle: title.slice(0, tw.sourceChar),
            isTypingSources: true,
          });
          tw.timer = setTimeout(tick, TYPE_MS);
          return;
        }

        tw.sourceIndex += 1;
        tw.sourceChar = 0;
        patchBot({
          typedSourcesLabel: tw.labelTarget,
          typedSourceCount: tw.sourceIndex,
          typingSourceTitle: '',
          isTypingSources: true,
        });
        tw.timer = setTimeout(tick, SOURCE_GAP_MS);
        return;
      }
    };

    state.timer = setTimeout(tick, TYPE_MS);
    return state;
  };

  const updateTypewriterTarget = (
    botId,
    target,
    { done = false, sources = [], confidence = 0, bookDemoCta = false, contactCta = false } = {}
  ) => {
    const tw = typewriterRef.current;
    if (!tw || tw.botId !== botId) return;
    tw.target = String(target || '');
    if (done) {
      tw.done = true;
      tw.sources = sources || [];
      tw.confidence = confidence || 0;
      tw.bookDemoCta = Boolean(bookDemoCta);
      tw.contactCta = Boolean(contactCta);
    }
  };

  const sendUserMessage = async (userText) => {
    if (!userText.trim() || isLoading) return;

    setShowOptions(false);
    const historyBeforeSend = messages.slice();
    const previousResolvedQuery = lastResolvedQueryRef.current;
    const botId = Date.now() + 1;

    setMessages((prev) => [...prev, { id: Date.now(), text: userText.trim(), sender: 'user' }]);
    lastResolvedQueryRef.current = userText.trim();
    setIsLoading(true);

    let streamMounted = false;
    let streamBuffer = '';

    try {
      const response = await answerQuestion(userText.trim(), null, {
        messages: historyBeforeSend,
        lastResolvedQuery: previousResolvedQuery,
        uiLanguage: language,
        stream: true,
        onChunk: (chunk) => {
          if (!chunk) return;
          streamBuffer += chunk;
          if (!streamMounted) {
            streamMounted = true;
            setMessages((prev) => [
              ...prev,
              {
                id: botId,
                text: '',
                sender: 'bot',
                sources: [],
                confidence: 0,
                isTyping: true,
                isTypingSources: false,
                typedSourcesLabel: '',
                typedSourceCount: 0,
                typingSourceTitle: '',
              },
            ]);
            startTypewriter(botId, streamBuffer);
          } else {
            updateTypewriterTarget(botId, streamBuffer);
          }
        },
      });

      const finalAnswer = response.answer || streamBuffer || '';
      if (!streamMounted) {
        streamMounted = true;
        setMessages((prev) => [
          ...prev,
          {
            id: botId,
            text: '',
            sender: 'bot',
            sources: [],
            confidence: 0,
            isTyping: true,
            isTypingSources: false,
            typedSourcesLabel: '',
            typedSourceCount: 0,
            typingSourceTitle: '',
          },
        ]);
        startTypewriter(botId, finalAnswer);
      }
      updateTypewriterTarget(botId, finalAnswer, {
        done: true,
        sources: response.sources || [],
        confidence: response.confidence,
        bookDemoCta: Boolean(response.bookDemoCta),
        contactCta: Boolean(response.contactCta),
      });
    } catch (error) {
      stopTypewriter();
      const errText =
        language === 'el'
          ? 'Συγγνώμη, κάτι πήγε στραβά. Προσπάθησε ξανά.'
          : 'Sorry, something went wrong. Please try again.';
      setMessages((prev) => {
        if (streamMounted) {
          return prev.map((m) =>
            m.id === botId
              ? {
                  ...m,
                  text: errText,
                  sources: [],
                  isTyping: false,
                  isTypingSources: false,
                  typedSourcesLabel: '',
                  typedSourceCount: 0,
                  typingSourceTitle: '',
                }
              : m
          );
        }
        return [...prev, { id: botId, text: errText, sender: 'bot' }];
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;
    const userText = inputValue.trim();
    setInputValue('');
    await sendUserMessage(userText);
  };

  const handleQuestionClick = (question) => {
    if (isLoading) return;
    setInputValue(question.text);
    setShowOptions(true);
    inputRef.current?.focus();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const openOptions = () => {
    setShowOptions(true);
    inputRef.current?.focus();
  };

  return (
    <div
      ref={panelRef}
      className={`chat-window${isIdle ? ' chat-window-idle' : ''}${isClosing ? ' chat-closing' : ''}`}
    >
      <header className="chat-header">
        <div className="chat-header-content">
          <div className="bot-avatar">
            <SimakiAvatar size={32} />
          </div>
          <div className="bot-info">
            <h3><em className="brand-dialogos">DialogosAI</em></h3>
            {isLoading && (
              <span className="bot-status bot-status-typing">
                {language === 'el' ? 'Σκέφτεται' : 'Thinking'}
                <span className="status-typing-dots" aria-hidden="true">
                  <span /><span /><span />
                </span>
              </span>
            )}
          </div>
        </div>
        <button
          type="button"
          className="close-chat-btn"
          onClick={onClose}
          aria-label={language === 'el' ? 'Κλείσιμο' : 'Close chat'}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </header>

      <div className="chat-top">
        <AnimatePresence>
          {showSuggestionChips && (
            <motion.div
              className="chat-suggestions"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.28, ease: msgEase }}
            >
              {suggestedQuestions.map((question, i) => (
                <motion.button
                  key={question.id}
                  type="button"
                  className="suggestion-chip"
                  onClick={() => handleQuestionClick(question)}
                  disabled={isLoading}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.06 * i, ease: msgEase }}
                >
                  {question.text}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="chat-body" aria-live="polite">
        {hasConversation && (
          <>
            <AnimatePresence initial={false}>
              {messages.map((message) => (
              <motion.div
                key={message.id}
                className={`chat-row chat-row-${message.sender}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.32, ease: msgEase }}
              >
                {message.sender === 'bot' && (
                  <div className="chat-row-avatar" aria-hidden="true">
                    <SimakiAvatar size={26} />
                  </div>
                )}
                <div className={`message-bubble ${message.sender}-message`}>
                  <p className={`message-text${message.isTyping ? ' is-typing' : ''}`}>
                    {message.isTyping ? message.text : renderMessageText(message.text)}
                    {message.isTyping && <span className="typing-cursor" aria-hidden="true" />}
                  </p>
                  {!message.isTyping && !message.isTypingSources && message.bookDemoCta && (
                    <Link to="/book-demo" className="message-demo-cta" onClick={onClose}>
                      {language === 'el' ? 'Άνοιγμα φόρμας Demo' : 'Open Demo form'}
                    </Link>
                  )}
                  {!message.isTyping && !message.isTypingSources && message.contactCta && (
                    <Link
                      to={{ pathname: '/', hash: 'contact' }}
                      className="message-demo-cta"
                      onClick={onClose}
                    >
                      {language === 'el' ? 'Άνοιγμα φόρμας επικοινωνίας' : 'Open contact form'}
                    </Link>
                  )}
                  {(() => {
                    const hasSources = (message.sources || []).length > 0;
                    const revealing = Boolean(message.isTypingSources);
                    const finished = !message.isTyping && !revealing && hasSources;
                    if (!revealing && !finished) return null;

                    const label =
                      message.typedSourcesLabel ||
                      (finished ? (language === 'el' ? 'Πηγές' : 'Sources') : '');
                    const doneCount = finished
                      ? message.sources.length
                      : message.typedSourceCount || 0;
                    const doneItems = (message.sources || []).slice(0, doneCount);
                    const typingTitle = revealing ? message.typingSourceTitle : '';
                    const typingLabel =
                      revealing && doneCount === 0 && !typingTitle;

                    return (
                      <div className={`message-sources${revealing ? ' is-typing' : ''}`}>
                        {label && (
                          <p className="sources-label">
                            {label}
                            {typingLabel && (
                              <span className="typing-cursor typing-cursor-inline" aria-hidden="true" />
                            )}
                          </p>
                        )}
                        <ul>
                          {doneItems.map((source, idx) => {
                            const isHashContact =
                              source.url === '/#contact' || source.url === '/#contact/';
                            return (
                            <li key={`${source.url}-${idx}`}>
                              {isHashContact ? (
                                <Link to={{ pathname: '/', hash: 'contact' }} onClick={onClose}>
                                  {source.title}
                                </Link>
                              ) : source.url.startsWith('/') ? (
                                <Link to={source.url} onClick={onClose}>{source.title}</Link>
                              ) : (
                                <a href={source.url} target="_blank" rel="noopener noreferrer">
                                  {source.title}
                                </a>
                              )}
                            </li>
                            );
                          })}
                          {typingTitle ? (
                            <li className="source-typing">
                              <span>{typingTitle}</span>
                              <span className="typing-cursor typing-cursor-inline" aria-hidden="true" />
                            </li>
                          ) : null}
                        </ul>
                      </div>
                    );
                  })()}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isLoading && messages[messages.length - 1]?.sender !== 'bot' && (
            <div className="chat-row chat-row-bot">
              <div className="chat-row-avatar" aria-hidden="true">
                <SimakiAvatar size={26} />
              </div>
              <div className="message-bubble bot-message loading">
                <div className="typing-indicator" aria-label="Typing">
                  <span /><span /><span />
                </div>
              </div>
            </div>
          )}

          </>
        )}
      </div>

      <footer className="chat-footer">
        <div
          className={`chat-input-bar${inputFocused ? ' is-focused' : ''}`}
          onClick={openOptions}
          role="presentation"
        >
          <div className="chat-input-wrap">
            <input
              ref={inputRef}
              type="text"
              placeholder={language === 'el' ? 'Ρωτήστε οτιδήποτε...' : 'Ask anything...'}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onFocus={() => {
                setInputFocused(true);
                setShowOptions(true);
              }}
              onBlur={() => setInputFocused(false)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              className="chat-input"
              aria-label={language === 'el' ? 'Ρωτήστε οτιδήποτε' : 'Ask anything'}
            />
          </div>
          <button
            type="button"
            className={`chat-send-btn${inputValue.trim() ? ' is-active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              handleSendMessage();
            }}
            disabled={isLoading || !inputValue.trim()}
            aria-label={language === 'el' ? 'Αποστολή' : 'Send'}
          >
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M8 3V13M8 3L4.5 6.5M8 3L11.5 6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </footer>
    </div>
  );
}

export default ChatWindow;
