'use client';

import { useEffect, useState, useRef } from 'react';

export default function Loader3D({ onComplete }: { onComplete: () => void }) {
  const [isExiting, setIsExiting] = useState(false);
  useEffect(() => {
    // No ref guard needed, let React Strict Mode double-invoke and clean up properly
    console.log('>>> LOADER MOUNTED');

    // Guaranteed dismissal timer
    const timer = setTimeout(() => {
      console.log('>>> LOADER DISMISSING');
      setIsExiting(true);
      
      // Final reveal
      const finishTimer = setTimeout(() => {
        console.log('>>> LOADER COMPLETE');
        onComplete();
      }, 1000);
      
      // Store finishTimer cleanup if needed, but since we're in the same scope:
      // cleanup would be complicated here. Instead, let's keep it simple.
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[999] flex flex-col items-center justify-center bg-black transition-all duration-1000 ease-[0.23,1,0.32,1] ${
        isExiting ? 'opacity-0 scale-110 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(201,169,110,0.05),transparent_80%)] animate-pulse" />
      
      <div className="relative z-10 flex flex-col items-center">
        {/* Cinematic Logo */}
        <div className="overflow-hidden mb-12">
          <h1 className="font-display text-5xl md:text-7xl text-off-white tracking-[0.5em] uppercase animate-reveal-text">
            LUX<span className="text-gold italic font-light">NOIR</span>
          </h1>
        </div>

        {/* Pure CSS Progress Bar */}
        <div className="w-64 h-[1px] bg-white/10 relative overflow-hidden mb-6">
          <div className="absolute inset-y-0 left-0 bg-gold shadow-[0_0_15px_rgba(201,169,110,0.5)] animate-load-bar" />
        </div>

        <div className="flex justify-between w-64 opacity-40 font-body text-[8px] tracking-[0.6em] uppercase text-stone-light">
          <span>Initializing Sequence</span>
          <span className="animate-pulse">Loading...</span>
        </div>
      </div>

      <div className="absolute bottom-12 font-body text-[8px] tracking-[1em] uppercase text-stone/20 animate-fade-in-slow">
        London — Paris — New York
      </div>

      <style jsx>{`
        @keyframes reveal-text {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes load-bar {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        @keyframes fade-in-slow {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        .animate-reveal-text { animation: reveal-text 1.5s cubic-bezier(0.23, 1, 0.32, 1) forwards; }
        .animate-load-bar { animation: load-bar 2.8s cubic-bezier(0.65, 0, 0.35, 1) forwards; }
        .animate-fade-in-slow { animation: fade-in-slow 2s ease-out forwards; }
      `}</style>
    </div>
  );
}
