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
const { translations } = await import(translationsUrl);

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

function buildFromTranslations(lang, t) {
  const docs = [];
  const L = lang;

  addDocs(docs, {
    title: L === "el" ? "Αρχική — SimasiaAI" : "Home — SimasiaAI",
    url: "/",
    lang: L,
    category: "company",
    keywords: ["simasiaai", "simasia", "home", "αρχικη"],
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
    title: L === "el" ? "Σχετικά — SimasiaAI" : "About — SimasiaAI",
    url: "/about",
    lang: L,
    category: "company",
    keywords: ["about", "σχετικα", "εταιρεια", "startup"],
    content: [
      t.about?.title,
      t.about?.text,
      t.mission?.title,
      t.mission?.text,
      t.values?.title,
      ...(t.values?.items || []).map((v) => `${v.title}: ${v.text}`),
      t.philosophy?.title,
      t.philosophy?.vision?.title,
      t.philosophy?.vision?.text,
      t.philosophy?.whatWeDo?.title,
      ...(t.philosophy?.whatWeDo?.items || []).map((x) => `${x.title}: ${x.text}`),
    ]
      .filter(Boolean)
      .join("\n"),
  });

  addDocs(docs, {
    title: L === "el" ? "Εφαρμογές — Επισκόπηση" : "Applications — Overview",
    url: "/applications",
    lang: L,
    category: "products",
    keywords: ["products", "applications", "εφαρμογες", "προιοντα"],
    content: [
      t.applications?.title,
      t.applications?.subtitle,
      t.whatWeOffer?.title,
      ...(t.whatWeOffer?.cards || []).map((c) => `${c.name}: ${c.desc} (${c.link})`),
    ]
      .filter(Boolean)
      .join("\n"),
  });

  const productKeys = [
    { key: "chatbots", path: "/applications/simasia-chatbots", name: "SimasiaChatbots" },
    { key: "edu", path: "/applications/simasia-edu", name: "SimasiaEdu" },
    { key: "studio", path: "/applications/simasia-studio", name: "SimasiaStudio" },
    { key: "daily", path: "/applications/simasia-daily", name: "SimasiaDaily" },
  ];

  for (const { key, path: url, name } of productKeys) {
    const p = t.products?.[key];
    if (!p) continue;
    let body = [p.name, p.title, p.offers, ...(p.features || [])].filter(Boolean).join("\n");
    if (p.toolCategories) {
      body += "\n" + p.toolCategories.map((tc) => `${tc.category}: ${(tc.tools || []).join(" ")}`).join("\n");
    }
    addDocs(docs, {
      title: `${name} — ${L === "el" ? "Προϊόν" : "Product"}`,
      url,
      lang: L,
      category: "products",
      keywords: [name.toLowerCase(), key, "simasia"],
      content: body,
    });
  }

  addDocs(docs, {
    title: L === "el" ? "Ποιους αφορά" : "Who It's For",
    url: "/target-audience",
    lang: L,
    category: "audience",
    keywords: ["target", "audience", "ποιους", "αφορα"],
    content: [
      t.targetAudience?.title,
      ...(t.targetAudience?.audienceCards || []).map(
        (c) => `${c.title} — προτεινόμενο/ recommended: ${c.product}`
      ),
    ]
      .filter(Boolean)
      .join("\n"),
  });

  addDocs(docs, {
    title: L === "el" ? "Συνεργασίες" : "Collaborations",
    url: "/collaborations",
    lang: L,
    category: "collaborations",
    keywords: ["collaborations", "συνεργασιες", "partners"],
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
    title: L === "el" ? "Κλείστε demo" : "Book a demo",
    url: "/book-demo",
    lang: L,
    category: "contact",
    keywords: ["demo", "book", "συνεργασια", "proposal"],
    content: [t.bookDemo?.title, t.bookDemo?.description, t.contactForm?.title, t.contactForm?.subtitle]
      .filter(Boolean)
      .join("\n"),
  });

  addDocs(docs, {
    title: L === "el" ? "Επικοινωνία" : "Contact",
    url: "/book-demo",
    lang: L,
    category: "contact",
    keywords: ["contact", "email", "επικοινωνια", "simasiaai.gr"],
    content: [
      t.footer?.contact,
      "Email: contact@simasiaai.gr",
      t.footer?.location,
      "LinkedIn: linkedin.com/company/simasiaai",
      "Instagram: instagram.com/simasiaai",
      t.contactForm?.subtitle,
      t.contactForm?.privacyNote,
      t.contactForm?.errorMessage,
    ]
      .filter(Boolean)
      .join("\n"),
  });

  return docs;
}

