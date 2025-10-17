'use client';
import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function WelcomeNote() {
  const [NoteWelcome, setNoteWelcome] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch notes from API
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
  };

  useEffect(() => {
    Getrequesthandle();
  }, []);

  // GSAP animation
  useGSAP(() => {
    NoteWelcome.forEach((note, index) => {
      gsap.fromTo(
        `.note-heading-${index}`,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: index * 0.3, ease: 'power3.out' }
      );

      gsap.fromTo(
        `.note-content-${index}`,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.2 + index * 0.3, ease: 'power3.out' }
      );
    });
  }, [NoteWelcome]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-xl">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 text-xl">
        Error: {error}
      </div>
    );
  }

  return (
    <main className="relative h-screen w-full overflow-hidden transition-colors duration-300">
      <section className="hero-text-wrapper relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-6 lg:px-8 text-center">
        <div className="mx-auto w-full">
          <div className="flex justify-center text-gray-900 dark:text-white mt-[-8em] px-4 sm:px-6 lg:px-8">
            <div className="w-full mx-auto">
              {NoteWelcome.map((note, index) => (
                <div
                  key={note._id}
                  className="p-6 sm:p-8 lg:p-10 mb-8 w-full duration-300 hover:scale-[1.02]"
                >
                  {/* Fixed Animated heading */}
                  <h2
                    className={`note-heading-${index} text-white dark:text-white text-4xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl text-gray-700 font-bold mb-8 text-center font-['Bitcount'] leading-tight tracking-wide`}
                  >
                    {note.name}
                  </h2>

                  {/* Animated content */}
                  <div
                    className={`note-content-${index} text-base sm:text-lg lg:text-xl leading-relaxed space-y-4 font-['Geist_Mono'] text-gray-700 dark:text-gray-300 break-words`}
                  >
                    
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
