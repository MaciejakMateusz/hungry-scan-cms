import React, {useEffect, useState} from 'react';
import {Navigate, Outlet, useLocation} from 'react-router-dom';
import {apiHost} from "../apiData";
import {LoadingSpinner} from "../app/icons/LoadingSpinner";

export const PrivateRoutes = () => {
    const location = useLocation();
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [redirectUrl, setRedirectUrl] = useState(null);
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
                await handleResponse(response);
            } catch {
                setIsAuthorized(false)
            } finally {
                setIsLoading(false)
            }
        }
        authorizeRequest();
    }, [location.pathname]);

    const handleResponse = async response => {
        if (response.ok) {
            setIsAuthorized(true);
        } else if (response.status === 302) {
            const body = await response.json();
            setRedirectUrl(body.redirectUrl);
        }
    }

    if (isLoading) {
        return (<LoadingSpinner/>);
    } else if (redirectUrl) {
        window.location.href = redirectUrl;
        return;
    } else if (isAuthorized) {
        return (<Outlet/>);
    }
    return (<Navigate to={"/sign-in"}/>);
};