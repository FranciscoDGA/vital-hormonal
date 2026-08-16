import React from 'react';
import { Clock, Bookmark, ArrowUpRight, Search, Sparkles } from 'lucide-react';
import { Article, CategoryType } from '../types';

interface ArticleGridProps {
  articles: Article[];
  selectedCategory: CategoryType;
  onSelectCategory: (category: CategoryType) => void;
  searchQuery: string;
  onClearSearch: () => void;
  onReadArticle: (article: Article) => void;
  savedArticleIds: string[];
  onToggleSave: (articleId: string) => void;
}

export const ArticleGrid: React.FC<ArticleGridProps> = ({
  articles,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onClearSearch,
  onReadArticle,
  savedArticleIds,
  onToggleSave,
}) => {
  const categories: { id: CategoryType; label: string }[] = [
    { id: 'todos', label: 'Todos os Artigos' },
    { id: 'sintomas', label: 'Sintomas & Sinais' },
    { id: 'nutricao', label: 'Nutrição & Suplementos' },
    { id: 'hormonios', label: 'Hormônios 35+' },
    { id: 'rotinas', label: 'Rotinas & Hábitos' },
    { id: 'longevidade', label: 'Longevidade & Corpo' },
  ];

  return (
    <section id="artigos-section" className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#58877b]" />
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#26463E]">
                Biblioteca Editorial
              </h2>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#26463E]">
              Artigos Recentes & Guias Clínicos
            </h3>
          </div>

          {/* Search query tag indicator if filtering */}
          {searchQuery && (
            <div className="inline-flex items-center gap-2 bg-[#E3EBE6] text-[#26463E] px-3.5 py-1.5 rounded-xl text-xs">
              <Search className="w-3.5 h-3.5" />
              <span>
                Filtro por: <strong className="font-semibold">"{searchQuery}"</strong>
              </span>
              <button
                onClick={onClearSearch}
                className="underline hover:text-[#C96E56] ml-1 cursor-pointer"
              >
                Limpar
              </button>
            </div>
          )}
        </div>

        {/* Category Filter Pills (Mobile scrollable) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`cat-pill-${cat.id}`}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-[#26463E] text-white shadow-xs'
                    : 'bg-white text-[#525753] hover:text-[#26463E] hover:bg-[#E3EBE6] border border-[#E3EBE6]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Empty State */}
        {articles.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#E3EBE6] max-w-lg mx-auto my-6">
            <div className="w-14 h-14 bg-[#F9F7F2] rounded-2xl flex items-center justify-center mx-auto mb-4 text-[#C96E56]">
              <Search className="w-7 h-7" />
            </div>
            <h4 className="font-serif text-xl font-bold text-[#26463E] mb-2">
              Nenhum artigo encontrado
            </h4>
            <p className="text-sm text-[#525753] mb-6">
              Não encontramos conteúdos correspondentes à sua busca por "{searchQuery}".
              Tente pesquisar por palavras como "sono", "magnésio", "estrogênio" ou "metabolismo".
            </p>
            <button
              onClick={() => {
                onClearSearch();
                onSelectCategory('todos');
              }}
              className="bg-[#26463E] hover:bg-[#1b332d] text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition-colors cursor-pointer"
            >
              Ver todos os artigos
            </button>
          </div>
        ) : (
          /* Article Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {articles.map((article) => {
              const isSaved = savedArticleIds.includes(article.id);
              return (
                <article
                  key={article.id}
                  id={`article-card-${article.id}`}
                  className="bg-white rounded-2xl border border-[#E3EBE6] shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col group hover:-translate-y-1"
                >
                  {/* Article Image Container */}
                  <div
                    onClick={() => onReadArticle(article)}
                    className="relative aspect-16/10 overflow-hidden bg-[#E3EBE6] cursor-pointer"
                  >
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="bg-[#C96E56] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-xs uppercase tracking-wide">
                        {article.categoryLabel}
                      </span>
                    </div>

                    {/* Bookmark action */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleSave(article.id);
                      }}
                      aria-label={isSaved ? 'Remover dos salvos' : 'Salvar artigo'}
                      className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors cursor-pointer ${
                        isSaved
                          ? 'bg-[#26463E] text-white'
                          : 'bg-white/80 text-[#2D312E] hover:bg-white'
                      }`}
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Reading time & date */}
                      <div className="flex items-center gap-2 text-xs text-[#7d837f] mb-2.5">
                        <span className="flex items-center gap-1 font-medium text-[#58877b]">
                          <Clock className="w-3.5 h-3.5" />
                          {article.readingTime}
                        </span>
                        <span>•</span>
                        <span>{article.publishedAt}</span>
                      </div>

                      {/* Title */}
                      <h4
                        onClick={() => onReadArticle(article)}
                        className="font-serif text-lg sm:text-xl font-bold text-[#26463E] leading-snug mb-2.5 cursor-pointer hover:text-[#C96E56] transition-colors"
                      >
                        {article.title}
                      </h4>

                      {/* Excerpt */}
                      <p className="text-xs sm:text-sm text-[#525753] leading-relaxed line-clamp-3 mb-4">
                        {article.excerpt}
                      </p>
                    </div>

                    {/* Footer with Author and Read Link */}
                    <div className="pt-4 border-t border-[#F0ECE1] flex items-center justify-between mt-auto">
                      {/* Author */}
                      <div className="flex items-center gap-2.5">
                        <img
                          src={article.author.avatarUrl}
                          alt={article.author.name}
                          className="w-8 h-8 rounded-full object-cover ring-1 ring-[#E3EBE6]"
                          referrerPolicy="no-referrer"
                        />
                        <div className="overflow-hidden">
                          <span className="text-xs font-bold text-[#26463E] block truncate">
                            {article.author.name}
                          </span>
                          <span className="text-[10px] text-[#7d837f] block truncate">
                            {article.author.role.split('&')[0]}
                          </span>
                        </div>
                      </div>

                      {/* Read Link */}
                      <button
                        onClick={() => onReadArticle(article)}
                        className="text-xs font-bold text-[#26463E] group-hover:text-[#C96E56] flex items-center gap-1 transition-colors cursor-pointer shrink-0 ml-2"
                      >
                        <span>Ler</span>
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
