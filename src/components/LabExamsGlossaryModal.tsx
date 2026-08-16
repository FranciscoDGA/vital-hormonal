import React, { useState, useMemo } from 'react';
import { 
  X, 
  Search, 
  FileText, 
  Sparkles, 
  ChevronDown, 
  ArrowRight, 
  Check, 
  Share2, 
  Info, 
  AlertCircle, 
  Layers,
  BookOpen,
  Calendar,
  Clock,
  Copy,
  MessageCircle
} from 'lucide-react';
import { LAB_EXAMS_DATA, LabExam } from '../data/labExamsData';

interface LabExamsGlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReadArticleById?: (id: string) => void;
}

export const LabExamsGlossaryModal: React.FC<LabExamsGlossaryModalProps> = ({
  isOpen,
  onClose,
  onReadArticleById
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [expandedExamId, setExpandedExamId] = useState<string | null>('fsh');
  const [copiedList, setCopiedList] = useState(false);

  if (!isOpen) return null;

  const categories = [
    { id: 'todos', label: 'Todos os Exames' },
    { id: 'hormonios', label: 'Hormônios & Ovários' },
    { id: 'metabolismo', label: 'Metabolismo & Insulina' },
    { id: 'vitaminas_minerais', label: 'Nutrientes & Ferritina' },
    { id: 'tireoide', label: 'Tireoide & T3' },
    { id: 'inflamacao', label: 'Cardio & Inflamação' }
  ];

  const filteredExams = useMemo(() => {
    return LAB_EXAMS_DATA.filter((exam) => {
      const matchCat = selectedCategory === 'todos' || exam.category === selectedCategory;
      const matchSearch =
        !searchTerm.trim() ||
        exam.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exam.shortName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exam.purpose.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exam.symptomsRelated.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchTerm]);

  const toggleExpand = (id: string) => {
    setExpandedExamId(expandedExamId === id ? null : id);
  };

  const handleCopyAllExams = () => {
    const list = LAB_EXAMS_DATA.map((e) => `• ${e.name}`).join('\n');
    const text = `📋 Painel Laboratorial Recomendado para Mulher 35+ (Vital Hormonal):\n\n${list}\n\nConsulte o guia completo em: ${window.location.origin}`;
    navigator.clipboard.writeText(text);
    setCopiedList(true);
    setTimeout(() => setCopiedList(false), 2500);
  };

  const handleShareWhatsApp = (exam: LabExam) => {
    const text = `🔬 *Guia de Exame: ${exam.name}*%0A%0A` +
      `📌 *Por que dosar aos 40+:* ${exam.purpose}%0A` +
      `🎯 *Faixa Funcional Otimizada:* ${exam.optimalRange}%0A` +
      `⚠️ *Se estiver baixo/alto:* ${exam.lowMeaning} / ${exam.highMeaning}%0A` +
      `💡 *Dica de coleta:* ${exam.collectionTips}%0A%0A` +
      `Veja no portal Vital Hormonal: ${window.location.origin}`;
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#1b332d]/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div 
        className="bg-[#FDFAF7] w-full max-w-3xl rounded-3xl shadow-2xl border border-[#d2dfd8] overflow-hidden my-4 sm:my-8 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#26463E] text-white p-5 sm:p-6 relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            title="Fechar glossário"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-[#C96E56] text-xs font-bold uppercase tracking-wider mb-2">
            <FileText className="w-4 h-4" />
            <span>Dicionário Clínico & Laboratorial</span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
            Glossário A-Z de Exames da Mulher 35+
          </h3>
          <p className="text-xs sm:text-sm text-[#E3EBE6] mt-1.5 leading-relaxed">
            Entenda o que cada sigla significa, compare os valores de referência com as faixas funcionais ideais e descubra o que pedir na sua próxima consulta.
          </p>

          {/* Search bar inside header */}
          <div className="relative mt-4">
            <Search className="w-4 h-4 text-[#7d837f] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por exame ou sintoma (ex: FSH, Ferritina, Insulina, Queda de cabelo)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white text-[#2D312E] text-xs sm:text-sm placeholder:text-[#7d837f] border-none focus:outline-hidden focus:ring-2 focus:ring-[#C96E56]"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#7d837f] hover:text-[#26463E]"
              >
                Limpar
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="px-5 py-3 bg-[#F2F6F4] border-b border-[#E3EBE6] flex items-center gap-2 overflow-x-auto shrink-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#26463E] text-white shadow-xs'
                  : 'bg-white text-[#525753] hover:bg-[#E3EBE6] border border-[#E3EBE6]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Exam List Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4">
          {filteredExams.length === 0 ? (
            <div className="text-center py-12 text-[#7d837f]">
              <AlertCircle className="w-8 h-8 mx-auto mb-2 text-[#C96E56]" />
              <p className="text-sm font-semibold">Nenhum exame encontrado para "{searchTerm}".</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('todos');
                }}
                className="mt-2 text-xs text-[#26463E] font-bold underline"
              >
                Ver todos os exames
              </button>
            </div>
          ) : (
            filteredExams.map((exam) => {
              const isExpanded = expandedExamId === exam.id;
              return (
                <div
                  key={exam.id}
                  className={`bg-white rounded-2xl border transition-all overflow-hidden ${
                    isExpanded ? 'border-[#58877b] shadow-md' : 'border-[#E3EBE6] hover:border-[#58877b]/50'
                  }`}
                >
                  {/* Item Accordion Header */}
                  <button
                    type="button"
                    onClick={() => toggleExpand(exam.id)}
                    className="w-full p-4 sm:p-5 text-left flex items-start sm:items-center justify-between gap-4 cursor-pointer"
                  >
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#C96E56] bg-[#FAEDE7] px-2.5 py-0.5 rounded-full border border-[#f3d3c8]">
                          {exam.categoryLabel}
                        </span>
                        <span className="text-xs font-bold text-[#58877b]">{exam.shortName}</span>
                      </div>
                      <h4 className="font-serif text-base sm:text-lg font-bold text-[#26463E]">
                        {exam.name}
                      </h4>
                    </div>

                    <div className="shrink-0 flex items-center gap-2">
                      <ChevronDown
                        className={`w-5 h-5 text-[#58877b] transition-transform duration-200 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  </button>

                  {/* Expanded Content Details */}
                  {isExpanded && (
                    <div className="px-4 sm:px-6 pb-5 pt-1 space-y-4 border-t border-[#F2F6F4] text-xs sm:text-sm text-[#525753] leading-relaxed animate-fadeIn">
                      {/* Purpose */}
                      <div className="bg-[#FDFAF7] p-3.5 rounded-xl border border-[#E3EBE6]">
                        <strong className="text-[#26463E] font-bold block mb-1">
                          🎯 O que este exame avalia:
                        </strong>
                        <p>{exam.purpose}</p>
                      </div>

                      {/* Comparison: Conventional vs Optimal */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200">
                          <span className="text-[11px] font-bold uppercase text-[#7d837f] block mb-1">
                            Faixa Laboratorial Convencional
                          </span>
                          <p className="font-mono text-xs text-[#2D312E]">{exam.conventionalRange}</p>
                        </div>

                        <div className="bg-[#FAEDE7] p-3.5 rounded-xl border border-[#f3d3c8]">
                          <span className="text-[11px] font-bold uppercase text-[#C96E56] block mb-1">
                            ✨ Faixa Funcional Otimizada (40+)
                          </span>
                          <p className="font-mono text-xs text-[#26463E] font-bold">{exam.optimalRange}</p>
                        </div>
                      </div>

                      {/* High vs Low Meanings */}
                      <div className="space-y-2 pt-1">
                        <div className="flex items-start gap-2">
                          <span className="shrink-0 text-red-500 font-bold">▲ Se Alto:</span>
                          <span>{exam.highMeaning}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="shrink-0 text-blue-600 font-bold">▼ Se Baixo:</span>
                          <span>{exam.lowMeaning}</span>
                        </div>
                      </div>

                      {/* Collection Tips & Day */}
                      <div className="bg-[#F2F6F4] p-3 rounded-xl flex items-start gap-2 text-xs text-[#26463E]">
                        <Clock className="w-4 h-4 text-[#58877b] mt-0.5 shrink-0" />
                        <div>
                          <strong>Dica Crucial de Coleta:</strong> {exam.collectionTips}
                        </div>
                      </div>

                      {/* Related Symptoms chips */}
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        <span className="text-[11px] font-bold text-[#7d837f]">Sintomas Associados:</span>
                        {exam.symptomsRelated.map((sym, sIdx) => (
                          <span
                            key={sIdx}
                            className="text-[11px] bg-white border border-[#E3EBE6] px-2 py-0.5 rounded-md text-[#26463E]"
                          >
                            {sym}
                          </span>
                        ))}
                      </div>

                      {/* Bottom Footer for Exam: WhatsApp & Related Article */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#F2F6F4]">
                        <button
                          type="button"
                          onClick={() => handleShareWhatsApp(exam)}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#25D366] hover:text-[#20ba59] cursor-pointer"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>Enviar resumo no WhatsApp</span>
                        </button>

                        {exam.relatedArticleId && onReadArticleById && (
                          <button
                            type="button"
                            onClick={() => {
                              onClose();
                              onReadArticleById(exam.relatedArticleId!);
                            }}
                            className="inline-flex items-center gap-1 text-xs font-bold text-[#26463E] hover:text-[#C96E56] bg-[#F2F6F4] px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                          >
                            <span>Ler Artigo Relacionado</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer with Copy Action */}
        <div className="p-4 sm:p-5 bg-white border-t border-[#E3EBE6] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <p className="text-xs text-[#7d837f] text-center sm:text-left">
            💡 Dica: Leve esta lista na sua consulta para discutir com seu médico especialista.
          </p>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleCopyAllExams}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-[#26463E] text-white text-xs font-semibold px-4 py-2.5 rounded-xl hover:bg-[#1b332d] transition-colors cursor-pointer"
            >
              {copiedList ? <Check className="w-4 h-4 text-[#58877b]" /> : <Copy className="w-4 h-4" />}
              <span>{copiedList ? 'Lista Copiada!' : 'Copiar Lista Completa de Exames'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
