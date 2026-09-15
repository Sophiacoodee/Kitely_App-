import i18next from 'i18next';
import  { initReactI18next } from 'react-i18next';
import { en, es } from './index';

const resources = {
    en: {
        translation: en,
    },
    es: {
        translation: es,
    },
};

i18next.use(initReactI18next).init({
 debug: true,
 lng: 'en',
 //Lenguuage  to use if translations in user language are not available.
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources,
});

export default i18next;