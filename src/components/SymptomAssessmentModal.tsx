import React, { useState } from 'react';
import { X, Sparkles, Check, ArrowRight, RefreshCw, BookOpen } from 'lucide-react';
import { ARTICLES_DATA } from '../data/articles';
import { Article } from '../types';

interface SymptomAssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReadArticle: (article: Article) => void;
  onOpenGuideModal: () => void;
}

interface SymptomOption {
  id: string;
  label: string;
  category: 'sono' | 'cognicao' | 'metabolismo' | 'humor';
  recommendedArticleId: string;
}

const SYMPTOM_OPTIONS: SymptomOption[] = [
  { id: 's1', label: 'Acordo entre 2h e 4h da madrugada e não volto a dormir', category: 'sono', recommendedArticleId: 'art-1' },
  { id: 's2', label: 'Sensação de "cabeça oca" ou esquecimento de palavras comuns', category: 'cognicao', recommendedArticleId: 'art-2' },
  { id: 's3', label: 'Ganho de gordura na região da cintura mesmo comendo pouco', category: 'metabolismo', recommendedArticleId: 'art-3' },
  { id: 's4', label: 'Irritabilidade súbita ou ansiedade sem gatilho aparente', category: 'humor', recommendedArticleId: 'art-1' },
  { id: 's5', label: 'Fadiga e cansaço pesado logo ao levantar pela manhã', category: 'sono', recommendedArticleId: 'art-5' },
  { id: 's6', label: 'Inchaço acentuado e retenção hídrica na segunda fase do ciclo', category: 'metabolismo', recommendedArticleId: 'art-4' },
  { id: 's7', label: 'Perda de força muscular e flacidez mais rápida após os 35', category: 'metabolismo', recommendedArticleId: 'art-6' },
];

