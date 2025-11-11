import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {NavButton} from "../NavButton";
import {DishesCategories} from "./dishes-categories/DishesCategories";
import {Additions} from "./additions/Additions";
import {Translations} from "./translations/Translations";
import {Personalization} from "./personalization/Personalization";
import {useDispatch, useSelector} from "react-redux";
import {DecisionDialog} from "./dialog-windows/DecisionDialog";
import {clearForm as clearCategoryForm} from "../../../slices/categoryFormSlice";
import {clearView as clearDishesCategoriesView, setIsInEditMode} from "../../../slices/dishesCategoriesSlice";
import {clearView as clearVariantsView} from "../../../slices/variantsSlice";
import {clearView as clearAdditionsView} from "../../../slices/additionsSlice";
import {clearView as clearTranslationsView} from "../../../slices/translationsSlice";
import {clearForm as clearDishForm} from "../../../slices/dishFormSlice";
import {ADDITIONS, DISHES_CATEGORIES, PERSONALIZATION, TRANSLATIONS, USER_PROFILE} from "../../../utils/viewsConstants";
import {setCurrentDialog, setCurrentView} from "../../../slices/globalParamsSlice";
import {CmsTopper} from "./topper/CmsTopper";
import {fetchActiveMenu} from "../../../slices/cmsSlice";
import {NavPanel} from "../NavPanel";
import {UserProfile} from "../dashboard/user/UserProfile";
import {DocumentIcon} from "../../icons/DocumentIcon";
import {AdditionsIcon} from "../../icons/AdditionsIcon";
import {PersonalizationIcon} from "../../icons/PersonalizationIcon";
import {TranslationsIcon} from "../../icons/TranslationsIcon";
import {Scheduler} from "./menu/scheduler/Scheduler";

export const Cms = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {currentView} = useSelector(state => state.globalParams.globalParams);
    const {
        isInEditMode,
        newCategoryFormActive,
        editCategoryFormActive,
        reorderCategoriesDialogActive,
        newDishFormActive,
        editDishFormActive
    } = useSelector(state => state.dishesCategories.view);
    const {schedulerActive} = useSelector(state => state.cms.view);
    const {categoryForAction, menuItemForAction} = useSelector(state => state.dishesCategories.view);
    const [switchViewDialog, setSwitchViewDialog] = useState(null);

    const clearCmsState = () => {
        dispatch(clearDishForm());
        dispatch(clearCategoryForm());
        dispatch(clearDishesCategoriesView());
        dispatch(clearVariantsView());
        dispatch(clearAdditionsView());
        dispatch(clearTranslationsView())
    }

    useEffect(() => {
        dispatch(setIsInEditMode());
    }, [
        dispatch,
        schedulerActive,
        newCategoryFormActive,
        editCategoryFormActive,
        newDishFormActive,
        editDishFormActive,
        reorderCategoriesDialogActive]);

    useEffect(() => {
        if (!isInEditMode || !categoryForAction || !menuItemForAction || !reorderCategoriesDialogActive) {
            dispatch(fetchActiveMenu());
        }
    }, [dispatch, isInEditMode, categoryForAction, menuItemForAction, reorderCategoriesDialogActive]);

    const switchView = (viewName) => {
        if (isInEditMode) {
            setSwitchViewDialog(viewName)
        } else if (viewName !== currentView) {
            clearCmsState();
            dispatch(setCurrentView(viewName));
        }
    }

    const renderMainView = () => {
        if (schedulerActive) return (<Scheduler/>);
        switch (currentView) {
            case USER_PROFILE:
                return (<UserProfile/>);
            case DISHES_CATEGORIES:
                return <DishesCategories/>;
            case ADDITIONS:
                return <Additions/>;
            case TRANSLATIONS:
                return <Translations/>;
            case PERSONALIZATION:
                return <Personalization/>;
            default:
                return <DishesCategories/>;
        }
    };

    const navElements = [
        <NavButton key={DISHES_CATEGORIES}
                   isActive={currentView === DISHES_CATEGORIES}
                   name={t('dishesCategories')}
                   icon={<DocumentIcon active={currentView === DISHES_CATEGORIES}/>}
                   onClick={() => switchView(DISHES_CATEGORIES)}/>,
        <NavButton key={ADDITIONS}
                   isActive={currentView === ADDITIONS}
                   name={t('additions')}
                   icon={<AdditionsIcon active={currentView === ADDITIONS}/>}
                   onClick={() => switchView(ADDITIONS)}/>,
        <NavButton key={PERSONALIZATION}
                   isActive={currentView === PERSONALIZATION}
                   name={t('personalization')}
                   icon={<PersonalizationIcon active={currentView === PERSONALIZATION}/>}
                   onClick={() => switchView(PERSONALIZATION)}/>,
        <NavButton key={TRANSLATIONS}
                   isActive={currentView === TRANSLATIONS}
                   name={t('translations')}
                   icon={<TranslationsIcon active={currentView === TRANSLATIONS}/>}
                   onClick={() => switchView(TRANSLATIONS)}/>
    ];

    return (
        <>
            {switchViewDialog ?
                <DecisionDialog
                    msg={t('confirmViewSwitch')}
                    onCancel={() => setSwitchViewDialog(null)}
                    onSubmit={() => {
                        setSwitchViewDialog(null);
                        clearCmsState();
                        dispatch(setCurrentDialog(switchViewDialog));
                    }}/> : <></>
            }
            <NavPanel children={navElements}/>
            <div className={'cms-main'}>
                <CmsTopper/>
                {renderMainView()}
            </div>
        </>
    );
}