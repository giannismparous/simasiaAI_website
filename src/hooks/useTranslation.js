import { useCallback } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations/translations';

export const useTranslation = () => {
  const { language } = useLanguage();

  const t = useCallback((key) => {
    const keys = key.split('.');
    let value = translations[language];

    for (const k of keys) {
      value = value?.[k];
    }

    // Allow empty strings (e.g. optional suffixes); only fall back when missing
    if (value === undefined || value === null) return key;
    return value;
  }, [language]);

  return { t, language };
};

