import React from "react";
import {Helmet} from "react-helmet";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {apiHost, qrName, qrPath} from "../../../apiData";
import {setShareActive} from "../../../slices/qrCodesSlice";
import {QrShareDialog} from "./QrShareDialog";

export const QrCode = () => {
    const dispatch = useDispatch();
    const {shareActive} = useSelector(state => state.qrCodes.view);
    const {t} = useTranslation();
    const qrUrl = qrPath + qrName;

    const handlePrint = () => {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`<img src="${qrUrl}" alt="QR" onload="window.print();window.close()" />`);
        printWindow.document.close();
    };

    return (
        <>
            <Helmet>
                <title>CMS - {t("qrCode")}</title>
            </Helmet>
            {shareActive ?
                <QrShareDialog onCancel={() => dispatch(setShareActive(false))}
                               msg={t('shareQr')}/> :
                <></>
            }
            <div className={'translation-background'}>
                <main className={'translations-padded-view-container'}>
                    <div className={'translations-vertical-split-grid'}>
                        <section className={'translations-vertical-split-left qr'}>
                            <div className={'qr-header'}>
                                <div className={'qr-preview-label'}>
                                    Podgląd
                                </div>
                            </div>
                            <div className={'qr-grid'}>
                                <img className={'qr-preview'} alt={'qr-code'} src={qrUrl}/>
                                <div className={'qr-options'}>
                                    <div>
                                        <a className={'qr-option'} href={`${apiHost}/api/cms/qr/download`}>
                                            <span className={'qr-icon'}/>
                                            Pobierz
                                        </a>
                                    </div>
                                    <div onClick={handlePrint}>
                                        <span className={'qr-option'}>
                                            <span className={'qr-icon'}/>
                                            Drukuj
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        </>
    );
}