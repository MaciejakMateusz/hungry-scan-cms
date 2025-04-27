import {useMemo} from "react";

export const useDayHours = () => {
    return useMemo(() =>
            Array.from({length: 24}, (_, hour) => ({
                value: hour.toString().padStart(2, '0') + ':00:00',
                label: hour.toString().padStart(2, '0') + ':00'
            }))
        , []);
};