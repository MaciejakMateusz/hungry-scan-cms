import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {useConfirmationMessage} from "../../../../hooks/useConfirmationMessage";
import {UserProfileForm} from "./UserProfileForm";
import {
    getUserProfile,
    setErrorData,
    setUserProfileUpdated,
    updateUserProfile
} from "../../../../slices/userProfileSlice";
import {DecisionDialog} from "../../cms/dialog-windows/DecisionDialog";
import {executeLogoutFetch} from "../../../../slices/loginFormSlice";
import {FormErrorDialog} from "../../../error/FormErrorDialog";

export const UserProfile = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const renderConfirmation = useConfirmationMessage(setUserProfileUpdated);
    const {password, newPassword, repeatedPassword} = useSelector(state => state.userProfile.form);
    const {errorData} = useSelector(state => state.userProfile.updateUserProfile);
    const [confirmLogout, setConfirmLogout] = useState(false);
    const hasChangedPassword = password && newPassword && repeatedPassword;
    const logoutPending = useSelector(state => state.login.logoutFetch.isLoading);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const resultAction = await dispatch(updateUserProfile());
        if (updateUserProfile.fulfilled.match(resultAction)) {
            await dispatch(getUserProfile());
            hasChangedPassword ? setConfirmLogout(true) : renderConfirmation();
        }
    }

    return (
        <div className={'background'}>
            {confirmLogout &&
                <DecisionDialog msg={t('userProfileUpdatedWithPassword')}
                                onSubmit={() => dispatch(executeLogoutFetch())}
                                isLoading={logoutPending}
                />}
            <FormErrorDialog errorData={errorData} setErrorData={setErrorData}/>
            <form className={'cms-padded-view-container'}>
                <div className={'functions-header'}>
                    <div className={'section-heading'}>
                        {t('userProfile')}
                    </div>
                    <div className={'flex-wrapper-gapped'}>
                        <div className={'form-footer'}>
                            <div className={'general-button'} onClick={handleFormSubmit}>
                                {t('save')}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={'form-grid'}>
                    <div className={'padded-form-fragment'}>
                        <UserProfileForm/>
                    </div>
                </div>
            </form>
        </div>
    )
}