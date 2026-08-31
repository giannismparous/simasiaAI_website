import {
  corsHeaders,
  getModelName,
  GENERATION_CONFIG,
  isAllowedOrigin,
  loadApiKeys,
  parseAllowedOrigins,
  pickApiKey,
  sanitizeClientDetail,
} from "./lib/gemini-keys.mjs";

const MAX_PROMPT_CHARS = 24000;

const BLOCKED_PROMPT_REGEX =
  /(?:\bAIza[A-Za-z0-9_-]{20,}\b|ignore\s+(?:all\s+)?(?:previous|prior)|disregard\s+(?:all\s+)?(?:rules|instructions)|jailbreak|dan\s+mode|repeat\s+(?:everything|all)\s+context|ολοκληρο\s+το\s+context)/i;

function jsonResponse(status, body, origin, allowed) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders(origin, allowed),
    },
  });
}

function extractText(payload) {
  return (
    payload?.candidates?.[0]?.content?.parts?.map((p) => p.text).join("") || ""
  );
}

export default async (req) => {
  const allowed = parseAllowedOrigins();
  const origin = req.headers.get("origin") || "";

  if (req.method === "OPTIONS") {
    if (origin && !isAllowedOrigin(origin, allowed)) {
      return new Response(null, { status: 403 });
    }
    return new Response(null, { status: 204, headers: corsHeaders(origin, allowed) });
  }

  if (req.method !== "POST") {
    return jsonResponse(405, { error: "method_not_allowed" }, origin, allowed);
  }

  if (origin && !isAllowedOrigin(origin, allowed)) {
    return jsonResponse(403, { error: "origin_not_allowed" }, origin, allowed);
  }

  const keys = loadApiKeys();
  if (!keys.length) {
    return jsonResponse(
      503,
      { error: "gemini_not_configured", message: "Server Gemini keys missing." },
      origin,
      allowed
    );
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return jsonResponse(400, { error: "invalid_json" }, origin, allowed);
  }

  const prompt = typeof body?.prompt === "string" ? body.prompt : "";
  if (!prompt.trim()) {
    return jsonResponse(400, { error: "prompt_required" }, origin, allowed);
  }
  if (prompt.length > MAX_PROMPT_CHARS) {
    return jsonResponse(413, { error: "prompt_too_large" }, origin, allowed);
  }
  if (BLOCKED_PROMPT_REGEX.test(prompt)) {
    return jsonResponse(400, { error: "prompt_blocked" }, origin, allowed);
  }

  const stream = Boolean(body?.stream);
  const model = getModelName();
  const apiKey = pickApiKey(keys);
  const googleBase =
    "https://generativelanguage.googleapis.com/v1beta/models/" +
    encodeURIComponent(model);

  const googleBody = JSON.stringify({
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: GENERATION_CONFIG,
  });

  const googleHeaders = {
    "Content-Type": "application/json",
    "x-goog-api-key": apiKey,
  };

  try {
    if (stream) {
      const googleRes = await fetch(
        `${googleBase}:streamGenerateContent?alt=sse`,
        { method: "POST", headers: googleHeaders, body: googleBody }
      );
      if (!googleRes.ok) {
        const errText = await googleRes.text();
        return jsonResponse(
          googleRes.status,
          { error: "gemini_upstream_error", detail: sanitizeClientDetail(errText) },
          origin,
          allowed
        );
      }
      return new Response(googleRes.body, {
        status: 200,
        headers: {
          "Content-Type": "text/event-stream; charset=utf-8",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
          ...corsHeaders(origin, allowed),
        },
      });
    }

    const googleRes = await fetch(`${googleBase}:generateContent`, {
      method: "POST",
      headers: googleHeaders,
      body: googleBody,
    });
    const payload = await googleRes.json().catch(() => ({}));
    if (!googleRes.ok) {
      return jsonResponse(
        googleRes.status,
        {
          error: "gemini_upstream_error",
          detail: sanitizeClientDetail(JSON.stringify(payload)),
        },
        origin,
        allowed
      );
    }
    return jsonResponse(200, { text: extractText(payload) }, origin, allowed);
  } catch (err) {
    return jsonResponse(
      502,
      { error: "proxy_error", message: String(err?.message || err) },
      origin,
      allowed
    );
  }
};
