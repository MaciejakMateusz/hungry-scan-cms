import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {FormErrorDialog} from "../../../../error/FormErrorDialog";
import {
    getOrganizationRestaurants,
    getRoles, setRoles,
    setSaveUserError,
    setUpdateUserError
} from "../../../../../slices/usersSlice";
import {UserFormTemplate} from "./UserFormTemplate";
import {FormHeader} from "../../../cms/shared-components/FormHeader";
import {useGetTranslation} from "../../../../../hooks/useGetTranslation";

export const UserForm = ({formHeader, onFormDiscard, onFormSubmit}) => {
    const dispatch = useDispatch();
    const {isLoading: savePending} = useSelector(state => state.users.saveUser);
    const {saveUserError} = useSelector(state => state.users.saveUser);
    const {updateUserError, isLoading: updatePending} = useSelector(state => state.users.updateUser);
    const getTranslation = useGetTranslation();
    const isLoading = savePending || updatePending;

    useEffect(() => {
        const fetchRoles = async () => {
            const rolesAction = await dispatch(getRoles());
            if (getRoles.fulfilled.match(rolesAction)) {
                dispatch(setRoles(rolesAction.payload
                    .filter(role => !role.name.includes('CUSTOMER'))
                    .map(role => ({
                        value: role,
                        label: getTranslation(role.displayedName)
                    }))));
            }
        }
        fetchRoles();
        dispatch(getOrganizationRestaurants());
    }, [dispatch, getTranslation]);

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