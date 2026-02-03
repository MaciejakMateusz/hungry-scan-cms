import {useTranslation} from "react-i18next";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    setMenuItemCategorySwitched,
    setSwitchCategoryDialogActive,
    setSwitchingError,
    switchMenuItemCategory
} from "../../../../slices/dishesCategoriesSlice";
import {CustomSelect} from "../form-components/CustomSelect";
import makeAnimated from "react-select/animated";
import {LoadingSpinner} from "../../../icons/LoadingSpinner";
import {useConfirmationMessage} from "../../../../hooks/useConfirmationMessage";
import {fetchActiveMenu} from "../../../../slices/cmsSlice";
import {FormErrorDialog} from "../../../error/FormErrorDialog";
import {CustomNoOptionsMessage} from "../form-components/CustomNoOptionsMessage";
import {BorderedButton} from "../../common/BorderedButton";

export const SwitchCategoryDialog = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {restaurant} = useSelector(state => state.dashboard.view);
    const restaurantLanguage = restaurant?.value.settings.language.toLowerCase();
    const {menu} = useSelector(state => state.cms.fetchActiveMenu);
    const {category: currentCategory, menuItemForAction} =
        useSelector(state => state.dishesCategories.view);
    const {isLoading, switchingError} = useSelector(state => state.dishesCategories.switchCategory);
    const [categories, setCategories] = useState([]);
    const [chosenCategory, setChosenCategory] = useState(null);
    const confirmMenuItemCategorySwitched = useConfirmationMessage(setMenuItemCategorySwitched);
    const animatedComponents = makeAnimated();

    useEffect(() => {
        if (menu?.categories) {
            setCategories(menu.categories
                .filter(category => category.id !== currentCategory.id)
                .map(category => ({
                    value: category,
                    label: category?.name[restaurantLanguage],
                })));
        }
    }, [currentCategory, menu, restaurantLanguage]);

    const handleDiscard = () => {
        dispatch(setSwitchCategoryDialogActive(false));
        dispatch(setSwitchingError(null));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const resultAction = await dispatch(switchMenuItemCategory({
            menuItemId: menuItemForAction.id,
            newCategoryId: chosenCategory.value.id
        }));
        if (switchMenuItemCategory.fulfilled.match(resultAction)) {
            dispatch(fetchActiveMenu());
            dispatch(setSwitchCategoryDialogActive(false));
            dispatch(setSwitchingError(null));
            confirmMenuItemCategorySwitched();
        } else {
            dispatch(setSwitchingError(resultAction?.payload));
        }
    }

    return (
        <>
            <FormErrorDialog errorData={switchingError} setErrorData={setSwitchingError}/>
            <div className={'overlay'}>
                <div className={'decision-dialog'}>
                    <div className={'decision-dialog-content'}>
                        <CustomSelect id={'categories'}
                                      name={'categories'}
                                      labelName={t('movePositionToCategory')}
                                      value={chosenCategory}
                                      onChange={(selected) => dispatch(setChosenCategory(selected))}
                                      placeholder={t('choose')}
                                      options={categories}
                                      isSearchable={categories?.length > 8}
                                      components={{...animatedComponents, NoOptionsMessage: CustomNoOptionsMessage}}
                                      closeMenuOnSelect={true}
                        />
                    </div>
                    <div className={'decision-dialog-footer'}>
                        <BorderedButton onClick={handleDiscard}
                                        text={t('cancel')}
                                        isBordered={true}/>
                        <form onSubmit={handleSubmit} style={{all: 'unset'}}>
                            <button type="submit" className={'general-button'}>
                                {isLoading ? <LoadingSpinner buttonMode={true}/> : t('save')}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}