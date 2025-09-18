import React from "react";
import {setWelcomeSlogan} from "../../../../../slices/personalizationSlice";
import {useDispatch} from "react-redux";

export const WelcomeSloganProposition = ({value}) => {
    const dispatch = useDispatch();
    return (
        <>
            <div className={'welcome-slogan-proposition'}
                 onClick={() => dispatch(setWelcomeSlogan(value))}>
                {value}
            </div>
        </>
    );
}