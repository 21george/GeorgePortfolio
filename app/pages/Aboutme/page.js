"use client";
import React from "react";
import gsap from "gsap";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { useTextAnimation } from "../../hooks/useTextAnimation";
import IMG_0879 from "../../../public/Image/IMG_0860.png";

export default function AboutMePage() {
  const { animateText, cleanup } = useTextAnimation();

  useGSAP(() => {
    animateText(".faq-h1", {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power3.out",
    });
    animateText(".faq-h2", {
      y: 0,
      opacity: 1,
      duration: 1.2,
      delay: 0.2,
      ease: "power3.out",
    });
    animateText(".faq-h3", {
      y: 0,
      opacity: 1,
      duration: 1.2,
      delay: 0.4,
      ease: "power3.out",
    });

    gsap.fromTo(
      ".imgs-wrapper img",
      { clipPath: "inset(0% 100% 0% 0%)" },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.5,
        ease: "power2.out",
        stagger: 0.2,
      }
    );
    return cleanup;
  }, [animateText, cleanup]);

  return (
    <main className="bg-black dark:bg-black-900 text-black dark:text-white min-h-screen transition-colors duration-300">
      {/* Header Section */}
    <section className="pt-24 h-[34em] sm:pt-32 pb-12 sm:pb-20 px-6 sm:px-10 lg:px-16 relative overflow-hidden">
  {/* Subtle Gradient / Background */}
  <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black opacity-90" />
  <div className="relative z-10">
    <div className="mx-auto flex flex-col sm:flex-row items-center justify-between">
      <div className="flex-1 text-center sm:text-left font-mono text-gray-500 dark:text-gray-400">
        {/* Layered Title Style */}
        <h2 className="faq-h1 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold uppercase text-gray-900 dark:text-white leading-tight">
          Hello,
        </h2>
        <h2 className="faq-h2 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold uppercase text-gray-900 dark:text-white leading-tight">
          I’m <span className="text-red-500 dark:text-red-400">George</span>
        </h2>
        {/* Subtext */}
        <p className="mt-6 text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
          A Software Developer focused on designing and building engaging, high-performance web applications
          that merge functionality with elegant design.
        </p>
      </div>

      {/* Hero Image */}
      <div className="flex-1 mt-12 sm:mt-0 flex justify-center">
        <div className="relative w-[18rem] h-[18rem] sm:w-[24rem] sm:h-[24rem] md:w-[28rem] md:h-[28rem]  overflow-hidden ">
          <Image
            src={IMG_0879}
            alt="George - Software Developer"
            fill
            className="object-cover hover:scale-105 transition-transform duration-700"
            priority
          />
        </div>
      </div>
          </div>
           <h2 className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[15vw] font-extrabold uppercase text-gray-800/10 tracking-tight select-none pointer-events-none">
    George
  </h2>
  </div>
</section>



      {/* About Section */}
      <section className="pt-20 sm:pt-28 md:pt-32 pb-10 sm:pb-16 md:pb-20 px-4 sm:px-8 lg:px-16 relative overflow-hidden">
        <div className="p-4 sm:p-6 md:p-8 flex flex-col justify-center space-y-6 max-w-5xl mx-auto">
          <div className="mb-6 sm:mb-8 ml-12 mr-12">
            <div className="mb-10 sm:mb-12 faq_header-wrapper mx-auto flex flex-col sm:flex-row items-center justify-center sm:justify-between">
              <div className="flex-1 text-center sm:text-left font-mono text-gray-500 dark:text-gray-400 sm:pl-6 md:pl-8">
                <h2 className="faq-h3 text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold uppercase text-gray-900 dark:text-white sm:-translate-x-4 md:-translate-x-6">
                  About Me
                </h2>
              </div>
            </div>

            <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed mb-6">
              I am a passionate web developer with a knack for creating dynamic and
              responsive web applications. With a strong foundation in both front-end
              and back-end technologies, I strive to build seamless user experiences
              that are both functional and visually appealing.
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed">
              My journey in web development began several years ago, and since then, I
              have honed my skills in various programming languages and frameworks. I
              enjoy collaborating with cross-functional teams to bring innovative
              ideas to life and continuously learning new technologies to stay ahead
              in this ever-evolving field.
            </p>
          </div>

       
        </div>
      </section>
    </main>
  );
}
