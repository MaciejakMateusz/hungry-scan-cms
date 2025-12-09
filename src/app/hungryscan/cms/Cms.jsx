import React, {useEffect} from "react";
import {useTranslation} from "react-i18next";
import {DishesCategories} from "./dishes-categories/DishesCategories";
import {Additions} from "./additions/Additions";
import {Translations} from "./translations/Translations";
import {Personalization} from "./personalization/Personalization";
import {useDispatch, useSelector} from "react-redux";
import {DecisionDialog} from "./dialog-windows/DecisionDialog";
import {setCurrentView, setIsInEditMode, setNextViewName} from "../../../slices/globalParamsSlice"
import {ADDITIONS, DISHES_CATEGORIES, PERSONALIZATION, TRANSLATIONS, USER_PROFILE} from "../../../utils/viewsConstants";
import {CmsTopper} from "./topper/CmsTopper";
import {fetchActiveMenu, setSchedulerActive} from "../../../slices/cmsSlice";
import {NavPanel} from "../NavPanel";
import {UserProfile} from "../dashboard/user/UserProfile";
import {Scheduler} from "./menu/scheduler/Scheduler";
import {useClearCmsState} from "../../../hooks/useClearCmsState";
import {useCmsNavElements} from "../../../hooks/useCmsNavElements";

export const Cms = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {
        currentView,
        isInEditMode,
        nextViewName
    } = useSelector(state => state.globalParams.globalParams);
    const {
        newCategoryFormActive,
        editCategoryFormActive,
        reorderCategoriesDialogActive,
        newDishFormActive,
        editDishFormActive
    } = useSelector(state => state.dishesCategories.view);
    const {schedulerActive} = useSelector(state => state.cms.view);
    const {categoryForAction, menuItemForAction} = useSelector(state => state.dishesCategories.view);
    const clearCmsState = useClearCmsState();
    const expandedNavElements = useCmsNavElements({type: 'expanded'});
    const collapsedNavElements = useCmsNavElements({type: 'collapsed'});

    useEffect(() => {
        if (schedulerActive) {
            dispatch(setIsInEditMode(true));
            return;
        }
        dispatch(setIsInEditMode(
            newCategoryFormActive ||
            editCategoryFormActive ||
            newDishFormActive ||
            editDishFormActive));
    }, [
        dispatch,
        schedulerActive,
        newCategoryFormActive,
        editCategoryFormActive,
        newDishFormActive,
        editDishFormActive,
        reorderCategoriesDialogActive,
        currentView]);

    useEffect(() => {
        if (!isInEditMode || !categoryForAction || !menuItemForAction || !reorderCategoriesDialogActive) {
            dispatch(fetchActiveMenu());
        }
    }, [dispatch, isInEditMode, categoryForAction, menuItemForAction, reorderCategoriesDialogActive]);

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

    return (
        <>
            {nextViewName &&
                <DecisionDialog
                    msg={t('confirmViewSwitch')}
                    onCancel={() => dispatch(setNextViewName(null))}
                    onSubmit={() => {
                        clearCmsState();
                        dispatch(setSchedulerActive(false));
                        dispatch(setCurrentView(nextViewName));
                        dispatch(setIsInEditMode(false));
                        dispatch(setNextViewName(null));
                    }}
                />
            }
            <NavPanel children={expandedNavElements}
                      clearStateHandler={clearCmsState}
                      childrenCollapsed={collapsedNavElements}/>
            <div className={'cms-main'}>
                <CmsTopper children={expandedNavElements}
                           clearStateHandler={clearCmsState}/>
                {renderMainView()}
            </div>
        </>
    );
}