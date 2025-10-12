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
import qrCodesReducer from "../slices/qrCodesSlice";
import registerReducer from "../slices/registerFormSlice";
import recoveryReducer from "../slices/recoveryFormSlice";
import createRestaurantReducer from "../slices/restaurantSlice";
import reactivateReducer from "../slices/reactivateFormSlice";
import globalParamsReducer from "../slices/globalParamsSlice";
import statisticsReducer from "../slices/statisticsSlice";
import dashboardReducer from "../slices/dashboardSlice";
import cmsReducer from "../slices/cmsSlice";
import menuReducer from "../slices/menuSlice";
import personalizationReducer from "../slices/personalizationSlice";
import userProfileReducer from "../slices/userProfileSlice";
import usersReducer from "../slices/usersSlice";

const rootReducer = combineReducers({
    login: loginReducer,
    register: registerReducer,
    recovery: recoveryReducer,
    userProfile: userProfileReducer,
    dishesCategories: dishesCategoriesReducer,
    categoryForm: categoryFormReducer,
    dishForm: dishFormReducer,
    dishAdditions: dishAdditionsReducer,
    variants: variantsReducer,
    additions: additionsReducer,
    objRemoval: objectRemovalReducer,
    filtering: filteringReducer,
    translations: translationsReducer,
    qrCodes: qrCodesReducer,
    restaurant: createRestaurantReducer,
    reactivate: reactivateReducer,
    globalParams: globalParamsReducer,
    statistics: statisticsReducer,
    dashboard: dashboardReducer,
    cms: cmsReducer,
    menu: menuReducer,
    personalization: personalizationReducer,
    users: usersReducer
})

export const store = configureStore({
    reducer: rootReducer
});