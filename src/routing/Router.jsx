import React from 'react';
import '../index.css'
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import {PrivateRoutes} from "./PrivateRoutes";
import {ErrorPage} from "../app/error/ErrorPage";
import {CmsPage} from "../app/cms/CmsPage";
import {LoginPage} from "../app/login/LoginPage";
import {MainPage} from "../app/main/MainPage";

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Navigate to={"/login"}/>}/>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='/main' element={<MainPage/>}/>
                <Route element={<PrivateRoutes/>}>
                    <Route path='/cms' element={<CmsPage/>}/>
                </Route>
                <Route path='*' element={<ErrorPage title={'Nie znaleziono strony'}
                                                    message={'Strona z podanym adresem nie istnieje w tej domenie.'}/>}/>
            </Routes>
        </BrowserRouter>
    )
}