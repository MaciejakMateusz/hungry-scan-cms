import React from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {setAvailable, setDisplayOrder, setName} from "../../../../slices/categoryFormSlice";
import {LogicalToggleField} from "../../form-components/LogicalToggleField";
import {NameField} from "../../form-components/NameField";
import {CustomSelect} from "../../form-components/CustomSelect";

export const CategoryFormTemplate = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {
        name,
        available,
        displayOrder,
        displayOrders,
        errorData} = useSelector(state => state.categoryForm.form);

    return (
        <>
            <NameField id={"category-name"}
                       value={name}
                       onChange={(e) => dispatch(setName(e))}
                       error={errorData}
            />
            <CustomSelect id={'category-display-order'}
                          name={'displayOrder'}
                          labelName={t('displayOrder')}
                          value={displayOrder}
                          onChange={(e) => dispatch(setDisplayOrder(e))}
                          options={displayOrders.map(displayOrder => ({
                              value: displayOrder,
                              label: displayOrder
                          }))}
            />
            <LogicalToggleField id={'available'}
                                name={t('availability')}
                                value={available}
                                onChange={() => dispatch(setAvailable(!available))}/>
        </>
    );
}