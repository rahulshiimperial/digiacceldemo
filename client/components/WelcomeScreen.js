"use client";
import Image from "next/image";
import React from "react";

export default function WelcomeScreen({ onGetStarted }) {
  return (
    <div className="w-full h-[100dvh] sm:max-w-md sm:mx-auto sm:my-8 sm:rounded-[40px] sm:shadow-2xl overflow-hidden sm:h-[800px] border-gray-900/10 sm:border-[8px] bg-white">
      
      {/* TOP BLUE SECTION */}
      <div className="relative h-[65%] bg-blue-600 flex items-center justify-center overflow-hidden">
        
        {/* ---- Decorative: Group 24 (Left-middle waves) ---- */}
        <Image
          src="/images/Group 24.png"
          alt="waves left"
          width={120}
          height={120}
          className="absolute top-12 left-0 opacity-40 pointer-events-none select-none"
        />

        {/* ---- Decorative: Group 25 (Bottom-right waves) ---- */}
        <Image
          src="/images/Group 25.png"
          alt="waves right"
          width={120}
          height={120}
          className="absolute bottom-12 right-0 opacity-40 pointer-events-none select-none"
        />

        {/* ---- Decorative: Ellipse 9 (Top-right corner arc - Smaller) ---- */}
        <Image
          src="/images/Ellipse 9.png"
          alt="corner ellipse"
          width={80}
          height={80}
          className="absolute top-0 right-0 opacity-60 pointer-events-none select-none"
        />
      </div>

      {/* BOTTOM WHITE CONTENT */}
      <div className="px-8 py-10">

        <h1 className="text-3xl font-bold text-gray-900 mb-3 leading-snug">
          Manage What To Do
        </h1>

        <p className="text-gray-500 text-sm mb-10 max-w-[260px] leading-relaxed">
          The best way to manage what you have to do, don&apos;t forget your plans
        </p>

        <button
          onClick={onGetStarted}
          className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold active:scale-95 transition-all shadow-lg shadow-blue-200"
        >
          Get Started
        </button>

      </div>
    </div>
  );
}