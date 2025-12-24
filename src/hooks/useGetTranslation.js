import {useSelector} from "react-redux";
import {getLanguage} from "../locales/langUtils";

export const useGetTranslation = () => {
    const {restaurant} = useSelector(state => state.dashboard.view);

    return obj => {
        if (typeof obj === 'string') {
            return obj;
        }

        if (!obj) {
            return '';
        }

        const restaurantData = restaurant?.value;
        const language = restaurantData?.settings.language.toLowerCase();
        const lang = getLanguage();

        switch (lang) {
            case 'pl':
                return obj.pl ? obj.pl : obj[language];
            case 'pl-PL':
                return obj.pl ? obj.pl : obj[language];
            case 'en':
                return obj.en ? obj.en : obj[language];
            case 'fr':
                return obj.fr ? obj.fr : obj[language];
            case 'de':
                return obj.de ? obj.de : obj[language];
            case 'es':
                return obj.es ? obj.es : obj[language];
            case 'uk':
                return obj.uk ? obj.uk : obj[language];
            default:
                return '';
        }
    };
}