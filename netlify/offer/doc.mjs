/*
 * The offer as a branded A4 PDF: dark header with the fλow mark, the visitor's own flow,
 * the price, a no-risk start, the value stack, proof, next steps and a booking button.
 */
import { PdfDoc, A4 } from './pdf.mjs';
import { FLOW_SANS_REGULAR, FLOW_SANS_BOLD } from './fonts.mjs';
import { COPY, COMPANY, BOOK_URL } from './copy.mjs';
import { money } from './offer.mjs';

const INK = '#141413';
const PAPER = '#faf9f5';
const SAND = '#e8e6dc';
const MUTED = '#5e5d59';
const ORANGE = '#d97757';
const ORANGE_DARK = '#b85f42';
const M = 48; // page margin
const W = A4.w - M * 2;
const BOTTOM = A4.h - 70;
// Greek capitals drop the accent (tonos) but keep the diaeresis
const caps = (t) => t.normalize('NFD').replace(/\u0301/g, '').normalize('NFC').toUpperCase();

export const renderOfferPdf = (offer) => {
  const c = COPY[offer.lang];
  const doc = new PdfDoc({
    fonts: { reg: { data: FLOW_SANS_REGULAR, name: 'FlowSans-Regular' }, bold: { data: FLOW_SANS_BOLD, name: 'FlowSans-Bold' } },
    title: `${c.title(offer.contact.org)} · fλow · ${offer.ref}`,
    author: 'SimasiaAI',
  });
  let page = null;
  let y = 0;

  const wordmark = (x, yy, size, color) => {
    let xx = x;
    xx += page.text('f', xx, yy, { font: 'bold', size, color });
    xx += page.text('λ', xx, yy, { font: 'bold', size, color: ORANGE });
    page.text('ow', xx, yy, { font: 'bold', size, color });
  };

  const newPage = (first = false) => {
    page = doc.addPage();
    if (first) {
      page.rect(0, 0, A4.w, 168, { fill: INK });
      wordmark(M, 78, 40, PAPER);
      page.text(c.by, M + 2, 100, { size: 11, color: '#bdbab0' });
      // the λ river, three thin streams
      [['#6a9bcc', -8], ['#9fb383', 0], [ORANGE, 8]].forEach(([col, o]) => page.path([[M, 136 + o], [M + 120, 136 + o * 0.6], [M + 200, 134], [M + 330, 134]], { color: col, lw: 1.4 }));
      page.text(c.label, A4.w - M, 58, { font: 'bold', size: 10, color: ORANGE, align: 'right' });
      page.text(`${c.ref} ${offer.ref}`, A4.w - M, 78, { size: 10, color: PAPER, align: 'right' });
      page.text(`${c.date}: ${offer.date}`, A4.w - M, 94, { size: 10, color: '#d6d3c9', align: 'right' });
      page.text(`${c.valid}: ${offer.validUntil}`, A4.w - M, 110, { size: 10, color: '#d6d3c9', align: 'right' });
      y = 214;
    } else {
      wordmark(M, 46, 16, INK);
      page.text(`${c.title('')} · ${offer.ref}`, A4.w - M, 46, { size: 9, color: MUTED, align: 'right' });
      page.line(M, 58, A4.w - M, 58, { color: SAND, lw: 0.8 });
      y = 86;
    }
  };
  const need = (h) => { if (y + h > BOTTOM) newPage(); };
  const h2 = (t) => { need(90); page.text(t, M, y, { font: 'bold', size: 15, color: INK }); y += 10; page.line(M, y, M + 36, y, { color: ORANGE, lw: 2 }); y += 20; };
  const para = (t, opts = {}) => {
    const size = opts.size || 10.5; const lines = doc.wrap(t, opts.font || 'reg', size, opts.w || W);
    need(lines.length * size * 1.4);
    y = page.para(t, opts.x || M, y, opts.w || W, { size, color: opts.color || INK, font: opts.font || 'reg' });
  };
  const bullet = (t, { color = '#788c5d', x = M, w = W, size = 10.5, price = '', mark = 'check' } = {}) => {
    const priceW = price ? Math.min(170, doc.widthOf(price, 'reg', 9.5) + 6) : 0;
    const lines = doc.wrap(t, 'reg', size, w - 18 - priceW);
    need(lines.length * size * 1.38 + 2);
    if (mark === 'check') page.check(x, y - 8, 9, color); else if (mark === 'dot') page.circle(x + 4, y - 3.5, 2.6, { fill: color }); else page.text(mark, x, y, { font: 'bold', size, color });
    lines.forEach((ln, i) => page.text(ln, x + 18, y + i * size * 1.38, { size, color: INK }));
    if (price) page.text(price, x + w, y, { size: 9.5, color: MUTED, align: 'right' });
    y += lines.length * size * 1.38 + 3;
  };

  /* ── page 1 ── */
  newPage(true);
  page.text(c.title(offer.contact.org), M, y, { font: 'bold', size: 22, color: INK }); y += 22;
  page.text(c.forLine(offer.contact.name, offer.who), M, y, { size: 10.5, color: MUTED }); y += 26;
  para(c.intro[offer.aud], { size: 11.5 });
  y += 12;

  // time that comes back, or impact
  if (offer.aud !== 'sponsor' && offer.time.month > 0) {
    const lines = [c.timeHours(offer.time.month), c.timeDays(offer.time.days)];
    if (offer.time.appts > 0) lines.push(c.timeAppts(offer.time.appts));
    const h = 70 + (lines.length - 2) * 16;
    need(h + 10);
    page.rect(M, y, W, h, { fill: '#f3f1ea', r: 10 });
    page.text(caps(c.timeTitle), M + 16, y + 20, { font: 'bold', size: 8.5, color: ORANGE_DARK });
    page.text(lines[0], M + 16, y + 42, { font: 'bold', size: 18, color: INK });
    page.text(c.timeHoursSub, M + 16 + doc.widthOf(lines[0], 'bold', 18) + 10, y + 42, { size: 10, color: MUTED });
    lines.slice(1).forEach((ln, i) => page.text(ln, M + 16, y + 62 + i * 16, { size: 10.5, color: INK }));
    y += h + 22;
  } else if (offer.aud === 'sponsor') {
    const p = offer.price;
    need(74);
    page.rect(M, y, W, 64, { fill: '#f3f1ea', r: 10 });
    page.text(caps(c.impactTitle), M + 16, y + 20, { font: 'bold', size: 8.5, color: ORANGE_DARK });
    page.text(c.impactPeople(p.people), M + 16, y + 44, { font: 'bold', size: 17, color: INK });
    page.text(`${p.orgs} · ${c.spCause}: ${p.cause}`, M + 16 + doc.widthOf(c.impactPeople(p.people), 'bold', 17) + 14, y + 44, { size: 10.5, color: MUTED });
    y += 86;
  }

  // your flow
  h2(c.yourFlow);
  offer.parts.forEach((part) => {
    const rows = [...part.included, ...part.options.map((o) => o.label)].reduce((a, t) => a + doc.wrap(t, 'reg', 10, W - 60).length, 0);
    need(Math.min(26 + rows * 14 + 3 * (part.included.length + part.options.length), BOTTOM - 100));
    page.circle(M + 6, y - 4, 6, { fill: part.color });
    page.text(part.name, M + 20, y, { font: 'bold', size: 13, color: INK });
    const nw = doc.widthOf(part.name, 'bold', 13);
    page.text(`${part.word} · ${part.role}`, M + 28 + nw, y, { size: 10, color: MUTED });
    y += 18;
    part.included.forEach((t) => bullet(t, { color: part.color === ORANGE ? ORANGE : '#788c5d', x: M + 20, w: W - 20, size: 10 }));
    part.options.forEach((o) => bullet(o.label, { color: part.color, x: M + 20, w: W - 20, size: 10, price: o.price, mark: 'check' }));
    y += 8;
  });
  if (offer.whole && offer.whole.length) offer.whole.forEach((o) => bullet(o.label, { color: INK, price: o.price, size: 10 }));
  if (offer.interest && offer.interest.length) offer.interest.forEach((t) => bullet(t, { color: MUTED, mark: 'dot', size: 10 }));
  if (offer.quotes.length) {
    y += 4; need(30); page.text(c.quoteTitle, M, y, { font: 'bold', size: 11, color: INK }); y += 16;
    offer.quotes.forEach((t) => bullet(t, { color: MUTED, mark: 'dot', size: 10 }));
    para(c.quoteNote, { size: 9.5, color: MUTED });
  }
  if (offer.custom.length) {
    y += 4; need(30); page.text(c.customTitle, M, y, { font: 'bold', size: 11, color: INK }); y += 16;
    offer.custom.forEach((t) => bullet(t, { color: ORANGE, mark: 'dot', size: 10 }));
    para(c.customNote, { size: 9.5, color: MUTED });
  }
  y += 12;

  // the price
  const p = offer.price;
  h2(c.priceTitle);
  if (p.kind === 'ngo') {
    need(120);
    page.rect(M, y, W, 96, { fill: INK, r: 12 });
    const col = W / 3;
    [[c.monthly, `${p.from ? `${c.from} ` : ''}${p.monthly}`, c.perMonth.replace('/', '')], [c.setup, `${p.from ? `${c.from} ` : ''}${p.setup}`, c.oneOff], [c.firstYear, `${p.from ? `${c.from} ` : ''}${p.firstYear}`, '']].forEach(([lab, val, sub], i) => {
      const x = M + 18 + i * col;
      page.text(lab, x, y + 26, { size: 9.5, color: '#bdbab0' });
      page.text(val, x, y + 56, { font: 'bold', size: i === 2 ? 17 : 22, color: i === 0 ? PAPER : '#e9e6dc' });
      if (sub) page.text(sub, x, y + 76, { size: 9, color: '#9c998f' });
    });
    y += 112;
    if (p.saving) para(p.saving, { size: 10.5, color: '#4f6b3a', font: 'bold' });
    if (p.from) para(c.network, { size: 10, color: MUTED });
  } else if (p.kind === 'med') {
    if (p.from) {
      need(90);
      page.rect(M, y, W, 76, { fill: INK, r: 12 });
      page.text(p.name, M + 18, y + 26, { size: 10, color: '#bdbab0' });
      page.text(`${c.from} ${p.annual}${c.perMonth}`, M + 18, y + 56, { font: 'bold', size: 22, color: PAPER });
      page.text(`${c.setup}: ${c.from} ${p.annualSetup}`, M + W / 2, y + 56, { size: 11, color: '#e9e6dc' });
      y += 92;
      para(c.medCustom, { size: 10, color: MUTED });
    } else {
      need(130);
      page.text(c.medTier(p.name), M, y, { font: 'bold', size: 11, color: INK }); y += 12;
      const bw = (W - 12) / 2;
      page.rect(M, y, bw, 98, { fill: INK, r: 12 });
      page.rect(M + bw + 12, y, bw, 98, { fill: '#f3f1ea', stroke: SAND, r: 12 });
      page.rect(M + 16, y + 14, doc.widthOf(c.medRec, 'bold', 8.5) + 14, 16, { fill: ORANGE, r: 8 });
      page.text(c.medRec, M + 23, y + 25.5, { font: 'bold', size: 8.5, color: '#ffffff' });
      page.text(c.medAnnual, M + 16, y + 48, { size: 10, color: '#d6d3c9' });
      page.text(`${p.annual}${c.perMonth}`, M + 16, y + 74, { font: 'bold', size: 22, color: PAPER });
      page.text(c.medAnnualSub, M + 16, y + 89, { size: 9.5, color: '#bdbab0' });
      page.text(c.medMonthly, M + bw + 28, y + 48, { size: 10, color: MUTED });
      page.text(`${p.monthly}${c.perMonth}`, M + bw + 28, y + 74, { font: 'bold', size: 20, color: INK });
      page.text(c.medMonthlySub(p.monthlySetup), M + bw + 28, y + 89, { size: 9.5, color: MUTED });
      y += 114;
    }
  } else {
    need(110);
    page.rect(M, y, W, 92, { fill: INK, r: 12 });
    page.text(c.spTotal(p.years), M + 18, y + 26, { size: 9.5, color: '#bdbab0' });
    page.text(`${p.from ? `${c.from} ` : ''}${p.total}`, M + 18, y + 58, { font: 'bold', size: 24, color: PAPER });
    page.text(p.perPerson, M + W / 2, y + 52, { font: 'bold', size: 18, color: '#e9e6dc' });
    page.text(c.spPerPerson, M + W / 2, y + 70, { size: 9.5, color: '#9c998f' });
    y += 106;
    para(p.breakdown, { size: 10, color: MUTED });
    y += 6;
    h2(c.spWhat);
    c.spList.forEach((t) => bullet(t, { color: ORANGE, size: 10.5 }));
  }
  if (p.atCost) para(`+ ${c.atCost}`, { size: 9.5, color: MUTED });
  y += 14;

  /* no-risk start */
  h2(c.riskTitle);
  const risk = [];
  if (c.trial[offer.aud]) risk.push(c.trial[offer.aud]);
  risk.push(c.guarantee[offer.aud]);
  risk.push(offer.aud === 'sponsor' ? c.compliance : c.person);
  const colW = (W - 24) / 3;
  const heights = risk.map(([, d]) => doc.wrap(d, 'reg', 9.5, colW - 24).length * 13 + 44);
  const rh = Math.max(...heights);
  need(rh + 16);
  risk.forEach(([t, d], i) => {
    const x = M + i * (colW + 12);
    page.rect(x, y, colW, rh, { fill: i === 0 && c.trial[offer.aud] ? '#fbeee8' : '#f3f1ea', stroke: i === 0 && c.trial[offer.aud] ? ORANGE : SAND, r: 10 });
    page.para(t, x + 12, y + 22, colW - 24, { font: 'bold', size: 11, color: i === 0 && c.trial[offer.aud] ? ORANGE_DARK : INK });
    const tl = doc.wrap(t, 'bold', 11, colW - 24).length;
    page.para(d, x + 12, y + 22 + tl * 15 + 2, colW - 24, { size: 9.5, color: INK });
  });
  y += rh + 26;

  /* value stack */
  if (offer.aud !== 'sponsor') {
    h2(c.stackTitle);
    const total = c.stack.reduce((a, [, v]) => a + v, 0);
    c.stack.forEach(([t, v]) => {
      const lines = doc.wrap(t, 'reg', 10, W - 90);
      need(lines.length * 14 + 4);
      page.check(M, y - 8, 9, '#788c5d');
      lines.forEach((ln, i) => page.text(ln, M + 18, y + i * 14, { size: 10, color: INK }));
      const vt = money(v, offer.lang);
      const vw = page.text(vt, A4.w - M, y, { size: 10, color: MUTED, align: 'right' });
      page.line(A4.w - M - vw - 1, y - 3.4, A4.w - M + 1, y - 3.4, { color: MUTED, lw: 0.7 });
      y += lines.length * 14 + 4;
    });
    need(40);
    y += 4; page.line(M, y, A4.w - M, y, { color: SAND, lw: 0.8 }); y += 20;
    const worth = `${c.stackWorth} ${money(total, offer.lang)}`;
    const ww = page.text(worth, M, y, { size: 11, color: MUTED });
    page.line(M + doc.widthOf(`${c.stackWorth} `, 'reg', 11) - 1, y - 3.8, M + ww + 1, y - 3.8, { color: MUTED, lw: 0.8 });
    page.text(`${c.stackYou}: ${money(0, offer.lang)}`, A4.w - M, y, { font: 'bold', size: 14, color: '#4f6b3a', align: 'right' });
    y += 30;
  }

  /* proof */
  h2(c.proofTitle);
  c.proof.forEach((t) => bullet(t, { color: '#6a9bcc', mark: 'dot', size: 10.5 }));
  if (offer.aud === 'ngo') { y += 6; para(c.funding, { size: 10.5, color: '#4f6b3a', font: 'bold' }); }
  y += 14;

  /* what you told us */
  if (offer.answers.length) {
    h2(c.toldTitle);
    offer.answers.forEach(({ q, a }) => {
      const ql = doc.wrap(q, 'reg', 9.5, W * 0.56);
      const al = doc.wrap(a, 'bold', 9.5, W * 0.4);
      const h = Math.max(ql.length, al.length) * 13 + 6;
      need(h);
      ql.forEach((ln, i) => page.text(ln, M, y + i * 13, { size: 9.5, color: MUTED }));
      al.forEach((ln, i) => page.text(ln, M + W * 0.6, y + i * 13, { font: 'bold', size: 9.5, color: INK }));
      y += h;
    });
    y += 14;
  }

  /* next steps + button */
  h2(c.nextTitle);
  c.next[offer.aud].forEach((t, i) => {
    const lines = doc.wrap(t, 'reg', 11, W - 34);
    need(lines.length * 15 + 8);
    page.circle(M + 9, y - 4, 9, { fill: INK });
    page.text(String(i + 1), M + 9, y, { font: 'bold', size: 10, color: PAPER, align: 'center' });
    lines.forEach((ln, k) => page.text(ln, M + 28, y + k * 15, { size: 11, color: INK }));
    y += lines.length * 15 + 10;
  });
  need(70);
  y += 6;
  const bw = doc.widthOf(c.cta, 'bold', 13) + 44;
  page.rect(M, y, bw, 38, { fill: ORANGE, r: 19 });
  page.text(`${c.cta} →`, M + 22, y + 24, { font: 'bold', size: 13, color: '#ffffff' });
  page.link(M, y, bw + 12, 38, BOOK_URL);
  page.text(c.ctaAlt, M + bw + 22, y + 24, { size: 10.5, color: MUTED });
  page.link(M + bw + 22, y + 10, doc.widthOf(c.ctaAlt, 'reg', 10.5), 18, 'mailto:contact@simasiaai.gr');
  y += 56;

  /* footers */
  const n = doc.pages.length;
  doc.pages.forEach((pg, i) => {
    pg.line(M, A4.h - 56, A4.w - M, A4.h - 56, { color: SAND, lw: 0.8 });
    pg.text(c.fine, M, A4.h - 42, { size: 8, color: MUTED });
    pg.text(COMPANY[offer.lang][0], M, A4.h - 30, { size: 8, color: MUTED });
    pg.text(COMPANY[offer.lang][1], M, A4.h - 19, { size: 8, color: MUTED });
    pg.text(c.page(i + 1, n), A4.w - M, A4.h - 42, { size: 8, color: MUTED, align: 'right' });
  });
  return doc.save();
};
