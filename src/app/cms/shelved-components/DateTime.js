import React, {useEffect, useState} from "react";
import {CalendarIcon} from "../../icons/CalendarIcon";

export const DateTime = () => {
    const [dateTime, setDateTime] = useState({
        date: '',
        day: '',
        time: ''
    });

    useEffect(() => {
        const updateDateTime = () => {
            const currentDate = new Date();
            const options = {year: 'numeric', month: 'long', day: 'numeric'};
            const formattedDate = currentDate.toLocaleDateString('pl-PL', options);

            const timeOptions = {hour: '2-digit', minute: '2-digit'};
            const formattedTime = currentDate.toLocaleTimeString('pl-PL', timeOptions);

            const dayOptions = {weekday: 'long'};
            const formattedDay = currentDate.toLocaleDateString('pl-PL', dayOptions);

            setDateTime({
                date: formattedDate,
                day: formattedDay,
                time: formattedTime
            });
        };
        updateDateTime();

        const interval = setInterval(updateDateTime, 1000);

        return () => clearInterval(interval);

    }, []);

    return (
        <div className={'cms-date-time'}>
            <div className={'cms-date-time-container'}>
                <div className={'cms-calendar-icon-container'}>
                    <CalendarIcon/>
                </div>
                <div className={'cms-date-time-wrapper'}>
                    <div>
                        <span className={'cms-date'}>{dateTime.date}
                            <span className={'bullet'}/>
                            <span className={'cms-day'}>{dateTime.day}</span>
                        </span>
                    </div>
                    <div className={'cms-time'}>
                        <span>{dateTime.time}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}