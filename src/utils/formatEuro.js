/** Move € from prefix to suffix: €199 → 199€, €500–900 → 500–900€ */
export function formatEuroSuffix(value) {
  if (value == null || value === '') return value;

  let str = String(value);
  if (!str.includes('€')) return str;

  str = str.replace(/€([\d.,]+)([–-])([\d.,]+)/g, '$1$2$3€');
  str = str.replace(/€\s?([\d.,]+(?:k)?)/gi, '$1€');

  return str;
}
