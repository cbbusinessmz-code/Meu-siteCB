
import React, { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from './lib/supabase';
import { Product, CartItem, SiteStats, Ad, CommunityQuestion } from './types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Catalog from './components/Catalog';
import CartSidebar from './components/CartSidebar';
import AdminView from './components/AdminView';
import LoginOverlay from './components/LoginOverlay';
import Footer from './components/Footer';
import EliteCarousel from './components/EliteCarousel';
import CommunitySection from './components/CommunitySection';

const App: React.FC = () => {
  const [view, setView] = useState<'public' | 'admin'>('public');
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [ads, setAds] = useState<Ad[]>([]);
  const [questions, setQuestions] = useState<CommunityQuestion[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [dbError, setDbError] = useState<string | null>(null);
  const [isSupabaseConnected, setIsSupabaseConnected] = useState(false);
  const [lastSync, setLastSync] = useState<Date | null>(null);
  const [liveVisitors, setLiveVisitors] = useState(0); 
  
  // Stats inicializados em zero para produção real
  const [stats, setStats] = useState<SiteStats>({
    visitors: 0, 
    sales: 0,
    inventory: 0,
    revenue: 0
  });

  // Contador de usuários online (Simulação orgânica para dar vida ao portal)
  useEffect(() => {
    setLiveVisitors(Math.floor(Math.random() * 5) + 2);
    
    const interval = setInterval(() => {
      setLiveVisitors(prev => {
        const change = Math.floor(Math.random() * 3) - 1;
        const newVal = prev + change;
        return newVal < 2 ? 2 : newVal > 20 ? 20 : newVal;
      });
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = useCallback(async () => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      setIsSupabaseConnected(false);
      return;
    }

    setLoading(true);
    setDbError(null);
    try {
      // Busca Produtos
      const { data: prodData, error: prodError } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (prodError) throw prodError;
      setProducts(prodData || []);

      // Busca Anúncios
      const { data: adsData, error: adsError } = await supabase
        .from('ads')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (adsError) throw adsError;
      setAds(adsData || []);

      // Busca Perguntas da Comunidade
      const { data: qData } = await supabase
        .from('community_questions')
        .select('*')
        .order('created_at', { ascending: false });
      setQuestions(qData || []);

      // Atualiza Contadores
      setStats(prev => ({
        ...prev,
        inventory: prodData?.length || 0,
      }));

      setIsSupabaseConnected(true);
      setLastSync(new Date());
    } catch (error: any) {
      console.error("Erro de Sincronização:", error.message);
      setDbError(error.message);
      setIsSupabaseConnected(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleUpdate = async (type: 'product' | 'ad' | 'question', payload: any) => {
    const table = type === 'product' ? 'products' : type === 'ad' ? 'ads' : 'community_questions';
    try {
      const { error } = await supabase.from(table).upsert(payload);
      if (error) throw error;
      fetchData();
    } catch (e: any) {
      alert("Erro na operação: " + e.message);
    }
  };

  const handleDelete = async (type: 'product' | 'ad' | 'question', id: string) => {
    const table = type === 'product' ? 'products' : type === 'ad' ? 'ads' : 'community_questions';
    try {
      const { error } = await supabase.from(table).delete().eq('id', id);
      if (error) throw error;
      fetchData();
    } catch (e: any) {
      alert("Erro ao excluir: " + e.message);
    }
  };

  return (
    <div className="min-h-screen relative text-slate-100 selection:bg-blue-600/30">
      <div className="fixed inset-0 bg-[#020617] -z-10" />
      <div className="fixed inset-0 opacity-20 pointer-events-none -z-10 bg-[radial-gradient(circle_at_50%_-20%,#3b82f6,transparent_50%)]" />

      <Navbar 
        onAdminClick={() => setIsLoginOpen(true)} 
        onCartClick={() => setIsCartOpen(true)}
        cartCount={cart.reduce((acc, i) => acc + i.quantity, 0)}
        onLogoClick={() => setView('public')}
        liveVisitors={liveVisitors}
      />

      <main className="pt-24 pb-20">
        {view === 'public' ? (
          <>
            {/* Elite Carousel: Ativo apenas se houver anúncios ativos ou produtos em destaque */}
            {(ads.some(ad => ad.is_active) || products.some(p => p.is_featured)) && (
              <EliteCarousel 
                ads={ads.filter(ad => ad.is_active)} 
                featuredProducts={products.filter(p => p.is_featured)} 
              />
            )}
            
            <Hero stats={stats} liveVisitors={liveVisitors} />
            
            {loading ? (
              <div className="flex flex-col items-center justify-center py-32 space-y-6">
                <div className="w-12 h-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500 animate-pulse">Sincronizando Ecossistema Elite...</p>
              </div>
            ) : (
              <>
                <Catalog products={products} onAddToCart={addToCart} />
                <CommunitySection 
                  questions={questions.filter(q => q.is_published)} 
                  onAskQuestion={(q) => handleUpdate('question', q)} 
                />
              </>
            )}
          </>
        ) : (
          <AdminView 
            products={products}
            ads={ads}
            questions={questions}
            stats={stats} 
            onUpdateProduct={(p) => handleUpdate('product', p)} 
            onDeleteProduct={(id) => handleDelete('product', id)}
            onUpdateAd={(ad) => handleUpdate('ad', ad)}
            onDeleteAd={(id) => handleDelete('ad', id)}
            onUpdateQuestion={(q) => handleUpdate('question', q)}
            onDeleteQuestion={(id) => handleDelete('question', id)}
            onExit={() => setView('public')}
            isConnected={isSupabaseConnected}
            error={dbError}
            lastSync={lastSync}
            onRefresh={fetchData}
          />
        )}
      </main>

      <Footer />
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} items={cart} onRemove={removeFromCart} />
      <LoginOverlay isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} onSuccess={() => { setView('admin'); setIsLoginOpen(false); }} />
    </div>
  );
};

export default App;
