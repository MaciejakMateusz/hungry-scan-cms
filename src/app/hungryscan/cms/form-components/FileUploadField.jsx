import React, {useEffect} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {setHasImage, setIsImageCleared} from "../../../../slices/dishFormSlice";
import {InformationTooltip} from "../shared-components/InformationTooltip";
import {s3BucketUrl} from "../../../../apiData";
import {InteractiveMenuItemImage} from "../dishes-categories/menu-item/InteractiveMenuItemImage";

export const FileUploadField = ({setFile, file}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {id, updated, hasImage, isImageCleared} = useSelector(state => state.dishForm.form);

    useEffect(() => {
        if (!hasImage) return;

        async function urlToFile(url, filename = "menu-item-image.jpg") {
            const response = await fetch(url, {mode: "cors", cache: "no-cache"});
            const blob = await response.blob();
            return new File([blob], filename, {type: 'image/png'});
        }

        (async () => {
            const file = await urlToFile(`${s3BucketUrl}/menuItems/${id}.png?t=${updated}`);
            setFile(file);
            dispatch(setHasImage(true));
        })();
    }, [dispatch, hasImage, id, setFile, updated]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFile(file);
        dispatch(setIsImageCleared(false));
    };

    const clearFileData = () => {
        setFile(null);
        dispatch(setHasImage(false));
        dispatch(setIsImageCleared(true));
    }

    const renderImage = () => {
        let fileSource = null;
        if (file) fileSource = URL.createObjectURL(file);
        if (hasImage && !file) fileSource = `${s3BucketUrl}/menuItems/${id}.png?t=${updated}`;
        if (!fileSource || isImageCleared) return;
        return (<InteractiveMenuItemImage src={fileSource}/>);
    }

    const renderButton = () => {
        if (isImageCleared || (!hasImage && !file)) {
            return (
                <>
                    <label htmlFor={'dish-image'}
                           className={'custom-file-upload label'}>
                        {t('chooseFile')}
                    </label>
                    <input type={'file'}
                           id={'dish-image'}
                           name={'imageName'}
                           onChange={(e) => handleFileChange(e)}
                           accept={'.png'}
                           className={'file-input'}
                    />
                </>
            );
        }
        return (
            <div className={'custom-file-upload label clear'}
                 onClick={clearFileData}>
                {t('clear')}
                <span className={'clear-file-icon'}>x</span>
            </div>
        );
    }

    return (
        <div className={'form-field-wrapper'}>
            <div className={'form-field-container'}>
                <label htmlFor={'dish-image'} className={'form-label'}>
                    <InformationTooltip text={t('fileFieldTooltip')}/>
                    {t('image')}:
                </label>
                <div className={'custom-file-upload'}>
                    {renderButton()}
                </div>
                {renderImage()}
            </div>
        </div>
    );
}