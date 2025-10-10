import React from "react";
import {useTranslation} from "react-i18next";
import {PersonalizationForm} from "./form/PersonalizationForm";
import {useDispatch, useSelector} from "react-redux";
import {postPersonalization, setPersonalizationUpdated} from "../../../../slices/personalizationSlice";
import {useConfirmationMessage} from "../../../../hooks/useConfirmationMessage";
import {useFetchCurrentRestaurant} from "../../../../hooks/useFetchCurrentRestaurant";
import {fetchActiveMenu} from "../../../../slices/cmsSlice";
import {FormHeader} from "../shared-components/FormHeader";

export const Personalization = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const renderConfirmation = useConfirmationMessage(setPersonalizationUpdated);
    const {activeMenu} = useSelector(state => state.globalParams.globalParams);
    const {isLoading} = useSelector(state => state.personalization.postPersonalization);
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
                <FormHeader formHeader={t('personalization')}
                            onFormSubmit={handleFormSubmit}
                            isLoading={isLoading}
                />
                <div className={'form-grid'}>
                    <div className={'padded-form-fragment'}>
                        <PersonalizationForm/>
                    </div>
                </div>
            </form>
        </div>
    );
}