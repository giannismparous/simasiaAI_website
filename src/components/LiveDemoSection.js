import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import './LiveDemoSection.css';

const conversations = [
  {
    user: 'Πώς μπορεί η ΠΟΑμΣΚΠ να με βοηθήσει;',
    bot: 'Η ΠΟΑμΣΚΠ, μέσω μιας πανελλαδικής έρευνας που διενήργησε, προσπαθεί να κατανοήσει καλύτερα τις ανάγκες των ατόμων με σκλήρυνση κατά πλάκας. Στόχος της είναι να βρει τρόπους υποστήριξης και να συμβάλλει στην αντιμετώπιση των ζητημάτων που προκύπτουν από τη νόσο, ενώ παράλληλα αναδεικνύει την ανάγκη για περισσότερη ενημέρωση και υποστήριξη από την πολιτεία.\n\nΘα ήθελες να μάθεις κάτι πιο συγκεκριμένο για την έρευνα ή την υποστήριξη που προσφέρει η ΠΟΑμΣΚΠ;',
  },
  {
    user: 'Ποιες υπηρεσίες προσφέρει το κέντρο καθοδήγησης καρκινοπαθών ΚΑΠΑ3;',
    bot: 'Το Κέντρο Καθοδήγησης Καρκινοπαθών «Κάπα3» παρέχει υποστήριξη σε ογκολογικούς ασθενείς και τις οικογένειές τους, λειτουργώντας ως σύστημα πλοήγησης στα δικαιώματα και τις παροχές που δικαιούνται. Οι υπηρεσίες του περιλαμβάνουν καθοδήγηση για διοικητικά και ασφαλιστικά θέματα, υποστήριξη στη διεκπεραίωση αιτήσεων για παροχές (όπως μείωση δημοτικών τελών), καθώς και ψυχοκοινωνική υποστήριξη.\n\nΓια συγκεκριμένες πληροφορίες μπορείτε να επικοινωνήσετε στο τηλέφωνο 210 52 21 424 ή στη σελίδα kapa3.gr.',
  },
  {
    user: 'Τι είναι η BPAN;',
    bot: 'Η BPAN (Beta-Propeller protein-Associated Neurodegeneration) είναι μια εξαιρετικά σπάνια νευροεκφυλιστική νόσος [7]. Οφείλεται σε μετάλλαξη του γονιδίου WDR45, το οποίο βρίσκεται στο χρωμόσωμα Χ [12].\n\nΟ Σύλλογος «Ήρωες της BPAN» – BPAN Heroes ιδρύθηκε για να στηρίξει τα παιδιά στην Ελλάδα που ζουν με αυτή τη σπάνια νόσο, καθώς και τις οικογένειές τους [4].',
    warning: '⚠️ Είμαι βοηθός Τεχνητής Νοημοσύνης. Οι πληροφορίες δεν υποκαθιστούν ιατρικές συμβουλές.',
    sources: 'Πηγές: [4, 7] ΣΥΛΛΟΓΟΣ-BPAN-ΚΑΤΑΣΤΑΤΙΚΟ-ΤΕΛΙΚΟ.pdf · [12] Wilson-Consensus-Guideline.pdf',
  },
];

const CHAR_DELAY = 25;
const PAUSE_AFTER_BOT = 3000;
const PAUSE_AFTER_USER = 800;
const TYPING_DURATION = 1500;

