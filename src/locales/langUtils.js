import i18n from "i18next";
import {getCookie} from "../utils/utils";

export const getTranslation = (obj) => {
    const currentLang = getLanguage();
    if(currentLang === 'en') {
        return obj.translationEn || obj.defaultTranslation;
    }
    return obj.defaultTranslation;
}

export const getLanguage = () => {
    const lngCookie = getCookie('lng');
    return lngCookie ? lngCookie : i18n.language;
}