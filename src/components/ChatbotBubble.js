import React, { useState } from 'react';
import ChatWindow from './ChatWindow';
import SimakiAvatar from './SimakiAvatar';
import TypewriterPlaceholder from './TypewriterPlaceholder';
import { useLanguage } from '../contexts/LanguageContext';
import './ChatbotBubble.css';

const LAUNCHER_PHRASES_EL = [
  'Τι μπορεί να κάνει το DialogosAI;',
  'Πώς βοηθά η SimasiaAI;',
  'Μπορώ να κλείσω demo;',
];

const LAUNCHER_PHRASES_EN = [
  'What can DialogosAI do for me?',
  'How does SimasiaAI help?',
  'Can I book a demo?',
];

function ChatbotBubble() {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [messages, setMessages] = useState([]);
  const [showOptions, setShowOptions] = useState(false);

  const phrases = language === 'el' ? LAUNCHER_PHRASES_EL : LAUNCHER_PHRASES_EN;

  const openChat = (withOptions = false) => {
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
    <>
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
        aria-label={language === 'el' ? 'Άνοιγμα συνομιλίας DialogosAI' : 'Open DialogosAI chat'}
        aria-hidden={isOpen && !isClosing}
        tabIndex={isOpen && !isClosing ? -1 : 0}
      >
        <span className="launcher-avatar">
          <SimakiAvatar size={34} />
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
    </>
  );
}

export default ChatbotBubble;
