import React from "react";
import {useTranslation} from "react-i18next";
import {PersonalizationForm} from "./form/PersonalizationForm";
import {useDispatch, useSelector} from "react-redux";
import {postPersonalization, setErrorData, setPersonalizationUpdated} from "../../../../slices/personalizationSlice";
import {useConfirmationMessage} from "../../../../hooks/useConfirmationMessage";
import {useFetchCurrentRestaurant} from "../../../../hooks/useFetchCurrentRestaurant";
import {fetchActiveMenu} from "../../../../slices/cmsSlice";
import {FormHeader} from "../shared-components/FormHeader";
import {FormErrorDialog} from "../../../error/FormErrorDialog";
import {updateTranslatable} from "../../../../locales/langUtils";
import {setPreviewActive} from "../../../../slices/globalParamsSlice";
import {PreviewPanel} from "../dialog-windows/PreviewPanel";

export const Personalization = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const renderConfirmation = useConfirmationMessage(setPersonalizationUpdated);
    const {restaurant} = useSelector(state => state.dashboard.view);
    const {activeMenu} = useSelector(state => state.globalParams.globalParams);
    const {isLoading, errorData} = useSelector(state => state.personalization.postPersonalization);
    const {welcomeSlogan, theme, bannerIconVisible} = useSelector(state => state.personalization.form);
    const fetchCurrentRestaurant = useFetchCurrentRestaurant()
    const {previewActive} = useSelector(state => state.globalParams.globalParams);
    const previewParams = `/true/${welcomeSlogan}/${theme.replace('#', '%23')}/${bannerIconVisible.toString()}`;

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const restaurantLanguage = restaurant?.value.settings.language.toLowerCase();
        const resultAction = await dispatch(postPersonalization(
            {
                activeMenu: activeMenu,
                message: updateTranslatable(activeMenu.value.message, welcomeSlogan, restaurantLanguage)
            }));
        if (postPersonalization.fulfilled.match(resultAction)) {
            await fetchCurrentRestaurant();
            await dispatch(fetchActiveMenu());
            dispatch(setErrorData(null));
            renderConfirmation();
        } else {
            dispatch(setErrorData(resultAction.payload));
        }
    }

    return (
        <div className={'background-preview'}>
            <FormErrorDialog errorData={errorData} setErrorData={setErrorData}/>
            <form className={`cms-padded-view-container preview ${previewActive ? 'preview-open' : ''}`}>
                <FormHeader formHeader={t('personalization')}
                            onFormSubmit={handleFormSubmit}
                            onPreview={() => dispatch(setPreviewActive(true))}
                            isLoading={isLoading}
                            submitDisabled={errorData}
                />
                <div className={'form-grid'}>
                    <div className={'padded-form-fragment'}>
                        <PersonalizationForm/>
                    </div>
                </div>
            </form>
            <PreviewPanel previewParams={previewParams}/>
        </div>
    );
}