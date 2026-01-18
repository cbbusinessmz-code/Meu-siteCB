
import React, { useState } from 'react';
import { CommunityQuestion } from '../types';

interface CommunitySectionProps {
  questions: CommunityQuestion[];
  onAskQuestion: (q: Partial<CommunityQuestion>) => void;
}

const CommunitySection: React.FC<CommunitySectionProps> = ({ questions, onAskQuestion }) => {
  const [form, setForm] = useState({ name: '', text: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.text) return;
    onAskQuestion({
      user_name: form.name,
      question: form.text,
      is_published: false
    });
    setForm({ name: '', text: '' });
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-32 border-t border-white/5">
      <div className="grid lg:grid-cols-2 gap-20">
        <div>
          <h2 className="text-blue-500 font-black text-xs uppercase tracking-[0.4em] mb-4">Elite Community</h2>
          <h3 className="text-5xl font-black gradient-text mb-8 tracking-tighter">Perguntas & Respostas</h3>
          <p className="text-slate-500 mb-12 max-w-md font-medium leading-relaxed">
            Tem alguma dúvida sobre um ativo ou processo? Nossa comunidade e especialistas estão aqui para ajudar.
          </p>

          <form onSubmit={handleSubmit} className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10 space-y-4">
            <input 
              type="text" 
              placeholder="Seu Nome" 
              value={form.name}
              onChange={e => setForm({...form, name: e.target.value})}
              className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-xs outline-none focus:border-blue-500 transition-all"
            />
            <textarea 
              placeholder="Qual sua dúvida?" 
              value={form.text}
              onChange={e => setForm({...form, text: e.target.value})}
              className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-xs h-32 outline-none focus:border-blue-500 transition-all no-scrollbar"
            />
            <button 
              type="submit"
              className={`w-full py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all ${sent ? 'bg-emerald-500' : 'bg-blue-600 hover:bg-blue-500'}`}
            >
              {sent ? 'Enviado para Moderação!' : 'Enviar Pergunta'}
            </button>
          </form>
        </div>

        <div className="space-y-6 max-h-[600px] overflow-y-auto pr-4 no-scrollbar">
          {questions.length > 0 ? (
            questions.map(q => (
              <div key={q.id} className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10 group hover:border-blue-500/30 transition-all">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-blue-500 font-black text-[10px] uppercase tracking-widest">{q.user_name}</span>
                  <span className="text-slate-600 text-[9px] font-bold">{new Date(q.created_at).toLocaleDateString()}</span>
                </div>
                <h4 className="text-white font-bold mb-6 text-sm italic">"{q.question}"</h4>
                <div className="pl-6 border-l-2 border-blue-600/30">
                  <p className="text-slate-400 text-xs font-medium leading-relaxed">
                    <span className="text-blue-500 font-black mr-2 uppercase text-[9px]">CB Suporte:</span>
                    {q.answer || "Aguardando resposta oficial..."}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center opacity-20 py-20">
              <i className="fa-solid fa-comments text-6xl mb-6"></i>
              <p className="font-black uppercase text-[10px] tracking-[0.3em]">Nenhuma pergunta publicada</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
