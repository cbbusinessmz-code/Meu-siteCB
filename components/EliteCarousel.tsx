
import React, { useState, useEffect, useCallback } from 'react';
import { Ad, Product } from '../types';

interface EliteCarouselProps {
  ads: Ad[];
  featuredProducts: Product[];
}

const EliteCarousel: React.FC<EliteCarouselProps> = ({ ads, featuredProducts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Combina anúncios e produtos destacados em uma única lista de elite
  const items = [
    ...ads.filter(ad => ad.is_active).map(ad => ({ 
      id: ad.id,
      type: 'ad' as const, 
      title: ad.title, 
      image: ad.image_url, 
      link: ad.link_url,
      badge: 'Publicidade VIP'
    })),
    ...featuredProducts.map(p => ({ 
      id: p.id,
      type: 'featured' as const, 
      title: p.title, 
      image: p.cover_url, 
      link: '#', 
      price: p.price,
      badge: 'Destaque Elite'
    }))
  ];

  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(prev => (prev + 1) % items.length);
      setIsAnimating(false);
    }, 500);
  }, [items.length, isAnimating]);

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(prev => (prev - 1 + items.length) % items.length);
      setIsAnimating(false);
    }, 500);
  };

  useEffect(() => {
    if (items.length <= 1) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [items.length, nextSlide]);

  if (items.length === 0) return null;

  const currentItem = items[currentIndex];

  return (
    <div className="max-w-7xl mx-auto px-6 mb-24 relative group">
      <div className="relative h-[450px] md:h-[550px] w-full rounded-[3.5rem] overflow-hidden border border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)]">
        
        {/* Camada de Imagem com Efeito de Zoom Suave */}
        <div className={`absolute inset-0 transition-all duration-1000 ease-in-out ${isAnimating ? 'opacity-40 scale-110 blur-sm' : 'opacity-100 scale-100 blur-0'}`}>
          <img 
            src={currentItem.image} 
            className="w-full h-full object-cover"
            alt={currentItem.title}
          />
          {/* Overlay de Gradiente Multi-camada para Legibilidade Profissional */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-black/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#020617]/80 via-transparent to-transparent hidden md:block" />
        </div>

        {/* Conteúdo Informativo */}
        <div className={`absolute inset-0 flex flex-col justify-end p-8 md:p-16 transition-all duration-500 ${isAnimating ? 'translate-y-8 opacity-0' : 'translate-y-0 opacity-100'}`}>
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/20 border border-blue-500/30 rounded-full backdrop-blur-md">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">
                {currentItem.badge}
              </span>
            </div>
            
            <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-[0.9] drop-shadow-2xl">
              {currentItem.title}
            </h2>
            
            {currentItem.type === 'featured' && (
              <p className="text-blue-400 font-black text-xl md:text-2xl tracking-tight">
                Investimento: {Number(currentItem.price).toLocaleString()} <span className="text-sm opacity-60">MT</span>
              </p>
            )}

            <div className="flex flex-wrap gap-4 pt-4">
              {currentItem.link && (
                <a 
                  href={currentItem.link} 
                  target={currentItem.type === 'ad' ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  className="bg-white text-black px-10 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all transform hover:scale-105 shadow-xl active:scale-95"
                >
                  {currentItem.type === 'ad' ? 'Acessar Oferta' : 'Ver Detalhes'}
                </a>
              )}
              <div className="hidden md:flex items-center gap-4 px-6 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
                 <div className="flex -space-x-3">
                    {[1,2,3].map(i => <div key={i} className="w-6 h-6 rounded-full border-2 border-[#020617] bg-slate-800 flex items-center justify-center text-[8px] font-bold"><i className="fa-solid fa-user"></i></div>)}
                 </div>
                 <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Interessados Agora</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navegação Manual - Desktop */}
        <div className="absolute top-1/2 -translate-y-1/2 left-6 right-6 flex justify-between pointer-events-none">
          <button 
            onClick={prevSlide}
            className="w-12 h-12 bg-black/20 hover:bg-blue-600/40 backdrop-blur-xl border border-white/5 rounded-2xl flex items-center justify-center text-white pointer-events-auto transition-all translate-x-[-20px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
          >
            <i className="fa-solid fa-chevron-left text-xs"></i>
          </button>
          <button 
            onClick={nextSlide}
            className="w-12 h-12 bg-black/20 hover:bg-blue-600/40 backdrop-blur-xl border border-white/5 rounded-2xl flex items-center justify-center text-white pointer-events-auto transition-all translate-x-[20px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
          >
            <i className="fa-solid fa-chevron-right text-xs"></i>
          </button>
        </div>

        {/* Indicadores de Progresso Inferiores */}
        <div className="absolute bottom-8 right-12 flex gap-3">
          {items.map((_, i) => (
            <button 
              key={i} 
              onClick={() => { if(!isAnimating) setCurrentIndex(i); }}
              className={`h-1.5 rounded-full transition-all duration-500 ${currentIndex === i ? 'w-12 bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.8)]' : 'w-3 bg-white/20 hover:bg-white/40'}`}
            />
          ))}
        </div>
      </div>
      
      {/* Decoração Lateral */}
      <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-20 h-40 bg-blue-600/10 blur-3xl rounded-full -z-10" />
      <div className="absolute -right-10 top-1/2 -translate-y-1/2 w-20 h-40 bg-blue-600/10 blur-3xl rounded-full -z-10" />
    </div>
  );
};

export default EliteCarousel;
