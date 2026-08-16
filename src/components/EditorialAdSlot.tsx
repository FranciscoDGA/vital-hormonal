import React, { useEffect } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Dumbbell, 
  FileText, 
  Stethoscope, 
  Pill, 
  FolderDown, 
  Activity,
  ShieldCheck
} from 'lucide-react';
import { MONETIZATION_CONFIG } from '../config/monetization';

interface EditorialAdSlotProps {
  slotType: 'inArticleTop' | 'inArticleMiddle' | 'inArticleBottom' | 'toolsFooter';
  contextCategory?: string;
  onOpenMaterials?: () => void;
  onOpenProteinCalculator?: () => void;
  onOpenLabExamsGlossary?: () => void;
  onOpenDoctorChecklist?: () => void;
  onOpenSupplementGuide?: () => void;
  onOpenAssessment?: () => void;
}

export const EditorialAdSlot: React.FC<EditorialAdSlotProps> = ({
  slotType,
  contextCategory,
  onOpenMaterials,
  onOpenProteinCalculator,
  onOpenLabExamsGlossary,
  onOpenDoctorChecklist,
  onOpenSupplementGuide,
  onOpenAssessment,
}) => {
  const isAdsenseActive = 
    MONETIZATION_CONFIG.googleAdsense.enabled && 
    Boolean(MONETIZATION_CONFIG.googleAdsense.publisherId);

  useEffect(() => {
    if (isAdsenseActive) {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error('AdSense push error', e);
      }
    }
  }, [isAdsenseActive]);

  // Se o Google AdSense estiver ativo com ID real, renderiza o bloco do Google
  if (isAdsenseActive) {
    const slotId = MONETIZATION_CONFIG.googleAdsense.slots[slotType];
    return (
      <div className="my-8 w-full overflow-hidden flex flex-col items-center justify-center p-2 bg-[#f8f9fa] border border-[#e9ecef] rounded-2xl">
        <span className="text-[10px] uppercase font-bold tracking-widest text-[#a0aab2] mb-1.5">
          Publicidade
        </span>
        <ins
          className="adsbygoogle"
          style={{ display: 'block', minHeight: '100px', width: '100%' }}
          data-ad-client={MONETIZATION_CONFIG.googleAdsense.publisherId}
          data-ad-slot={slotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    );
  }

  // Enquanto o AdSense não estiver ativo: exibe Promoções Nativas de Alta Conversão
  if (slotType === 'inArticleTop') {
    return (
      <div className="my-6 p-4 sm:p-5 rounded-2xl bg-linear-to-r from-[#FAEDE7] via-[#FFF8F5] to-[#FAEDE7] border border-[#f3d3c8] shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-white border border-[#f3d3c8] flex items-center justify-center text-[#C96E56] shrink-0 shadow-2xs">
            <FolderDown className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C96E56] bg-white px-2 py-0.5 rounded-full border border-[#f3d3c8]">
                Material Gratuito
              </span>
              <span className="text-xs text-[#7d837f] hidden sm:inline">• PDF A4 Imprimível</span>
            </div>
            <h5 className="font-serif text-sm sm:text-base font-bold text-[#26463E] mt-1">
              Guia Prático dos Primeiros Passos na Perimenopausa (PDF)
            </h5>
            <p className="text-xs text-[#525753] line-clamp-1">
              Checklist de sintomas diários, alimentos essenciais e perguntas para a consulta.
            </p>
          </div>
        </div>

        {onOpenMaterials && (
          <button
            type="button"
            onClick={onOpenMaterials}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#C96E56] hover:bg-[#b05a43] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-2xs shrink-0 cursor-pointer"
          >
            <span>Acessar Grátis</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    );
  }

  if (slotType === 'inArticleMiddle') {
    return (
      <div className="my-8 p-5 sm:p-6 rounded-3xl bg-[#FDFAF7] border border-[#d2dfd8] shadow-2xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#26463E] bg-[#E3EBE6] px-2.5 py-1 rounded-full">
              <Sparkles className="w-3 h-3 text-[#58877b]" />
              <span>Ferramenta Clínica Interativa</span>
            </div>
            <h4 className="font-serif text-base sm:text-lg font-bold text-[#26463E]">
              Descubra sua necessidade real de Proteína e Leucina
            </h4>
            <p className="text-xs text-[#525753] max-w-xl">
              Mulheres 40+ necessitam de um aporte específico por refeição para manter a densidade muscular e combater a resistência anabólica.
            </p>
          </div>

          {onOpenProteinCalculator && (
            <button
              type="button"
              onClick={onOpenProteinCalculator}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#26463E] hover:bg-[#1b332d] text-white text-xs font-bold px-5 py-3 rounded-xl transition-all shadow-2xs shrink-0 cursor-pointer"
            >
              <Dumbbell className="w-4 h-4 text-[#C96E56]" />
              <span>Calcular Minha Meta</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  // inArticleBottom or toolsFooter
  return (
    <div className="my-8 p-6 rounded-3xl bg-linear-to-br from-[#26463E] to-[#1a332d] text-white shadow-md relative overflow-hidden">
      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#FAEDE7] bg-white/10 px-3 py-1 rounded-full backdrop-blur-xs mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C96E56]" />
            <span>Apoio à Consulta Médica</span>
          </div>
          <h4 className="font-serif text-lg sm:text-xl font-bold text-white mb-1">
            Vai ao médico em breve? Leve uma folha estruturada
          </h4>
          <p className="text-xs text-[#d2dfd8] max-w-xl leading-relaxed">
            Selecione seus sintomas e gere instantaneamente um roteiro com os principais exames a solicitar e perguntas estratégicas para discutir.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5 w-full sm:w-auto">
          {onOpenDoctorChecklist && (
            <button
              type="button"
              onClick={onOpenDoctorChecklist}
              className="inline-flex items-center justify-center gap-2 bg-[#C96E56] hover:bg-[#b05a43] text-white text-xs font-bold px-4 py-3 rounded-xl transition-all shadow-2xs cursor-pointer flex-1 sm:flex-initial"
            >
              <Stethoscope className="w-4 h-4" />
              <span>Gerar Meu Checklist</span>
            </button>
          )}
          {onOpenLabExamsGlossary && (
            <button
              type="button"
              onClick={onOpenLabExamsGlossary}
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-4 py-3 rounded-xl transition-all border border-white/20 cursor-pointer flex-1 sm:flex-initial"
            >
              <FileText className="w-4 h-4 text-[#d2dfd8]" />
              <span>Ver Glossário de Exames</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
