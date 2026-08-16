import React from 'react';
import { Moon, Brain, Flame, ArrowRight, Sparkles } from 'lucide-react';
import { STARTER_TRACKS } from '../data/articles';
import { QuickTrack, CategoryType, Article } from '../types';

interface StarterTracksProps {
  onSelectTrack: (track: QuickTrack) => void;
  onReadArticleById: (articleId: string) => void;
}

export const StarterTracks: React.FC<StarterTracksProps> = ({
  onSelectTrack,
  onReadArticleById,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Moon':
        return <Moon className="w-6 h-6 text-[#26463E]" />;
      case 'Brain':
        return <Brain className="w-6 h-6 text-[#58877b]" />;
      case 'Flame':
        return <Flame className="w-6 h-6 text-[#C96E56]" />;
      default:
        return <Sparkles className="w-6 h-6 text-[#26463E]" />;
    }
  };

  const getBadgeBg = (scheme: string) => {
    switch (scheme) {
      case 'sage':
        return 'bg-[#26463E]/10 text-[#26463E] border-[#26463E]/20';
      case 'terracotta':
        return 'bg-[#C96E56]/10 text-[#C96E56] border-[#C96E56]/20';
      case 'mint':
        return 'bg-[#58877b]/15 text-[#335b51] border-[#58877b]/30';
      default:
        return 'bg-[#E3EBE6] text-[#26463E] border-[#c2d5cd]';
    }
  };

  return (
    <section id="trilhas-section" className="py-10 sm:py-14 bg-[#F9F7F2] border-y border-[#E3EBE6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-[11px] uppercase tracking-widest font-bold text-[#26463E] block mb-1">
              Por onde começar
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#26463E] tracking-tight">
              Trilhas Rápidas de Leitura
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#525753] opacity-80 max-w-md">
            Selecione o sintoma prioritário da sua rotina para acessar um caminho editorial prático e direto.
          </p>
        </div>

        {/* 3 Interactive Track Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {STARTER_TRACKS.map((track) => (
            <div
              key={track.id}
              id={`track-card-${track.id}`}
              onClick={() => onSelectTrack(track)}
              className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E3EBE6] shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between cursor-pointer group"
            >
              <div>
                {/* Icon and Category Tag */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-[#F9F7F2] flex items-center justify-center border border-[#E3EBE6] text-[#26463E] group-hover:scale-105 transition-transform">
                    {getIcon(track.iconName)}
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${getBadgeBg(track.colorScheme)}`}>
                    Trilha
                  </span>
                </div>

                {/* Title and Description */}
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#26463E] mb-1.5 group-hover:text-[#C96E56] transition-colors">
                  {track.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#525753] opacity-90 leading-relaxed mb-4">
                  {track.subtitle}
                </p>

                {/* Common Symptoms checklist in this track */}
                <div className="space-y-1 mb-5">
                  <span className="text-[10px] font-bold text-[#7d837f] uppercase tracking-wider block">
                    Sinais abordados:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {track.symptoms.map((symptom) => (
                      <span
                        key={symptom}
                        className="text-xs bg-[#F9F7F2] text-[#2D312E] px-2.5 py-0.5 rounded-md border border-[#F0ECE1]"
                      >
                        {symptom}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Action */}
              <div className="pt-3 border-t border-[#F0ECE1] flex items-center justify-between text-xs sm:text-sm font-semibold text-[#26463E] group-hover:text-[#C96E56] transition-colors">
                <span>Acessar Guia da Trilha</span>
                <div className="w-7 h-7 rounded-full bg-[#F9F7F2] flex items-center justify-center group-hover:bg-[#C96E56] group-hover:text-white transition-colors">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
