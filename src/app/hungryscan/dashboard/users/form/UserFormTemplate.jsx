import React from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {GenericField} from "../../../common/GenericField";
import {
    setActive,
    setChosenRestaurants,
    setChosenRoles,
    setForename,
    setSurname,
    setUsername
} from "../../../../../slices/usersSlice";
import {CustomSelect} from "../../../cms/form-components/CustomSelect";
import makeAnimated from "react-select/animated";
import {LogicalToggleField} from "../../../cms/form-components/LogicalToggleField";


export const UserFormTemplate = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {
        username,
        forename,
        surname,
        chosenRestaurants,
        chosenRoles,
        active,
        errorData
    } = useSelector(state => state.users.form);
    const {editUserFormActive} = useSelector(state => state.users.view);
    const {restaurants} = useSelector(state => state.users.getRestaurants);
    const {roles} = useSelector(state => state.users.getRoles);
    const animatedComponents = makeAnimated();

    return (
        <>
            <GenericField id={'username'}
                          type={'text'}
                          name={t('login')}
                          placeholder={t('typeUsername')}
                          value={username}
                          onChange={(e) => dispatch(setUsername(e))}
                          required={true}
                          readOnly={editUserFormActive}
                          disabled={editUserFormActive}
                          error={errorData?.username}
                          tooltip={t('usernameTooltip')}
            />
            <GenericField id={'forename'}
                          type={'text'}
                          name={t('forename')}
                          placeholder={t('typeForename')}
                          value={forename}
                          onChange={(e) => dispatch(setForename(e))}
                          required={true}
                          error={errorData?.forename}
            />
            <GenericField id={'surname'}
                          type={'text'}
                          name={t('surname')}
                          placeholder={t('typeSurname')}
                          value={surname}
                          onChange={(e) => dispatch(setSurname(e))}
                          required={true}
                          error={errorData?.surname}
            />
            <CustomSelect id={'user-restaurants'}
                          name={'restaurants'}
                          labelName={t('restaurants')}
                          value={chosenRestaurants}
                          onChange={(selected) => dispatch(setChosenRestaurants(selected))}
                          placeholder={t('choose')}
                          isClearable={true}
                          isMulti={true}
                          options={restaurants}
                          components={animatedComponents}
                          closeMenuOnSelect={true}
                          isRequired={true}
            />
            <CustomSelect id={'user-roles'}
                          name={'roles'}
                          labelName={t('roles')}
                          value={chosenRoles}
                          onChange={(selected) => dispatch(setChosenRoles(selected))}
                          placeholder={t('choose')}
                          isClearable={true}
                          isMulti={true}
                          options={roles}
                          components={animatedComponents}
                          closeMenuOnSelect={false}
                          isRequired={true}
            />
            <LogicalToggleField id={'active'}
                                name={t('active')}
                                value={active}
                                onChange={() => dispatch(setActive(!active))}
                                customMessageFalse={t('userInactive')}
                                customMessageTrue={t('userActive')}/>
        </>
    );
}