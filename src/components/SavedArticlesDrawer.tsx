import React from 'react';
import { X, Bookmark, Trash2, ArrowRight, Clock } from 'lucide-react';
import { Article } from '../types';

interface SavedArticlesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedArticles: Article[];
  onReadArticle: (article: Article) => void;
  onRemoveSaved: (articleId: string) => void;
  onClearAll: () => void;
}

export const SavedArticlesDrawer: React.FC<SavedArticlesDrawerProps> = ({
  isOpen,
  onClose,
  savedArticles,
  onReadArticle,
  onRemoveSaved,
  onClearAll,
}) => {
  if (!isOpen) return null;

  return (
    <div
      id="saved-articles-drawer-backdrop"
      className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300 border-l border-[#E3EBE6]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#E3EBE6] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-[#C96E56]" />
            <h3 className="font-serif text-lg font-bold text-[#26463E]">
              Minha Lista de Leitura ({savedArticles.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar gaveta"
            className="p-1.5 rounded-full hover:bg-[#F9F7F2] text-[#7d837f] hover:text-[#2D312E]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="p-5 flex-1 overflow-y-auto space-y-4">
          {savedArticles.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-12 h-12 rounded-full bg-[#F9F7F2] flex items-center justify-center mx-auto mb-3 text-[#7d837f]">
                <Bookmark className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-base font-bold text-[#26463E] mb-1">
                Nenhum artigo salvo ainda
              </h4>
              <p className="text-xs text-[#525753] max-w-xs mx-auto">
                Clique no ícone de marcador nos cards para salvar conteúdos e ler com calma mais tarde.
              </p>
            </div>
          ) : (
            savedArticles.map((art) => (
              <div
                key={art.id}
                className="p-4 rounded-2xl bg-[#F9F7F2] border border-[#E3EBE6] flex flex-col justify-between gap-3 group"
              >
                <div>
                  <span className="text-[10px] font-bold text-[#C96E56] uppercase tracking-wider block mb-1">
                    {art.categoryLabel}
                  </span>
                  <h4
                    onClick={() => {
                      onClose();
                      onReadArticle(art);
                    }}
                    className="font-serif text-sm font-bold text-[#26463E] hover:text-[#C96E56] transition-colors leading-snug cursor-pointer"
                  >
                    {art.title}
                  </h4>
                  <div className="flex items-center gap-2 text-[11px] text-[#7d837f] mt-1.5">
                    <Clock className="w-3 h-3 text-[#58877b]" />
                    <span>{art.readingTime}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#E3EBE6]">
                  <button
                    onClick={() => onRemoveSaved(art.id)}
                    className="text-xs text-[#7d837f] hover:text-red-600 flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Remover</span>
                  </button>

                  <button
                    onClick={() => {
                      onClose();
                      onReadArticle(art);
                    }}
                    className="text-xs font-bold text-[#26463E] hover:text-[#C96E56] flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>Ler agora</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {savedArticles.length > 0 && (
          <div className="p-4 border-t border-[#E3EBE6] bg-[#F9F7F2]">
            <button
              onClick={onClearAll}
              className="w-full text-xs text-[#7d837f] hover:text-[#2D312E] py-2 text-center"
            >
              Limpar todos os salvos
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
