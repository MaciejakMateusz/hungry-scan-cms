import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {AccordionIcon} from "../icons/AccordionIcon";
import {NavButton} from "./NavButton";
import {DishesCategories} from "./dishesCategories/DishesCategories";
import {Variants} from "./variants/Variants";
import {Additions} from "./additions/Additions";
import {QrCode} from "./qrCode/QrCode";
import {Translations} from "./translations/Translations";
import {AdPopUps} from "./adPopUps/AdPopUps";
import {Interface} from "./interface/Interface";
import {getDecodedJwt} from "../../utils";
import {Navigate} from "react-router-dom";
import LanguageSwitcher from "../../locales/LanguageSwitcher";

export const CmsNavigation = () => {
    const {t} = useTranslation();
    const [activeButton, setActiveButton] = useState("dishesCategories")
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        let jwtCookie = getDecodedJwt();
        if ('' === jwtCookie) {
            setRedirect(true);
        }
    }, []);

    if (redirect) {
        return <Navigate to="/login"/>;
    }

    const renderMainView = () => {
        switch (activeButton) {
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

    return (
        <>
            <div className="cms-nav-panel">
                <div className="cms-nav-header">
                    <button className="cms-accordion-button">
                        <AccordionIcon/>
                    </button>
                </div>
                <div className="cms-nav-menu">
                    <ul className="cms-nav-ul">
                        <NavButton isActive={activeButton === 'dishesCategories'}
                                   name={t("dishesCategories")}
                                   onClick={() => setActiveButton("dishesCategories")}/>
                        <NavButton isActive={activeButton === 'variants'}
                                   name={t("variants")}
                                   onClick={() => setActiveButton("variants")}/>
                        <NavButton isActive={activeButton === 'additions'}
                                   name={t("additions")}
                                   onClick={() => setActiveButton("additions")}/>
                        <NavButton isActive={activeButton === 'qrCode'}
                                   name={t("qrCode")}
                                   onClick={() => setActiveButton("qrCode")}/>
                        <NavButton isActive={activeButton === 'translations'}
                                   name={t("translations")}
                                   onClick={() => setActiveButton("translations")}/>
                        <NavButton isActive={activeButton === 'adPopUps'}
                                   name={t("adPopUps")}
                                   onClick={() => setActiveButton("adPopUps")}/>
                        <NavButton isActive={activeButton === 'interface'}
                                   name={t("interface")}
                                   onClick={() => setActiveButton("interface")}/>
                        <LanguageSwitcher/>

                    </ul>
                </div>
                <div className="cms-nav-footer">
                    <span>Powered by HackyBear<sup>&copy;</sup></span>
                </div>
            </div>
            <div className="cms-main">
                {renderMainView()}
            </div>
        </>
    );
}