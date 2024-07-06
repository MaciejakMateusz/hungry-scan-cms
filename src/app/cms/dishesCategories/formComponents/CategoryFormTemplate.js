import React from "react";
import {CustomSelect} from "./CustomSelect";
import {NameField} from "./NameField";
import {useTranslation} from "react-i18next";

export const CategoryFormTemplate = (props) => {
    const {t} = useTranslation();

    return (
        <div className="form-wrapper">
            <div className="form">
                <CustomSelect id={"category-display-order"}
                              name={"displayOrder"}
                              labelName={t('displayOrder')}
                              value={props.form.displayOrder}
                              onChange={props.displayOrderChange}
                              options={props.displayOrders.map(displayOrder => ({
                                  value: displayOrder,
                                  label: displayOrder
                              }))}
                />
                <CustomSelect id={"category-available"}
                              name={"available"}
                              labelName={t('availability')}
                              value={props.form.available}
                              onChange={props.availableChange}
                              options={[
                                  {value: true, label: t('availableCategory')},
                                  {value: false, label: t('unavailableCategory')}
                              ]}
                />
                <NameField id={"category-name"}
                           value={props.form.name}
                           onChange={props.inputChange}
                />
                {props.errorData.name && <span className="validation-msg">{props.errorData.name}</span>}
            </div>
        </div>
    );
}