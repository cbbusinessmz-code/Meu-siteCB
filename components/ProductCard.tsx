
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: () => void;
  onClick: () => void;
  onShare: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onClick, onShare }) => {
  return (
    <div className="bg-white/[0.02] border border-white/5 p-4 rounded-[2rem] group transition-all duration-500 hover:translate-y-[-8px] hover:border-blue-500/50 hover:bg-white/[0.04]">
      <div 
        className="relative overflow-hidden rounded-[1.5rem] mb-6 cursor-pointer aspect-square" 
        onClick={onClick}
      >
        <img 
          src={product.cover_url || 'https://via.placeholder.com/400'} 
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
          alt={product.title}
        />
        
        {/* Share Button Overlay */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onShare();
          }}
          className="absolute top-4 left-4 z-10 w-10 h-10 bg-black/40 backdrop-blur-md rounded-xl border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-blue-600 hover:border-blue-500"
          title="Compartilhar"
        >
          <i className="fa-solid fa-arrow-up-from-bracket text-xs"></i>
        </button>

        <div className="absolute inset-0 bg-blue-600/20 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center backdrop-blur-sm">
          <span className="bg-white text-black px-6 py-2 rounded-full font-black text-[10px] uppercase shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
            Ver Detalhes
          </span>
        </div>
        
        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
          <span className="text-[9px] font-black uppercase text-blue-400 tracking-wider">
            {product.type === 'app' ? 'Software' : 'E-Book'}
          </span>
        </div>
      </div>
      
      <div className="px-2">
        <span className="text-slate-500 text-[9px] font-black uppercase tracking-widest mb-1 block">
          {product.category || 'Ativo Digital'}
        </span>
        <h3 className="font-bold text-sm uppercase mb-6 truncate text-slate-100 group-hover:text-blue-400 transition-colors">
          {product.title}
        </h3>
        
        <div className="flex justify-between items-center">
          <div>
            <span className="text-white font-black text-xl leading-none">
              {Number(product.price).toLocaleString()}
            </span>
            <span className="text-[10px] text-slate-500 font-bold ml-1">MT</span>
          </div>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart();
            }} 
            className="bg-white/5 hover:bg-blue-600 text-white w-12 h-12 rounded-2xl transition-all flex items-center justify-center border border-white/10 group-hover:border-blue-500 shadow-lg hover:shadow-blue-600/20"
          >
            <i className="fa-solid fa-plus transition-transform group-hover:rotate-90"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
