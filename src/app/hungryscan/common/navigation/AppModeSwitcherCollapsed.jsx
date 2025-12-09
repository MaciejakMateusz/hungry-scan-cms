import React from "react";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {IndexedText, Switcher, SwitcherPill, SwitcherPillInactive} from "./AppModeSwitcherCollapsed.style";
import {Tooltip} from "../../cms/Tooltip";

export const AppModeSwitcherCollapsed = () => {
    const {t} = useTranslation();
    const {cmsActive} = useSelector(state => state.globalParams.globalParams);

    return (
        <Switcher>
            {cmsActive &&
                <Tooltip content={t('dashboard')} topOffset={-20}>
                    <SwitcherPillInactive $cmsActive={cmsActive}>
                        <IndexedText>{t('dashboard')?.[0]}</IndexedText>
                    </SwitcherPillInactive>
                </Tooltip>
            }
            <Tooltip content={cmsActive ? 'CMS' : t('dashboard')} topOffset={-20}>
                <SwitcherPill $cmsActive={cmsActive}>
                    <IndexedText>{cmsActive ? 'C' : t('dashboard')?.[0]}</IndexedText>
                </SwitcherPill>
            </Tooltip>
            {!cmsActive &&
                <Tooltip content={'CMS'} topOffset={-20}>
                    <SwitcherPillInactive $cmsActive={cmsActive}>
                        <IndexedText>C</IndexedText>
                    </SwitcherPillInactive>
                </Tooltip>
            }
        </Switcher>
    );
}