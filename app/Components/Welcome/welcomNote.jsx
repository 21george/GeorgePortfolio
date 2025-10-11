"use client";
import React, { useEffect, useState } from 'react'

export default function WelcomeNote() {
    const [NoteWelcome, setNoteWelcome] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // get data from database and display it here
    const Getrequesthandle = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch("/api/WellcomeNote");
            if (!response.ok) {
                const errorText = await response.text();
                console.error("Response error:", errorText);
                throw new Error(`Network response was not ok: ${response.status} - ${errorText}`);
            }
            const data = await response.json();
            setNoteWelcome(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        Getrequesthandle();
    }, []);

    return (
        <main className="relative h-screen w-full overflow-hidden transition-colors duration-300">
            {/* Content Section */}
            <section className="hero-text-wrapper relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-6 lg:px-8 text-center">
                <div className="mx-auto w-full">
                    <div className="flex justify-center text-gray-900 dark:text-white mt-[-8em] px-4 sm:px-6 lg:px-8">
                        <div className="w-full mx-auto">
                            {NoteWelcome.map((note) => (
                                <div
                                    key={note._id}
                                    className="p-6 sm:p-8 lg:p-10 mb-8 w-full duration-300 hover:scale-[1.02]"
                                >
                                    {/* Large stretched white heading */}
                                    <h2 className="w-full text-white dark:text-white text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold mb-8 text-center font-['Bitcount'] leading-tight tracking-wide">
                                        {note.name}
                                    </h2>
                                    
                                    {/* Content */}
                                    <div className="text-base sm:text-lg lg:text-xl leading-relaxed space-y-4 font-['Geist_Mono'] text-gray-700 dark:text-gray-300 break-words">
                                        <p className='text-base text-gray-700 dark:text-gray-300'>
                                            {note.massage}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
