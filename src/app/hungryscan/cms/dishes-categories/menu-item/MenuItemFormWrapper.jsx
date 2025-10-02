import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {getTranslation} from "../../../../../locales/langUtils";
import {setActiveTab, setErrorMessage} from "../../../../../slices/dishFormSlice";
import {FormErrorDialog} from "../../../../error/FormErrorDialog";
import {useTranslation} from "react-i18next";

export const MenuItemFormWrapper = ({title, onFormDiscard, onFormSubmit, children}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {category} = useSelector(state => state.dishesCategories.view);
    const {activeTab} = useSelector(state => state.dishForm.form);
    const {
        errorMessage,
        errorData,
    } = useSelector(state => state.dishForm.form);


    return (
        <div className={'background'}>
            {errorMessage ? <FormErrorDialog error={errorData} resetMessage={setErrorMessage}/> : null}
            <form className={'cms-padded-view-container'}>
                <div className={'functions-header'}>
                    <div className={'section-heading'}>
                        {title}:&nbsp;&nbsp;
                        <span style={{color: '#6940C6'}}> "{getTranslation(category?.name)}"</span>
                    </div>
                    <div className={'flex-wrapper-gapped'}>
                        <div className={'form-footer'}>
                            <button className={'general-button cancel'}
                                 onClick={onFormDiscard}>
                                {t('cancel')}
                            </button>
                            <button type="submit" className={'general-button'} onClick={onFormSubmit}>
                                {t('save')}
                            </button>
                        </div>
                    </div>
                </div>
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