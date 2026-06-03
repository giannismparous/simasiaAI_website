# Sima chatbot (RAG)

Website-only knowledge, POAMSKP-style guardrails, Gemini via Netlify function (keys never in browser).

## Security (API keys)

- **Never** put Gemini keys in `REACT_APP_*` variables — they would ship in the JS bundle.
- Use **`SIMASIA_GEMINI_API_KEYS`** in `.env` (local) and Netlify env (production) only.
- Copy `.env.example` → `.env`; `.env` is gitignored.
- Legacy dev scripts with hardcoded keys were removed; use `npm run proxy:gemini` + `npm run test:chatbot`.
- Bot output is sanitized (`AIza…` stripped); proxy upstream errors are redacted before reaching the client.

## Rebuild knowledge after site copy changes

```bash
npm run build:knowledge
```

## Local development

Terminal 1:

```bash
# .env: SIMASIA_GEMINI_API_KEYS=your_key
npm run proxy:gemini
```

Terminal 2:

```bash
npm start
```

`src/setupProxy.js` forwards `/.netlify/functions/gemini-chat` to the local proxy.

## Netlify production

Set in Netlify UI:

- `SIMASIA_GEMINI_API_KEYS` — comma-separated Gemini API keys
- `SIMASIA_ALLOWED_ORIGINS` — optional, e.g. `https://simasiaai.gr,https://www.simasiaai.gr`

Build runs `npm run build:knowledge` automatically (see `netlify.toml`).

## Data files

- `public/data/knowledge-index.json` — chunks from `src/translations` + solutions page
- `public/data/retrieval-rules.json` — scoring knobs
- `public/data/simasia-faq.json` — high-precision FAQ answers
