import React from 'react';

export const LoadingSpinner = ({buttonMode, customStyle}) => {

    return (
        <div className={buttonMode ? 'button-spinner-container' : 'spinner-container'}>
            <div className={buttonMode ? 'loader-button' : 'loader'} style={customStyle ? customStyle : {}}/>
        </div>
    );
};