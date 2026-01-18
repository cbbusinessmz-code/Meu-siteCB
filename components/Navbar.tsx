
import React from 'react';

interface NavbarProps {
  onAdminClick: () => void;
  onCartClick: () => void;
  cartCount: number;
  onLogoClick: () => void;
  liveVisitors?: number;
}

const Navbar: React.FC<NavbarProps> = ({ onAdminClick, onCartClick, cartCount, onLogoClick, liveVisitors }) => {
  return (
    <nav className="fixed top-0 w-full z-[50] glass-nav py-5 px-6 md:px-20 flex justify-between items-center transition-all border-b border-white/5">
      <div 
        className="flex items-center gap-3 cursor-pointer group" 
        onClick={onLogoClick}
      >
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform shadow-lg shadow-blue-600/20">
          <i className="fa-solid fa-bolt-lightning text-white"></i>
        </div>
        <div>
          <span className="text-xl font-extrabold tracking-tight block leading-none">CB BUSINESS</span>
          <span className="text-[9px] text-blue-500 font-bold tracking-[0.3em] uppercase">Moçambique</span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        {liveVisitors && (
          <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-emerald-500/5 rounded-full border border-emerald-500/10">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500/80">
              {liveVisitors} Online Agora
            </span>
          </div>
        )}

        <div className="flex items-center gap-4">
          <button 
            onClick={onCartClick} 
            className="relative bg-white/5 p-3.5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all group"
          >
            <i className="fa-solid fa-bag-shopping text-sm text-slate-300 group-hover:text-white"></i>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold border-2 border-[#030712] animate-pulse">
                {cartCount}
              </span>
            )}
          </button>
          <button 
            onClick={onAdminClick} 
            className="hidden md:block bg-blue-600/10 hover:bg-blue-600 hover:text-white px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest border border-blue-500/20 transition-all text-blue-400"
          >
            Master Dashboard
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
