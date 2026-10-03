import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { sendContactEmail } from '../../services/emailService';
import { MODULES } from './modules';

/*
 * «Ας δούμε πού εμποδίζεται η ροή σας.» A six-question flow diagnosis, one question
 * at a time. The map on the right fills as you answer: where the flow is blocked
 * (DialogosAI / PraxisAI / MetronAI), an honest estimate of hours lost, and where
 * to start. The answers can be sent to SimasiaAI for the full team map.
 */

const COPY = {
  el: {
    of: 'από',
    back: 'Πίσω',
    nextQ: 'Επόμενη',
    seeMap: 'Δείτε τον χάρτη',
    restart: 'Από την αρχή',
    multi: 'Διαλέξτε όσα ισχύουν.',
    q: [
      { k: 'who', t: 'Ποιος είστε;', a: ['Οργανισμός ή ΜΚΟ', 'Ιατρείο ή κλινική'] },
      { k: 'calls', t: 'Πόσα τηλέφωνα και μηνύματα δέχεστε τη μέρα;', a: ['Λιγότερα από 10', '10 έως 30', 'Πάνω από 30'] },
      { k: 'repeat', t: 'Πόσα από αυτά είναι οι ίδιες ερωτήσεις, ξανά και ξανά;', a: ['Λίγα', 'Περίπου τα μισά', 'Τα περισσότερα'] },
      { k: 'where', t: 'Πού κρατάτε τις πληροφορίες των ανθρώπων σας;', a: ['Σε χαρτιά', 'Σε Excel', 'Σε email και Viber', 'Σε ένα πρόγραμμα', 'Στο μυαλό μας'], multi: true },
      { k: 'miss', t: 'Πόσο συχνά σας ξεφεύγει μια προθεσμία ή ένα ραντεβού;', a: ['Σχεδόν ποτέ', 'Μία φορά τον μήνα', 'Κάθε εβδομάδα'] },
      { k: 'report', t: 'Πόσο εύκολα δείχνετε στην ομάδα ή στους χορηγούς τι πετύχατε;', a: ['Εύκολα', 'Με αρκετό κόπο', 'Δεν μπορούμε ακόμα'] },
    ],
    mapTitle: 'Ο χάρτης της ροής σας',
    mapEmpty: 'Απαντήστε και ο χάρτης γεμίζει εδώ.',
    blocked: 'πόσο εμποδίζεται',
    where: { dialogos: 'Ερωτήσεις και τηλέφωνα', praxis: 'Πληροφορίες και προθεσμίες', metron: 'Δεδομένα και αναφορές' },
    hours: (h) => `≈ ${h} ώρες την εβδομάδα σε ερωτήσεις που επαναλαμβάνονται`,
    hoursNote: 'Εκτίμηση με 4 λεπτά ανά επαναλαμβανόμενη ερώτηση, 5 μέρες την εβδομάδα.',
    start: 'Ξεκινήστε από',
    calm: 'Η ροή σας κυλά ήδη καλά. Ένα μικρό βήμα αρκεί.',
    sendTitle: 'Θέλετε τον πλήρη χάρτη για την ομάδα σας;',
    sendLead: 'Σας στέλνουμε μέσα σε μία εργάσιμη τον χάρτη και ένα ερωτηματολόγιο 5 λεπτών για όλη την ομάδα.',
    name: 'Όνομα', org: 'Οργανισμός', email: 'Email',
    consent: 'Συμφωνώ να επικοινωνήσει μαζί μου η SimasiaAI για τη διάγνωση.',
    send: 'Στείλτε μου τον χάρτη', sending: 'Αποστολή…',
    sent: 'Τον λάβαμε. Θα σας γράψουμε μέσα σε μία εργάσιμη.',
    required: 'Συμπληρώστε όνομα, email και τη συγκατάθεση.',
    fallback: 'Η αποστολή δεν έγινε από εδώ. Ανοίξτε το email σας με τις απαντήσεις έτοιμες:', fallbackLink: 'Άνοιγμα email',
    build: 'Ή φτιάξτε το fλow σας τώρα',
  },
  en: {
    of: 'of',
    back: 'Back',
    nextQ: 'Next',
    seeMap: 'See the map',
    restart: 'Start again',
    multi: 'Choose all that apply.',
    q: [
      { k: 'who', t: 'Who are you?', a: ['Organisation or NGO', 'Practice or clinic'] },
      { k: 'calls', t: 'How many calls and messages do you get a day?', a: ['Fewer than 10', '10 to 30', 'More than 30'] },
      { k: 'repeat', t: 'How many of them are the same questions, again and again?', a: ['A few', 'About half', 'Most of them'] },
      { k: 'where', t: 'Where do you keep information about your people?', a: ['On paper', 'In Excel', 'In email and Viber', 'In one system', 'In our heads'], multi: true },
      { k: 'miss', t: 'How often does a deadline or appointment slip?', a: ['Almost never', 'Once a month', 'Every week'] },
      { k: 'report', t: 'How easily can you show your team or sponsors what you achieved?', a: ['Easily', 'With a lot of effort', 'We can\'t yet'] },
    ],
    mapTitle: 'The map of your flow',
    mapEmpty: 'Answer, and the map fills in here.',
    blocked: 'how blocked',
    where: { dialogos: 'Questions and calls', praxis: 'Information and deadlines', metron: 'Data and reports' },
    hours: (h) => `≈ ${h} hours a week on questions that repeat`,
    hoursNote: 'Estimate at 4 minutes per repeated question, 5 days a week.',
    start: 'Start with',
    calm: 'Your flow already runs well. One small step is enough.',
    sendTitle: 'Would you like the full map for your team?',
    sendLead: 'Within one working day we send you the map and a 5-minute survey for your whole team.',
    name: 'Name', org: 'Organisation', email: 'Email',
    consent: 'I agree that SimasiaAI may contact me about this diagnosis.',
    send: 'Send me the map', sending: 'Sending…',
    sent: 'Received. We will write to you within one working day.',
    required: 'Please fill in name, email and consent.',
    fallback: 'It could not be sent from here. Open your email with the answers ready:', fallbackLink: 'Open email',
    build: 'Or build your fλow now',
  },
};

