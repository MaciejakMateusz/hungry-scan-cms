import {combineReducers, configureStore} from "@reduxjs/toolkit";
import loginReducer from "../slices/loginFormSlice";
import dishesCategoriesReducer from "../slices/dishesCategoriesSlice"
import categoryFormReducer from "../slices/categoryFormSlice";
import dishFormReducer from "../slices/dishFormSlice";
import dishAdditionsReducer from "../slices/dishAdditionsSlice";
import variantsReducer from "../slices/variantsSlice";
import additionsReducer from "../slices/additionsSlice";
import objectRemovalReducer from "../slices/objectRemovalSlice";
import filteringReducer from "../slices/filteringSlice";
import translationsReducer from "../slices/translationsSlice";

const rootReducer = combineReducers({
    login: loginReducer,
    dishesCategories: dishesCategoriesReducer,
    categoryForm: categoryFormReducer,
    dishForm: dishFormReducer,
    dishAdditions: dishAdditionsReducer,
    variants: variantsReducer,
    additions: additionsReducer,
    objRemoval: objectRemovalReducer,
    filtering: filteringReducer,
    translations: translationsReducer
})

export const store = configureStore({
    reducer: rootReducer
});