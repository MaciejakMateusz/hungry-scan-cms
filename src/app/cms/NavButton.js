import React from "react";

export const NavButton = ({name, isActive, onClick}) => {

    return (
        <li className={'cms-nav-li'}>
            <button className={`cms-nav-btn ${isActive ? 'nav-active' : ''}`} onClick={onClick}>
                {name}
            </button>
        </li>
    );
}