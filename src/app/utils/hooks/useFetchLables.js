import { useState, useEffect } from "react";
import { apiHost } from "../../../apiData";
import { getDecodedJwt } from "../../../utils";

export const useFetchLabels = (setErrorMessage) => {
    const [labels, setLabels] = useState([]);

    useEffect(() => {
        const fetchLabels = () => {
            fetch(`${apiHost}/api/cms/labels`, {
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
                setLabels(data);
            }).catch(error => {
                setErrorMessage(error);
            });
        };

        fetchLabels();
    }, [setErrorMessage]);

    return labels;
};