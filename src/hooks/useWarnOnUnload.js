import { useEffect } from "react";
import {useSelector} from "react-redux";

export const useWarnOnUnload = (shouldWarn) => {
    const {logoutActive} = useSelector(state => state.login.logoutFetch);
    const {confirmLogout} = useSelector(state => state.globalParams.globalParams);
    const {downloadActive} = useSelector(state => state.dashboard.view);

    useEffect(() => {
        if (!shouldWarn || logoutActive || downloadActive || confirmLogout) return;

        const handler = (e) => {
            e.preventDefault();
            e.returnValue = "";
            return "";
        };

        window.addEventListener("beforeunload", handler);
        return () => window.removeEventListener("beforeunload", handler);
    }, [shouldWarn, logoutActive, downloadActive, confirmLogout]);
};