const LiveDemoSection = () => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const [inputText, setInputText] = useState('');
  const ref = useRef(null);
  const chatMessagesRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: '100px' });
  const activeRef = useRef(true);
  const convoIndexRef = useRef(0);

  const scrollToBottom = useCallback(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, currentText, isTyping, scrollToBottom]);

  const typeText = useCallback((text, onChar, onDone) => {
    let i = 0;
    const interval = setInterval(() => {
      if (!activeRef.current) { clearInterval(interval); return; }
      i++;
      onChar(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        onDone();
      }
    }, CHAR_DELAY);
    return () => clearInterval(interval);
  }, []);

  const runConversation = useCallback((index) => {
    if (!activeRef.current) return;
    const convo = conversations[index % conversations.length];

    // Phase 1: Type user question
    setInputText('');
    const cleanup = typeText(convo.user, (partial) => {
      setInputText(partial);
    }, () => {
      // User message done — add it
      setTimeout(() => {
        if (!activeRef.current) return;
        setInputText('');
        setMessages(prev => [...prev, { type: 'user', text: convo.user }]);

        // Phase 2: Show typing indicator
        setTimeout(() => {
          if (!activeRef.current) return;
          setIsTyping(true);

          // Phase 3: Type bot response
          setTimeout(() => {
            if (!activeRef.current) return;
            setIsTyping(false);
            setCurrentText('');

            typeText(convo.bot, (partial) => {
              setCurrentText(partial);
            }, () => {
              // Bot done — finalize
              if (!activeRef.current) return;
              setMessages(prev => [
                ...prev,
                {
                  type: 'bot',
                  text: convo.bot,
                  warning: convo.warning,
                  sources: convo.sources,
                },
              ]);
              setCurrentText('');

              // Phase 4: Pause then next conversation
              setTimeout(() => {
                if (!activeRef.current) return;
                setMessages([]);
                convoIndexRef.current = index + 1;
                runConversation(index + 1);
              }, PAUSE_AFTER_BOT);
            });
          }, TYPING_DURATION);
        }, PAUSE_AFTER_USER);
      }, 200);
    });

    return cleanup;
  }, [typeText]);

  useEffect(() => {
    if (!inView) return;
    activeRef.current = true;
    const timeout = setTimeout(() => {
      runConversation(0);
    }, 800);
    return () => {
      activeRef.current = false;
      clearTimeout(timeout);
    };
  }, [inView, runConversation]);

  return (
    <section className="live-demo-section" id="live-demo" ref={ref}>
      <div className="container">
        <motion.div
          className="live-demo-header"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2>SimasiaDialogue</h2>
          <p className="live-demo-subtitle">Live Demonstration</p>
        </motion.div>

        <motion.div
          className="chat-container"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.6 }}
        >
          {/* Chat header */}
          <div className="chat-header">
            <img
              src="/logos/simasiaai.PNG"
              alt="SimasiaDialogue"
              className="chat-avatar"
            />
            <div className="chat-header-info">
              <div className="chat-header-name">SimasiaDialogue</div>
              <div className="chat-header-status">
                <span className="online-dot" />
                Online
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="chat-messages" ref={chatMessagesRef}>
            {messages.map((m, i) => (
              <React.Fragment key={i}>
                <div className={`chat-msg ${m.type}`}>
                  <span className="chat-msg-label">
                    {m.type === 'user' ? 'Εσείς' : 'SimasiaDialogue'}
                  </span>
                  <div className="chat-msg-bubble">
                    {m.text.split('\n').map((line, j) => (
                      <span key={j}>{line}{j < m.text.split('\n').length - 1 && <br />}</span>
                    ))}
                  </div>
                </div>
                {m.warning && <div className="chat-warning">{m.warning}</div>}
                {m.sources && <div className="chat-sources">{m.sources}</div>}
              </React.Fragment>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="typing-indicator">
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="typing-dot" />
              </div>
            )}

            {/* Bot typing live */}
            {currentText && (
              <div className="chat-msg bot">
                <span className="chat-msg-label">SimasiaDialogue</span>
                <div className="chat-msg-bubble">
                  {currentText.split('\n').map((line, j) => (
                    <span key={j}>{line}{j < currentText.split('\n').length - 1 && <br />}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Input bar */}
          <div className="chat-input-bar">
            <input
              type="text"
              placeholder="Γράψτε ένα μήνυμα..."
              value={inputText}
              readOnly
            />
            <button className="chat-send-btn" aria-label="Send">
              ↑
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LiveDemoSection;
