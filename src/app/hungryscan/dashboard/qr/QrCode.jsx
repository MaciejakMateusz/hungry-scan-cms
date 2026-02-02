import React from "react";
import {Helmet} from "react-helmet";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {apiHost, s3BucketUrl} from "../../../../apiData";
import {Img} from "react-image";
import {PlaceholderImgIcon} from "../../../icons/PlaceholderImgIcon";
import {generateBasicQr} from "../../../../slices/qrCodesSlice";
import {useFetchCurrentRestaurant} from "../../../../hooks/useFetchCurrentRestaurant";
import {LoadingSpinner} from "../../../icons/LoadingSpinner";
import {BorderedButton} from "../../common/BorderedButton";
import {RefreshIcon} from "../../../icons/RefreshIcon";
import {DownloadIcon} from "../../../icons/DownloadIcon";
import {PrintIcon} from "../../../icons/PrintIcon";
import {setDownloadActive} from "../../../../slices/dashboardSlice";

export const QrCode = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {restaurant} = useSelector(state => state.dashboard.view);
    const restaurantData = restaurant?.value;
    const fetchCurrentRestaurant = useFetchCurrentRestaurant();
    const {isLoading} = useSelector(state => state.qrCodes.generateBasicQr);
    const qrFileName = `${restaurantData?.id}/${restaurantData?.qrVersion}.png?cb=${restaurantData?.updated}`;

    const handleGeneration = async () => {
        await dispatch(generateBasicQr());
        await fetchCurrentRestaurant();
    }

    const handleDownload = async () => {
        await dispatch(setDownloadActive(true));
        window.location.href = `${apiHost}/api/cms/qr/download`;
        dispatch(setDownloadActive(false));
    }

    const handlePrint = () => {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`<img src="${s3BucketUrl}/qr/basic/${qrFileName}" alt="QR" onload="window.print();window.close()"/>`);
        printWindow.document.close();
    };

    const renderPlaceholderImg =
        (
            <div className={'qr-img w-border'}>
                <div className="qr-placeholder">
                    <PlaceholderImgIcon/>
                </div>
            </div>
        );

    return (
        <>
            <Helmet>
                <title>{t('dashboard')} - {t("qrCode")}</title>
            </Helmet>
            <main className={'dashboard-view-grid'}>
                <section className={'dashboard-view-header'}>
                        <span className={'dashboard-view-title'}>
                            {t("qrCode")}
                        </span>
                </section>
                <section className={'dashboard-view-content'}>
                    <div className={'qr-grid'}>
                        {isLoading ?
                            <div className={'qr-img w-border'}><LoadingSpinner/></div> :
                            <Img className={'qr-img w-border'}
                                 alt={'qr-code'}
                                 src={`${s3BucketUrl}/qr/basic/${qrFileName}`}
                                 unloader={renderPlaceholderImg}
                            />}
                        <div className={'qr-options'}>
                            <div className={'qr-options-wrapper'}>
                                <BorderedButton onClick={handleGeneration}
                                                text={t('generateNewCode')}
                                                icon={<RefreshIcon/>}
                                                isBordered={true}/>
                                <BorderedButton onClick={handleDownload}
                                                text={t('download')}
                                                icon={<DownloadIcon/>}
                                                isBordered={true}/>
                                <BorderedButton onClick={handlePrint}
                                                text={t('print')}
                                                icon={<PrintIcon/>}
                                                isBordered={true}/>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}