/** Solutions page bilingual summary (backup if pageI18n missing) */
function solutionsPageDocs() {
  const el = {
    title: "Λύσεις με Σημασία",
    url: "/solutions",
    content: `Λύσεις με Σημασία. Για Επιχειρήσεις, Φορείς, Οργανισμούς. Συνεργαζόμαστε για λύσεις που ενισχύουν την κοινωνική συνοχή και υποστηρίζουν καθαρή, προσβάσιμη επικοινωνία.

Τι πετυχαίνουμε μαζί:
- Σαφείς απαντήσεις και λιγότερη χρονοτριβή σε συχνές ερωτήσεις/σύνθετες διαδικασίες.
- Διαφάνεια γνώσης με τεκμηρίωση από εγκεκριμένες πηγές.
- Προσβασιμότητα & συμπερίληψη στην ψηφιακή επικοινωνία.
- Ενδυνάμωση κοινοτήτων (υγεία, εκπαίδευση, κοινωνικές υπηρεσίες, πολιτισμός) με έγκυρη καθοδήγηση.
- Ομαλή ενσωμάτωση στις υπάρχουσες ροές και συστήματα.

Πώς συνεργαζόμαστε: Διερεύνηση → Πιλοτική εφαρμογή → Παραγωγική ένταξη (SSO/CRM/Helpdesk) → Υποστήριξη & Εξέλιξη.

Τι μπορούμε να αναπτύξουμε (ενδεικτικά): chatbots, εκπαιδευτικά εργαλεία, μετάφραση/επιμέλεια, μικρά εργαλεία αυτοματοποίησης.

Γιατί chatbots SimasiaAI: προσβασιμότητα, πολυγλωσσία, μείωση προκαταλήψεων, εκπαίδευση σε δικό σας περιεχόμενο, συνέπεια & ασφάλεια, κλιμάκωση και ειδοποιήσεις.`,
  };
  const en = {
    title: "Solutions with Meaning",
    url: "/solutions",
    content: `Solutions with Meaning. For businesses, institutions, and organizations. We collaborate to strengthen social cohesion and support clear, accessible communication.

What we achieve together: clear answers to frequent questions; knowledge transparency from approved sources; accessibility and inclusion; community empowerment in health, education, social services, and culture; smooth integration into existing systems.

How we collaborate: Exploration → Pilot → Production integration (SSO/CRM/Helpdesk) → Support & evolution.

What we can build: chatbots, education tools, translation/editing, workflow automation.

Why SimasiaAI chatbots: accessibility by design, multilingual support, bias reduction, training on your content, consistency and safety, escalation and notifications.`,
  };
  const docs = [];
  for (const [lang, block] of [
    ["el", el],
    ["en", en],
  ]) {
    addDocs(docs, {
      title: block.title,
      url: block.url,
      lang,
      category: "solutions",
      keywords: ["solutions", "λυσεις", "συνεργασια"],
      content: block.content,
    });
  }
  return docs;
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

/** Extra homepage / product namespaces from merged translations */
function buildFromExtraNamespaces(lang, t) {
  const docs = [];
  const L = lang;
  const blocks = [
    {
      title: L === "el" ? "Hero — DialogosAI" : "Hero — DialogosAI",
      url: "/",
      keys: ["forbesHero", "midCta", "enterpriseCta", "hero"],
      category: "company",
      keywords: ["dialogosai", "hero", "demo"],
    },
    {
      title: L === "el" ? "Σχετικά με εμάς (ενότητα)" : "About section",
      url: "/#about",
      keys: ["aboutSection"],
      category: "company",
      keywords: ["about", "ομαδα", "founders", "σχετικα"],
    },
    {
      title: L === "el" ? "Κύκλος μάθησης" : "Learning loop",
      url: "/",
      keys: ["learningLoop"],
      category: "product",
      keywords: ["learning", "loop", "analyze", "train", "test", "deploy"],
    },
    {
      title: L === "el" ? "Ελεγχόμενη βελτίωση" : "Controlled improvement",
      url: "/",
      keys: ["controlledImprovement"],
      category: "product",
      keywords: ["improvement", "flywheel", "approval", "ελεγχος"],
    },
    {
      title: L === "el" ? "Insights Dashboard" : "Insights Dashboard",
      url: "/",
      keys: ["insightsDashboard"],
      category: "product",
      keywords: ["insights", "dashboard", "analytics"],
    },
    {
      title: L === "el" ? "Σύγκριση DialogosAI" : "DialogosAI comparison",
      url: "/applications/simasia-chatbots",
      keys: ["comparison"],
      category: "products",
      keywords: ["comparison", "συγκριση", "chatbots"],
    },
    {
      title: "DialogosAI — product page",
      url: "/applications/simasia-chatbots",
      keys: ["chatbotsPage"],
      category: "products",
      keywords: ["dialogosai", "chatbots", "pillars", "sectors"],
    },
    {
      title: L === "el" ? "Υπηρεσίες" : "Services",
      url: "/services",
      keys: ["servicesPage"],
      category: "services",
      keywords: ["services", "υπηρεσιες", "consulting", "education", "packages"],
    },
    {
      title: L === "el" ? "Λύσεις (pageI18n)" : "Solutions (pageI18n)",
      url: "/solutions",
      keys: ["solutionsPage"],
      category: "solutions",
      keywords: ["solutions", "λυσεις"],
    },
    {
      title: L === "el" ? "Κλείστε Demo (σελίδα)" : "Book Demo page",
      url: "/book-demo",
      keys: ["bookDemoPage", "bookDemo"],
      category: "contact",
      keywords: ["demo", "book"],
    },
  ];

  for (const block of blocks) {
    const parts = [];
    for (const key of block.keys) {
      if (t[key]) flattenValue(t[key], parts);
    }
    if (!parts.length) continue;
    addDocs(docs, {
      title: block.title,
      url: block.url,
      lang: L,
      category: block.category,
      keywords: block.keywords,
      content: parts.join("\n"),
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
        url: "/applications/simasia-chatbots",
        lang: "el",
        category: "rag_upload",
        keywords: ["dialogosai", "simasia", "rag"],
        content: raw,
        sourceType: "rag_txt",
        priority: 3,
      });
      continue;
    }

    for (const part of parts) {
      if (/Οδηγία για το RAG/i.test(part) && !/Τίτλος:/u.test(part)) {
        addDocs(docs, {
          title: "RAG system guidance (sales) — DialogosAI",
          url: "/book-demo",
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
      const title = (titleMatch?.[1] || headMatch?.[1] || "DialogosAI RAG").trim();
      let content = (contentMatch?.[1] || part).trim();
      // Strip trailing global RAG instruction from last chunk if glued
      content = content.replace(/\nΟδηγία για το RAG[\s\S]*$/u, "").trim();
      if (!content) continue;
      addDocs(docs, {
        title,
        url: "/applications/simasia-chatbots",
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
      source: "website-translations+page-i18n+core-identity+rag-uploads",
    },
    null,
    2
  ),
  "utf8"
);

console.log(`Wrote ${allDocs.length} chunks to ${OUT_FILE}`);
