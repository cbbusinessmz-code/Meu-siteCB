
import React, { useState, useEffect } from 'react';
import { Product, ProductType } from '../types';
import { CATEGORIES } from '../constants';
import { generateProductDescription } from '../services/gemini';

interface AdminFormProps {
  initialData: Product | null;
  onSave: (p: Product) => void;
  onCancel: () => void;
}

const AdminForm: React.FC<AdminFormProps> = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Partial<Product>>({
    title: '',
    price: 0,
    type: 'ebook',
    category: '',
    cover_url: '',
    download_url: '',
    descricao: ''
  });
  const [loadingAI, setLoadingAI] = useState(false);

  useEffect(() => {
    if (initialData) setFormData(initialData);
    else setFormData({
        title: '',
        price: 0,
        type: 'ebook',
        category: '',
        cover_url: '',
        download_url: '',
        descricao: ''
    });
  }, [initialData]);

  const handleAISuggestion = async () => {
    if (!formData.title) return alert("Digite o título primeiro!");
    setLoadingAI(true);
    const suggestion = await generateProductDescription(
      formData.title, 
      formData.category || 'Ativos Digitais', 
      formData.type === 'app' ? 'Software' : 'E-Book'
    );
    setFormData(prev => ({ ...prev, descricao: suggestion }));
    setLoadingAI(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const product: Product = {
      ...formData as Product,
      id: initialData?.id || Math.random().toString(36).substr(2, 9),
      created_at: initialData?.created_at || new Date().toISOString()
    };
    onSave(product);
  };

  return (
    <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10 sticky top-40">
      <h3 className="font-black text-blue-500 uppercase text-xs mb-8 tracking-[0.3em]">
        {initialData ? 'Editar Ativo Digital' : 'Novo Ativo Digital'}
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
            <label className="text-[9px] font-black uppercase text-slate-500 tracking-widest pl-2">Título do Produto</label>
            <input 
                type="text" 
                value={formData.title} 
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                placeholder="Ex: Guia Master de Investimentos" 
                className="w-full p-4 rounded-2xl text-xs bg-black/40 border border-white/10 focus:border-blue-500 outline-none transition-all"
                required
            />
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
                <label className="text-[9px] font-black uppercase text-slate-500 tracking-widest pl-2">Preço (MT)</label>
                <input 
                    type="number" 
                    value={formData.price} 
                    onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
                    placeholder="0" 
                    className="w-full p-4 rounded-2xl text-xs bg-black/40 border border-white/10 outline-none focus:border-blue-500 transition-all"
                    required
                />
            </div>
            <div className="space-y-1">
                <label className="text-[9px] font-black uppercase text-slate-500 tracking-widest pl-2">Tipo</label>
                <select 
                    value={formData.type} 
                    onChange={e => setFormData({ ...formData, type: e.target.value as ProductType })}
                    className="w-full p-4 rounded-2xl text-xs bg-black/40 border border-white/10 outline-none focus:border-blue-500 transition-all appearance-none"
                >
                    <option value="app">Software</option>
                    <option value="ebook">E-Book</option>
                </select>
            </div>
        </div>

        <div className="space-y-1">
            <label className="text-[9px] font-black uppercase text-slate-500 tracking-widest pl-2">Categoria</label>
            <select 
                value={formData.category} 
                onChange={e => setFormData({ ...formData, category: e.target.value })}
                className="w-full p-4 rounded-2xl text-xs bg-black/40 border border-white/10 outline-none focus:border-blue-500 transition-all appearance-none"
            >
                <option value="">Selecione...</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
        </div>

        <div className="space-y-1">
            <label className="text-[9px] font-black uppercase text-slate-500 tracking-widest pl-2">URL da Capa (Imagem)</label>
            <input 
                type="text" 
                value={formData.cover_url} 
                onChange={e => setFormData({ ...formData, cover_url: e.target.value })}
                placeholder="https://..." 
                className="w-full p-4 rounded-2xl text-xs bg-black/40 border border-white/10 outline-none focus:border-blue-500 transition-all"
            />
        </div>

        <div className="space-y-1">
            <label className="text-[9px] font-black uppercase text-slate-500 tracking-widest pl-2">Link de Entrega</label>
            <input 
                type="text" 
                value={formData.download_url} 
                onChange={e => setFormData({ ...formData, download_url: e.target.value })}
                placeholder="Link p/ download direto" 
                className="w-full p-4 rounded-2xl text-xs bg-black/40 border border-white/10 outline-none focus:border-blue-500 transition-all"
                required
            />
        </div>

        <div className="space-y-1 relative">
            <div className="flex justify-between items-center pr-2">
                <label className="text-[9px] font-black uppercase text-slate-500 tracking-widest pl-2">Descrição</label>
                <button 
                    type="button" 
                    onClick={handleAISuggestion}
                    disabled={loadingAI}
                    className="text-[9px] font-black uppercase text-blue-500 hover:text-white transition-colors flex items-center gap-1 group"
                >
                    <i className={`fa-solid fa-wand-magic-sparkles ${loadingAI ? 'animate-spin' : 'group-hover:rotate-12 transition-transform'}`}></i>
                    {loadingAI ? 'Gerando...' : 'IA Assist'}
                </button>
            </div>
            <textarea 
                value={formData.descricao} 
                onChange={e => setFormData({ ...formData, descricao: e.target.value })}
                placeholder="Detalhes premium sobre o produto..." 
                className="w-full p-4 rounded-2xl text-xs bg-black/40 border border-white/10 h-32 outline-none focus:border-blue-500 transition-all no-scrollbar"
                required
            ></textarea>
        </div>

        <div className="pt-4 flex flex-col gap-3">
            <button 
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/20 py-4 rounded-2xl font-black uppercase text-[11px] tracking-widest transition-all"
            >
                {initialData ? 'Gravar Alterações' : 'Publicar Ativo'}
            </button>
            {initialData && (
                <button 
                    type="button" 
                    onClick={onCancel}
                    className="w-full py-3 text-[10px] uppercase font-bold opacity-40 hover:opacity-100 transition-all"
                >
                    Cancelar Edição
                </button>
            )}
        </div>
      </form>
    </div>
  );
};

export default AdminForm;
