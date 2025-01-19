import {useEffect, useState, useRef} from 'react';
import {useDispatch} from 'react-redux';
import {executeLogoutFetch} from "../slices/loginFormSlice";
import {getInactivityTimeout} from "../utils/utils";

export const useInactivityTimeout = (timeout) => {
    const [isActive, setIsActive] = useState(true);
    const timerRef = useRef(null);
    const dispatch = useDispatch();

    const resetTimer = () => {
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(handleInactivityLogout, getInactivityTimeout());
    };

    const handleInactivityLogout = () => {
        setIsActive(false);
        dispatch(executeLogoutFetch());
    };

    useEffect(() => {
        const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];

        const handleActivity = () => {
            if (!isActive) {
                setIsActive(true);
            }
            resetTimer();
        };

        events.forEach(event => window.addEventListener(event, handleActivity));
        resetTimer();

        return () => {
            events.forEach(event => window.removeEventListener(event, handleActivity));
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [timeout, dispatch, isActive]);

    useEffect(() => {
        const handleUnload = () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
        window.addEventListener('beforeunload', handleUnload);
        return () => {
            window.removeEventListener('beforeunload', handleUnload);
        };
    }, []);

    return isActive;
};