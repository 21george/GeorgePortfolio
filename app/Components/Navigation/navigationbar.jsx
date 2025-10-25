"use client";
import React, { useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Github, Instagram, Sun, Moon } from "lucide-react";
import { useTextAnimation } from "../../hooks/useTextAnimation";
import { useTheme } from "../../context/ThemeContext";
import logoIvon from "/public/Image/1.png";
import Image from "next/image"; // ✅ Correct import

export default function NavigationBar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isDarkMode, toggleTheme, isLoaded } = useTheme();
  const { animateText, cleanup } = useTextAnimation();

  useGSAP(() => {
    if (isOpen) {
      gsap.to(".imgs-wrapper img", {
        clipPath: "inset(0% 100% 0% 0%)",
      });

      animateText(".nav-text", {
        y: 20,
        autoAlpha: 0,
        stagger: 0.05,
        duration: 0.6,
        ease: "power2.out",
      });
    } else {
      cleanup();
    }
  }, [isOpen, animateText, cleanup]);

  const navItems = [
    { name: "Home", link: "/" },
    { name: "About", link: "/pages/Aboutme" },
    { name: "Projects", link: "/pages/Projects" },
    { name: "FQA", link: "/pages/FQAPage" },
    { name: "Contact", link: "/pages/Contacts" },
  ];

  if (!isLoaded) return null;

  return (
    <nav className="fixed w-full p-2 sm:p-4 md:p-6 lg:p-10 z-40 text-gray-800 dark:text-gray-100 flex items-center justify-between bg-transparent">
      {/* Logo */}
      <div className="header-logo">
        <a href="/" aria-label="Go back to homepage" className="logo-home-link flex items-center">
          <Image
            src={logoIvon}
            alt="Logo"
            width={50}  // ✅ added dimensions to avoid warnings
            height={50}
            className="rounded-full"
            priority
          />
          <div className="ml-2">
            <svg
              width="56"
              height="22"
              viewBox="0 0 56 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="first"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.40776 0.488281V17.2157H14.177V21.0098H0V0.488281H4.40776Z"
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M31.3866 19.4437C29.8698 20.7947 27.7745 21.4699 25.0981 21.4699C22.3845 21.4699 20.2825 20.7995 18.7956 19.4573C17.3073 18.1171 16.5635 16.0466 16.5635 13.2493V0.488037H20.9712V13.2493C20.9712 13.8055 21.0171 14.3515 21.112 14.888C21.2057 15.4252 21.4009 15.8984 21.7018 16.3104C22.0006 16.7232 22.417 17.0584 22.9503 17.3161C23.4836 17.5752 24.1989 17.7043 25.0981 17.7043C26.6694 17.7043 27.7552 17.3447 28.3549 16.628C28.9533 15.9086 29.2522 14.7819 29.2522 13.2493V0.488037H33.6599V13.2493C33.6599 16.0289 32.9015 18.0926 31.3866 19.4437Z"
              ></path>
            </svg>
          </div>
        </a>
      </div>

      {/* Menu Toggle Button */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer relative z-50 w-14 h-14 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
      >
        <span className="text-xs sm:text-sm md:text-base lg:text-lg font-medium text-black">
          {isOpen ? "Close" : "Menu"}
        </span>
      </div>

      {/* Navigation Overlay */}
      <div
        className={`${
          isOpen ? "h-full opacity-100" : "h-0 opacity-0"
        } bg-white dark:bg-neutral-800 fixed inset-0 overflow-hidden transition-all duration-500 ease-in-out`}
      >
        <div className="flex flex-col justify-between h-full p-4 xs:p-6 sm:p-8 md:p-12 lg:p-20">
          {/* Navigation Links */}
          <div className="flex flex-col justify-center w-full sm:w-1/2 space-y-5 uppercase tracking-tight text-5xl sm:text-4xl md:text-5xl lg:text-6xl leading-none font-[Brockmann,Tahoma,sans-serif] text-center sm:text-left">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.link}
                className="text-gray-900 dark:text-white flex justify-center sm:justify-start relative overflow-hidden cursor-pointer hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-300 py-1 nav-text opacity-0"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Footer Section */}
          <div className="w-full flex flex-col sm:flex-row items-center justify-between mt-6 border-t border-gray-300 dark:border-gray-700 pt-4 sm:pt-6 text-center sm:text-left">
            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 tracking-wide">
              © {new Date().getFullYear()} George — All Rights Reserved
            </div>

            <div className="flex space-x-4">
              <a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300 transition-colors"
              >
                <Github size={22} />
              </a>
              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300 transition-colors"
              >
                <Instagram size={22} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