const CALLS = [6, 20, 40];
const REPEAT = [0.2, 0.5, 0.75];

export const scoreDiagnosis = (ans) => {
  const v = (k) => (typeof ans[k] === 'number' ? ans[k] : null);
  const where = Array.isArray(ans.where) ? ans.where : [];
  const dialogos = v('calls') === null ? null : Math.round(((v('calls') + (v('repeat') ?? 1)) / 4) * 100);
  const scatter = where.filter((i) => i !== 3).length; // anything but "one system"
  const praxis = v('miss') === null && !where.length ? null : Math.min(100, Math.round(((v('miss') ?? 0) / 2) * 60 + Math.min(scatter, 3) * 14));
  const metron = v('report') === null ? null : Math.round((v('report') / 2) * 100);
  const hours = v('calls') === null || v('repeat') === null ? null
    : Math.max(1, Math.round((CALLS[v('calls')] * REPEAT[v('repeat')] * 4 * 5) / 60));
  return { dialogos, praxis, metron, hours };
};

const FlowDiagnosis = ({ lang = 'el' }) => {
  const c = COPY[lang];
  const [i, setI] = useState(0);
  const [ans, setAns] = useState({});
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ name: '', org: '', email: '', consent: false });
  const [status, setStatus] = useState({ state: 'idle', mailto: '' });
  const q = c.q[i];
  const total = c.q.length;
  const score = useMemo(() => scoreDiagnosis(ans), [ans]);
  const ranked = MODULES.map((m) => ({ ...m, v: score[m.id] })).filter((m) => m.v !== null);
  const top = ranked.length ? ranked.reduce((a, b) => (b.v > a.v ? b : a)) : null;
  const answered = (k) => (Array.isArray(ans[k]) ? ans[k].length > 0 : ans[k] !== undefined);

  const pick = (k, idx, multi) => {
    if (multi) {
      setAns((s) => { const cur = Array.isArray(s[k]) ? s[k] : []; return { ...s, [k]: cur.includes(idx) ? cur.filter((x) => x !== idx) : [...cur, idx] }; });
      return;
    }
    setAns((s) => ({ ...s, [k]: idx }));
    // single choice: glide to the next question
    setTimeout(() => { if (i < total - 1) setI(i + 1); else setDone(true); }, 260);
  };

  const summary = () => {
    const lines = ['fλow · Διάγνωση ροής'];
    c.q.forEach((qq) => {
      const a = ans[qq.k];
      if (a === undefined) return;
      lines.push(`${qq.t} ${Array.isArray(a) ? a.map((x) => qq.a[x]).join(', ') : qq.a[a]}`);
    });
    ranked.forEach((m) => lines.push(`${m.name} (${c.where[m.id]}): ${m.v}/100`));
    if (score.hours) lines.push(c.hours(score.hours));
    if (top) lines.push(`${c.start}: ${top.name}`);
    return lines.join('\n');
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.consent) { setStatus({ state: 'invalid', mailto: '' }); return; }
    setStatus({ state: 'sending', mailto: '' });
    const text = summary();
    try {
      await sendContactEmail({ fromName: form.name, fromEmail: form.email, organizationType: 'fλow · Διάγνωση ροής', companyName: form.org, message: text });
      setStatus({ state: 'sent', mailto: '' });
    } catch (err) {
      const mailto = `mailto:contact@simasiaai.gr?subject=${encodeURIComponent(`fλow · Διάγνωση ροής · ${form.org || form.name}`)}&body=${encodeURIComponent(text.slice(0, 1800))}`;
      setStatus({ state: 'fallback', mailto });
    }
  };

  const forParam = ans.who === 1 ? 'med' : 'ngo';

  return (
    <div className="fld">
      <div className="fld-q">
        {!done ? (
          <>
            <div className="fld-progress" aria-hidden="true">
              {c.q.map((qq, n) => <span key={qq.k} className={n < i ? 'is-done' : n === i ? 'is-now' : ''} />)}
            </div>
            <p className="fld-count">{i + 1} {c.of} {total}</p>
            <h3 className="fld-title">{q.t}</h3>
            {q.multi && <p className="fld-hint">{c.multi}</p>}
            <div className="fld-answers" role="group" aria-label={q.t}>
              {q.a.map((a, n) => {
                const on = q.multi ? (ans[q.k] || []).includes(n) : ans[q.k] === n;
                return <button key={a} type="button" className={`fld-a${on ? ' is-on' : ''}`} aria-pressed={on} onClick={() => pick(q.k, n, q.multi)}>{a}</button>;
              })}
            </div>
            <div className="fld-nav">
              {i > 0 && <button type="button" className="fld-back" onClick={() => setI(i - 1)}>← {c.back}</button>}
              {(q.multi || answered(q.k)) && (
                <button type="button" className="fld-next" disabled={!answered(q.k)} onClick={() => (i < total - 1 ? setI(i + 1) : setDone(true))}>
                  {i < total - 1 ? c.nextQ : c.seeMap} →
                </button>
              )}
            </div>
          </>
        ) : (
          <form className="fld-send" onSubmit={submit} noValidate>
            <h3 className="fld-title">{c.sendTitle}</h3>
            <p className="fld-hint">{c.sendLead}</p>
            <div className="fld-fields">
              <label><span>{c.name}</span><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} autoComplete="name" /></label>
              <label><span>{c.org}</span><input value={form.org} onChange={(e) => setForm({ ...form, org: e.target.value })} autoComplete="organization" /></label>
              <label className="fld-wide"><span>{c.email}</span><input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} autoComplete="email" /></label>
            </div>
            <label className="fld-consent"><input type="checkbox" checked={form.consent} onChange={(e) => setForm({ ...form, consent: e.target.checked })} /> <span>{c.consent}</span></label>
            <div className="fld-nav">
              <button type="submit" className="fl-btn" disabled={status.state === 'sending' || status.state === 'sent'}>{status.state === 'sending' ? c.sending : c.send}</button>
              <Link className="fl-link" to={`/go?for=${forParam}`}>{c.build}</Link>
            </div>
            <p role="status" className="fld-status">
              {status.state === 'invalid' && c.required}
              {status.state === 'sent' && c.sent}
              {status.state === 'fallback' && (<>{c.fallback} <a href={status.mailto}>{c.fallbackLink}</a></>)}
            </p>
            <button type="button" className="fld-back" onClick={() => { setDone(false); setI(0); setAns({}); setStatus({ state: 'idle', mailto: '' }); }}>↺ {c.restart}</button>
          </form>
        )}
      </div>

      <aside className="fld-map" aria-live="polite">
        <p className="fld-map-t">{c.mapTitle}</p>
        {!ranked.length && <p className="fld-map-empty">{c.mapEmpty}</p>}
        {MODULES.map((m) => {
          const v = score[m.id];
          return (
            <div key={m.id} className={`fld-bar${v === null ? ' is-empty' : ''}${top && top.id === m.id && top.v >= 40 ? ' is-top' : ''}`} style={{ '--c': m.color }}>
              <div className="fld-bar-h"><b>{c.where[m.id]}</b><span>{m.name}</span></div>
              <div className="fld-bar-track" role="img" aria-label={`${c.where[m.id]}: ${v === null ? '–' : `${v}/100`} ${c.blocked}`}><i style={{ width: `${v === null ? 0 : Math.max(4, v)}%` }} /></div>
            </div>
          );
        })}
        {score.hours && (<><p className="fld-hours">{c.hours(score.hours)}</p><p className="fld-note">{c.hoursNote}</p></>)}
        {top && (top.v >= 40
          ? <p className="fld-start">{c.start} <b style={{ color: top.color }}>{top.name}</b>: {top.line[lang]}</p>
          : done ? <p className="fld-start">{c.calm}</p> : null)}
      </aside>
    </div>
  );
};

export default FlowDiagnosis;
