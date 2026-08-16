import React from 'react';
import { X, Sparkles, Heart, BookOpen, ShieldCheck, CheckCircle2, Award, Users } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenGuideModal?: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({
  isOpen,
  onClose,
  onOpenGuideModal,
}) => {
  if (!isOpen) return null;

  return (
    <div
      id="about-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="about-modal-content"
        className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-10 shadow-2xl border border-[#E3EBE6] relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Fechar modal"
          className="absolute top-5 right-5 p-2 rounded-full text-[#7d837f] hover:text-[#2D312E] hover:bg-[#F2F6F4] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E3EBE6] text-[#26463E] text-xs font-bold uppercase tracking-wider mb-4 border border-[#c2d5cd]">
          <Heart className="w-3.5 h-3.5 text-[#C96E56]" />
          <span>Nossa História & Propósito</span>
        </div>

        {/* Main Title */}
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#26463E] mb-3 leading-tight">
          Por trás do Vital Hormonal: Ciência traduzida em acolhimento e clareza.
        </h2>

        <p className="text-sm sm:text-base text-[#525753] leading-relaxed mb-6 font-normal">
          Um portal editorial independente criado para transformar a literatura médica global em conhecimento prático, acessível e sem jargões para mulheres a partir dos 35 anos.
        </p>

        {/* Founder Letter Box */}
        <div className="bg-[#F9F7F2] rounded-2xl p-6 border border-[#E3EBE6] mb-8 space-y-4 text-sm sm:text-base text-[#2D312E] leading-relaxed">
          <div className="flex items-center gap-3 pb-3 border-b border-[#E3EBE6]">
            <div className="w-10 h-10 rounded-full bg-[#26463E] text-white flex items-center justify-center font-serif font-bold text-lg shadow-xs">
              V
            </div>
            <div>
              <span className="font-bold text-[#26463E] block text-sm sm:text-base">
                Mensagem do Idealizador
              </span>
              <span className="text-xs text-[#7d837f] block">
                Fundador & Pesquisador de Conteúdo do Vital Hormonal
              </span>
            </div>
          </div>

          <p className="italic text-[#525753]">
            &ldquo;Como homem, esposo e pai de família, testemunhei de perto a jornada silenciosa e muitas vezes solitária que as mulheres enfrentam ao entrar na transição hormonal após os 35 anos.
          </p>
          <p className="italic text-[#525753]">
            Vi pessoas incríveis ouvirem que o cansaço constante, a névoa mental e as alterações de humor eram &apos;apenas estresse da idade&apos; ou &apos;coisa da cabeça&apos;. Fiquei inconformado ao constatar como a ciência hormonal de ponta já possui respostas valiosas — mas que quase nunca chegam de forma clara e humana a quem mais precisa.
          </p>
          <p className="italic text-[#525753]">
            O <strong>Vital Hormonal</strong> nasceu desse amor e compromisso: ser uma ponte entre os melhores ensaios clínicos do mundo e o seu dia a dia, trazendo autonomia para que você tome as rédeas da sua saúde com serenidade e respeito.&rdquo;
          </p>
        </div>

        {/* The 3 Editorial Pillars */}
        <div className="space-y-4 mb-8">
          <h3 className="font-serif text-lg font-bold text-[#26463E] flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#C96E56]" />
            Nossos 3 Pilares Editoriais
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-[#E3EBE6] shadow-2xs">
              <BookOpen className="w-5 h-5 text-[#58877b] mb-2" />
              <h4 className="font-bold text-xs sm:text-sm text-[#26463E] mb-1">
                1. Curadoria Baseada em Evidências
              </h4>
              <p className="text-xs text-[#525753] leading-relaxed">
                Consultamos estudos indexados no PubMed, The Lancet e NAMS, traduzindo dados complexos em linguagem acolhedora.
              </p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-[#E3EBE6] shadow-2xs">
              <Award className="w-5 h-5 text-[#C96E56] mb-2" />
              <h4 className="font-bold text-xs sm:text-sm text-[#26463E] mb-1">
                2. Zero Sensacionalismo
              </h4>
              <p className="text-xs text-[#525753] leading-relaxed">
                Não prometemos curas mágicas nem usamos alarmismo. Abordamos a biologia com respeito à individualidade.
              </p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-[#E3EBE6] shadow-2xs">
              <Users className="w-5 h-5 text-[#26463E] mb-2" />
              <h4 className="font-bold text-xs sm:text-sm text-[#26463E] mb-1">
                3. Diálogo com seu Médico
              </h4>
              <p className="text-xs text-[#525753] leading-relaxed">
                Munimos você com conhecimento para que converse de igual para igual nas consultas com seu médico de confiança.
              </p>
            </div>
          </div>
        </div>

        {/* Ethical Box */}
        <div className="bg-[#E3EBE6]/60 rounded-2xl p-4 border border-[#c2d5cd] mb-6 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-[#58877b] shrink-0 mt-0.5" />
          <p className="text-xs text-[#26463E] leading-relaxed">
            <strong>Transparência Ética:</strong> O Vital Hormonal é um portal de mídia e educação em saúde feminina. O conteúdo não substitui a consulta médica individualizada, o diagnóstico clínico ou a prescrição terapêutica.
          </p>
        </div>

        {/* Action button */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
          {onOpenGuideModal && (
            <button
              onClick={() => {
                onClose();
                onOpenGuideModal();
              }}
              className="w-full sm:w-auto bg-[#C96E56] hover:bg-[#b55c45] text-white text-xs sm:text-sm font-semibold px-5 py-3 rounded-xl transition-all cursor-pointer shadow-xs"
            >
              Baixar Guia Gratuito dos 7 Sinais
            </button>
          )}
          <button
            onClick={onClose}
            className="w-full sm:w-auto bg-[#26463E] hover:bg-[#1b332d] text-white text-xs sm:text-sm font-semibold px-5 py-3 rounded-xl transition-all cursor-pointer shadow-xs"
          >
            Continuar Navegando no Portal
          </button>
        </div>
      </div>
    </div>
  );
};
