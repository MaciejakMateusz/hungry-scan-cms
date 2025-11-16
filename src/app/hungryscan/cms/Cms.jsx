import React, {useEffect} from "react";
import {useTranslation} from "react-i18next";
import {NavButton} from "../NavButton";
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
import {DocumentIcon} from "../../icons/DocumentIcon";
import {AdditionsIcon} from "../../icons/AdditionsIcon";
import {PersonalizationIcon} from "../../icons/PersonalizationIcon";
import {TranslationsIcon} from "../../icons/TranslationsIcon";
import {Scheduler} from "./menu/scheduler/Scheduler";
import {useSwitchView} from "../../../hooks/useSwitchView";
import {useClearCmsState} from "../../../hooks/useClearCmsState";

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
    const handleSwitchView = useSwitchView({clearStateHandler: clearCmsState});

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

    const navElements = [
        <NavButton key={DISHES_CATEGORIES}
                   isActive={currentView === DISHES_CATEGORIES}
                   name={t('dishesCategories')}
                   icon={<DocumentIcon active={currentView === DISHES_CATEGORIES}/>}
                   onClick={() => handleSwitchView(DISHES_CATEGORIES)}/>,
        <NavButton key={ADDITIONS}
                   isActive={currentView === ADDITIONS}
                   name={t('additions')}
                   icon={<AdditionsIcon active={currentView === ADDITIONS}/>}
                   onClick={() => handleSwitchView(ADDITIONS)}/>,
        <NavButton key={PERSONALIZATION}
                   isActive={currentView === PERSONALIZATION}
                   name={t('personalization')}
                   icon={<PersonalizationIcon active={currentView === PERSONALIZATION}/>}
                   onClick={() => handleSwitchView(PERSONALIZATION)}/>,
        <NavButton key={TRANSLATIONS}
                   isActive={currentView === TRANSLATIONS}
                   name={t('translations')}
                   icon={<TranslationsIcon active={currentView === TRANSLATIONS}/>}
                   onClick={() => handleSwitchView(TRANSLATIONS)}/>
    ];

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
            <NavPanel children={navElements} clearStateHandler={clearCmsState}/>
            <div className={'cms-main'}>
                <CmsTopper/>
                {renderMainView()}
            </div>
        </>
    );
}