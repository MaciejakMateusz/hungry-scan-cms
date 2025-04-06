import React from 'react';
import {components} from 'react-select';

export const CustomMenuList = (props) => {
    const {
        children,
        selectProps: {onAdd, buttonText}
    } = props;

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
        }}>
            <div style={{flexGrow: 1, overflowY: 'auto',}}>
                <components.MenuList {...props}>
                    {children}
                </components.MenuList>
            </div>
            <div style={{
                padding: '10px',
                textAlign: 'center',
                borderTop: '1px solid #eee',
                cursor: 'pointer',
                color: '#fff',
                backgroundColor: '#9746FF',
                fontWeight: 500,
                borderBottomLeftRadius: '20px',
                borderBottomRightRadius: '20px',
            }}
                 onClick={onAdd}>
                + {buttonText}
            </div>
        </div>
    );
};