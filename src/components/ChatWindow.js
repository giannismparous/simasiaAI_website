import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './ChatWindow.css';
import { answerQuestion } from '../chatbot/services/chatService';
import { useLanguage } from '../contexts/LanguageContext';
import SimakiAvatar from './SimakiAvatar';

const msgEase = [0.16, 1, 0.3, 1];

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

  const suggestedQuestions = language === 'el'
    ? [
        { id: 1, text: 'Τι μπορεί να κάνει το Simaki για μένα;' },
        { id: 2, text: 'Πώς βοηθά η SimasiaAI οργανισμούς;' },
        { id: 3, text: 'Μπορώ να κλείσω demo;' },
      ]
    : [
        { id: 1, text: 'What can Simaki do for me?' },
        { id: 2, text: 'How does SimasiaAI help organizations?' },
        { id: 3, text: 'Can I book a demo?' },
      ];

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

    try {
      const response = await answerQuestion(userText.trim(), null, {
        messages: historyBeforeSend,
        lastResolvedQuery: previousResolvedQuery,
        uiLanguage: language,
        stream: true,
        onChunk: (chunk) => {
          if (!chunk) return;
          if (!streamMounted) {
            streamMounted = true;
            setMessages((prev) => [
              ...prev,
              { id: botId, text: chunk, sender: 'bot', sources: [], confidence: 0 },
            ]);
          } else {
            setMessages((prev) =>
              prev.map((m) => (m.id === botId ? { ...m, text: m.text + chunk } : m))
            );
          }
        },
      });

      setMessages((prev) => {
        const existing = prev.find((m) => m.id === botId);
        if (existing) {
          return prev.map((m) =>
            m.id === botId
              ? {
                  ...m,
                  text: response.answer,
                  sources: response.sources || [],
                  confidence: response.confidence,
                }
              : m
          );
        }
        return [
          ...prev,
          {
            id: botId,
            text: response.answer,
            sender: 'bot',
            sources: response.sources || [],
            confidence: response.confidence,
          },
        ];
      });
    } catch (error) {
      const errText =
        language === 'el'
          ? 'Συγγνώμη, κάτι πήγε στραβά. Προσπάθησε ξανά.'
          : 'Sorry, something went wrong. Please try again.';
      setMessages((prev) => {
        if (streamMounted) {
          return prev.map((m) => (m.id === botId ? { ...m, text: errText, sources: [] } : m));
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
            <h3>Simaki</h3>
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
                  <p className="message-text">{message.text}</p>
                  {message.sources && message.sources.length > 0 && (
                    <div className="message-sources">
                      <p className="sources-label">{language === 'el' ? 'Πηγές' : 'Sources'}</p>
                      <ul>
                        {message.sources.map((source, idx) => (
                          <li key={idx}>
                            {source.url.startsWith('/') ? (
                              <Link to={source.url}>{source.title}</Link>
                            ) : (
                              <a href={source.url} target="_blank" rel="noopener noreferrer">
                                {source.title}
                              </a>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
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
