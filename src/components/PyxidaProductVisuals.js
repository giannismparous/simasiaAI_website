import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useProductVisualLanguage } from '../contexts/ProductVisualLanguageContext';
import { getProductVisualCopy } from '../translations/productVisualCopy';

const MOBILE_VISUAL_MQ = '(max-width: 960px)';

const useIsMobileVisual = () => {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(MOBILE_VISUAL_MQ).matches
  );

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_VISUAL_MQ);
    const onChange = (event) => setIsMobile(event.matches);
    setIsMobile(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return isMobile;
};

const useCopy = () => getProductVisualCopy(useProductVisualLanguage());

const ProductFrame = ({ title, badge, variant = 'bot', children }) => (
  <div className={`ol-product-frame ol-product-frame--${variant}`}>
    <div className="ol-product-chrome">
      <div className="ol-product-dots" aria-hidden="true">
        <span /><span /><span />
      </div>
      <span className="ol-product-title">{title}</span>
      {badge && <span className="ol-product-badge">{badge}</span>}
    </div>
    <div className="ol-product-screen">{children}</div>
  </div>
);

export const VisualStage = ({ children, accent = 'bot', variant }) => (
  <div className={`ol-visual-stage ol-visual-stage--pyxida ol-visual-stage--${accent} ol-visual-stage--${variant || accent}`}>
    <span className="ol-visual-blob ol-visual-blob-a" aria-hidden="true" />
    <span className="ol-visual-blob ol-visual-blob-b" aria-hidden="true" />
    <div className="ol-visual-wrap">{children}</div>
  </div>
);

const ChatAppShell = ({ header, children, compose }) => {
  const copy = useCopy();
  return (
    <div className="ol-chat-app">
      {header && <div className="ol-chat-app-header">{header}</div>}
      <div className="ol-chat-ui">{children}</div>
      <div className="ol-chat-app-compose">
        <span>{compose ?? copy.composeDefault}</span>
        <span className="ol-chat-app-send" aria-hidden="true">↑</span>
      </div>
    </div>
  );
};

const BotHoursVisual = () => {
  const c = useCopy().botHours;
  return (
    <ProductFrame title={c.title} badge={c.badge} variant="bot-hours">
      <ChatAppShell
        header={
          <>
            <span className="ol-chat-app-avatar">P</span>
            <div>
              <strong>Pyxida</strong>
              <span>{c.status}</span>
            </div>
          </>
        }
      >
        <div className="ol-chat-row ol-chat-row--bot">
          <span className="ol-chat-avatar">P</span>
          <div className="ol-chat-stack">
            <div className="ol-bubble ol-bubble-bot">{c.botGreeting}</div>
          </div>
        </div>
        <div className="ol-chat-row ol-chat-row--user">
          <div className="ol-chat-stack">
            <div className="ol-bubble ol-bubble-user">{c.userHours}</div>
          </div>
        </div>
        <div className="ol-chat-row ol-chat-row--bot">
          <span className="ol-chat-avatar">P</span>
          <div className="ol-chat-stack">
            <div className="ol-bubble ol-bubble-bot" dangerouslySetInnerHTML={{ __html: c.botHoursReply }} />
            <span className="ol-chat-time">{c.replyTime}</span>
          </div>
        </div>
        <div className="ol-chat-row ol-chat-row--user">
          <div className="ol-chat-stack">
            <div className="ol-bubble ol-bubble-user">{c.userPrice}</div>
          </div>
        </div>
        <div className="ol-chat-row ol-chat-row--bot">
          <span className="ol-chat-avatar">P</span>
          <div className="ol-chat-stack">
            <div className="ol-bubble ol-bubble-bot" dangerouslySetInnerHTML={{ __html: c.botPriceReply }} />
          </div>
        </div>
      </ChatAppShell>
    </ProductFrame>
  );
};

const BotNightVisual = () => {
  const copy = useCopy();
  const c = copy.botNight;
  return (
    <ProductFrame title="Instagram Direct" badge="21:30" variant="bot-night">
      <ChatAppShell
        compose={copy.composeDm}
        header={
          <>
            <span className="ol-dm-avatar">@</span>
            <div>
              <strong>{c.clinicName}</strong>
              <span>{c.status}</span>
            </div>
          </>
        }
      >
        <div className="ol-chat-row ol-chat-row--user">
          <div className="ol-chat-stack">
            <div className="ol-bubble ol-bubble-user ol-bubble-user--dm">{c.userMsg}</div>
            <span className="ol-chat-time">21:30</span>
          </div>
        </div>
        <div className="ol-chat-row ol-chat-row--bot">
          <span className="ol-chat-avatar ol-chat-avatar--ig">P</span>
          <div className="ol-chat-stack">
            <div className="ol-bubble ol-bubble-bot ol-bubble-bot--dm">{c.botReply}</div>
            <span className="ol-chat-time ol-chat-time--fast">{c.replyTime}</span>
          </div>
        </div>
      </ChatAppShell>
    </ProductFrame>
  );
};

