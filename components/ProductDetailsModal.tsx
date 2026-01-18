
import React from 'react';
import { Product } from '../types';

interface ProductDetailsModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: () => void;
}

const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({ product, onClose, onAddToCart }) => {
  return (
    <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl p-4 md:p-10 flex items-center justify-center animate-in fade-in duration-300">
      <div className="relative max-w-5xl w-full bg-[#0f172a] rounded-[3rem] border border-white/10 overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]">
        <button 
            onClick={onClose} 
            className="absolute top-6 right-6 z-20 w-12 h-12 bg-white/5 hover:bg-red-500 rounded-2xl flex items-center justify-center transition-all border border-white/10 group"
        >
            <i className="fa-solid fa-xmark group-hover:rotate-90 transition-transform"></i>
        </button>

        <div className="md:w-1/2 relative min-h-[300px] md:min-h-full">
          <img src={product.cover_url} className="w-full h-full object-cover" alt={product.title} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent md:bg-gradient-to-r" />
        </div>

        <div className="p-8 md:p-14 md:w-1/2 overflow-y-auto no-scrollbar flex flex-col">
          <div className="mb-auto">
            <span className="inline-block bg-blue-600/10 text-blue-500 text-[10px] font-black uppercase tracking-[0.4em] px-4 py-2 rounded-full mb-6 border border-blue-500/20">
              {product.category || 'Ativo Digital Elite'}
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tighter leading-tight">{product.title}</h2>
            
            <div className="space-y-6 mb-12">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 text-xs">
                        <i className="fa-solid fa-check"></i>
                    </div>
                    <span className="text-slate-300 text-sm font-medium">Link de acesso vitalício</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 text-xs">
                        <i className="fa-solid fa-check"></i>
                    </div>
                    <span className="text-slate-300 text-sm font-medium">Suporte técnico especializado</span>
                </div>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed whitespace-pre-line mb-10 font-light">
              {product.descricao || "Este ativo premium foi selecionado pela CB Business para impulsionar sua performance digital."}
            </p>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="text-center sm:text-left">
                <span className="text-slate-500 text-[10px] font-bold uppercase mb-1 block tracking-widest">Preço Premium</span>
                <p className="text-4xl font-black text-white">
                    {Number(product.price).toLocaleString()} <span className="text-sm text-slate-500">MT</span>
                </p>
            </div>
            <button 
                onClick={onAddToCart}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 px-12 py-5 rounded-[2rem] font-black uppercase text-xs tracking-widest transition-all transform hover:scale-105 shadow-xl shadow-blue-600/30"
            >
                Adicionar ao Carrinho
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;
