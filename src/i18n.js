import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translation_en from './locales/en/translation_en.json';
import translation_pl from './locales/pl/translation_pl.json';

i18n.use(initReactI18next).init({
    resources: {
        en: {translation: translation_en},
        pl: {translation: translation_pl},
    },
    lng: 'pl',
    fallbackLng: 'pl',
    interpolation: {
        escapeValue: false,
    },
});

 export default i18n;