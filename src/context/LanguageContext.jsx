import { createContext, useContext, useState, useCallback } from 'react';
import translations from '../i18n/translations';
import dataTranslations from '../i18n/dataTranslations';

const LanguageContext = createContext();

const LANG_KEY = 'feedshop_lang';

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    return localStorage.getItem(LANG_KEY) || 'en';
  });

  const setLang = useCallback((newLang) => {
    setLangState(newLang);
    localStorage.setItem(LANG_KEY, newLang);
  }, []);

  const t = translations[lang] || translations.en;

  // td: translate data — looks up DB/data values; returns original if not found or lang is 'en'
  const td = useCallback((text) => {
    if (!text || lang === 'en') return text;
    const dict = dataTranslations[lang];
    return dict?.[text] || text;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, td }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
