import React from 'react';
import {components} from 'react-select';

export const CustomMenuList = (props) => {
    const {
        children,
        selectProps: {onAdd, buttonText, buttonDisabled, selectRef}
    } = props;

    const disabledStyles = {
        backgroundColor: '#FFF',
        cursor: 'not-allowed',
        color: '#707070'
    };

    const performAction = () => {
        if (buttonDisabled) return;
        onAdd();
        if (selectRef && selectRef.current) {
            selectRef.current.blur();
        }
    };

    const handleClick = (e) => {
        e.stopPropagation();
        performAction();
    };

    const handleTouchEnd = (e) => {
        e.preventDefault();
        e.stopPropagation();
        performAction();
    };

    return (
        <div className="custom-menu-list-container">
            <div className="custom-menu-list-children">
                <components.MenuList {...props}>
                    {children}
                </components.MenuList>
            </div>
            <div
                className="custom-menu-list-button"
                style={buttonDisabled ? disabledStyles : {}}
                onClick={handleClick}
                onTouchEnd={handleTouchEnd}>
                {!buttonDisabled && '+'} {buttonText}
            </div>
        </div>
    );
};