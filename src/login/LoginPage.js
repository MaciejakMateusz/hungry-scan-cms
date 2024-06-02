import React, {useEffect, useState} from "react";
import {LoginForm} from "./LoginForm";
import {LoginFooter} from "./LoginFooter";
import {getDecodedJwt} from "../utils";
import {Navigate} from "react-router-dom";
import {Helmet} from "react-helmet";

export const LoginPage = () => {
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        let jwtCookie = getDecodedJwt();
        if ('' !== jwtCookie) {
            setRedirect(true);
        }
    }, []);

    if (redirect) {
        return <Navigate to="/cms"/>;
    }
    return (
        <>
            <Helmet>
                <title>HungryScan CMS Login</title>
            </Helmet>
            <div className="login-grid">
                <div className="login-container">
                    <div className="login-box">
                        <LoginForm/>
                    </div>
                </div>
                <LoginFooter/>
            </div>
        </>
    );
}