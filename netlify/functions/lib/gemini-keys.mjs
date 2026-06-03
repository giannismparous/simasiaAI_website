/** Server-only Gemini key pool (never sent to the browser). */

const MODEL_DEFAULT = "gemini-2.5-flash-lite";

export function getModelName() {
  return (process.env.SIMASIA_GEMINI_MODEL || MODEL_DEFAULT).trim();
}

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

export function parseAllowedOrigins() {
  const raw = (process.env.SIMASIA_ALLOWED_ORIGINS || "").trim();
  if (raw) {
    return raw.split(",").map((o) => o.trim().toLowerCase()).filter(Boolean);
  }
  return [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:8888",
    "http://127.0.0.1:8888",
    "https://simasiaai.gr",
    "https://www.simasiaai.gr",
  ];
}

export function isAllowedOrigin(origin, allowed) {
  if (!origin) return true;
  const o = origin.trim().toLowerCase();
  if (allowed.includes(o)) return true;
  if (/^https:\/\/[a-z0-9-]+--[a-z0-9-]+\.netlify\.app$/i.test(o)) return true;
  if (/^https:\/\/[a-z0-9-]+\.netlify\.app$/i.test(o)) return true;
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
