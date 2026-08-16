import React from 'react';
import { 
  Dumbbell, 
  FileText, 
  Stethoscope, 
  Pill, 
  Activity, 
  ArrowRight, 
  Sparkles,
  Calculator,
  Search,
  CheckSquare
} from 'lucide-react';

interface InteractiveToolsSectionProps {
  onOpenProteinCalculator: () => void;
  onOpenLabExamsGlossary: () => void;
  onOpenDoctorChecklist: () => void;
  onOpenSupplementGuide: () => void;
  onOpenAssessment: () => void;
}

export const InteractiveToolsSection: React.FC<InteractiveToolsSectionProps> = ({
  onOpenProteinCalculator,
  onOpenLabExamsGlossary,
  onOpenDoctorChecklist,
  onOpenSupplementGuide,
  onOpenAssessment
}) => {
  const tools = [
    {
      id: 'calc-proteina',
      title: 'Calculadora de Proteína 40+',
      description: 'Calcule sua meta diária de proteína e leucina por refeição para vencer a sarcopenia e acelerar o metabolismo.',
      icon: Dumbbell,
      badge: 'Nutrição & Músculo',
      color: 'from-[#C96E56]/15 to-[#FAEDE7]',
      textColor: 'text-[#C96E56]',
      borderColor: 'border-[#f3d3c8]',
      onClick: onOpenProteinCalculator
    },
    {
      id: 'glossario-exames',
      title: 'Glossário A-Z de Exames',
      description: 'Consulte valores de referência vs. faixas funcionais ideais de FSH, Estradiol, Ferritina, Insulina e Tireoide.',
      icon: FileText,
      badge: 'Dicionário Clínico',
      color: 'from-[#58877b]/15 to-[#F2F6F4]',
      textColor: 'text-[#26463E]',
      borderColor: 'border-[#d2dfd8]',
      onClick: onOpenLabExamsGlossary
    },
    {
      id: 'checklist-consulta',
      title: 'Checklist para a Consulta',
      description: 'Marque seus sintomas e gere uma folha estruturada com perguntas e exames sugeridos para levar ao médico.',
      icon: Stethoscope,
      badge: 'Gerador Imprimível',
      color: 'from-[#26463E]/10 to-[#F2F6F4]',
      textColor: 'text-[#26463E]',
      borderColor: 'border-[#d2dfd8]',
      onClick: onOpenDoctorChecklist
    },
    {
      id: 'guia-suplementos',
      title: 'Matriz de Suplementos & Magnésio',
      description: 'Compare Treonato, Glicinato, Dimalato, Ômega 7 e D-Manose com dosagens e melhor horário do dia.',
      icon: Pill,
      badge: 'Guia de Horários',
      color: 'from-[#C96E56]/10 to-[#FDFAF7]',
      textColor: 'text-[#C96E56]',
      borderColor: 'border-[#f3d3c8]',
      onClick: onOpenSupplementGuide
    }
  ];

  return (
    <section className="py-8 sm:py-12 px-4 sm:px-6 max-w-7xl mx-auto w-full">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E3EBE6] shadow-sm">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAEDE7] text-[#C96E56] text-xs font-bold uppercase tracking-wider mb-2 border border-[#f3d3c8]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ferramentas & Calculadoras Clínicas</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#26463E]">
              Recursos Interativos para Sua Longevidade
            </h2>
            <p className="text-xs sm:text-sm text-[#525753] mt-1 max-w-xl">
              Ferramentas práticas baseadas em diretrizes médicas internacionais para você calcular suas metas, entender seus exames e planejar suas consultas.
            </p>
          </div>

          <button
            onClick={onOpenAssessment}
            className="inline-flex items-center justify-center gap-2 bg-[#26463E] hover:bg-[#1b332d] text-white text-xs sm:text-sm font-semibold px-5 py-3 rounded-xl transition-all cursor-pointer shadow-xs shrink-0"
          >
            <Activity className="w-4 h-4 text-[#C96E56]" />
            <span>Fazer Teste de Sintomas 35+</span>
          </button>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.id}
                onClick={tool.onClick}
                className="bg-[#FDFAF7] rounded-2xl p-5 border border-[#E3EBE6] hover:border-[#58877b] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-white border border-[#E3EBE6] flex items-center justify-center text-[#26463E] group-hover:scale-105 transition-transform shadow-xs">
                      <Icon className="w-5 h-5 text-[#58877b]" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#C96E56] bg-white px-2 py-0.5 rounded-full border border-[#f3d3c8]">
                      {tool.badge}
                    </span>
                  </div>

                  <h3 className="font-serif text-base font-bold text-[#26463E] group-hover:text-[#C96E56] transition-colors mb-2">
                    {tool.title}
                  </h3>

                  <p className="text-xs text-[#525753] leading-relaxed mb-4">
                    {tool.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E3EBE6]/60 flex items-center justify-between text-xs font-bold text-[#26463E] group-hover:text-[#C96E56]">
                  <span>Acessar Ferramenta</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
