"use client";

import React from "react";

export default function Footer({ text, children, className = "" }) {
  return (
    <footer
      className={`relative flex flex-col items-center justify-center overflow-hidden ${className}`}
    >
      {/* SVG Background */}
      <div className="w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1920 676"
          preserveAspectRatio="xMidYMid slice"
          style={{
            width: "100%",
            height: "100%",
            transform: "translate3d(0px, 0px, 0px)",
          }}
        >
          <defs>
            <clipPath id="__lottie_element_187">
              <rect width="1920" height="676" x="0" y="0" />
            </clipPath>
            <clipPath id="__lottie_element_194">
              <path d="M0,0 L129,0 L129,637 L0,637z" />
            </clipPath>
            <clipPath id="__lottie_element_202">
              <path d="M0,0 L221,0 L221,637 L0,637z" />
            </clipPath>
            <clipPath id="__lottie_element_210">
              <path d="M0,0 L240,0 L240,637 L0,637z" />
            </clipPath>
            <clipPath id="__lottie_element_218">
              <path d="M0,0 L311,0 L311,637 L0,637z" />
            </clipPath>
            <clipPath id="__lottie_element_226">
              <path d="M0,0 L320,0 L320,649 L0,649z" />
            </clipPath>
            <clipPath id="__lottie_element_234">
              <path d="M0,0 L445,0 L445,637 L0,637z" />
            </clipPath>
            <clipPath id="__lottie_element_242">
              <path d="M0,0 L280,0 L280,637 L0,637z" />
            </clipPath>
          </defs>

          <g clipPath="url(#__lottie_element_187)">
            {/* R */}
            <g
              clipPath="url(#__lottie_element_234)"
              transform="matrix(1,0,0,1,37.41,18.5)"
            >
              <g transform="matrix(1,0,0,1,-22,-91)">
                <path
                  fill="rgb(0,0,0)"
                  d="M22.8,728V91h190.1c78.9,0,118.3,39.4,118.3,118.3v122.9c0,49.7-18.2,81.3-54.6,94.6c37,10.3,55.6,37.6,55.6,81.9V728H204.8V509.6c0-15.2-7.6-22.7-22.8-22.7h-31.8V728H22.8zM203.8,355.8V224.8c0-15.2-7.5-22.8-22.7-22.8h-30.9v176.6h30.9C196.3,378.6,203.8,371,203.8,355.8z"
                />
              </g>
            </g>

            {/* E */}
            <g
              clipPath="url(#__lottie_element_210)"
              transform="matrix(1,0,0,1,374.52,18.5)"
            >
              <g transform="matrix(1,0,0,1,-22,-91)">
                <path
                  fill="rgb(0,0,0)"
                  d="M22.8,728V91h236.6v113.8H150.2v142.8h104.6v113.8H150.2v166.7h111V728H22.8z"
                />
              </g>
            </g>

            {/* A */}
            <g
              clipPath="url(#__lottie_element_226)"
              transform="matrix(1,0,0,1,654.99,18.5)"
            >
              <g transform="matrix(1,0,0,1,-22,-91)">
                <path
                  fill="rgb(0,0,0)"
                  d="M261.4,728L236.7,632.5H138.9L114.2,728H22.8L137.9,91h106.8L359.8,728H261.4zM187.8,295.6L160.2,415.8h55.2L187.8,295.6z"
                />
              </g>
            </g>

            {/* L */}
            <g
              clipPath="url(#__lottie_element_202)"
              transform="matrix(1,0,0,1,991.89,18.5)"
            >
              <g transform="matrix(1,0,0,1,-22,-91)">
                <path
                  fill="rgb(0,0,0)"
                  d="M22.8,728V91h127.4v523.3h91.9V728H22.8z"
                />
              </g>
            </g>

            {/* N */}
            <g
              clipPath="url(#__lottie_element_234)"
              transform="matrix(1,0,0,1,1244.41,18.5)"
            >
              <g transform="matrix(1,0,0,1,-22,-91)">
                <path
                  fill="rgb(0,0,0)"
                  d="M22.8,91H206.6L243.9,475.9L282.1,91H466.8V728H341.3V310.3L293,728H172.9L124.7,305.8V728H22.8V91z"
                />
              </g>
            </g>

            {/* E */}
            <g
              clipPath="url(#__lottie_element_210)"
              transform="matrix(1,0,0,1,1581.52,18.5)"
            >
              <g transform="matrix(1,0,0,1,-22,-91)">
                <path
                  fill="rgb(0,0,0)"
                  d="M22.8,728V91h236.6v113.8H150.2v142.8h104.6v113.8H150.2v166.7h111V728H22.8z"
                />
              </g>
            </g>

            {/* T */}
            <g
              clipPath="url(#__lottie_element_242)"
              transform="matrix(1,0,0,1,1818.87,18.5)"
            >
              <g transform="matrix(1,0,0,1,-22,-91)">
                <path
                  fill="rgb(0,0,0)"
                  d="M22.8,91h280v113.8H202.5V728h-127.4V204.8H22.8V91z"
                />
              </g>
            </g>
          </g>
        </svg>
      </div>

      {/* Footer Text or Children */}
      <div className="absolute bottom-10 mt-[2rem] text-center text-gray-200 text-sm sm:text-base font-medium">
        {children ? children : text}
      </div>
      
    </footer>
  );
}
