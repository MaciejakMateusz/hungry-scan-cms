import React from "react";

export const CmsNavMenu = () => {
    return (
        <div className="menu">
            <div className="main-buttons-container cms-style">
                <div className="main-button selected-button" id="menu-items-management">
                    <span className="black-bold">Zarządzanie daniami</span>
                </div>
                <div className="main-button" id="categories-management">
                    <span className="black-bold">Zarządzanie kategoriami</span>
                </div>
                <div className="main-button" id="restaurants-management">
                    <span className="black-bold">Zarządzanie restauracjami</span>
                </div>
            </div>
        </div>
    );
}