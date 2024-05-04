import React from "react";

export const MainList = () => {
    return (
        <div className="content cms-content">
            <div className="tables-box fit-content" id="tables-box">
                <div className="container-menu">
                    <div className="grid-container-category">
                        <div className="category">
                            <span>nazwa kategorii</span>
                        </div>
                        <div className="cms-menu-items">
                            <div className="cms-menu-item">
                                <div className="menu-item-area-cms">
                                    <span className="cms-item-title-area">nazwa</span>
                                    <span
                                        className="cms-item-description-area">opis</span>
                                    <div className="cms-item-price-area">
                                        <div className="increment-button"></div>
                                        <span>0 zł</span>
                                    </div>
                                    <div className="cms-item-photo-area">
                                        <div className="cms-photo-container">
                                            <img
                                                src=""
                                                alt=""
                                                loading="lazy"
                                                className="menu-item-img"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="cms-edit-item-pills">
                                    <div className="cms-available-icon-container tooltip">
                                        <span className="check-icon"></span>
                                        <span className="tooltip-text">Danie dostępne</span>
                                    </div>
                                    <div className="cms-action-buttons-container">
                                        <form
                                            className="reset-margin-block">
                                            <input type="hidden" name="id"/>
                                            <button type="submit" className="button-reset-style">
                                                <span className="edit-icon"></span>
                                            </button>
                                        </form>
                                        <form
                                            className="reset-margin-block">
                                            <input type="hidden" name="id"/>
                                            <button type="submit" className="button-reset-style">
                                                <span className="trash-icon"></span>
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}