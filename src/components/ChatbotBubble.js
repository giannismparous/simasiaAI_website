import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ChatWindow from './ChatWindow';
import PyxidaCompassIcon from './PyxidaCompassIcon';
import TypewriterPlaceholder from './TypewriterPlaceholder';
import { useLanguage } from '../contexts/LanguageContext';
import './ChatbotBubble.css';

const LAUNCHER_PHRASES_EL = [
  'Τι μπορεί να κάνει το Pyxida;',
  'Πώς βοηθά η SimasiaAI;',
  'Μπορώ να κλείσω demo;',
];

const LAUNCHER_PHRASES_EN = [
  'What can Pyxida do for me?',
  'How does SimasiaAI help?',
  'Can I book a demo?',
];

const YPODOCHI_CHAT_GATE = '.ypd-ngo';

function ChatbotBubble() {
  const { language } = useLanguage();
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [messages, setMessages] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [gatePath, setGatePath] = useState(pathname);
  const [gateVisible, setGateVisible] = useState(() => {
    const p = pathname || '';
    return p !== '/ypodochi' && !p.startsWith('/ypodochi/');
  });

  const isYpodochi = pathname === '/ypodochi' || pathname.startsWith('/ypodochi/');
  if (pathname !== gatePath) {
    setGatePath(pathname);
    setGateVisible(!isYpodochi);
  }
  const chatAllowed = !isYpodochi || gateVisible;

  useLayoutEffect(() => {
    if (!isYpodochi) return undefined;

    let observer;
    let cancelled = false;
    let raf = 0;

    const attach = () => {
      const target = document.querySelector(YPODOCHI_CHAT_GATE);
      if (!target) {
        raf = requestAnimationFrame(attach);
        return;
      }
      if (cancelled) return;

      observer = new IntersectionObserver(
        ([entry]) => {
          const passedStart = entry.boundingClientRect.top < window.innerHeight * 0.88;
          setGateVisible(entry.isIntersecting || passedStart);
        },
        {
          root: null,
          threshold: [0, 0.05, 0.15, 0.3],
          rootMargin: '0px 0px -8% 0px',
        }
      );
      observer.observe(target);
    };

    attach();

    return () => {
      cancelled = true;
      if (raf) cancelAnimationFrame(raf);
      observer?.disconnect();
    };
  }, [isYpodochi, pathname]);

  useEffect(() => {
    if (chatAllowed || !isOpen) return undefined;
    setIsClosing(true);
    const t = setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
      setShowOptions(false);
    }, 320);
    return () => clearTimeout(t);
  }, [chatAllowed, isOpen]);

  const phrases = language === 'el' ? LAUNCHER_PHRASES_EL : LAUNCHER_PHRASES_EN;

  const openChat = (withOptions = false) => {
    if (!chatAllowed) return;
    setShowOptions(withOptions);
    setIsOpen(true);
  };

  const closeChat = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
      setShowOptions(false);
    }, 320);
  };

  return (
    <div
      className={`chatbot-shell${chatAllowed ? ' chatbot-shell--visible' : ' chatbot-shell--hidden'}`}
      aria-hidden={!chatAllowed}
    >
      {isOpen && (
        <ChatWindow
          onClose={closeChat}
          isClosing={isClosing}
          messages={messages}
          setMessages={setMessages}
          initialShowOptions={showOptions}
        />
      )}

      <button
        type="button"
        className={`chat-launcher-pill${isOpen && !isClosing ? ' launcher-hidden' : ''}${isClosing ? ' launcher-returning' : ''}`}
        onClick={() => openChat(true)}
        aria-label={language === 'el' ? 'Άνοιγμα συνομιλίας Pyxida' : 'Open Pyxida chat'}
        aria-hidden={(isOpen && !isClosing) || !chatAllowed}
        tabIndex={(isOpen && !isClosing) || !chatAllowed ? -1 : 0}
        disabled={!chatAllowed}
      >
        <span className="launcher-avatar">
          <PyxidaCompassIcon idSuffix="launcher" size={34} />
        </span>
        <span className="launcher-field">
          <TypewriterPlaceholder phrases={phrases} />
        </span>
        <span className="launcher-send" aria-hidden="true">
          <svg viewBox="0 0 16 16" fill="none">
            <path d="M8 3V13M8 3L4.5 6.5M8 3L11.5 6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>
    </div>
  );
}

export default ChatbotBubble;
