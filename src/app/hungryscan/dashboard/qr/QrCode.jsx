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

export const QrCode = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {restaurant} = useSelector(state => state.dashboard.view);
    const restaurantData = restaurant?.value;
    const fetchCurrentRestaurant = useFetchCurrentRestaurant();
    const {isLoading} = useSelector(state => state.qrCodes.generateBasicQr);
    const qrFileName = `${restaurantData?.id}/${restaurantData?.qrVersion}.png?t=${restaurantData?.updated}`;

    const handleGeneration = async () => {
        await dispatch(generateBasicQr());
        await fetchCurrentRestaurant();
    }

    const handlePrint = () => {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`<img src="${s3BucketUrl}/qr/basic/${qrFileName}" alt="QR" onload="window.print();window.close()"/>`);
        printWindow.document.close();
    };

    const renderPlaceholderImg =
        (
            <div class={'qr-img w-border'}>
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
                                <div class={'qr-option-button'}
                                     onClick={handleGeneration}>
                                    {t('generateNewCode')}
                                </div>
                                <div class={'qr-option-button'}
                                     onClick={() => window.location.href = `${apiHost}/api/cms/qr/download`}>
                                    {t('download')}
                                </div>
                                <div class={'qr-option-button'}
                                     onClick={handlePrint}>
                                    {t('print')}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}