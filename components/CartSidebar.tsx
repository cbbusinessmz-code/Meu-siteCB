
import React from 'react';
import { CartItem } from '../types';
import { PAYMENT_METHODS } from '../constants';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose, items, onRemove }) => {
  const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    if (items.length === 0) return;
    const itemsStr = items.map(item => `- *${item.title}* x${item.quantity} (${(item.price * item.quantity).toLocaleString()} MT)`).join('%0A');
    const msg = `*PEDIDO CB BUSINESS*%0A%0A*ITENS:*%0A${itemsStr}%0A%0A*TOTAL:* ${total.toLocaleString()} MT%0A%0A*MÉTODOS:* M-pesa: 844606198 | e-Mola: 876606198`;
    window.open(`https://wa.me/258820386282?text=${msg}`, '_blank');
    onClose();
  };

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
        onClick={onClose}
      />
      <div 
        className={`fixed top-0 right-0 w-full max-w-md h-full bg-[#030712] z-[70] transition-transform duration-700 ease-in-out border-l border-white/5 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
            <h2 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-3">
                <i className="fa-solid fa-bag-shopping text-blue-500"></i>
                Carrinho
            </h2>
            <button 
                onClick={onClose} 
                className="w-12 h-12 rounded-2xl hover:bg-white/5 flex items-center justify-center transition-all border border-white/5"
            >
                <i className="fa-solid fa-xmark"></i>
            </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-6 no-scrollbar">
            {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center opacity-30 text-center">
                    <i className="fa-solid fa-cart-flatbed text-6xl mb-6"></i>
                    <p className="font-black uppercase tracking-widest text-xs">Vazio por agora</p>
                </div>
            ) : (
                items.map(item => (
                    <div key={item.id} className="flex items-center gap-4 bg-white/[0.03] p-5 rounded-[2rem] border border-white/5 group hover:border-blue-500/30 transition-all">
                        <img src={item.cover_url} className="w-16 h-16 rounded-2xl object-cover shadow-lg" alt={item.title} />
                        <div className="flex-1">
                            <h4 className="text-[11px] font-black uppercase truncate w-40">{item.title}</h4>
                            <p className="text-blue-500 font-bold text-sm mt-1">{Number(item.price).toLocaleString()} MT</p>
                            <span className="text-[9px] text-slate-500 uppercase font-black">Qtd: {item.quantity}</span>
                        </div>
                        <button 
                            onClick={() => onRemove(item.id)} 
                            className="w-10 h-10 rounded-xl bg-white/5 text-slate-500 hover:text-red-500 hover:bg-red-500/10 transition-all flex items-center justify-center"
                        >
                            <i className="fa-solid fa-trash-can text-xs"></i>
                        </button>
                    </div>
                ))
            )}
        </div>

        {items.length > 0 && (
            <div className="p-8 bg-white/[0.02] border-t border-white/5">
                <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-center text-slate-500">
                        <span className="text-[10px] font-black uppercase tracking-widest">Taxas do Gateway</span>
                        <span className="text-xs font-bold">0.00 MT</span>
                    </div>
                    <div className="flex justify-between items-end">
                        <span className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">Total a Pagar</span>
                        <span className="text-3xl font-black text-white">{total.toLocaleString()} <span className="text-sm text-slate-500">MT</span></span>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-8">
                    {PAYMENT_METHODS.map(p => (
                        <div key={p.name} className="flex flex-col items-center gap-1 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
                             <div className={`w-8 h-8 ${p.color} rounded-lg flex items-center justify-center text-white text-[10px] font-black`}>{p.short}</div>
                             <span className="text-[8px] font-black uppercase text-slate-500">{p.name}</span>
                        </div>
                    ))}
                </div>

                <button 
                    onClick={handleCheckout} 
                    className="w-full bg-blue-600 hover:bg-blue-500 py-5 rounded-[2rem] font-black uppercase text-xs tracking-[0.2em] flex items-center justify-center gap-4 shadow-xl shadow-blue-600/20 transition-all transform hover:scale-[1.02]"
                >
                    <i className="fa-brands fa-whatsapp text-xl"></i>
                    Finalizar Pedido
                </button>
            </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
