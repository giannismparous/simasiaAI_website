import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ChatWindow.css';
import { answerQuestion } from '../chatbot/services/chatService';
import { useLanguage } from '../contexts/LanguageContext';

function ChatWindow({ onClose, isClosing, messages, setMessages }) {
    const { language } = useLanguage();
    const lastResolvedQueryRef = useRef('');

    // Initialize welcome message if history is empty OR update it if language changes for the initial message
    useEffect(() => {
        const welcomeText = language === 'el'
            ? 'Γεια σου! 👋\nΕίμαι η Sima. Πώς μπορώ να σε βοηθήσω σήμερα;'
            : 'Hi there! 👋\nI\'m Sima. How can I help you today?';

        if (messages.length === 0) {
            setMessages([{
                id: 1,
                text: welcomeText,
                sender: 'bot'
            }]);
        } else if (messages.length === 1 && messages[0].sender === 'bot') {
            // Update the welcome message in place if it's the only message
            // This ensures the greeting switches language dynamically
            setMessages(prev => [{
                ...prev[0],
                text: welcomeText
            }]);
        }
    }, [language, messages, setMessages]);

    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    const suggestedQuestions = language === 'el'

        ? [
            { id: 1, text: 'Τι είναι η SimasiaAI;', emoji: '🤖' },
            { id: 2, text: 'Ποια είναι τα προϊόντα;', emoji: '📦' },
            { id: 3, text: 'Πώς μπορεί το SimasiaAI να βοηθήσει την επιχείρησή μου;', emoji: '💼' }
        ]
        : [
            { id: 1, text: 'What is Simasia AI?', emoji: '🤖' },
            { id: 2, text: 'What are the products?', emoji: '📦' },
            { id: 3, text: 'How can SimasiaAI help my business?', emoji: '💼' }
        ];

    // Auto-scroll to bottom when new messages arrive
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (messages.length <= 1) {
            lastResolvedQueryRef.current = '';
        }
    }, [messages.length]);

    // Focus input on mount
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const sendUserMessage = async (userText) => {
        if (!userText.trim() || isLoading) return;

        const historyBeforeSend = messages.slice();
        const previousResolvedQuery = lastResolvedQueryRef.current;
        const botId = Date.now() + 1;

        setMessages(prev => [...prev, { id: Date.now(), text: userText.trim(), sender: 'user' }]);
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
                        setMessages(prev => [
                            ...prev,
                            { id: botId, text: chunk, sender: 'bot', sources: [], confidence: 0 },
                        ]);
                    } else {
                        setMessages(prev =>
                            prev.map((m) => (m.id === botId ? { ...m, text: m.text + chunk } : m))
                        );
                    }
                },
            });

            setMessages(prev => {
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
            setMessages(prev => {
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
        sendUserMessage(question.text);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className={`chat-window ${isClosing ? 'chat-closing' : ''}`}>
            <div className="chat-header">
                <div className="chat-header-content">
                    <div className="bot-avatar">
                        <img src={require('../assets/chatbot-avatar.png')} alt="Sima" />
                    </div>
                    <div className="bot-info">
                        <h3>Sima</h3>
                        <span className="bot-status">
                            <span className="status-dot"></span>
                            {isLoading 
                                ? (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <span>{language === 'el' ? 'Πληκτρολογεί' : 'Typing'}</span>
                                        <div className="status-typing-dots">
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </div>
                                ) 
                                : (language === 'el' ? 'Διαθέσιμη' : 'Available')}
                        </span>
                    </div>
                </div>
                <button 
                    className="close-chat-btn"
                    onClick={onClose}
                    aria-label="Close chat"
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>
            </div>

            <div className="chat-body">
                {messages.map((message) => (
                    <div key={message.id} className={`message-bubble ${message.sender}-message`}>
                        <p>{message.text}</p>
                        {message.sources && message.sources.length > 0 && (
                            <div className="message-sources">
                                <p className="sources-label">{language === 'el' ? '📚 Πηγές:' : '📚 Sources:'}</p>
                                <ul>
                                    {message.sources.map((source, idx) => (
                                        <li key={idx}>
                                            {source.url.startsWith('/') ? (
                                                <Link to={source.url}>
                                                    {source.title}
                                                </Link>
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
                ))}

                {isLoading && messages[messages.length - 1]?.sender !== 'bot' && (
                    <div className="message-bubble bot-message loading">
                        <div className="typing-indicator">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                )}

                {messages.length === 1 && (
                    <div className="suggested-questions">
                        <p className="suggestions-label">
                            {language === 'el' ? 'Προτεινόμενες ερωτήσεις:' : 'Suggested questions:'}
                        </p>
                        <div className="questions-list">
                            {suggestedQuestions.map((question) => (
                                <button
                                    key={question.id}
                                    className="question-button"
                                    onClick={() => handleQuestionClick(question)}
                                    disabled={isLoading}
                                >
                                    <span className="question-emoji">{question.emoji}</span>
                                    <span className="question-text">{question.text}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            <div className="chat-footer">
                <div className="input-container">
                    <input 
                        ref={inputRef}
                        type="text" 
                        placeholder={language === 'el' ? 'Γράψτε το μήνυμά σας...' : 'Type your message...'}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        disabled={isLoading}
                        className="chat-input"
                    />
                    <button 
                        className="send-button" 
                        onClick={handleSendMessage}
                        disabled={isLoading || !inputValue.trim()}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="22" y1="2" x2="11" y2="13" />
                            <polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ChatWindow;
