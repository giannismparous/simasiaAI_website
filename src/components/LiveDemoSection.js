import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';
import './LiveDemoSection.css';

const CHAR_DELAY = 26;
const LINE_CHAR_DELAY = 12;
const INTERNAL_PRE_LINE_MS = 260;
const INTERNAL_POST_LINE_MS = 180;
const PAUSE_AFTER_TURN = 3200;
const FADE_DURATION = 500;
const INTERNALS_FADE_MS = 850;
const PRE_INTERNALS_MS = 450;

const SimakiAvatar = () => (
  <svg className="simaki-avatar" viewBox="0 0 32 32" fill="none" aria-hidden="true">
    <rect width="32" height="32" rx="8" fill="#d97757" />
    <circle cx="16" cy="14" r="7.5" fill="#fff5f0" />
    <circle cx="13" cy="13" r="1.35" fill="#141413" />
    <circle cx="19" cy="13" r="1.35" fill="#141413" />
    <circle cx="13.4" cy="12.6" r="0.4" fill="#fff" />
    <circle cx="19.4" cy="12.6" r="0.4" fill="#fff" />
    <path d="M12.5 16.5C14 18.2 18 18.2 19.5 16.5" stroke="#141413" strokeWidth="1.2" strokeLinecap="round" />
    <circle cx="11" cy="15" r="1.1" fill="#f4b8a4" opacity="0.7" />
    <circle cx="21" cy="15" r="1.1" fill="#f4b8a4" opacity="0.7" />
    <path d="M22 8.5L23.2 6.8L24.8 8.2" stroke="#fff5f0" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const parseSources = (sources) => {
  if (!sources) return [];
  const cleaned = sources.replace(/^(Πηγές|Sources):\s*/i, '').trim();
  return cleaned.split(/\s*·\s*|\s*,\s*/).filter(Boolean);
};

const ThinkingIndicator = ({ label }) => (
  <div className="fin-thinking-row" aria-live="polite">
    <span className="fin-thinking-circle" aria-hidden="true">
      <svg viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="7.5" stroke="#ececea" strokeWidth="2" />
        <circle
          className="fin-thinking-arc"
          cx="10"
          cy="10"
          r="7.5"
          stroke="#d97757"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="14 34"
        />
      </svg>
    </span>
    <span className="fin-thinking-text">{label}</span>
  </div>
);

const InternIcon = ({ type, accent }) => {
  if (type === 'branch') return <span className="intern-icon intern-icon-branch">↳</span>;
  if (type === 'dot') {
    return <span className={`intern-icon intern-icon-dot${accent ? ' accent' : ''}`} />;
  }
  return (
    <span className="intern-icon intern-icon-nodes" aria-hidden="true">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <circle cx="4" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="10" cy="4" r="2" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="10" cy="10" r="2" stroke="currentColor" strokeWidth="1.2" />
        <path d="M6.2 6.2L8.2 4.8M6.2 7.8L8.2 9.2" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    </span>
  );
};

const msgEase = [0.16, 1, 0.3, 1];
let messageIdCounter = 0;

const nextMessageId = () => {
  messageIdCounter += 1;
  return `msg-${messageIdCounter}`;
};

const LiveDemoSection = () => {
  const { t, language } = useTranslation();
  const conversations = t('liveDemo.conversations');
  const conversationsRef = useRef(Array.isArray(conversations) ? conversations : []);
  conversationsRef.current = Array.isArray(conversations) ? conversations : [];

  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);
  const [isThinking, setIsThinking] = useState(false);
  const [internalSteps, setInternalSteps] = useState([]);
  const [internalsHiding, setInternalsHiding] = useState(false);
  const [activeTypingLineId, setActiveTypingLineId] = useState(null);
  const [chatFading, setChatFading] = useState(false);

  const ref = useRef(null);
  const chatBodyRef = useRef(null);
  const messagesWrapRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: '100px' });
  const activeRef = useRef(false);
  const timersRef = useRef([]);
  const [upwardShift, setUpwardShift] = useState(0);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  const resetChatScroll = useCallback(() => {
    const body = chatBodyRef.current;
    if (body) body.scrollTop = 0;
  }, []);

  const updateUpwardShift = useCallback(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const body = chatBodyRef.current;
        const wrap = messagesWrapRef.current;
        if (!body || !wrap) return;

        const activeCount = messages.length + (isThinking ? 1 : 0);
        if (activeCount <= 2) {
          setUpwardShift(0);
          return;
        }

        const items = wrap.querySelectorAll('.fin-msg');
        const hideCount = activeCount - 2;
        const gapPx = parseFloat(getComputedStyle(wrap).gap) || 22;
        let hideShift = 0;

        for (let i = 0; i < Math.min(hideCount, items.length); i += 1) {
          hideShift += items[i].getBoundingClientRect().height;
          if (i < hideCount - 1) hideShift += gapPx;
        }

        const overflow = wrap.scrollHeight - body.clientHeight;
        setUpwardShift(Math.max(hideShift, overflow, 0));
      });
    });
  }, [isThinking, messages.length]);

  const wait = useCallback((ms) => {
    return new Promise((resolve) => {
      const id = setTimeout(() => resolve(activeRef.current), ms);
      timersRef.current.push(id);
      if (!activeRef.current) {
        clearTimeout(id);
        resolve(false);
      }
    });
  }, []);

  const typeChars = useCallback((text, delay, onUpdate) => {
    return new Promise((resolve) => {
      let i = 0;
      const tick = () => {
        if (!activeRef.current) {
          resolve();
          return;
        }
        i += 1;
        onUpdate(text.slice(0, i));
        if (i >= text.length) {
          resolve();
          return;
        }
        const id = setTimeout(tick, delay);
        timersRef.current.push(id);
      };
      tick();
    });
  }, []);

  const updateLineText = useCallback((lineId, text) => {
    setInternalSteps((prev) =>
      prev.map((group) => ({
        ...group,
        lines: group.lines.map((line) =>
          line.id === lineId ? { ...line, text } : line
        ),
      }))
    );
  }, []);

  const runInternals = useCallback(async (steps) => {
    const groups = [];

    for (const step of steps) {
      if (!activeRef.current) return;

      groups.push({ stepId: step.stepId, lines: [] });
      setInternalSteps(groups.map((g) => ({ ...g, lines: g.lines.map((l) => ({ ...l })) })));
      if (!(await wait(400))) return;

      const group = groups[groups.length - 1];

      for (let lineIndex = 0; lineIndex < step.lines.length; lineIndex += 1) {
        const line = step.lines[lineIndex];
        if (!activeRef.current) return;

        const lineId = `${step.stepId}-${lineIndex}`;
        const lineEntry = {
          id: lineId,
          icon: line.icon,
          accent: line.accent,
          text: '',
          committed: false,
        };

        if (!(await wait(INTERNAL_PRE_LINE_MS))) return;

        group.lines.push(lineEntry);
        setActiveTypingLineId(lineId);
        setInternalSteps(groups.map((g) => ({ ...g, lines: g.lines.map((l) => ({ ...l })) })));

        await typeChars(line.text, LINE_CHAR_DELAY, (partial) => {
          lineEntry.text = partial;
          updateLineText(lineId, partial);
        });

        lineEntry.text = line.text;
        lineEntry.committed = true;
        setActiveTypingLineId(null);
        setInternalSteps(groups.map((g) => ({ ...g, lines: g.lines.map((l) => ({ ...l })) })));
        if (!(await wait(INTERNAL_POST_LINE_MS))) return;
      }
    }
  }, [typeChars, updateLineText, wait]);

  const runConversation = useCallback(async (index) => {
    const list = conversationsRef.current;
    if (!list.length) return;
    const convo = list[index % list.length];

    setChatFading(false);
    setInputText('');
    setMessages([]);
    setIsThinking(false);
    setInternalSteps([]);
    setInternalsHiding(false);
    setActiveTypingLineId(null);
    resetChatScroll();

    if (!(await wait(600))) return;

    for (let turnIndex = 0; turnIndex < convo.turns.length; turnIndex += 1) {
      const turn = convo.turns[turnIndex];
      if (!activeRef.current) return;

      await typeChars(turn.user, CHAR_DELAY, setInputText);
      if (!(await wait(350))) return;

      setInputText('');
      setMessages((prev) => [...prev, { id: nextMessageId(), role: 'user', text: turn.user }]);
      if (!(await wait(500))) return;

      setIsThinking(true);
      if (!(await wait(PRE_INTERNALS_MS))) return;
      await runInternals(turn.internals);
      if (!activeRef.current) return;

      setIsThinking(false);
      setInternalsHiding(true);

      const botMsgId = nextMessageId();
      setMessages((prev) => [...prev, { id: botMsgId, role: 'bot', text: '' }]);

      const fadeInternals = wait(INTERNALS_FADE_MS).then(() => {
        if (!activeRef.current) return false;
        setInternalSteps([]);
        setInternalsHiding(false);
        return true;
      });

      await typeChars(turn.bot, CHAR_DELAY, (partial) => {
        setMessages((prev) =>
          prev.map((m) => (m.id === botMsgId ? { ...m, text: partial } : m))
        );
      });
      if (!activeRef.current) return;

      const botMeta = (turn.warning || turn.sources)
        ? { warning: turn.warning, sources: turn.sources }
        : null;

      if (botMeta) {
        setMessages((prev) =>
          prev.map((m) => (m.id === botMsgId ? { ...m, ...botMeta } : m))
        );
      }

      await fadeInternals;
      if (!activeRef.current) return;

      if (turnIndex < convo.turns.length - 1) {
        if (!(await wait(700))) return;
      }
    }

    if (!(await wait(PAUSE_AFTER_TURN))) return;

    setChatFading(true);
    if (!(await wait(FADE_DURATION))) return;

    if (!activeRef.current) return;
    await runConversation(index + 1);
  }, [resetChatScroll, runInternals, typeChars, wait]);

  useEffect(() => {
    if (!inView) return undefined;

    activeRef.current = false;
    clearTimers();
    setInputText('');
    setMessages([]);
    setIsThinking(false);
    setInternalSteps([]);
    setInternalsHiding(false);
    setActiveTypingLineId(null);
    setChatFading(false);
    setUpwardShift(0);

    activeRef.current = true;
    runConversation(0);

    return () => {
      activeRef.current = false;
      clearTimers();
    };
  }, [inView, language, runConversation, clearTimers]);

  useEffect(() => {
    updateUpwardShift();
  }, [messages, isThinking, updateUpwardShift]);

  useEffect(() => {
    const wrap = messagesWrapRef.current;
    if (!wrap) return undefined;

    const observer = new ResizeObserver(() => updateUpwardShift());
    observer.observe(wrap);
    return () => observer.disconnect();
  }, [updateUpwardShift]);

  const showInternals = internalSteps.length > 0 || internalsHiding;

  const activeMessageCount = messages.length + (isThinking ? 1 : 0);
  const isOverflowing = activeMessageCount > 2;
  const fadeOutCount = isOverflowing ? activeMessageCount - 2 : 0;

  const renderBotBubble = (text, meta) => (
    <div className="fin-bubble fin-bubble-bot">
      <strong className="fin-bot-name"><em className="brand-dialogos">DialogosAI</em></strong>
      <p className="fin-bot-text">{text}</p>
      {meta?.warning && (
        <p className="fin-warning-inline">{meta.warning}</p>
      )}
      {meta?.sources && (
        <div className="fin-sources-block">
          <span className="fin-sources-label">{t('liveDemo.sources')}</span>
          <ul className="fin-sources-list">
            {parseSources(meta.sources).map((src) => (
              <li key={src}>{src}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  return (
    <section className="live-demo-section" id="live-demo" ref={ref}>
      <div className="container">
        <motion.div
          className="live-demo-header"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2><em className="brand-dialogos">DialogosAI</em></h2>
          <p className="live-demo-subtitle">{t('liveDemo.subtitle')}</p>
        </motion.div>

        <div className="demo-stage">
          <div className="demo-showcase">
            <div className="demo-showcase-bg" aria-hidden="true">
              <span className="demo-blob demo-blob-a" />
              <span className="demo-blob demo-blob-b" />
              <span className="demo-blob demo-blob-c" />
              <span className="demo-blob demo-blob-d" />
              <span className="demo-glow" />
            </div>

            <div className="fin-chat-stack">
              <div className={`fin-chat${chatFading ? ' fin-chat-fading' : ''}`}>
                <header className="fin-chat-header">
                  <button type="button" className="fin-header-btn" aria-label={t('liveDemo.a11y.back')}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <div className="fin-header-brand">
                    <span className="fin-header-logo">
                      <SimakiAvatar />
                    </span>
                    <span className="fin-header-name"><em className="brand-dialogos">DialogosAI</em></span>
                  </div>
                  <div className="fin-header-actions">
                    <button type="button" className="fin-header-btn" aria-label={t('liveDemo.a11y.menu')}>⋯</button>
                    <button type="button" className="fin-header-btn" aria-label={t('liveDemo.a11y.expand')}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2 5V2H5M9 2H12V5M12 9V12H9M5 12H2V9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>
                </header>

                <div className="fin-chat-body" ref={chatBodyRef}>
                  <motion.div
                    ref={messagesWrapRef}
                    className="fin-chat-messages"
                    animate={{ y: -upwardShift }}
                    transition={{ duration: 0.65, ease: msgEase }}
                  >
                    <AnimatePresence initial={false}>
                      {messages.map((msg, index) => {
                        const isFadingOut = isOverflowing && index < fadeOutCount;
                        return msg.role === 'user' ? (
                          <motion.div
                            key={msg.id}
                            className={`fin-msg fin-msg-user${isFadingOut ? ' fin-msg-fading-out' : ''}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isFadingOut ? 0.3 : 1 }}
                            transition={{ duration: 0.5, ease: msgEase }}
                          >
                            <div className="fin-bubble fin-bubble-user">{msg.text}</div>
                          </motion.div>
                        ) : (
                          <div
                            key={msg.id}
                            className={`fin-msg fin-msg-bot${isFadingOut ? ' fin-msg-fading-out' : ''}`}
                          >
                            {renderBotBubble(msg.text, msg)}
                          </div>
                        );
                      })}

                      {isThinking && (
                        <motion.div
                          key="thinking"
                          className="fin-msg fin-msg-bot"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0, transition: { duration: 0.28, ease: msgEase } }}
                          transition={{ duration: 0.3, ease: msgEase }}
                        >
                          <ThinkingIndicator label={t('liveDemo.thinking')} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>

                <div className="fin-chat-input">
                  <input
                    type="text"
                    placeholder={t('liveDemo.placeholder')}
                    value={inputText}
                    readOnly
                    aria-label={t('liveDemo.a11y.input')}
                  />
                  <button
                    type="button"
                    className={`fin-send-btn${inputText ? ' fin-send-btn-active' : ''}`}
                    aria-label={t('liveDemo.a11y.send')}
                  >
                    ↑
                  </button>
                </div>
              </div>

              {showInternals && (
                <div
                  className={`demo-internals${internalsHiding ? ' is-hiding' : ''}`}
                  aria-live="polite"
                  aria-label={t('liveDemo.internalsLabel')}
                >
                  {internalSteps.map((group) => (
                    <div key={group.stepId} className="intern-group">
                      <div className="intern-row intern-step">
                        <span className="intern-step-id">Step_id: &quot;{group.stepId}&quot;</span>
                      </div>
                      {group.lines.map((line) => {
                        const isTyping = activeTypingLineId === line.id;
                        return (
                          <motion.div
                            key={line.id}
                            layout="position"
                            className={`intern-row intern-line${line.committed ? ' is-committed' : ''}${isTyping ? ' is-active' : ''}`}
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, ease: msgEase, layout: { duration: 0.45, ease: msgEase } }}
                          >
                            <InternIcon type={line.icon} accent={line.accent} />
                            <span className={`intern-line-text${isTyping ? ' is-typing' : ''}`}>
                              {line.text}
                              {isTyping && <span className="intern-cursor" aria-hidden="true" />}
                            </span>
                          </motion.div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveDemoSection;
