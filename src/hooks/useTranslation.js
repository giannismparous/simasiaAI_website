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

    return value || key; // Return key if translation not found
  }, [language]);

  return { t, language };
};

