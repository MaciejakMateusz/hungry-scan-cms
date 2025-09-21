import React, {useState} from "react";
import {LocalizationContainer} from "./LocalizationContainer.jsx";
import {WelcomeTextContainer} from "./WelcomeTextContainer";
import {CategoriesNavigation} from "./CategoriesNavigation.jsx";
import {MenuItemsList} from "./MenuItemsList";
import {useSelector} from "react-redux";

export const Menu = () => {
    const {menu} = useSelector(state => state.cms.fetchActiveMenu);
    const categories = menu?.categories;
    const [chosenCategory, setChosenCategory] = useState(categories ? categories[0] : []);

    return (
        <div>
            <LocalizationContainer/>
            <WelcomeTextContainer/>
            <CategoriesNavigation chooseCategory={setChosenCategory} chosenCategory={chosenCategory}/>
            <MenuItemsList chosenCategory={chosenCategory}/>
        </div>
    );
}
