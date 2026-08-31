#!/usr/bin/env node
/**
 * Local dev proxy for Gemini (use with npm start + src/setupProxy.js).
 * Loads keys from .env: SIMASIA_GEMINI_API_KEYS=key1,key2
 * Run: node scripts/local-gemini-proxy.mjs
 */

import http from 'http';
import { readFileSync, existsSync } from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PORT = Number(process.env.SIMASIA_PROXY_PORT || 3456);

const { getModelName, GENERATION_CONFIG } = await import(
  pathToFileURL(path.join(ROOT, 'netlify/functions/lib/gemini-keys.mjs')).href
);

function loadEnv() {
  const envPath = path.join(ROOT, '.env');
  if (!existsSync(envPath)) return;
  readFileSync(envPath, 'utf8')
    .split('\n')
    .forEach((line) => {
      const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
      if (m && !process.env[m[1]]) {
        process.env[m[1]] = m[2].replace(/^["']|["']$/g, '').trim();
      }
    });
}

loadEnv();

const keys = (process.env.SIMASIA_GEMINI_API_KEYS || '')
  .split(',')
  .map((k) => k.trim())
  .filter(Boolean);

function sanitizeDetail(text) {
  return String(text || '')
    .replace(/\bAIza[A-Za-z0-9_-]{20,}\b/g, '[redacted]')
    .replace(/x-goog-api-key["']?\s*[:=]\s*["']?[^"'\s,}]+/gi, 'x-goog-api-key:[redacted]')
    .replace(/[?&]key=[A-Za-z0-9_-]+/gi, 'key=[redacted]')
    .slice(0, 500);
}

const MODEL = getModelName();
const MAX_PROMPT_CHARS = 24000;

function pickKey() {
  if (!keys.length) throw new Error('SIMASIA_GEMINI_API_KEYS missing in .env');
  return keys[Math.floor(Math.random() * keys.length)];
}

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const urlPath = (req.url || '').split('?')[0];
  const isChat =
    urlPath === '/.netlify/functions/gemini-chat' || urlPath === '/gemini-chat';
  if (!isChat || req.method !== 'POST') {
    res.writeHead(404);
    res.end('Not found');
    return;
  }

  let body = '';
  req.on('data', (c) => { body += c; });
  req.on('end', async () => {
    try {
      const parsed = JSON.parse(body || '{}');
      const prompt = String(parsed.prompt || '');
      if (prompt.length > MAX_PROMPT_CHARS) {
        res.writeHead(413, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'prompt_too_large' }));
        return;
      }
      const stream = Boolean(parsed.stream);
      const apiKey = pickKey();
      const googleBase = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(MODEL)}`;
      const googleBody = JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: GENERATION_CONFIG,
      });
      const headers = { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey };

      if (stream) {
        const googleRes = await fetch(`${googleBase}:streamGenerateContent?alt=sse`, {
          method: 'POST',
          headers,
          body: googleBody,
        });
        res.writeHead(googleRes.status, {
          'Content-Type': 'text/event-stream; charset=utf-8',
          'Cache-Control': 'no-cache',
        });
        const reader = googleRes.body.getReader();
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          res.write(value);
        }
        res.end();
        return;
      }

      const googleRes = await fetch(`${googleBase}:generateContent`, {
        method: 'POST',
        headers,
        body: googleBody,
      });
      const payload = await googleRes.json();
      res.writeHead(googleRes.ok ? 200 : googleRes.status, { 'Content-Type': 'application/json' });
      if (googleRes.ok) {
        const text =
          payload?.candidates?.[0]?.content?.parts?.map((p) => p.text).join('') || '';
        res.end(JSON.stringify({ text }));
      } else {
        res.end(
          JSON.stringify({
            error: 'gemini_upstream_error',
            detail: sanitizeDetail(JSON.stringify(payload)),
          })
        );
      }
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'proxy_error', detail: sanitizeDetail(err.message || err) }));
    }
  });
});

server.listen(PORT, () => {
  console.log(`Sima Gemini local proxy http://127.0.0.1:${PORT}/.netlify/functions/gemini-chat`);
  console.log(`Model: ${MODEL} | Keys loaded: ${keys.length}`);
});
