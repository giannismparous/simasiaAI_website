#!/usr/bin/env node
/**
 * Build chatbot knowledge-index.json from website translations + page routes.
 * Website-only sources (no Drive). Run: npm run build:knowledge
 */

import fs from "fs";
import path from "path";
import { register } from "node:module";
import { fileURLToPath, pathToFileURL } from "url";

register("./esm-ext-resolve.mjs", import.meta.url);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "public", "data");
const OUT_FILE = path.join(OUT_DIR, "knowledge-index.json");
const CORE_IDENTITY_FILE = path.join(ROOT, "data", "rag", "sima-core-identity.json");

const translationsUrl = pathToFileURL(
  path.join(ROOT, "src", "translations", "translations.js")
).href;
const scarcityCopyUrl = pathToFileURL(
  path.join(ROOT, "src", "utils", "scarcityCopy.js")
).href;
const { translations } = await import(translationsUrl);
const { formatScarcityNote } = await import(scarcityCopyUrl);

function normalize(text) {
  return (text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function extractKeywords(text, max = 14) {
  const tokens = text.match(
    /[A-Za-zΑ-Ωα-ωΆΈΉΊΌΎΏάέήίόύώ][A-Za-zΑ-Ωα-ωΆΈΉΊΌΎΏάέήίόύώ0-9\-]{2,}/g
  );
  const stop = new Set([
    "και", "της", "των", "στο", "για", "the", "and", "for", "with", "from", "that", "this",
  ]);
  const freq = new Map();
  (tokens || []).forEach((t) => {
    const k = t.toLowerCase();
    if (!stop.has(k)) freq.set(k, (freq.get(k) || 0) + 1);
  });
  return [...freq.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, max)
    .map(([w]) => w);
}

function chunkText(text, size = 1200, overlap = 160) {
  const t = (text || "").trim();
  if (!t) return [];
  if (t.length <= size) return [t];
  const chunks = [];
  let start = 0;
  while (start < t.length) {
    const end = Math.min(start + size, t.length);
    chunks.push(t.slice(start, end).trim());
    if (end === t.length) break;
    start = Math.max(0, end - overlap);
  }
  return chunks.filter(Boolean);
}

let docCounter = 0;

function addDocs(docs, base) {
  const { title, url, lang, content, category, keywords = [] } = base;
  const parts = chunkText(content);
  parts.forEach((part, i) => {
    docCounter += 1;
    const suffix = parts.length > 1 ? ` (${i + 1}/${parts.length})` : "";
    docs.push({
      id: `web_${String(docCounter).padStart(4, "0")}`,
      title: title + suffix,
      url,
      lang,
      language: lang,
      content: part,
      category: category || "website",
      keywords: [...new Set([...keywords, ...extractKeywords(`${title} ${part}`)])],
      org: "simasia",
      source: { type: base.sourceType || "web" },
      priority: base.priority || 0,
    });
  });
}

/** Navbar routes only — current public site (see Navbar.js) */
const NAVBAR_ROUTES = ['/', '/ypodochi', '/collaborations', '/news', '/team', '/demo'];

function buildFromTranslations(lang, t) {
  const docs = [];
  const L = lang;

  addDocs(docs, {
    title: L === "el" ? "Αρχική — SimasiaAI & Pyxida" : "Home — SimasiaAI & Pyxida",
    url: "/",
    lang: L,
    category: "company",
    keywords: ["simasiaai", "simasia", "pyxida", "home", "αρχικη"],
    content: [
      t.hero?.line1a,
      t.hero?.line1b,
      t.hero?.line2,
      t.mission?.title,
      t.mission?.text,
      t.whatWeOffer?.title,
      ...(t.whatWeOffer?.cards || []).map((c) => `${c.name}: ${c.desc}`),
      t.whoItsFor?.title,
      ...(t.whoItsFor?.items || []),
      t.howWeWork?.title,
      ...(t.howWeWork?.steps || []),
      t.obstacles?.title,
      ...(t.obstacles?.items || []),
      t.aiCapabilities?.title,
      t.aiCapabilities?.capabilities?.title,
      t.aiCapabilities?.capabilities?.text,
      t.aiCapabilities?.limits?.title,
      t.aiCapabilities?.limits?.text,
      t.footer?.tagline,
    ]
      .filter(Boolean)
      .join("\n"),
  });

  addDocs(docs, {
    title: L === "el" ? "Συνεργασίες" : "Collaborations",
    url: "/collaborations",
    lang: L,
    category: "collaborations",
    keywords: ["collaborations", "συνεργασιες", "partners", "ποαμσκπ", "καπα3"],
    content: [
      t.collaborations?.title,
      t.collaborations?.current?.title,
      ...(t.collaborations?.current?.items || []).map(
        (i) => `${i.name}: ${i.description} (${i.category})`
      ),
      t.collaborations?.process?.title,
      ...(t.collaborations?.process?.steps || []).map((s) => `${s.title}: ${s.desc}`),
      t.collaborations?.achievements?.title,
      ...(t.collaborations?.achievements?.items || []),
      t.collaborations?.commitment,
    ]
      .filter(Boolean)
      .join("\n"),
  });

  addDocs(docs, {
    title: L === "el" ? "Κλείστε demo — φόρμα" : "Book a demo — form",
    url: "/demo",
    lang: L,
    category: "contact",
    keywords: ["demo", "book", "συνεργασια", "proposal", "pyxida"],
    content: [t.demoPage?.heroTitle, t.demoPage?.siteUrlHint, t.demoPage?.submit, t.demoPage?.offerLabel]
      .filter(Boolean)
      .join("\n"),
  });

  addDocs(docs, {
    title: L === "el" ? "Επικοινωνία" : "Contact",
    url: "/demo",
    lang: L,
    category: "contact",
    keywords: ["contact", "email", "επικοινωνια", "simasiaai.gr"],
    content: [
      t.footer?.contact,
      "Email: contact@simasiaai.gr",
      t.footer?.location,
      "LinkedIn: linkedin.com/company/simasiaai",
      "Instagram: instagram.com/simasiaai",
      t.demoPage?.heroTitle,
    ]
      .filter(Boolean)
      .join("\n"),
  });

  return docs;
}

/** @deprecated — solutions page not in navbar; removed from index */
function solutionsPageDocs() {
  return [];
}

function flattenValue(v, acc = []) {
  if (v == null) return acc;
  if (typeof v === "string") {
    const s = v.replace(/<[^>]+>/g, " ").trim();
    if (s) acc.push(s);
    return acc;
  }
  if (typeof v === "number" || typeof v === "boolean") return acc;
  if (Array.isArray(v)) {
    v.forEach((x) => flattenValue(x, acc));
    return acc;
  }
  if (typeof v === "object") {
    Object.values(v).forEach((x) => flattenValue(x, acc));
  }
  return acc;
}

/** Extra page i18n — navbar routes only */
function buildFromExtraNamespaces(lang, t) {
  const docs = [];
  const L = lang;
  const blocks = [
    {
      title: L === "el" ? "Hero — Pyxida (αρχική)" : "Hero — Pyxida (home)",
      url: "/",
      keys: ["forbesHero", "midCta", "enterpriseCta", "hero", "homePyxidaOffer"],
      category: "company",
      keywords: ["pyxida", "hero", "demo", "clinic", "ιατρειο"],
    },
    {
      title: L === "el" ? "Pyxida — ψηφιακή υποδοχή" : "Pyxida — digital reception",
      url: "/ypodochi",
      keys: ["ypodochiPage"],
      category: "products",
      keywords: ["pyxida", "praxi", "ypodochi", "clinic", "ιατρειο", "reception", "απανταει"],
    },
    {
      title: L === "el" ? "Demo — φόρμα αίτησης" : "Demo — request form",
      url: "/demo",
      keys: ["demoPage"],
      category: "contact",
      keywords: ["demo", "book", "pyxida", "φορμα"],
    },
    {
      title: L === "el" ? "Σχετικά (ενότητα αρχικής)" : "About section (home)",
      url: "/",
      keys: ["aboutSection"],
      category: "company",
      keywords: ["about", "ομαδα", "founders", "σχετικα", "pyxida"],
    },
    {
      title: L === "el" ? "Ομάδα — SimasiaAI" : "Team — SimasiaAI",
      url: "/team",
      keys: ["teamPage"],
      category: "company",
      keywords: ["team", "ομαδα", "founders", "ιδρυτες", "ceo"],
    },
    {
      title: L === "el" ? "Νέα & Άρθρα" : "News & articles",
      url: "/news",
      keys: ["newsPage"],
      category: "company",
      keywords: ["news", "νεα", "articles", "αρθρα"],
    },
  ];

  for (const block of blocks) {
    const parts = [];
    for (const key of block.keys) {
      if (t[key]) flattenValue(t[key], parts);
    }
    if (!parts.length) continue;

    let content = parts.join("\n");
    if (block.keys.includes("ypodochiPage")) {
      const translate = (key) => {
        let value = t;
        for (const k of key.split(".")) {
          value = value?.[k];
        }
        return value ?? key;
      };
      const monthLabel = translate("ypodochiPage.cms.monthLabel");
      const seatsSuffix = translate("ypodochiPage.cms.seatsSuffix");
      const resolvedScarcity = formatScarcityNote(translate);
      const filtered = parts.filter(
        (p) =>
          p !== monthLabel &&
          p !== seatsSuffix &&
          !/\{seatsPhrase\}/.test(p) &&
          !/\{month\}/.test(p)
      );
      if (resolvedScarcity) filtered.push(resolvedScarcity);
      content = filtered.join("\n");
    }

    addDocs(docs, {
      title: block.title,
      url: block.url,
      lang: L,
      category: block.category,
      keywords: block.keywords,
      content,
      sourceType: "page_i18n",
      priority: 1,
    });
  }
  return docs;
}

/** Parse data/rag/*.txt docs split by «Κείμενο N:» and JSON core identity */
function buildFromRagFolder() {
  const ragDir = path.join(ROOT, "data", "rag");
  if (!fs.existsSync(ragDir)) return [];
  const docs = [];

  for (const file of fs.readdirSync(ragDir)) {
    const full = path.join(ragDir, file);
    if (!fs.statSync(full).isFile()) continue;

    if (file.endsWith(".json")) {
      // handled by buildCoreIdentityDocs for sima-core-identity.json shape
      if (file === "sima-core-identity.json") continue;
      try {
        const payload = JSON.parse(fs.readFileSync(full, "utf8"));
        for (const section of payload.sections || []) {
          for (const lang of ["el", "en"]) {
            const content = section[lang === "el" ? "content_el" : "content_en"] || section.content;
            if (!content) continue;
            addDocs(docs, {
              title: section.title || file,
              url: section.url || "/",
              lang,
              category: "identity",
              keywords: section.keywords || [],
              content,
              sourceType: "rag_json",
              priority: 2,
            });
          }
        }
      } catch (err) {
        console.warn(`Skip JSON ${file}:`, err.message);
      }
      continue;
    }

    if (!/\.(txt|md)$/i.test(file)) continue;
    const raw = fs.readFileSync(full, "utf8");
    const parts = raw.split(/(?=Κείμενο\s+\d+\s*:)/u).map((p) => p.trim()).filter(Boolean);

    if (parts.length <= 1) {
      addDocs(docs, {
        title: file.replace(/\.(txt|md)$/i, ""),
        url: "/ypodochi",
        lang: "el",
        category: "rag_upload",
        keywords: ["pyxida", "simasia", "rag"],
        content: raw,
        sourceType: "rag_txt",
        priority: 3,
      });
      continue;
    }

    for (const part of parts) {
      if (/Οδηγία για το RAG/i.test(part) && !/Τίτλος:/u.test(part)) {
        addDocs(docs, {
          title: "RAG system guidance (sales) — Pyxida",
          url: "/demo",
          lang: "el",
          category: "rag_guidance",
          keywords: ["demo", "book", "access", "sales"],
          content: part,
          sourceType: "rag_txt",
          priority: 2,
        });
        continue;
      }
      const titleMatch = part.match(/Τίτλος:\s*(.+)/u);
      const headMatch = part.match(/^Κείμενο\s+\d+\s*:\s*(.+)/u);
      const contentMatch = part.match(/Περιεχόμενο:\s*([\s\S]*?)(?=(?:\nΚείμενο\s+\d+|$))/u);
      const title = (titleMatch?.[1] || headMatch?.[1] || "Pyxida RAG").trim();
      let content = (contentMatch?.[1] || part).trim();
      // Strip trailing global RAG instruction from last chunk if glued
      content = content.replace(/\nΟδηγία για το RAG[\s\S]*$/u, "").trim();
      if (!content) continue;
      addDocs(docs, {
        title,
        url: "/ypodochi",
        lang: "el",
        category: "rag_upload",
        keywords: extractKeywords(title + " " + content, 18),
        content,
        sourceType: "rag_txt",
        priority: 3,
      });
    }
  }

  return docs;
}

/** Core positioning RAG (data/rag/sima-core-identity.json) — high-priority chunks */
function buildCoreIdentityDocs() {
  if (!fs.existsSync(CORE_IDENTITY_FILE)) return [];
  const payload = JSON.parse(fs.readFileSync(CORE_IDENTITY_FILE, "utf8"));
  const docs = [];
  for (const section of payload.sections || []) {
    for (const lang of ["el", "en"]) {
      const contentKey = lang === "el" ? "content_el" : "content_en";
      const content = section[contentKey];
      if (!content) continue;
      addDocs(docs, {
        title: section.title,
        url: section.url || "/about",
        lang,
        category: "identity",
        keywords: section.keywords || [],
        content,
        sourceType: "core_rag",
        priority: 2,
      });
    }
  }
  return docs;
}

const allDocs = [
  ...buildCoreIdentityDocs(),
  ...buildFromRagFolder(),
  ...buildFromTranslations("el", translations.el),
  ...buildFromTranslations("en", translations.en),
  ...buildFromExtraNamespaces("el", translations.el),
  ...buildFromExtraNamespaces("en", translations.en),
  ...solutionsPageDocs(),
];

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(
  OUT_FILE,
  JSON.stringify(
    {
      documents: allDocs,
      generatedAt: new Date().toISOString(),
      source: "navbar-pages+page-i18n+core-identity+pyxida-rag",
      navbarRoutes: NAVBAR_ROUTES,
    },
    null,
    2
  ),
  "utf8"
);

console.log(`Wrote ${allDocs.length} chunks to ${OUT_FILE}`);
