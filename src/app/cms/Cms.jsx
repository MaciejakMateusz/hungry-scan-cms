import React from "react";
import {CmsNav} from "./CmsNav";
import {useInactivityTimeout} from "../../hooks/useInactivityTimeout";
import {getInactivityTimeout} from "../../utils/utils";

export const Cms = () => {
    useInactivityTimeout(getInactivityTimeout);

    return (
        <div className={'app-grid'}>
            <CmsNav/>
        </div>
    );
}
