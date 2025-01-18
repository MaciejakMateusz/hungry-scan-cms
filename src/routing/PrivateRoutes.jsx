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
        console.log("handleResponseR", response)
        if (response.ok) {
            console.log("handleResponse-okR", response)
            setIsAuthorized(true);
        } else if (response.status === 302) {
            const body = await response.json();
            console.log("handleResponse-302R", response)
            console.log("handleResponse-302B", body)
            setRedirectUrl(body.redirectUrl);
        }
    }

    if (isLoading) {
        return (<LoadingSpinner/>);
    } else if (redirectUrl) {
        console.log("returns-redirect", redirectUrl)
        window.location.href = redirectUrl;
        return;
    } else if (isAuthorized) {
        console.log("returns-isAuth", isAuthorized)
        return (<Outlet/>);
    }
    console.log("returns-return", "lastReturn to /sign-in")
    return (<Navigate to={"/sign-in"}/>);
};