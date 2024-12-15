import React, {useEffect} from "react";
import {LogoGroup} from "../icons/LogoGroup";
import {Forms} from "./forms/Forms";
import {Promo} from "./Promo";
import {Divider} from "./Divider";
import {NavMenu} from "./NavMenu";

export const MainPage = () => {

    useEffect(() => {
        console.log(window.innerWidth)
        console.log(window.innerHeight)
    }, []);

    return (
        <>
            <div className={'main-page-grid'}>
                <LogoGroup/>
                <NavMenu/>
                <div className={'main-page-content'}>
                    <Promo/>
                    <Divider/>
                    <Forms/>
                </div>
            </div>
        </>
    );
}