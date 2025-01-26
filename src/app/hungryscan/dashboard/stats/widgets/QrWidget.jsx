import React from "react";
import {qrName, qrPath} from "../../../../../apiData";
import {useTranslation} from "react-i18next";
import {DownloadIcon} from "../../../../icons/DownloadIcon";
import {TrendingUpIcon} from "../../../../icons/TrendingUpIcon";

export const QrWidget = () => {
    const {t} = useTranslation();
    return (
        <div className={'statistic-widget qr-code'}>
            <div className={'widget-container qr-code'}>
                <div className={'qr-code-download-area'}>
                    <div className={'qr-img-container'}>
                        <img className={'qr-img'} src={qrPath + qrName} alt={'qr-code'}/>
                    </div>
                    <div className={'qr-img-download-btn'}>{t('download')}<DownloadIcon/></div>
                </div>
                <div className={'qr-code-info-area'}>
                    <div>
                        <p className={'number-scans-header '}>{t('numberScans')}</p>
                        <p className={'number-scans'}>44588</p>
                        <span className={'trending-info percent'}><TrendingUpIcon/> 6% {t('relatedTo')}<br/></span>
                        <span className={'trending-info'}>{t('previousPeriod')}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}