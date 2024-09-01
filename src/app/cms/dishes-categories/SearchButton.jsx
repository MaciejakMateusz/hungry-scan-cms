import React from "react";
import {SearchIcon} from "../../icons/SearchIcon";
import {FilteringForm} from "../shared-components/FilteringForm";

export const SearchButton = (props) => {

    return (
        <div className={`search-button ${props.filterExpanded ? 'search-active' : ''}`}>
            <button className={`search-initial-circle ${props.filterExpanded ? 'circle-active' : ''}`}
                    onClick={props.onExpand}>
                <SearchIcon/>
            </button>
            <div className={`search-form-container ${props.filterExpanded ? 'visible' : 'hidden'}`}>
                <FilteringForm value={props.filterValue} searchSubmit={props.onSubmit}/>
                {props.filterValue !== '' &&
                    <span className={'clear-filter-x'} onClick={props.onClear}>x</span>}
            </div>
        </div>
    );
}