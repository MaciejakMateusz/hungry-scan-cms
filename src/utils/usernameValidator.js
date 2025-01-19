import {emailRegex} from "./utils";

export const validateUsername = (errorData, username, t) => {
    if (errorData?.username === t('constraints.NotBlank')) {
        return errorData?.username && username.length === 0
    } else if (errorData?.username === t('usernameExists')) {
        return errorData?.givenUsername && errorData.givenUsername === username
    }
    return errorData?.username && !emailRegex.test(username)
}