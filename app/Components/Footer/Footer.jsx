"use client";
import React from 'react'

export default function Footer() {
    const defaultData = {
        footer: "©2025 REALNET®",
    };

    return (
        <div className="flex flex-col sm:flex-row justify-between pt-16 dark:border-gray-600">
            <div className=" mb-4 sm:mb-0">
                <p className="text-lg sm:text-base text-gray-500 ml-[12em] dark:text-gray-400">
                    {defaultData.footer}
                </p>
            </div>
            <div className='mr-[12em] mb-12'>
                <a
                    aria-label="Back to top"
                    className="inline-block p-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-full transition-colors duration-300"
                    href="#top"
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-black dark:text-white"
                    >
                        <path
                            d="M12 19V5M5 12L12 5L19 12"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </a>
            </div>
        </div>
    );
}
