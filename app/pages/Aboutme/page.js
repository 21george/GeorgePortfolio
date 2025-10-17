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
      <section className="pt-20 sm:pt-28 md:pt-36 pb-10 sm:pb-16 md:pb-20 px-4 sm:px-8 lg:px-16 relative overflow-hidden">
        <div className="faq_header relative w-full text-center sm:text-left">
          <div className="faq_header-wrapper mx-auto flex flex-col sm:flex-row items-center justify-center sm:justify-between">
            <div className="flex-1 font-mono text-gray-500 dark:text-gray-400 sm:pl-6 md:pl-8">
              <h2 className="faq-h6 text-5xl sm:text-5xl md:text-8xl lg:text-[10rem] xl:text-[12rem] font-extrabold uppercase text-gray-900 dark:text-white leading-tight sm:-translate-x-4 md:-translate-x-6">
                Hello Im George
              </h2>
            </div>
          </div>
        </div>

        {/* Responsive Image - Much Bigger */}
        <div className="relative w-full mt-[-8rem] sm:mt-2 lg:mt-[-12] flex justify-center">
          <div className="w-full max-w-[1400px]">
            <Image
              src={IMG_0879}
              alt="George - About Me"
              width={1400}
              height={1400}
              className="w-[50em] h-[50em] sm:w-[60em] sm:h-[60em] lg:w-[70em] lg:h-[70em] object-cover transition-transform duration-500"
              priority
            />
          </div>
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

          <div className="pt-4">
            <h4 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Skills & Technologies
            </h4>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {[
                "React",
                "Next.js",
                "JavaScript",
                "TypeScript",
                "Node.js",
                "Tailwind CSS",
              ].map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm sm:text-base font-medium transition-transform hover:scale-105"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
