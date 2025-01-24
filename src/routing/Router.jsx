import React from 'react';
import '../index.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {MainPage} from "../app/main/MainPage";
import {ErrorPage} from "../app/error/ErrorPage";
import {useTranslation} from "react-i18next";
import {AnonymousRoutes} from "./AnonymousRoutes";
import {Dialogs} from "../app/main/Dialogs";
import {Forms} from "../app/main/forms/Forms";
import {PrivateRoutes} from "./PrivateRoutes";
import {CreateFirstRestaurant} from "../app/main/CreateFirstRestaurant";
import {App} from "../app/hungryscan/App";

export const Router = () => {
    const {t} = useTranslation();
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<MainPage activeView={'home'}/>}/>
                <Route path='/our-offer' element={<MainPage activeView={'ourOffer'}/>}/>
                <Route path='/price-plans' element={<MainPage activeView={'pricePlans'}/>}/>
                <Route path='/about-us' element={<MainPage activeView={'aboutUs'}/>}/>
                <Route path='/contact' element={<MainPage activeView={'contact'}/>}/>
                <Route path='/server-down' element={<ErrorPage h4={t('connectionError')}
                                                               p={t('serverUnderMaintenance')}/>}/>
                <Route path='*' element={<ErrorPage code={'404'}
                                                    h4={t('oops')}
                                                    p={t('pageNotFound')}/>}/>
                <Route element={<AnonymousRoutes/>}>
                    <Route path='/activation' element={<Dialogs activeDialog={'activation'}/>}/>
                    <Route path='/activation-error' element={<Forms activeForm={'activationError'}/>}/>
                    <Route path='/account-activated' element={<Dialogs activeDialog={'accountActivated'}/>}/>
                    <Route path='/sign-in' element={<Forms activeForm={'signIn'}/>}/>
                    <Route path='/sign-up' element={<Forms activeForm={'signUp'}/>}/>
                    <Route path='/password-recovery' element={<Forms activeForm={"forgotPassword"}/>}/>
                    <Route path='/new-password' element={<Forms activeForm={"newPassword"}/>}/>
                    <Route path='/recovery-sent' element={<Dialogs activeDialog={'recoverySent'}/>}/>
                    <Route path='/recovery-confirmation' element={<Dialogs activeDialog={'recoveryConfirmation'}/>}/>
                </Route>
                <Route element={<PrivateRoutes/>}>
                    <Route path='/create-restaurant' element={<CreateFirstRestaurant/>}/>
                    <Route path='/app' element={<App/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}