const BotSafeVisual = () => {
  const c = useCopy().botSafe;
  return (
    <ProductFrame title={c.frameTitle} badge="Guarded" variant="bot-safe">
      <ChatAppShell
        header={
          <>
            <span className="ol-chat-app-avatar ol-chat-app-avatar--safe">!</span>
            <div>
              <strong>{c.headerTitle}</strong>
              <span>{c.headerSub}</span>
            </div>
          </>
        }
      >
        <div className="ol-chat-row ol-chat-row--user">
          <div className="ol-chat-stack">
            <div className="ol-bubble ol-bubble-user">{c.userMsg}</div>
          </div>
        </div>
        <div className="ol-safe-card">
          <span className="ol-safe-icon" aria-hidden="true">!</span>
          <div>
            <strong>{c.cardTitle}</strong>
            <p>{c.cardSub}</p>
            <span className="ol-safe-phone">210 123 4567</span>
          </div>
        </div>
        <p className="ol-safe-foot">{c.foot}</p>
      </ChatAppShell>
    </ProductFrame>
  );
};

const BotHumanVisual = () => {
  const c = useCopy().botHuman;
  return (
    <ProductFrame title="clinic.gr · Pyxida" badge="Live" variant="bot-human">
      <ChatAppShell
        header={
          <>
            <span className="ol-chat-app-avatar">P</span>
            <div>
              <strong>Pyxida</strong>
              <span className="ol-chat-live-status">
                <span className="ol-chat-live-dot" aria-hidden="true" />
                {c.status}
              </span>
            </div>
          </>
        }
      >
        <div className="ol-chat-row ol-chat-row--user">
          <div className="ol-chat-stack">
            <div className="ol-bubble ol-bubble-user">{c.userMsg}</div>
          </div>
        </div>
        <div className="ol-chat-row ol-chat-row--bot">
          <span className="ol-chat-avatar">P</span>
          <div className="ol-chat-stack">
            <div className="ol-bubble ol-bubble-bot" dangerouslySetInnerHTML={{ __html: c.botReply }} />
            <span className="ol-chat-time">{c.replyTime1}</span>
          </div>
        </div>
        <div className="ol-chat-row ol-chat-row--user">
          <div className="ol-chat-stack">
            <div className="ol-bubble ol-bubble-user">{c.userConfirm}</div>
          </div>
        </div>
        <div className="ol-chat-row ol-chat-row--bot">
          <span className="ol-chat-avatar">P</span>
          <div className="ol-chat-stack">
            <div className="ol-bubble ol-bubble-bot">{c.botConfirm}</div>
            <span className="ol-chat-time">{c.replyTime2}</span>
          </div>
        </div>
        <div className="ol-human-stats" aria-hidden="true">
          <div className="ol-human-stat">
            <span>{c.statAvg}</span>
            <strong>1.2″</strong>
          </div>
          <div className="ol-human-stat ol-human-stat--ok">
            <span>{c.statStalled}</span>
            <strong>0</strong>
          </div>
        </div>
      </ChatAppShell>
    </ProductFrame>
  );
};

const BotDocsVisual = () => {
  const c = useCopy().botDocs;
  return (
    <ProductFrame title="Pyxida · Knowledge" badge="99%" variant="bot-docs">
      <div className="ol-docs-ui">
        <div className="ol-docs-head">
          <div className="ol-docs-ring" aria-hidden="true">
            <svg viewBox="0 0 64 64">
              <circle cx="32" cy="32" r="27" fill="none" stroke="#e8edf5" strokeWidth="6" />
              <circle
                cx="32"
                cy="32"
                r="27"
                fill="none"
                stroke="#4a7ab5"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray="169.6"
                strokeDashoffset="1.7"
                transform="rotate(-90 32 32)"
              />
            </svg>
            <strong>99%</strong>
          </div>
          <div>
            <span className="ol-docs-label">{c.accuracyLabel}</span>
            <strong className="ol-docs-title">{c.title}</strong>
            <p className="ol-docs-sub">{c.sub}</p>
          </div>
        </div>
        <ul className="ol-docs-list">
          {c.docs.map((doc) => (
            <li key={doc}>
              <span className="ol-docs-file" aria-hidden="true">📄</span>
              <span>{doc}</span>
              <em>synced</em>
            </li>
          ))}
        </ul>
        <div className="ol-docs-preview">
          <span className="ol-docs-preview-label">{c.previewLabel}</span>
          <p dangerouslySetInnerHTML={{ __html: c.previewText }} />
        </div>
      </div>
    </ProductFrame>
  );
};

