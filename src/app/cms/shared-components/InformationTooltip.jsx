import React from "react";
import {Tooltip} from "../Tooltip";

export const InformationTooltip = ({text}) => {
    return (
        <Tooltip content={text}>
            <div className={'info-tooltip-container'}>
                <svg width="2" height="7" viewBox="0 0 2 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M0.516125 7V2.784H1.50013V7H0.516125ZM0.996125 1.888C0.798792 1.888 0.644125 1.84 0.532125 1.744C0.425458 1.64267 0.372125 1.50133 0.372125 1.32C0.372125 1.14933 0.428125 1.01067 0.540125 0.904C0.652125 0.797333 0.804125 0.743999 0.996125 0.743999C1.19879 0.743999 1.35346 0.794666 1.46013 0.896C1.57213 0.992 1.62813 1.13333 1.62813 1.32C1.62813 1.48533 1.57213 1.62133 1.46013 1.728C1.34813 1.83467 1.19346 1.888 0.996125 1.888Z"
                        fill="#0085D6"/>
                </svg>
            </div>
        </Tooltip>
    );
}