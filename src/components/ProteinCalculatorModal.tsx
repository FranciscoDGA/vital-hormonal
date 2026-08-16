import React, { useState } from 'react';
import { 
  X, 
  Dumbbell, 
  Sparkles, 
  Check, 
  Share2, 
  Info, 
  ArrowRight, 
  Flame, 
  Utensils, 
  Scale, 
  BookOpen,
  MessageCircle,
  Copy
} from 'lucide-react';

interface ProteinCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReadArticleById?: (id: string) => void;
}

type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'heavy';
type GoalType = 'preserve' | 'muscle_gain' | 'fat_loss' | 'bone_health';

export const ProteinCalculatorModal: React.FC<ProteinCalculatorModalProps> = ({
  isOpen,
  onClose,
  onReadArticleById
}) => {
  const [weightKg, setWeightKg] = useState<number>(65);
  const [activity, setActivity] = useState<ActivityLevel>('moderate');
  const [goal, setGoal] = useState<GoalType>('muscle_gain');
  const [mealsCount, setMealsCount] = useState<3 | 4>(3);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Multiplier logic based on International Society of Sports Nutrition & Menopause Guidelines
  const getMultiplier = (): number => {
    let base = 1.4; // baseline for women 40+ to prevent sarcopenia
    if (activity === 'light') base = 1.5;
    if (activity === 'moderate') base = 1.7;
    if (activity === 'heavy') base = 2.0;

    if (goal === 'fat_loss') base += 0.2; // higher protein protects muscle during caloric deficit
    if (goal === 'muscle_gain') base += 0.1;
    if (goal === 'bone_health') base = Math.max(base, 1.6);

    return Math.min(2.2, Math.max(1.4, base));
  };

  const multiplier = getMultiplier();
  const totalProteinDaily = Math.round(weightKg * multiplier);
  const proteinPerMeal = Math.round(totalProteinDaily / mealsCount);

  // Leucine target threshold for women 40+ (anabolic resistance)
  const leucineTargetPerMeal = '2,7g a 3,2g';

  const handleShareWhatsApp = () => {
    const text = `🥗 *Meu Plano de Proteína & Longevidade 40+ (Vital Hormonal)*%0A%0A` +
      `⚖️ *Peso:* ${weightKg} kg%0A` +
      `🎯 *Meta Diária Total:* ${totalProteinDaily}g de proteína (${multiplier.toFixed(1)}g/kg)%0A` +
      `🍽️ *Meta por Refeição (${mealsCount}x ao dia):* ~${proteinPerMeal}g de proteína líquida%0A` +
      `⚡ *Gatilho de Leucina:* ${leucineTargetPerMeal} por refeição para ativar a síntese muscular e combater a flacidez.%0A%0A` +
      `💡 Calcule o seu gratuitamente no portal Vital Hormonal: ${window.location.origin}`;
    
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleCopySummary = () => {
    const text = `Meu Plano de Proteína 40+: Meta de ${totalProteinDaily}g/dia (${multiplier.toFixed(1)}g/kg). Dividido em ${mealsCount} refeições de ~${proteinPerMeal}g de proteína cada, com gatilho de leucina de ${leucineTargetPerMeal}.`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#1b332d]/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div 
        className="bg-[#FDFAF7] w-full max-w-2xl rounded-3xl shadow-2xl border border-[#d2dfd8] overflow-hidden my-4 sm:my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#26463E] text-white p-5 sm:p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            title="Fechar calculadora"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2 text-[#C96E56] text-xs font-bold uppercase tracking-wider mb-2">
            <Dumbbell className="w-4 h-4" />
            <span>Ferramenta Clínica & Nutricional 40+</span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
            Calculadora de Proteína & Meta de Leucina
          </h3>
          <p className="text-xs sm:text-sm text-[#E3EBE6] mt-1.5 leading-relaxed">
            Descubra a quantidade exata de proteína que seu corpo necessita após os 35-40 anos para vencer a resistência anabólica, proteger a massa magra e acelerar o metabolismo.
          </p>
        </div>

        {/* Body Form */}
        <div className="p-5 sm:p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* 1. Peso corporal */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-[#26463E] uppercase tracking-wider flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-[#58877b]" />
                <span>Seu Peso Corporal Atual:</span>
              </label>
              <span className="text-base font-bold text-[#C96E56] bg-[#FAEDE7] px-3 py-0.5 rounded-full border border-[#f3d3c8]">
                {weightKg} kg
              </span>
            </div>
            <input
              type="range"
              min="40"
              max="130"
              step="1"
              value={weightKg}
              onChange={(e) => setWeightKg(Number(e.target.value))}
              className="w-full h-2.5 bg-[#E3EBE6] rounded-lg appearance-none cursor-pointer accent-[#C96E56]"
            />
            <div className="flex justify-between text-[11px] text-[#7d837f]">
              <span>40 kg</span>
              <span>65 kg</span>
              <span>90 kg</span>
              <span>130 kg</span>
            </div>
          </div>

          {/* 2. Nível de atividade */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#26463E] uppercase tracking-wider block">
              Nível de Atividade Física Atual:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'sedentary', label: 'Sedentária', desc: 'Trabalho sentada, pouca caminhada' },
                { id: 'light', label: 'Leve', desc: 'Caminhadas 1 a 2x/sem, pilates' },
                { id: 'moderate', label: 'Moderada', desc: 'Musculação 3x/sem ou funcional' },
                { id: 'heavy', label: 'Intensa', desc: 'Musculação pesada 4 a 6x/sem' }
              ].map((lvl) => (
                <button
                  key={lvl.id}
                  type="button"
                  onClick={() => setActivity(lvl.id as ActivityLevel)}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                    activity === lvl.id
                      ? 'bg-[#26463E] text-white border-[#26463E] shadow-xs'
                      : 'bg-white text-[#2D312E] border-[#E3EBE6] hover:bg-[#F2F6F4]'
                  }`}
                >
                  <p className="text-xs font-bold">{lvl.label}</p>
                  <p className={`text-[10px] mt-0.5 leading-tight ${activity === lvl.id ? 'text-[#E3EBE6]' : 'text-[#7d837f]'}`}>
                    {lvl.desc}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Objetivo principal */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#26463E] uppercase tracking-wider block">
              Seu Objetivo Principal aos 40+:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { id: 'preserve', label: 'Firmeza & Preservação Muscular', note: 'Evitar flacidez e perda de tônus' },
                { id: 'muscle_gain', label: 'Ganho de Massa Magra / Força', note: 'Reverter sarcopenia e ganhar músculo' },
                { id: 'fat_loss', label: 'Emagrecimento com Proteção Muscular', note: 'Perder gordura abdominal sem queimar músculo' },
                { id: 'bone_health', label: 'Saúde Óssea & Prevenção de Osteopenia', note: 'Matriz de colágeno e densidade óssea' }
              ].map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setGoal(g.id as GoalType)}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                    goal === g.id
                      ? 'bg-[#FAEDE7] text-[#26463E] border-[#C96E56] shadow-xs'
                      : 'bg-white text-[#525753] border-[#E3EBE6] hover:bg-[#F2F6F4]'
                  }`}
                >
                  <p className="text-xs font-bold text-[#26463E]">{g.label}</p>
                  <p className="text-[11px] text-[#7d837f] mt-0.5">{g.note}</p>
                </button>
              ))}
            </div>
          </div>

          {/* 4. Divisão de refeições */}
          <div className="flex items-center justify-between bg-white p-3 rounded-2xl border border-[#E3EBE6]">
            <span className="text-xs font-bold text-[#26463E]">Quantas refeições você faz por dia?</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setMealsCount(3)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                  mealsCount === 3
                    ? 'bg-[#26463E] text-white'
                    : 'bg-[#F2F6F4] text-[#525753] hover:bg-[#E3EBE6]'
                }`}
              >
                3 refeições (Café, Almoço, Jantar)
              </button>
              <button
                type="button"
                onClick={() => setMealsCount(4)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                  mealsCount === 4
                    ? 'bg-[#26463E] text-white'
                    : 'bg-[#F2F6F4] text-[#525753] hover:bg-[#E3EBE6]'
                }`}
              >
                4 refeições (+ Lanche/Ceia)
              </button>
            </div>
          </div>

          {/* Result Card */}
          <div className="bg-linear-to-br from-[#26463E] to-[#1a332d] text-white rounded-3xl p-5 sm:p-6 shadow-md space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/15 pb-4">
              <div>
                <span className="text-[11px] uppercase font-bold text-[#C96E56] tracking-wider">
                  Sua Recomendação Personalizada
                </span>
                <h4 className="font-serif text-3xl font-bold text-white mt-0.5">
                  {totalProteinDaily}g <span className="text-base font-normal text-[#E3EBE6]">de proteína ao dia</span>
                </h4>
              </div>
              <div className="text-left sm:text-right bg-white/10 px-3.5 py-2 rounded-2xl backdrop-blur-xs">
                <span className="text-xs text-[#E3EBE6]">Intensidade calculada:</span>
                <p className="text-sm font-bold text-[#FAEDE7]">{multiplier.toFixed(1)}g por kg de peso</p>
              </div>
            </div>

            {/* Meal Breakdown */}
            <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-xs space-y-2">
              <div className="flex items-center justify-between text-xs sm:text-sm font-bold">
                <span className="flex items-center gap-1.5 text-[#FAEDE7]">
                  <Utensils className="w-4 h-4 text-[#C96E56]" />
                  Meta por Refeição ({mealsCount}x ao dia):
                </span>
                <span className="text-lg font-bold text-white">~{proteinPerMeal}g líquidas</span>
              </div>
              <p className="text-[11px] text-[#E3EBE6] leading-relaxed">
                ⚡ <strong>Por que essa meta?</strong> Após os 40 anos, os músculos sofrem de <em>resistência anabólica</em>. Para ativar a síntese de massa magra (mTOR), cada refeição precisa atingir o limiar de <strong>{leucineTargetPerMeal} de Leucina</strong> (equivalente a ~30g de proteína de alto valor biológico).
              </p>
            </div>

            {/* Food Portions Equivalents */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#FAEDE7] uppercase tracking-wider block">
                Exemplos Práticos para Bater ~30g de Proteína:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-[#E3EBE6]">
                <div className="bg-black/20 p-2.5 rounded-xl">
                  🍗 <strong>110g de Peito de Frango</strong> cozido/grelhado (~34g prot)
                </div>
                <div className="bg-black/20 p-2.5 rounded-xl">
                  🥚 <strong>3 Ovos + 2 Claras</strong> caipiras (~24g prot)
                </div>
                <div className="bg-black/20 p-2.5 rounded-xl">
                  🥤 <strong>1 Scoop (30g) de Whey</strong> Isolado (~25g prot)
                </div>
                <div className="bg-black/20 p-2.5 rounded-xl">
                  🐟 <strong>130g de Filé de Peixe / Salmão</strong> (~30g prot)
                </div>
                <div className="bg-black/20 p-2.5 rounded-xl">
                  🥣 <strong>1 Pote de Iogurte Grego + 1 colher semente de abóbora</strong> (~18g prot)
                </div>
                <div className="bg-black/20 p-2.5 rounded-xl">
                  🌱 <strong>160g de Tofu Firme</strong> grelhado (~22g prot)
                </div>
              </div>
            </div>

            {/* Actions: Copy & WhatsApp */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <button
                onClick={handleShareWhatsApp}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Salvar no WhatsApp</span>
              </button>

              <button
                onClick={handleCopySummary}
                className="inline-flex items-center justify-center gap-1.5 bg-white/15 hover:bg-white/25 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-[#58877b]" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copiado!' : 'Copiar Resumo'}</span>
              </button>
            </div>
          </div>

          {/* Deep-dive Related Article Box */}
          {onReadArticleById && (
            <div className="bg-white rounded-2xl p-4 border border-[#E3EBE6] flex items-center justify-between gap-4">
              <div className="space-y-0.5">
                <span className="text-[11px] font-bold text-[#C96E56] uppercase">Artigo Científico Recomendado</span>
                <h5 className="text-xs sm:text-sm font-bold text-[#26463E]">
                  Massa Magra aos 40+: Por Que o Músculo é o Órgão da Longevidade
                </h5>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onReadArticleById('art-24');
                }}
                className="shrink-0 inline-flex items-center gap-1 text-xs font-bold text-[#26463E] hover:text-[#C96E56] bg-[#F2F6F4] px-3 py-2 rounded-xl transition-colors cursor-pointer"
              >
                <span>Ler Artigo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
