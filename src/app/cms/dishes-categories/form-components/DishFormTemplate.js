import React from "react";
import {useTranslation} from "react-i18next";
import {CustomSelect} from "./CustomSelect";
import {getTranslation} from "../../../../locales/langUtils";
import {NameField} from "./NameField";
import {LabelsMultiselect} from "./LabelsMultiselect";
import {DescriptionField} from "./DescriptionField";
import {AllergensMultiselect} from "./AllergensMultiselect";
import {AdditionalIngredientsMultiselect} from "./AdditionalIngredientsMultiselect";
import {PriceField} from "./PriceField";
import {FileUploadField} from "./FileUploadField";
import {useDispatch, useSelector} from "react-redux";
import {
    setAvailable,
    setBanner,
    setCategory,
    setDescription,
    setDisplayOrder,
    setFileName,
    setName,
    setPrice
} from "../../../../slices/dishFormSlice";

export const DishFormTemplate = ({setFile, isNewDish}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {
        name,
        description,
        category,
        banner,
        price,
        available,
        displayOrder,
        displayOrders,
        errorData,
    } = useSelector(state => state.dishForm.form);
    const {categories} = useSelector(state => state.dishesCategories.view)

    return (
        <div className={'form-wrapper'}>
            <div className={'form'}>
                <div className={'form-column left'}>
                    <div className={'form-fields-container'}>
                        <CustomSelect id={"dish-category"}
                                      name={"category"}
                                      labelName={t('category')}
                                      value={category}
                                      options={categories.map(category => {
                                          return {value: category, label: getTranslation(category.name)}
                                      })}
                                      placeholder={t('choose')}
                                      onChange={(selected) => dispatch(setCategory({category: selected, isNew: isNewDish}))}
                                      error={errorData}
                        />
                        <CustomSelect id={'category-display-order'}
                                      name={'displayOrder'}
                                      labelName={t('displayOrder')}
                                      isDisabled={!category}
                                      value={displayOrder}
                                      onChange={(selected) => dispatch(setDisplayOrder(selected))}
                                      placeholder={category ? t('choose') : t('noCategoryChosen')}
                                      options={displayOrders.map(displayOrder => {
                                          return {value: displayOrder, label: displayOrder}
                                      })}
                        />
                        <CustomSelect
                            id={'dish-banner'}
                            name={'banner'}
                            labelName={t('banner')}
                            isOptional={true}
                            value={banner}
                            onChange={(selected) => dispatch(setBanner(selected))}
                            placeholder={t('choose')}
                            isClearable={true}
                            options={[
                                {value: t('isNew'), label: t('isNew')},
                                {value: t('isBestseller'), label: t('isBestseller')}
                            ]}
                        />
                        <NameField id={'category-name'}
                                   value={name}
                                   onChange={(e) => dispatch(setName(e))}
                                   error={errorData}
                        />
                        <LabelsMultiselect/>
                        <DescriptionField value={description}
                                          onChange={(e) => dispatch(setDescription(e))}
                                          error={errorData}/>
                        <AllergensMultiselect/>
                    </div>
                </div>
                <div className={'form-column right'}>
                    <div className={'form-fields-container'}>
                        <AdditionalIngredientsMultiselect/>
                        <PriceField id={'dish-price'}
                                    value={price}
                                    setPrice={(e) => dispatch(setPrice(e))}
                                    error={errorData}/>
                        <FileUploadField setFile={setFile}
                                         setFileName={(e) => dispatch(setFileName(e))}/>
                        <CustomSelect
                            id={'dish-available'}
                            name={'available'}
                            labelName={t('availability')}
                            value={available}
                            onChange={(selected) => dispatch(setAvailable(selected))}
                            options={[
                                {value: true, label: t('availableDish')},
                                {value: false, label: t('unavailableDish')}
                            ]}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}