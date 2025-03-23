import {useSelector} from "react-redux";
import {useEffect, useState} from "react";

export const useScheduleHours = () => {
    const {restaurant} = useSelector(state => state.dashboard.view);
    const [timeSlots, setTimeSlots] = useState([]);

    useEffect(() => {
        const settings = restaurant?.value.settings;
        const openingTime = settings.openingTime;
        const closingTime = settings.closingTime;
        const timeSlots = generateTimeSlots(openingTime, closingTime);
        setTimeSlots(timeSlots);
    }, [restaurant]);

    const generateTimeSlots = (openingTime, closingTime, stepMinutes = 30) => {
        const slots = [];
        const now = new Date();

        const [openHour, openMinute, openSecond] = openingTime.split(':').map(Number);
        const [closeHour, closeMinute, closeSecond] = closingTime.split(':').map(Number);

        const openDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), openHour, openMinute, openSecond);
        const closeDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), closeHour, closeMinute, closeSecond);

        let currentDate = new Date(openDate);
        while (currentDate <= closeDate) {
            const label = currentDate.toTimeString().slice(0, 5);
            slots.push({
                value: new Date(currentDate),
                label: label
            });
            currentDate = new Date(currentDate.getTime() + stepMinutes * 60000);
        }

        return slots;
    }

    return timeSlots;
}