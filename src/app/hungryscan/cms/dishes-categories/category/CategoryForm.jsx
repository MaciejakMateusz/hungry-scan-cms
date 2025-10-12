import React from "react";
import {CategoryFormTemplate} from "./CategoryFormTemplate";
import {useDispatch, useSelector} from "react-redux";
import {setErrorMessage} from "../../../../../slices/categoryFormSlice";
import {FormErrorDialog} from "../../../../error/FormErrorDialog";
import {FormHeader} from "../../shared-components/FormHeader";

export const CategoryForm = ({formHeader, onFormDiscard, onFormSubmit}) => {
    const dispatch = useDispatch();
    const {errorData, errorMessage} = useSelector(state => state.categoryForm.form);
    const {isLoading} = useSelector(state => state.categoryForm.postCategory);

    return (
        <div className={'background'}>
            <div className={'cms-padded-view-container'}>
                {errorMessage && <FormErrorDialog error={errorData}
                                                  resetMessage={() => dispatch(setErrorMessage(null))}/>}
                <FormHeader formHeader={formHeader}
                            onFormSubmit={onFormSubmit}
                            onFormDiscard={onFormDiscard}
                            isLoading={isLoading}
                />
                <div className={'form-grid category'}>
                    <form className={'padded-form-fragment'}>
                        <CategoryFormTemplate/>
                    </form>
                </div>
            </div>
        </div>
    );
}