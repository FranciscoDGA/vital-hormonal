import React from 'react';
import { ArticleGrid } from '../components/ArticleGrid';
import { Article, CategoryType } from '../types';
import { AdSlot } from '../components/AdSlot';

interface BlogPageProps {
  filteredArticles: Article[];
  selectedCategory: CategoryType;
  onSelectCategory: (category: CategoryType) => void;
  searchQuery: string;
  onClearSearch: () => void;
  onReadArticle: (article: Article) => void;
  savedArticleIds: string[];
  onToggleSave: (id: string) => void;
}

export const BlogPage: React.FC<BlogPageProps> = (props) => {
  return (
    <main className="flex-1 bg-[#F9F7F2] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-4">
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#26463E]">Blog & Artigos</h1>
        <p className="text-[#525753] mt-3 text-sm sm:text-base">
          Explore nosso acervo completo de artigos baseados em evidências científicas.
        </p>
      </div>
      <AdSlot position="header" />
      <ArticleGrid
        articles={props.filteredArticles}
        selectedCategory={props.selectedCategory}
        onSelectCategory={props.onSelectCategory}
        searchQuery={props.searchQuery}
        onClearSearch={props.onClearSearch}
        onReadArticle={props.onReadArticle}
        savedArticleIds={props.savedArticleIds}
        onToggleSave={props.onToggleSave}
      />
    </main>
  );
};
