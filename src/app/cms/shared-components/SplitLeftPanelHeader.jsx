import React from "react";
import {SearchIcon} from "../../icons/SearchIcon";
import {FilteringForm} from "./FilteringForm";


export const SplitLeftPanelHeader = (props) => {
    return (
        <div className={`vertical-split-left-panel-header`}>
            <div className={`search-button margin-right ${props.filterExpanded ? 'search-active' : ''}`}>
                <button className={`search-initial-circle ${props.filterExpanded ? 'circle-active' : ''}`}
                        onClick={props.expandFilter}>
                    <SearchIcon/>
                </button>
                {props.filterExpanded ?
                    <FilteringForm value={props.filterValue} searchSubmit={props.onSearchSubmit}/> : <></>}
            </div>
            {props.component}
        </div>
    );
}