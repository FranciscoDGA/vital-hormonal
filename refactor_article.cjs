const fs = require('fs');
let content = fs.readFileSync('src/pages/ArticlePage.tsx', 'utf-8');

// Add imports
content = content.replace("import React, { useState, useEffect, useRef } from 'react';", "import React, { useState, useEffect, useRef } from 'react';\nimport { useParams, useNavigate } from 'react-router-dom';\nimport { ARTICLES_DATA } from '../data/articles';\nimport { SeoStructuredData } from '../components/SeoStructuredData';");

// Fix props interface
content = content.replace(/interface ArticleReaderModalProps \{[\s\S]*?\n\}/, `interface ArticlePageProps {
  savedArticleIds?: string[];
  onToggleSave: (articleId: string) => void;
  onOpenGuideModal: () => void;
  onOpenNewsletterModal?: () => void;
  onOpenProteinCalculator?: () => void;
  onOpenLabExamsGlossary?: () => void;
  onOpenDoctorChecklist?: () => void;
  onOpenSupplementGuide?: () => void;
}`);

// Fix component signature
content = content.replace(/export const ArticleReaderModal: React\.FC<ArticleReaderModalProps> = \(\{[\s\S]*?\}\) => \{/, `export const ArticlePage: React.FC<ArticlePageProps> = ({
  savedArticleIds = [],
  onToggleSave,
  onOpenGuideModal,
  onOpenNewsletterModal,
  onOpenProteinCalculator,
  onOpenLabExamsGlossary,
  onOpenDoctorChecklist,
  onOpenSupplementGuide,
}) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const article = ARTICLES_DATA.find(a => a.slug === slug);
  const isSaved = article ? savedArticleIds.includes(article.id) : false;

  if (!article) {
    return (
      <main className="flex-1 bg-[#F9F7F2] py-20 text-center">
        <h1 className="text-2xl font-serif text-[#26463E]">Artigo não encontrado</h1>
        <button onClick={() => navigate('/blog')} className="mt-4 px-6 py-2 bg-[#26463E] text-white rounded-lg">Voltar ao Blog</button>
      </main>
    );
  }`);

// Remove if(!article) return null; and modal wrapper
content = content.replace("if (!article) return null;", "");

content = content.replace(
  /<div\s+className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black\/80 backdrop-blur-sm animate-in fade-in duration-200"[\s\S]*?<div\s+ref=\{modalRef\}\s+className="bg-\[#F9F7F2\] w-full h-full sm:h-auto sm:max-h-\[90vh\] sm:rounded-3xl shadow-2xl overflow-y-auto flex flex-col relative"[\s\S]*?<div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-\[#F9F7F2\]\/95 backdrop-blur-md border-b border-\[#E3EBE6\]">/,
  `<main className="flex-1 bg-[#F9F7F2] w-full h-full flex flex-col">
      <SeoStructuredData article={article} />
      <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-[#F9F7F2]/95 backdrop-blur-md border-b border-[#E3EBE6]">`
);

// Replace Close button with Go Back button
content = content.replace(
  /<button\s+onClick=\{onClose\}\s+className="p-2 rounded-full text-\[#7d837f\] hover:bg-\[#E3EBE6\] hover:text-\[#26463E\] transition-colors"\s+aria-label="Voltar"\s*>\s*<ArrowLeft className="w-6 h-6" \/>\s*<\/button>/,
  `<button
          onClick={() => navigate('/blog')}
          className="p-2 rounded-full text-[#7d837f] hover:bg-[#E3EBE6] hover:text-[#26463E] transition-colors"
          aria-label="Voltar"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>`
);

content = content.replace(
  /onSelectArticle=\{onSelectArticle\}/g,
  "onSelectArticle={(art) => navigate(`/artigo/${art.slug}`)}"
);

content = content.replace(
  /onClose=\{onClose\}/g,
  ""
);

content = content.replace(
  /<\/div>\s*<\/div>\s*\);/g,
  `</main>\n  );`
);

fs.writeFileSync('src/pages/ArticlePage.tsx', content);
