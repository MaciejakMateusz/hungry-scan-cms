import React, {useEffect, useState} from "react";

export const DateTime = () => {
    const [dateTime, setDateTime] = useState({
        date: '',
        time: ''
    });

    useEffect(() => {
        const updateDateTime = () => {
            const currentDate = new Date();
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            const formattedDate = currentDate.toLocaleDateString('pl-PL', options);

            const timeOptions = { hour: '2-digit', minute: '2-digit' };
            const formattedTime = currentDate.toLocaleTimeString('pl-PL', timeOptions);

            setDateTime({
                date: formattedDate,
                time: formattedTime
            });
        };
        updateDateTime();

        const interval = setInterval(updateDateTime, 1000);

        return () => clearInterval(interval);

    }, []);

    return (
        <div className="date-time">
            <div className="date-time-container-wrapper">
                <div className="date-time-container">
                    <div className="date">
                        <span>{dateTime.date}</span>
                    </div>
                    <div className="time">
                        <span>{dateTime.time}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}