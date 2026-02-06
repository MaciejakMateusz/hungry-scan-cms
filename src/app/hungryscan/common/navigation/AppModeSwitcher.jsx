import React from "react";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {IndexedText, Switcher, SwitcherPill, SwitcherPillInactive} from "./AppModeSwitcher.style";

export const AppModeSwitcher = () => {
    const {t} = useTranslation();
    const {cmsActive} = useSelector(state => state.globalParams.globalParams);

    return (
        <Switcher>
            {cmsActive &&
                <SwitcherPillInactive $cmsActive={cmsActive}>
                    <IndexedText>{t('dashboard')}</IndexedText>
                </SwitcherPillInactive>
            }
            <SwitcherPill $cmsActive={cmsActive}>
                <IndexedText>{cmsActive ? t('menu') : t('dashboard')}</IndexedText>
            </SwitcherPill>
            {!cmsActive &&
                <SwitcherPillInactive $cmsActive={cmsActive}>
                    <IndexedText>{t('menu')}</IndexedText>
                </SwitcherPillInactive>
            }
        </Switcher>
    );
}