import React, {useEffect} from "react";
import {GenericField} from "../../common/GenericField";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {
    setChosenLanguage,
    setErrorData,
    setForename,
    setNewPassword,
    setPassword,
    setRepeatedPassword,
    setSurname,
    setUsername
} from "../../../../slices/userProfileSlice";
import {useGetTranslation} from "../../../../hooks/useGetTranslation";
import {CustomSelect} from "../../cms/form-components/CustomSelect";
import {customSelect} from "../../../../selectStyles";
import {CustomNoOptionsMessage} from "../../cms/form-components/CustomNoOptionsMessage";
import {supportedLanguages} from "../../../../i18n";
import {getLanguage} from "../../../../locales/langUtils";

export const UserProfileForm = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {userData} = useSelector(state => state.userProfile.getUserProfile);
    const {errorData} = useSelector(state => state.userProfile.updateUserProfile);
    const {
        username,
        forename,
        surname,
        password,
        newPassword,
        repeatedPassword,
        chosenLanguage
    } = useSelector((state) => state.userProfile.form);
    const languages = Object.keys(supportedLanguages).map(languageKey => ({
        value: languageKey,
        label: t(languageKey)
    }));
    const getTranslation = useGetTranslation();

    useEffect(() => {
        const fillUserProfile = () => {
            if (!userData) return;
            dispatch(setUsername(userData.username));
            dispatch(setForename(userData.forename));
            dispatch(setSurname(userData.surname));
            const language = getLanguage();
            dispatch(setChosenLanguage({value: language, label: t(language)}));
        }
        fillUserProfile();
    }, [dispatch, t, userData])

    return (
        <>
            <div>
                <div className={'form-group-header'}>
                    {t('userData')}
                </div>
                <GenericField id={'username'}
                              type={'text'}
                              name={t('username')}
                              placeholder={t('typeUsername')}
                              value={username}
                              onChange={(e) => dispatch(setUsername(e))}
                              required={true}
                              readOnly={true}
                              disabled={true}
                              error={errorData}
                              errorSetter={setErrorData}
                />
                <GenericField id={'forename'}
                              type={'text'}
                              name={t('forename')}
                              placeholder={t('typeForename')}
                              value={forename}
                              onChange={(e) => dispatch(setForename(e))}
                              required={true}
                              error={errorData}
                              errorSetter={setErrorData}
                />
                <GenericField id={'surname'}
                              type={'text'}
                              name={t('surname')}
                              placeholder={t('typeSurname')}
                              value={surname}
                              onChange={(e) => dispatch(setSurname(e))}
                              required={true}
                              error={errorData}
                              errorSetter={setErrorData}
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
                                  error={errorData}
                                  errorSetter={setErrorData}
                    />
                    <GenericField id={'newPassword'}
                                  type={'password'}
                                  name={t('newPassword')}
                                  placeholder={t('typeNewPasswordField')}
                                  value={newPassword}
                                  onChange={(e) => dispatch(setNewPassword(e))}
                                  error={errorData}
                                  errorSetter={setErrorData}
                    />
                    <GenericField id={'repeatedPassword'}
                                  type={'password'}
                                  name={t('repeatPassword')}
                                  placeholder={t('repeatNewPassword')}
                                  value={repeatedPassword}
                                  onChange={(e) => dispatch(setRepeatedPassword(e))}
                                  error={errorData}
                                  errorSetter={setErrorData}
                    />
                </div>
            </div>
            <div>
                <div className={'form-group-header'}>
                    {t('settings')}
                </div>
                <CustomSelect id={'language'}
                              name={'language'}
                              labelName={t('language')}
                              isRequired={true}
                              info={t('systemLanguage')}
                              placeholder={'Wybierz język...'}
                              value={chosenLanguage}
                              onChange={(selected) => dispatch(setChosenLanguage(selected))}
                              options={languages}
                              styles={customSelect}
                              components={{NoOptionsMessage: CustomNoOptionsMessage}}
                              menuPlacement={'top'}/>
            </div>
        </>
    );
}