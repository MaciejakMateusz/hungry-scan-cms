import React from "react";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {IndexedText, Switcher, SwitcherPill, SwitcherPillInactive} from "./AppModeSwitcherCollapsed.style";
import {Tooltip} from "../../cms/Tooltip";

export const AppModeSwitcherCollapsed = () => {
    const {t} = useTranslation();
    const {cmsActive} = useSelector(state => state.globalParams.globalParams);
    const dashboardFirstLetter = t('dashboard')?.[0];
    const menuFirstLetter = t('menu')?.[0];

    return (
        <Switcher>
            {cmsActive &&
                <Tooltip content={t('dashboard')} topOffset={-20}>
                    <SwitcherPillInactive $cmsActive={cmsActive}>
                        <IndexedText>{dashboardFirstLetter}</IndexedText>
                    </SwitcherPillInactive>
                </Tooltip>
            }
            <Tooltip content={cmsActive ? t('menu') : t('dashboard')} topOffset={-20}>
                <SwitcherPill $cmsActive={cmsActive}>
                    <IndexedText>{cmsActive ? menuFirstLetter : dashboardFirstLetter}</IndexedText>
                </SwitcherPill>
            </Tooltip>
            {!cmsActive &&
                <Tooltip content={t('menu')} topOffset={-20}>
                    <SwitcherPillInactive $cmsActive={cmsActive}>
                        <IndexedText>{menuFirstLetter}</IndexedText>
                    </SwitcherPillInactive>
                </Tooltip>
            }
        </Switcher>
    );
}