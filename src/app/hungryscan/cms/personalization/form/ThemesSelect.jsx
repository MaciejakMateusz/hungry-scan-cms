import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchThemeHexes, setTheme} from "../../../../../slices/personalizationSlice";
import {ReactSVG} from "react-svg";

export const ThemesSelect = () => {
    const dispatch = useDispatch();
    const {themeHexes} = useSelector(state => state.personalization.fetchThemeHexes);
    const {activeMenu} = useSelector(state => state.globalParams.globalParams);
    const {theme} = useSelector(state => state.personalization.form);

    useEffect(() => {
        dispatch(fetchThemeHexes());
        if (!activeMenu) return;
        dispatch(setTheme(activeMenu.value.theme));
    }, [activeMenu, dispatch]);

    const renderThemeOptions = () => {
        return themeHexes?.map(hex => {
            const isSelected = hex === theme;
            return (
                <div key={hex}
                     className={'theme-option'}
                     style={{backgroundColor: hex}}
                     onClick={() => dispatch(setTheme(hex))}>
                    {isSelected && <ReactSVG src={`${process.env.PUBLIC_URL}/theme/icons/check-mark.svg`}/>}
                </div>
            );
            }
        )
    }

    return (
        <div className={'theme-options-container'}>
            {renderThemeOptions()}
        </div>
    );
}
