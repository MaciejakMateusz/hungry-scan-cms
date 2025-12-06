import React from "react";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {IndexedText, Switcher, SwitcherPill, SwitcherPillInactive} from "./AppModeSwitcherCollapsed.style";

export const AppModeSwitcherCollapsed = () => {
    const {t} = useTranslation();
    const {cmsActive} = useSelector(state => state.globalParams.globalParams);

    return (
        <Switcher>
            {cmsActive &&
                <SwitcherPillInactive $cmsActive={cmsActive}>
                    <IndexedText>{t('dashboard')?.[0]}</IndexedText>
                </SwitcherPillInactive>
            }
            <SwitcherPill $cmsActive={cmsActive}>
                <IndexedText>{cmsActive ? 'C' : t('dashboard')?.[0]}</IndexedText>
            </SwitcherPill>
            {!cmsActive &&
                <SwitcherPillInactive $cmsActive={cmsActive}>
                    <IndexedText>C</IndexedText>
                </SwitcherPillInactive>
            }
        </Switcher>
    );
}