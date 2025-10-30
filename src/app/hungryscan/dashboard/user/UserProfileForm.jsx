import React, {useEffect} from "react";
import {GenericField} from "../../common/GenericField";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {
    setForename,
    setNewPassword,
    setPassword,
    setRepeatedPassword,
    setSurname,
    setUsername
} from "../../../../slices/userProfileSlice";
import {FormErrorDialog} from "../../../error/FormErrorDialog";
import {getTranslation} from "../../../../locales/langUtils";

export const UserProfileForm = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {userData} = useSelector(state => state.userProfile.getUserProfile);
    const {
        username,
        forename,
        surname,
        password,
        newPassword,
        repeatedPassword,
        errorData
    } = useSelector((state) => state.userProfile.form);

    useEffect(() => {
        const fillUserProfile = () => {
            if (!userData) return;
            dispatch(setUsername(userData.username));
            dispatch(setForename(userData.forename));
            dispatch(setSurname(userData.surname));
        }
        fillUserProfile();
    }, [dispatch, userData])

    return (
        <>
            {errorData && <FormErrorDialog error={errorData}
                                           resetMessage={() => {
                                           }}/>}
            <div>
                <div className={'form-group-header'}>
                    {t('userData')}
                </div>
                <GenericField id={'profileUsername'}
                              type={'text'}
                              name={t('username')}
                              placeholder={t('typeUsername')}
                              value={username}
                              onChange={(e) => dispatch(setUsername(e))}
                              required={true}
                              readOnly={true}
                              disabled={true}
                              error={errorData?.username}
                />
                <GenericField id={'profileForename'}
                              type={'text'}
                              name={t('forename')}
                              placeholder={t('typeForename')}
                              value={forename}
                              onChange={(e) => dispatch(setForename(e))}
                              required={true}
                              error={errorData?.forename}
                />
                <GenericField id={'profileSurname'}
                              type={'text'}
                              name={t('surname')}
                              placeholder={t('typeSurname')}
                              value={surname}
                              onChange={(e) => dispatch(setSurname(e))}
                              required={true}
                              error={errorData?.surname}
                />
                <GenericField id={'roles'}
                              type={'text'}
                              name={t('roles')}
                              placeholder={''}
                              value={userData?.roles.map(role => getTranslation(role.displayedName)).join(', ')}
                              onChange={() => {}}
                              readOnly={true}
                              disabled={true}
                />
            </div>
            <div>
                <div className={'form-group-header'}>
                    {t('changePassword')}
                </div>
                <div>
                    <GenericField id={'password'}
                                  type={'password'}
                                  name={t('oldPassword')}
                                  placeholder={t('typeOldPassword')}
                                  value={password}
                                  onChange={(e) => dispatch(setPassword(e))}
                                  error={errorData?.password}
                    />
                    <GenericField id={'new-password'}
                                  type={'password'}
                                  name={t('newPassword')}
                                  placeholder={t('typeNewPasswordField')}
                                  value={newPassword}
                                  onChange={(e) => dispatch(setNewPassword(e))}
                                  error={errorData?.newPassword}
                    />
                    <GenericField id={'repeated-new-password'}
                                  type={'password'}
                                  name={t('repeatPassword')}
                                  placeholder={t('repeatNewPassword')}
                                  value={repeatedPassword}
                                  onChange={(e) => dispatch(setRepeatedPassword(e))}
                                  error={errorData?.repeatedPassword}
                    />
                </div>
            </div>
        </>
    );
}