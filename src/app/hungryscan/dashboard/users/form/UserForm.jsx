import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {FormErrorDialog} from "../../../../error/FormErrorDialog";
import {
    getOrganizationRestaurants,
    getRoles,
    setSaveUserError,
    setUpdateUserError
} from "../../../../../slices/usersSlice";
import {UserFormTemplate} from "./UserFormTemplate";
import {FormHeader} from "../../../cms/shared-components/FormHeader";

export const UserForm = ({formHeader, onFormDiscard, onFormSubmit}) => {
    const dispatch = useDispatch();
    const {isLoading} = useSelector(state => state.users.saveUser);
    const {saveUserError} = useSelector(state => state.users.saveUser);
    const {updateUserError} = useSelector(state => state.users.updateUser);

    useEffect(() => {
        dispatch(getRoles());
        dispatch(getOrganizationRestaurants());
    }, [dispatch]);

    return (
        <div className={'background'}>
            <div className={'cms-padded-view-container'}>
                <FormErrorDialog errorData={saveUserError} setErrorData={setSaveUserError}/>
                <FormErrorDialog errorData={updateUserError} setErrorData={setUpdateUserError}/>
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