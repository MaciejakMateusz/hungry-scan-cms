import React from "react";
import {useTranslation} from "react-i18next";

export const FileUploadField = (props) => {
    const {t} = useTranslation();
    return (
        <div className={'form-field-wrapper'}>
            <div className={'form-field-container'}>
                <label htmlFor={'dish-image'} className={'form-label'}>
                    {t('image')}:
                </label>
                <div className={'custom-file-upload'}>
                    {props.file === null ? (
                            <>
                                <label htmlFor={'dish-image'}
                                       className={'custom-file-upload label'}>
                                    {t('chooseFile')}
                                </label>
                                <input
                                    type={'file'}
                                    id={'dish-image'}
                                    name={'imageName'}
                                    onChange={props.onChange}
                                    accept={'.png'}
                                    className={'file-input'}/>
                            </>
                        ) :
                        <label htmlFor={'dish-image'}
                               className={'custom-file-upload label clear'}
                               onClick={props.onClick}>
                            {t('clear')}
                            <span className={'clear-file-icon'}>x</span>
                        </label>}
                    <span className={'file-name'} id={'file-name'}>{props.fileName}</span>
                </div>
            </div>
        </div>
    );
}