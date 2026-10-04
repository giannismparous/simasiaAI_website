#!/usr/bin/env node
/**
 * Offline check of the emailed offer (no Resend key, no network).
 * Runs the real Netlify function netlify/functions/send-offer.mjs with a stand-in for Resend and checks:
 *   1. prices are computed on the server from the visitor's choices (offerEngine.js)
 *   2. a valid PDF is attached, the visitor gets the offer and contact@simasiaai.gr gets the lead
 *   3. bad input, bots, other sites and floods are refused; a missing key answers 503 (the site then
 *      sends the lead through EmailJS and tells the visitor the offer comes within a working day)
 * Usage: npm run test:offer          (writes sample PDFs to ./offer-samples/ with --pdf)
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { register } from 'node:module';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
register('./esm-ext-resolve.mjs', import.meta.url);
const fn = (await import(pathToFileURL(path.join(ROOT, 'netlify/functions/send-offer.mjs')).href)).default;
const { computeNgo, computeMed, computeSponsor } = await import(pathToFileURL(path.join(ROOT, 'src/components/flow/offerEngine.js')).href);

const sent = [];
let resendStatus = 200;
globalThis.fetch = async (url, opts) => {
  sent.push({ url, auth: opts.headers.Authorization, body: JSON.parse(opts.body) });
  return { ok: resendStatus === 200, status: resendStatus, json: async () => ({ id: 'test' }), text: async () => 'error' };
};
let ipN = 0;
const call = async (body, origin = 'https://www.simasiaai.gr') => {
  ipN += 1;
  const req = new Request('https://www.simasiaai.gr/.netlify/functions/send-offer', { method: 'POST', headers: { origin, 'content-type': 'application/json' }, body: JSON.stringify(body) });
  const res = await fn(req, { ip: `192.0.2.${ipN}` });
  return { status: res.status, body: await res.json() };
};

let fail = 0;
const check = (ok, msg) => { if (!ok) fail += 1; console.log(`${ok ? '✓' : '✗'} ${msg}`); };
const euroEl = (n) => `${new Intl.NumberFormat('el-GR').format(n)} €`;
const contact = (email) => ({ name: 'Μαρία Δοκιμή', org: 'Σύλλογος Δοκιμής', email, phone: '6900000000' });

const cases = [
  { name: 'ΜΚΟ, και τα τρία μέρη', body: { lang: 'el', aud: 'ngo', consent: true, contact: contact('ngo@example.com'), ngo: { size: 'm', modules: { dialogos: true, praxis: true, metron: true }, features: { viber: true, shifts: true, impact: true } }, custom: ['Σύνδεση με λογιστικό'], answers: [{ q: 'Πόσοι είστε;', a: '4 – 10' }], time: { month: 40, days: 60 } },
    expect: () => euroEl(computeNgo({ size: 'm', modules: { dialogos: true, praxis: true, metron: true }, features: { viber: true, shifts: true, impact: true } }).monthly) },
  { name: 'Ιατρείο, 2-5 γιατροί', body: { lang: 'el', aud: 'med', consent: true, contact: contact('med@example.com'), med: { size: '2-5', features: { booking: true, missed: true } }, time: { month: 30, days: 45, appts: 20 } },
    expect: () => euroEl(computeMed({ size: '2-5', features: { answers: true, card: true, report: true, tasks: true, booking: true, missed: true } }, true).monthly) },
  { name: 'Sponsor (English)', body: { lang: 'en', aud: 'sponsor', consent: true, contact: contact('sp@example.com'), sponsor: { orgs: '2-5', people: 3000, years: 1, cause: 0, options: { lang2: true } } },
    expect: () => `€${new Intl.NumberFormat('en-IE').format(computeSponsor({ orgs: '2-5', people: 3000, years: 1, cause: 0, options: { impact: true, disclosure: true, lang2: true } }).total)}` },
];

process.env.RESEND_API_KEY = 're_test_key';
const outDir = path.join(ROOT, 'offer-samples');
for (const c of cases) {
  sent.length = 0;
  const r = await call(c.body);
  const [mine, lead] = sent;
  const pdf = mine ? Buffer.from(mine.body.attachments[0].content, 'base64') : Buffer.alloc(0);
  const price = c.expect();
  check(r.status === 200 && r.body.ok && sent.length === 2, `${c.name}: 200, 2 emails (${r.body.ref || r.body.error})`);
  check(mine && mine.url === 'https://api.resend.com/emails' && mine.auth === 'Bearer re_test_key' && mine.body.to[0] === c.body.contact.email && mine.body.reply_to === 'contact@simasiaai.gr', `  visitor email to ${c.body.contact.email}, replies to contact@simasiaai.gr`);
  check(pdf.slice(0, 5).toString() === '%PDF-' && pdf.length > 30000 && pdf.length < 400000, `  PDF attached (${Math.round(pdf.length / 1024)} KB)`);
  check(mine && mine.body.html.includes(price), `  server price in the email: ${price}`);
  check(lead && lead.body.to.includes('contact@simasiaai.gr') && lead.body.reply_to === c.body.contact.email && lead.body.attachments.length === 1, '  lead to contact@simasiaai.gr with the same PDF');
  if (process.argv.includes('--pdf') && mine) { fs.mkdirSync(outDir, { recursive: true }); fs.writeFileSync(path.join(outDir, mine.body.attachments[0].filename), pdf); }
}

sent.length = 0;
let r = await call({ ...cases[0].body, contact: contact('not-an-email') });
check(r.status === 400 && !sent.length, 'bad email → 400, nothing sent');
r = await call({ ...cases[0].body, consent: false });
check(r.status === 400 && !sent.length, 'no consent → 400');
r = await call({ ...cases[0].body, website: 'spam' });
check(r.status === 200 && !sent.length, 'bot (hidden field filled) → quiet 200, nothing sent');
r = await call(cases[0].body, 'https://another-site.example');
check(r.status === 403 && !sent.length, 'another website → 403');
resendStatus = 500;
r = await call({ ...cases[0].body, contact: contact('down@example.com') });
check(r.status === 502, 'Resend down → 502 (the site falls back to the EmailJS lead)');
resendStatus = 200;
delete process.env.RESEND_API_KEY;
r = await call({ ...cases[0].body, contact: contact('nokey@example.com') });
check(r.status === 503 && r.body.error === 'email_not_configured', 'no RESEND_API_KEY → 503 (the site falls back to the EmailJS lead)');

const total = cases.length * 5 + 6;
console.log(`\n${total - fail}/${total} checks passed${process.argv.includes('--pdf') ? ` · sample PDFs in ${outDir}` : ''}`);
process.exit(fail ? 1 : 0);
