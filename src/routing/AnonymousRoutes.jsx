import React, {useEffect, useState} from 'react';
import {Navigate, Outlet, useLocation} from 'react-router-dom';
import {apiHost} from "../apiData";
import {LoadingSpinner} from "../app/icons/LoadingSpinner";

export const AnonymousRoutes = () => {
    const location = useLocation();
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [redirectUrl, setRedirectUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [serverDown, setIsServerDown] = useState(false);

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
                setIsServerDown(true);
            } finally {
                setIsLoading(false);
            }
        }
        authorizeRequest();
    }, [location.pathname]);

    const handleResponse = async response => {
        if (response.ok) {
            setIsAnonymous(true);
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
    } else if (isAnonymous) {
        return (<Outlet/>);
    } else if(serverDown) {
        return (<Navigate to={"/server-down"}/>);
    }
    return (<Navigate to={"/app"}/>);
};