import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';
import './ChatbotShowcase.css';

const ChatbotShowcase = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "200px" });
  const chatRef = useRef(null);
  const chatInView = useInView(chatRef, { once: true, margin: "100px" });

  const [chatStage, setChatStage] = useState(0);

  useEffect(() => {
    if (!chatInView) return;
    const timers = [];
    timers.push(setTimeout(() => setChatStage(1), 400));
    timers.push(setTimeout(() => setChatStage(2), 1200));
    timers.push(setTimeout(() => setChatStage(3), 2400));
    return () => timers.forEach(clearTimeout);
  }, [chatInView]);

  const promises = t('chatbotShowcase.promises');
  const pills = t('chatbotShowcase.featurePills');
  const chatDemo = t('chatbotShowcase.chatDemo');

  const formatBotReply = (text) => {
    return text.split(/(\[.*?\])/).map((part, i) => {
      if (part.startsWith('[') && part.endsWith(']')) {
        return <span key={i} className="citation">{part}</span>;
      }
      return part;
    });
  };

  return (
    <section className="chatbot-showcase" ref={ref}>
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {t('chatbotShowcase.title')}
        </motion.h2>
        <motion.p
          className="showcase-subtitle"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {t('chatbotShowcase.subtitle')}
        </motion.p>

        {/* Chat Demo */}
        <motion.div
          className="chat-demo-wrapper"
          ref={chatRef}
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={chatInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="chat-demo">
            <div className="chat-demo-header">
              <div className="chat-demo-avatar">Σ</div>
              <div className="chat-demo-header-info">
                <h4>SimasiaChatbot</h4>
                <span>Digital Navigator</span>
              </div>
              <div className="chat-demo-status" />
            </div>
            <div className="chat-demo-messages">
              {chatStage >= 1 && (
                <motion.div
                  className="chat-msg chat-msg-user"
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  {chatDemo.userMessage}
                </motion.div>
              )}
              {chatStage === 2 && (
                <motion.div
                  className="chat-typing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <span /><span /><span />
                </motion.div>
              )}
              {chatStage >= 3 && (
                <motion.div
                  className="chat-msg chat-msg-bot"
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  style={{ whiteSpace: 'pre-line' }}
                >
                  {formatBotReply(chatDemo.botReply)}
                </motion.div>
              )}
            </div>
            {chatStage >= 3 && (
              <motion.div
                className="chat-demo-footer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <span>SimasiaChatbots™</span>
                <span className="sources-tag">📄 {chatDemo.sources}</span>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Promise Cards */}
        <div className="promises-grid">
          {promises.map((promise, index) => (
            <motion.div
              key={index}
              className="promise-card"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="promise-icon">{promise.icon}</div>
              <h3>{promise.title}</h3>
              <p>{promise.description}</p>
              <div className="promise-example">{promise.example}</div>
            </motion.div>
          ))}
        </div>

        {/* Feature Pills Marquee */}
        <motion.div
          className="feature-pills-container"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="feature-pills-track">
            {[...pills, ...pills].map((pill, i) => (
              <span key={i} className="feature-pill">{pill}</span>
            ))}
          </div>
          <div className="feature-pills-track feature-pills-track-reverse">
            {[...pills, ...pills].reverse().map((pill, i) => (
              <span key={i} className="feature-pill">{pill}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ChatbotShowcase;
