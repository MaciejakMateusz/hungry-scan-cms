import React from 'react';

export const SuccessMessage = ({ text }) => {
    return (
        <div className={'confirmation-dialog'}>
            {text}
        </div>
    );
};

