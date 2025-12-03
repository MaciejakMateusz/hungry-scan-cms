import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {setHasImage, setIsImageCleared} from "../../../../slices/dishFormSlice";
import {InformationTooltip} from "../shared-components/InformationTooltip";
import {s3BucketUrl} from "../../../../apiData";
import {InteractiveMenuItemImage} from "../dishes-categories/menu-item/InteractiveMenuItemImage";
import {CloseIcon} from "../../../icons/CloseIcon";

export const FileUploadField = React.memo(({file, setFile}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {id, updated, hasImage, isImageCleared} = useSelector(state => state.dishForm.form);
    const [previewUrl, setPreviewUrl] = useState(null);

    useEffect(() => {
        if (!hasImage || file || isImageCleared || !id) return;

        async function urlToFile(url, filename = "menu-item-image.jpg") {
            const response = await fetch(url, {mode: "cors", cache: "no-cache"});
            const blob = await response.blob();
            return new File([blob], filename, {type: 'image/png'});
        }

        (async () => {
            const remoteUrl = `${s3BucketUrl}/menuItems/${id}.png?t=${updated}`;
            const fetchedFile = await urlToFile(remoteUrl);
            setFile(fetchedFile);

            dispatch(setHasImage(true));
        })();
    }, [dispatch, hasImage, id, updated, file, isImageCleared, setFile]);

    useEffect(() => {
        if (!file) {
            setPreviewUrl(null);
            return;
        }

        const objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);

        return () => {
            URL.revokeObjectURL(objectUrl);
        };
    }, [file]);

    const handleFileChange = (e) => {
        const newFile = e.target.files[0];
        if (!newFile) return;
        setFile(newFile);
        dispatch(setIsImageCleared(false));
        dispatch(setHasImage(true));
    };

    const clearFileData = () => {
        setFile(null);
        setPreviewUrl(null);
        dispatch(setHasImage(false));
        dispatch(setIsImageCleared(true));
    };

    const renderImage = () => {
        if (isImageCleared) return null;

        if (file && previewUrl) {
            return (
                <InteractiveMenuItemImage
                    src={previewUrl}
                    hasImage={true}
                />
            );
        }

        if (!file && hasImage && id) {
            const remoteUrl = `${s3BucketUrl}/menuItems/${id}.png?t=${updated}`;
            return (
                <InteractiveMenuItemImage
                    src={remoteUrl}
                    hasImage={hasImage}
                />
            );
        }

        return null;
    };

    const renderButton = () => {
        const hasAnyImage = (!isImageCleared && (hasImage || file));

        if (!hasAnyImage) {
            return (
                <>
                    <label htmlFor={'dish-image'}
                           className={'custom-file-upload label'}>
                        {t('chooseFile')}
                    </label>
                    <input
                        type={'file'}
                        id={'dish-image'}
                        name={'imageName'}
                        onChange={handleFileChange}
                        accept={'.png'}
                        className={'file-input'}
                    />
                </>
            );
        }

        return (
            <div
                className={'custom-file-upload label clear'}
                onClick={clearFileData}
            >
                <span>{t('clear')}</span>
                <CloseIcon/>
            </div>
        );
    };

    return (
        <div className={'form-field-wrapper'}>
            <div className={'form-field-container image'}>
                <label htmlFor={'dish-image'} className={'form-label'}>
                    <InformationTooltip text={t('fileFieldTooltip')}/>
                    {t('image')}:
                </label>
                <div className={'flex-centered'}>
                    {renderImage()}
                    <div className={'custom-file-upload'}>
                        {renderButton()}
                    </div>
                </div>
            </div>
        </div>
    );
});