import React from "react";
import {PasswordVisibilityIcon} from "../../icons/PasswordVisibilityIcon";

export const FormField = (props) => {
    return (
        <div className={'form-input-wrapper'}>
            <input type={props.visible ? 'text' : props.type}
                   className={`main-page-form-field ${props.type === 'password' ? 'password' : ''}`}
                   placeholder={props.placeholder}
                   name={props.name}/>
            {props.type === 'password' && <PasswordVisibilityIcon toggleVisibility={props.toggler}/>}
        </div>
    );
}