import React, { useState, useEffect } from 'react';
import ChatWindow from './ChatWindow';
import './ChatbotBubble.css';
import { useLanguage } from '../contexts/LanguageContext';

import avatarHappy from '../assets/chatbot-avatar-happy.png';
import avatarDefault from '../assets/chatbot-avatar.png';

function ChatbotBubble() {
    const { language } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [hasBeenOpened, setHasBeenOpened] = useState(false);
    const [showGreeting, setShowGreeting] = useState(false);
    const [messages, setMessages] = useState([]);

    const greetingText = language === 'el'
        ? 'Γεια, είμαι η Sima! Ρώτησέ με κάτι 😊'
        : 'Hi, I\'m Sima! Ask me anything 😊';

    // Show the greeting speech bubble after a delay
    useEffect(() => {
        const timer = setTimeout(() => {
            if (!hasBeenOpened) {
                setShowGreeting(true);
            }
        }, 1500); // Appears 1.5s after page load

        return () => clearTimeout(timer);
    }, [hasBeenOpened]);

    const openChat = () => {
        setHasBeenOpened(true);
        setShowGreeting(false);
        setIsOpen(true);
    };

    const closeChat = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsOpen(false);
            setIsClosing(false);
        }, 350); // Match CSS animation duration
    };

    const toggleChat = () => {
        if (!isOpen) {
            openChat();
        } else {
            closeChat();
        }
    };

    const dismissGreeting = (e) => {
        e.stopPropagation();
        setShowGreeting(false);
    };

    // Happy icon before first open, default icon after
    const currentAvatar = hasBeenOpened ? avatarDefault : avatarHappy;

    return (
        <>
            {/* Chat Window - shows above bubble when open */}
            {isOpen && <ChatWindow 
                onClose={closeChat} 
                isClosing={isClosing}
                messages={messages}
                setMessages={setMessages}
            />}
            
            {/* Speech bubble greeting */}
            {showGreeting && !isOpen && (
                <div className="greeting-cloud" onClick={toggleChat}>
                    <span>{greetingText}</span>
                    <button className="greeting-dismiss" onClick={dismissGreeting} aria-label="Dismiss">×</button>
                    <div className="greeting-tail"></div>
                </div>
            )}

            {/* Floating Chatbot Bubble - hidden when chat is open */}
            {!isOpen && (
                <div 
                    className={`chatbot-bubble ${hasBeenOpened ? 'bubble-reappear' : ''}`}
                    onClick={toggleChat}
                    role="button"
                    aria-label="Open Sima chat"
                    tabIndex={0}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            toggleChat();
                        }
                    }}
                >
                    <div className="bubble-content">
                        <img 
                            className="bot-icon-img" 
                            src={currentAvatar} 
                            alt="Sima"
                        />
                        <span className="bubble-text">Sima</span>
                    </div>
                </div>
            )}
        </>
    );
}

export default ChatbotBubble;
