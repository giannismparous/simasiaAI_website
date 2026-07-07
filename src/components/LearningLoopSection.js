import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';
import './LearningLoopSection.css';

const SHUFFLE_DELAY_MS = 300;
const CORE_SHUFFLE_MS = 1100;
const FLOW_DRAW_MS = 2250;
const FLOW_ARRIVAL_MS = Math.round(FLOW_DRAW_MS * 0.56);

const LearningLoopSection = () => {
  const { t } = useTranslation();
  const steps = t('learningLoop.steps');
  const [highlightStep, setHighlightStep] = useState(0);
  const [flowStep, setFlowStep] = useState(null);
  const [fadingStep, setFadingStep] = useState(null);
  const [phaseTick, setPhaseTick] = useState(0);
  const timeoutsRef = useRef([]);
  const flowStepRef = useRef(null);

  useEffect(() => {
    flowStepRef.current = flowStep;
  }, [flowStep]);

  const schedule = (fn, ms) => {
    const id = setTimeout(fn, ms);
    timeoutsRef.current.push(id);
    return id;
  };

  const startShuffleThenFlow = (step) => {
    schedule(() => {
      setPhaseTick((prev) => prev + 1);

      schedule(() => {
        setFlowStep(step);
        schedule(() => {
          setHighlightStep((step + 1) % 4);
        }, FLOW_ARRIVAL_MS);
      }, CORE_SHUFFLE_MS);
    }, SHUFFLE_DELAY_MS);
  };

  const handleFlowArrival = (completedStep) => {
    if (flowStepRef.current !== completedStep) return;

    const nextStep = (completedStep + 1) % 4;
    setFadingStep(completedStep);
    setFlowStep(null);
    startShuffleThenFlow(nextStep);
  };

  const handleFlowAnimationEnd = (step) => (event) => {
    if (event.animationName !== 'flowDrawForward') return;
    handleFlowArrival(step);
  };

  useEffect(() => {
    setHighlightStep(0);
    setFlowStep(null);
    startShuffleThenFlow(0);
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (fadingStep === null) return;
    const id = setTimeout(() => setFadingStep(null), 1200);
    return () => clearTimeout(id);
  }, [fadingStep]);

  return (
    <section className="learning-loop-section">
      <div className="container learning-loop-grid">
        <motion.div
          className="learning-loop-copy"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <h2 className="forbes-section-title" dangerouslySetInnerHTML={{ __html: t('learningLoop.title') }} />
          <p className="learning-loop-lead" dangerouslySetInnerHTML={{ __html: t('learningLoop.lead') }} />
          <p className="learning-loop-body" dangerouslySetInnerHTML={{ __html: t('learningLoop.body') }} />
        </motion.div>

        <motion.div
          className="learning-loop-visual"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
          aria-label={t('learningLoop.aria')}
        >
          <div className="loop-orbit" aria-hidden="true">
            <svg className="loop-svg" viewBox="0 0 320 320">
              <circle className="orbit-base orbit-outer" cx="160" cy="160" r="145" />
              <circle className="orbit-base orbit-main" cx="160" cy="160" r="112" />
              <circle className="orbit-base orbit-inner" cx="160" cy="160" r="72" />

              <path className="flow-track" d="M160 48 A112 112 0 0 1 272 160" />
              <path className="flow-track" d="M272 160 A112 112 0 0 1 160 272" />
              <path className="flow-track" d="M160 272 A112 112 0 0 1 48 160" />
              <path className="flow-track" d="M48 160 A112 112 0 0 1 160 48" />

              <path
                className={`flow-seg flow-seg-1 ${flowStep === 0 ? 'is-active' : ''} ${fadingStep === 0 ? 'is-fading' : ''}`}
                d="M160 48 A112 112 0 0 1 272 160"
                onAnimationEnd={handleFlowAnimationEnd(0)}
              />
              <path
                className={`flow-seg flow-seg-2 ${flowStep === 1 ? 'is-active' : ''} ${fadingStep === 1 ? 'is-fading' : ''}`}
                d="M272 160 A112 112 0 0 1 160 272"
                onAnimationEnd={handleFlowAnimationEnd(1)}
              />
              <path
                className={`flow-seg flow-seg-3 ${flowStep === 2 ? 'is-active' : ''} ${fadingStep === 2 ? 'is-fading' : ''}`}
                d="M160 272 A112 112 0 0 1 48 160"
                onAnimationEnd={handleFlowAnimationEnd(2)}
              />
              <path
                className={`flow-seg flow-seg-4 ${flowStep === 3 ? 'is-active' : ''} ${fadingStep === 3 ? 'is-fading' : ''}`}
                d="M48 160 A112 112 0 0 1 160 48"
                onAnimationEnd={handleFlowAnimationEnd(3)}
              />
            </svg>

            <div className="orbit-core" key={phaseTick}>
              <span />
              <span />
              <span />
              <span />
            </div>

            <div className={`stage-node stage-node-1 ${highlightStep === 0 ? 'is-active' : ''}`}>{steps[0]}</div>
            <div className={`stage-node stage-node-2 ${highlightStep === 1 ? 'is-active' : ''}`}>{steps[1]}</div>
            <div className={`stage-node stage-node-3 ${highlightStep === 2 ? 'is-active' : ''}`}>{steps[2]}</div>
            <div className={`stage-node stage-node-4 ${highlightStep === 3 ? 'is-active' : ''}`}>{steps[3]}</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LearningLoopSection;
