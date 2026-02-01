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
import {LogicalToggleField} from "../form-components/LogicalToggleField";
import {useTranslatableTransformer} from "../../../../hooks/useTranslatableTransformer";
import {LoadingSpinner} from "../../../icons/LoadingSpinner";
import {useConfirmationMessage} from "../../../../hooks/useConfirmationMessage";
import {FormErrorDialog} from "../../../error/FormErrorDialog";
import {BorderedButton} from "../../common/BorderedButton";
import {ActionButton} from "../../common/ActionButton";

export const AdditionFormDialog = (props) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {isNewAddition, filteringActive, filterValue} = useSelector(state => state.additions.view);
    const {name, price, available, addition} = useSelector(state => state.additions.form);
    const {restaurant} = useSelector(state => state.dashboard.view);
    const {errorData, isLoading} = useSelector(state => state.additions.postAddition);
    const transformName = useTranslatableTransformer({
        obj: isNewAddition ? null : addition,
        key: 'name'
    });
    const renderConfirmation = useConfirmationMessage(isNewAddition ? setAdditionCreated : setAdditionUpdated);

    useEffect(() => {
        if (!isNewAddition) {
            const restaurantLanguage = restaurant?.value.settings.language.toLowerCase();
            dispatch(setId(addition.id));
            dispatch(setName(addition.name[restaurantLanguage]));
            dispatch(setPrice(addition.price.toFixed(2)));
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
            <div className={'overlay'}>
                <div className={'form-dialog '}>
                    <div className={'variant-form-dialog-content'}>
                        <div className={'form-dialog-title'}>
                            {isNewAddition ? t('createNewAddition') : t('editAddition')}
                        </div>
                        <NameField id={'variant-name'}
                                   value={name}
                                   onChange={(e) => dispatch(setName(e))}
                                   error={errorData}
                                   maxLength={100}
                        />
                        <PriceField id={'price'}
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
                        <BorderedButton onClick={() => {
                            dispatch(setAdditionDialogActive(false));
                            dispatch(clearForm());
                            dispatch(setErrorData({}));
                            dispatch(resetAdditionData());
                        }}
                                        text={t('cancel')}
                                        isBordered={true}/>
                        <form style={{all: 'unset'}}
                              onSubmit={(e) => handleFormSubmit(e)}>
                            <ActionButton type="submit"
                                          text={isLoading ? <LoadingSpinner buttonMode={true}/> : t('save')}/>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}