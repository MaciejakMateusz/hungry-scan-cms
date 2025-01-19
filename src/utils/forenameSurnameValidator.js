import {forenameSurnameRegex} from "./utils";

export const validateForename = (errorData, forename, t) => {
    if (errorData?.forename === t('constraints.NotBlank')) {
        return errorData?.forename && forename.length === 0
    }
    return errorData?.forename && !forenameSurnameRegex.test(forename)
}

export const validateSurname = (errorData, surname, t) => {
    if (errorData?.surname === t('constraints.NotBlank')) {
        return errorData?.surname && surname.length === 0
    }
    return errorData?.surname && !forenameSurnameRegex.test(surname)
}