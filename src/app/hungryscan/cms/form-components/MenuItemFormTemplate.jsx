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
import {setAvailable, setDescription, setFileName, setName, setPrice} from "../../../../slices/dishFormSlice";
import {BannersMultiselect} from "./BannersMultiselect";

export const MenuItemFormTemplate = ({setFile}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {
        name,
        description,
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
            <BannersMultiselect/>
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