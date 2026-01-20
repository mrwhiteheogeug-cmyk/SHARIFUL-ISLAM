
import React, { useEffect, useRef } from 'react';
// Fix: Import gsap to resolve 'Cannot find name gsap' error.
import { gsap } from 'gsap';

const About: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = card.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;

      gsap.to(card, {
        rotationY: x * 30,
        rotationX: -y * 30,
        transformPerspective: 1000,
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotationY: 0,
        rotationX: 0,
        duration: 0.8,
        ease: 'elastic.out(1, 0.3)',
      });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const details = [
    { label: 'Name', value: 'Shariful Islam Saikat' },
    { label: 'Age', value: '18 (Estimated)' },
    { label: 'Profession', value: 'Creative Developer & Designer' },
    { label: 'Address', value: 'FENI' },
    { label: 'School Name', value: 'ALHAZ TAFFAZZALHUSSAIN DHALI HIGH SCHOOL' },
    { label: 'Class', value: 'XI' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-6 pt-24">
      <div 
        ref={cardRef}
        className="w-full max-w-2xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden group"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/20 blur-3xl -z-10 rounded-full transform translate-x-1/2 -translate-y-1/2 group-hover:bg-sky-500/40 transition-colors" />
        
        <h2 className="text-4xl font-bold mb-8 text-sky-400 border-b border-sky-400/20 pb-4">Profile Details</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {details.map((item, index) => (
            <div key={index} className="space-y-1">
              <p className="text-sky-300/60 text-xs uppercase tracking-widest font-bold">{item.label}</p>
              <p className="text-white text-lg font-medium">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-gray-400 text-sm italic">
          "Pioneering the intersection of technology and creativity to build immersive digital experiences that matter."
        </div>
      </div>
    </div>
  );
};

export default About;
