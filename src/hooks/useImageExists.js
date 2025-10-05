import {useEffect, useState} from "react";
import {s3BucketUrl} from "../apiData";

export const useImageExists = id => {
    const [exists, setExists] = useState(null);

    useEffect(() => {
        setExists(null);
        let cancelled = false;
        const url = `${s3BucketUrl}/menuItems/${id}.png?cb=${Date.now()}`;
        const img = new Image();
        img.onload = () => {
            if (!cancelled) setExists(img.naturalWidth > 0);
        };
        img.onerror = () => {
            if (!cancelled) setExists(false);
        };
        img.src = url;

        return () => {
            cancelled = true;
            img.src = "";
        };
    }, [id]);

    return exists;
}