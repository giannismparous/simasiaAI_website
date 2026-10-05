# Offer by email (Go with the fλow)

The site shows no prices. On /go the visitor chooses parts and features and leaves an email.
`netlify/functions/send-offer.mjs` then:

1. prices the choices with `src/components/flow/offerEngine.js` (the browser never sends prices);
2. writes a branded PDF (`doc.mjs`, `pdf.mjs`, fonts in `fonts.mjs`, Greek + Latin, no npm dependencies);
3. emails the lead with the PDF to contact@simasiaai.gr **only**, marked «ΠΡΟΣ ΕΛΕΓΧΟ», with the
   message for the visitor written out below it (`email.mjs`). Reply-to is the visitor.
4. The team checks the offer and sends it to the visitor within one working day (the site promises
   this): press Reply, paste the ready text, attach the PDF. Nothing goes to the visitor automatically.

Copy for the PDF and the client message, Greek and English: `copy.mjs`.

## Setup (once)

1. Create an account at resend.com and add the domain `simasiaai.gr`.
2. Add the DNS records Resend shows (DKIM, SPF for the `send` subdomain, optional DMARC). Wait until the domain says **Verified**.
3. Create an API key with "Sending access" and add it in Netlify → Site configuration → Environment variables:

| Variable | Value |
| --- | --- |
| `RESEND_API_KEY` | `re_…` (required) |
| `OFFER_FROM` | optional, default `SimasiaAI <contact@simasiaai.gr>` |
| `OFFER_NOTIFY_TO` | optional, default `contact@simasiaai.gr` (comma-separated for more) |

4. Redeploy.

Until the key is set (or if Resend is down), the function answers 503/502 and the page sends the lead,
without the PDF, to contact@simasiaai.gr through EmailJS. The visitor sees the same message either way
(the offer arrives within one working day), so no request is lost.

## Test

```
npm run test:offer          # 24 checks with a stand-in for Resend
npm run test:offer -- --pdf # also writes sample PDFs to ./offer-samples/
```

## Change prices or words

- Prices: `src/components/flow/offerEngine.js`
- Value stack, trial, guarantee, email text: `netlify/offer/copy.mjs`
- Fonts: `python3 scripts/build_offer_fonts.py` (Carlito, SIL OFL, renamed FlowSans)
