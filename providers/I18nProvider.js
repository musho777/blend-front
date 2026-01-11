"use client";

import { NextIntlClientProvider } from 'next-intl';
import { useLocale } from '@/hooks/useLocale';
import { useState, useEffect } from 'react';

export default function I18nProvider({ children, initialMessages }) {
  const { locale, isInitialized } = useLocale();
  const [messages, setMessages] = useState(initialMessages);

  useEffect(() => {
    if (isInitialized) {
      // Load messages for the selected locale
      import(`@/messages/${locale}.json`)
        .then((module) => {
          setMessages(module.default);
        })
        .catch((error) => {
          console.error(`Failed to load messages for locale "${locale}":`, error);
        });
    }
  }, [locale, isInitialized]);

  if (!isInitialized) {
    return null; // or a loading state
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone="Asia/Yerevan">
      {children}
    </NextIntlClientProvider>
  );
}
