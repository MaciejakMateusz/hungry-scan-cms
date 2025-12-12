import React from 'react';
import {CheckIcon} from "../../../icons/CheckIcon";

export const SuccessMessage = ({text, onDismiss}) => {
    return (
        <div className={'success-msg'} onClick={onDismiss}>
            <CheckIcon width={'21'} height={'21'} fill={'#FFF'}/>
            {text}
        </div>
    );
};

