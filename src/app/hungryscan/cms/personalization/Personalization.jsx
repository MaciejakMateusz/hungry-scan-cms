import React, {useEffect, useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import {PersonalizationForm} from "./form/PersonalizationForm";
import {useDispatch, useSelector} from "react-redux";
import {
    postPersonalization,
    setErrorData,
    setPersonalizationUpdated
} from "../../../../slices/personalizationSlice";
import {useConfirmationMessage} from "../../../../hooks/useConfirmationMessage";
import {useFetchCurrentRestaurant} from "../../../../hooks/useFetchCurrentRestaurant";
import {fetchActiveMenu} from "../../../../slices/cmsSlice";
import {FormHeader} from "../shared-components/FormHeader";
import {FormErrorDialog} from "../../../error/FormErrorDialog";
import {updateTranslatable} from "../../../../locales/langUtils";
import {PreviewPanel} from "../dialog-windows/PreviewPanel";
import Iframe from "react-iframe";
import {menuAppHost} from "../../../../apiData";
import {LoadingSpinner} from "../../../icons/LoadingSpinner";
import {PreviewFallback} from "./menu-preview/PreviewFallback";

export const Personalization = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const renderConfirmation = useConfirmationMessage(setPersonalizationUpdated);
    const {restaurant} = useSelector(state => state.dashboard.view);
    const {activeMenu, previewActive} = useSelector(state => state.globalParams.globalParams);
    const {isLoading, errorData} = useSelector(state => state.personalization.postPersonalization);
    const {welcomeSlogan, theme, bannerIconVisible} = useSelector(state => state.personalization.form);
    const fetchCurrentRestaurant = useFetchCurrentRestaurant();
    const [previewLoaded, setPreviewLoaded] = useState(false);
    const [previewError, setPreviewError] = useState(false);
    const loadTimeoutRef = useRef(null);
    const previewParams =
        `/true/${welcomeSlogan}/${theme.replace('#', '%23')}/${bannerIconVisible.toString()}`;
    const previewUrl = menuAppHost + previewParams;

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const restaurantLanguage = restaurant?.value.settings.language.toLowerCase();
        const resultAction = await dispatch(postPersonalization({
            activeMenu: activeMenu,
            message: updateTranslatable(
                activeMenu.value.message,
                welcomeSlogan,
                restaurantLanguage
            )
        }));

        if (postPersonalization.fulfilled.match(resultAction)) {
            await fetchCurrentRestaurant();
            await dispatch(fetchActiveMenu());
            dispatch(setErrorData(null));
            renderConfirmation();
        } else {
            dispatch(setErrorData(resultAction.payload));
        }
    };

    useEffect(() => {
        setPreviewLoaded(false);
        setPreviewError(false);

        if (loadTimeoutRef.current) {
            clearTimeout(loadTimeoutRef.current);
        }

        loadTimeoutRef.current = window.setTimeout(() => {
            setPreviewError(true);
        }, 8000);

        return () => {
            if (loadTimeoutRef.current) {
                clearTimeout(loadTimeoutRef.current);
            }
        };
    }, [previewUrl]);

    useEffect(() => {
        const handleMessage = (event) => {
            const data = event.data;

            if (!data || typeof data !== 'object') return;

            if (data.type === 'PREVIEW_READY' && data.source === 'menu-preview') {
                if (loadTimeoutRef.current) {
                    clearTimeout(loadTimeoutRef.current);
                }
                setPreviewLoaded(true);
                setPreviewError(false);
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);

    const renderPreviewContent = () => (
        <div className="relative-container">
            {!previewLoaded && !previewError && <LoadingSpinner/>}

            {previewError && <PreviewFallback/>}

            {!previewError && (
                <Iframe
                    url={previewUrl}
                    className={`iframe-container ${previewLoaded ? 'iframe-visible' : 'iframe-hidden'}`}
                    styles={{border: 'none'}}
                />
            )}
        </div>
    );

    return (
        <div className={'background'}>
            <FormErrorDialog errorData={errorData} setErrorData={setErrorData}/>
            <form className={'cms-padded-view-container'}>
                <FormHeader
                    formHeader={t('personalization')}
                    onFormSubmit={handleFormSubmit}
                    isLoading={isLoading}
                    submitDisabled={!!errorData}
                    renderPreview={true}
                />
                <div
                    className={'form-grid personalization'}
                    style={previewActive ? {gap: '15px'} : {}}
                >
                    <div className={'padded-form-fragment'}>
                        <PersonalizationForm/>
                    </div>
                    <PreviewPanel
                        personalizationMode={true}
                        content={renderPreviewContent()}
                    />
                </div>
            </form>
        </div>
    );
};
