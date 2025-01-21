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
            <span className={`form-validation-msg ${props.customWrapper && props.customWrapper}`}>
                {props.error}
            </span>
    }

    return (
        <>
            <div className={`form-input-wrapper ${props.hasError ? 'invalid' : ''} ${props.customWrapper && props.customWrapper}`}>
                <div className={`form-field-top-placeholder-wrapper ${topPlaceholder ? '' : 'hidden'}`}>
                    <span className={'form-field-top-placeholder'}>
                        {props.placeholder}
                    </span>
                </div>
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