
import React, { useState } from 'react';

const Album: React.FC = () => {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  // New updated high-quality direct resolution links provided by the user
  const customImages = [
    "https://i.postimg.cc/fbcYR7GQ/1000077711.jpg",
    "https://i.postimg.cc/7Yj6GNWy/DSC07761.jpg",
    "https://i.postimg.cc/44YvDsqr/DSC07760.jpg",
    "https://i.postimg.cc/N0NTnz4q/Screenshot-2026-01-18-201442.png",
    "https://i.postimg.cc/kgqbgmY7/Screenshot-2026-01-18-201402.png",
    "https://i.postimg.cc/6Q12cGWZ/Screenshot-2026-01-18-201522.png",
    "https://i.postimg.cc/TYqKSsdk/Screenshot-2026-01-18-201604.png"
  ];

  // Generating 30 slots total, using the new set first and then premium placeholders
  const images = Array.from({ length: 30 }, (_, i) => {
    const isCustom = i < customImages.length;
    return {
      id: i,
      url: isCustom ? customImages[i] : `https://picsum.photos/seed/${i + 777}/1200/1200`,
      title: isCustom ? `Portfolio Asset ${i + 1}` : `Creative Vision ${i + 1}`
    };
  });

  return (
    <div className="min-h-screen pt-28 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-white to-sky-400 animate-gradient-x">
          Visual Excellence
        </h2>
        <p className="text-center text-sky-200/60 mb-12 uppercase tracking-[0.5em] text-[10px] font-medium">Ultra High Definition Gallery</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {images.map((img) => (
            <div 
              key={img.id}
              onClick={() => setSelectedImg(img.url)}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl cursor-pointer bg-black border border-white/5 transition-all duration-700 hover:scale-[1.03] hover:z-20 hover:shadow-[0_20px_50px_rgba(14,165,233,0.3)]"
            >
              <img 
                src={img.url} 
                alt={img.title}
                className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105 contrast-[1.05] brightness-[1.02] sharpness-high"
                loading="lazy"
                style={{ imageRendering: 'high-quality' } as any}
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="absolute inset-0 flex flex-col justify-end p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="overflow-hidden">
                   <span className="block text-sky-400 text-[9px] font-black tracking-[0.3em] uppercase mb-2 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100">4K Render</span>
                </div>
                <p className="text-white text-xl font-light tracking-tight opacity-0 group-hover:opacity-100 transition-all duration-700 delay-200">{img.title}</p>
              </div>
              
              <div className="absolute inset-0 border border-white/0 group-hover:border-white/20 transition-colors duration-700 rounded-2xl pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>

      {selectedImg && (
        <div 
          className="fixed inset-0 z-[100] bg-black/98 backdrop-blur-3xl flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
          onClick={() => setSelectedImg(null)}
        >
          <div className="absolute top-8 right-8 flex items-center gap-6">
             <span className="text-sky-400/40 text-[10px] tracking-[0.4em] uppercase hidden md:block animate-pulse">Ultra HD Preview</span>
             <button 
                className="w-14 h-14 flex items-center justify-center bg-white/5 hover:bg-sky-500 border border-white/10 rounded-full text-white text-3xl transition-all duration-500 hover:rotate-90"
                onClick={() => setSelectedImg(null)}
             >
                &times;
             </button>
          </div>
          
          <div className="relative max-w-6xl max-h-full group">
            <img 
              src={selectedImg} 
              alt="Full Preview" 
              className="max-w-full max-h-[85vh] rounded-lg shadow-[0_0_100px_rgba(14,165,233,0.2)] border border-white/10 animate-in fade-in zoom-in duration-700 sharpness-high"
              style={{ imageRendering: 'high-quality' } as any}
            />
            <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-sky-500/50"></div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-sky-500/50"></div>
          </div>
        </div>
      )}

      <style>{`
        .sharpness-high {
          filter: contrast(1.02) saturate(1.05);
        }
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 15s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default Album;
