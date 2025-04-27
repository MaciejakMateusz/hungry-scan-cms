import React from 'react';
import {components} from 'react-select';

export const CustomMenuList = (props) => {
    const {
        children,
        selectProps: {onAdd, buttonText, selectRef}
    } = props;

    const handleClick = () => {
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
            <div className={'custom-menu-list-button'} onClick={handleClick}>
                + {buttonText}
            </div>
        </div>
    );
};