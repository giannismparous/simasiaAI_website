#!/usr/bin/env node
/**
 * Run Sima E2E tests: questions + expected answers vs live answerQuestion().
 * Prereq: npm run proxy:gemini (or Netlify function in prod)
 *
 * Usage:
 *   node scripts/run_simasia_e2e.mjs
 *   node scripts/run_simasia_e2e.mjs --from 1 --to 20
 *   node scripts/run_simasia_e2e.mjs --conv 101
 *   node scripts/run_simasia_e2e.mjs --failed-only
 *   node scripts/run_simasia_e2e.mjs --failed-only --log data/test-logs/e2e-....txt
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const QUESTIONS_PATH = path.join(ROOT, 'data', 'simasia-test-questions.txt');
const EXPECTED_PATH = path.join(ROOT, 'data', 'simasia-test-expected-answers.txt');
const LOG_DIR = path.join(ROOT, 'data', 'test-logs');

const args = process.argv.slice(2);
const fromIdx = Number(getArg('--from', '1'));
const toIdx = Number(getArg('--to', '9999'));
const convFilter = getArg('--conv', null);
const delayMs = Number(getArg('--delay', '1500'));
const failedOnly = args.includes('--failed-only');
const failedLogArg = getArg('--log', null);

function getArg(name, def) {
  const i = args.indexOf(name);
  if (i === -1) return def;
  return args[i + 1] ?? def;
}

function parseQuestions(text) {
  const items = [];
  let conv = 0;
  let title = '';
  for (const line of text.split(/\r?\n/)) {
    const mConv = line.match(/^ΣΥΝΟΜΙΛΙΑ\s+(\d+)\s*[—–-]\s*(.+)$/);
    if (mConv) {
      conv = Number(mConv[1]);
      title = mConv[2].trim();
      continue;
    }
    const mQ = line.match(/^(\d+)\.\s+(.+)$/);
    if (mQ && conv) {
      items.push({
        conv,
        qnum: Number(mQ[1]),
        title,
        question: mQ[2].trim(),
        part: conv >= 101 ? 'guard' : 'content',
      });
    }
  }
  return items;
}

function parseExpected(text) {
  const out = new Map();
  const re =
    /ΣΥΝΟΜΙΛΙΑ\s+(\d+)\s+—\s+Q(\d+)\s*\n([\s\S]*?)(?=\n={10,}\n|\nΣΥΝΟΜΙΛΙΑ\s+\d+\s+—\s+Q|\Z)/g;
  let m;
  while ((m = re.exec(text)) !== null) {
    const key = `${m[1]}:${m[2]}`;
    const block = m[3];
    const statusM = block.match(/^ΚΑΤΑΣΤΑΣΗ:\s*(.+)$/m);
    const mustContain = [];
    const mustNot = [];
    for (const line of block.split(/\r?\n/)) {
      if (line.startsWith('MUST_CONTAIN:')) {
        mustContain.push(line.slice('MUST_CONTAIN:'.length).trim());
      }
      if (line.startsWith('MUST_NOT_CONTAIN:')) {
        mustNot.push(line.slice('MUST_NOT_CONTAIN:'.length).trim());
      }
    }
    out.set(key, {
      status: statusM ? statusM[1].trim() : '',
      mustContain,
      mustNot,
    });
  }
  return out;
}

function foldGreek(text) {
  return (text || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function matchPart(part, hay) {
  const p = foldGreek(part.trim());
  if (!p) return true;
  if (/\s+AND\s+/i.test(part)) {
    return part.split(/\s+AND\s+/i).every((t) => hay.includes(foldGreek(t.trim())));
  }
  if (/\s+OR\s+/i.test(part)) {
    return part.split(/\s+OR\s+/i).some((t) => hay.includes(foldGreek(t.trim())));
  }
  return hay.includes(p);
}

function matchRule(rule, hay) {
  if (rule.includes(',')) {
    return rule.split(',').every((part) => matchPart(part, hay));
  }
  return matchPart(rule, hay);
}

function checkRules(answer, rules) {
  const hay = foldGreek(answer || '');
  const fails = [];
  const oks = [];
  for (const rule of rules.mustContain || []) {
    if (!matchRule(rule, hay)) fails.push(`MUST_CONTAIN miss: ${rule}`);
    else oks.push(rule);
  }
  for (const rule of rules.mustNot || []) {
    if (hay.includes(foldGreek(rule))) fails.push(`MUST_NOT_CONTAIN hit: ${rule}`);
  }
  return { pass: fails.length === 0, fails, oks };
}

function installLocalFetch() {
  const orig = globalThis.fetch;
  const map = {
    '/data/knowledge-index.json': path.join(ROOT, 'public', 'data', 'knowledge-index.json'),
    '/data/retrieval-rules.json': path.join(ROOT, 'public', 'data', 'retrieval-rules.json'),
    '/data/simasia-faq.json': path.join(ROOT, 'public', 'data', 'simasia-faq.json'),
  };
  globalThis.fetch = async (input, init) => {
    const u = String(input);
    for (const [suffix, filePath] of Object.entries(map)) {
      if (u.includes(suffix) && fs.existsSync(filePath)) {
        return new Response(fs.readFileSync(filePath, 'utf8'), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }
    if (typeof orig === 'function') return orig(input, init);
    throw new Error(`fetch not available for ${u}`);
  };
}

async function loadChatService() {
  process.env.REACT_APP_GEMINI_PROXY_URL =
    process.env.REACT_APP_GEMINI_PROXY_URL ||
    'http://127.0.0.1:3456/.netlify/functions/gemini-chat';
  installLocalFetch();
  const url = pathToFileURL(path.join(ROOT, 'src', 'chatbot', 'services', 'chatService.js')).href;
  return import(url);
}

function loadFailedKeys(logPath) {
  const text = fs.readFileSync(logPath, 'utf8');
  const keys = new Set();
  for (const block of text.split('='.repeat(72))) {
    const head = block.match(/#(\d+) ΣΥΝΟΜΙΛΙΑ (\d+) — Q(\d+)/);
    if (head && /ΑΠΟΤΕΛΕΣΜΑ: FAIL/.test(block)) {
      keys.add(`${head[2]}:${head[3]}`);
    }
  }
  return keys;
}

function latestE2eLog() {
  const files = fs
    .readdirSync(LOG_DIR)
    .filter((f) => f.startsWith('e2e-') && f.endsWith('.txt'))
    .map((f) => ({ f, m: fs.statSync(path.join(LOG_DIR, f)).mtimeMs }))
    .sort((a, b) => b.m - a.m);
  return files.length ? path.join(LOG_DIR, files[0].f) : null;
}

function buildHistoryFromCache(turns) {
  const msgs = [];
  for (const t of turns || []) {
    msgs.push({ id: msgs.length, text: t.user, sender: 'user' });
    msgs.push({ id: msgs.length, text: t.bot, sender: 'bot' });
  }
  return msgs;
}

function expandFailedQuestionsWithContext(allQuestions, failedKeys) {
  const maxQByConv = new Map();
  for (const key of failedKeys) {
    const [conv, qnum] = key.split(':').map(Number);
    const prev = maxQByConv.get(conv) || 0;
    if (qnum > prev) maxQByConv.set(conv, qnum);
  }
  const runKeys = new Set(failedKeys);
  for (const [conv, maxQ] of maxQByConv) {
    allQuestions
      .filter((q) => q.conv === conv && q.qnum < maxQ)
      .forEach((q) => runKeys.add(`${q.conv}:${q.qnum}`));
  }
  return allQuestions.filter((q) => runKeys.has(`${q.conv}:${q.qnum}`));
}

async function main() {
  const allQuestions = parseQuestions(fs.readFileSync(QUESTIONS_PATH, 'utf8'));
  let questions = allQuestions;
  const expected = parseExpected(fs.readFileSync(EXPECTED_PATH, 'utf8'));
  const { answerQuestion } = await loadChatService();

  fs.mkdirSync(LOG_DIR, { recursive: true });

  let failedKeys = null;
  let gradeKeys = null;
  if (failedOnly) {
    const logForFailed = failedLogArg || latestE2eLog();
    if (!logForFailed || !fs.existsSync(logForFailed)) {
      console.error('No prior E2E log found for --failed-only');
      process.exit(1);
    }
    failedKeys = loadFailedKeys(logForFailed);
    gradeKeys = failedKeys;
    questions = expandFailedQuestionsWithContext(allQuestions, failedKeys);
    console.log(
      `Re-running ${questions.length} cases (${failedKeys.size} graded failures) from ${logForFailed}`
    );
  }

  const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const logPath = path.join(LOG_DIR, `e2e-${stamp}.txt`);

  let globalIdx = 0;
  let pass = 0;
  let fail = 0;
  let err = 0;
  const convTurnCache = new Map();

  const lines = [
    `# Sima E2E run ${new Date().toISOString()}`,
    `# Questions: ${questions.length}${failedOnly ? ' (failed-only)' : ''}`,
    '',
  ];

  for (const item of questions) {
    globalIdx += 1;
    if (!failedOnly && (globalIdx < fromIdx || globalIdx > toIdx)) continue;
    if (convFilter && String(item.conv) !== String(convFilter)) continue;

    const key = `${item.conv}:${item.qnum}`;
    const exp = expected.get(key) || {};
    const isGraded = !gradeKeys || gradeKeys.has(key);
    const priorTurns = convTurnCache.get(item.conv) || [];
    const messages = item.qnum > 1 ? buildHistoryFromCache(priorTurns) : [];
    const lastResolved =
      priorTurns.length > 0 ? priorTurns[priorTurns.length - 1].user : '';

    lines.push('='.repeat(72));
    lines.push(`#${globalIdx} ΣΥΝΟΜΙΛΙΑ ${item.conv} — Q${item.qnum} | ${item.title}`);
    lines.push(`ΕΡΩΤΗΣΗ: ${item.question}`);
    lines.push(`ΑΝΑΜΕΝΟΜΕΝΗ ΚΑΤΑΣΤΑΣΗ: ${exp.status || '?'}`);

    try {
      const res = await answerQuestion(item.question, null, {
        messages,
        lastResolvedQuery: lastResolved,
        uiLanguage: item.question.match(/[α-ω]/i) ? 'el' : 'en',
        stream: false,
      });

      const answer = res.answer || '';
      const blocked = Boolean(res.blocked);
      lines.push(`BLOCKED: ${blocked}`);
      lines.push(`CONFIDENCE: ${res.confidence ?? ''}`);
      lines.push(`ΠΗΓΕΣ: ${(res.sources || []).map((s) => s.url).join(', ')}`);
      lines.push('ΑΠΑΝΤΗΣΗ:');
      lines.push(answer);

      const guardExpected = (exp.status || '').startsWith('GUARD');
      const contentExpected = /^(OK|OK_PARTIAL|NO_INFO)/.test(exp.status || '');
      const statusFails = [];
      if (guardExpected && !blocked && !/μόνο|only|SimasiaAI|cannot|δεν μπορώ/i.test(answer)) {
        statusFails.push('expected guard, got normal answer');
      }
      if (contentExpected && blocked) {
        statusFails.push('expected content answer, got scope block');
      }

      const { pass: rulesPass, fails: ruleFails } = checkRules(answer, exp);
      if (!isGraded) {
        lines.push('ΑΠΟΤΕΛΕΣΜΑ: CONTEXT (not graded)');
      } else if (statusFails.length || !rulesPass) {
        fail += 1;
        lines.push('ΑΠΟΤΕΛΕΣΜΑ: FAIL');
        statusFails.forEach((f) => lines.push(`  - ${f}`));
        ruleFails.forEach((f) => lines.push(`  - ${f}`));
      } else {
        pass += 1;
        lines.push('ΑΠΟΤΕΛΕΣΜΑ: PASS');
      }
      if (res.error) {
        err += 1;
        lines.push(`ERROR: ${res.error}`);
      }

      if (!res.error && answer) {
        const turns = convTurnCache.get(item.conv) || [];
        turns.push({ user: item.question, bot: answer });
        convTurnCache.set(item.conv, turns);
      }
    } catch (e) {
      err += 1;
      lines.push(`ΑΠΟΤΕΛΕΣΜΑ: ERROR ${e.message}`);
    }

    lines.push('');
    fs.writeFileSync(logPath, lines.join('\n'), 'utf8');
    console.log(
      `[${globalIdx}] conv ${item.conv} q${item.qnum} ${item.part} -> ${lines[lines.length - 2]}`
    );
    await new Promise((r) => setTimeout(r, delayMs));
  }

  const summary = `\nSUMMARY: PASS=${pass} FAIL=${fail} ERROR=${err} LOG=${logPath}\n`;
  lines.push(summary);
  fs.writeFileSync(logPath, lines.join('\n'), 'utf8');
  console.log(summary);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
