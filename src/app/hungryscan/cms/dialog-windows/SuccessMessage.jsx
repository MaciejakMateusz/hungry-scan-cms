import React from 'react';
import {AvailableIcon} from "../../../icons/AvailableIcon";

export const SuccessMessage = ({text, onDismiss}) => {
    return (
        <div className={'success-msg'} onClick={onDismiss}>
            <AvailableIcon width={'21'} height={'21'} fill={'#FFF'}/>
            {text}
        </div>
    );
};

