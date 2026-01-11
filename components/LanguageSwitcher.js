"use client";

import { useState } from 'react';
import { useLocale } from '@/hooks/useLocale';

const LANGUAGE_NAMES = {
  en: 'English',
  ru: 'Русский',
  am: 'Հայերեն',
};

const LANGUAGE_FLAGS = {
  en: '🇬🇧',
  ru: '🇷🇺',
  am: '🇦🇲',
};

export default function LanguageSwitcher() {
  const { locale, setLocale, locales } = useLocale();
  const [isOpen, setIsOpen] = useState(false);

  const handleLocaleChange = (newLocale) => {
    setLocale(newLocale);
    setIsOpen(false);
  };

  return (
    <div className="language-switcher" style={{ position: 'relative', marginLeft: '15px' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="language-switcher-button"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 12px',
          backgroundColor: 'transparent',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '4px',
          color: 'inherit',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '500',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
      >
        <span style={{ fontSize: '18px' }}>{LANGUAGE_FLAGS[locale]}</span>
        <span>{locale.toUpperCase()}</span>
        <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'}`} style={{ fontSize: '10px' }} />
      </button>

      {isOpen && (
        <>
          <div
            className="language-switcher-backdrop"
            onClick={() => setIsOpen(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 998,
            }}
          />
          <div
            className="language-switcher-dropdown"
            style={{
              position: 'absolute',
              top: 'calc(100% + 8px)',
              right: 0,
              minWidth: '160px',
              backgroundColor: '#1a1a1a',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '4px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
              zIndex: 999,
              overflow: 'hidden',
            }}
          >
            {locales.map((loc) => (
              <button
                key={loc}
                onClick={() => handleLocaleChange(loc)}
                className="language-option"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  width: '100%',
                  padding: '12px 16px',
                  backgroundColor: locale === loc ? 'rgba(255, 185, 54, 0.1)' : 'transparent',
                  border: 'none',
                  color: locale === loc ? '#ffb936' : 'white',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: locale === loc ? '600' : '400',
                  textAlign: 'left',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  if (locale !== loc) {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (locale !== loc) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <span style={{ fontSize: '20px' }}>{LANGUAGE_FLAGS[loc]}</span>
                <span>{LANGUAGE_NAMES[loc]}</span>
                {locale === loc && (
                  <i className="fas fa-check" style={{ marginLeft: 'auto', fontSize: '12px' }} />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
