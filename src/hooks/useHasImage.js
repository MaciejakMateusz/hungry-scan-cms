import {useEffect, useState} from "react";
import {s3BucketUrl} from "../apiData";

export const useImageExists = id => {
    const [exists, setExists] = useState(null);

    useEffect(() => {
        let active = true;
        const url = `${s3BucketUrl}/menuItems/${id}`;
        const img = new Image();

        img.src = url;
        img.onload = () => {
            if (active) setExists(true);
        };
        img.onerror = () => {
            if (active) setExists(false);
        };

        return () => {
            active = false;
        };
    }, [id]);

    return exists;
}