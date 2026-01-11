import { getRequestConfig } from 'next-intl/server';

// Supported locales
export const locales = ['en', 'ru', 'am'];
export const defaultLocale = 'am';

// This is used by next-intl to load the correct messages
export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming locale parameter is valid
  if (!locales.includes(locale)) {
    locale = defaultLocale;
  }

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
    timeZone: 'Asia/Yerevan',
    now: new Date()
  };
});
