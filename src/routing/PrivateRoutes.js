import React, {useEffect, useState} from 'react';
import {Navigate, Outlet, useLocation} from 'react-router-dom';
import {apiHost} from "../apiData";
import {getDecodedJwt} from "../utils";

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
            if (response.ok) {
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

    if (isAuthorized) {
        return <Outlet/>
    } else {
        return <Navigate to={"/login"}/>
    }
};