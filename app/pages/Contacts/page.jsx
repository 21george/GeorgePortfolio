"use client";
import Contacts from "@/app/Components/Contact/contact";
import ContactDetails from "@/app/Components/Contact/ContactDetails";
import { useTextAnimation } from "@/app/hooks/useTextAnimation";
import { useGSAP } from "@gsap/react";

export default function Page() {
      const { animateText, cleanup } = useTextAnimation();
    
    useGSAP(() => {
        animateText('.nav-text', {
            y: 20,
            opacity: 1,
            duration: 2,
            stagger: 0.1,
            ease: "sine.out"
        })
    }, [animateText, cleanup]);

  return (
    <main className="bg-neutral-800 text-white min-h-screen flex flex-col px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="flex flex-col w-[12em] mt-[22em] items-center justify-center text-center w-full max-w-4xl mx-auto mb-12 flex-1 px-4">
        <div className="flex flex-col justify-center w-full sm:w-1/2 transform:translate3d(0%, 0%, 0%) space-y-2 xs:space-y-3 sm:space-y-4 md:space-y-5 
                         uppercase tracking-tight text-5xl sm:text-4xl md:text-5xl lg:text-6xl leading-none
                         font-[Brockmann,Tahoma,sans-serif] text-center sm:text-left">
          {/* ❌ font-[wind] and font-size-[3em] are invalid → replaced with valid Tailwind syntax */}
          <h2 className="text-gray-300 italic font-bold  nav-text opacity-0 leading-tight text-6xl sm:text-4xl md:text-5xl lg:text-6xl">
            Let&apos;s Create Your Ideas Together
          </h2>
        </div>
        <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-8 sm:mb-12">
          <p className="text-gray-200 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            We bring your ideas to life in three weeks of working together.
          </p>
        </div>
      </header>

      {/* Animated Arrow */}
      <section id="contact-form" className="mb-[1em] mt-[12em] flex justify-center rounded-full">
        <div className="flex justify-center animate-bounce rounded-full w-10 h-6 items-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
            className="w-full h-auto max-w-[24px]" fill="white">
            <g data-name="15.Arrow Down">
              <path d="M12 24a12 12 0 1 1 12-12 12.013 12.013 0 0 1-12 12zm0-22a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2z" />
              <path d="m12 18.414-4.707-4.707 1.414-1.414L12 15.586l3.293-3.293 1.414 1.414L12 18.414z" />
              <path d="M11 6h2v11h-2z" />
            </g>
          </svg>
        </div>
      </section>
      {/* Contact Section */}
      <section className="flex pt-12">
        <Contacts />
          </section>
          <section className="flex pt-12">
              <ContactDetails />
          </section>
    </main>
  );
}
