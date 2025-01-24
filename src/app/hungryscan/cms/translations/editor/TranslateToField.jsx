import React, {useState} from "react";
import {TranslationStatus} from "../TranslationStatus";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {
    getAutoTranslation,
    setErrorData,
    setRecordDescription,
    setRecordName
} from "../../../../../slices/translationsSlice";
import {LoadingSpinner} from "../../../../icons/LoadingSpinner";

export const TranslateToField = ({value, renderButton, type}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {activeRecord} = useSelector(state => state.translations.view);
    const [loadingType, setLoadingType] = useState(null);

    const handleFieldChange = (value) => {
        if (t('name') === type) {
            dispatch(setRecordName(value));
            return;
        }
        dispatch(setRecordDescription(value));
    }

    const handleFieldTranslation = async () => {
        let textToTranslate;
        if (t('name') === type) {
            textToTranslate = activeRecord.name.defaultTranslation;
            setLoadingType('name');
        } else {
            textToTranslate = activeRecord.description?.defaultTranslation;
            setLoadingType('description');
        }
        const resultAction = await dispatch(getAutoTranslation({text: textToTranslate}));
        if (getAutoTranslation.fulfilled.match(resultAction)) {
            setLoadingType(null);
            const translatedText = resultAction.payload?.translations[0].text;
            handleFieldChange(translatedText);
        } else if (getAutoTranslation.rejected.match(resultAction)) {
            setLoadingType(null);
            dispatch(setErrorData(resultAction.payload));
        }
    }

    const renderLoadingSpinner = () => {
        if (type === t('name') && loadingType === 'name') {
            return (
                <div className={'absolute-spinner-container'}>
                    <LoadingSpinner buttonMode={true} customStyle={{width: '0.6rem', height: '0.6rem'}}/>
                </div>
            );
        } else if (type === t('description') && loadingType === 'description') {
            return (
                <div className={'absolute-spinner-container'}>
                    <LoadingSpinner buttonMode={true} customStyle={{width: '0.6rem', height: '0.6rem'}}/>
                </div>
            );
        }
        return (<></>);
    }

    return (
        <div className={'translate-to-box'}>
            <div className={'translate-to-header'}>
                <span className={'translation-text-label'}>
                    {t('translation')}
                </span>
                {renderLoadingSpinner()}
                <div className={'translation-status-label-group'}>
                    <div className={'translate-to-translation-status'}>
                        <TranslationStatus translated={value?.length > 0}/>
                    </div>
                    <div className={'language-label'}>
                        {t('english')}
                    </div>
                </div>
            </div>
            <div className={'translate-to-content-container'}>
                    <textarea className={'translation-textarea-input'}
                              placeholder={t('typeTranslation')}
                              id={type}
                              name={type}
                              value={value}
                              onChange={(e) => handleFieldChange(e.target.value)}
                    />
            </div>
            <div className={'translate-to-footer'}>
                <div className={'auto-translation-group'} onClick={handleFieldTranslation}>
                    <span className={'translate-icon'}>
                        #<sub>A</sub>
                    </span>
                    <span className={'automatic-translation-text'}>
                            {t('automaticTranslation')}
                    </span>
                </div>
                {renderButton ? <button type={'submit'} className={'translations-general-button'}>{t('save')}</button> : <></>}
            </div>
        </div>
    );
}