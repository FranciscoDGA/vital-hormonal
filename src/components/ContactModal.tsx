import React, { useState } from 'react';
import { X, Mail, Send, Check } from 'lucide-react';
import { saveLead } from '../utils/leadStorage';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

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
      onClose();
    }, 3000);
  };

  return (
    <div
      id="contact-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-10 shadow-2xl border border-[#E3EBE6] relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Fechar"
          className="absolute top-5 right-5 p-2 rounded-full text-[#7d837f] hover:text-[#2D312E] hover:bg-[#F2F6F4] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#E3EBE6] text-[#26463E] flex items-center justify-center">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#26463E]">Entre em Contato</h2>
            <p className="text-sm text-[#7d837f]">Dúvidas, sugestões ou parcerias.</p>
          </div>
        </div>

        {submitted ? (
          <div className="bg-[#E3EBE6]/60 rounded-2xl p-6 text-center border border-[#c2d5cd]">
            <div className="w-12 h-12 bg-[#26463E] rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold text-[#26463E] mb-2">Mensagem enviada!</h3>
            <p className="text-sm text-[#525753]">Agradecemos o seu contato. Nossa equipe responderá em breve.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-[#2D312E] mb-1.5">Nome</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome"
                className="w-full px-4 py-3 rounded-xl border border-[#c2d5cd] focus:ring-2 focus:ring-[#58877b] focus:border-[#58877b] outline-hidden text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#2D312E] mb-1.5">E-mail <span className="text-red-500">*</span></label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu.email@exemplo.com"
                className="w-full px-4 py-3 rounded-xl border border-[#c2d5cd] focus:ring-2 focus:ring-[#58877b] focus:border-[#58877b] outline-hidden text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#2D312E] mb-1.5">Sua Mensagem <span className="text-red-500">*</span></label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Como podemos ajudar?"
                className="w-full px-4 py-3 rounded-xl border border-[#c2d5cd] focus:ring-2 focus:ring-[#58877b] focus:border-[#58877b] outline-hidden text-sm resize-none"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-[#26463E] hover:bg-[#1b332d] text-white font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <Send className="w-4 h-4" />
              Enviar Mensagem
            </button>
            <p className="text-center text-xs text-[#7d837f] mt-4">
              Ou envie um e-mail diretamente para: <br />
              <strong className="text-[#26463E]">contato@vitalhormonal.com</strong>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};
