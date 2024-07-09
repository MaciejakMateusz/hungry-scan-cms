import {apiHost} from "../../../apiData";
import {getDecodedJwt} from "../../../utils";

export const uploadImage = async (file, setErrorData, setErrorMessage) => {
    if (!file) {
        return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await fetch(`${apiHost}/api/cms/images`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${getDecodedJwt()}`,
            },
            body: formData,
        });

        return await response.json();
    } catch (error) {
        setErrorData(error);
        setErrorMessage(error);
    }
};