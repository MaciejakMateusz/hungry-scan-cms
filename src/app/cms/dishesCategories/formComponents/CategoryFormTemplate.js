import React from "react";
import {CustomSelect} from "./CustomSelect";
import {NameField} from "./NameField";
import {useTranslation} from "react-i18next";

export const CategoryFormTemplate = (props) => {
    const {t} = useTranslation();

    return (
        <div className={'form-wrapper'}>
            <div className={'form'}>
                <div className={'form-column left'}>
                    <div className={'form-fields-container'}>
                        <CustomSelect id={'category-display-order'}
                                      name={'displayOrder'}
                                      labelName={t('displayOrder')}
                                      value={props.form.displayOrder}
                                      onChange={props.displayOrderChange}
                                      options={props.displayOrders.map(displayOrder => ({
                                          value: displayOrder,
                                          label: displayOrder
                                      }))}
                        />
                        <NameField id={"category-name"}
                                   value={props.form.name}
                                   onChange={props.inputChange}
                                   error={props.errorData.name}
                        />
                    </div>
                </div>
                <div className={'form-column right'}>
                    <div className={'form-fields-container'}>
                        <CustomSelect id={'category-available'}
                                      name={'available'}
                                      labelName={t('availability')}
                                      value={props.form.available}
                                      onChange={props.availableChange}
                                      options={[
                                          {value: true, label: t('availableCategory')},
                                          {value: false, label: t('unavailableCategory')}
                                      ]}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}