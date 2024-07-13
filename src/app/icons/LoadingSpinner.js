import React from 'react';

export const LoadingSpinner = (props) => {

    return (
        <div className={props.buttonMode ? 'button-spinner-container' : 'spinner-container'}>
            <div className={props.buttonMode ? 'button-spinner' : 'spinner'}/>
        </div>
    );
};