export const SymptomAssessmentModal: React.FC<SymptomAssessmentModalProps> = ({
  isOpen,
  onClose,
  onReadArticle,
  onOpenGuideModal,
}) => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [step, setStep] = useState<'select' | 'results'>('select');
  const [ageGroup, setAgeGroup] = useState<string>('38-44');

  if (!isOpen) return null;

  const toggleSymptom = (id: string) => {
    if (selectedSymptoms.includes(id)) {
      setSelectedSymptoms(selectedSymptoms.filter((s) => s !== id));
    } else {
      setSelectedSymptoms([...selectedSymptoms, id]);
    }
  };

  const handleGetResults = () => {
    if (selectedSymptoms.length === 0) return;
    setStep('results');
  };

  const handleReset = () => {
    setSelectedSymptoms([]);
    setStep('select');
  };

  // Find unique recommended articles based on selections
  const recommendedArticleIds = Array.from(
    new Set(
      SYMPTOM_OPTIONS.filter((opt) => selectedSymptoms.includes(opt.id)).map(
        (opt) => opt.recommendedArticleId
      )
    )
  );

  const matchedArticles = ARTICLES_DATA.filter((art) =>
    recommendedArticleIds.includes(art.id)
  );

  return (
    <div
      id="symptom-assessment-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-[#E3EBE6] relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Fechar"
          className="absolute top-4 right-4 p-2 text-[#7d837f] hover:text-[#2D312E] rounded-full hover:bg-[#F9F7F2] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'select' ? (
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E3EBE6] text-[#26463E] text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#C96E56]" />
              <span>Autoavaliação Rápida de Sinais</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#26463E] mb-2 leading-tight">
              O que seu corpo está comunicando?
            </h3>
            <p className="text-xs sm:text-sm text-[#525753] mb-5">
              Selecione sua faixa etária e marque os incômodos que você tem sentido nas últimas semanas:
            </p>

            {/* Age selector */}
            <div className="mb-5">
              <label className="block text-xs font-bold text-[#26463E] uppercase tracking-wider mb-2">
                Sua Faixa Etária:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['35-39 anos', '40-45 anos', '46+ anos'].map((age) => (
                  <button
                    key={age}
                    type="button"
                    onClick={() => setAgeGroup(age)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      ageGroup === age
                        ? 'bg-[#26463E] text-white border-[#26463E]'
                        : 'bg-[#F9F7F2] text-[#525753] border-[#E3EBE6] hover:bg-[#E3EBE6]'
                    }`}
                  >
                    {age}
                  </button>
                ))}
              </div>
            </div>

            {/* Symptoms list */}
            <div className="space-y-2 mb-6">
              <label className="block text-xs font-bold text-[#26463E] uppercase tracking-wider mb-2">
                Marque seus sinais frequentes:
              </label>
              {SYMPTOM_OPTIONS.map((opt) => {
                const isChecked = selectedSymptoms.includes(opt.id);
                return (
                  <div
                    key={opt.id}
                    onClick={() => toggleSymptom(opt.id)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                      isChecked
                        ? 'bg-[#E3EBE6]/80 border-[#58877b] text-[#26463E]'
                        : 'bg-[#F9F7F2] border-[#E3EBE6] text-[#2D312E] hover:bg-white'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 border ${
                        isChecked
                          ? 'bg-[#26463E] border-[#26463E] text-white'
                          : 'border-[#c2d5cd] bg-white'
                      }`}
                    >
                      {isChecked && <Check className="w-3.5 h-3.5" />}
                    </div>
                    <span className="text-xs sm:text-sm leading-snug font-medium">
                      {opt.label}
                    </span>
                  </div>
                );
              })}
            </div>

            <button
              onClick={handleGetResults}
              disabled={selectedSymptoms.length === 0}
              className={`w-full py-3.5 px-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                selectedSymptoms.length > 0
                  ? 'bg-[#C96E56] hover:bg-[#b55c45] text-white shadow-md'
                  : 'bg-[#E3EBE6] text-[#7d837f] cursor-not-allowed'
              }`}
            >
              <span>Ver Minha Trilha Recomendada ({selectedSymptoms.length} selecionados)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          /* Results View */
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E3EBE6] text-[#26463E] text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#C96E56]" />
              <span>Seu Diagnóstico Editorial Funcional</span>
            </div>

            <h3 className="font-serif text-2xl font-bold text-[#26463E] mb-2">
              Trilha Personalizada para {ageGroup}
            </h3>

            <p className="text-xs sm:text-sm text-[#525753] leading-relaxed mb-6">
              Com base nos {selectedSymptoms.length} sinais selecionados, seus sintomas
              apontam para uma provável <strong>insuficiência lútea inicial e sobrecarga de cortisol</strong>.
              Aqui estão os artigos essenciais para entender as causas biológicas:
            </p>

            {/* Matched Articles */}
            <div className="space-y-3 mb-6">
              {matchedArticles.map((art) => (
                <div
                  key={art.id}
                  onClick={() => {
                    onClose();
                    onReadArticle(art);
                  }}
                  className="bg-[#F9F7F2] hover:bg-[#E3EBE6] p-4 rounded-2xl border border-[#E3EBE6] transition-all cursor-pointer flex items-center justify-between gap-3 group"
                >
                  <div className="overflow-hidden">
                    <span className="text-[11px] font-bold text-[#C96E56] uppercase tracking-wider block mb-1">
                      {art.categoryLabel}
                    </span>
                    <h4 className="font-serif text-sm sm:text-base font-bold text-[#26463E] group-hover:text-[#C96E56] transition-colors leading-snug">
                      {art.title}
                    </h4>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 shadow-2xs group-hover:bg-[#26463E] group-hover:text-white transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>

            {/* Download Guide Action */}
            <div className="bg-[#26463E] text-white p-5 rounded-2xl mb-5 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-[#C96E56] uppercase">
                  Recomendação Complementar
                </span>
                <p className="text-xs text-[#E3EBE6] mt-0.5">
                  Baixe o Checklist com o protocolo de exames sugerido para o seu perfil.
                </p>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onOpenGuideModal();
                }}
                className="bg-[#C96E56] hover:bg-[#b55c45] text-white text-xs font-bold px-4 py-2.5 rounded-xl whitespace-nowrap cursor-pointer"
              >
                Baixar Guia Grátis
              </button>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={handleReset}
                className="text-xs text-[#525753] hover:text-[#26463E] flex items-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Refazer teste</span>
              </button>

              <button
                onClick={onClose}
                className="bg-[#E3EBE6] text-[#26463E] text-xs font-semibold px-4 py-2 rounded-xl hover:bg-[#c2d5cd] transition-colors cursor-pointer"
              >
                Fechar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
