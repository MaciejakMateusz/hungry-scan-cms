import React from 'react';
import '../index.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {PrivateRoutes} from "./PrivateRoutes";
import {ErrorPage} from "../app/error/ErrorPage";
import {CmsPage} from "../app/cms/CmsPage";
import {MainPage} from "../app/main/MainPage";
import {Forms} from "../app/main/forms/Forms";
import {Dialogs} from "../app/main/Dialogs";
import {CreateFirstRestaurant} from "../app/main/CreateFirstRestaurant";
import {Dashboard} from "../app/dashboard/Dashboard";
import {useTranslation} from "react-i18next";
import {AnonymousRoutes} from "./AnonymousRoutes";

export const Router = () => {
    const {t} = useTranslation();
    //todo do obsługi ścieżka activation-error
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<MainPage activeView={'home'}/>}/>
                <Route path='/our-offer' element={<MainPage activeView={'ourOffer'}/>}/>
                <Route path='/price-plans' element={<MainPage activeView={'pricePlans'}/>}/>
                <Route path='/about-us' element={<MainPage activeView={'aboutUs'}/>}/>
                <Route path='/contact' element={<MainPage activeView={'contact'}/>}/>
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
                    <Route path='/cms' element={<CmsPage/>}/>
                    <Route path='/dashboard' element={<Dashboard/>}/>
                    <Route path='/create-restaurant' element={<CreateFirstRestaurant/>}/>
                </Route>
                <Route path='*' element={<ErrorPage code={'404'}
                                                    h4={t('oops')}
                                                    p={t('pageNotFound')}/>}/>
            </Routes>
        </BrowserRouter>
    )
}