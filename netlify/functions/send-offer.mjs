/*
 * POST /.netlify/functions/send-offer
 * The visitor's choices from /go → a priced PDF offer, emailed with the lead to
 * contact@simasiaai.gr only. The team reviews it and forwards it to the visitor;
 * nothing goes to the visitor automatically. Prices never reach the browser.
 *
 * Netlify env:
 *   RESEND_API_KEY      required (resend.com, domain simasiaai.gr verified)
 *   OFFER_FROM          optional, default "SimasiaAI <contact@simasiaai.gr>"
 *   OFFER_NOTIFY_TO     optional, default "contact@simasiaai.gr" (comma-separated for more)
 */
import { corsHeaders, netlifyDeployOrigins, parseAllowedOrigins } from './lib/gemini-keys.mjs';
import { readRequest, buildOffer, OfferInputError } from '../offer/offer.mjs';
import { renderOfferPdf } from '../offer/doc.mjs';
import { leadEmail } from '../offer/email.mjs';
import { COPY } from '../offer/copy.mjs';

const RESEND_URL = 'https://api.resend.com/emails';
const MAX_BODY = 20000;

// Only our own pages may ask for an offer: simasiaai.gr, this site's Netlify deploys, local dev.
// Browsers always send Origin on a POST, so a request without one (a script) is refused.
const SITE = 'simasiaaiwebsite';
const offerOriginOk = (origin) => {
  if (!origin) return false;
  const o = origin.trim().toLowerCase();
  if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(o)) return true;
  let host = '';
  try { host = new URL(o).hostname; } catch { return false; }
  if (!o.startsWith('https://')) return false;
  if (host === 'simasiaai.gr' || host.endsWith('.simasiaai.gr')) return true;
  const site = (process.env.SITE_NAME || SITE).toLowerCase();
  if (host === `${site}.netlify.app` || host.endsWith(`--${site}.netlify.app`)) return true;
  if (netlifyDeployOrigins().includes(o)) return true;
  return (process.env.SIMASIA_ALLOWED_ORIGINS || '').split(',').map((x) => x.trim().toLowerCase()).filter(Boolean).includes(o);
};

// best-effort throttle per warm instance: 5 offers per IP per 15 minutes, 3 per address per hour
const hits = new Map();
const tooMany = (key, max, windowMs) => {
  const now = Date.now();
  const list = (hits.get(key) || []).filter((t) => now - t < windowMs);
  list.push(now);
  hits.set(key, list);
  if (hits.size > 5000) {
    // drop only entries with nothing recent, never the whole table
    hits.forEach((v, k) => { if (!v.some((t) => now - t < 60 * 60 * 1000)) hits.delete(k); });
  }
  return list.length > max;
};

const json = (status, body, origin, allowed) => new Response(JSON.stringify(body), {
  status,
  headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', ...corsHeaders(origin, allowed) },
});

export const sendWithResend = async (key, payload, idempotencyKey) => {
  const res = await fetch(RESEND_URL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json', ...(idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : {}) },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new Error(`resend ${res.status}: ${detail.slice(0, 300)}`);
  }
  return res.json().catch(() => ({}));
};

export default async (req, context) => {
  const allowed = parseAllowedOrigins();
  const origin = req.headers.get('origin') || '';

  if (req.method === 'OPTIONS') {
    if (!offerOriginOk(origin)) return new Response(null, { status: 403 });
    return new Response(null, { status: 204, headers: corsHeaders(origin, allowed) });
  }
  if (req.method !== 'POST') return json(405, { error: 'method_not_allowed' }, origin, allowed);
  if (!offerOriginOk(origin)) return json(403, { error: 'origin_not_allowed' }, origin, allowed);

  const raw = await req.text();
  if (raw.length > MAX_BODY) return json(413, { error: 'too_large' }, origin, allowed);
  let body;
  try { body = JSON.parse(raw); } catch { return json(400, { error: 'invalid', field: 'json' }, origin, allowed); }

  // honeypot: bots fill the hidden field; answer as if all went well
  if (body && typeof body.website === 'string' && body.website.trim()) return json(200, { ok: true }, origin, allowed);

  let request;
  try { request = readRequest(body); } catch (e) {
    if (e instanceof OfferInputError) return json(400, { error: 'invalid', field: e.message }, origin, allowed);
    throw e;
  }

  const ip = (context && context.ip) || req.headers.get('x-nf-client-connection-ip') || req.headers.get('x-forwarded-for') || 'unknown';
  if (tooMany(`ip:${ip}`, 5, 15 * 60 * 1000) || tooMany(`to:${request.contact.email}`, 3, 60 * 60 * 1000)) {
    return json(429, { error: 'too_many' }, origin, allowed);
  }

  const key = (process.env.RESEND_API_KEY || '').trim();
  if (!key) return json(503, { error: 'email_not_configured' }, origin, allowed);

  const from = (process.env.OFFER_FROM || 'SimasiaAI <contact@simasiaai.gr>').trim();
  const notify = (process.env.OFFER_NOTIFY_TO || 'contact@simasiaai.gr').split(',').map((s) => s.trim()).filter(Boolean);

  let offer; let pdf;
  try {
    offer = buildOffer(request);
    pdf = renderOfferPdf(offer).toString('base64');
  } catch (e) {
    console.error('send-offer: build failed', e);
    return json(500, { error: 'build_failed' }, origin, allowed);
  }
  const attachments = [{ filename: COPY[offer.lang].fileName(offer.ref), content: pdf }];

  // for review: the PDF goes to the team only, and replying to the lead writes to the visitor
  const lead = leadEmail(offer);
  try {
    await sendWithResend(key, { from, to: notify, reply_to: offer.contact.email, subject: lead.subject, html: lead.html, text: lead.text, attachments, tags: [{ name: 'type', value: 'lead' }, { name: 'aud', value: offer.aud }] }, `lead-${offer.ref}`);
  } catch (e) {
    console.error('send-offer: lead email failed', e.message);
    return json(502, { error: 'send_failed' }, origin, allowed);
  }

  return json(200, { ok: true, ref: offer.ref }, origin, allowed);
};
