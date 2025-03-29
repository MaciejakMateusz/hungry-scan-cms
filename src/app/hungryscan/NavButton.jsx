import React from "react";

export const NavButton = (props) => {
    return (
        <li className={'app-nav-li'}>
            <button className={`app-nav-btn ${props.isActive ? 'nav-active' : ''}`} onClick={props.onClick}>
                {props.icon}{props.name}
            </button>
        </li>
    );
}