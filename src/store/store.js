import {combineReducers, configureStore} from "@reduxjs/toolkit";
import loginReducer from "../slices/loginFormSlice";
import dishesCategoriesReducer from "../slices/dishesCategoriesSlice"
import categoryFormReducer from "../slices/categoryFormSlice";

const rootReducer = combineReducers({
    login: loginReducer,
    dishesCategories: dishesCategoriesReducer,
    categoryForm: categoryFormReducer
})

export const store = configureStore({
    reducer: rootReducer
});