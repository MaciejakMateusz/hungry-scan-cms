import React from "react";
import {LoginForm} from "./login/LoginForm";
import {RegisterForm} from "./register/RegisterForm";
import {PasswordRecovery} from "../password-recovery/PasswordRecovery";
import {NewPassword} from "../password-recovery/NewPassword";
import {NavMenu} from "../NavMenu";
import {ActivationError} from "./register/ActivationError";

export const Forms = ({activeForm}) => {

    const renderActiveForm = () => {
        switch (activeForm) {
            case "signIn":
                return (<LoginForm/>);
            case "signUp":
                return (<RegisterForm/>);
            case "forgotPassword":
                return (<PasswordRecovery/>);
            case "newPassword":
                return (<NewPassword/>);
            case "activationError":
                return (<ActivationError/>);
            default:
                return (<LoginForm/>);
        }
    }

    return (
        <div className={'main-page-grid'}>
            <NavMenu/>
            <div className={'main-page-content'}>
                <div className={'main-page-dialog-wrapper'}>
                    {renderActiveForm()}
                </div>
            </div>
        </div>
    );
}