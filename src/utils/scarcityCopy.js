/**
 * Scarcity / seats-left copy for demo CTAs.
 * Edit values in translations/ypodochiContent.js → ypodochiPage.cms + scarcity.
 */
export function formatScarcityNote(t) {
  const cms = t('ypodochiPage.cms') || {};
  const seatsPhrase = [cms.seatsLeft, cms.seatsSuffix]
    .filter((v) => v !== undefined && v !== null && v !== '')
    .join(' ');

  return (t('ypodochiPage.scarcity') || '')
    .replace('{month}', cms.monthLabel ?? '')
    .replace('{capacity}', String(cms.installationsPerMonth ?? ''))
    .replace('{seatsPhrase}', seatsPhrase)
    .replace('{seats}', String(cms.seatsLeft ?? ''));
}
