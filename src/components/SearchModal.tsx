import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { ARTICLES_DATA, POPULAR_SYMPTOMS } from '../data/articles';
import { Article } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectArticle: (article: Article) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectArticle,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredArticles = query.trim()
    ? ARTICLES_DATA.filter(
        (art) =>
          art.title.toLowerCase().includes(query.toLowerCase()) ||
          art.excerpt.toLowerCase().includes(query.toLowerCase()) ||
          art.tags.some((t) => t.toLowerCase().includes(query.toLowerCase())) ||
          art.keyTakeaways.some((k) => k.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  return (
    <div
      id="search-modal-backdrop"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-[#E3EBE6] overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header Input */}
        <div className="p-4 sm:p-5 border-b border-[#E3EBE6] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#58877b] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por sintomas, suplementos, sono ou hormônios..."
            className="w-full text-base sm:text-lg bg-transparent text-[#2D312E] placeholder:text-[#7d837f] focus:outline-hidden"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-[#7d837f] hover:text-[#2D312E] px-2 py-1"
            >
              Limpar
            </button>
          )}
          <button
            onClick={onClose}
            aria-label="Fechar busca"
            className="p-1.5 rounded-full hover:bg-[#F9F7F2] text-[#7d837f] hover:text-[#2D312E] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 max-h-[65vh] overflow-y-auto">
          {query.trim() === '' ? (
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#7d837f] block mb-3">
                Pesquisas Populares:
              </span>
              <div className="flex flex-wrap gap-2 mb-6">
                {POPULAR_SYMPTOMS.map((sym) => (
                  <button
                    key={sym}
                    onClick={() => setQuery(sym)}
                    className="text-xs bg-[#F9F7F2] hover:bg-[#E3EBE6] text-[#26463E] px-3 py-1.5 rounded-full border border-[#E3EBE6] transition-colors cursor-pointer"
                  >
                    {sym}
                  </button>
                ))}
              </div>

              <span className="text-xs font-bold uppercase tracking-wider text-[#7d837f] block mb-3">
                Categorias Principais:
              </span>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'Progesterona & Sono', query: 'progesterona' },
                  { label: 'Névoa Mental & Foco', query: 'névoa mental' },
                  { label: 'Magnésio & Nutrição', query: 'magnésio' },
                  { label: 'Metabolismo & Insulina', query: 'metabolismo' },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => setQuery(item.query)}
                    className="text-left p-3 rounded-xl bg-[#F9F7F2] hover:bg-[#E3EBE6] border border-[#E3EBE6] text-xs font-semibold text-[#26463E] transition-colors flex items-center justify-between"
                  >
                    <span>{item.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#58877b]" />
                  </button>
                ))}
              </div>
            </div>
          ) : filteredArticles.length > 0 ? (
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#58877b] block mb-2">
                {filteredArticles.length} {filteredArticles.length === 1 ? 'artigo encontrado' : 'artigos encontrados'}:
              </span>
              {filteredArticles.map((art) => (
                <div
                  key={art.id}
                  onClick={() => {
                    onClose();
                    onSelectArticle(art);
                  }}
                  className="p-4 rounded-2xl bg-[#F9F7F2] hover:bg-[#E3EBE6] border border-[#E3EBE6] transition-all cursor-pointer flex items-center justify-between gap-3 group"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold text-[#C96E56] uppercase tracking-wider">
                        {art.categoryLabel}
                      </span>
                      <span className="text-[11px] text-[#7d837f] flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#58877b]" />
                        {art.readingTime}
                      </span>
                    </div>
                    <h4 className="font-serif text-sm sm:text-base font-bold text-[#26463E] group-hover:text-[#C96E56] transition-colors leading-snug">
                      {art.title}
                    </h4>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 group-hover:bg-[#26463E] group-hover:text-white transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-sm text-[#525753] mb-3">
                Nenhum resultado para "<strong>{query}</strong>".
              </p>
              <p className="text-xs text-[#7d837f]">
                Tente palavras mais genéricas como sono, glicose, estrogênio ou força.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
