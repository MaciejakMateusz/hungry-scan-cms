import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {apiHost} from "../apiData";
import {urlParamValue} from "../utils";

export const LoginForm = () => {
    const [form, setForm] = useState({username: "", password: ""});
    const [notAuthorized, setNotAuthorized] = useState(false);
    const [isLoggedOut, setIsLoggedOut] = useState(false);

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

    const renderMessage = () => {
        if(notAuthorized) {
            return validationFail();
        } else if(isLoggedOut) {
            return logoutSuccess();
        } else {
            return <></>
        }
    }

    const validationFail = () => {
        return (
            <p className="login-validation-msg">
                Niepoprawny email lub hasło, spróbuj ponownie
            </p>
        );
    }

    const logoutSuccess = () => {
        return (
            <p className="logout-success-msg">
                Wylogowano pomyślnie
            </p>
        );
    }

    return (
        <>
            <div className="login-form-header">
                <h1 className="">Logowanie</h1>
            </div>
            <form className="login-form" onSubmit={submitForm}>
                <div className="login-input-container username-grid">
                    <input type="text"
                           className="login-input"
                           placeholder="Wpisz login..."
                           name="username"
                           value={form.username}
                           onChange={setFormFields}/>

                </div>
                <div className="login-input-container password-grid">
                    <input type="password"
                           className="login-input"
                           placeholder="Podaj hasło..."
                           value={form.password}
                           name="password"
                           onChange={setFormFields}/>
                    {renderMessage()}
                </div>
                <div className="login-btn-container">
                    <button className="login-btn"
                            style={{fontSize: '1.1rem'}}>Zaloguj się
                    </button>
                </div>
            </form>
            <div className="login-form-footer">
                    <span className="">Problemy z logowaniem?
                        <Link to="/#"> Odzyskaj hasło</Link>
                    </span>
            </div>
        </>
    );
}