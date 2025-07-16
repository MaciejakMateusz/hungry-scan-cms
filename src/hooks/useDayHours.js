import { useMemo } from "react";

export const useDayHours = () => {
    return useMemo(() => {
        const times = [];
        for (let hour = 0; hour < 24; hour++) {
            times.push({
                value: hour.toString().padStart(2, '0') + ':00:00',
                label: hour.toString().padStart(2, '0') + ':00'
            });
            times.push({
                value: hour.toString().padStart(2, '0') + ':30:00',
                label: hour.toString().padStart(2, '0') + ':30'
            });
        }
        return times;
    }, []);
};
