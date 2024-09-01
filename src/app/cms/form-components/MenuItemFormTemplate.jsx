import React from "react";
import {useTranslation} from "react-i18next";
import {CustomSelect} from "./CustomSelect";
import {NameField} from "./NameField";
import {DescriptionField} from "./DescriptionField";
import {AllergensMultiselect} from "./AllergensMultiselect";
import {AdditionsMultiselect} from "./AdditionsMultiselect";
import {LabelsMultiselect} from "./LabelsMultiselect";
import {PriceField} from "./PriceField";
import {FileUploadField} from "./FileUploadField";
import {LogicalToggleField} from "./LogicalToggleField";
import {useDispatch, useSelector} from "react-redux";
import {
    setAvailable,
    setBanner,
    setDescription,
    setFileName,
    setName,
    setPrice
} from "../../../slices/dishFormSlice";

export const MenuItemFormTemplate = ({setFile}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {
        name,
        description,
        banner,
        price,
        available,
        errorData,
    } = useSelector(state => state.dishForm.form);

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
                             setFileName={(e) => dispatch(setFileName(e))}/>
            <CustomSelect
                id={'dish-banner'}
                name={'banner'}
                labelName={t('banner')}
                value={banner}
                onChange={(selected) => dispatch(setBanner(selected))}
                placeholder={t('choose')}
                isClearable={true}
                options={[
                    {value: t('isNew'), label: t('isNew')},
                    {value: t('isBestseller'), label: t('isBestseller')}
                ]}
            />
            <LabelsMultiselect/>
            <AdditionsMultiselect/>
            <AllergensMultiselect/>
            <PriceField id={'dish-price'}
                        value={price}
                        setPrice={(e) => dispatch(setPrice(e))}
                        error={errorData}/>
            <LogicalToggleField id={'available'}
                                name={t('availability')}
                                value={available}
                                onChange={() => dispatch(setAvailable(!available))}/>
        </>
    );
}