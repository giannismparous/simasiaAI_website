/*
 * A small PDF writer with embedded TrueType fonts (Greek + Latin), no dependencies.
 * Coordinates are top-left based in points (A4 = 595.28 × 841.89).
 * Fonts are embedded as Type0 / CIDFontType2 with Identity-H, so any glyph in the font
 * prints, and a ToUnicode map keeps the text searchable and copyable.
 */
import zlib from 'zlib';

export const A4 = { w: 595.28, h: 841.89 };

/* ───────── TrueType reading ───────── */

const parseTtf = (buf) => {
  const u16 = (o) => buf.readUInt16BE(o);
  const i16 = (o) => buf.readInt16BE(o);
  const u32 = (o) => buf.readUInt32BE(o);
  const tables = {};
  const n = u16(4);
  for (let i = 0; i < n; i += 1) {
    const o = 12 + i * 16;
    tables[buf.toString('latin1', o, o + 4)] = { off: u32(o + 8), len: u32(o + 12) };
  }
  const head = tables.head.off;
  const unitsPerEm = u16(head + 18);
  const bbox = [i16(head + 36), i16(head + 38), i16(head + 40), i16(head + 42)];
  const hhea = tables.hhea.off;
  const ascent = i16(hhea + 4);
  const descent = i16(hhea + 6);
  const numHMetrics = u16(hhea + 34);
  const numGlyphs = u16(tables.maxp.off + 4);
  const widths = new Array(numGlyphs);
  const hmtx = tables.hmtx.off;
  let last = 0;
  for (let g = 0; g < numGlyphs; g += 1) {
    if (g < numHMetrics) last = u16(hmtx + g * 4);
    widths[g] = last;
  }
  let capHeight = ascent;
  if (tables['OS/2'] && u16(tables['OS/2'].off) >= 2) capHeight = i16(tables['OS/2'].off + 88);
  // cmap: prefer (3,1) format 4
  const cmap = new Map();
  const cm = tables.cmap.off;
  const nSub = u16(cm + 2);
  let sub = null;
  for (let i = 0; i < nSub; i += 1) {
    const pid = u16(cm + 4 + i * 8); const eid = u16(cm + 6 + i * 8); const off = u32(cm + 8 + i * 8);
    if (u16(cm + off) === 4 && (pid === 3 || pid === 0) && (sub === null || (pid === 3 && eid === 1))) sub = cm + off;
  }
  if (sub === null) throw new Error('font has no format 4 cmap');
  const segX2 = u16(sub + 6);
  const ends = sub + 14; const starts = ends + segX2 + 2; const deltas = starts + segX2; const ranges = deltas + segX2;
  for (let s = 0; s < segX2 / 2; s += 1) {
    const end = u16(ends + s * 2); const start = u16(starts + s * 2);
    const delta = i16(deltas + s * 2); const ro = u16(ranges + s * 2);
    for (let c = start; c <= end && c !== 0xffff; c += 1) {
      let g;
      if (ro === 0) g = (c + delta) & 0xffff;
      else {
        const gi = u16(ranges + s * 2 + ro + (c - start) * 2);
        g = gi === 0 ? 0 : (gi + delta) & 0xffff;
      }
      if (g) cmap.set(c, g);
    }
  }
  return { unitsPerEm, bbox, ascent, descent, capHeight, widths, cmap };
};

/* ───────── helpers ───────── */

const num = (x) => (Math.round(x * 100) / 100).toString();
const hexColor = (hex) => {
  const h = hex.replace('#', '');
  return [0, 2, 4].map((i) => num(parseInt(h.slice(i, i + 2), 16) / 255)).join(' ');
};
const utf16hex = (s) => {
  let out = 'FEFF';
  for (const ch of s) {
    const cp = ch.codePointAt(0);
    if (cp > 0xffff) {
      const v = cp - 0x10000;
      out += (0xd800 + (v >> 10)).toString(16).padStart(4, '0') + (0xdc00 + (v & 0x3ff)).toString(16).padStart(4, '0');
    } else out += cp.toString(16).padStart(4, '0');
  }
  return `<${out.toUpperCase()}>`;
};
const pdfStr = (s) => `(${String(s).replace(/[\\()]/g, (m) => `\\${m}`).replace(/[^\x20-\x7e]/g, '')})`;

// characters a font may lack, mapped to close equivalents
const FALLBACK = { '✓': '•', '✕': '×', ' ': ' ', ' ': ' ', '​': '' };

/* ───────── document ───────── */

