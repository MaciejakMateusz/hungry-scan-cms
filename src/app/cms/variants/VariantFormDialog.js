import React, {useEffect, useState} from "react";
import {
    clearForm,
    fetchVariants,
    postVariant,
    resetVariantData,
    setAvailable,
    setDisplayOrder,
    setErrorData,
    setId,
    setName,
    setPrice,
    setVariantDialogActive
} from "../../../slices/variantsSlice";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {getTranslation} from "../../../locales/langUtils";
import {CustomSelect} from "../dishes-categories/form-components/CustomSelect";
import {NameField} from "../dishes-categories/form-components/NameField";
import {PriceField} from "../dishes-categories/form-components/PriceField";

export const VariantFormDialog = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {isNewVariant, dish} = useSelector(state => state.variants.view);
    const {displayOrder, name, price, available, variant} = useSelector(state => state.variants.form);
    const {variants} = useSelector(state => state.variants.fetchVariants);
    const {errorData} = useSelector(state => state.variants.postVariant);
    const [displayOrders, setDisplayOrders] = useState([1]);

    useEffect(() => {
        if (variants.length > 0) {
            const displayOrders = variants.map(variant => variant.displayOrder)
            if(isNewVariant) {
                const additional = variants.length + 1;
                displayOrders.push(additional);
                dispatch(setDisplayOrder({value: additional, label: additional}));
                setDisplayOrders(displayOrders);
            } else {
                dispatch(setDisplayOrder({value: displayOrders.length, label: displayOrders.length}));
                setDisplayOrders(displayOrders);
            }
        }
    }, [dispatch, variants]);

    useEffect(() => {
        if(!isNewVariant) {
            dispatch(setId(variant.id))
            dispatch(setDisplayOrder({value: variant.displayOrder, label: variant.displayOrder}))
            dispatch(setName(variant.name.defaultTranslation))
            dispatch(setPrice(variant.price.toFixed(2)))
            dispatch(setAvailable({
                value: variant.available,
                label: variant.available ? t('availableVariant') : t('unavailableVariant')
            }));
        } else {
            dispatch(setAvailable({
                value: true,
                label: t('availableVariant')
            }));
        }
    }, [isNewVariant]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const resultAction = await dispatch(postVariant());
        if(postVariant.fulfilled.match(resultAction)) {
            dispatch(setVariantDialogActive(false));
            dispatch(clearForm());
            dispatch(resetVariantData());
            await dispatch(fetchVariants());
        }
    }

    if (!dish) {
        return;
    }

    return (
        <>
            <div className={'overlay'}></div>
            <div className={'variant-form-dialog '}>
                <div className={'variant-form-dialog-content'}>
                    <h4>
                        {isNewVariant ? t('createNewVariantForDish') + getTranslation(dish.name) : t('editVariant')}
                    </h4>
                    <CustomSelect id={'variant-display-order'}
                                  name={'displayOrder'}
                                  labelName={t('displayOrder')}
                                  value={displayOrder}
                                  onChange={(selected) => dispatch(setDisplayOrder(selected))}
                                  options={displayOrders.map(displayOrder => {
                                      return {value: displayOrder, label: displayOrder}
                                  })}
                    />
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
                        dispatch(setVariantDialogActive(false));
                        dispatch(clearForm());
                        dispatch(setErrorData({}));
                        dispatch(resetVariantData());
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