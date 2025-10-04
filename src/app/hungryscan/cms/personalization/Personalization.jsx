import React from "react";
import {useTranslation} from "react-i18next";
import {MenuMobilePreview} from "./MenuMobilePreview";
import {PersonalizationForm} from "./form/PersonalizationForm";
import {useDispatch, useSelector} from "react-redux";
import {postPersonalization, setPersonalizationUpdated} from "../../../../slices/personalizationSlice";
import {useConfirmationMessage} from "../../../../hooks/useConfirmationMessage";
import {useFetchCurrentRestaurant} from "../../../../hooks/useFetchCurrentRestaurant";
import {fetchActiveMenu} from "../../../../slices/cmsSlice";

export const Personalization = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const renderConfirmation = useConfirmationMessage(setPersonalizationUpdated);
    const {activeMenu} = useSelector(state => state.globalParams.globalParams);
    const fetchCurrentRestaurant = useFetchCurrentRestaurant()

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const resultAction = await dispatch(postPersonalization({activeMenu}));
        if (postPersonalization.fulfilled.match(resultAction)) {
            await fetchCurrentRestaurant();
            await dispatch(fetchActiveMenu());
            renderConfirmation();
        }
    }

    return (
        <div className={'background'}>
            <form className={'cms-padded-view-container'}>
                <div className={'functions-header'}>
                    <div className={'section-heading'}>
                        {t('personalization')}
                    </div>
                    <div className={'flex-wrapper-gapped'}>
                        <div className={'form-footer'}>
                            <div className={'general-button'} onClick={handleFormSubmit}>
                                {t('save')}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={'form-grid'}>
                    <div className={'padded-form-fragment'}>
                        <PersonalizationForm/>
                    </div>
                </div>
            </form>
        </div>
    );
}