export class PdfDoc {
  constructor({ fonts, title = '', author = '' }) {
    this.fonts = {};
    Object.entries(fonts).forEach(([key, { data, name }], i) => {
      const buf = Buffer.isBuffer(data) ? data : Buffer.from(data, 'base64');
      this.fonts[key] = { key, res: `F${i + 1}`, name, buf, info: parseTtf(buf), used: new Map() };
    });
    this.pages = [];
    this.title = title;
    this.author = author;
  }

  addPage() {
    const page = new PdfPage(this);
    this.pages.push(page);
    return page;
  }

  glyphs(text, fontKey) {
    const f = this.fonts[fontKey];
    const out = [];
    for (const raw of String(text)) {
      const ch = FALLBACK[raw] !== undefined ? FALLBACK[raw] : raw;
      for (const c of ch) {
        const cp = c.codePointAt(0);
        const g = f.info.cmap.get(cp) || 0;
        out.push(g);
        if (g && !f.used.has(g)) f.used.set(g, cp);
      }
    }
    return out;
  }

  widthOf(text, fontKey, size) {
    const f = this.fonts[fontKey];
    let w = 0;
    for (const raw of String(text)) {
      const ch = FALLBACK[raw] !== undefined ? FALLBACK[raw] : raw;
      for (const c of ch) w += f.info.widths[f.info.cmap.get(c.codePointAt(0)) || 0];
    }
    return (w * size) / f.info.unitsPerEm;
  }

  wrap(text, fontKey, size, maxW) {
    const lines = [];
    String(text).split('\n').forEach((para) => {
      const words = para.split(/\s+/).filter(Boolean);
      let line = '';
      words.forEach((word) => {
        const tryLine = line ? `${line} ${word}` : word;
        if (this.widthOf(tryLine, fontKey, size) <= maxW || !line) {
          if (!line && this.widthOf(word, fontKey, size) > maxW) {
            // a single very long word: break it by characters
            let part = '';
            for (const ch of word) {
              if (this.widthOf(part + ch, fontKey, size) > maxW && part) { lines.push(part); part = ''; }
              part += ch;
            }
            line = part;
          } else line = tryLine;
        } else { lines.push(line); line = word; }
      });
      lines.push(line);
    });
    return lines;
  }

