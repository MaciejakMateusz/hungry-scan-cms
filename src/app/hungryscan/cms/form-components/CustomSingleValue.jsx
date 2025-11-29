import React from "react";
import {components} from "react-select";
import {useTranslation} from "react-i18next";
import {useWindowWidth} from "../../../../hooks/useWindowWidth";
import {StarIcon} from "../../../icons/StarIcon";

export const CustomSingleValue = (props) => {
    const {t} = useTranslation();
    const {data} = props;
    const windowWidth = useWindowWidth();
    const isMobile = windowWidth <= 550;

    const renderStandardLabel = () => {
        if (isMobile) {
            return (
                <div className={'menu-standard-indicator'} style={{padding: '2px 2px'}}>
                    {<StarIcon wrapperStyle={{padding: '0'}} stroke={'#8540DD'}/>}
                </div>
            );
        }
        return (<div className={'menu-standard-indicator'}>{t('main')}</div>);
    }

    return (
        <components.SingleValue {...props}>
            <span className={'text-ellipsis'}>{props.children}</span>
            {data.value.standard && renderStandardLabel()}
        </components.SingleValue>
    );
};