import React from 'react';
import {components} from 'react-select';

export const CustomMenuList = (props) => {
    const {
        children,
        selectProps: {onAdd, buttonText, buttonDisabled, selectRef}
    } = props;
    const disabledStyles = {
        backgroundColor: 'FFF',
        cursor: 'not-allowed',
        color: '#707070'
    }

    const handleClick = () => {
        if (buttonDisabled) return;
        onAdd();
        if (selectRef && selectRef.current) {
            selectRef.current.blur();
        }
    };

    return (
        <div className={'custom-menu-list-container'}>
            <div className={'custom-menu-list-children'}>
                <components.MenuList {...props}>
                    {children}
                </components.MenuList>
            </div>
            <div className={'custom-menu-list-button'}
                 style={buttonDisabled ? disabledStyles : {}}
                 onClick={handleClick}>
                {!buttonDisabled && '+'} {buttonText}
            </div>
        </div>
    );
};