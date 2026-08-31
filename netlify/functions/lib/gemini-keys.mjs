/** Server-only Gemini key pool (never sent to the browser). */

const MODEL_DEFAULT = "gemini-3.5-flash-lite";

/** Cheapest flash-lite models only — blocks accidental pro/ultra billing. */
const ALLOWED_MODELS = new Set([
  "gemini-3.5-flash-lite",
  "gemini-flash-lite-latest",
  "gemini-2.0-flash-lite",
]);

export function getModelName() {
  const requested = (process.env.SIMASIA_GEMINI_MODEL || MODEL_DEFAULT).trim();
  if (ALLOWED_MODELS.has(requested)) return requested;
  return MODEL_DEFAULT;
}

/** Cap output tokens — chat answers are short; keeps cost down. */
export const GENERATION_CONFIG = {
  maxOutputTokens: 512,
  temperature: 0.48,
};

export function loadApiKeys() {
  const raw = (process.env.SIMASIA_GEMINI_API_KEYS || "").trim();
  return raw
    .split(",")
    .map((k) => k.trim())
    .filter(Boolean);
}

export function pickApiKey(keys) {
  if (!keys.length) return "";
  return keys[Math.floor(Math.random() * keys.length)];
}

const DEFAULT_ORIGINS = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "http://localhost:8888",
  "http://127.0.0.1:8888",
  "https://simasiaai.gr",
  "https://www.simasiaai.gr",
];

/** Origins from Netlify deploy env (auto-trust current site URL). */
export function netlifyDeployOrigins() {
  const out = new Set();
  const candidates = [
    process.env.URL,
    process.env.DEPLOY_PRIME_URL,
    process.env.DEPLOY_URL,
  ];
  candidates.forEach((value) => {
    const v = String(value || "").trim();
    if (!v) return;
    try {
      out.add(new URL(v).origin.toLowerCase());
    } catch {
      /* ignore invalid URL */
    }
  });
  return [...out];
}

export function parseAllowedOrigins() {
  const fromEnv = (process.env.SIMASIA_ALLOWED_ORIGINS || "")
    .split(",")
    .map((o) => o.trim().toLowerCase())
    .filter(Boolean);
  return [...new Set([...DEFAULT_ORIGINS, ...netlifyDeployOrigins(), ...fromEnv])];
}

export function isAllowedOrigin(origin, allowed) {
  if (!origin) return true;
  const o = origin.trim().toLowerCase();
  if (allowed.includes(o)) return true;

  // Local dev (any port)
  if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(o)) return true;

  // Netlify deploy / branch / preview URLs
  if (/^https:\/\/[a-z0-9][a-z0-9-]*\.netlify\.app$/i.test(o)) return true;
  if (/^https:\/\/[a-z0-9][a-z0-9-]*--[a-z0-9][a-z0-9-]*\.netlify\.app$/i.test(o)) return true;

  // simasiaai.gr and subdomains
  try {
    const host = new URL(o).hostname.toLowerCase();
    if (host === "simasiaai.gr" || host.endsWith(".simasiaai.gr")) return true;
  } catch {
    /* ignore */
  }

  return false;
}

export function corsHeaders(origin, allowed) {
  const headers = {
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
  };
  if (origin && isAllowedOrigin(origin, allowed)) {
    headers["Access-Control-Allow-Origin"] = origin;
    headers.Vary = "Origin";
  }
  return headers;
}

/** Strip API keys and long secrets from upstream error text before sending to clients. */
export function sanitizeClientDetail(text, maxLen = 500) {
  let t = String(text || "");
  t = t.replace(/\bAIza[A-Za-z0-9_-]{20,}\b/g, "[redacted]");
  t = t.replace(/x-goog-api-key["']?\s*[:=]\s*["']?[^"'\s,}]+/gi, "x-goog-api-key:[redacted]");
  t = t.replace(/[?&]key=[A-Za-z0-9_-]+/gi, "key=[redacted]");
  return t.slice(0, maxLen);
}
