"use client";

import { createContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const LOCALE_STORAGE_KEY = 'wellfood_locale';
const DEFAULT_LOCALE = 'am';
const SUPPORTED_LOCALES = ['en', 'ru', 'am'];

export const LocaleContext = createContext({
  locale: DEFAULT_LOCALE,
  setLocale: () => {},
  locales: SUPPORTED_LOCALES,
  isInitialized: false,
});

export function LocaleProvider({ children }) {
  const router = useRouter();
  const [locale, setLocaleState] = useState(DEFAULT_LOCALE);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize locale from localStorage or browser
  useEffect(() => {
    try {
      // Check localStorage first
      const savedLocale = localStorage.getItem(LOCALE_STORAGE_KEY);

      if (savedLocale && SUPPORTED_LOCALES.includes(savedLocale)) {
        setLocaleState(savedLocale);
      } else {
        // Fallback to browser language detection
        const browserLang = navigator.language.split('-')[0];
        const detectedLocale = SUPPORTED_LOCALES.includes(browserLang)
          ? browserLang
          : DEFAULT_LOCALE;

        setLocaleState(detectedLocale);
        localStorage.setItem(LOCALE_STORAGE_KEY, detectedLocale);
      }
    } catch (error) {
      console.error('Failed to load locale from localStorage:', error);
      setLocaleState(DEFAULT_LOCALE);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Save locale to localStorage and update state
  const setLocale = useCallback((newLocale) => {
    if (!SUPPORTED_LOCALES.includes(newLocale)) {
      console.warn(`Locale "${newLocale}" is not supported`);
      return;
    }

    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
      setLocaleState(newLocale);

      // Force page refresh to apply new locale
      // This is necessary because next-intl needs to re-initialize with new messages
      window.location.reload();
    } catch (error) {
      console.error('Failed to save locale to localStorage:', error);
    }
  }, []);

  const value = {
    locale,
    setLocale,
    locales: SUPPORTED_LOCALES,
    isInitialized,
  };

  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  );
}
