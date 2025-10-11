'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

export default function AnimatedHeader({ lines = [] }) {
  // Helper animation function
  const animateText = (selector, vars) => {
    gsap.fromTo(selector, { y: 100, opacity: 0 }, vars);
  };

  // Animate each line when component mounts
  useGSAP(() => {
    lines.forEach((_, index) => {
      animateText(`.animated-header-line-${index}`, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        delay: index * 0.2,
        ease: 'power3.out',
      });
    });
  }, [lines]);

  return (
    <section className="pt-24 sm:pt-32 pb-12 sm:pb-20 px-6 sm:px-10 lg:px-16 relative overflow-hidden">
      <div className="faq_header relative">
        <div className="faq_header-wrapper mx-auto flex flex-col sm:flex-row items-center justify-between">
          <div className="flex-1 text-center sm:text-left font-mono text-gray-500 dark:text-gray-400">
            {lines.map((line, index) => (
              <h2
                key={index}
                className={`animated-header-line-${index} text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold uppercase text-gray-900 dark:text-white`}
              >
                {line}
              </h2>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
