import React from "react";
import {CustomSelect} from "./CustomSelect";
import {NameField} from "./NameField";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {setAvailable, setDisplayOrder, setName} from "../../../../slices/categoryFormSlice";

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
        <div className={'form-wrapper'}>
            <div className={'form'}>
                <div className={'form-column left'}>
                    <div className={'form-fields-container'}>
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
                        <NameField id={"category-name"}
                                   value={name}
                                   onChange={(e) => dispatch(setName(e))}
                                   error={errorData}
                        />
                    </div>
                </div>
                <div className={'form-column right'}>
                    <div className={'form-fields-container'}>
                        <CustomSelect id={'category-available'}
                                      name={'available'}
                                      labelName={t('availability')}
                                      value={available}
                                      onChange={(e) => dispatch(setAvailable(e))}
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