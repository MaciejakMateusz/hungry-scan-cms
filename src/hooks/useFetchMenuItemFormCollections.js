import {useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchIngredients, setIngredients} from "../slices/dishAdditionsSlice";
import {getAllergens, getBanners, getLabels, setAllergens, setBanners, setLabels} from "../slices/dishFormSlice";
import {useGetTranslation} from "./useGetTranslation";

export const useFetchMenuItemFormCollections = () => {
    const dispatch = useDispatch();
    const getTranslation = useGetTranslation();
    const {restaurant} = useSelector(state => state.dashboard.view);
    const restaurantLanguage = restaurant?.value.settings.language.toLowerCase();
    
    return useCallback(
        async () => {
            const ingredientsAction = await dispatch(fetchIngredients());
            if (fetchIngredients.fulfilled.match(ingredientsAction)) {
                dispatch(setIngredients(ingredientsAction.payload?.map(ingredient => ({
                    value: ingredient,
                    label: ingredient.name[restaurantLanguage]
                })).sort((a, b) =>
                    getTranslation(a.value.name).localeCompare(getTranslation(b.value.name))
                )));
            }

            const allergensAction = await dispatch(getAllergens());
            if (getAllergens.fulfilled.match(allergensAction)) {
                dispatch(setAllergens(allergensAction.payload?.map(allergen => ({
                    value: allergen,
                    label: getTranslation(allergen.name)
                })).sort((a, b) =>
                    getTranslation(a.value.name).localeCompare(getTranslation(b.value.name))
                )));
            }

            const labelsAction = await dispatch(getLabels());
            if (getLabels.fulfilled.match(labelsAction)) {
                dispatch(setLabels(labelsAction.payload?.map(label => ({
                    value: label,
                    label: getTranslation(label.name)
                })).sort((a, b) =>
                    getTranslation(a.value.name).localeCompare(getTranslation(b.value.name))
                )));
            }

            const bannersAction = await dispatch(getBanners());
            if (getBanners.fulfilled.match(bannersAction)) {
                dispatch(setBanners(bannersAction.payload?.map(banner => ({
                    value: banner,
                    label: getTranslation(banner.name)
                })).sort((a, b) =>
                    getTranslation(a.value.name).localeCompare(getTranslation(b.value.name))
                )));
            }

        }, [dispatch, getTranslation, restaurantLanguage]
    );
}