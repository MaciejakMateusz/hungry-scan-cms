import React from "react";
import {NavMenu} from "./NavMenu";

export const MainPage = ({activeView}) => {

    const renderActiveView = () => {
        switch (activeView) {
            case "home": return (<h1>HOME</h1>);
            case "ourOffer": return (<h1>OUR OFFER</h1>);
            case "pricePlans": return (<h1>PRICE PLANS</h1>);
            case "aboutUs": return (<h1>ABOUT US</h1>);
            case "contact": return (<h1>CONTACT</h1>);
            default: return (<h1>HOME</h1>);
        }
    }


    return (
        <>
            <div className={'main-page-grid'}>
                <NavMenu/>
                <div className={'main-page-content'}>
                    {renderActiveView()}
                </div>
            </div>
        </>
    );
}