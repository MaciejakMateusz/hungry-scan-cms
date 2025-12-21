import {clearForm as clearDishForm} from "../slices/dishFormSlice";
import {useDispatch} from "react-redux";
import {clearForm as clearCategoryForm} from "../slices/categoryFormSlice";
import {clearView as clearDishesCategoriesView} from "../slices/dishesCategoriesSlice";
import {clearView as clearVariantsView} from "../slices/variantsSlice";
import {clearView as clearAdditionsView} from "../slices/additionsSlice";
import {clearView as clearTranslationsView} from "../slices/translationsSlice";
import {clearForm as clearMenuForm} from "../slices/menuSlice";
import {setSchedulerActive} from "../slices/cmsSlice";

export const useClearCmsState = () => {
    const dispatch = useDispatch();
    return () => {
        dispatch(clearDishForm());
        dispatch(clearCategoryForm());
        dispatch(clearDishesCategoriesView());
        dispatch(clearVariantsView());
        dispatch(clearAdditionsView());
        dispatch(clearTranslationsView());
        dispatch(clearMenuForm());
        dispatch(setSchedulerActive(false));
    };
}