import React from 'react';
import { Clock, ArrowUpRight, Sparkles, BookOpen, Bookmark } from 'lucide-react';
import { Article } from '../types';

interface FeaturedPostProps {
  article: Article;
  onReadArticle: (article: Article) => void;
  isSaved?: boolean;
  onToggleSave?: (articleId: string) => void;
}

export const FeaturedPost: React.FC<FeaturedPostProps> = ({
  article,
  onReadArticle,
  isSaved = false,
  onToggleSave,
}) => {
  return (
    <section id="featured-post-section" className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section subtle title */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-[11px] uppercase tracking-widest font-bold text-[#C96E56]">
              Destaque da Semana
            </span>
          </div>
          <span className="text-xs text-[#525753] opacity-80 hidden sm:inline">
            Curadoria científica atualizada
          </span>
        </div>

        {/* Large Editorial Card */}
        <article
          id={`featured-article-${article.id}`}
          className="bg-white rounded-3xl border border-[#E3EBE6] shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Image Container (5 cols on lg) */}
            <div className="lg:col-span-5 relative overflow-hidden bg-[#E3EBE6] min-h-[260px] sm:min-h-[340px] lg:min-h-full">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent lg:hidden" />
              
              {/* Category badge floating on mobile */}
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="bg-[#C96E56] text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-xs uppercase tracking-wider">
                  {article.categoryLabel}
                </span>
              </div>

              {/* Bookmark button */}
              {onToggleSave && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleSave(article.id);
                  }}
                  aria-label={isSaved ? 'Remover dos salvos' : 'Salvar para ler depois'}
                  className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition-colors cursor-pointer ${
                    isSaved
                      ? 'bg-[#26463E] text-white'
                      : 'bg-white/80 text-[#2D312E] hover:bg-white'
                  }`}
                >
                  <Bookmark className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Content Container (7 cols on lg) */}
            <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
              <div>
                {/* Meta info header */}
                <div className="hidden lg:flex items-center gap-3 mb-4">
                  <span className="bg-[#C96E56] text-white text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-wider">
                    {article.categoryLabel}
                  </span>
                  <span className="text-xs text-[#7d837f] opacity-80 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#58877b]" />
                    {article.readingTime}
                  </span>
                  <span className="text-xs text-[#7d837f] opacity-60">•</span>
                  <span className="text-xs text-[#7d837f] opacity-80">{article.publishedAt}</span>
                </div>

                {/* Article Title */}
                <h3
                  onClick={() => onReadArticle(article)}
                  className="font-serif text-2xl sm:text-3xl font-bold text-[#26463E] leading-snug sm:leading-tight mb-3 cursor-pointer hover:text-[#C96E56] transition-colors"
                >
                  {article.title}
                </h3>

                {/* Subtitle / Excerpt */}
                <p className="text-sm sm:text-base text-[#2D312E] opacity-90 leading-relaxed mb-6 font-normal">
                  {article.excerpt}
                </p>

                {/* Highlights / Key takeaways box */}
                {article.keyTakeaways && article.keyTakeaways.length > 0 && (
                  <div className="bg-[#F9F7F2] rounded-2xl p-4 border border-[#E3EBE6] mb-6">
                    <span className="text-xs font-bold text-[#26463E] uppercase tracking-wider flex items-center gap-1.5 mb-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#C96E56]" />
                      Pontos Essenciais Deste Estudo:
                    </span>
                    <ul className="text-xs sm:text-sm text-[#2D312E] space-y-1.5">
                      {article.keyTakeaways.slice(0, 2).map((point, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-[#C96E56] font-bold mt-0.5">•</span>
                          <span className="leading-snug">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Footer with Author and CTA Button */}
              <div className="pt-4 border-t border-[#F0ECE1] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {/* Author Info */}
                <div className="flex items-center gap-3">
                  <img
                    src={article.author.avatarUrl}
                    alt={article.author.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-[#E3EBE6]"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <span className="text-xs sm:text-sm font-bold text-[#26463E] block leading-tight">
                      {article.author.name}
                    </span>
                    <span className="text-[11px] text-[#7d837f] block">
                      {article.author.role}
                    </span>
                  </div>
                </div>

                {/* CTA Read Button */}
                <button
                  id="btn-read-featured"
                  onClick={() => onReadArticle(article)}
                  className="inline-flex items-center justify-center gap-2 bg-[#26463E] hover:bg-[#1b332d] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 cursor-pointer group/btn shadow-xs hover:shadow-sm"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Ler Artigo Completo</span>
                  <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};
