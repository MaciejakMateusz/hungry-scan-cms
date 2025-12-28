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
import {CustomNoOptionsMessage} from "../../../cms/form-components/CustomNoOptionsMessage";
import {useMergeUniqueOptions} from "../../../../../hooks/useMergeUniqueOptions";


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
    const mergedRoles = useMergeUniqueOptions({chosenOptions: chosenRoles, options: roles});
    const mergedRestaurants = useMergeUniqueOptions({chosenOptions: chosenRestaurants, options: restaurants});

    return (
        <>
            <GenericField id={'username'}
                          type={'text'}
                          name={t('login')}
                          placeholder={t('typeUsername')}
                          value={username}
                          onChange={(e) => dispatch(setUsername(e.target.value))}
                          required={true}
                          readOnly={editUserFormActive}
                          disabled={editUserFormActive}
                          error={errorData}
                          tooltip={t('usernameTooltip')}
            />
            <GenericField id={'forename'}
                          type={'text'}
                          name={t('forename')}
                          placeholder={t('typeForename')}
                          value={forename}
                          onChange={(e) => dispatch(setForename(e.target.value))}
                          required={true}
                          error={errorData}
            />
            <GenericField id={'surname'}
                          type={'text'}
                          name={t('surname')}
                          placeholder={t('typeSurname')}
                          value={surname}
                          onChange={(e) => dispatch(setSurname(e.target.value))}
                          required={true}
                          error={errorData}
            />
            <CustomSelect id={'restaurants'}
                          name={'restaurants'}
                          labelName={t('restaurants')}
                          value={chosenRestaurants}
                          onChange={(selected) => dispatch(setChosenRestaurants(selected))}
                          placeholder={t('choose')}
                          isClearable={true}
                          isMulti={true}
                          options={mergedRestaurants}
                          components={{...animatedComponents, NoOptionsMessage: CustomNoOptionsMessage}}
                          isRequired={true}
                          error={errorData}
            />
            <CustomSelect id={'roles'}
                          name={'roles'}
                          labelName={t('roles')}
                          value={chosenRoles}
                          onChange={(selected) => dispatch(setChosenRoles(selected))}
                          placeholder={t('choose')}
                          isClearable={true}
                          isMulti={true}
                          options={mergedRoles}
                          components={{...animatedComponents, NoOptionsMessage: CustomNoOptionsMessage}}
                          closeMenuOnSelect={false}
                          isRequired={true}
                          error={errorData}
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