import React from "react";
import {useTranslation} from "react-i18next";
import {setCmsActive, setCurrentView} from "../../../../slices/globalParamsSlice";
import {DISHES_CATEGORIES, STATS} from "../../../../utils/viewsConstants";
import {useDispatch, useSelector} from "react-redux";
import {IndexedText, Switcher, SwitcherPill, SwitcherPillInactive, Wrapper} from "./AppModeSwitcher.style";

export const AppModeSwitcher = ({hasAccessToDashboard}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {cmsActive} = useSelector(state => state.globalParams.globalParams);

    const switchAppMode = () => {
        dispatch(setCmsActive(!cmsActive));
        !cmsActive ?
            dispatch(setCurrentView(DISHES_CATEGORIES)) :
            dispatch(setCurrentView(STATS));
    }

    if (!hasAccessToDashboard) return;

    return (
        <Wrapper>
            <Switcher onClick={() => switchAppMode()}>
                {cmsActive &&
                    <SwitcherPillInactive $cmsActive={cmsActive}>
                        <IndexedText>{t('dashboard')}</IndexedText>
                    </SwitcherPillInactive>
                }
                <SwitcherPill $cmsActive={cmsActive}>
                    <IndexedText>{cmsActive ? 'CMS' : t('dashboard')}</IndexedText>
                </SwitcherPill>
                {!cmsActive &&
                    <SwitcherPillInactive $cmsActive={cmsActive}>
                        <IndexedText>CMS</IndexedText>
                    </SwitcherPillInactive>
                }
            </Switcher>
        </Wrapper>
    );
}