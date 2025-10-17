"use client";
import React from "react";
import WelcomeNote from "../Welcome/welcomNote";
import myImage from "/public/Image/IMG_0860.png";

export default function Hero() {
  return (
    <div
      className="relative h-screen w-full overflow-hidden"
      style={{ backgroundColor: "#070404ba" }} // ✅ Fixed background color
    >
      {/* Background Image - Diagonal */}
      <div
        className="absolute inset-0 bg-cover z-1 bg-center bg-no-repeat transform scale-105 transition-transform duration-700 hover:scale-100"
        style={{
          backgroundImage: `url(${myImage.src})`,
          clipPath: "polygon(0 0, 60% 0, 40% 100%, 0% 100%)",
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="w-full max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
          <WelcomeNote />
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute bottom-8 left-8 w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
      <div className="absolute top-1/4 right-8 w-1 h-1 bg-purple-500 rounded-full animate-pulse"></div>
      <div className="absolute top-1/3 left-1/4 w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce"></div>
    </div>
  );
}
