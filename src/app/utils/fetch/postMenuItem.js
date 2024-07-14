// import {apiHost} from "../../../apiData";
// import {getDecodedJwt} from "../../../utils";
//
// export const postMenuItem = (requestBody, setSubmittedSuccessfullyType, setMenuItemFormActive, setErrorData, setErrorMessage) => {
//     fetch(`${apiHost}/api/cms/items/add`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${getDecodedJwt()}`,
//         },
//         body: requestBody,
//     }).then((response) => {
//         if (response.ok) {
//             setSubmittedSuccessfullyType('dish-save');
//             setTimeout(() => {
//                 setSubmittedSuccessfullyType(null);
//             }, 4000);
//             setMenuItemFormActive(false);
//             return response.json();
//         } else {
//             return response.json().then((errorData) => {
//                 setErrorData(errorData);
//                 setErrorMessage(errorData);
//             });
//         }
//     })
// }