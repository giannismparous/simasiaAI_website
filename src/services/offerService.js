/*
 * Asks the server for the visitor's offer. The server prices the choices, writes the PDF
 * and emails it (netlify/functions/send-offer.mjs). Prices never come back to the page.
 */
const OFFER_URL = (process.env.REACT_APP_OFFER_URL || '/.netlify/functions/send-offer').trim();

export const EMAIL_RX = /^[^\s@<>()[\]\\,;:"]{1,64}@[^\s@<>()[\]\\,;:"]+\.[a-z]{2,}$/i;

export const requestOffer = async (payload) => {
  let res;
  try {
    res = await fetch(OFFER_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
  } catch (e) {
    const err = new Error('network'); err.status = 0; throw err;
  }
  let data = {};
  try { data = await res.json(); } catch (e) { data = {}; }
  if (!res.ok || !data.ok) {
    const err = new Error(data.error || `http_${res.status}`);
    err.status = res.status; err.field = data.field;
    throw err;
  }
  return data;
};
