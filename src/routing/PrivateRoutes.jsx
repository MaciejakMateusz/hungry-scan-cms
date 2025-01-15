import React, {useEffect, useState} from 'react';
import {Navigate, Outlet, useLocation} from 'react-router-dom';
import {apiHost} from "../apiData";
import {LoadingSpinner} from "../app/icons/LoadingSpinner";

export const PrivateRoutes = () => {
    const location = useLocation();
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const authorizeRequest = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`${apiHost}/api/auth${location.pathname}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include'
                });
                setIsAuthorized(response.ok)
            } catch {
                setIsAuthorized(false)
            } finally {
                setIsLoading(false)
            }
        }
        authorizeRequest();
    }, [location.pathname]);

    if (isLoading) {
        return <LoadingSpinner/>;
    }

    if (isAuthorized) {
        return <Outlet/>
    } else {
        return <Navigate to={"/"}/>
    }
};