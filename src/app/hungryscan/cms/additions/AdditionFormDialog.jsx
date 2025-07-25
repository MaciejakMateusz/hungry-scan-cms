import React, {useEffect} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {CustomSelect} from "../form-components/CustomSelect";
import {NameField} from "../form-components/NameField";
import {PriceField} from "../form-components/PriceField";
import {
    setId,
    setName,
    setPrice,
    setAvailable,
    setAdditionDialogActive,
    postAddition,
    clearForm,
    resetAdditionData,
    getIngredients,
    setErrorData
} from "../../../../slices/additionsSlice";
import {getTranslation} from "../../../../locales/langUtils";

export const AdditionFormDialog = (props) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {isNewAddition, filteringActive, filterValue} = useSelector(state => state.additions.view);
    const {name, price, available, addition} = useSelector(state => state.additions.form);
    const {errorData} = useSelector(state => state.additions.postAddition);

    useEffect(() => {
        if(!isNewAddition) {
            dispatch(setId(addition.id))
            dispatch(setName(getTranslation(addition.name)))
            dispatch(setPrice(addition.price.toFixed(2)))
            dispatch(setAvailable({
                value: addition.available,
                label: addition.available ? t('availableVariant') : t('unavailableVariant')
            }));
        } else {
            dispatch(setAvailable({
                value: true,
                label: t('availableVariant')
            }));
        }
    }, [isNewAddition]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const resultAction = await dispatch(postAddition());
        if(postAddition.fulfilled.match(resultAction)) {
            dispatch(setAdditionDialogActive(false));
            dispatch(clearForm());
            dispatch(resetAdditionData());
            filteringActive ? await props.filter(filterValue) : await dispatch(getIngredients());
        }
    }

    return (
        <>
            <div className={'overlay'}></div>
            <div className={'variant-form-dialog '}>
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
                    <CustomSelect
                        id={'variant-available'}
                        name={'available'}
                        labelName={t('availability')}
                        value={available}
                        onChange={(selected) => dispatch(setAvailable(selected))}
                        options={[
                            {value: true, label: t('availableVariant')},
                            {value: false, label: t('unavailableVariant')}
                        ]}
                    />
                </div>
                <div className={'variant-dialog-footer'}>
                    <button className={'general-button cancel'} onClick={() => {
                        dispatch(setAdditionDialogActive(false));
                        dispatch(clearForm());
                        dispatch(setErrorData({}));
                        dispatch(resetAdditionData());
                    }}>
                        {t('cancel')}
                    </button>
                    <form style={{all: 'unset'}} onSubmit={(e) => handleFormSubmit(e)}>
                        <button type="submit" className={'general-button'}>{t('save')}</button>
                    </form>
                </div>

            </div>
        </>
    );
}