const CrmStatChart = ({ chartHead, chartDays }) => (
  <div className="ol-crm-chart" aria-hidden="true">
    <div className="ol-crm-chart-head">
      <span>{chartHead}</span>
      <em>+18%</em>
    </div>
    <svg className="ol-crm-chart-svg" viewBox="0 0 240 72" preserveAspectRatio="none">
      <defs>
        <linearGradient id="olChartFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ea580c" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#ea580c" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <path
        d="M0 58 L30 52 L60 44 L90 38 L120 30 L150 26 L180 18 L210 14 L240 8 L240 72 L0 72 Z"
        fill="url(#olChartFill)"
      />
      <polyline
        points="0,58 30,52 60,44 90,38 120,30 150,26 180,18 210,14 240,8"
        fill="none"
        stroke="#ea580c"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    <div className="ol-crm-chart-labels">
      {chartDays.map((d) => (
        <span key={d}>{d}</span>
      ))}
    </div>
  </div>
);

const GoogleCalendarIcon = () => (
  <svg className="ol-gcal-icon" viewBox="0 0 24 24" aria-hidden="true">
    <rect x="3" y="4" width="18" height="17" rx="2" fill="#fff" stroke="#dadce0" strokeWidth="0.5" />
    <rect x="3" y="4" width="18" height="5" rx="2" fill="#1a73e8" />
    <rect x="3" y="7" width="18" height="2" fill="#1a73e8" />
    <rect x="7" y="2" width="2" height="4" rx="1" fill="#1a73e8" />
    <rect x="15" y="2" width="2" height="4" rx="1" fill="#1a73e8" />
    <text x="12" y="17" textAnchor="middle" fill="#3c4043" fontSize="8" fontWeight="500" fontFamily="Roboto, Arial, sans-serif">11</text>
  </svg>
);

