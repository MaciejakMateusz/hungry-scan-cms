import React, { useRef, useState, useEffect } from "react";
import { fetchMenuColors } from "../../../../slices/menuSlice";
import { useDispatch, useSelector } from "react-redux";
import {useOutsideClick} from "../../../../hooks/useOutsideClick";

export const MenuColorSelect = ({ currentColor, handleColorChange, menuId }) => {
    const dispatch = useDispatch();
    const [expanded, setExpanded] = useState(false);
    const { menuColors } = useSelector(state => state.menu.fetchMenuColors);
    const wrapperRef = useRef(null);

    useEffect(() => {
        dispatch(fetchMenuColors());
    }, [dispatch]);

    useOutsideClick(wrapperRef, () => setExpanded(false), expanded);

    const renderColorsSelect = () => {
        if (!expanded) return;
        const topRow = menuColors.filter(color => color.id <= 5);
        const bottomRow = menuColors.filter(color => color.id > 5);
        return (
            <div className={'menu-colors-pallet'}>
                <div className={'flex-wrapper'}>
                    {topRow?.map((color) => mapRow(color))}
                </div>
                <div className={'flex-wrapper'}>
                    {bottomRow?.map((color) => mapRow(color))}
                </div>
            </div>
        );
    }

    const mapRow = (color) => {
        return (
            <div key={color.id}
                 className={'menu-color-element'}
                 style={{ backgroundColor: color.hex }}
                 onClick={(e) => {
                     handleColorChange(color, menuId);
                     e.stopPropagation();
                     setExpanded(false);
                 }} />
        );
    }

    return (
        <div className={'form-field color'}
             ref={wrapperRef}
             id={'menu-color'}
             style={{ background: currentColor.hex }}
             onClick={() => {
                 setExpanded(!expanded);
             }}>
            {renderColorsSelect()}
        </div>
    );
}
