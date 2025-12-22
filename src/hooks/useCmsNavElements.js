import {NavButton} from "../app/hungryscan/NavButton";
import {ADDITIONS, DISHES_CATEGORIES, PERSONALIZATION, TRANSLATIONS} from "../utils/viewsConstants";
import {DocumentIcon} from "../app/icons/DocumentIcon";
import {AdditionsIcon} from "../app/icons/AdditionsIcon";
import {PersonalizationIcon} from "../app/icons/PersonalizationIcon";
import {TranslationsIcon} from "../app/icons/TranslationsIcon";
import React from "react";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {useClearCmsState} from "./useClearCmsState";
import {useSwitchView} from "./useSwitchView";
import {Tooltip} from "../app/hungryscan/cms/Tooltip";

export const useCmsNavElements = ({type}) => {
    const {t} = useTranslation();
    const {currentView} = useSelector(state => state.globalParams.globalParams);
    const clearCmsState = useClearCmsState();
    const handleSwitchView = useSwitchView({clearStateHandler: clearCmsState});

    if (type === 'expanded') {
        return [
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
    } else if (type === 'collapsed') {
        return [
            <div onClick={() => handleSwitchView(DISHES_CATEGORIES)}>
                <Tooltip content={t('dishesCategories')} topOffset={-20}>
                    <DocumentIcon active={currentView === DISHES_CATEGORIES} collapsed={true}/>
                </Tooltip>
            </div>,
            <div onClick={() => handleSwitchView(ADDITIONS)}>
                <Tooltip content={t('additions')} topOffset={-20}>
                    <AdditionsIcon active={currentView === ADDITIONS} collapsed={true}/>
                </Tooltip>
            </div>,
            <div onClick={() => handleSwitchView(PERSONALIZATION)}>
                <Tooltip content={t('personalization')} topOffset={-20}>
                    <PersonalizationIcon active={currentView === PERSONALIZATION} collapsed={true}/>
                </Tooltip>
            </div>,
            <div onClick={() => handleSwitchView(TRANSLATIONS)}>
                <Tooltip content={t('translations')} topOffset={-20}>
                    <TranslationsIcon active={currentView === TRANSLATIONS} collapsed={true}/>
                </Tooltip>
            </div>
        ];
    }
}