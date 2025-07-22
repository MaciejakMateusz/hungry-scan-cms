import React from "react";
import {s3BucketUrl} from "../../../../../../apiData";
import {useTranslation} from "react-i18next";
import {DownloadIcon} from "../../../../../icons/DownloadIcon";
import {TrendingUpIcon} from "../../../../../icons/TrendingUpIcon";
import {useSelector} from "react-redux";
import {Img} from "react-image";
import {PlaceholderImgIcon} from "../../../../../icons/PlaceholderImgIcon";

export const QrWidget = () => {
    const {t} = useTranslation();
    const {data} = useSelector(state => state.statistics.scanStats);
    const {restaurant} = useSelector(state => state.dashboard.view);
    const restaurantData = restaurant?.value;

    return (
        <div className={'statistic-widget qr-code'}>
            <div className={'widget-container qr-code'}>
                <div className={'qr-code-download-area'}>
                    <div className={'qr-img-container'}>
                        <Img className={'qr-img'}
                             alt={'qr-code'}
                             src={`${s3BucketUrl}/qr/basic/${restaurantData?.id}.png?t=${restaurantData?.updated}`}
                             unloader={<PlaceholderImgIcon/>}
                        />
                    </div>
                    <div className={'qr-img-download-btn'}>{t('download')}<DownloadIcon/></div>
                </div>
                <div className={'qr-code-info-area'}>
                    <div>
                        <p className={'number-scans-header '}>{t('numberScans')}</p>
                        <p className={'number-scans'}>{data?.total ?? 0}</p>
                        <span className={'trending-info percent'}><TrendingUpIcon/> 6% {t('relatedTo')}<br/></span>
                        <span className={'trending-info'}>{t('previousPeriod')}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}