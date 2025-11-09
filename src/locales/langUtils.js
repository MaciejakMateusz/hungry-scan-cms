import i18n from "i18next";
import {getCookie} from "../utils/utils";

export const getLanguage = () => {
    const lngCookie = getCookie('lng');
    return lngCookie ? lngCookie : i18n.language;
}

export const updateTranslatable = (translatable, translation, restaurantLanguage) => {
    return {...translatable, [restaurantLanguage]: translation};
}

export const createTranslatable = (translation, restaurantLanguage) => {
    return {id: null, [restaurantLanguage]: translation};
}