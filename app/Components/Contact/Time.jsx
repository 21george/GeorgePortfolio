"use client";
import React, { useEffect, useState } from 'react'

export default function Time() {
    const [currentTime, setCurrentTime] = useState("");
    const [timezone, setTimezone] = useState("");

    useEffect(() => {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        setTimezone(tz);

        const updateClock = () => {
            const now = new Date();
            const options = {
                hour: "2-digit", 
                minute: "2-digit", 
                timeZone: tz,
                hour12: true
            };
            const formattedTime = now.toLocaleTimeString("en-US", options);
            setCurrentTime(formattedTime);
        };

        updateClock();
        const intervalId = setInterval(updateClock, 1000);
        return () => clearInterval(intervalId);
    }, []);

    const getTimezoneAbbreviation = (tz) => {
        try {
            const now = new Date();
            const timeZoneOptions = { timeZone: tz, timeZoneName: 'short' };
            const parts = new Intl.DateTimeFormat('en-US', timeZoneOptions).formatToParts(now);
            const timeZonePart = parts.find(part => part.type === 'timeZoneName');
            return timeZonePart ? timeZonePart.value : tz;
        } catch (error) {
            return tz;
        }
    };

    return (
        <div className="tr__time__zone flex space-x-2 text-lg sm:text-2xl text-black dark:text-white">
            <span>{currentTime}</span>
        </div>
    );
}