  save() {
    const objs = [];
    const add = (body) => { objs.push(body); return objs.length; };
    const stream = (dict, data, compress = true) => {
      const raw = Buffer.isBuffer(data) ? data : Buffer.from(data, 'latin1');
      const z = compress ? zlib.deflateSync(raw) : raw;
      return { dict: `${dict}${compress ? ' /Filter /FlateDecode' : ''} /Length ${z.length}`, data: z };
    };
    const catalogId = add(null);
    const pagesId = add(null);
    // fonts
    const fontRefs = {};
    Object.values(this.fonts).forEach((f) => {
      const k = 1000 / f.info.unitsPerEm;
      const ff = add(stream(`<< /Length1 ${f.buf.length}`, f.buf));
      const desc = add(`<< /Type /FontDescriptor /FontName /${f.name} /Flags 32 /FontBBox [${f.info.bbox.map((v) => Math.round(v * k)).join(' ')}] /ItalicAngle 0 /Ascent ${Math.round(f.info.ascent * k)} /Descent ${Math.round(f.info.descent * k)} /CapHeight ${Math.round(f.info.capHeight * k)} /StemV 80 /FontFile2 ${ff} 0 R >>`);
      const used = [...f.used.keys()].sort((a, b) => a - b);
      const w = used.map((g) => `${g} [${Math.round(f.info.widths[g] * k)}]`).join(' ');
      const cid = add(`<< /Type /Font /Subtype /CIDFontType2 /BaseFont /${f.name} /CIDSystemInfo << /Registry (Adobe) /Ordering (Identity) /Supplement 0 >> /FontDescriptor ${desc} 0 R /CIDToGIDMap /Identity /DW ${Math.round(f.info.widths[0] * k)} /W [${w}] >>`);
      let cmap = '/CIDInit /ProcSet findresource begin\n12 dict begin\nbegincmap\n/CIDSystemInfo << /Registry (Adobe) /Ordering (UCS) /Supplement 0 >> def\n/CMapName /Adobe-Identity-UCS def\n/CMapType 2 def\n1 begincodespacerange\n<0000> <FFFF>\nendcodespacerange\n';
      for (let i = 0; i < used.length; i += 100) {
        const chunk = used.slice(i, i + 100);
        cmap += `${chunk.length} beginbfchar\n${chunk.map((g) => `<${g.toString(16).padStart(4, '0')}> <${f.used.get(g).toString(16).padStart(4, '0')}>`).join('\n')}\nendbfchar\n`;
      }
      cmap += 'endcmap\nCMapName currentdict /CMap defineresource pop\nend\nend\n';
      const tu = add(stream('<<', cmap));
      fontRefs[f.res] = add(`<< /Type /Font /Subtype /Type0 /BaseFont /${f.name} /Encoding /Identity-H /DescendantFonts [${cid} 0 R] /ToUnicode ${tu} 0 R >>`);
    });
    const fontDict = `<< ${Object.entries(fontRefs).map(([r, id]) => `/${r} ${id} 0 R`).join(' ')} >>`;
    const gs = add('<< /Type /ExtGState /ca 0.5 /CA 0.5 >>');
    const pageIds = this.pages.map((p) => {
      const content = add(stream('<<', p.ops.join('\n')));
      const annots = p.links.map((l) => add(`<< /Type /Annot /Subtype /Link /Rect [${l.rect.map(num).join(' ')}] /Border [0 0 0] /A << /S /URI /URI ${pdfStr(l.url)} >> >>`));
      return add(`<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 ${A4.w} ${A4.h}] /Resources << /Font ${fontDict} /ExtGState << /GS1 ${gs} 0 R >> >> /Contents ${content} 0 R${annots.length ? ` /Annots [${annots.map((a) => `${a} 0 R`).join(' ')}]` : ''} >>`);
    });
    objs[pagesId - 1] = `<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(' ')}] /Count ${pageIds.length} >>`;
    objs[catalogId - 1] = `<< /Type /Catalog /Pages ${pagesId} 0 R /ViewerPreferences << /DisplayDocTitle true >> >>`;
    const infoId = add(`<< /Title ${utf16hex(this.title)} /Author ${utf16hex(this.author)} /Creator (SimasiaAI flow offer) /Producer (SimasiaAI) /CreationDate (D:${new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14)}Z) >>`);

    const chunks = [Buffer.from('%PDF-1.7\n%\xE2\xE3\xCF\xD3\n', 'latin1')];
    let offset = chunks[0].length;
    const offsets = [];
    objs.forEach((o, i) => {
      offsets.push(offset);
      let b;
      if (typeof o === 'string') b = Buffer.from(`${i + 1} 0 obj\n${o}\nendobj\n`, 'latin1');
      else b = Buffer.concat([Buffer.from(`${i + 1} 0 obj\n${o.dict} >>\nstream\n`, 'latin1'), o.data, Buffer.from('\nendstream\nendobj\n', 'latin1')]);
      chunks.push(b); offset += b.length;
    });
    const xref = [`xref\n0 ${objs.length + 1}\n0000000000 65535 f \n`, ...offsets.map((o) => `${String(o).padStart(10, '0')} 00000 n \n`)].join('');
    chunks.push(Buffer.from(`${xref}trailer\n<< /Size ${objs.length + 1} /Root ${catalogId} 0 R /Info ${infoId} 0 R >>\nstartxref\n${offset}\n%%EOF\n`, 'latin1'));
    return Buffer.concat(chunks);
  }
}

export class PdfPage {
  constructor(doc) { this.doc = doc; this.ops = []; this.links = []; }

  Y(y) { return A4.h - y; }

  rect(x, y, w, h, { fill, stroke, lw = 1, r = 0, alpha = false } = {}) {
    const o = this.ops;
    o.push('q');
    if (alpha) o.push('/GS1 gs');
    if (fill) o.push(`${hexColor(fill)} rg`);
    if (stroke) o.push(`${hexColor(stroke)} RG ${num(lw)} w`);
    const X = x; const Yt = this.Y(y); const Yb = this.Y(y + h);
    if (!r) o.push(`${num(X)} ${num(Yb)} ${num(w)} ${num(h)} re`);
    else {
      const k = r * 0.5523;
      o.push(`${num(X + r)} ${num(Yb)} m`, `${num(X + w - r)} ${num(Yb)} l`,
        `${num(X + w - r + k)} ${num(Yb)} ${num(X + w)} ${num(Yb + r - k)} ${num(X + w)} ${num(Yb + r)} c`,
        `${num(X + w)} ${num(Yt - r)} l`,
        `${num(X + w)} ${num(Yt - r + k)} ${num(X + w - r + k)} ${num(Yt)} ${num(X + w - r)} ${num(Yt)} c`,
        `${num(X + r)} ${num(Yt)} l`,
        `${num(X + r - k)} ${num(Yt)} ${num(X)} ${num(Yt - r + k)} ${num(X)} ${num(Yt - r)} c`,
        `${num(X)} ${num(Yb + r)} l`,
        `${num(X)} ${num(Yb + r - k)} ${num(X + r - k)} ${num(Yb)} ${num(X + r)} ${num(Yb)} c`, 'h');
    }
    o.push(fill && stroke ? 'B' : fill ? 'f' : 'S', 'Q');
  }

