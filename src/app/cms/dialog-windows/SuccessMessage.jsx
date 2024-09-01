import React from 'react';
import {AvailableIcon} from "../../icons/AvailableIcon";

export const SuccessMessage = ({ text }) => {
    return (
        <div className={'success-msg'}>
            <AvailableIcon width={'21'} height={'21'} fill={'#FFF'}/>
            {text}
        </div>
    );
};

