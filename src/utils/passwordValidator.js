import {passwordRegex} from "./utils";

export const validatePassword = (errorData, password, t) => {
    if(errorData?.password === t('constraints.NotBlank')) {
        return errorData?.password &&  password.length === 0
    }
    return errorData?.password &&  !passwordRegex.test(password)
}

export const validateRepeatedPassword = (errorData, password, repeatedPassword) => {
    return (errorData?.repeatedPassword || repeatedPassword !== password) && repeatedPassword !== password
}

export const renderRepeatedPasswordMsg = (errorData, password, repeatedPassword, t) => {
    if(errorData?.repeatedPassword) {
        return errorData.repeatedPassword;
    } else if(password !== repeatedPassword) {
        return t('passwordsNotMatch');
    }
}