  circle(cx, cy, r, { fill, stroke, lw = 1 } = {}) {
    const k = r * 0.5523; const X = cx; const Yc = this.Y(cy);
    const o = this.ops;
    o.push('q');
    if (fill) o.push(`${hexColor(fill)} rg`);
    if (stroke) o.push(`${hexColor(stroke)} RG ${num(lw)} w`);
    o.push(`${num(X + r)} ${num(Yc)} m`,
      `${num(X + r)} ${num(Yc + k)} ${num(X + k)} ${num(Yc + r)} ${num(X)} ${num(Yc + r)} c`,
      `${num(X - k)} ${num(Yc + r)} ${num(X - r)} ${num(Yc + k)} ${num(X - r)} ${num(Yc)} c`,
      `${num(X - r)} ${num(Yc - k)} ${num(X - k)} ${num(Yc - r)} ${num(X)} ${num(Yc - r)} c`,
      `${num(X + k)} ${num(Yc - r)} ${num(X + r)} ${num(Yc - k)} ${num(X + r)} ${num(Yc)} c`, 'h',
      fill && stroke ? 'B' : fill ? 'f' : 'S', 'Q');
  }

  line(x1, y1, x2, y2, { color = '#141413', lw = 1, dash = null } = {}) {
    this.ops.push('q', `${hexColor(color)} RG ${num(lw)} w 1 J`, dash ? `[${dash.join(' ')}] 0 d` : '[] 0 d',
      `${num(x1)} ${num(this.Y(y1))} m ${num(x2)} ${num(this.Y(y2))} l S`, 'Q');
  }

  /* polyline / curves for small icons: points in top-left coordinates */
  path(points, { color = '#141413', lw = 1.6, close = false, fill = null } = {}) {
    const [first, ...rest] = points;
    this.ops.push('q', `${hexColor(color)} RG ${num(lw)} w 1 J 1 j`, fill ? `${hexColor(fill)} rg` : '',
      `${num(first[0])} ${num(this.Y(first[1]))} m`, ...rest.map(([x, y]) => `${num(x)} ${num(this.Y(y))} l`),
      close ? 'h' : '', fill ? 'B' : 'S', 'Q');
  }

  check(x, y, size, color) {
    this.path([[x, y + size * 0.55], [x + size * 0.38, y + size * 0.9], [x + size, y + size * 0.1]], { color, lw: size * 0.18 });
  }

  /* text: (x, y) is the baseline-left in top-left coordinates */
  text(str, x, y, { font = 'reg', size = 10, color = '#141413', align = 'left', maxW = null } = {}) {
    if (str === undefined || str === null || str === '') return 0;
    const f = this.doc.fonts[font];
    const w = this.doc.widthOf(str, font, size);
    let X = x;
    if (align === 'right') X = x - w;
    else if (align === 'center') X = x - w / 2;
    const gids = this.doc.glyphs(str, font);
    const hex = gids.map((g) => g.toString(16).padStart(4, '0')).join('');
    this.ops.push('BT', `/${f.res} ${num(size)} Tf`, `${hexColor(color)} rg`, `${num(X)} ${num(this.Y(y))} Td`, `<${hex}> Tj`, 'ET');
    return maxW ? Math.min(w, maxW) : w;
  }

  /* wrapped paragraph; returns the y after the last line */
  para(str, x, y, maxW, { font = 'reg', size = 10, color = '#141413', lead = 1.38, align = 'left' } = {}) {
    const lines = this.doc.wrap(str, font, size, maxW);
    let yy = y;
    lines.forEach((ln) => {
      this.text(ln, align === 'center' ? x + maxW / 2 : x, yy, { font, size, color, align });
      yy += size * lead;
    });
    return yy;
  }

  link(x, y, w, h, url) { this.links.push({ rect: [x, this.Y(y + h), x + w, this.Y(y)], url }); }
}
