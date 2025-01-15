import React from 'react';
import '../index.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {PrivateRoutes} from "./PrivateRoutes";
import {ErrorPage} from "../app/error/ErrorPage";
import {CmsPage} from "../app/cms/CmsPage";
import {MainPage} from "../app/main/MainPage";
import {AccountActivationLinkSent} from "../app/main/forms/register/AccountActivationLinkSent";
import {PasswordRecoveryConfirmation} from "../app/main/password-recovery/PasswordRecoveryConfirmation";
import {PasswordRecoveryLinkSent} from "../app/main/password-recovery/PasswordRecoveryLinkSent";
import {AccountActivated} from "../app/main/forms/register/AccountActivated";

export const Router = () => {
    //todo do obsługi ścieżka activation-error
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<MainPage/>}/>
                <Route path='/password-recovery' element={<MainPage mode={"forgotPassword"}/>}/>
                <Route path='/new-password' element={<MainPage mode={"newPassword"}/>}/>
                <Route path='/activation' element={<AccountActivationLinkSent/>}/>
                <Route path='/activation-error' element={<p>Wystąpił błąd przy aktywacji konta</p>}/>
                <Route path='/account-activated' element={<AccountActivated/>}/>
                <Route path='/recovery-sent' element={<PasswordRecoveryLinkSent/>}/>
                <Route path='/recovery-confirmation' element={<PasswordRecoveryConfirmation/>}/>
                <Route element={<PrivateRoutes/>}>
                    <Route path='/cms' element={<CmsPage/>}/>
                    <Route path='/create-restaurant' element={<><p>Stwórz restauracje</p></>}/>
                </Route>
                <Route path='*' element={<ErrorPage title={'Nie znaleziono strony'}
                                                    message={'Strona z podanym adresem nie istnieje w tej domenie.'}/>}/>
            </Routes>
        </BrowserRouter>
    )
}