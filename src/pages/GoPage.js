import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import FlowBuilder from '../components/flow/FlowBuilder';
import BookingCalendar from '../components/flow/BookingCalendar';
import { useLanguage } from '../contexts/LanguageContext';
import { sendContactEmail } from '../services/emailService';
import '../components/flow/GoPage.css';

/*
 * /go: «Go with the fλow». Build your own fλow (live graphic; the priced offer is emailed as a PDF),
 * then talk to us: book 30 minutes from the calendar, or send a simple message.
 * /demo, /book-demo and /contact land here (#book / #contact).
 */

const COPY = {
  el: {
    talkTitle: 'Μιλήστε μαζί μας',
    talkLead: 'Όποιο από τα δύο σας ταιριάζει. Απαντάμε μέσα σε μία εργάσιμη.',
    tabs: ['Κλείστε 30 λεπτά', 'Γράψτε μας'],
    cal: {
      free: 'Ελεύθερο', booked: 'Κλεισμένο', tz: 'Ώρα Ελλάδας', prevWeek: 'Προηγούμενη εβδομάδα', nextWeek: 'Επόμενη εβδομάδα',
      gridAria: 'Διαθεσιμότητα για βιντεοκλήση 30 λεπτών, Δευτέρα έως Παρασκευή',
    },
    pick: 'Διαλέξτε μια ελεύθερη ώρα στο ημερολόγιο.',
    chosen: 'Η ώρα σας',
    change: 'Αλλαγή',
    what: 'Τι θέλετε να δούμε μαζί;',
    whatA: ['Το fλow ζωντανά', 'Την προσφορά μου', 'Χρηματοδότηση ή χορηγία', 'Κάτι άλλο'],
    attach: 'Να επισυναφθεί η ροή που φτιάξατε παραπάνω',
    name: 'Όνομα', org: 'Οργανισμός', email: 'Email', phone: 'Τηλέφωνο (προαιρετικό)', message: 'Το μήνυμά σας',
    consentBook: 'Συμφωνώ να επικοινωνήσει μαζί μου η SimasiaAI για αυτό το ραντεβού.',
    consentMsg: 'Συμφωνώ να επικοινωνήσει μαζί μου η SimasiaAI για το μήνυμά μου.',
    book: 'Ζητήστε αυτή την ώρα', send: 'Στείλτε το μήνυμα', sending: 'Αποστολή…',
    booked: (t) => `Το αίτημα για ${t} στάλθηκε. Θα σας επιβεβαιώσουμε με πρόσκληση και σύνδεσμο βιντεοκλήσης μέσα σε μία εργάσιμη.`,
    sent: 'Το μήνυμά σας στάλθηκε. Θα σας απαντήσουμε μέσα σε μία εργάσιμη.',
    required: 'Συμπληρώστε όνομα, email και τη συγκατάθεση.',
    requiredSlot: 'Διαλέξτε πρώτα μια ώρα στο ημερολόγιο.',
    fallback: 'Η αποστολή δεν έγινε από εδώ. Ανοίξτε το email σας με όλα έτοιμα:', fallbackLink: 'Άνοιγμα email',
    callPromise: ['30 λεπτά, με βίντεο', 'Με τα δικά σας παραδείγματα', 'Χωρίς δέσμευση'],
    or: 'ή απευθείας στο',
  },
  en: {
    talkTitle: 'Talk to us',
    talkLead: 'Whichever suits you. We reply within one working day.',
    tabs: ['Book 30 minutes', 'Write to us'],
    cal: {
      free: 'Free', booked: 'Booked', tz: 'Greek time (EET)', prevWeek: 'Previous week', nextWeek: 'Next week',
      gridAria: 'Availability for a 30-minute video call, Monday to Friday',
    },
    pick: 'Choose a free time in the calendar.',
    chosen: 'Your time',
    change: 'Change',
    what: 'What would you like to look at together?',
    whatA: ['fλow, live', 'My offer', 'Funding or sponsorship', 'Something else'],
    attach: 'Attach the flow you built above',
    name: 'Name', org: 'Organisation', email: 'Email', phone: 'Phone (optional)', message: 'Your message',
    consentBook: 'I agree that SimasiaAI may contact me about this appointment.',
    consentMsg: 'I agree that SimasiaAI may contact me about my message.',
    book: 'Request this time', send: 'Send the message', sending: 'Sending…',
    booked: (t) => `Your request for ${t} has been sent. We will confirm with an invitation and a video link within one working day.`,
    sent: 'Your message has been sent. We will reply within one working day.',
    required: 'Please fill in name, email and consent.',
    requiredSlot: 'Please choose a time in the calendar first.',
    fallback: 'It could not be sent from here. Open your email with everything ready:', fallbackLink: 'Open email',
    callPromise: ['30 minutes, on video', 'With your own examples', 'No commitment'],
    or: 'or directly at',
  },
};

const mailtoFor = (subject, body) => `mailto:contact@simasiaai.gr?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body.slice(0, 1800))}`;

