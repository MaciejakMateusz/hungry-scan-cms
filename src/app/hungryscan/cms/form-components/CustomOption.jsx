import {components} from "react-select";
import React from "react";
import {UnavailableIcon} from "../../../icons/UnavailableIcon";
import {StarIcon} from "../../../icons/StarIcon";


export const CustomOption = (props) => {
    const {data} = props;
    return (
        <components.Option {...props}>
            <div className={'custom-select-option-wrapper'}>
                <div className={'text-ellipsis'}
                     style={{maxWidth: data.isStandard ? '73%' : '90%'}}>
                    {data.label}
                </div>
                {data.isStandard &&
                    <div className={'menu-standard-indicator-option icon-only'}>
                        <StarIcon removeWrapper={true} stroke={'#8540DD'}/>
                    </div>
                }
                {('available' in data.value && !data.value.available) &&
                    <span className={'unavailable-indicator-option'}>
                        <UnavailableIcon width={'18'} height={'18'}/>
                    </span>
                }
            </div>
        </components.Option>
    );
};