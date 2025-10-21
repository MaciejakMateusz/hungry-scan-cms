import React from "react";
import {CategoryFormTemplate} from "./CategoryFormTemplate";
import {useSelector} from "react-redux";
import {FormErrorDialog} from "../../../../error/FormErrorDialog";
import {FormHeader} from "../../shared-components/FormHeader";
import {setErrorData} from "../../../../../slices/categoryFormSlice";

export const CategoryForm = ({formHeader, onFormDiscard, onFormSubmit}) => {
    const {errorData} = useSelector(state => state.categoryForm.form);
    const {isLoading} = useSelector(state => state.categoryForm.postCategory);

    return (
        <div className={'background'}>
            <div className={'cms-padded-view-container'}>
                <FormErrorDialog errorData={errorData} setErrorData={setErrorData}/>
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