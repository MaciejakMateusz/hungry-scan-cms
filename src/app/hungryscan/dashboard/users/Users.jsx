import React, {useEffect} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {
    clearForm,
    getUsers,
    setFilterExpanded,
    setFilteringActive,
    setFilterValue,
    setNewUserFormActive,
    setRemovalError,
    setUsers
} from "../../../../slices/usersSlice";
import {UsersList} from "./UsersList";
import {SearchButton} from "../../cms/dishes-categories/SearchButton";
import {NewUserForm} from "./form/NewUserForm";
import {EditUserForm} from "./form/EditUserForm";
import {FormErrorDialog} from "../../../error/FormErrorDialog";
import {clearProfileForm} from "../../../../slices/userProfileSlice";
import {filter} from "../../../../slices/filteringSlice";
import {setIsInEditMode} from "../../../../slices/globalParamsSlice";

export const Users = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {
        newUserFormActive,
        editUserFormActive,
        filterExpanded,
        filterValue
    } = useSelector(state => state.users.view);
    const {removalError} = useSelector(state => state.users.removeUser);

    useEffect(() => {
        dispatch(getUsers());
        dispatch(clearForm());
        dispatch(clearProfileForm());
    }, [dispatch]);

    useEffect(() => {
        if (!filterExpanded && filterValue !== '') {
            dispatch(setFilterValue(''));
            executeFilter('');
        }
    }, [dispatch, filterExpanded, filterValue]);

    const handleSearchSubmit = async (e) => {
        e.preventDefault()
        dispatch(setFilterValue(e.target.value));
        await executeFilter(e.target.value);
    }

    const executeFilter = async value => {
        if ('' !== value) {
            const resultAction = await dispatch(filter({path: 'admin/users', value: value}));
            if (filter.fulfilled.match(resultAction)) {
                dispatch(setUsers(resultAction.payload));
            }
        } else {
            dispatch(getUsers());
        }
    }

    if (newUserFormActive) {
        return (<NewUserForm executeFilter={executeFilter}/>);
    } else if (editUserFormActive) {
        return (<EditUserForm executeFilter={executeFilter}/>);
    }

    return (
        <div className={'background'}>
            <FormErrorDialog errorData={removalError} setErrorData={setRemovalError}/>
            <div className={'cms-padded-view-container'}>
                <div className={'functions-header'}>
                    <div className={'section-heading'}>{t('users')}</div>
                    <div className={'flex-wrapper-gapped'}>
                        <div className={'general-button-new'}
                             onClick={() => {
                                 dispatch(setNewUserFormActive(true));
                                 dispatch(setIsInEditMode(true));
                             }}>
                            + {t('addUser')}
                        </div>
                        <SearchButton filterExpanded={filterExpanded}
                                      onExpand={() => dispatch(setFilterExpanded(!filterExpanded))}
                                      filterValue={filterValue}
                                      onSubmit={handleSearchSubmit}
                                      onClear={() => {
                                          dispatch(setFilterValue(''));
                                          dispatch(getUsers());
                                      }}
                        />
                    </div>
                </div>
                <div className={'form-grid'}>
                    <div className={'padded-form-fragment users'}>
                        <UsersList executeFilter={executeFilter}/>
                    </div>
                </div>
            </div>
        </div>
    );
}