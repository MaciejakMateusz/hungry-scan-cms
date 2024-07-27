import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {AccordionIcon} from "../icons/AccordionIcon";
import {NavButton} from "./NavButton";
import {DishesCategories} from "./dishes-categories/DishesCategories";
import {Variants} from "./variants/Variants";
import {Additions} from "./additions/Additions";
import {QrCode} from "./qr-code/QrCode";
import {Translations} from "./translations/Translations";
import {AdPopUps} from "./ad-pop-ups/AdPopUps";
import {Interface} from "./interface/Interface";
import {getDecodedJwt} from "../../utils";
import {Navigate} from "react-router-dom";
import LanguageSwitcher from "../../locales/LanguageSwitcher";
import {useDispatch, useSelector} from "react-redux";
import {DecisionDialog} from "./dialog-windows/DecisionDialog";
import {clearForm as clearDishForm} from "../../slices/dishFormSlice";
import {clearForm as clearCategoryForm} from "../../slices/categoryFormSlice";
import {clearView} from "../../slices/dishesCategoriesSlice";

export const CmsNavigation = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const [activeView, setActiveView] = useState("variants")
    const [redirect, setRedirect] = useState(false);
    const {
        newCategoryFormActive,
        editCategoryFormActive,
        newDishFormActive,
        editDishFormActive
    } = useSelector(state => state.dishesCategories.view);
    const [switchViewDialog, setSwitchViewDialog] = useState(null);
    const [isInEditMode, setIsInEditMode] = useState(false);

    useEffect(() => {
        let jwtCookie = getDecodedJwt();
        if ('' === jwtCookie) {
            setRedirect(true);
        }
    }, []);

    useEffect(() => {
        setIsInEditMode(newCategoryFormActive || editCategoryFormActive || newDishFormActive || editDishFormActive);
    }, [editCategoryFormActive, editDishFormActive, newCategoryFormActive, newDishFormActive]);

    const clearAppState = () => {
        dispatch(clearDishForm());
        dispatch(clearCategoryForm());
        dispatch(clearView());
    }

    const switchView = (viewName) => {
        if (isInEditMode) {
            setSwitchViewDialog(viewName)
        } else {
            clearAppState();
            setActiveView(viewName);
        }
    }

    const renderMainView = () => {
        switch (activeView) {
            case 'dishesCategories':
                return <DishesCategories/>;
            case 'variants':
                return <Variants/>;
            case 'additions':
                return <Additions/>;
            case 'qrCode':
                return <QrCode/>;
            case 'translations':
                return <Translations/>;
            case 'adPopUps':
                return <AdPopUps/>;
            case 'interface':
                return <Interface/>;
            default:
                return <DishesCategories/>;
        }
    };

    if (redirect) {
        return <Navigate to="/login"/>;
    }

    return (
        <>
            {switchViewDialog ?
                <DecisionDialog
                    msg={t('confirmViewSwitch')}
                    onCancel={() => setSwitchViewDialog(null)}
                    onSubmit={() => {
                        setSwitchViewDialog(null);
                        clearAppState();
                        setActiveView(switchViewDialog);
                    }}/> : <></>
            }
            <div className={'cms-nav-panel'}>
                <div className={'cms-nav-header'}>
                    <button className={'cms-accordion-button'}>
                        <AccordionIcon/>
                    </button>
                </div>
                <div className={'cms-nav-menu'}>
                    <ul className={'cms-nav-ul'}>
                        <NavButton isActive={activeView === 'dishesCategories'}
                                   name={t('dishesCategories')}
                                   onClick={() => switchView("dishesCategories")}/>
                        <NavButton isActive={activeView === 'variants'}
                                   name={t('variants')}
                                   onClick={() => switchView("variants")}/>
                        <NavButton isActive={activeView === 'additions'}
                                   name={t('additions')}
                                   onClick={() => switchView("additions")}/>
                        <NavButton isActive={activeView === 'qrCode'}
                                   name={t('qrCode')}
                                   onClick={() => switchView("qrCode")}/>
                        <NavButton isActive={activeView === 'translations'}
                                   name={t('translations')}
                                   onClick={() => switchView("translations")}/>
                        <NavButton isActive={activeView === 'adPopUps'}
                                   name={t('adPopUps')}
                                   onClick={() => switchView("adPopUps")}/>
                        <NavButton isActive={activeView === 'interface'}
                                   name={t('interface')}
                                   onClick={() => switchView("interface")}/>
                        <LanguageSwitcher/>

                    </ul>
                </div>
                <div className={'cms-nav-footer'}>
                    <span>Powered by HackyBear<sup>&copy;</sup></span>
                </div>
            </div>
            <div className={'cms-main'}>
                {renderMainView()}
            </div>
        </>
    );
}