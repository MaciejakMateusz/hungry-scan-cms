import React from "react";

export const BottomButtons = () => {

    const handleClick = () => {
        window.location.href = "http://localhost:3000/restaurant"
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
                    <span>Powrót do panelu restauracji</span>
                    <span className="back-icon"></span>
                </div>
            </div>
        </div>
    );
}