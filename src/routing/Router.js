import React from 'react';
import '../index.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {PrivateRoutes} from "./PrivateRoutes";
import {ErrorPage} from "../app/error/ErrorPage";
import {RedirectTo} from "./RedirectTo"
import {CmsPage} from "../app/cms/CmsPage";

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<RedirectTo module={"login"}/>}/>
                <Route path='/login' element={<RedirectTo module={"login"}/>}/>
                <Route element={<PrivateRoutes/>}>
                    <Route path='/restaurant' element={<RedirectTo module={"restaurant"}/>}/>
                    <Route path='/cms' element={<CmsPage/>}/>
                </Route>
                <Route path='*' element={<ErrorPage title={"Nie znaleziono strony"}
                                                    message={"Strona z podanym adresem nie istnieje w tej domenie."}/>}/>
            </Routes>
        </BrowserRouter>
    )
}