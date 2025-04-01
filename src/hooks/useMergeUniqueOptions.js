import {useMemo} from "react";

export const useMergeUniqueOptions = ({ chosenOptions = [], options = [] }) => {
    return useMemo(() => {
        const seen = new Set();
        return [...chosenOptions, ...options].filter(option => {
            const id = String(option?.value?.id);
            if (!id || seen.has(id)) return false;
            seen.add(id);
            return true;
        });
    }, [chosenOptions, options]);
};