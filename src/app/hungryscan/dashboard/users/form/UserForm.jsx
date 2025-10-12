import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {FormErrorDialog} from "../../../../error/FormErrorDialog";
import {getOrganizationRestaurants, getRoles, setErrorData} from "../../../../../slices/usersSlice";
import {UserFormTemplate} from "./UserFormTemplate";
import {FormHeader} from "../../../cms/shared-components/FormHeader";

export const UserForm = ({formHeader, onFormDiscard, onFormSubmit}) => {
    const dispatch = useDispatch();
    const {errorData} = useSelector(state => state.users.form);
    const {isLoading} = useSelector(state => state.users.saveUser);

    useEffect(() => {
        dispatch(getRoles());
        dispatch(getOrganizationRestaurants());
    }, [dispatch]);

    return (
        <div className={'background'}>
            <div className={'cms-padded-view-container'}>
                {errorData && <FormErrorDialog error={errorData}
                                                  resetMessage={() => dispatch(setErrorData(null))}/>}
                <FormHeader formHeader={formHeader}
                            onFormSubmit={onFormSubmit}
                            onFormDiscard={onFormDiscard}
                            isLoading={isLoading}
                />
                <div className={'form-grid'}>
                    <form className={'padded-form-fragment'}>
                        <UserFormTemplate/>
                    </form>
                </div>
            </div>
        </div>
    );
}