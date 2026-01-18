
import React, { useState } from 'react';

interface LoginOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const LoginOverlay: React.FC<LoginOverlayProps> = ({ isOpen, onClose, onSuccess }) => {
  const [key, setKey] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleLogin = () => {
    // Correct Master Key as requested in prompt "Administrador-Profissional"
    if (key === 'Administrador-Profissional') {
      onSuccess();
      setError(false);
      setKey('');
    } else {
      setError(true);
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-xl p-6 animate-in fade-in duration-300">
      <div className={`bg-slate-900 p-12 rounded-[3.5rem] border border-white/10 w-full max-w-md text-center shadow-2xl transition-all ${error ? 'animate-bounce border-red-500/50' : ''}`}>
        <div className="w-20 h-20 bg-blue-600/10 rounded-[2rem] flex items-center justify-center text-3xl text-blue-500 mx-auto mb-8 border border-blue-500/20">
          <i className="fa-solid fa-shield-halved"></i>
        </div>
        
        <h2 className="text-2xl font-black mb-2 uppercase tracking-tight">Master Access</h2>
        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.3em] mb-10">Gateway Restrito CB Business</p>

        <div className="space-y-4">
            <input 
                type="password" 
                value={key}
                onChange={e => setKey(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                placeholder="CHAVE MESTRA" 
                className={`w-full mb-2 p-5 rounded-[2rem] text-center tracking-[0.6em] bg-black/40 border outline-none transition-all ${error ? 'border-red-500' : 'border-white/10 focus:border-blue-500'}`}
            />
            {error && <p className="text-red-500 text-[9px] font-black uppercase tracking-widest animate-pulse">Acesso Negado. Chave Incorreta.</p>}
            
            <button 
                onClick={handleLogin}
                className="w-full bg-blue-600 hover:bg-blue-500 py-5 rounded-[2rem] font-black uppercase text-xs tracking-[0.3em] transition-all shadow-xl shadow-blue-600/20"
            >
                Autenticar
            </button>
            <button 
                onClick={onClose} 
                className="mt-4 text-slate-500 text-[10px] font-black hover:text-white uppercase tracking-widest transition-colors"
            >
                Voltar ao Início
            </button>
        </div>
      </div>
    </div>
  );
};

export default LoginOverlay;
