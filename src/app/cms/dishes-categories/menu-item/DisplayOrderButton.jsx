import React from "react";
import {ArrowDownIcon} from "../../../icons/ArrowDownIcon";
import {ArrowUpIcon} from "../../../icons/ArrowUpIcon";

export const DisplayOrderButton = ({menuItem, direction, onClick}) => {
    const type = direction === 'down' ? 'increment' : 'decrement';
    const icon = direction === 'down' ? <ArrowDownIcon/> : <ArrowUpIcon/>;
    return (
        <div className={`display-order-button ${direction}`} onClick={() => onClick(menuItem, type)}>
            {icon}
        </div>
    );
}