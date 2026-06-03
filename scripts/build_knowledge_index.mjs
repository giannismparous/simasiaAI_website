#!/usr/bin/env node
/**
 * Build chatbot knowledge-index.json from website translations + page routes.
 * Website-only sources (no Drive). Run: node scripts/build_knowledge_index.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

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
      "LinkedIn: linkedin.com/in/simasiaai",
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

/** Solutions page (Greek-heavy in component; bilingual summary) */
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
  ...buildFromTranslations("el", translations.el),
  ...buildFromTranslations("en", translations.en),
  ...solutionsPageDocs(),
];

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(
  OUT_FILE,
  JSON.stringify(
    {
      documents: allDocs,
      generatedAt: new Date().toISOString(),
      source: "website-translations+core-identity-rag",
    },
    null,
    2
  ),
  "utf8"
);

console.log(`Wrote ${allDocs.length} chunks to ${OUT_FILE}`);
