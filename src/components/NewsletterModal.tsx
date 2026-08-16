import React, { useState, useEffect } from 'react';
import { X, Mail, CheckCircle2, Sparkles, ShieldCheck, HeartHandshake, ArrowRight } from 'lucide-react';
import { saveLead } from '../utils/leadStorage';

interface NewsletterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewsletterModal: React.FC<NewsletterModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [interests, setInterests] = useState<string[]>(['sono', 'hormonios']);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const toggleInterest = (tag: string) => {
    setInterests(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setLoading(true);
    setTimeout(() => {
      const interestsStr = interests.length > 0 ? ` [Interesses: ${interests.join(', ')}]` : '';
      saveLead(
        name.trim() || 'Leitora Assinante',
        email.trim(),
        `Newsletter Quinzenal${interestsStr}`,
        'popup_newsletter'
      );
      
      try {
        localStorage.setItem('vital_hormonal_newsletter_subscribed', 'true');
        localStorage.setItem('vital_hormonal_newsletter_subscribed_email', email);
      } catch {
        // ignore
      }

      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  const handleDismiss = () => {
    try {
      // Remember dismissal for 7 days
      const expireTime = Date.now() + 7 * 24 * 60 * 60 * 1000;
      localStorage.setItem('vital_hormonal_newsletter_dismissed_until', expireTime.toString());
    } catch {
      // ignore
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn"
      onClick={handleDismiss}
    >
      <div
        className="bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-[#E3EBE6] relative animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="newsletter-modal-close-btn"
          onClick={handleDismiss}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-[#F2F6F4] text-[#2D312E] hover:bg-[#E3EBE6] hover:text-[#C96E56] transition-colors flex items-center justify-center cursor-pointer"
          aria-label="Fechar pop-up"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          /* Success State */
          <div className="p-8 sm:p-10 text-center space-y-5">
            <div className="w-16 h-16 bg-[#F2F6F4] text-[#26463E] rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-9 h-9 text-[#58877b]" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#C96E56] block mb-1">
                Inscrição Confirmada
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#26463E]">
                Bem-vinda à nossa comunidade!
              </h3>
              <p className="text-sm sm:text-base text-[#525753] mt-2 leading-relaxed max-w-sm mx-auto">
                Você receberá nossa próxima edição quinzenal com os últimos artigos científicos, novidades sobre reposição hormonal e protocolos funcionais.
              </p>
            </div>

            <div className="bg-[#FDFAF7] border border-[#E3EBE6] rounded-2xl p-4 text-xs text-[#26463E] flex items-center gap-3 text-left">
              <Sparkles className="w-5 h-5 text-[#C96E56] shrink-0" />
              <span>Enviamos um e-mail de boas-vindas para <strong>{email}</strong>. Verifique sua caixa de entrada ou aba de promoções.</span>
            </div>

            <button
              onClick={onClose}
              className="w-full bg-[#26463E] hover:bg-[#1b332d] text-white py-3.5 rounded-xl font-semibold text-sm transition-colors cursor-pointer shadow-xs"
            >
              Continuar Lendo os Artigos
            </button>
          </div>
        ) : (
          /* Form State */
          <div>
            {/* Header Visual Banner */}
            <div className="bg-[#26463E] text-white p-6 sm:p-8 relative overflow-hidden">
              <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-[#335b51]/40 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-[#335b51] text-[#FAEDE7] text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-[#C96E56]" />
                  Newsletter Quinzenal Gratuita
                </span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold leading-tight mt-2">
                O Despertar Hormonal
              </h3>
              <p className="text-xs sm:text-sm text-[#c2d5cd] mt-2 leading-relaxed">
                Ciência médica integrativa, longevidade e autonomia hormonal para mulheres 35+ direto na sua caixa de entrada, a cada 15 dias.
              </p>
            </div>

            {/* Form Body */}
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#26463E] mb-1.5">
                  Seu Primeiro Nome
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Mariana"
                  className="w-full px-4 py-3 rounded-xl border border-[#E3EBE6] bg-[#FDFAF7] text-sm text-[#2D312E] focus:outline-none focus:border-[#58877b] focus:ring-2 focus:ring-[#58877b]/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#26463E] mb-1.5">
                  Seu Melhor E-mail <span className="text-[#C96E56]">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#7d837f] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu.email@exemplo.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E3EBE6] bg-[#FDFAF7] text-sm text-[#2D312E] focus:outline-none focus:border-[#58877b] focus:ring-2 focus:ring-[#58877b]/20"
                  />
                </div>
              </div>

              {/* Topics of Interest Tags */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#7d837f] mb-2">
                  Temas que mais lhe interessam:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { id: 'sono', label: 'Sono & Progesterona' },
                    { id: 'metabolismo', label: 'Gordura Abdominal' },
                    { id: 'foco', label: 'Névoa Mental & Foco' },
                    { id: 'trh', label: 'Reposição Hormonal' },
                    { id: 'longevidade', label: 'Longevidade Celular' }
                  ].map((topic) => {
                    const isChecked = interests.includes(topic.id);
                    return (
                      <button
                        type="button"
                        key={topic.id}
                        onClick={() => toggleInterest(topic.id)}
                        className={`text-xs px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                          isChecked
                            ? 'bg-[#58877b] text-white border-[#58877b] font-semibold'
                            : 'bg-white text-[#525753] border-[#E3EBE6] hover:bg-[#F2F6F4]'
                        }`}
                      >
                        {isChecked ? '✓ ' : '+ '}
                        {topic.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Guarantees */}
              <div className="space-y-1.5 pt-2 text-[11px] text-[#7d837f]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#58877b]" />
                  <span>100% livre de spam • Cancele a qualquer momento com 1 clique</span>
                </div>
                <div className="flex items-center gap-2">
                  <HeartHandshake className="w-3.5 h-3.5 text-[#58877b]" />
                  <span>Curadoria clínica baseada em artigos do PubMed</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={loading || !email}
                className="w-full mt-4 bg-[#C96E56] hover:bg-[#b55c45] text-white py-3.5 rounded-xl font-semibold text-sm transition-colors cursor-pointer shadow-xs flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span>Cadastrando...</span>
                ) : (
                  <>
                    <span>Quero Receber a Newsletter</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
