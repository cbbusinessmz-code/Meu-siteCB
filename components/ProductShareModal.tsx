
import React, { useState } from 'react';
import { Product } from '../types';

interface ProductShareModalProps {
  product: Product;
  onClose: () => void;
}

const ProductShareModal: React.FC<ProductShareModalProps> = ({ product, onClose }) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = window.location.href; // Em produção usaria o link único do produto

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socialLinks = [
    {
      name: 'WhatsApp',
      icon: 'fa-whatsapp',
      color: 'bg-[#25D366]',
      url: `https://wa.me/?text=${encodeURIComponent(`Olha este ativo incrível na CB Business: ${product.title} - ${shareUrl}`)}`
    },
    {
      name: 'Facebook',
      icon: 'fa-facebook-f',
      color: 'bg-[#1877F2]',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'Twitter',
      icon: 'fa-x-twitter',
      color: 'bg-black',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Elevando o nível com ${product.title} na @CBBusinessElite`)}&url=${encodeURIComponent(shareUrl)}`
    }
  ];

  return (
    <div className="fixed inset-0 z-[150] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-6 animate-in fade-in duration-300">
      <div className="bg-slate-900 w-full max-w-md rounded-[3rem] border border-white/10 overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
          <div>
            <h3 className="text-xl font-black uppercase tracking-tight">Compartilhar</h3>
            <p className="text-[9px] text-blue-500 font-bold uppercase tracking-widest mt-1">Espalhe a qualidade Elite</p>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-red-500/10 hover:text-red-500 transition-all border border-white/5">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="p-8">
          <div className="flex items-center gap-4 bg-white/[0.03] p-4 rounded-2xl border border-white/5 mb-8">
            <img src={product.cover_url} className="w-12 h-12 rounded-xl object-cover" alt="" />
            <div className="flex-1 overflow-hidden">
              <h4 className="text-xs font-black uppercase truncate">{product.title}</h4>
              <p className="text-[9px] text-slate-500 uppercase font-bold">{product.category}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            {socialLinks.map(link => (
              <a 
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 group"
              >
                <div className={`w-14 h-14 ${link.color} rounded-2xl flex items-center justify-center text-white text-xl shadow-lg transition-transform group-hover:scale-110 group-active:scale-95`}>
                  <i className={`fa-brands ${link.icon}`}></i>
                </div>
                <span className="text-[9px] font-black uppercase text-slate-500 group-hover:text-white transition-colors">{link.name}</span>
              </a>
            ))}
          </div>

          <div className="relative">
            <label className="text-[9px] font-black uppercase text-slate-500 tracking-widest mb-2 block pl-2">Link Direto</label>
            <div className="flex gap-2">
              <input 
                type="text" 
                readOnly 
                value={shareUrl}
                className="flex-1 bg-black/40 border border-white/10 rounded-2xl px-4 py-3 text-[10px] text-slate-400 outline-none"
              />
              <button 
                onClick={handleCopy}
                className={`px-6 rounded-2xl font-black uppercase text-[9px] tracking-widest transition-all ${copied ? 'bg-emerald-500 text-white' : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20'}`}
              >
                {copied ? 'Copiado!' : 'Copiar'}
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white/[0.02] p-6 text-center border-t border-white/5">
           <p className="text-[8px] text-slate-600 uppercase font-black tracking-[0.3em]">CB Business Elite • Protocolo de Partilha Seguro</p>
        </div>
      </div>
    </div>
  );
};

export default ProductShareModal;