const GoogleCalendarPanel = () => {
  const copy = useCopy();
  const events = copy.calendarEvents;
  const days = [
    { key: 'mon', dow: 'MON', date: 10, events: events[0] ? [events[0]] : [] },
    { key: 'tue', dow: 'TUE', date: 11, today: true, events: events[1] ? [events[1]] : [] },
    { key: 'wed', dow: 'WED', date: 12, events: events[2] ? [events[2]] : [] },
    { key: 'thu', dow: 'THU', date: 13, events: [] },
  ];
  const hours = ['9 AM', '10 AM', '11 AM', '12 PM'];

  return (
    <div className="ol-gcal">
      <div className="ol-gcal-topbar">
        <div className="ol-gcal-topbar-left">
          <span className="ol-gcal-menu" aria-hidden="true">
            <span /><span /><span />
          </span>
          <div className="ol-gcal-title-lockup">
            <GoogleCalendarIcon />
            <span className="ol-gcal-title">Calendar</span>
          </div>
        </div>
        <div className="ol-gcal-topbar-right">
          <span className="ol-gcal-today">Today</span>
          <span className="ol-gcal-nav" aria-hidden="true">
            <span className="ol-gcal-nav-btn">‹</span>
            <span className="ol-gcal-nav-btn">›</span>
          </span>
          <span className="ol-gcal-month">March 2026</span>
          <span className="ol-gcal-view-btn">Week <span aria-hidden="true">▾</span></span>
        </div>
      </div>

      <div className="ol-gcal-weekview">
        <div className="ol-gcal-weekhead">
          <div className="ol-gcal-gutter" aria-hidden="true" />
          {days.map((day) => (
            <div key={day.key} className={`ol-gcal-dayhead${day.today ? ' is-today' : ''}`}>
              <span className="ol-gcal-dow">{day.dow}</span>
              <span className="ol-gcal-date">{day.date}</span>
            </div>
          ))}
        </div>

        <div className="ol-gcal-weekbody">
          <div className="ol-gcal-times">
            {hours.map((hour) => (
              <span key={hour} className="ol-gcal-time">{hour}</span>
            ))}
          </div>
          <div className="ol-gcal-cols">
            {days.map((day) => (
              <div key={day.key} className={`ol-gcal-col${day.today ? ' is-today' : ''}`}>
                {hours.map((hour) => (
                  <div key={hour} className="ol-gcal-slot" />
                ))}
                {day.events.map((event) => (
                  <div
                    key={event.title}
                    className={`ol-gcal-block ol-gcal-block--${event.color}${event.new ? ' ol-gcal-block--new' : ''}`}
                    style={{ top: event.top, height: event.height }}
                  >
                    <span className="ol-gcal-block-title">{event.title}</span>
                    <span className="ol-gcal-block-time">{event.time}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const CrmCaptureVisual = () => {
  const c = useCopy().crmCapture;
  return (
    <ProductFrame title="CRM · Pyxida Dashboard" badge={c.badge} variant="crm-capture">
      <div className="ol-crm-dashboard">
        <nav className="ol-crm-nav" aria-hidden="true">
          {c.tabs.map((tab, i) => (
            <span key={tab} className={i === 0 ? 'is-active' : ''}>{tab}</span>
          ))}
        </nav>
        <div className="ol-crm-stats">
          {c.stats.map((stat) => (
            <div key={stat.label} className={`ol-crm-stat ol-crm-stat--${stat.tone}`}>
              <span className="ol-crm-stat-label">{stat.label}</span>
              <strong className="ol-crm-stat-value">{stat.value}</strong>
              <span className="ol-crm-stat-delta">{stat.delta}</span>
            </div>
          ))}
        </div>
        <div className="ol-crm-dashboard-main">
          <CrmStatChart chartHead={c.chartHead} chartDays={c.chartDays} />
          <div className="ol-crm-feed">
            <div className="ol-crm-toast">
              <span className="ol-crm-toast-dot" />
              <div>
                <strong>{c.toastTitle}</strong>
                <span>{c.toastSub}</span>
              </div>
            </div>
            <ul className="ol-crm-rows ol-crm-rows--compact">
              {c.rows.map((row) => (
                <li key={row.name} className={row.new ? 'ol-crm-row--new' : ''}>
                  <span className="ol-crm-avatar">{row.initials}</span>
                  <div className="ol-crm-row-main">
                    <span className="ol-crm-name">{row.name}</span>
                    <span className="ol-crm-tag">{row.tag}</span>
                  </div>
                  <span className="ol-crm-time">{row.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="ol-crm-foot ol-crm-foot--large">
          {c.foot.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
    </ProductFrame>
  );
};

const CrmQueuesVisual = () => {
  const c = useCopy().crmQueues;
  const events = useCopy().calendarEvents;
  return (
    <ProductFrame title={c.title} badge="Live sync" variant="crm-queues">
      <div className="ol-crm-split">
        <div className="ol-kanban ol-kanban--compact">
          <div className="ol-kanban-col ol-kanban-col--hot">
            <div className="ol-kanban-head">
              <span>{c.apptQueue}</span>
              <em>{c.apptQueueEm}</em>
            </div>
            <div className="ol-kanban-card ol-kanban-card--new">
              <strong>{events[1]?.title || 'Nikos A.'}</strong>
              <span>{c.newRequest}</span>
              <div className="ol-kanban-pill">→ Calendar</div>
            </div>
            <div className="ol-kanban-card">
              <strong>{events[2]?.title || 'Eleni M.'}</strong>
              <span>{c.confirm}</span>
            </div>
          </div>
          <div className="ol-kanban-col">
            <div className="ol-kanban-head">
              <span>{c.routine}</span>
              <em>{c.routineEm}</em>
            </div>
            <div className="ol-kanban-card">
              <strong>{c.prescription}</strong>
              <span>K. Papadopoulou</span>
            </div>
            <div className="ol-kanban-card">
              <strong>{c.certificate}</strong>
              <span>A. Georgiou</span>
            </div>
          </div>
        </div>
        <GoogleCalendarPanel />
      </div>
    </ProductFrame>
  );
};

export const PyxidaSceneVisual = ({ visual }) => {
  if (visual === 'bot-hours') return <BotHoursVisual />;
  if (visual === 'bot-night') return <BotNightVisual />;
  if (visual === 'bot-safe') return <BotSafeVisual />;
  if (visual === 'bot-human') return <BotHumanVisual />;
  if (visual === 'bot-docs') return <BotDocsVisual />;
  if (visual === 'crm-capture') return <CrmCaptureVisual />;
  if (visual === 'crm-queues') return <CrmQueuesVisual />;
  return null;
};

const BookChannels = () => {
  const c = useCopy().praxiBook;
  const channels = [
    { name: 'WhatsApp', tone: 'wa' },
    { name: 'Viber', tone: 'vb' },
    { name: 'Instagram', tone: 'ig' },
    { name: 'Facebook', tone: 'fb' },
    { name: c.phoneChannel, tone: 'ph' },
  ];
  return (
    <div className="ol-book-channels">
      <span className="ol-book-channels-label">{c.channelsLabel}</span>
      <div className="ol-book-channel-row">
        {channels.map((ch) => (
          <span key={ch.name} className={`ol-book-channel ol-book-channel--${ch.tone}`}>
            {ch.name}
          </span>
        ))}
      </div>
    </div>
  );
};

const CalendarVisual = () => {
  const c = useCopy().praxiBook;
  return (
    <ProductFrame title={c.frameTitle} badge="Confirmed" variant="praxi-book">
      <div className="ol-book-ui">
        <BookChannels />
        <GoogleCalendarPanel />
        <div className="ol-book-toast">
          <span className="ol-book-toast-icon" aria-hidden="true">✓</span>
          <div>
            <strong>{c.toastTitle}</strong>
            <p>{c.toastSub}</p>
          </div>
        </div>
      </div>
    </ProductFrame>
  );
};

const RecoveryVisual = () => {
  const c = useCopy().praxiRecovery;
  return (
    <ProductFrame title={c.frameTitle} badge="Recovery" variant="praxi-recovery">
      <div className="ol-recovery-ui">
        <div className="ol-rec-timeline">
          {c.steps.map((step, i) => (
            <div key={step.title} className={`ol-rec-step${i === 0 ? ' ol-rec-step--active' : ''}`}>
              <span className={`ol-rec-step-dot ol-rec-step-dot--${step.icon}`} aria-hidden="true" />
              <div>
                <strong>{step.title}</strong>
                <p>{step.sub}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="ol-rec-review-card">
          <div className="ol-rec-stars">
            {[1, 2, 3, 4, 5].map((s) => <span key={s}>★</span>)}
          </div>
          <p>{c.review}</p>
        </div>
      </div>
    </ProductFrame>
  );
};

const VoiceVisual = () => {
  const c = useCopy().praxiVoice;
  const isMobile = useIsMobileVisual();

  return (
    <ProductFrame title={c.frameTitle} badge="Live 24/7" variant="praxi-voice">
      <div className="ol-voice-ui">
        <div className="ol-voice-call">
          <div className="ol-voice-call-head">
            <span className="ol-voice-live">
              <span className="ol-voice-live-dot" />
              {c.liveCall}
            </span>
            <span className="ol-voice-duration">02:14</span>
          </div>
          <div className="ol-voice-avatar" aria-hidden="true">MK</div>
          <strong className="ol-voice-caller">{c.caller}</strong>
          <span className="ol-voice-context">{c.context}</span>
          <div className="ol-wave-bars ol-wave-bars--voice">
            {Array.from({ length: 20 }, (_, i) => {
              const scaleY = 0.35 + (i % 5) * 0.12;
              if (isMobile) {
                return (
                  <span
                    key={i}
                    className="ol-wave-bar"
                    style={{ transform: `scaleY(${scaleY})` }}
                  />
                );
              }
              return (
                <motion.span
                  key={i}
                  className="ol-wave-bar"
                  animate={{ scaleY: [0.3, 1, 0.5, 0.85, 0.35] }}
                  transition={{ duration: 1.15, repeat: Infinity, delay: i * 0.05, ease: 'easeInOut' }}
                />
              );
            })}
          </div>
          <div className="ol-voice-actions" aria-hidden="true">
            <span className="ol-voice-btn ol-voice-btn--end">{c.end}</span>
            <span className="ol-voice-btn ol-voice-btn--hold">{c.hold}</span>
          </div>
        </div>
        <div className="ol-voice-stats">
          {c.stats.map((stat) => (
            <div key={stat.label} className="ol-voice-stat">
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
            </div>
          ))}
        </div>
      </div>
    </ProductFrame>
  );
};

export default function ModuleVisual({ tierId }) {
  if (tierId === 'kleinei') return <CalendarVisual />;
  if (tierId === 'fernei') return <RecoveryVisual />;
  if (tierId === 'sikonei') return <VoiceVisual />;
  return null;
}

export { ModuleVisual };
