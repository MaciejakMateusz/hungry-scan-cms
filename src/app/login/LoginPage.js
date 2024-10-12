import {LoginForm} from "./LoginForm";
import {LoginFooter} from "./LoginFooter";
import {Helmet} from "react-helmet";

export const LoginPage = () => {
    return (
        <>
            <Helmet>
                <title>HungryScan CMS Login</title>
            </Helmet>
            <div className={'login-grid'}>
                <div className={'login-container'}>
                    <div className={'login-box'}>
                        <LoginForm/>
                    </div>
                </div>
                <LoginFooter/>
            </div>
        </>
    );
}