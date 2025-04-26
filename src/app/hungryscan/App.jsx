import React from "react";
import {useSelector} from "react-redux";
import {Dashboard} from "./dashboard/Dashboard";
import {Cms} from "./cms/Cms";
import {getInactivityTimeout} from "../../utils/utils";
import {useInactivityTimeout} from "../../hooks/useInactivityTimeout";
import {ConfirmationMessagesRenderer} from "./cms/menu/ConfirmationMessagesRenderer";

export const App = () => {
    const {currentView} = useSelector(state => state.globalParams.globalParams);
    useInactivityTimeout(getInactivityTimeout);

    return (
        <div className={'app-grid'}>
            {currentView.includes('dashboard') ? <Dashboard/> : <Cms/>}
            <ConfirmationMessagesRenderer/>
        </div>
    );
}