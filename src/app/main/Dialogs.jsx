import React from "react";
import {AccountActivationLinkSent} from "./forms/register/AccountActivationLinkSent";
import {AccountActivated} from "./forms/register/AccountActivated";
import {LoginForm} from "./forms/login/LoginForm";
import {NavMenu} from "./NavMenu";
import {PasswordRecoveryLinkSent} from "./password-recovery/PasswordRecoveryLinkSent";
import {PasswordRecoveryConfirmation} from "./password-recovery/PasswordRecoveryConfirmation";

export const Dialogs = ({activeDialog}) => {

    const renderActiveForm = () => {
        switch (activeDialog) {
            case "activation":
                return (<AccountActivationLinkSent/>);
            case "accountActivated":
                return (<AccountActivated/>);
            case "recoverySent":
                return (<PasswordRecoveryLinkSent/>);
            case "recoveryConfirmation":
                return (<PasswordRecoveryConfirmation/>);
            default:
                return (<LoginForm/>);
        }
    }

    return (
        <div className={'main-page-grid'}>
            <NavMenu/>
            <div className={'main-page-content'}>
                <div className={'main-page-dialog-wrapper info'}>
                    {renderActiveForm()}
                </div>
            </div>
        </div>
    );
}