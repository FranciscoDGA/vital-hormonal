import React from 'react';
import { Search, ShieldCheck, BookMarked, Sparkles, Activity, Clock, CheckCircle2 } from 'lucide-react';
import { POPULAR_SYMPTOMS } from '../data/articles';

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSubmitSearch: () => void;
  onSymptomSelect: (symptom: string) => void;
  onOpenAssessment: () => void;
  onOpenGuideModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery,
  onSearchChange,
  onSubmitSearch,
  onSymptomSelect,
  onOpenAssessment,
  onOpenGuideModal,
}) => {
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitSearch();
  };

  return (
    <section id="hero-section" className="px-4 sm:px-8 py-8 sm:py-10 bg-[#E3EBE6] border-b border-[#c2d5cd]/50">
      <div className="max-w-4xl mx-auto">
        {/* Editorial Sub-badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 text-[#26463E] text-[11px] font-bold uppercase tracking-wider mb-3 border border-[#c2d5cd]/60 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-[#C96E56]" />
          <span>Saúde Funcional & Longevidade</span>
        </div>

        {/* Impactful Heading */}
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#26463E] mb-2.5 leading-tight tracking-tight">
          Recupere sua vitalidade após os 35.
        </h1>

        {/* Empathetic Subtitle */}
        <p className="text-base sm:text-lg text-[#2D312E] opacity-80 mb-6 max-w-2xl leading-relaxed">
          Um olhar funcional sobre equilíbrio hormonal, clareza mental e bem-estar feminino.
        </p>

        {/* Central Symptom Search Bar */}
        <div className="relative max-w-lg mb-4">
          <form
            onSubmit={handleFormSubmit}
            className="relative"
          >
            <input
              id="hero-symptom-search"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="O que seu corpo está sentindo hoje?"
              className="w-full px-6 py-3 pr-24 rounded-2xl bg-white border-none shadow-xs focus:ring-2 focus:ring-[#26463E] text-sm text-[#2D312E] placeholder:text-[#7d837f]"
            />
            <button
              id="hero-search-submit"
              type="submit"
              className="absolute right-2 top-2 bg-[#26463E] hover:bg-[#1b332d] text-white px-4 py-1.5 rounded-xl text-xs uppercase tracking-wider font-bold transition-colors cursor-pointer"
            >
              Buscar
            </button>
          </form>
        </div>

        {/* Quick Symptoms Pills */}
        <div className="flex flex-wrap items-center gap-2 text-xs pt-1">
          <span className="text-[#26463E] opacity-70 font-semibold text-[11px] uppercase tracking-wider mr-1 flex items-center gap-1">
            <Activity className="w-3.5 h-3.5 text-[#C96E56]" />
            Sinais frequentes:
          </span>
          {POPULAR_SYMPTOMS.slice(0, 5).map((symptom) => (
            <button
              key={symptom}
              onClick={() => {
                onSymptomSelect(symptom);
                const target = document.getElementById('artigos-section');
                if (target) {
                  target.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-white/90 hover:bg-white text-[#26463E] border border-[#c2d5cd]/80 px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer shadow-2xs hover:shadow-xs"
            >
              {symptom}
            </button>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-8 pt-4 border-t border-[#c2d5cd]/60 flex flex-wrap items-center gap-6 text-xs text-[#26463E]/80">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#26463E]" />
            <span>Medicina Funcional & Integrativa</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#C96E56]" />
            <span>Sem clichês ou promessas irreais</span>
          </div>
          <div className="flex items-center gap-2">
            <BookMarked className="w-4 h-4 text-[#26463E]" />
            <span>Curadoria científica em saúde feminina</span>
          </div>
        </div>
      </div>
    </section>
  );
};
