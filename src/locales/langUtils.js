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
    if (lang === 'en' && obj.translationEn) {
        return obj.translationEn;
    }
    if (obj.defaultTranslation) {
        return obj.defaultTranslation;
    }

    return '';
};

export const getLanguage = () => {
    const lngCookie = getCookie('lng');
    return lngCookie ? lngCookie : i18n.language;
}