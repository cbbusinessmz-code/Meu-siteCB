
import React from 'react';
import { PAYMENT_METHODS } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-white/5 pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <i className="fa-solid fa-bolt text-white text-xs"></i>
              </div>
              <span className="text-xl font-black tracking-tighter uppercase">CB Business</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed font-light">
              Elevando o padrão de ativos digitais em Moçambique através de tecnologia de ponta e curadoria exclusiva.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-blue-600 transition-all border border-white/5">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="https://wa.me/258820386282" target="_blank" className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-green-600 transition-all border border-white/5">
                <i className="fa-brands fa-whatsapp"></i>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-black uppercase text-[11px] mb-8 tracking-[0.3em]">Gateway de Pagamento</h4>
            <div className="space-y-4">
              {PAYMENT_METHODS.map(p => (
                <div key={p.name} className="flex items-center gap-4 bg-white/5 p-3 rounded-2xl border border-white/5 group hover:border-blue-500/20 transition-all">
                  <div className={`w-8 h-8 ${p.color} rounded-lg flex items-center justify-center text-white text-[10px] font-black`}>{p.short}</div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-black block leading-none mb-1">{p.name}</span>
                    <span className="text-xs font-bold text-slate-200">{p.number}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-2 grid grid-cols-2">
            <div>
              <h4 className="text-white font-black uppercase text-[11px] mb-8 tracking-[0.3em]">Catálogo</h4>
              <ul className="space-y-4 text-slate-500 text-xs font-bold uppercase tracking-widest">
                <li><a href="#" className="hover:text-blue-500 transition-colors">Softwares Desktop</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">E-Books Premium</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Scripts Web</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Consultoria</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-black uppercase text-[11px] mb-8 tracking-[0.3em]">Suporte</h4>
              <ul className="space-y-4 text-slate-500 text-xs font-bold uppercase tracking-widest">
                <li><a href="#" className="hover:text-blue-500 transition-colors">Privacidade</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Termos de Uso</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Afiliados</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">FAQ</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[9px] text-slate-600 uppercase tracking-[0.5em] font-black">
            © 2026 CB Business Moçambique • Designed for the Elite
          </p>
          <div className="flex gap-8 text-[9px] text-slate-600 uppercase font-black tracking-widest">
            <span>Powered by Gemini AI</span>
            <span>Secure Cloud Infrastructure</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
