import React, { useState } from 'react';
import { Mail, Send, Check } from 'lucide-react';
import { saveLead } from '../utils/leadStorage';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !message) return;
    saveLead(name || 'Anônimo (Contato)', email, 'Mensagem de Contato', 'contact_form');
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setEmail('');
      setMessage('');
    }, 5000);
  };

  return (
    <main className="flex-1 bg-[#F9F7F2] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-[#E3EBE6] min-h-[60vh]">
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-16 h-16 rounded-3xl bg-[#E3EBE6] text-[#26463E] flex items-center justify-center mb-6">
            <Mail className="w-8 h-8" />
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#26463E] mb-3">
            Entre em Contato
          </h1>
          <p className="text-base text-[#525753] max-w-lg">
            Tem dúvidas sobre nossos conteúdos, sugestões de pautas ou deseja propor uma parceria? Ficaremos felizes em ouvir você.
          </p>
        </div>

        {submitted ? (
          <div className="bg-[#E3EBE6]/60 rounded-2xl p-10 text-center border border-[#c2d5cd] max-w-lg mx-auto">
            <div className="w-16 h-16 bg-[#26463E] rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-2xl text-[#26463E] mb-3">Mensagem enviada!</h3>
            <p className="text-base text-[#525753]">Agradecemos o seu contato. Nossa equipe revisará sua mensagem e responderá em breve.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto">
            <div>
              <label className="block text-sm font-semibold text-[#2D312E] mb-2">Nome</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Como podemos te chamar?"
                className="w-full px-5 py-4 rounded-xl border border-[#c2d5cd] focus:ring-2 focus:ring-[#58877b] focus:border-[#58877b] outline-none text-base"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#2D312E] mb-2">E-mail <span className="text-red-500">*</span></label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu.melhor@email.com"
                className="w-full px-5 py-4 rounded-xl border border-[#c2d5cd] focus:ring-2 focus:ring-[#58877b] focus:border-[#58877b] outline-none text-base"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#2D312E] mb-2">Sua Mensagem <span className="text-red-500">*</span></label>
              <textarea
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Escreva sua dúvida, sugestão ou proposta..."
                className="w-full px-5 py-4 rounded-xl border border-[#c2d5cd] focus:ring-2 focus:ring-[#58877b] focus:border-[#58877b] outline-none text-base resize-none"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-[#26463E] hover:bg-[#1b332d] text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md text-base"
            >
              <Send className="w-5 h-5" />
              Enviar Mensagem
            </button>
            <div className="text-center pt-4 border-t border-[#E3EBE6] mt-8">
              <p className="text-sm text-[#7d837f]">
                Ou envie um e-mail diretamente para: <br />
                <a href="mailto:contato@vitalhormonal.com" className="strong text-[#26463E] font-bold mt-1 inline-block">contato@vitalhormonal.com</a>
              </p>
            </div>
          </form>
        )}
      </div>
    </main>
  );
};
