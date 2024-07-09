import { useState, useEffect } from "react";
import { apiHost } from "../../../apiData";
import { getDecodedJwt } from "../../../utils";

export const useFetchAllergens = (setErrorMessage) => {
    const [allergens, setAllergens] = useState([]);

    useEffect(() => {
        const fetchAllergens = () => {
            fetch(`${apiHost}/api/cms/allergens`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getDecodedJwt()}`
                }
            }).then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("There was an error while communicating with a server.");
                }
            }).then(data => {
                setAllergens(data);
            }).catch(error => {
                setErrorMessage(error);
            });
        };

        fetchAllergens();
    }, [setErrorMessage]);

    return allergens;
};