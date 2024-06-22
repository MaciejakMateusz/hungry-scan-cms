import {apiHost} from "./apiData";
import {getDecodedJwt} from "./utils";

export const getCategoriesDisplayOrders = () => {
    return fetch(`${apiHost}/api/cms/categories/display-orders`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getDecodedJwt()}`
        }
    }).then(response => {
        if (response.ok) {
            return response.json()
        } else {
            throw new Error("There was an error while communicating with a server.");
        }
    }).catch(error => {
        console.log(error)
    })
}