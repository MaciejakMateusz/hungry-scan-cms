import {useSelector} from "react-redux";

export const useTranslatableTransformer = ({obj, key}) => {
    const {restaurant} = useSelector(state => state.dashboard.view);

    return value => {
        const restaurantData = restaurant.value;
        const language = restaurantData.settings.language.toLowerCase();
        if (!obj?.[key]) {
            return {id: null, [language]: value};
        }
        return {...obj[key], [language]: value};
    }
}