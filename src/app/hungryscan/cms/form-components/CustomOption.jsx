import {components} from "react-select";
import React from "react";
import {useTranslation} from "react-i18next";
import {UnavailableIcon} from "../../../icons/UnavailableIcon";


export const CustomOption = (props) => {
    const {t} = useTranslation();
    const {data} = props;
    return (
        <components.Option {...props}>
            <div className={'custom-select-option-wrapper'}>
                <div className={'text-ellipsis'}
                     style={{maxWidth: data.isStandard ? '73%' : '90%'}}>
                    {data.label}
                </div>
                {data.isStandard &&
                    <span className={'menu-standard-indicator-option'}>
                        {t('main')}
                    </span>
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