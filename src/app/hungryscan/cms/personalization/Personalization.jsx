import React from "react";
import {useTranslation} from "react-i18next";
import {MenuMobilePreview} from "./MenuMobilePreview";

export const Personalization = () => {
    const {t} = useTranslation();

    return (
        <div className={'background'}>
            <div className={'cms-padded-view-container'}>
                <div className={'form-grid'}>
                    <div className={'padded-form-fragment'}>
                        <div className={'form-header'}>
                            {t('personalization')}
                        </div>
                        <form className={'menu-item-form'}>
                            <div className={'form-footer'}>
                                <div className={'general-button cancel'}>
                                    {t('cancel')}
                                </div>
                                <div className={'general-button submit'}>{t('save')}</div>
                            </div>
                        </form>
                    </div>
                    <MenuMobilePreview/>
                </div>
            </div>
        </div>
    );
}