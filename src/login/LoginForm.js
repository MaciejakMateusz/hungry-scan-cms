import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import {apiHost} from "../apiData";
import {urlParamValue} from "../utils";

export const LoginForm = () => {
    const [form, setForm] = useState({username: "", password: ""});
    const [notAuthorized, setNotAuthorized] = useState(false);
    const [isLoggedOut, setIsLoggedOut] = useState(false);
    const {t} = useTranslation();

    useEffect(() => {
        setIsLoggedOut(Boolean(urlParamValue("logout")))
    }, []);

    const setFormFields = e => {
        const {name, value} = e.target;
        setForm(prevState => {
            return {
                ...prevState,
                [name]: value
            };
        });
    }

    const submitForm = (e) => {
        e.preventDefault()

        const requestBody = JSON.stringify({
            username: form.username,
            password: form.password
        });

        return fetch(`${apiHost}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: requestBody
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Login failed");
                }
            })
            .then(data => {
                document.cookie = `jwt=${encodeURIComponent(JSON.stringify(data))} path=/`;
                window.location.href = `/cms`;
            })
            .catch(() => setNotAuthorized(true))
    }

    const renderValidationMsg = () => {
        if (notAuthorized) {
            return (
                <p style={{fontSize: '0.8rem', color: 'tomato'}}>
                    {t('invalidCredentials')}
                </p>
            );
        } else if (isLoggedOut) {
            return (
                <p style={{fontSize: '0.8rem', color: 'green'}}>
                    {t('logoutSuccess')}
                </p>
            );
        } else {
            return <></>
        }
    }

    return (
        <>
            <div className="text-center">
                <h1 className="h4 text-gray-900 mb-4">{t('cmsLogin')}</h1>
            </div>
            <form className="user" onSubmit={submitForm}>
                <div className="form-group">
                    <input type="text"
                           className="form-control form-control-user"
                           placeholder={t('typeLogin')}
                           name="username"
                           value={form.username}
                           onChange={setFormFields}/>

                </div>
                <div className="form-group">
                    <input type="password"
                           className="form-control form-control-user"
                           placeholder={t('typePassword')}
                           value={form.password}
                           name="password"
                           onChange={setFormFields}/>
                </div>
                <button className="btn btn-primary btn-user btn-block" style={{fontSize: '1.1rem'}}>{t('logIn')}
                </button>
            </form>
            {renderValidationMsg()}
            <hr/>
            <div className="text-center">
                    <span className="small">{t('loginProblems')}
                        <Link to="/#"> {t('recoverPassword')}</Link>
                    </span>
            </div>
        </>
    );
}
