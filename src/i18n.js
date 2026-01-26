import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translation_pl from './locales/pl/translation_pl.json';
import translation_en from './locales/en/translation_en.json';
import translation_de from './locales/de/translation_de.json';
import translation_fr from './locales/fr/translation_fr.json';
import translation_es from './locales/es/translation_es.json';
import translation_uk from './locales/uk/translation_uk.json';

export const supportedLanguages = {
    pl: {translation: translation_pl},
    en: {translation: translation_en},
    de: {translation: translation_de},
    fr: {translation: translation_fr},
    es: {translation: translation_es},
    uk: {translation: translation_uk}
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: supportedLanguages,
        fallbackLng: 'pl',
        supportedLngs: Object.keys(supportedLanguages),
        detection: {
            order: ['cookie', 'localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
            caches: ['cookie', 'localStorage']
        },
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;