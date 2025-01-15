import React, {useState} from "react";
import {PasswordVisibilityIcon} from "../../icons/PasswordVisibilityIcon";

export const FormField = React.memo(function FormField(props) {
    const [topPlaceholder, setTopPlaceholder] = useState(false);


    const showTopPlaceholder = (action) => {
        if (props.value !== null && props.value !== '') {
            setTopPlaceholder(true);
            return;
        }
        action === 'show' ? setTopPlaceholder(true) : setTopPlaceholder(false);
    }

    const generateValidationMessage = () => {
        return !props.hasError || !props.error ?
            <></> :
            <span className={'register-validation-msg'}>{props.error}</span>
    }

    return (
        <>
            <div className={`form-input-wrapper ${props.hasError ? 'invalid' : ''}`}>
                <span
                    className={`form-field-top-placeholder ${topPlaceholder ? '' : 'hidden'}`}>{props.placeholder}</span>
                <input type={props.visible ? 'text' : props.type}
                       className={`main-page-form-field ${props.type === 'password' ? 'password' : ''}`}
                       placeholder={props.placeholder}
                       name={props.name}
                       value={props.value}
                       onChange={(e) => {
                           props.changeHandler(e)
                       }}
                       onFocus={() => showTopPlaceholder('show')}
                       onBlur={() => showTopPlaceholder('hide')}/>
                {props.toggler && <PasswordVisibilityIcon toggleVisibility={props.toggler}/>}
            </div>
            {generateValidationMessage()}
        </>
    );
});