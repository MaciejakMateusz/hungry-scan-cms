import {combineReducers, configureStore} from "@reduxjs/toolkit";
import loginReducer from "../slices/loginFormSlice";
import dishesCategoriesReducer from "../slices/dishesCategoriesSlice"
import categoryFormReducer from "../slices/categoryFormSlice";
import dishFormReducer from "../slices/dishFormSlice";
import dishAdditionsReducer from "../slices/dishAdditionsSlice";

const rootReducer = combineReducers({
    login: loginReducer,
    dishesCategories: dishesCategoriesReducer,
    categoryForm: categoryFormReducer,
    dishForm: dishFormReducer,
    dishAdditions: dishAdditionsReducer
})

export const store = configureStore({
    reducer: rootReducer
});