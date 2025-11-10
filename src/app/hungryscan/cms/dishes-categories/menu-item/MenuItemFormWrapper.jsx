import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {setActiveTab, setErrorData} from "../../../../../slices/dishFormSlice";
import {FormErrorDialog} from "../../../../error/FormErrorDialog";
import {useTranslation} from "react-i18next";
import {FormHeader} from "../../shared-components/FormHeader";

export const MenuItemFormWrapper = ({title, onFormDiscard, onFormSubmit, children}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {restaurant} = useSelector(state => state.dashboard.view);
    const restaurantLanguage = restaurant?.value.settings.language.toLowerCase();
    const {category} = useSelector(state => state.dishesCategories.view);
    const {isLoading} = useSelector(state => state.dishForm.postDish);
    const {activeTab} = useSelector(state => state.dishForm.form);
    const {errorData} = useSelector(state => state.dishForm.form);

    const FormTitle = () => {
        return (
            <div className={'text-ellipsis'} style={{maxWidth: '50vw'}}>
                {title}:&nbsp;&nbsp;
                <span style={{color: '#6940C6'}}> {category?.name[restaurantLanguage]}</span>
            </div>
        );
    }

    return (
        <div className={'background'}>
            <FormErrorDialog errorData={errorData} setErrorData={setErrorData}/>
            <form className={'cms-padded-view-container'}>
                <FormHeader formHeader={<FormTitle/>}
                            onFormSubmit={onFormSubmit}
                            onFormDiscard={onFormDiscard}
                            isLoading={isLoading}
                />
                <div className={'menu-item-form-tabs-container'}>
                    <div id={'menu-item-info-tab'}
                         className={`menu-item-form-tab ${activeTab === 'information' && 'active'}`}
                         onClick={() => dispatch(setActiveTab('information'))}>
                        {t('information')}
                    </div>
                    <div id={'menu-item-variants-tab'}
                         className={`menu-item-form-tab ${activeTab === 'variants' && 'active'}`}
                         onClick={() => dispatch(setActiveTab('variants'))}>
                        {t('variants')}
                    </div>
                </div>
                <div className={'form-grid'}>
                    <div className={'padded-form-fragment menu-item'}>
                        <div className={'padded-form-container'}>
                            {children}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}