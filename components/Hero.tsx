
import React from 'react';
import { SiteStats } from '../types';

interface HeroProps {
  stats?: SiteStats;
  liveVisitors?: number;
}

const Hero: React.FC<HeroProps> = ({ stats, liveVisitors }) => {
  return (
    <section className="relative max-w-7xl mx-auto px-6 pt-20 pb-24 text-center overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full -z-10 pointer-events-none" />
      
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/10 border border-blue-500/20 rounded-full">
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.8)]"></span>
          <span className="text-blue-400 text-[10px] font-black uppercase tracking-[0.2em]">Plataforma #1 em Moçambique</span>
        </div>
        
        {liveVisitors && (
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/5 border border-emerald-500/10 rounded-full">
            <i className="fa-solid fa-users text-emerald-500 text-[10px]"></i>
            <span className="text-emerald-500/80 text-[10px] font-black uppercase tracking-[0.2em]">
              {liveVisitors} Clientes Online
            </span>
          </div>
        )}
      </div>

      <h1 className="text-6xl md:text-9xl font-black mb-8 gradient-text leading-[0.9] tracking-tighter">
        Elite Digital Gateway.
      </h1>
      
      <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed mb-12">
        Acesse a infraestrutura mais avançada para ativos digitais, softwares e conhecimento premium com suporte local 24/7.
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
        <button className="bg-blue-600 hover:bg-blue-500 px-10 py-4 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-xl shadow-blue-600/20 transition-all transform hover:scale-105">
          Explorar Catálogo
        </button>
        <button className="bg-white/5 border border-white/10 hover:bg-white/10 px-10 py-4 rounded-2xl font-black uppercase text-xs tracking-[0.2em] transition-all">
          Nossa Comunidade
        </button>
      </div>

      <div className="flex justify-center items-center gap-12 opacity-60">
        <div className="text-center">
          <p className="text-2xl font-black text-white">{stats?.visitors.toLocaleString() || '14,000'}+</p>
          <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-slate-500">Acessos Totais</p>
        </div>
        <div className="w-px h-10 bg-white/10"></div>
        <div className="text-center">
          <p className="text-2xl font-black text-white">99.9%</p>
          <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-slate-500">Uptime Cloud</p>
        </div>
        <div className="w-px h-10 bg-white/10"></div>
        <div className="text-center">
          <p className="text-2xl font-black text-white">2.5k</p>
          <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-slate-500">Downloads VIP</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
