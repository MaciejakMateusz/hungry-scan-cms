import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {setVariantDialogActive} from "../../../../../../slices/variantsSlice";
import {createTranslatable, updateTranslatable} from "../../../../../../locales/langUtils";
import {NameField} from "../../../form-components/NameField";
import {PriceField} from "../../../form-components/PriceField";
import {setVariants} from "../../../../../../slices/dishFormSlice";
import {generateUUID} from "../../../../../../utils/utils";
import {LogicalToggleField} from "../../../form-components/LogicalToggleField";

export const VariantFormDialog = ({variants}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {isNewVariant} = useSelector(state => state.variants.view);
    const {variant} = useSelector(state => state.variants.form);
    const {data: menuItem} = useSelector(state => state.dishForm.fetchMenuItem);
    const {restaurant} = useSelector(state => state.dashboard.view);
    const restaurantLanguage = restaurant?.value.settings.language.toLowerCase();
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [available, setAvailable] = useState(true);
    const variantsCopy = variants?.map((variant) => variant);
    const [isNameBlank, setIsNameBlank] = useState(false);
    const [isNameTooLong, setIsNameTooLong] = useState(false);

    useEffect(() => {
        if (!isNewVariant) {
            setName((variant.name[restaurantLanguage]));
            setPrice(variant.price.toFixed(2));
            setAvailable(variant.available);
        }
    }, [dispatch, variant, isNewVariant, t, restaurantLanguage]);

    const handleVariantSubmit = async e => {
        e.preventDefault();

        const nameBlank = !name || name.trim().length === 0;
        const nameTooLong = (name ?? '').length > 255;

        setIsNameBlank(nameBlank);
        setIsNameTooLong(nameTooLong);

        if (nameBlank || nameTooLong) return;
        if (isNewVariant) {
            variantsCopy.push({
                id: generateUUID(),
                menuItem: menuItem,
                name: createTranslatable(name, restaurantLanguage),
                price: Number(price),
                displayOrder: variants.length + 1,
                available: available
            });
            dispatch(setVariants(variantsCopy));
            dispatch(setVariantDialogActive(false));
            return;
        }

        const updatedVariants = variantsCopy.map(v => {
            if (v.id === variant.id) {
                return {
                    ...v,
                    name: updateTranslatable(variant.name, name, restaurantLanguage),
                    price: Number(price),
                    available: available,
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

    const getValidationMsg = () => {
        if (isNameBlank) {
            return {name: t('constraints.NotBlank')};
        } else if (isNameTooLong) {
            return {name: t('constraints.MaxLength')};
        }
        return null;
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
                               error={getValidationMsg()}
                    />
                    <PriceField id={'price'}
                                value={price}
                                setPrice={(e) => setPrice(e)}
                    />
                    <LogicalToggleField id={'available'}
                                        name={t('availability')}
                                        value={available}
                                        onChange={() => setAvailable(!available)}/>
                </div>
                <div className={'dialog-footer'}>
                    <button className={'general-button cancel'} onClick={() => {
                        clearFormState()
                        dispatch(setVariantDialogActive(false));
                    }}>
                        {t('cancel')}
                    </button>
                    <button className={'general-button'}
                            onClick={handleVariantSubmit}>
                        {t('save')}
                    </button>
                </div>
            </div>
        </>
    );
}