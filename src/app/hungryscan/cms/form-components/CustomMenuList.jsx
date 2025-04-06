import React from 'react';
import {components} from 'react-select';
import {useTranslation} from "react-i18next";

export const CustomMenuList = (props) => {
    const {t} = useTranslation();
    const {
        children,
        selectProps: {onAddMenu}
    } = props;

    return (
        <components.MenuList {...props}>
            {children}
            <div style={{
                padding: '10px',
                textAlign: 'center',
                borderTop: '1px solid #eee',
                cursor: 'pointer',
                color: '#fff',
                backgroundColor: '#9746FF',
                borderBottomLeftRadius: '5px',
                borderBottomRightRadius: '5px',
                fontWeight: 500
            }}
                 onClick={onAddMenu}>
                + {t('addMenu')}
            </div>
        </components.MenuList>
    );
};