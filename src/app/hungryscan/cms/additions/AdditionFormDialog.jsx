import React, {useEffect} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {NameField} from "../form-components/NameField";
import {PriceField} from "../form-components/PriceField";
import {
    clearForm,
    getIngredients,
    postAddition,
    resetAdditionData, setAdditionCreated,
    setAdditionDialogActive, setAdditionUpdated,
    setAvailable,
    setErrorData,
    setId,
    setName,
    setPrice
} from "../../../../slices/additionsSlice";
import {getTranslation} from "../../../../locales/langUtils";
import {LogicalToggleField} from "../form-components/LogicalToggleField";
import {useTranslatableTransformer} from "../../../../hooks/useTranslatableTransformer";
import {LoadingSpinner} from "../../../icons/LoadingSpinner";
import {useConfirmationMessage} from "../../../../hooks/useConfirmationMessage";
import {FormErrorDialog} from "../../../error/FormErrorDialog";

export const AdditionFormDialog = (props) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {isNewAddition, filteringActive, filterValue} = useSelector(state => state.additions.view);
    const {name, price, available, addition} = useSelector(state => state.additions.form);
    const {errorData, isLoading} = useSelector(state => state.additions.postAddition);
    const transformName = useTranslatableTransformer({
        obj: isNewAddition ? null : addition,
        key: 'name'
    });
    const renderConfirmation = useConfirmationMessage(isNewAddition ? setAdditionCreated : setAdditionUpdated);

    useEffect(() => {
        if (!isNewAddition) {
            dispatch(setId(addition.id))
            dispatch(setName(getTranslation(addition.name)))
            dispatch(setPrice(addition.price.toFixed(2)))
            dispatch(setAvailable(addition.available));
        } else {
            dispatch(setAvailable(true));
        }
    }, [isNewAddition]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const isNameBlank = !name || name.trim().length === 0;
        if (isNameBlank) {
            dispatch(setErrorData({name: t('constraints.NotBlank')}));
            return;
        }
        const resultAction = await dispatch(postAddition({
            action: isNewAddition ? 'add' : 'update',
            transformName: transformName
        }));
        if (postAddition.fulfilled.match(resultAction)) {
            dispatch(setAdditionDialogActive(false));
            dispatch(clearForm());
            dispatch(resetAdditionData());
            dispatch(setErrorData(null));
            filteringActive ? await props.filter(filterValue) : await dispatch(getIngredients());
            renderConfirmation();
        } else {
            dispatch(setErrorData(resultAction?.payload));
        }
    }

    return (
        <>
            <FormErrorDialog errorData={errorData} setErrorData={setErrorData}/>
            <div className={'overlay'}></div>
            <div className={'form-dialog '}>
                <div className={'variant-form-dialog-content'}>
                    <h4>
                        {isNewAddition ? t('createNewAddition') : t('editAddition')}
                    </h4>
                    <NameField id={'variant-name'}
                               value={name}
                               onChange={(e) => dispatch(setName(e))}
                               error={errorData}
                    />
                    <PriceField id={'variant-price'}
                                value={price}
                                setPrice={(e) => dispatch(setPrice(e))}
                                error={errorData}
                    />
                    <LogicalToggleField id={'variant-available'}
                                        name={t('availability')}
                                        value={available}
                                        onChange={() => dispatch(setAvailable(!available))}/>
                </div>
                <div className={'dialog-footer'}>
                    <button className={'general-button cancel'} onClick={() => {
                        dispatch(setAdditionDialogActive(false));
                        dispatch(clearForm());
                        dispatch(setErrorData({}));
                        dispatch(resetAdditionData());
                    }}>
                        {t('cancel')}
                    </button>
                    <form style={{all: 'unset'}}
                          onSubmit={(e) => handleFormSubmit(e)}>
                        <button type="submit" className={'general-button'}>
                            {isLoading ? <LoadingSpinner buttonMode={true}/> : t('save')}
                        </button>
                    </form>
                </div>

            </div>
        </>
    );
}