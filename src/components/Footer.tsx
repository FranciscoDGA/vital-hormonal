import React, { useState } from 'react';
import { 
  Sparkles, 
  ShieldAlert, 
  Heart, 
  ArrowUp, 
  Send, 
  Check, 
  Users, 
  FolderDown,
  Dumbbell,
  FileText,
  Stethoscope,
  Pill,
  Wrench
} from 'lucide-react';
import { CategoryType } from '../types';
import { saveLead } from '../utils/leadStorage';

interface FooterProps {
  onSelectCategory: (category: CategoryType) => void;
  onOpenGuideModal: () => void;
  onOpenAssessment: () => void;
  onOpenAboutModal?: () => void;
  onOpenFreeMaterials?: () => void;
  onOpenAdminLeads?: () => void;
  onOpenNewsletterModal?: () => void;
  onOpenProteinCalculator?: () => void;
  onOpenLabExamsGlossary?: () => void;
  onOpenDoctorChecklist?: () => void;
  onOpenSupplementGuide?: () => void;
  onOpenLegalModal?: (tab: 'privacy' | 'terms' | 'lgpd') => void;
  onOpenContactModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenGuideModal,
  onOpenAssessment,
  onOpenAboutModal,
  onOpenFreeMaterials,
  onOpenAdminLeads,
  onOpenNewsletterModal,
  onOpenProteinCalculator,
  onOpenLabExamsGlossary,
  onOpenDoctorChecklist,
  onOpenSupplementGuide,
  onOpenLegalModal,
  onOpenContactModal,
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) return;
    saveLead('Leitora (Newsletter)', newsletterEmail, 'Newsletter Quinzenal', 'footer_newsletter');
    setSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail('');
    }, 3000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-[#26463E] text-[#E3EBE6] pt-16 pb-12 border-t border-[#335b51]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-[#335b51]">
          {/* Brand & Purpose (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#335b51] text-white flex items-center justify-center shadow-xs">
                <Sparkles className="w-5 h-5 text-[#C96E56]" />
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight text-white block leading-none">
                  Vital Hormonal
                </span>
                <span className="text-[10px] font-semibold tracking-wider uppercase text-[#c2d5cd] block mt-1">
                  Saúde Funcional & Longevidade
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#c2d5cd] leading-relaxed max-w-sm">
              Um portal editorial dedicado a traduzir a ciência hormonal e integrativa
              em clareza, autonomia e qualidade de vida para mulheres a partir dos 35 anos.
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs text-[#FAEDE7]">
              <span className="inline-block w-2 h-2 rounded-full bg-[#C96E56]" />
              <span>Conteúdo 100% livre de sensacionalismo</span>
            </div>
          </div>

          {/* Editorial Navigation (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-base font-bold text-white tracking-wide uppercase text-xs">
              Temas Editoriais
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#c2d5cd]">
              <li>
                <button
                  onClick={() => onSelectCategory('sintomas')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Sintomas & Sinais da Perimenopausa
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('nutricao')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Nutrição & Suplementação Funcional
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('hormonios')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Progesterona, Estrogênio & Cortisol
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('rotinas')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Rotinas Circadianas & Sono Reparador
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('longevidade')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Massa Muscular & Longevidade Feminina
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Tools & Resources (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-base font-bold text-white tracking-wide uppercase text-xs">
              Ferramentas & Recursos
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#c2d5cd]">
              {onOpenProteinCalculator && (
                <li>
                  <button
                    onClick={onOpenProteinCalculator}
                    className="hover:text-[#FAEDE7] text-[#FAEDE7] transition-colors cursor-pointer text-left"
                  >
                    Calculadora de Proteína 40+
                  </button>
                </li>
              )}
              {onOpenLabExamsGlossary && (
                <li>
                  <button
                    onClick={onOpenLabExamsGlossary}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Glossário A-Z de Exames
                  </button>
                </li>
              )}
              {onOpenDoctorChecklist && (
                <li>
                  <button
                    onClick={onOpenDoctorChecklist}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Checklist da Consulta Médica
                  </button>
                </li>
              )}
              {onOpenSupplementGuide && (
                <li>
                  <button
                    onClick={onOpenSupplementGuide}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Guia de Suplementos & Magnésio
                  </button>
                </li>
              )}
              {onOpenFreeMaterials && (
                <li>
                  <button
                    onClick={onOpenFreeMaterials}
                    className="hover:text-[#FAEDE7] text-[#FAEDE7] font-medium transition-colors cursor-pointer text-left flex items-center gap-1.5"
                  >
                    <FolderDown className="w-3.5 h-3.5 text-[#C96E56]" />
                    <span>Central de Materiais (PDF)</span>
                  </button>
                </li>
              )}
              {onOpenAboutModal && (
                <li>
                  <button
                    onClick={onOpenAboutModal}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Sobre o Idealizador & Propósito
                  </button>
                </li>
              )}
              <li>
                <button
                  onClick={onOpenGuideModal}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Checklist dos 7 Sinais
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAssessment}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Autoavaliação de Sintomas
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Box (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-base font-bold text-white tracking-wide uppercase text-xs">
              Pílulas de Sabedoria Hormonal
            </h4>
            <p className="text-xs text-[#c2d5cd] leading-relaxed">
              Receba quinzenalmente reflexões e ensaios clínicos comentados no seu e-mail.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Seu e-mail..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1b332d] border border-[#335b51] text-xs text-white placeholder:text-[#7d837f] focus:outline-hidden focus:border-[#C96E56]"
                />
                <button
                  type="submit"
                  aria-label="Inscrever-se"
                  className="absolute right-1.5 top-1.5 p-1.5 rounded-lg bg-[#C96E56] hover:bg-[#b55c45] text-white transition-colors cursor-pointer"
                >
                  {subscribed ? <Check className="w-3.5 h-3.5" /> : <Send className="w-3.5 h-3.5" />}
                </button>
              </div>
              {subscribed && (
                <p className="text-[11px] text-[#FAEDE7]">
                  Inscrição confirmada com sucesso!
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Ethical Medical Disclaimer Section */}
        <div className="my-8 bg-[#1b332d] rounded-2xl p-5 border border-[#335b51] text-xs text-[#c2d5cd]">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-4 h-4 text-[#C96E56] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h5 className="font-bold text-white uppercase tracking-wider text-[10px]">
                Aviso Ético & Isenção de Responsabilidade Médica
              </h5>
              <p className="leading-relaxed opacity-90 text-[11px]">
                Este conteúdo tem caráter educativo e não substitui a avaliação médica individualizada, o diagnóstico clínico ou a prescrição de planos terapêuticos.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#c2d5cd]/70 pt-4">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="font-bold tracking-widest uppercase text-white/80">© {new Date().getFullYear()} Vital Hormonal</span>
            <button onClick={() => onOpenLegalModal?.('privacy')} className="hover:text-white transition-colors cursor-pointer">Políticas de Privacidade</button>
            <button onClick={() => onOpenLegalModal?.('terms')} className="hover:text-white transition-colors cursor-pointer">Termos de Uso</button>
            <button onClick={() => onOpenLegalModal?.('lgpd')} className="hover:text-white transition-colors cursor-pointer">LGPD</button>
            <button onClick={onOpenContactModal} className="hover:text-white transition-colors cursor-pointer">Contato</button>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-[#c2d5cd] hover:text-white transition-colors cursor-pointer"
            >
              <span>Voltar ao topo</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
