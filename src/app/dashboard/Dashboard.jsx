import React from "react";
import {useInactivityTimeout} from "../../hooks/useInactivityTimeout";
import {getInactivityTimeout} from "../../utils/utils";
import {DashboardNav} from "./DashboardNav";

export const Dashboard = () => {
    useInactivityTimeout(getInactivityTimeout);

    return (
        <div className={'app-grid'}>
            <DashboardNav/>
        </div>
    );
}