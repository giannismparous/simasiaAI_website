/*
 * The lead to contact@simasiaai.gr, with the PDF, for review. The team checks it and forwards it;
 * clientEmail() is the ready-written message for the visitor, included in the lead to copy or forward.
 * Table layout with inline styles, so it reads well in Gmail, Outlook and phones.
 */
import { COPY, COMPANY, BOOK_URL } from './copy.mjs';
import { priceLine } from './offer.mjs';

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
const FONT = "-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const INK = '#141413';
const ORANGE = '#d97757';
const MUTED = '#5e5d59';
const wordmark = (size, color) => `<span style="font:700 ${size}px ${FONT};color:${color};letter-spacing:-.5px">f<span style="color:${ORANGE}">&lambda;</span>ow</span>`;

const glanceRows = (offer) => {
  const c = COPY[offer.lang]; const p = offer.price;
  const row = (label, value, strong = false) => `<tr><td style="padding:6px 0;font:14px ${FONT};color:${MUTED}">${esc(label)}</td><td align="right" style="padding:6px 0;font:${strong ? 700 : 400} ${strong ? 18 : 14}px ${FONT};color:${INK}">${esc(value)}</td></tr>`;
  const rows = [];
  rows.push(row(c.mail.parts, offer.parts.map((x) => x.name).join(' + ')));
  if (p.kind === 'ngo') {
    rows.push(row(c.monthly, `${p.from ? `${c.from} ` : ''}${p.monthly}${c.perMonth}`, true));
    rows.push(row(c.setup, `${p.from ? `${c.from} ` : ''}${p.setup}`));
  } else if (p.kind === 'med') {
    rows.push(row(`${c.medAnnual} (${c.medAnnualSub})`, `${p.from ? `${c.from} ` : ''}${p.annual}${c.perMonth}`, true));
    if (!p.from) rows.push(row(c.medMonthly, `${p.monthly}${c.perMonth} ${c.medMonthlySub(p.monthlySetup)}`));
  } else {
    rows.push(row(c.spTotal(p.years), `${p.from ? `${c.from} ` : ''}${p.total}`, true));
    rows.push(row(c.spPerPerson, p.perPerson));
  }
  if (c.trial[offer.aud]) rows.push(`<tr><td colspan="2" style="padding:10px 0 2px;font:700 14px ${FONT};color:#b85f42">${esc(c.trial[offer.aud][0])}</td></tr>`);
  return rows.join('');
};

