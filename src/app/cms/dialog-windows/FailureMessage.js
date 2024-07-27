import React from 'react';

export const FailureMessage = ({ text }) => {
    return (
        <div className={'warning-dialog'}>
            {text}
        </div>
    );
};

