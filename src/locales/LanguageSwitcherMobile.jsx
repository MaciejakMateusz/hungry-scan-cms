import React from "react";
import {ReactSVG} from "react-svg";
import {useState} from "react";
import {useTranslation} from "react-i18next";
import {getLanguage} from "./langUtils";
import {supportedLanguages} from "../i18n";

export const LanguageSwitcherMobile = () => {
    const {i18n} = useTranslation();
    const activeLng = getLanguage() || 'pl-PL';
    const supported = Object.keys(supportedLanguages).map(languageKey => languageKey.toUpperCase());
    const [isDropped, setIsDropped] = useState(false);

    const formatToUppercase = language => {
        return language === 'pl-PL' ? 'PL' : language.toUpperCase();
    }

    const handleLanguageChange = language => {
        i18n.changeLanguage(language.toLowerCase());
        document.cookie = `i18next=${language.toLowerCase()}; path=/`;
        setIsDropped(false);
    }

    return (
        <div className={'lang-switcher-mobile-container non-selectable'}>
            <div className={'lang-switcher-mobile'} onClick={() => setIsDropped(!isDropped)}>
                <span className={'lang-switcher-mobile-wrapper'}>
                    <span className={'lng-mobile-display'}>{formatToUppercase(activeLng)}</span>
                    <ReactSVG src={`${process.env.PUBLIC_URL}/theme/icons/drop-icon.svg`}
                              className={`drop-icon ${isDropped && 'dropped'}`}/>
                </span>
                {isDropped && supported.filter(l => l !== formatToUppercase(activeLng)).map(l => (
                    <div className={'lng-mobile'}
                         onClick={(e) => {
                             e.stopPropagation();
                             handleLanguageChange(l);
                         }}
                         key={l}>
                        {l}
                    </div>
                ))}
            </div>
        </div>
    );
}