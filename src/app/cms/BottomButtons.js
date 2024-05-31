import React from "react";
import {deleteCookie} from "../../utils";
import {useNavigate} from "react-router-dom";

export const BottomButtons = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        deleteCookie('jwt')
        navigate("/login")
    }

    return (
        <div className="bottom-buttons-area">
            <div className="add-item-area">
                <div className="add-item-button" id="add-item-button">
                    <div className="add-item-icon"></div>
                    <span>Nowe danie</span>
                </div>
            </div>
            <div className="back-to-main-view-area">
                <div className="back-button" id="back-button" onClick={handleClick}>
                    <span>Wyloguj się</span>
                    <span className="back-icon"></span>
                </div>
            </div>
        </div>
    );
}