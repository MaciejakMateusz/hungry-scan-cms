import React from "react";
import {useTranslation} from "react-i18next";
import {NameField} from "./NameField";
import {DescriptionField} from "./DescriptionField";
import {AllergensMultiselect} from "./AllergensMultiselect";
import {AdditionsMultiselect} from "./AdditionsMultiselect";
import {LabelsMultiselect} from "./LabelsMultiselect";
import {PriceField} from "./PriceField";
import {FileUploadField} from "./FileUploadField";
import {useDispatch, useSelector} from "react-redux";
import {LogicalToggleField} from "./LogicalToggleField";
import {
    setAvailable,
    setDescription,
    setErrorData,
    setName,
    setPrice,
    setPromoPrice
} from "../../../../slices/dishFormSlice";
import {BannersMultiselect} from "./BannersMultiselect";

export const MenuItemFormTemplate = ({setFile, file}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {
        name,
        description,
        price,
        promoPrice,
        available,
        errorData,
    } = useSelector(state => state.dishForm.form);
    const {chosenBanners} = useSelector(state => state.dishForm.fetchBanners);
    const displayPromoPrice = chosenBanners?.filter(b => b.value.id === 'promo').length !== 0;

    return (
        <>
            <NameField id={'category-name'}
                       value={name}
                       onChange={(e) => dispatch(setName(e))}
                       error={errorData}
            />
            <DescriptionField value={description}
                              onChange={(e) => dispatch(setDescription(e))}
                              error={errorData}/>
            <FileUploadField setFile={setFile}
                             file={file}/>
            <BannersMultiselect/>
            <LabelsMultiselect/>
            <AdditionsMultiselect/>
            <AllergensMultiselect/>
            <div className={'form-price-fields-wrapper'}>
                <PriceField id={'price'}
                            value={price}
                            setPrice={(e) => dispatch(setPrice(e))}
                            error={errorData}
                            errorSetter={setErrorData}/>
                {displayPromoPrice &&
                    <PriceField id={'promoPrice'}
                                value={promoPrice}
                                setPrice={(e) => dispatch(setPromoPrice(e))}
                                priceLabel={t('promoPrice')}
                                error={errorData}
                                errorSetter={setErrorData}/>
                }
            </div>
            <LogicalToggleField id={'available'}
                                name={t('availability')}
                                value={available}
                                onChange={() => dispatch(setAvailable(!available))}/>
        </>
    );
}