export const clientEmail = (offer) => {
  const c = COPY[offer.lang]; const m = c.mail;
  const name = offer.contact.name.split(' ')[0] || offer.contact.name;
  const time = offer.aud !== 'sponsor' && offer.time.month > 0 ? m.time(offer.time.month) : '';
  const ps = offer.aud === 'ngo' ? m.psFunding : m.ps;
  const html = `<!doctype html>
<html lang="${offer.lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(m.subject(offer.contact.org))}</title></head>
<body style="margin:0;padding:0;background:#f3f1ea">
<div style="display:none;max-height:0;overflow:hidden;opacity:0">${esc(m.preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f1ea"><tr><td align="center" style="padding:24px 12px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:14px;overflow:hidden">
<tr><td style="background:${INK};padding:26px 32px">${wordmark(30, '#faf9f5')}<div style="font:13px ${FONT};color:#bdbab0;margin-top:2px">${esc(c.by)}</div></td></tr>
<tr><td style="padding:30px 32px 8px;font:16px/1.6 ${FONT};color:${INK}">
<p style="margin:0 0 14px">${esc(m.hello(name))}</p>
<p style="margin:0 0 20px">${esc(m.p1[offer.aud])}</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#faf9f5;border:1px solid #e8e6dc;border-radius:12px"><tr><td style="padding:16px 20px">
<div style="font:700 11px ${FONT};letter-spacing:1px;text-transform:uppercase;color:#b85f42;margin-bottom:6px">${esc(m.glance)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${glanceRows(offer)}</table>
${time ? `<div style="font:14px ${FONT};color:#4f6b3a;margin-top:8px">${esc(time)}</div>` : ''}
</td></tr></table>
<p style="margin:20px 0 14px">${esc(m.p2[offer.aud])}</p>
<p style="margin:0 0 14px;color:${MUTED}">${esc(m.proof)}</p>
<p style="margin:0 0 22px">${esc(m.p3)}</p>
<table role="presentation" cellpadding="0" cellspacing="0"><tr><td style="background:${ORANGE};border-radius:24px"><a href="${BOOK_URL}" style="display:inline-block;padding:13px 28px;font:700 16px ${FONT};color:#ffffff;text-decoration:none">${esc(m.cta)} &rarr;</a></td></tr></table>
<p style="margin:26px 0 4px">${esc(m.sign[0])}</p>
<p style="margin:0;font-weight:700">${esc(m.sign[1])}</p>
<p style="margin:0 0 18px;color:${MUTED};font-size:14px">${esc(m.sign[2])} · <a href="mailto:contact@simasiaai.gr" style="color:${MUTED}">contact@simasiaai.gr</a></p>
<p style="margin:0 0 24px;font-size:14px;color:${MUTED}">${esc(ps)}</p>
</td></tr>
<tr><td style="padding:16px 32px 24px;border-top:1px solid #e8e6dc;font:12px/1.5 ${FONT};color:#8a877f">${esc(c.fine)}<br>${esc(COMPANY[offer.lang][0])}<br>${esc(COMPANY[offer.lang][1])}<br><br>${esc(m.footer)}</td></tr>
</table></td></tr></table></body></html>`;

  const text = [
    m.hello(name), '', m.p1[offer.aud], '',
    `${m.glance}:`, `· ${m.parts}: ${offer.parts.map((x) => x.name).join(' + ')}`, `· ${priceLine(offer)}`,
    c.trial[offer.aud] ? `· ${c.trial[offer.aud][0]}` : '', time ? `· ${time}` : '', '',
    m.p2[offer.aud], '', m.proof, '', m.p3, `${m.cta}: ${BOOK_URL}`, '',
    m.sign[0], m.sign[1], m.sign[2], 'contact@simasiaai.gr', '', ps, '', c.fine, COMPANY[offer.lang][0], COMPANY[offer.lang][1], '', m.footer,
  ].filter((x, i, a) => !(x === '' && a[i - 1] === '')).join('\n');

  return { subject: m.subject(offer.contact.org), html, text };
};

