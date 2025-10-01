import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {setVariantDialogActive} from "../../../../../../slices/variantsSlice";
import {updateTranslatable, getTranslation, createTranslatable} from "../../../../../../locales/langUtils";
import {NameField} from "../../../form-components/NameField";
import {PriceField} from "../../../form-components/PriceField";
import {CustomSelect} from "../../../form-components/CustomSelect";
import {setVariants} from "../../../../../../slices/dishFormSlice";
import {generateUUID} from "../../../../../../utils/utils";

export const VariantFormDialog = ({variants}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {isNewVariant} = useSelector(state => state.variants.view);
    const {variant} = useSelector(state => state.variants.form);
    const {data: menuItem} = useSelector(state => state.dishForm.fetchMenuItem);
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [available, setAvailable] = useState(false);
    const {errorData} = useSelector(state => state.variants.postVariant);
    const variantsCopy = variants?.map((variant) => variant);

    useEffect(() => {
        if (!isNewVariant) {
            setName(getTranslation(variant.name))
            setPrice(variant.price.toFixed(2))
            setAvailable({
                value: variant.available,
                label: variant.available ? t('availableVariant') : t('unavailableVariant')
            });
        } else {
            setAvailable({
                value: true,
                label: t('availableVariant')
            });
        }
    }, [dispatch, variant, isNewVariant, t]);

    const handleVariantSubmit = e => {
        e.preventDefault();
        if (isNewVariant) {
            variantsCopy.push({
                id: generateUUID(),
                menuItem: menuItem,
                name: createTranslatable(name),
                price: Number(price),
                displayOrder: variants.length + 1,
                available: available.value
            });
            dispatch(setVariants(variantsCopy));
            dispatch(setVariantDialogActive(false));
            return;
        }

        const updatedVariants = variantsCopy.map(v => {
            if (v.id === variant.id) {
                return {
                    ...v,
                    name: updateTranslatable(variant.name, name),
                    price: Number(price),
                    available: available.value,
                };
            }
            return v;
        })
        dispatch(setVariants(updatedVariants));
        dispatch(setVariantDialogActive(false));
    }

    const clearFormState = () => {
        setName('');
        setPrice(0);
        setAvailable(false);
    }

    return (
        <>
            <div className={'overlay'}></div>
            <div className={'form-dialog'}>
                <div className={'variant-form-dialog-content'}>
                    <h4>
                        {isNewVariant ? t('createNewVariantForDish') : t('editVariant')}
                    </h4>
                    <NameField id={'variant-name'}
                               value={name}
                               onChange={(e) => setName(e)}
                               error={errorData}
                    />
                    <PriceField id={'variant-price'}
                                value={price}
                                setPrice={(e) => setPrice(e)}
                                error={errorData}
                    />
                    <CustomSelect id={'variant-available'}
                                  name={'available'}
                                  labelName={t('availability')}
                                  value={available}
                                  onChange={(selected) => setAvailable(selected)}
                                  options={[
                                      {value: true, label: t('availableVariant')},
                                      {value: false, label: t('unavailableVariant')}
                                  ]}
                    />
                </div>
                <div className={'dialog-footer'}>
                    <button className={'general-button cancel'} onClick={() => {
                        clearFormState()
                        dispatch(setVariantDialogActive(false));
                    }}>
                        {t('cancel')}
                    </button>
                    <button className={'general-button'} onClick={handleVariantSubmit}>
                        {t('save')}
                    </button>
                </div>
            </div>
        </>
    );
}