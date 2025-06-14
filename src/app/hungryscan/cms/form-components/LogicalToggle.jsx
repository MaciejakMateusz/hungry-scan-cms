import {useDispatch} from "react-redux";
import React from "react";

export const LogicalToggle = ({changeHandler, value, id}) => {
    const dispatch = useDispatch();
    return (
        <div className="toggle-switch">
            <div className={'form-field-wrapper'}>
                <input type="checkbox" id={id}
                       name={id}
                       value={value}
                       onChange={() => dispatch(changeHandler(!value))}
                       checked={value}/>
                <label htmlFor={id} className="toggle-label"></label>
            </div>
        </div>
    );
}