import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationsEn from './translations/translationsEn.json';
import translationsRu from './translations/translationsRu.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: translationsEn },
    ru: { translation: translationsRu },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
