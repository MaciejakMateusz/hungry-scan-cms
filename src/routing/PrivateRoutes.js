import React, { useState, useEffect } from 'react';
import {Outlet, useLocation, Navigate} from 'react-router-dom';
import {apiHost} from "../apiData";
import {getDecodedJwt} from "../utils";
import {ErrorPage} from "../app/error/ErrorPage";

export const PrivateRoutes = () => {
    const location = useLocation();
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        fetch(`${apiHost}/api/auth${location.pathname}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getDecodedJwt()}`
            }
        }).then(response => {
            if(response.ok) {
                setIsLoading(false);
                setIsAuthorized(true);
            } else {
                setIsLoading(false)
            }
        });
    }, [location.pathname]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if(isAuthorized) {
        return <Outlet />
    } else {
        switch (location.pathname) {
            case "/restaurant":
                return <Navigate to={"/login"} />
            case "/cms":
                return <ErrorPage title={"Brak uprawnień"}
                                  message={"Nie masz wymaganych uprawnień do wyświetlenia zawartości strony."}/>
            case "/admin":
                return <ErrorPage title={"Brak uprawnień"}
                                  message={"Nie masz wymaganych uprawnień do wyświetlenia zawartości strony."}/>
            default:
                return <Navigate to={"/login"} />
        }
    }
};