import React from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {clearFileName} from "../../../slices/dishFormSlice";
import {InformationTooltip} from "../shared-components/InformationTooltip";

export const FileUploadField = (props) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {fileName} = useSelector(state => state.dishForm.form);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            props.setFileName(file.name);
        }
        props.setFile(file);
    };

    const clearFileData = () => {
        dispatch(clearFileName());
        props.setFile(null);
    }

    return (
        <div className={'form-field-wrapper'}>
            <div className={'form-field-container'}>
                <label htmlFor={'dish-image'} className={'form-label'}>
                    <InformationTooltip text={t('fileFieldTooltip')}/>
                    {t('image')}:
                </label>
                <div className={'custom-file-upload'}>
                    {fileName === null ? (
                            <>
                                <label htmlFor={'dish-image'}
                                       className={'custom-file-upload label'}>
                                    {t('chooseFile')}
                                </label>
                                <input
                                    type={'file'}
                                    id={'dish-image'}
                                    name={'imageName'}
                                    onChange={(e) => handleFileChange(e)}
                                    accept={'.png'}
                                    className={'file-input'}/>
                            </>
                        ) :
                        <label htmlFor={'dish-image'}
                               className={'custom-file-upload label clear'}
                               onClick={clearFileData}>
                            {t('clear')}
                            <span className={'clear-file-icon'}>x</span>
                        </label>}
                    <span className={'file-name'}
                          id={'file-name'}>{fileName ? fileName : t('noFileChosen')}
                    </span>
                </div>
            </div>
        </div>
    );
}