const GoTalk = ({ lang, flowSummary }) => {
  const c = COPY[lang];
  const { hash } = useLocation();
  const [tab, setTab] = useState(hash === '#contact' ? 1 : 0);
  useEffect(() => { if (hash === '#contact') setTab(1); if (hash === '#book') setTab(0); }, [hash]);
  const [slot, setSlot] = useState(null);
  const [taken, setTaken] = useState([]);
  const [what, setWhat] = useState(0);
  const [attach, setAttach] = useState(true);
  const [form, setForm] = useState({ name: '', org: '', email: '', phone: '', message: '', consent: false });
  const [status, setStatus] = useState({ state: 'idle', mailto: '', text: '' });
  const set = (k) => (e) => setForm({ ...form, [k]: k === 'consent' ? e.target.checked : e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (tab === 0 && !slot) { setStatus({ state: 'invalid', mailto: '', text: c.requiredSlot }); return; }
    if (!form.name || !form.email || !form.consent) { setStatus({ state: 'invalid', mailto: '', text: c.required }); return; }
    setStatus({ state: 'sending', mailto: '', text: '' });
    const lines = tab === 0
      ? [`Αίτημα ραντεβού 30 λεπτών: ${slot.text} (ώρα Ελλάδας)`, `Θέμα: ${c.whatA[what]}`]
      : ['Μήνυμα από τη φόρμα επικοινωνίας'];
    if (form.phone) lines.push(`Τηλέφωνο: ${form.phone}`);
    if (form.message) lines.push('', form.message);
    if (attach && flowSummary) lines.push('', '— Η ροή που έφτιαξε —', flowSummary);
    const text = lines.join('\n');
    const subject = tab === 0 ? `fλow · Ραντεβού ${slot.start} · ${form.org || form.name}` : `fλow · Μήνυμα · ${form.org || form.name}`;
    try {
      await sendContactEmail({ fromName: form.name, fromEmail: form.email, organizationType: tab === 0 ? 'fλow · Ραντεβού 30 λεπτών' : 'fλow · Επικοινωνία', companyName: form.org, message: text });
      if (tab === 0) setTaken((t) => [...t, slot.id]);
      setStatus({ state: 'sent', mailto: '', text: tab === 0 ? c.booked(slot.text) : c.sent });
    } catch (err) {
      setStatus({ state: 'fallback', mailto: mailtoFor(subject, text), text: '' });
    }
  };

  return (
    <section className="go-talk" aria-labelledby="go-talk-t">
      <span id="book" className="go-anchor" />
      <span id="contact" className="go-anchor" />
      <div className="go-in">
        <h2 id="go-talk-t">{c.talkTitle}</h2>
        <p className="go-lead">{c.talkLead}</p>
        <div className="go-tabs" role="tablist">
          {c.tabs.map((t, i) => (
            <button key={t} type="button" role="tab" aria-selected={tab === i} className={tab === i ? 'is-on' : ''} onClick={() => { setTab(i); setStatus({ state: 'idle', mailto: '', text: '' }); }}>{t}</button>
          ))}
        </div>

        <div className={`go-panel${tab === 0 ? ' is-book' : ' is-msg'}`}>
          {tab === 0 && (
            <div className="go-cal">
              <ul className="go-promise">{c.callPromise.map((p) => <li key={p}>{p}</li>)}</ul>
              <BookingCalendar c={c.cal} lang={lang} value={slot} onChange={(s) => { setSlot(s); setStatus({ state: 'idle', mailto: '', text: '' }); if (window.innerWidth < 960) setTimeout(() => { const el = document.querySelector('.go-form'); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 120); }} taken={taken} />
            </div>
          )}

          <form className="go-form" onSubmit={submit} noValidate>
            {tab === 0 && (
              <div className={`go-slot${slot ? ' is-on' : ''}`}>
                {slot ? (<><small>{c.chosen}</small><b>{slot.text}</b></>) : <span>{c.pick}</span>}
              </div>
            )}
            {tab === 0 && (
              <>
                <p className="go-q">{c.what}</p>
                <div className="go-chips">{c.whatA.map((a, i) => <button key={a} type="button" className={`go-chip${what === i ? ' is-on' : ''}`} aria-pressed={what === i} onClick={() => setWhat(i)}>{a}</button>)}</div>
              </>
            )}
            <div className="go-fields">
              <label><span>{c.name}</span><input value={form.name} onChange={set('name')} autoComplete="name" /></label>
              <label><span>{c.org}</span><input value={form.org} onChange={set('org')} autoComplete="organization" /></label>
              <label><span>{c.email}</span><input type="email" value={form.email} onChange={set('email')} autoComplete="email" /></label>
              <label><span>{c.phone}</span><input type="tel" value={form.phone} onChange={set('phone')} autoComplete="tel" /></label>
              {tab === 1 && <label className="go-wide"><span>{c.message}</span><textarea rows="5" value={form.message} onChange={set('message')} /></label>}
            </div>
            {flowSummary && <label className="go-check"><input type="checkbox" checked={attach} onChange={(e) => setAttach(e.target.checked)} /> <span>{c.attach}</span></label>}
            <label className="go-check"><input type="checkbox" checked={form.consent} onChange={set('consent')} /> <span>{tab === 0 ? c.consentBook : c.consentMsg}</span></label>
            <button type="submit" className="go-btn is-ink go-submit" disabled={status.state === 'sending'}>{status.state === 'sending' ? c.sending : tab === 0 ? c.book : c.send}</button>
            <p role="status" className={`go-status is-${status.state}`}>
              {status.text}
              {status.state === 'fallback' && (<>{c.fallback} <a href={status.mailto}>{c.fallbackLink}</a></>)}
            </p>
            <p className="go-mail">{c.or} <a href="mailto:contact@simasiaai.gr">contact@simasiaai.gr</a></p>
          </form>
        </div>
      </div>
    </section>
  );
};

const GoPage = () => {
  const { language } = useLanguage();
  const lang = language === 'en' ? 'en' : 'el';
  const [flowSummary, setFlowSummary] = useState('');
  return (
    <>
      <FlowBuilder onSummary={setFlowSummary} />
      <GoTalk lang={lang} flowSummary={flowSummary} />
    </>
  );
};

export default GoPage;
