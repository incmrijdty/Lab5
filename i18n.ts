import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import pl from './locales/pl.json';

void i18n.use(initReactI18next).init({
  compatibilityJSON: 'v4',
  fallbackLng: 'pl',
  lng: 'pl',
  resources: {
    en: { translation: en },
    pl: { translation: pl },
  },
  interpolation: {
    prefix: '{',
    suffix: '}',
    escapeValue: false,
  },
});

export default i18n;
