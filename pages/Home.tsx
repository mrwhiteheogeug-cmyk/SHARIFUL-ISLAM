
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
// Fix: Import gsap to resolve 'Cannot find name gsap' error.
import { gsap } from 'gsap';

const Home: React.FC = () => {
  const textRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!textRef.current || !containerRef.current) return;

    // Entrance Animation
    gsap.fromTo(containerRef.current, 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.5, ease: 'power4.out' }
    );

    // Floating Animation for the Hero Text
    gsap.to(textRef.current, {
      y: 20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }, []);

  return (
    <div ref={containerRef} className="h-screen w-full flex flex-col items-center justify-center text-center px-4">
      <div className="relative group">
        <h1 
          ref={textRef}
          className="text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white select-none drop-shadow-[0_0_20px_rgba(14,165,233,0.5)] transition-all duration-500 hover:scale-105"
        >
          SHARIFUL ISLAM <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600">SAIKAT</span>
        </h1>
        <div className="absolute -inset-1 bg-sky-500 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
      </div>

      <p className="mt-8 text-lg md:text-xl text-sky-200/80 max-w-2xl font-light tracking-widest uppercase">
        Futuristic Creative • Professional Excellence
      </p>

      <button 
        onClick={() => navigate('/album')}
        className="mt-12 px-10 py-4 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-full transition-all duration-300 transform hover:scale-110 active:scale-95 shadow-[0_0_30px_rgba(14,165,233,0.4)]"
      >
        EXPLORE PORTFOLIO
      </button>

      <div className="absolute bottom-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-sky-400 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-sky-400 rounded-full animate-scroll"></div>
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(15px); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default Home;
