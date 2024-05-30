import React from "react";
import {LoginForm} from "./LoginForm";
import {LoginFooter} from "./LoginFooter";

export const LoginPage = () => {
    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-10 col-lg-12 col-md-9">
                        <div className="card o-hidden border-0 shadow-lg my-5">
                            <div className="card-body p-2">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="p-5">
                                            <LoginForm/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <LoginFooter/>
        </>
    );
}