import React, { useState, useMemo } from 'react';
import { 
  X, 
  Search, 
  Pill, 
  Sun, 
  Moon, 
  Clock, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  AlertTriangle,
  MessageCircle,
  Copy,
  Check,
  Filter
} from 'lucide-react';
import { SUPPLEMENTS_DATA, SupplementItem } from '../data/supplementsData';

interface SupplementGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReadArticleById?: (id: string) => void;
}

export const SupplementGuideModal: React.FC<SupplementGuideModalProps> = ({
  isOpen,
  onClose,
  onReadArticleById
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const categories = [
    { id: 'todos', label: 'Todos os Suplementos' },
    { id: 'magnesio', label: 'Tipos de Magnésio' },
    { id: 'fitoterapicos', label: 'Fitoterápicos & Ciclo' },
    { id: 'adaptogenos', label: 'Adaptógenos & Cortisol' },
    { id: 'mucosas_saude_intima', label: 'Mucosas & Intimidade' },
    { id: 'antioxidantes', label: 'Mitocôndrias & Longevidade' }
  ];

  const filteredSupplements = useMemo(() => {
    return SUPPLEMENTS_DATA.filter((item) => {
      const matchCat = selectedCategory === 'todos' || item.category === selectedCategory;
      const matchSearch =
        !searchTerm.trim() ||
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.primaryBenefit.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.targetSymptoms.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchTerm]);

  const handleShareWhatsApp = (item: SupplementItem) => {
    const text = `🌿 *Guia de Suplementação: ${item.name}*%0A%0A` +
      `✨ *Benefício Principal:* ${item.primaryBenefit}%0A` +
      `⏰ *Melhor Horário:* ${item.bestTiming} (${item.timingExplanation})%0A` +
      `💊 *Dosagem Usual:* ${item.suggestedDosage}%0A` +
      `⚠️ *Cuidados:* ${item.cautionsOrContraindications}%0A%0A` +
      `Consulte a matriz completa em: ${window.location.origin}`;
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleCopy = (item: SupplementItem) => {
    const text = `${item.name}: ${item.primaryBenefit}. Dosagem: ${item.suggestedDosage}. Horário ideal: ${item.bestTiming}.`;
    navigator.clipboard.writeText(text);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const renderTimingBadge = (timing: string) => {
    if (timing.includes('Noite')) {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-[#1b332d] text-[#FAEDE7] px-2.5 py-1 rounded-lg">
          <Moon className="w-3 h-3 text-[#C96E56]" />
          <span>{timing}</span>
        </span>
      );
    }
    if (timing.includes('Manhã')) {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-[#FFF7ED] text-[#C2410C] border border-[#FED7AA] px-2.5 py-1 rounded-lg">
          <Sun className="w-3 h-3 text-[#EA580C]" />
          <span>{timing}</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-[#F2F6F4] text-[#26463E] px-2.5 py-1 rounded-lg">
        <Clock className="w-3 h-3 text-[#58877b]" />
        <span>{timing}</span>
      </span>
    );
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
            title="Fechar guia de suplementos"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-[#C96E56] text-xs font-bold uppercase tracking-wider mb-2">
            <Pill className="w-4 h-4" />
            <span>Matriz Comparativa & Segurança Nutracêutica</span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
            Guia de Suplementos & Tipos de Magnésio 40+
          </h3>
          <p className="text-xs sm:text-sm text-[#E3EBE6] mt-1.5 leading-relaxed">
            Descubra qual a melhor forma para o seu sintoma específico, o melhor horário do dia para absorção máxima e as dosagens usuais comprovadas na literatura.
          </p>

          {/* Search bar */}
          <div className="relative mt-4">
            <Search className="w-4 h-4 text-[#7d837f] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por suplemento ou benefício (ex: sono, treonato, coração, cistite)..."
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

        {/* Items Grid */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4">
          {filteredSupplements.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-5 border border-[#E3EBE6] shadow-xs hover:border-[#58877b] transition-all space-y-3.5"
            >
              {/* Card Top */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F2F6F4] pb-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#C96E56] bg-[#FAEDE7] px-2.5 py-0.5 rounded-full border border-[#f3d3c8]">
                    {item.categoryLabel}
                  </span>
                  <h4 className="font-serif text-lg font-bold text-[#26463E] mt-1">
                    {item.name}
                  </h4>
                </div>

                <div className="shrink-0">
                  {renderTimingBadge(item.bestTiming)}
                </div>
              </div>

              {/* Primary Benefit Banner */}
              <div className="bg-[#FDFAF7] p-3 rounded-xl border border-[#E3EBE6]">
                <strong className="text-xs text-[#26463E] font-bold block mb-0.5">
                  ✨ Indicação Principal:
                </strong>
                <p className="text-xs sm:text-sm font-semibold text-[#C96E56]">
                  {item.primaryBenefit}
                </p>
                <p className="text-xs text-[#525753] mt-1 leading-relaxed">
                  {item.mechanism}
                </p>
              </div>

              {/* Dosage & Timing details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-[#F2F6F4] p-3 rounded-xl">
                  <span className="text-[11px] font-bold text-[#26463E] uppercase block mb-1">
                    💊 Dosagem Usual de Segurança:
                  </span>
                  <p className="font-medium text-[#525753]">{item.suggestedDosage}</p>
                </div>

                <div className="bg-[#F2F6F4] p-3 rounded-xl">
                  <span className="text-[11px] font-bold text-[#26463E] uppercase block mb-1">
                    ⏰ Por Que Tomar Nesse Horário:
                  </span>
                  <p className="font-medium text-[#525753]">{item.timingExplanation}</p>
                </div>
              </div>

              {/* Symptoms chips */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] font-bold text-[#7d837f]">Alvos Típicos:</span>
                {item.targetSymptoms.map((sym, sIdx) => (
                  <span
                    key={sIdx}
                    className="text-[11px] bg-white border border-[#E3EBE6] px-2 py-0.5 rounded-md text-[#26463E]"
                  >
                    {sym}
                  </span>
                ))}
              </div>

              {/* Card Footer: WhatsApp & Related Article */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#F2F6F4]">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleShareWhatsApp(item)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#25D366] hover:text-[#20ba59] cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </button>

                  <button
                    onClick={() => handleCopy(item)}
                    className="inline-flex items-center gap-1 text-xs text-[#7d837f] hover:text-[#26463E] cursor-pointer"
                  >
                    {copiedId === item.id ? <Check className="w-3 h-3 text-[#58877b]" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedId === item.id ? 'Copiado!' : 'Copiar'}</span>
                  </button>
                </div>

                {item.relatedArticleId && onReadArticleById && (
                  <button
                    onClick={() => {
                      onClose();
                      onReadArticleById(item.relatedArticleId!);
                    }}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#26463E] hover:text-[#C96E56] bg-[#F2F6F4] px-3 py-1 rounded-lg transition-colors cursor-pointer"
                  >
                    <span>Ler Artigo Completo</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-[#E3EBE6] text-center text-xs text-[#7d837f] shrink-0">
          ⚠️ <em>Importante: Suplementos não substituem orientação médica ou nutricional individualizada.</em>
        </div>
      </div>
    </div>
  );
};
