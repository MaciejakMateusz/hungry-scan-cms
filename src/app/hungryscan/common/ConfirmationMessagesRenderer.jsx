import {SuccessMessage} from "../cms/dialog-windows/SuccessMessage";
import React from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {setNewRestaurantCreated, setRestaurantRemoved, setRestaurantUpdated} from "../../../slices/restaurantSlice";
import {
    setMenuDuplicated,
    setMenuRemoved,
    setMenuUpdated,
    setNewMenuCreated,
    setPlansUpdated, setStandardSwitched
} from "../../../slices/menuSlice";
import {setPersonalizationUpdated} from "../../../slices/personalizationSlice";
import {setUserProfileUpdated} from "../../../slices/userProfileSlice";
import {setCategoryCreated, setCategoryUpdated} from "../../../slices/categoryFormSlice";
import {setMenuItemCreated, setMenuItemUpdated} from "../../../slices/dishFormSlice";
import {setAdditionCreated, setAdditionUpdated} from "../../../slices/additionsSlice";
import {setSaveSuccess} from "../../../slices/translationsSlice";
import {setUserCreated, setUserUpdated} from "../../../slices/usersSlice";

export const ConfirmationMessagesRenderer = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {
        newMenuCreated,
        menuDuplicated,
        menuUpdated,
        menuRemoved,
        standardSwitched,
        plansUpdated
    } = useSelector(state => state.menu.form);
    const {
        restaurantRemoved,
        newRestaurantCreated,
        restaurantUpdated} = useSelector(state => state.restaurant.form);
    const {personalizationUpdated} = useSelector(state => state.personalization.form);
    const {userProfileUpdated} = useSelector(state => state.userProfile.form);
    const {categoryCreated, categoryUpdated} = useSelector(state => state.categoryForm.form);
    const {menuItemCreated, menuItemUpdated} = useSelector(state => state.dishForm.form);
    const {additionCreated, additionUpdated} = useSelector(state => state.additions.view);
    const {saveSuccess: translationsSaved} = useSelector(state => state.translations.view);
    const {userCreated, userUpdated} = useSelector(state => state.users.view);

    return (
        <>
            {restaurantRemoved && <SuccessMessage text={t('restaurantRemovalSuccess')}
                                                  onDismiss={() => dispatch(setRestaurantRemoved(false))}/>}
            {newRestaurantCreated && <SuccessMessage text={t('newRestaurantCreated')}
                                                     onDismiss={() => dispatch(setNewRestaurantCreated(false))}/>}
            {restaurantUpdated && <SuccessMessage text={t('restaurantUpdated')}
                                                  onDismiss={() => dispatch(setRestaurantUpdated(false))}/>}
            {menuRemoved && <SuccessMessage text={t('menuRemovalSuccess')}
                                            onDismiss={() => dispatch(setMenuRemoved(false))}/>}
            {newMenuCreated && <SuccessMessage text={t('newMenuCreated')}
                                               onDismiss={() => dispatch(setNewMenuCreated(false))}/>}
            {menuDuplicated && <SuccessMessage text={t('menuDuplicated')}
                                               onDismiss={() => dispatch(setMenuDuplicated(false))}/>}
            {menuUpdated && <SuccessMessage text={t('menuUpdated')}
                                            onDismiss={() => dispatch(setMenuUpdated(false))}/>}
            {plansUpdated && <SuccessMessage text={t('plansUpdated')}
                                             onDismiss={() => dispatch(setPlansUpdated(false))}/>}
            {standardSwitched && <SuccessMessage text={t('standardSwitched')}
                                                 onDismiss={() => dispatch(setStandardSwitched(false))}/>}
            {personalizationUpdated && <SuccessMessage text={t('personalizationUpdated')}
                                                       onDismiss={() => dispatch(setPersonalizationUpdated(false))}/>}
            {userProfileUpdated && <SuccessMessage text={t('userProfileUpdated')}
                                                   onDismiss={() => dispatch(setUserProfileUpdated(false))}/>}
            {categoryUpdated && <SuccessMessage text={t('categoryEdited')}
                                                   onDismiss={() => dispatch(setCategoryUpdated(false))}/>}
            {categoryCreated && <SuccessMessage text={t('categorySaved')}
                                                onDismiss={() => dispatch(setCategoryCreated(false))}/>}
            {menuItemUpdated && <SuccessMessage text={t('dishEdited')}
                                                onDismiss={() => dispatch(setMenuItemUpdated(false))}/>}
            {menuItemCreated && <SuccessMessage text={t('dishEdited')}
                                                onDismiss={() => dispatch(setMenuItemCreated(false))}/>}
            {menuItemCreated && <SuccessMessage text={t('dishEdited')}
                                                onDismiss={() => dispatch(setMenuItemCreated(false))}/>}
            {additionCreated && <SuccessMessage text={t('additionCreated')}
                                                onDismiss={() => dispatch(setAdditionCreated(false))}/>}
            {additionUpdated && <SuccessMessage text={t('additionUpdated')}
                                                onDismiss={() => dispatch(setAdditionUpdated(false))}/>}
            {translationsSaved && <SuccessMessage text={t('saved')}
                                                onDismiss={() => dispatch(setSaveSuccess(false))}/>}
            {userCreated && <SuccessMessage text={t('userSaved')}
                                                  onDismiss={() => dispatch(setUserCreated(false))}/>}
            {userUpdated && <SuccessMessage text={t('userUpdated')}
                                            onDismiss={() => dispatch(setUserUpdated(false))}/>}
        </>
    );
}