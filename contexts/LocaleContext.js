"use client";

import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";
import { useRouter } from "next/navigation";

const LOCALE_STORAGE_KEY = "wellfood_locale";
const DEFAULT_LOCALE = "en";
const SUPPORTED_LOCALES = ["en", "ru", "am"];

export const LocaleContext = createContext({
  locale: DEFAULT_LOCALE,
  setLocale: () => {},
  locales: SUPPORTED_LOCALES,
  isInitialized: false,
});

// Custom hook to use the LocaleContext
export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
}

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
        // For first-time visitors we force the app default locale (English)
        // instead of auto-detecting the browser language. This ensures
        // users see English on their first visit regardless of browser prefs.
        setLocaleState(DEFAULT_LOCALE);
        localStorage.setItem(LOCALE_STORAGE_KEY, DEFAULT_LOCALE);
      }
    } catch (error) {
      console.error("Failed to load locale from localStorage:", error);
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
    } catch (error) {
      console.error("Failed to save locale to localStorage:", error);
    }
  }, []);

  const value = {
    locale,
    setLocale,
    locales: SUPPORTED_LOCALES,
    isInitialized,
  };

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}
