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

export const DishFormTemplate = (props) => {
    const {t} = useTranslation();

    return (
        <div className={'form-wrapper'}>
            <div className={'form'}>
                <div className={'form-column left'}>
                    <div className={'form-fields-container'}>
                        <CustomSelect id={"dish-category"}
                                      name={"category"}
                                      labelName={t('category')}
                                      value={props.chosenCategory}
                                      options={props.categories.map(category => {
                                          return {value: category, label: getTranslation(category.name)}
                                      })}
                                      placeholder={t('choose')}
                                      onChange={(selectedOption) => props.handleCategoryChange(selectedOption)}
                                      error={props.errorData.categoryId}
                        />
                        <CustomSelect id={'category-display-order'}
                                      name={'displayOrder'}
                                      labelName={t('displayOrder')}
                                      isDisabled={!props.chosenCategory}
                                      value={props.form.displayOrder}
                                      onChange={props.handleDisplayOrderChange}
                                      placeholder={props.chosenCategory ? t('choose') : t('noCategoryChosen')}
                                      options={props.displayOrders.map(displayOrder => {
                                          return {value: displayOrder, label: displayOrder}
                                      })}
                        />
                        <CustomSelect
                            id={'dish-banner'}
                            name={'banner'}
                            labelName={t('banner')}
                            isOptional={true}
                            value={props.form.banner}
                            onChange={props.handleBannersChange}
                            placeholder={t('choose')}
                            isClearable={true}
                            options={[
                                {value: t('isNew'), label: t('isNew')},
                                {value: t('isBestseller'), label: t('isBestseller')}
                            ]}
                        />
                        <NameField id={'category-name'}
                                   value={props.form.name}
                                   onChange={props.handleInputChange}
                                   error={props.errorData.name}
                        />
                        <LabelsMultiselect labels={props.labels}
                                           iconPath={props.getIconPath}
                                           onClick={props.handleLabelsChange}/>
                        <DescriptionField value={props.form.description}
                                          onChange={props.handleInputChange}/>
                        <AllergensMultiselect allergens={props.allergens}
                                              iconPath={props.getIconPath}
                                              onClick={props.handleAllergensChange}/>
                    </div>
                </div>
                <div className={'form-column right'}>
                    <div className={'form-fields-container'}>
                        <AdditionalIngredientsMultiselect onClick={props.setIsAdditionsViewActive}
                                                          chosenAdditions={props.chosenAdditions}/>
                        <PriceField id={'dish-price'}
                                    value={props.form.price}
                                    onChange={props.handleInputChange}/>
                        <FileUploadField file={props.file}
                                         onChange={props.handleFileChange}
                                         onClick={props.removeFile}
                                         fileName={props.fileName}/>
                        <CustomSelect
                            id={'dish-available'}
                            name={'available'}
                            labelName={t('availability')}
                            value={props.form.available}
                            onChange={props.handleAvailableChange}
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