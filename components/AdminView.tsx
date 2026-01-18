
import React, { useState } from 'react';
import { Product, SiteStats, Ad, CommunityQuestion } from '../types';
import AdminForm from './AdminForm';

interface AdminViewProps {
  products: Product[];
  ads: Ad[];
  questions: CommunityQuestion[];
  stats: SiteStats;
  onUpdateProduct: (p: Product) => void;
  onDeleteProduct: (id: string) => void;
  onUpdateAd: (ad: Partial<Ad>) => void;
  onDeleteAd: (id: string) => void;
  onUpdateQuestion: (q: Partial<CommunityQuestion>) => void;
  onDeleteQuestion: (id: string) => void;
  onExit: () => void;
  isConnected?: boolean;
  error?: string | null;
  lastSync?: Date | null;
  onRefresh?: () => void;
}

const AdminView: React.FC<AdminViewProps> = ({ 
    products, ads, questions, stats, 
    onUpdateProduct, onDeleteProduct, 
    onUpdateAd, onDeleteAd,
    onUpdateQuestion, onDeleteQuestion,
    onExit, isConnected, error, lastSync, onRefresh 
}) => {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'inventory' | 'ads' | 'community'>('overview');
  
  const [newAd, setNewAd] = useState({ title: '', image_url: '', link_url: '', is_active: true });
  const [qaAnswer, setQaAnswer] = useState<{id: string, text: string} | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h2 className="text-4xl font-black gradient-text tracking-tighter mb-2">Master Dashboard</h2>
          <div className="flex items-center gap-3">
            <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`}></span>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">
              {isConnected ? `Sincronizado: ${lastSync?.toLocaleTimeString()}` : 'Desconectado do Supabase'}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
            {['overview', 'inventory', 'ads', 'community'].map(tab => (
                <button 
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`px-5 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-white/5 hover:bg-white/10'}`}
                >
                    {tab === 'inventory' ? 'Ativos' : tab === 'ads' ? 'Publicidade' : tab === 'community' ? 'Comunidade' : 'Métricas'}
                </button>
            ))}
            <button onClick={onExit} className="bg-red-600/10 text-red-500 border border-red-500/20 px-6 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all">Sair</button>
        </div>
      </div>

      {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                { label: 'Visitas Reais', val: stats.visitors, color: 'blue', icon: 'fa-users' },
                { label: 'Vendas Processadas', val: stats.sales, color: 'emerald', icon: 'fa-bag-shopping' },
                { label: 'Catálogo Ativo', val: products.length, color: 'purple', icon: 'fa-box-open' },
                { label: 'Receita Total (MT)', val: stats.revenue.toLocaleString(), color: 'orange', icon: 'fa-coins' }
                ].map((stat, i) => (
                <div key={i} className="bg-white/5 p-8 rounded-[2rem] border border-white/5 group hover:border-blue-500/30 transition-all">
                    <div className={`w-10 h-10 bg-blue-600/10 rounded-xl flex items-center justify-center text-blue-500 text-sm mb-6 group-hover:scale-110 transition-transform`}><i className={`fa-solid ${stat.icon}`}></i></div>
                    <span className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-1 block">{stat.label}</span>
                    <h3 className="text-3xl font-black">{stat.val}</h3>
                </div>
                ))}
            </div>
            
            <div className="bg-white/[0.02] border border-dashed border-white/10 rounded-[3rem] p-20 text-center">
                <i className="fa-solid fa-chart-line text-4xl text-slate-800 mb-6"></i>
                <p className="text-slate-500 uppercase font-black text-[10px] tracking-widest">Painel de métricas avançadas em desenvolvimento</p>
            </div>
          </div>
      )}

      {activeTab === 'inventory' && (
          <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <AdminForm 
                    initialData={editingProduct} 
                    onSave={(p) => { onUpdateProduct(p); setEditingProduct(null); }} 
                    onCancel={() => setEditingProduct(null)} 
                />
              </div>
              <div className="lg:col-span-2 bg-white/5 rounded-[2.5rem] border border-white/10 overflow-hidden">
                <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-white/[0.02] border-b border-white/5 text-[9px] text-slate-500 uppercase font-black">
                          <th className="p-6">Produto</th>
                          <th className="p-6">Tipo</th>
                          <th className="p-6 text-center">Destaque</th>
                          <th className="p-6 text-right">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="p-20 text-center opacity-30 uppercase font-black text-[10px] tracking-widest">Nenhum ativo cadastrado</td>
                        </tr>
                      ) : (
                        products.map(p => (
                            <tr key={p.id} className="border-b border-white/5 hover:bg-white/[0.03] transition-colors">
                                <td className="p-6">
                                  <div className="flex items-center gap-3">
                                    <img src={p.cover_url} className="w-10 h-10 rounded-xl object-cover border border-white/10" />
                                    <span className="font-bold uppercase tracking-tight">{p.title}</span>
                                  </div>
                                </td>
                                <td className="p-6 opacity-60 uppercase font-bold text-[10px]">{p.type}</td>
                                <td className="p-6 text-center">
                                    <button 
                                        onClick={() => onUpdateProduct({...p, is_featured: !p.is_featured})}
                                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${p.is_featured ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20' : 'bg-white/5 text-slate-600 hover:text-white'}`}
                                        title="Exibir no Carrossel"
                                    >
                                        <i className="fa-solid fa-star text-[10px]"></i>
                                    </button>
                                </td>
                                <td className="p-6 text-right space-x-3">
                                    <button onClick={() => setEditingProduct(p)} className="text-blue-500 hover:text-white transition-colors"><i className="fa-solid fa-pen"></i></button>
                                    <button onClick={() => { if(confirm('Excluir este ativo?')) onDeleteProduct(p.id) }} className="text-red-500 hover:text-white transition-colors"><i className="fa-solid fa-trash"></i></button>
                                </td>
                            </tr>
                        ))
                      )}
                    </tbody>
                </table>
              </div>
          </div>
      )}

      {activeTab === 'ads' && (
          <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-8">
                <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10">
                    <h3 className="font-black text-xs uppercase mb-8 text-blue-500 tracking-widest flex items-center gap-2">
                        <i className="fa-solid fa-plus-circle"></i>
                        Nova Publicidade de Carrossel
                    </h3>
                    <div className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-[9px] font-black uppercase text-slate-500 tracking-widest pl-2">Título do Banner</label>
                            <input 
                                placeholder="Ex: Promoção de Lançamento" 
                                value={newAd.title} 
                                onChange={e => setNewAd({...newAd, title: e.target.value})} 
                                className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-xs outline-none focus:border-blue-500 transition-all" 
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[9px] font-black uppercase text-slate-500 tracking-widest pl-2">URL da Imagem (Recom. 1200x600)</label>
                            <input 
                                placeholder="https://..." 
                                value={newAd.image_url} 
                                onChange={e => setNewAd({...newAd, image_url: e.target.value})} 
                                className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-xs outline-none focus:border-blue-500 transition-all" 
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[9px] font-black uppercase text-slate-500 tracking-widest pl-2">Link de Destino</label>
                            <input 
                                placeholder="https://..." 
                                value={newAd.link_url} 
                                onChange={e => setNewAd({...newAd, link_url: e.target.value})} 
                                className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-xs outline-none focus:border-blue-500 transition-all" 
                            />
                        </div>
                        
                        <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Status Inicial:</span>
                            <button 
                                onClick={() => setNewAd({...newAd, is_active: !newAd.is_active})}
                                className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase transition-all ${newAd.is_active ? 'bg-emerald-500 text-white' : 'bg-slate-700 text-slate-400'}`}
                            >
                                {newAd.is_active ? 'Ativo' : 'Inativo'}
                            </button>
                        </div>

                        <button 
                            onClick={() => { 
                                if(!newAd.title || !newAd.image_url) return alert('Preencha pelo menos o título e a imagem!');
                                onUpdateAd(newAd); 
                                setNewAd({title:'', image_url:'', link_url:'', is_active: true}); 
                            }} 
                            className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all shadow-lg shadow-blue-600/20"
                        >
                            Publicar Publicidade
                        </button>
                    </div>
                </div>

                {/* Preview de Ad em Tempo Real */}
                {newAd.image_url && (
                    <div className="bg-white/5 p-4 rounded-[2rem] border border-white/5">
                        <p className="text-[9px] font-black uppercase text-slate-500 tracking-widest mb-4 pl-2">Preview do Banner</p>
                        <div className="relative h-40 rounded-2xl overflow-hidden border border-white/10">
                            <img src={newAd.image_url} className="w-full h-full object-cover opacity-60" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                            <div className="absolute bottom-4 left-4">
                                <span className="text-[8px] bg-blue-600 px-2 py-0.5 rounded-full font-black uppercase mb-1 inline-block">Publicidade</span>
                                <h4 className="text-sm font-black uppercase leading-tight">{newAd.title || 'Título Exemplo'}</h4>
                            </div>
                        </div>
                    </div>
                )}
              </div>

              <div className="space-y-4">
                  <h3 className="font-black text-xs uppercase mb-4 text-slate-500 tracking-widest pl-2">Banners Ativos</h3>
                  {ads.length === 0 ? (
                    <div className="p-20 text-center bg-white/[0.02] rounded-[2.5rem] border border-dashed border-white/5 opacity-30">
                      <p className="uppercase font-black text-[10px] tracking-widest">Nenhuma publicidade ativa</p>
                    </div>
                  ) : (
                    ads.map(ad => (
                      <div key={ad.id} className="bg-white/5 p-6 rounded-3xl border border-white/10 flex items-center gap-6 group hover:border-blue-500/30 transition-all overflow-hidden relative">
                          <img src={ad.image_url} className="w-24 h-14 object-cover rounded-xl shadow-lg border border-white/10" />
                          <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-xs uppercase truncate">{ad.title}</h4>
                              <div className="flex items-center gap-2 mt-2">
                                <button 
                                    onClick={() => onUpdateAd({...ad, is_active: !ad.is_active})}
                                    className={`px-3 py-1 rounded-lg text-[8px] font-black uppercase transition-all ${ad.is_active ? 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/30' : 'bg-red-500/20 text-red-500 border border-red-500/30'}`}
                                >
                                    {ad.is_active ? 'Visível' : 'Pausado'}
                                </button>
                              </div>
                          </div>
                          <button 
                            onClick={() => { if(confirm('Remover este banner?')) onDeleteAd(ad.id); }} 
                            className="bg-white/5 w-12 h-12 rounded-2xl flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                          >
                            <i className="fa-solid fa-trash-can text-sm"></i>
                          </button>
                      </div>
                    ))
                  )}
              </div>
          </div>
      )}

      {activeTab === 'community' && (
          <div className="space-y-6">
              {questions.length === 0 ? (
                <div className="p-32 text-center bg-white/[0.02] rounded-[3rem] border border-dashed border-white/5 opacity-30">
                  <i className="fa-solid fa-message text-4xl mb-6"></i>
                  <p className="uppercase font-black text-[10px] tracking-widest">Nenhuma interação pendente</p>
                </div>
              ) : (
                questions.map(q => (
                  <div key={q.id} className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10 animate-in fade-in duration-500">
                      <div className="flex justify-between items-center mb-6">
                          <div>
                              <span className="text-blue-500 font-black text-[10px] uppercase block mb-1">{q.user_name}</span>
                              <h4 className="text-white font-bold">{q.question}</h4>
                          </div>
                          <div className="flex gap-2">
                              <button 
                                onClick={() => onUpdateQuestion({...q, is_published: !q.is_published})}
                                className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase border transition-all ${q.is_published ? 'bg-emerald-500 border-emerald-400' : 'bg-white/5 border-white/10 text-slate-500 hover:text-white'}`}
                              >
                                  {q.is_published ? 'Visível' : 'Oculto'}
                              </button>
                              <button onClick={() => { if(confirm('Excluir pergunta?')) onDeleteQuestion(q.id) }} className="text-red-500 px-4 py-2 bg-red-500/10 rounded-xl hover:bg-red-500 hover:text-white transition-all"><i className="fa-solid fa-trash"></i></button>
                          </div>
                      </div>
                      
                      {qaAnswer?.id === q.id ? (
                          <div className="flex gap-4">
                              <textarea 
                                value={qaAnswer.text}
                                onChange={e => setQaAnswer({id: q.id, text: e.target.value})}
                                className="flex-1 bg-black/40 border border-blue-500/30 rounded-2xl p-4 text-xs h-24 outline-none"
                                placeholder="Sua resposta oficial..."
                              />
                              <div className="flex flex-col gap-2">
                                  <button onClick={() => { onUpdateQuestion({...q, answer: qaAnswer.text}); setQaAnswer(null); }} className="bg-blue-600 px-6 py-2 rounded-xl text-[9px] font-black uppercase shadow-lg shadow-blue-600/20">Salvar</button>
                                  <button onClick={() => setQaAnswer(null)} className="bg-white/5 px-6 py-2 rounded-xl text-[9px] font-black uppercase">Cancelar</button>
                              </div>
                          </div>
                      ) : (
                          <div className="flex items-center justify-between p-4 bg-white/[0.02] rounded-2xl border border-white/5">
                              <p className="text-slate-500 text-xs italic">{q.answer || "Sem resposta ainda..."}</p>
                              <button onClick={() => setQaAnswer({id: q.id, text: q.answer || ''})} className="text-blue-400 font-black uppercase text-[9px] tracking-widest hover:text-white transition-colors">Responder</button>
                          </div>
                      )}
                  </div>
                ))
              )}
          </div>
      )}
    </div>
  );
};

export default AdminView;
