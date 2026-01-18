
import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';
import ProductDetailsModal from './ProductDetailsModal';
import ProductShareModal from './ProductShareModal';

interface CatalogProps {
  products: Product[];
  onAddToCart: (p: Product) => void;
}

const Catalog: React.FC<CatalogProps> = ({ products, onAddToCart }) => {
  const [filter, setFilter] = useState<'all' | 'app' | 'ebook'>('all');
  const [search, setSearch] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [sharingProduct, setSharingProduct] = useState<Product | null>(null);

  const filteredProducts = useMemo(() => {
    const searchTerm = search.toLowerCase().trim();
    
    return products.filter(p => {
      const matchesType = filter === 'all' || p.type === filter;
      const matchesSearch = !searchTerm || 
                           p.title.toLowerCase().includes(searchTerm) || 
                           p.category.toLowerCase().includes(searchTerm) ||
                           (p.descricao && p.descricao.toLowerCase().includes(searchTerm));
                           
      return matchesType && matchesSearch;
    });
  }, [products, filter, search]);

  const handleShare = async (product: Product) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.title,
          text: `Confira este ativo digital na CB Business: ${product.title}`,
          url: window.location.href, // Em produção, aqui iria o link individual do produto
        });
      } catch (err) {
        setSharingProduct(product);
      }
    } else {
      setSharingProduct(product);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-6 mb-32">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'all', label: 'Todos' },
            { id: 'app', label: 'Softwares' },
            { id: 'ebook', label: 'E-Books' }
          ].map(btn => (
            <button
              key={btn.id}
              onClick={() => setFilter(btn.id as any)}
              className={`px-8 py-3 rounded-2xl text-[11px] font-black uppercase tracking-wider transition-all border ${
                filter === btn.id 
                ? 'bg-blue-600 border-blue-500 shadow-lg shadow-blue-600/20' 
                : 'bg-white/5 border-white/10 hover:bg-white/10'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        <div className="relative group">
          <input
            type="text"
            placeholder="Pesquisar título, categoria ou descrição..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-6 text-xs w-full md:w-80 outline-none focus:border-blue-500/50 transition-all placeholder:text-slate-600"
          />
          <i className="fa-solid fa-magnifying-glass absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors"></i>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={() => onAddToCart(product)}
              onClick={() => setSelectedProduct(product)}
              onShare={() => handleShare(product)}
            />
          ))
        ) : (
          <div className="col-span-full py-20 text-center bg-white/[0.01] rounded-[3rem] border border-dashed border-white/5">
            <i className="fa-solid fa-box-open text-4xl text-slate-800 mb-6"></i>
            <p className="text-slate-500 uppercase font-black text-xs tracking-[0.3em]">Nenhum ativo corresponde à sua busca</p>
            <button 
              onClick={() => {setSearch(''); setFilter('all');}} 
              className="mt-6 text-blue-500 text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors"
            >
              Limpar Filtros
            </button>
          </div>
        )}
      </div>

      {selectedProduct && (
        <ProductDetailsModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
          onAddToCart={() => {
            onAddToCart(selectedProduct);
            setSelectedProduct(null);
          }}
        />
      )}

      {sharingProduct && (
        <ProductShareModal 
          product={sharingProduct}
          onClose={() => setSharingProduct(null)}
        />
      )}
    </section>
  );
};

export default Catalog;
