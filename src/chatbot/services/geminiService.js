/**
 * Gemini via server-side Netlify proxy — API keys never in the browser.
 */

const PROXY_URL =
  (process.env.REACT_APP_GEMINI_PROXY_URL || '/.netlify/functions/gemini-chat').trim();

function redactSecrets(text) {
  return String(text || '')
    .replace(/\bAIza[A-Za-z0-9_-]{20,}\b/g, '[redacted]')
    .replace(/x-goog-api-key["']?\s*[:=]\s*["']?[^"'\s,}]+/gi, 'x-goog-api-key:[redacted]')
    .replace(/[?&]key=[A-Za-z0-9_-]+/gi, 'key=[redacted]');
}

function getProxyUrl() {
  if (!PROXY_URL) {
    throw new Error('Gemini proxy URL not configured');
  }
  return PROXY_URL;
}

export async function generateWithTimeout(prompt, options = {}) {
  const { timeout = 45000 } = options;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(getProxyUrl(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, stream: false }),
      signal: controller.signal,
    });

    clearTimeout(timer);

    if (!response.ok) {
      const text = await response.text();
      let detail = text;
      try {
        const j = JSON.parse(text);
        detail = j.message || j.error || text;
      } catch {
        /* keep text */
      }
      throw new Error(redactSecrets(detail) || `Gemini proxy HTTP ${response.status}`);
    }

    const payload = await response.json();
    if (payload.error) {
      throw new Error(payload.message || payload.error);
    }
    return String(payload.text || '').trim();
  } catch (err) {
    clearTimeout(timer);
    if (err.name === 'AbortError') {
      throw new Error('Request timed out while generating answer');
    }
    throw err;
  }
}

/**
 * Stream tokens via SSE proxy; calls onChunk with incremental text.
 */
export async function generateStream(prompt, onChunk, options = {}) {
  const { timeout = 90000 } = options;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  const response = await fetch(getProxyUrl(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, stream: true }),
    signal: controller.signal,
  });

  clearTimeout(timer);

  if (!response.ok || !response.body) {
    const text = await response.text();
    throw new Error(redactSecrets(text) || 'Gemini stream failed');
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let fullText = '';

  const processEventBlock = (eventBlock) => {
    const lines = eventBlock
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);
    lines.forEach((line) => {
      if (!line.startsWith('data:')) return;
      const payloadText = line.slice(5).trim();
      if (!payloadText || payloadText === '[DONE]') return;
      try {
        const json = JSON.parse(payloadText);
        const rawText =
          json.candidates?.[0]?.content?.parts?.map((p) => p.text).join('') || '';
        if (rawText) {
          const delta = rawText.startsWith(fullText)
            ? rawText.slice(fullText.length)
            : rawText;
          if (delta) {
            fullText = rawText.startsWith(fullText) ? rawText : fullText + delta;
            onChunk(delta);
          }
        }
      } catch {
        /* ignore parse errors in stream */
      }
    });
  };

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const parts = buffer.split('\n\n');
    buffer = parts.pop() || '';
    parts.forEach(processEventBlock);
  }
  if (buffer.trim()) processEventBlock(buffer);

  return fullText.trim();
}
