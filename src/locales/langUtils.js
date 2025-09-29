import i18n from "i18next";
import {getCookie} from "../utils/utils";

export const getTranslation = (obj) => {
    if (typeof obj === 'string') {
        return obj;
    }

    if (!obj) {
        return '';
    }

    const lang = getLanguage();
    switch (lang) {
        case 'pl': return obj.pl;
        case 'pl-PL': return obj.pl;
        case 'en': return obj.en ? obj.en : obj.pl;
        case 'fr': return obj.fr ? obj.fr : obj.pl;
        case 'de': return obj.de ? obj.de : obj.pl;
        case 'es': return obj.es ? obj.es : obj.pl;
        case 'uk': return obj.uk ? obj.uk : obj.pl;
        default: return '';
    }
};

export const getLanguage = () => {
    const lngCookie = getCookie('lng');
    return lngCookie ? lngCookie : i18n.language;
}

export const updateTranslatable = (translatable, translation) => {
    const currentLanguage = getLanguage();
    const languageKey = currentLanguage === 'pl-PL' ? 'pl' : currentLanguage;
    const defaultLanguageIsNull = translatable[process.env.REACT_APP_DEFAULT_LANGUAGE] === null;
    if (defaultLanguageIsNull) {
        return {
            ...translatable,
            [process.env.REACT_APP_DEFAULT_LANGUAGE]: translation,
            [languageKey]: translation
        }
    }
    return {...translatable, [languageKey]: translation};
}

export const createTranslatable = translation => {
    const currentLanguage = getLanguage();
    const languageKey = currentLanguage === 'pl-PL' ? 'pl' : currentLanguage;
    return {
        id: null,
        [process.env.REACT_APP_DEFAULT_LANGUAGE]: translation,
        [languageKey]: translation
    };
}