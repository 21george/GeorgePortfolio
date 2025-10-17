"use client";
import React, { useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Github, Instagram, Sun, Moon } from "lucide-react";
import { useTextAnimation } from "../../hooks/useTextAnimation";
import { useTheme } from "../../context/ThemeContext";

export default function NavigationBar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isDarkMode, toggleTheme, isLoaded } = useTheme();
  const { animateText, cleanup } = useTextAnimation();

  useGSAP(() => {
    if (isOpen) {
      gsap.to(".imgs-wrapper img", {
        clipPath: "inset(0% 100% 0% 0%)",
      });

      // Animate navigation items using the custom hook
      animateText('.nav-text', {
        y: 20,
        autoAlpha: 0,
        stagger: 0.05,
        duration: 0.6,
        ease: "power2.out"
      });
    } else {
      // Cleanup when menu closes
      cleanup();
    }
  }, [isOpen, animateText, cleanup]);

  const navItems = [
    { name: "Home", link: "/" },
    { name: "About", link: "/pages/Aboutme" },
    { name: "Projects", link: "/pages/Projects" },
    { name: "FQA", link: "/pages/FQAPage" },
    { name: "Contact", link: "/pages/Contacts" },
    { name: "Postform", link: "/pages/Postrequest" },
  ];

  if (!isLoaded) {
    return null; // Prevent flash of incorrect theme
  }

  return (
    <nav className="fixed w-full p-2 sm:p-4 md:p-6 lg:p-10 z-40 text-gray-800 dark:text-gray-100 flex items-center justify-between bg-transparent">
      {/* Logo */}
      <div className="header-logo">
          <a id="logo-link" href="./" aria-label="Go back to homepage" className="logo-home-link">
            <div className="logo-home-wrapper">
              <div id="logo-home" className="">
                <div className="logo-text logo-text-1">
                  <svg width="56" height="22" viewBox="0 0 56 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="first">
                    <path fillRule="evenodd" clipRule="evenodd" d="M4.40776 0.488281V17.2157H14.177V21.0098H0V0.488281H4.40776Z"></path>
                    <path fillRule="evenodd" clipRule="evenodd" d="M31.3866 19.4437C29.8698 20.7947 27.7745 21.4699 25.0981 21.4699C22.3845 21.4699 20.2825 20.7995 18.7956 19.4573C17.3073 18.1171 16.5635 16.0466 16.5635 13.2493V0.488037H20.9712V13.2493C20.9712 13.8055 21.0171 14.3515 21.112 14.888C21.2057 15.4252 21.4009 15.8984 21.7018 16.3104C22.0006 16.7232 22.417 17.0584 22.9503 17.3161C23.4836 17.5752 24.1989 17.7043 25.0981 17.7043C26.6694 17.7043 27.7552 17.3447 28.3549 16.628C28.9533 15.9086 29.2522 14.7819 29.2522 13.2493V0.488037H33.6599V13.2493C33.6599 16.0289 32.9015 18.0926 31.3866 19.4437Z"></path>
                    <path fillRule="evenodd" clipRule="evenodd" d="M50.3066 5.96408C50.0442 5.53163 49.7168 5.15426 49.323 4.82856C48.9305 4.50219 48.4862 4.24925 47.9901 4.06702C47.494 3.88479 46.974 3.79436 46.4321 3.79436C45.4399 3.79436 44.5985 3.9895 43.9051 4.38251C43.2138 4.77553 42.6519 5.30317 42.2209 5.96408C41.7899 6.62363 41.4778 7.37769 41.2805 8.21879C41.0833 9.06396 40.9856 9.9343 40.9856 10.8345C40.9856 11.6974 41.0833 12.5365 41.2805 13.3504C41.4778 14.1649 41.7899 14.8972 42.2209 15.5493C42.6519 16.2 43.2138 16.7229 43.9051 17.1159C44.5985 17.5089 45.4399 17.7041 46.4321 17.7041C47.7796 17.7041 48.8329 17.2825 49.59 16.4394C50.3477 15.5962 50.8113 14.4852 50.9807 13.1063H55.2476C55.1347 14.3893 54.8445 15.5493 54.377 16.5835C53.9088 17.6177 53.2911 18.5003 52.5241 19.2285C51.7563 19.9561 50.8578 20.5129 49.8297 20.8951C48.799 21.2786 47.6674 21.4696 46.4321 21.4696C44.8973 21.4696 43.5173 21.1963 42.2906 20.651C41.066 20.105 40.032 19.353 39.1892 18.3942C38.3464 17.4362 37.7009 16.3109 37.252 15.0169C36.803 13.7237 36.5779 12.3298 36.5779 10.8345C36.5779 9.30195 36.803 7.87949 37.252 6.56787C37.7009 5.25421 38.3464 4.10918 39.1892 3.13277C40.032 2.155 41.066 1.3887 42.2906 0.832502C43.5173 0.277663 44.8973 0.000244141 46.4321 0.000244141C47.5372 0.000244141 48.5799 0.162072 49.5628 0.488447C50.545 0.814143 51.4249 1.28875 52.2006 1.9109C52.977 2.53373 53.6185 3.30412 54.1246 4.22477C54.63 5.14338 54.9468 6.1973 55.0789 7.38653H50.8113C50.7363 6.86909 50.5689 6.39448 50.3066 5.96408Z"></path>
                  </svg>
                </div>
                <div id="logo-link-container" className="">
                  <svg width="20" height="47" viewBox="0 0 20 47" fill="none" xmlns="http://www.w3.org/2000/svg" className="logo" id="logo">
                    <path fillRule="evenodd" clipRule="evenodd" d="M20.0002 12.3494V7.73741L0.000244141 0V4.52789L4.45404 6.13163L7.73094 7.30767L15.07 9.97153V10.0291L7.73094 12.6076L4.45404 13.7823L0.000244141 15.3304V20L20.0002 12.3494Z"></path>
                    <path fillRule="evenodd" clipRule="evenodd" d="M0 34.1635L20 27V31.993L5.93817 36.923V36.9853L20 41.9762L20 47L0 39.6517L0 34.1635Z"></path>
                  </svg>
                </div>
                <div className="logo-text logo-text-2">
                  <svg width="88" height="22" viewBox="0 0 88 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="second">
                    <path fillRule="evenodd" clipRule="evenodd" d="M4.80395 13.3506C5.0012 14.1651 5.31333 14.8974 5.74435 15.5495C6.17536 16.2002 6.73654 16.7231 7.42855 17.1161C8.1219 17.5084 8.96267 17.7043 9.95553 17.7043C10.9477 17.7043 11.7892 17.5084 12.4818 17.1161C13.1739 16.7231 13.735 16.2002 14.1661 15.5495C14.5971 14.8974 14.9112 14.1651 15.1064 13.3506C15.3037 12.536 15.4013 11.6976 15.4013 10.8347C15.4013 9.93381 15.3037 9.06348 15.1064 8.21898C14.9112 7.3772 14.5971 6.62382 14.1661 5.96427C13.735 5.30268 13.1739 4.77504 12.4818 4.38271C11.7892 3.9897 10.9477 3.79387 9.95553 3.79387C8.96267 3.79387 8.1219 3.9897 7.42855 4.38271C6.73654 4.77504 6.17536 5.30268 5.74435 5.96427C5.31333 6.62382 5.0012 7.3772 4.80395 8.21898C4.60671 9.06348 4.50908 9.93381 4.50908 10.8347C4.50908 11.6976 4.60671 12.536 4.80395 13.3506ZM0.7754 6.56738C1.22435 5.2544 1.86987 4.10937 2.71264 3.13296C3.55541 2.15451 4.58944 1.38889 5.81408 0.832693C7.04071 0.277175 8.42075 -0.000244141 9.95553 -0.000244141C11.5089 -0.000244141 12.8936 0.277175 14.1096 0.832693C15.3276 1.38889 16.357 2.15451 17.1978 3.13296C18.0405 4.10937 18.6867 5.2544 19.1357 6.56738C19.5839 7.879 19.8091 9.30146 19.8091 10.8347C19.8091 12.33 19.5839 13.7238 19.1357 15.0171C18.6867 16.3104 18.0405 17.4357 17.1978 18.3944C16.357 19.3525 15.3276 20.1045 14.1096 20.6505C12.8936 21.1965 11.5089 21.4698 9.95553 21.4698C8.42075 21.4698 7.04071 21.1965 5.81408 20.6505C4.58944 20.1045 3.55541 19.3525 2.71264 18.3944C1.86987 17.4357 1.22435 16.3104 0.7754 15.0171C0.326455 13.7238 0.101318 12.33 0.101318 10.8347C0.101318 9.30146 0.326455 7.879 0.7754 6.56738Z"></path>
                    <path fillRule="evenodd" clipRule="evenodd" d="M27.221 0.488281V17.2157H36.9902V21.0098H22.8132V0.488281H27.221Z"></path>
                    <path fillRule="evenodd" clipRule="evenodd" d="M39.4609 21.0098H43.8687V0.488281H39.4609V21.0098Z"></path>
                    <path fillRule="evenodd" clipRule="evenodd" d="M52.1216 0.488281L60.4868 14.2559H60.5433V0.488281H64.6695V21.0098H60.2617L51.9243 7.27145H51.8685V21.0098H47.7417V0.488281H52.1216Z"></path>
                    <path fillRule="evenodd" clipRule="evenodd" d="M72.376 13.3506C72.5732 14.1651 72.8854 14.8974 73.3164 15.5495C73.7474 16.2002 74.3086 16.7231 75.0006 17.1161C75.6939 17.5084 76.5347 17.7043 77.5276 17.7043C78.5198 17.7043 79.3612 17.5084 80.0539 17.1161C80.7459 16.7231 81.3071 16.2002 81.7381 15.5495C82.1691 14.8974 82.4832 14.1651 82.6785 13.3506C82.8757 12.536 82.9733 11.6976 82.9733 10.8347C82.9733 9.93381 82.8757 9.06348 82.6785 8.21898C82.4832 7.3772 82.1691 6.62382 81.7381 5.96427C81.3071 5.30268 80.7459 4.77504 80.0539 4.38271C79.3612 3.9897 78.5198 3.79387 77.5276 3.79387C76.5347 3.79387 75.6939 3.9897 75.0006 4.38271C74.3086 4.77504 73.7474 5.30268 73.3164 5.96427C72.8854 6.62382 72.5732 7.3772 72.376 8.21898C72.1787 9.06348 72.0811 9.93381 72.0811 10.8347C72.0811 11.6976 72.1787 12.536 72.376 13.3506ZM68.3474 6.56738C68.7964 5.2544 69.4419 4.10937 70.2847 3.13296C71.1274 2.15451 72.1615 1.38889 73.3861 0.832693C74.6127 0.277175 75.9928 -0.000244141 77.5276 -0.000244141C79.0809 -0.000244141 80.4656 0.277175 81.6816 0.832693C82.8996 1.38889 83.929 2.15451 84.7698 3.13296C85.6126 4.10937 86.2587 5.2544 86.7077 6.56738C87.156 7.879 87.3811 9.30146 87.3811 10.8347C87.3811 12.33 87.156 13.7238 86.7077 15.0171C86.2587 16.3104 85.6126 17.4357 84.7698 18.3944C83.929 19.3525 82.8996 20.1045 81.6816 20.6505C80.4656 21.1965 79.0809 21.4698 77.5276 21.4698C75.9928 21.4698 74.6127 21.1965 73.3861 20.6505C72.1615 20.1045 71.1274 19.3525 70.2847 18.3944C69.4419 17.4357 68.7964 16.3104 68.3474 15.0171C67.8985 13.7238 67.6733 12.33 67.6733 10.8347C67.6733 9.30146 67.8985 7.879 68.3474 6.56738Z"></path>
                  </svg>
                </div>
              </div>
            </div>
          </a>
        </div>

      {/* Dark mode toggle */}
      
       <div id="logo-link-container" class="">
                  <svg width="20" height="47" viewBox="0 0 20 47" fill="none" xmlns="http://www.w3.org/2000/svg" class="logo" id="logo">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M20.0002 12.3494V7.73741L0.000244141 0V4.52789L4.45404 6.13163L7.73094 7.30767L15.07 9.97153V10.0291L7.73094 12.6076L4.45404 13.7823L0.000244141 15.3304V20L20.0002 12.3494Z"></path>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0 34.1635L20 27V31.993L5.93817 36.923V36.9853L20 41.9762L20 47L0 39.6517L0 34.1635Z"></path>
                  </svg>
                </div>
      {/* Menu Toggle with White Circle */}
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
          {/* Top Section */}
          <div className="flex flex-col sm:flex-row justify-between pt-[14em] xs:pt-[5em] sm:pt-[16em] md:pt-[10em] lg:pt-[12em]">
            {/* Navigation Links */}
            <div
              className="flex flex-col justify-center w-full sm:w-1/2 transform:translate3d(0%, 0%, 0%) space-y-2 xs:space-y-3 sm:space-y-4 md:space-y-5 
                         uppercase tracking-tight text-5xl sm:text-4xl md:text-5xl lg:text-6xl leading-none
                         font-[Brockmann,Tahoma,sans-serif] text-center sm:text-left"
            >
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.link}
                  className="text-gray-900 dark:text-white flex items-center sm:items-start justify-center sm:justify-start relative overflow-hidden 
                             cursor-pointer hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-300 py-1 nav-text opacity-0"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          {/* Bottom Line + Social Media */}
          <div className="w-full flex flex-col sm:flex-row items-center justify-between mt-6 sm:mt-8 md:mt-10 border-t border-gray-300 dark:border-gray-700 pt-4 sm:pt-6 space-y-3 sm:space-y-0 text-center sm:text-left">
            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 tracking-wide">
              © {new Date().getFullYear()} George — All Rights Reserved
            </div>

            <div className="flex space-x-3 sm:space-x-4 md:space-x-6">
              <a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300 transition-colors p-1"
              >
                <Github size={18} className="xs:w-5 xs:h-5 sm:w-6 sm:h-6" />
              </a>
              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300 transition-colors p-1"
              >
                <Instagram size={18} className="xs:w-5 xs:h-5 sm:w-6 sm:h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
