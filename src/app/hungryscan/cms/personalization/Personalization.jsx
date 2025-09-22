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
            <div className={'cms-padded-view-container'}>
                <div className={'form-grid'}>
                    <div className={'padded-form-fragment'}>
                        <div className={'form-header'}>
                            {t('personalization')}
                        </div>
                        <form className={'padded-form-container'}>
                            <PersonalizationForm/>
                            <div className={'personalization-form-footer'}>
                                <div className={'general-button submit'}
                                     onClick={handleFormSubmit}>
                                    {t('save')}
                                </div>
                            </div>
                        </form>
                    </div>
                    <MenuMobilePreview/>
                </div>
            </div>
        </div>
    );
}