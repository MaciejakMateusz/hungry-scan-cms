import {useSelector} from 'react-redux';
import {useEffect, useState} from 'react';

export const useScheduleHours = () => {
    const {restaurant} = useSelector(state => state.dashboard.view);
    const [timeSlots, setTimeSlots] = useState([]);

    useEffect(() => {
        if (!restaurant) return;
        const {openingTime, closingTime} = restaurant.value.settings;
        setTimeSlots(generateTimeSlots(openingTime, closingTime));
    }, [restaurant]);

    const generateTimeSlots = (openingTime, closingTime, stepMinutes = 30) => {
        const slots = [];
        const now = new Date();

        const [openHour, openMinute, openSecond] = openingTime.split(':').map(Number);
        const [closeHour, closeMinute, closeSecond] = closingTime.split(':').map(Number);

        const openDate = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            openHour,
            openMinute,
            openSecond
        );
        const closeDate = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            closeHour,
            closeMinute,
            closeSecond
        );

        if (closeDate <= openDate) {
            const endOfDay = new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate(),
                23,
                59,
                59
            );
            let cursor = new Date(openDate);
            while (cursor <= endOfDay) {
                slots.push({
                    value: new Date(cursor),
                    label: cursor.toTimeString().slice(0, 5),
                });
                cursor = new Date(cursor.getTime() + stepMinutes * 60000);
            }

            const startOfDay = new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate(),
                0,
                0,
                0
            );
            cursor = new Date(startOfDay);
            while (cursor <= closeDate) {
                slots.push({
                    value: new Date(cursor),
                    label: cursor.toTimeString().slice(0, 5),
                });
                cursor = new Date(cursor.getTime() + stepMinutes * 60000);
            }
        } else {
            let cursor = new Date(openDate);
            while (cursor <= closeDate) {
                slots.push({
                    value: new Date(cursor),
                    label: cursor.toTimeString().slice(0, 5),
                });
                cursor = new Date(cursor.getTime() + stepMinutes * 60000);
            }
        }

        return slots;
    };

    return timeSlots;
};