import React, { useState } from 'react';
import { 
  X, 
  Stethoscope, 
  Check, 
  Printer, 
  MessageCircle, 
  Copy, 
  Sparkles, 
  FileText, 
  AlertCircle, 
  ChevronRight, 
  ArrowLeft,
  Calendar,
  Heart,
  Brain,
  Moon,
  Activity
} from 'lucide-react';

interface DoctorVisitChecklistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SymptomOption {
  id: string;
  label: string;
  category: 'hormonal' | 'sono_humor' | 'metabolismo' | 'fisico';
  suggestedExams: string[];
}

const SYMPTOM_CHECKLIST: SymptomOption[] = [
  { id: 'fogachos', label: 'Ondas de calor (fogachos) e suores noturnos', category: 'hormonal', suggestedExams: ['FSH', 'Estradiol Sérico (E2)'] },
  { id: 'insonia_3am', label: 'Acordar às 3h da manhã com mente agitada ou coração acelerado', category: 'sono_humor', suggestedExams: ['Progesterona Sérica', 'Cortisol Salivar', 'Insulina de Jejum'] },
  { id: 'queda_cabelo', label: 'Queda de cabelo difusa ou afinamento no topo da cabeça', category: 'fisico', suggestedExams: ['Ferritina Sérica', 'TSH/T4L/T3L', 'Testosterona Livre', 'DHEA-S'] },
  { id: 'palpitacoes', label: 'Palpitações no repouso ou taquicardia sem esforço', category: 'hormonal', suggestedExams: ['Magnésio Sérico/Eritrocitário', 'TSH', 'Eletrocardiograma'] },
  { id: 'gordura_barriga', label: 'Ganho repentino de gordura abdominal sem mudar a dieta', category: 'metabolismo', suggestedExams: ['Insulina de Jejum + HOMA-IR', 'Hemoglobina Glicada', 'Perfil Lipídico/ApoB'] },
  { id: 'dores_corpo', label: 'Dores nas articulações (dedos, joelhos, ombros) e rigidez matinal', category: 'fisico', suggestedExams: ['PCR Ultrassensível', 'Vitamina D (25-OH)', 'Ácido Úrico'] },
  { id: 'nevoa_mental', label: 'Lapsos de memória, dificuldade de concentração e esquecimento de palavras', category: 'sono_humor', suggestedExams: ['Vitamina B12', 'Ferritina', 'TSH/T3L'] },
  { id: 'ressecamento_intimo', label: 'Ressecamento vaginal, desconforto na relação ou cistite frequente', category: 'hormonal', suggestedExams: ['Estradiol Sérico', 'Urina Tipo 1 + Urocultura'] },
  { id: 'tontura_cabeca_oca', label: 'Sensação de cabeça oca, tontura leve ao levantar ou desequilíbrio', category: 'fisico', suggestedExams: ['Hemograma Completo', 'Glicemia de Jejum', 'Pressão Arterial MAPA'] },
  { id: 'irritabilidade_choro', label: 'Paciência curta, irritabilidade desproporcional ou choro fácil', category: 'sono_humor', suggestedExams: ['Progesterona Sérica (21º dia)', 'Estradiol (E2)'] }
];

