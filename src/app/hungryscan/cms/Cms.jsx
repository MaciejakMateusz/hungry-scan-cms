import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {NavButton} from "../NavButton";
import {DishesCategories} from "./dishes-categories/DishesCategories";
import {Variants} from "./variants/Variants";
import {Additions} from "./additions/Additions";
import {QrCode} from "./qr-code/QrCode";
import {Translations} from "./translations/Translations";
import {AdPopUps} from "./ad-pop-ups/AdPopUps";
import {Interface} from "./interface/Interface";
import {useDispatch, useSelector} from "react-redux";
import {DecisionDialog} from "./dialog-windows/DecisionDialog";
import {clearForm as clearCategoryForm} from "../../../slices/categoryFormSlice";
import {clearView as clearDishesCategoriesView, setIsInEditMode} from "../../../slices/dishesCategoriesSlice";
import {clearView as clearVariantsView} from "../../../slices/variantsSlice";
import {clearView as clearAdditionsView} from "../../../slices/additionsSlice";
import {clearView as clearTranslationsView} from "../../../slices/translationsSlice";
import {clearForm as clearDishForm} from "../../../slices/dishFormSlice";
import {
    AD_POP_UPS,
    ADDITIONS,
    C_CODE_QR,
    DISHES_CATEGORIES,
    INTERFACE,
    STATS,
    TRANSLATIONS,
    VARIANTS
} from "../../../utils/viewsConstants";
import {setCurrentDialog, setCurrentView} from "../../../slices/globalParamsSlice";
import {UserProfileWhiteIcon} from "../../icons/UserProfileWhiteIcon";
import {NotificationIcon} from "../../icons/NotificationIcon";
import {CmsTopper} from "./topper/CmsTopper";
import {fetchActiveMenu} from "../../../slices/cmsSlice";

export const Cms = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {currentView, cmsActive, userForename} = useSelector(state => state.globalParams.globalParams);
    const {
        isInEditMode,
        newCategoryFormActive,
        editCategoryFormActive,
        newDishFormActive,
        editDishFormActive
    } = useSelector(state => state.dishesCategories.view);
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
    }, [dispatch, newCategoryFormActive, editCategoryFormActive, newDishFormActive, editDishFormActive]);

    useEffect(() => {
        if (!isInEditMode || !categoryForAction || !menuItemForAction) dispatch(fetchActiveMenu());
    }, [dispatch, isInEditMode, categoryForAction, menuItemForAction]);

    const switchView = (viewName) => {
        if (isInEditMode) {
            setSwitchViewDialog(viewName)
        } else {
            clearCmsState();
            dispatch(setCurrentView(viewName));
        }
    }

    const renderMainView = () => {
        switch (currentView) {
            case DISHES_CATEGORIES:
                return <DishesCategories/>;
            case VARIANTS:
                return <Variants/>;
            case ADDITIONS:
                return <Additions/>;
            case C_CODE_QR:
                return <QrCode/>;
            case TRANSLATIONS:
                return <Translations/>;
            case AD_POP_UPS:
                return <AdPopUps/>;
            case INTERFACE:
                return <Interface/>;
            default:
                return <DishesCategories/>;
        }
    };

    const switchAppMode = () => {
        cmsActive ? dispatch(setCurrentView(STATS)) : dispatch(setCurrentView(DISHES_CATEGORIES));
    }

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
            <div className={'app-nav-panel'}>
                <div className={'app-nav-header'}>
                    <span
                        className={'profile-name'}>Witaj, {userForename}!</span><UserProfileWhiteIcon/><NotificationIcon/>
                </div>
                <div className={'app-mode-switcher-wrapper'}>
                    <div className={'app-mode-switcher'} onClick={() => switchAppMode()}>
                        <span className={`app-mode-indicator dashboard ${cmsActive ? '' : 'active'}`}>Pulpit</span>
                        <span className={`app-mode-indicator cms ${cmsActive ? 'active' : ''}`}>CMS</span>
                    </div>
                </div>
                <div className={'app-nav-menu'}>
                    <ul className={'app-nav-ul'}>
                        <NavButton isActive={currentView === DISHES_CATEGORIES}
                                   name={t('dishesCategories')}
                                   onClick={() => switchView(DISHES_CATEGORIES)}/>
                        <NavButton isActive={currentView === VARIANTS}
                                   name={t('variants')}
                                   onClick={() => switchView(VARIANTS)}/>
                        <NavButton isActive={currentView === ADDITIONS}
                                   name={t('additions')}
                                   onClick={() => switchView(ADDITIONS)}/>
                        <NavButton isActive={currentView === C_CODE_QR}
                                   name={t('qrCode')}
                                   onClick={() => switchView(C_CODE_QR)}/>
                        <NavButton isActive={currentView === TRANSLATIONS}
                                   name={t('translations')}
                                   onClick={() => switchView(TRANSLATIONS)}/>
                        <NavButton isActive={currentView === AD_POP_UPS}
                                   name={t('adPopUps')}
                                   onClick={() => switchView(AD_POP_UPS)}/>
                        <NavButton isActive={currentView === INTERFACE}
                                   name={t('interface')}
                                   onClick={() => switchView(INTERFACE)}/>
                    </ul>
                </div>
                <div className={'app-nav-footer'}>
                    <span>Powered by HackyBear&copy;</span>
                </div>
            </div>
            <div className={'cms-main'}>
                <CmsTopper/>
                {renderMainView()}
            </div>
        </>
    );
}