/* The lead for the team, always in Greek, with the visitor's message ready to forward */
export const leadEmail = (offer) => {
  const p = offer.price;
  const who = COPY.el.who[offer.aud];
  const lines = [];
  const add = (k, v) => { if (v) lines.push([k, v]); };
  add('Αρ. προσφοράς', offer.ref);
  add('Όνομα', offer.contact.name);
  add('Οργανισμός', offer.contact.org);
  add('Email', offer.contact.email);
  add('Τηλέφωνο', offer.contact.phone);
  add('Τύπος', who);
  add('Γλώσσα', offer.lang === 'en' ? 'English' : 'Ελληνικά');
  add('Μέρη', offer.parts.map((x) => x.name).join(' + '));
  add('Τιμή', priceLine(offer));
  if (p.kind === 'ngo') { add('Μέγεθος', p.size); add('Πρώτος χρόνος', p.firstYear); }
  if (p.kind === 'med') { add('Μέγεθος', p.size); add('Επίπεδο', p.name); add('Μηνιαία χρέωση', `${p.monthly}/μήνα + ${p.monthlySetup} ένταξη`); }
  if (p.kind === 'sponsor') { add('Οργανισμοί', p.orgs); add('Άνθρωποι τον χρόνο', p.people); add('Τομέας', p.cause); add('Ανάλυση', p.breakdown); }
  const opts = offer.parts.flatMap((x) => x.options.map((o) => `${x.name}: ${o.label}${o.price ? ` (${o.price})` : ''}`)).concat((offer.whole || []).map((o) => `${o.label} (${o.price})`));
  add('Επιλογές', opts.join(' | '));
  add('Κατόπιν προσφοράς', offer.quotes.join(' | '));
  add('Ενδιαφέρον για', (offer.interest || []).join(' | '));
  add('*** ΘΑ ΤΙΜΟΛΟΓΗΘΟΥΝ', offer.custom.join(' | '));
  if (offer.time.month) add('Χρόνος που επιστρέφει', `${offer.time.month} ώρες/μήνα${offer.time.appts ? `, +${offer.time.appts} ραντεβού/μήνα` : ''}`);
  offer.answers.forEach(({ q, a }) => add(q, a));

  const draft = clientEmail(offer);
  const first = offer.contact.name.replace(/\.+$/, '');
  const subject = `[ΠΡΟΣ ΕΛΕΓΧΟ] Προσφορά fλow · ${offer.contact.org || offer.contact.name} · ${who} · ${priceLine(offer)}`;
  const html = `<!doctype html><html lang="el"><head><meta charset="utf-8"></head><body style="margin:0;padding:20px;background:#f3f1ea;font:14px/1.5 ${FONT};color:${INK}">
<div style="max-width:640px;margin:0 auto;background:#fff;border-radius:12px;padding:24px">
<p style="margin:0 0 4px">${wordmark(22, INK)} <span style="color:${MUTED}">· νέο αίτημα προσφοράς από το site</span></p>
<p style="margin:0 0 16px;padding:12px 14px;background:#fdf1ec;border-left:4px solid ${ORANGE};font-weight:700">Προς έλεγχο: ΔΕΝ στάλθηκε στον πελάτη. Ελέγξτε το συνημμένο PDF και στείλτε το στο ${esc(offer.contact.email)} μέσα σε μία εργάσιμη, όπως υποσχεθήκαμε στο site. Πατώντας «Απάντηση» γράφετε απευθείας στον/στην ${esc(first)}, με το έτοιμο κείμενο πιο κάτω.</p>
<table cellpadding="0" cellspacing="0" width="100%">${lines.map(([k, v]) => `<tr><td valign="top" style="padding:6px 12px 6px 0;color:${k.startsWith('***') ? '#b42318' : MUTED};font-weight:${k.startsWith('***') ? 700 : 400};width:38%">${esc(k)}</td><td valign="top" style="padding:6px 0;${k.startsWith('***') ? 'color:#b42318;font-weight:700' : ''}">${esc(v)}</td></tr>`).join('')}</table>
${offer.contact.phone ? `<p style="margin:16px 0 0"><a href="tel:${esc(offer.contact.phone.replace(/[^\d+]/g, ''))}" style="color:${ORANGE}">Κλήση ${esc(offer.contact.phone)}</a></p>` : ''}
<div style="margin:24px 0 8px;padding-top:16px;border-top:2px dashed #e8e6dc;font:700 11px ${FONT};letter-spacing:1px;text-transform:uppercase;color:#b85f42">Έτοιμο κείμενο για τον πελάτη · θέμα: ${esc(draft.subject)}</div>
<div style="white-space:pre-wrap;padding:14px 16px;background:#faf9f5;border:1px solid #e8e6dc;border-radius:10px">${esc(draft.text)}</div>
</div></body></html>`;
  const text = [
    `ΠΡΟΣ ΕΛΕΓΧΟ: ΔΕΝ στάλθηκε στον πελάτη. Ελέγξτε το συνημμένο PDF και στείλτε το στο ${offer.contact.email} μέσα σε μία εργάσιμη.`, '',
    ...lines.map(([k, v]) => `${k}: ${v}`), '',
    `--- Έτοιμο κείμενο για τον πελάτη · θέμα: ${draft.subject} ---`, '', draft.text,
  ].join('\n');
  return { subject, html, text };
};
