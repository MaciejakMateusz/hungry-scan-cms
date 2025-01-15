import React from "react";
import {CmsNavigation} from "./CmsNavigation";
import {useInactivityTimeout} from "../../hooks/useInactivityTimeout";
import {getInactivityTimeout} from "../../utils/utils";

export const CmsPage = () => {
    useInactivityTimeout(getInactivityTimeout);

    return (
        <div className={'cms-grid'}>
            <CmsNavigation/>
        </div>
    );
}
