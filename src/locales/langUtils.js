import i18n from "i18next";
import {getCookie} from "../utils";

export const getTranslation = (obj) => {
    const lngCookie = getCookie('lng')
    const currentLang = lngCookie ? lngCookie : i18n.language
    if(currentLang === 'en') {
        return obj.translationEn || obj.defaultTranslation
    }
    return obj.defaultTranslation
}