export const DoctorVisitChecklistModal: React.FC<DoctorVisitChecklistModalProps> = ({
  isOpen,
  onClose
}) => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([
    'insonia_3am',
    'fogachos'
  ]);
  const [ageGroup, setAgeGroup] = useState<string>('41-47');
  const [periodStatus, setPeriodStatus] = useState<string>('irregular');
  const [step, setStep] = useState<'selection' | 'generated'>('selection');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const toggleSymptom = (id: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  // Compile unique suggested exams
  const selectedSymptomObjects = SYMPTOM_CHECKLIST.filter((s) =>
    selectedSymptoms.includes(s.id)
  );
  
  const recommendedExams = Array.from(
    new Set(selectedSymptomObjects.flatMap((s) => s.suggestedExams))
  );

  const getPeriodStatusLabel = (status: string) => {
    switch (status) {
      case 'regular': return 'Ciclos regulares (25 a 32 dias)';
      case 'irregular': return 'Ciclos irregulares (encurtados ou atrasando)';
      case 'absent_less_12m': return 'Menstruação ausente há menos de 12 meses';
      case 'absent_more_12m': return 'Menstruação ausente há mais de 12 meses (Menopausa confirmada)';
      default: return 'Uso de DIU ou contraceptivo hormonal';
    }
  };

  const generateReportText = () => {
    const symptomsList = selectedSymptomObjects.map((s) => `• ${s.label}`).join('\n');
    const examsList = recommendedExams.map((e) => `[ ] ${e}`).join('\n');

    return `📋 GUIA DE APOIO PARA CONSULTA MÉDICA (VITAL HORMONAL)\n` +
      `--------------------------------------------------\n` +
      `👤 Perfil da Paciente:\n` +
      `- Faixa etária: ${ageGroup} anos\n` +
      `- Padrão menstrual: ${getPeriodStatusLabel(periodStatus)}\n\n` +
      `⚠️ Sintomas Relatados (${selectedSymptoms.length}):\n${symptomsList}\n\n` +
      `🔬 Painel de Exames Prioritários para Investigação:\n${examsList}\n\n` +
      `❓ Perguntas-Chave para Fazer ao Especialista:\n` +
      `1. Meus sintomas atuais podem ser decorrentes da oscilação de estradiol e progesterona na perimenopausa?\n` +
      `2. Quais são as contraindicações no meu caso para uma Terapia de Reposição Hormonal (TRH) transdérmica bioidêntica?\n` +
      `3. Podemos avaliar a reposição de progesterona micronizada natural para restaurar a qualidade do meu sono?\n` +
      `4. Como está minha reserva de ferritina, vitamina D e perfil tireoidiano para além dos valores mínimos de referência?\n` +
      `5. Qual é a estratégia preventiva recomendada para minha densidade óssea e risco cardiovascular nesta década?\n\n` +
      `Gerado em: ${new Date().toLocaleDateString('pt-BR')} via Portal Vital Hormonal`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateReportText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(generateReportText());
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#1b332d]/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div 
        className="bg-[#FDFAF7] w-full max-w-2xl rounded-3xl shadow-2xl border border-[#d2dfd8] overflow-hidden my-4 sm:my-8 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#26463E] text-white p-5 sm:p-6 relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            title="Fechar checklist"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-[#C96E56] text-xs font-bold uppercase tracking-wider mb-2">
            <Stethoscope className="w-4 h-4" />
            <span>Ferramenta de Apoio ao Diálogo Médico</span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
            Checklist para Sua Próxima Consulta Médica
          </h3>
          <p className="text-xs sm:text-sm text-[#E3EBE6] mt-1.5 leading-relaxed">
            Nunca mais esqueça de falar um sintoma ou de pedir um exame essencial. Gere uma folha personalizada em segundos para levar na consulta.
          </p>
        </div>

        {/* Content View Based on Step */}
        {step === 'selection' ? (
          <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
            {/* 1. Idade e Menstruação */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#26463E] uppercase tracking-wider block">
                  Sua Faixa Etária:
                </label>
                <select
                  value={ageGroup}
                  onChange={(e) => setAgeGroup(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-white border border-[#E3EBE6] text-xs sm:text-sm text-[#2D312E] font-medium focus:ring-2 focus:ring-[#C96E56] outline-hidden"
                >
                  <option value="35-40">35 a 40 anos (Início sutil)</option>
                  <option value="41-47">41 a 47 anos (Pico da perimenopausa)</option>
                  <option value="48-53">48 a 53 anos (Transição final / menopausa)</option>
                  <option value="54+">54 anos ou mais (Pós-menopausa)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#26463E] uppercase tracking-wider block">
                  Padrão Menstrual Atual:
                </label>
                <select
                  value={periodStatus}
                  onChange={(e) => setPeriodStatus(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-white border border-[#E3EBE6] text-xs sm:text-sm text-[#2D312E] font-medium focus:ring-2 focus:ring-[#C96E56] outline-hidden"
                >
                  <option value="regular">Regular (ciclos a cada 25-32 dias)</option>
                  <option value="irregular">Irregular (ciclos encurtando ou falhando)</option>
                  <option value="absent_less_12m">Ausente há menos de 12 meses</option>
                  <option value="absent_more_12m">Ausente há mais de 1 ano (Pós-menopausa)</option>
                  <option value="diu_or_pill">Uso DIU hormonal ou anticoncepcional</option>
                </select>
              </div>
            </div>

            {/* 2. Seleção de Sintomas */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-[#26463E] uppercase tracking-wider block">
                  Marque os Sintomas que Você Está Sentindo ({selectedSymptoms.length} selecionados):
                </label>
              </div>

              <div className="space-y-2">
                {SYMPTOM_CHECKLIST.map((sym) => {
                  const isChecked = selectedSymptoms.includes(sym.id);
                  return (
                    <div
                      key={sym.id}
                      onClick={() => toggleSymptom(sym.id)}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isChecked
                          ? 'bg-[#FAEDE7] border-[#C96E56] shadow-xs'
                          : 'bg-white border-[#E3EBE6] hover:bg-[#F2F6F4]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-lg flex items-center justify-center transition-colors ${
                            isChecked ? 'bg-[#C96E56] text-white' : 'border-2 border-[#E3EBE6] bg-white'
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5" />}
                        </div>
                        <span className="text-xs sm:text-sm font-semibold text-[#26463E]">
                          {sym.label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          /* Step 2: Generated Document View */
          <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 bg-white print:p-0">
            <div className="bg-[#FDFAF7] p-5 rounded-2xl border-2 border-[#58877b]/30 space-y-4">
              <div className="flex items-center justify-between border-b border-[#E3EBE6] pb-3">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#C96E56]" />
                  <h4 className="font-serif text-lg font-bold text-[#26463E]">
                    Resumo Estruturado para o Médico
                  </h4>
                </div>
                <span className="text-[11px] text-[#7d837f]">Mulher {ageGroup} anos</span>
              </div>

              {/* Patient details */}
              <div className="text-xs text-[#525753] space-y-1 bg-white p-3 rounded-xl border border-[#E3EBE6]">
                <p><strong>Padrão Menstrual:</strong> {getPeriodStatusLabel(periodStatus)}</p>
                <p><strong>Total de Sintomas Mapeados:</strong> {selectedSymptoms.length}</p>
              </div>

              {/* Selected symptoms */}
              <div className="space-y-1.5">
                <span className="text-xs font-bold uppercase text-[#26463E] block">
                  Sintomas Principais Relatados:
                </span>
                <ul className="space-y-1 text-xs text-[#525753]">
                  {selectedSymptomObjects.map((s) => (
                    <li key={s.id} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C96E56] mt-1.5 shrink-0" />
                      <span>{s.label}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recommended Exams */}
              <div className="space-y-2 pt-2 border-t border-[#E3EBE6]">
                <span className="text-xs font-bold uppercase text-[#26463E] flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#58877b]" />
                  Painel de Exames Sugeridos para Solicitação:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {recommendedExams.map((exam, idx) => (
                    <div key={idx} className="bg-white p-2.5 rounded-xl border border-[#E3EBE6] flex items-center gap-2 text-[#26463E] font-medium">
                      <span className="w-3.5 h-3.5 rounded border border-[#58877b] flex items-center justify-center shrink-0" />
                      <span>{exam}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 5 Doctor Questions */}
              <div className="space-y-2 pt-2 border-t border-[#E3EBE6]">
                <span className="text-xs font-bold uppercase text-[#26463E] block">
                  5 Perguntas Importantes para Fazer na Consulta:
                </span>
                <ol className="space-y-2 text-xs text-[#525753] list-decimal list-inside leading-relaxed">
                  <li>
                    <strong>Terapia Hormonal Bioidêntica:</strong> "Com base no meu histórico e exames, existe contraindicação para o uso de estradiol transdérmico (gel) e progesterona micronizada?"
                  </li>
                  <li>
                    <strong>Qualidade do Sono:</strong> "O meu padrão de acordar às 3h com ansiedade pode estar ligado à queda de progesterona ou cortisol desregulado?"
                  </li>
                  <li>
                    <strong>Proteção Óssea:</strong> "Podemos solicitar uma Densitometria Óssea basal para acompanhar minha massa óssea durante a transição?"
                  </li>
                  <li>
                    <strong>Reserva de Ferro & Cabelo:</strong> "Minha ferritina está acima de 70 ng/mL ou apenas dentro do limite mínimo do laboratório?"
                  </li>
                  <li>
                    <strong>Metabolismo & Insulina:</strong> "Podemos calcular meu HOMA-IR com insulina de jejum para investigar a dificuldade em perder gordura abdominal?"
                  </li>
                </ol>
              </div>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-white border-t border-[#E3EBE6] flex flex-wrap items-center justify-between gap-3 shrink-0">
          {step === 'selection' ? (
            <>
              <p className="text-xs text-[#7d837f]">
                Selecione ao menos 1 sintoma para gerar seu relatório.
              </p>
              <button
                onClick={() => setStep('generated')}
                disabled={selectedSymptoms.length === 0}
                className="inline-flex items-center gap-2 bg-[#26463E] hover:bg-[#1b332d] disabled:opacity-50 text-white text-xs sm:text-sm font-semibold px-6 py-2.5 rounded-xl transition-all cursor-pointer shadow-xs"
              >
                <span>Gerar Guia da Consulta</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setStep('selection')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#525753] hover:text-[#26463E] cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Alterar Sintomas</span>
              </button>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={handleShareWhatsApp}
                  className="inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Salvar no WhatsApp</span>
                </button>

                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 bg-[#F2F6F4] hover:bg-[#E3EBE6] text-[#26463E] text-xs font-semibold px-3 py-2 rounded-xl transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-[#58877b]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copiado!' : 'Copiar'}</span>
                </button>

                <button
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1.5 bg-[#26463E] hover:bg-[#1b332d] text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors cursor-pointer shadow-xs"
                >
                  <Printer className="w-4 h-4" />
                  <span>Imprimir</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
