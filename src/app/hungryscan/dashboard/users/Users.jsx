import React, {useEffect} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {getUsers, setNewUserFormActive} from "../../../../slices/usersSlice";
import {UsersList} from "./UsersList";
import {SearchButton} from "../../cms/dishes-categories/SearchButton";
import {NewUserForm} from "./form/NewUserForm";
import {EditUserForm} from "./form/EditUserForm";

export const Users = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {newUserFormActive, editUserFormActive} = useSelector(state => state.users.view);

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    if (newUserFormActive) {
        return (<NewUserForm/>);
    } else if (editUserFormActive) {
        return (<EditUserForm/>);
    }

    return (
        <div className={'background'}>
            <div className={'cms-padded-view-container'}>
                <div className={'functions-header'}>
                    <div className={'section-heading'}>{t('users')}</div>
                    <div className={'flex-wrapper-gapped'}>
                        <div className={'general-button-new'}
                             onClick={() => dispatch(setNewUserFormActive(true))}>
                            + &nbsp;{t('addUser')}
                        </div>
                        <SearchButton filterExpanded={false}
                                      onExpand={() => {
                                      }}
                                      filterValue={''}
                                      onSubmit={() => {
                                      }}
                                      onClear={() => {
                                      }}
                        />
                    </div>
                </div>
                <div className={'form-grid'}>
                    <div className={'padded-form-fragment'}>
                        <UsersList/>
                    </div>
                </div>
            </div>
        </div>
    );
}