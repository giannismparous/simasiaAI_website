/** Dial codes for demo phone field — Greece first. */
export const PHONE_COUNTRIES = [
  { code: 'GR', dial: '+30', label: 'Greece' },
  { code: 'CY', dial: '+357', label: 'Cyprus' },
  { code: 'GB', dial: '+44', label: 'United Kingdom' },
  { code: 'DE', dial: '+49', label: 'Germany' },
  { code: 'FR', dial: '+33', label: 'France' },
  { code: 'IT', dial: '+39', label: 'Italy' },
  { code: 'US', dial: '+1', label: 'United States' },
  { code: 'AE', dial: '+971', label: 'UAE' },
  { code: 'AU', dial: '+61', label: 'Australia' },
  { code: 'CA', dial: '+1', label: 'Canada' },
  { code: 'CH', dial: '+41', label: 'Switzerland' },
  { code: 'NL', dial: '+31', label: 'Netherlands' },
  { code: 'BE', dial: '+32', label: 'Belgium' },
  { code: 'AT', dial: '+43', label: 'Austria' },
  { code: 'SE', dial: '+46', label: 'Sweden' },
  { code: 'RO', dial: '+40', label: 'Romania' },
  { code: 'BG', dial: '+359', label: 'Bulgaria' },
  { code: 'TR', dial: '+90', label: 'Turkey' },
  { code: 'IL', dial: '+972', label: 'Israel' },
  { code: 'OTHER', dial: '', label: 'Other' },
];

export function getDialForCountry(code) {
  return PHONE_COUNTRIES.find((c) => c.code === code)?.dial ?? '+30';
}
