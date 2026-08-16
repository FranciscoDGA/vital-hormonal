import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { SeoStructuredData } from '../components/SeoStructuredData';
import { 
  ArrowLeft, 
  Clock, 
  Bookmark, 
  Share2, 
  Check, 
  Sparkles, 
  BookOpen, 
  ShieldCheck, 
  Type, 
  HelpCircle,
  ChevronDown,
  UserCheck,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowUp,
  Mail,
  Heart,
  MessageCircle,
  Dumbbell,
  FileText,
  Stethoscope,
  Pill,
  ArrowRight,
  Moon,
  Sun,
  Printer,
  ThumbsUp,
  ThumbsDown,
  BookMarked
} from 'lucide-react';
import { Article } from '../types';
import { ARTICLES_DATA } from '../data/articles';


import { EditorialAdSlot } from '../components/EditorialAdSlot';
import { AdSlot } from '../components/AdSlot';
import ReactMarkdown from 'react-markdown';

interface ArticlePageProps {
  savedArticleIds?: string[];
  onToggleSave: (articleId: string) => void;
  onOpenGuideModal: () => void;
  onOpenNewsletterModal?: () => void;
  onOpenProteinCalculator?: () => void;
  onOpenLabExamsGlossary?: () => void;
  onOpenDoctorChecklist?: () => void;
  onOpenSupplementGuide?: () => void;
}

export const ArticlePage: React.FC<ArticlePageProps> = ({
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
  }
  const [fontSizeClass, setFontSizeClass] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [isNightMode, setIsNightMode] = useState(false);
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [feedbackVote, setFeedbackVote] = useState<'helpful' | 'unhelpful' | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const isArticleSaved = isSaved !== undefined 
    ? isSaved 
    : article 
      ? savedArticleIds.includes(article.id) 
      : false;

  const calculateProgress = () => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      const totalScroll = scrollHeight - clientHeight;
      if (totalScroll > 0) {
        const progress = (scrollTop / totalScroll) * 100;
        setScrollProgress(Math.min(100, Math.max(0, Math.round(progress))));
      } else {
        setScrollProgress(0);
      }
    }
  };

  useEffect(() => {
    if (!article) return;

    // Reset scroll position to top when switching articles
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: 'instant' });
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
    setScrollProgress(0);
    setOpenFaqIndex(0); // Open first FAQ by default

    // Load feedback vote from localStorage
    try {
      const savedFeedback = localStorage.getItem(`vital_feedback_${article.id}`);
      if (savedFeedback === 'helpful' || savedFeedback === 'unhelpful') {
        setFeedbackVote(savedFeedback);
      } else {
        setFeedbackVote(null);
      }
    } catch {
      setFeedbackVote(null);
    }
  }, [article]);

  

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleShareWhatsApp = () => {
    if (!article) return;
    const text = encodeURIComponent(
      `🌸 Olha esse artigo excelente sobre saúde da mulher 35+ que encontrei no Vital Hormonal:\n\n` +
      `📖 *${article.title}*\n` +
      `💡 _${article.subtitle}_\n\n` +
      `Leia na íntegra no portal: ${window.location.origin}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleFeedback = (type: 'helpful' | 'unhelpful') => {
    setFeedbackVote(type);
    try {
      localStorage.setItem(`vital_feedback_${article.id}`, type);
    } catch (e) {
      console.error(e);
    }
  };

  const cycleFontSize = () => {
    if (fontSizeClass === 'normal') setFontSizeClass('large');
    else if (fontSizeClass === 'large') setFontSizeClass('xlarge');
    else setFontSizeClass('normal');
  };

  const getFontSizeStyle = () => {
    switch (fontSizeClass) {
      case 'large':
        return 'text-lg sm:text-xl leading-relaxed';
      case 'xlarge':
        return 'text-xl sm:text-2xl leading-relaxed';
      default:
        return 'text-base sm:text-lg leading-relaxed';
    }
  };

  const scrollToTop = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Find 2 related articles from the same or complementary category
  const relatedArticles = ARTICLES_DATA.filter(
    (a) => a.id !== article.id && (a.category === article.category || a.category === 'hormonios')
  ).slice(0, 2);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  // Recommended Reference Books
  const recommendedBooks = [
    {
      title: 'A Sabedoria da Menopausa',
      author: 'Dra. Christiane Northrup',
      description: 'Obra clássica sobre a transformação física, metabólica e emocional na perimenopausa.',
      badge: 'Livro Clássico'
    },
    {
      title: 'The Menopause Brain (O Cérebro na Menopausa)',
      author: 'Dra. Lisa Mosconi (PhD em Neurociência)',
      description: 'Estudo neurocientífico sobre estrogênio, névoa mental, sono e proteção cognitiva.',
      badge: 'Neurociência & Foco'
    }
  ];

  return (
    <div 
      ref={containerRef}
      onScroll={calculateProgress}
      className={`fixed inset-0 z-50 overflow-y-auto min-h-screen pb-24 scroll-smooth transition-colors duration-200 ${
        isNightMode ? 'bg-[#151D1A] text-[#E3ECE7]' : 'bg-[#F7F9F8] text-[#2D312E]'
      }`}
    >
      {/* Top Dynamic Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 sm:h-1.5 bg-[#E3EBE6]/80 z-50 overflow-hidden shadow-xs print:hidden">
        <div
          className="h-full bg-linear-to-r from-[#C96E56] via-[#d6856f] to-[#58877b] transition-all duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Sticky Header Toolbar */}
      <div className={`sticky top-0 z-40 border-b backdrop-blur-md shadow-xs print:hidden transition-colors ${
        isNightMode ? 'bg-[#151D1A]/95 border-[#283934]' : 'bg-[#F7F9F8]/95 border-[#E3EBE6]'
      }`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button
            id="reader-back-btn"
            
            className={`flex items-center gap-2 text-sm font-semibold transition-colors cursor-pointer ${
              isNightMode ? 'text-[#C7DBD2] hover:text-[#FAEDE7]' : 'text-[#26463E] hover:text-[#C96E56]'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Voltar para a biblioteca</span>
            <span className="sm:hidden">Voltar</span>
          </button>

          {/* Reading progress pill indicator */}
          <div className={`hidden md:flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border ${
            isNightMode ? 'bg-[#1E2B26] border-[#2E423B] text-[#C7DBD2]' : 'bg-white border-[#E3EBE6] text-[#26463E]'
          }`}>
            <span className="w-2 h-2 rounded-full bg-[#C96E56] animate-pulse" />
            <span>{scrollProgress}% lido</span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Night / Eye-Safe Mode Toggle */}
            <button
              id="reader-nightmode-btn"
              onClick={() => setIsNightMode(!isNightMode)}
              className={`p-2.5 rounded-xl border transition-colors cursor-pointer flex items-center gap-1 text-xs font-semibold ${
                isNightMode 
                  ? 'bg-[#26463E] text-[#FAEDE7] border-[#37544b]' 
                  : 'bg-white text-[#2D312E] border-[#E3EBE6] hover:bg-[#E3EBE6]'
              }`}
              title={isNightMode ? 'Mudar para modo diurno' : 'Modo noturno (relaxante para os olhos)'}
            >
              {isNightMode ? <Sun className="w-4 h-4 text-[#F3C47B]" /> : <Moon className="w-4 h-4 text-[#58877b]" />}
              <span className="hidden sm:inline">{isNightMode ? 'Dia' : 'Noite'}</span>
            </button>

            {/* Font size button */}
            <button
              id="reader-fontsize-btn"
              onClick={cycleFontSize}
              className={`p-2.5 rounded-xl border transition-colors cursor-pointer flex items-center gap-1 text-xs font-semibold ${
                isNightMode ? 'bg-[#1E2B26] border-[#2E423B] text-white hover:bg-[#283934]' : 'bg-white text-[#2D312E] border-[#E3EBE6] hover:bg-[#E3EBE6]'
              }`}
              title="Ajustar tamanho da fonte"
            >
              <Type className="w-4 h-4 text-[#58877b]" />
              <span className="hidden md:inline">
                {fontSizeClass === 'normal' ? 'Fonte normal' : fontSizeClass === 'large' ? 'Fonte média' : 'Fonte grande'}
              </span>
            </button>

            {/* Print / PDF button for medical visit */}
            <button
              id="reader-print-btn"
              onClick={handlePrint}
              className={`p-2.5 rounded-xl border transition-colors cursor-pointer flex items-center gap-1 text-xs font-semibold ${
                isNightMode ? 'bg-[#1E2B26] border-[#2E423B] text-white hover:bg-[#283934]' : 'bg-white text-[#2D312E] border-[#E3EBE6] hover:bg-[#E3EBE6]'
              }`}
              title="Imprimir ou salvar em PDF para a consulta médica"
            >
              <Printer className="w-4 h-4 text-[#58877b]" />
              <span className="hidden lg:inline">Imprimir</span>
            </button>

            {/* Save/Bookmark button */}
            <button
              id="reader-save-btn"
              onClick={() => onToggleSave(article.id)}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 text-xs font-semibold ${
                isArticleSaved
                  ? 'bg-[#26463E] text-white border-[#26463E]'
                  : isNightMode
                    ? 'bg-[#1E2B26] text-white border-[#2E423B] hover:bg-[#283934]'
                    : 'bg-white text-[#2D312E] border-[#E3EBE6] hover:bg-[#E3EBE6]'
              }`}
              title={isArticleSaved ? 'Remover dos salvos' : 'Salvar para ler depois'}
            >
              <Bookmark className={`w-4 h-4 ${isArticleSaved ? 'fill-current text-[#FAEDE7]' : 'text-[#7d837f]'}`} />
              <span className="hidden sm:inline">{isArticleSaved ? 'Salvo' : 'Salvar'}</span>
            </button>

            {/* Share link button */}
            <button
              id="reader-share-btn"
              onClick={handleShare}
              className={`p-2.5 rounded-xl border transition-colors cursor-pointer flex items-center gap-1 text-xs font-semibold ${
                isNightMode ? 'bg-[#1E2B26] border-[#2E423B] text-white hover:bg-[#283934]' : 'bg-white text-[#2D312E] border-[#E3EBE6] hover:bg-[#E3EBE6]'
              }`}
              title="Copiar link do artigo"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-[#58877b]" />
                  <span className="text-[#58877b]">Copiado!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 text-[#7d837f]" />
                  <span className="hidden sm:inline">Copiar</span>
                </>
              )}
            </button>

            {/* WhatsApp Share button */}
            <button
              id="reader-whatsapp-btn"
              onClick={handleShareWhatsApp}
              className="p-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-semibold shadow-xs"
              title="Compartilhar no WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">WhatsApp</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Article Container */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 pt-8 print:p-0 print:max-w-full">
        {/* Category & Reading Metadata */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#C96E56] bg-[#FAEDE7] px-3 py-1 rounded-full border border-[#f3d3c8]">
            {article.categoryLabel}
          </span>
          <div className="flex items-center gap-1.5 text-xs text-[#7d837f]">
            <Clock className="w-3.5 h-3.5 text-[#58877b]" />
            <span>{article.readingTime}</span>
          </div>
          <span className="text-xs text-[#b8beb9]">•</span>
          <div className="flex items-center gap-1.5 text-xs text-[#7d837f]">
            <Calendar className="w-3.5 h-3.5 text-[#7d837f]" />
            <span>{article.publishedAt}</span>
          </div>
        </div>

        {/* Title & Subtitle */}
        <h1 className={`font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.15] mb-4 ${
          isNightMode ? 'text-white' : 'text-[#26463E]'
        }`}>
          {article.title}
        </h1>

        <p className={`text-lg sm:text-xl leading-relaxed mb-6 font-serif italic ${
          isNightMode ? 'text-[#B8C8C1]' : 'text-[#525753]'
        }`}>
          {article.subtitle}
        </p>

        {/* Author Bio Card & Medical Reviewer (EEAT) */}
        <div className={`rounded-2xl p-4 sm:p-5 border mb-8 space-y-3 ${
          isNightMode ? 'bg-[#1D2824] border-[#2E423B]' : 'bg-white border-[#E3EBE6]'
        }`}>
          <div className="flex items-center gap-3.5">
            <img
              src={article.author.avatarUrl}
              alt={article.author.name}
              referrerPolicy="no-referrer"
              className="w-12 h-12 rounded-full object-cover border-2 border-[#58877b]"
            />
            <div>
              <h4 className={`text-sm font-bold ${isNightMode ? 'text-white' : 'text-[#26463E]'}`}>{article.author.name}</h4>
              <p className="text-xs text-[#7d837f]">{article.author.role}</p>
              {article.author.crmOrBio && (
                <p className="text-[11px] text-[#58877b] font-medium mt-0.5">{article.author.crmOrBio}</p>
              )}
            </div>
          </div>

          {article.medicalReviewer && (
            <div className={`pt-3 border-t flex items-center justify-between text-xs text-[#7d837f] ${
              isNightMode ? 'border-[#2E423B]' : 'border-[#F2F6F4]'
            }`}>
              <div className="flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-[#58877b]" />
                <span>Revisão Médica: <strong>{article.medicalReviewer.name}</strong> ({article.medicalReviewer.crmOrRole})</span>
              </div>
              <span className="hidden sm:inline text-[11px] text-[#7d837f]">{article.medicalReviewer.reviewDate}</span>
            </div>
          )}
        </div>

        {/* Hero Image */}
        <div className="relative rounded-3xl overflow-hidden mb-10 shadow-md print:hidden">
          <img
            src={article.imageUrl}
            alt={article.title}
            referrerPolicy="no-referrer"
            className="w-full h-72 sm:h-96 object-cover"
          />
        </div>

        {/* Key Takeaways Box (Destaques Científicos) */}
        <div className={`border-2 rounded-2xl p-6 mb-8 shadow-xs ${
          isNightMode ? 'bg-[#1A2622] border-[#37544B]' : 'bg-[#FDFAF7] border-[#58877b]/25'
        }`}>
          <div className={`flex items-center gap-2 mb-3 ${isNightMode ? 'text-[#FAEDE7]' : 'text-[#26463E]'}`}>
            <Sparkles className="w-5 h-5 text-[#C96E56]" />
            <h3 className="font-serif text-lg font-bold">
              Pontos-Chave Científicos deste Artigo
            </h3>
          </div>
          <ul className={`space-y-2.5 text-sm sm:text-base ${isNightMode ? 'text-[#D0DFD8]' : 'text-[#525753]'}`}>
            {article.keyTakeaways.map((takeaway, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#58877b] mt-1 shrink-0" />
                <span className="leading-snug">{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* TOP AD / PROMOTION SLOT (High-CTR In-Article) */}
        <EditorialAdSlot
          slotType="inArticleTop"
          contextCategory={article.category}
          onOpenMaterials={onOpenGuideModal}
          onOpenProteinCalculator={onOpenProteinCalculator}
          onOpenLabExamsGlossary={onOpenLabExamsGlossary}
          onOpenDoctorChecklist={onOpenDoctorChecklist}
          onOpenSupplementGuide={onOpenSupplementGuide}
        />

        {/* Article Body Content */}
        <div className={`space-y-6 ${getFontSizeStyle()} ${isNightMode ? 'text-[#DCE7E2]' : 'text-[#2D312E]'}`}>
          <div className="markdown-content">
            <ReactMarkdown
              components={{
                h2: ({node, ...props}) => <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#26463E] mt-10 mb-4" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#26463E] mt-8 mb-3" {...props} />,
                p: ({node, ...props}) => <p className="leading-relaxed mb-6" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-6 space-y-2" {...props} />,
                li: ({node, ...props}) => <li className="pl-2" {...props} />,
                blockquote: ({node, ...props}) => (
                  <blockquote className="border-l-4 border-[#26463E] pl-6 py-2 my-8 bg-[#E8F1EB]/50 rounded-r-2xl italic text-[#525753]" {...props} />
                ),
                a: ({node, ...props}) => <a className="text-[#26463E] font-medium underline underline-offset-2 decoration-[#E8F1EB] hover:bg-[#E8F1EB] transition-colors" {...props} />,
                strong: ({node, ...props}) => <strong className="font-bold text-[#26463E]" {...props} />,
              }}
            >
              {article.content.join('\n\n')}
            </ReactMarkdown>
          </div>
        </div>

        {/* Actionable Suggestion Box */}
        {article.suggestedAction && (
          <div className={`mt-12 rounded-2xl p-6 border-2 shadow-xs ${
            isNightMode ? 'bg-[#1D2824] border-[#37544B]' : 'bg-white border-[#58877b]/30'
          }`}>
            <div className={`flex items-center gap-2 mb-2 ${isNightMode ? 'text-[#FAEDE7]' : 'text-[#26463E]'}`}>
              <ShieldCheck className="w-5 h-5 text-[#58877b]" />
              <h4 className="font-serif text-base sm:text-lg font-bold">
                Próximo Passo Funcional
              </h4>
            </div>
            <p className={`text-sm sm:text-base ${isNightMode ? 'text-[#C7DBD2]' : 'text-[#525753]'}`}>
              {article.suggestedAction}
            </p>
          </div>
        )}

        {/* Feedback Widget: "Este artigo foi útil?" */}
        <div className={`mt-10 p-5 rounded-2xl border text-center transition-all ${
          isNightMode ? 'bg-[#1D2824] border-[#2E423B]' : 'bg-white border-[#E3EBE6]'
        }`}>
          <h5 className={`font-serif text-base font-bold mb-1 ${isNightMode ? 'text-white' : 'text-[#26463E]'}`}>
            Este conteúdo te ajudou a entender melhor seu corpo?
          </h5>
          <p className="text-xs text-[#7d837f] mb-4">
            Seu feedback anônimo orienta o comitê científico do Vital Hormonal na criação dos próximos artigos.
          </p>

          {feedbackVote ? (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FAEDE7] text-[#C96E56] text-xs font-bold border border-[#f3d3c8]">
              <Check className="w-4 h-4" />
              <span>Obrigada pelo seu voto! Nosso comitê agradece sua participação.</span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => handleFeedback('helpful')}
                className="inline-flex items-center gap-2 bg-[#F2F6F4] hover:bg-[#E3EBE6] text-[#26463E] px-4 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer border border-[#d2dfd8]"
              >
                <ThumbsUp className="w-4 h-4 text-[#58877b]" />
                <span>Sim, foi muito esclarecedor!</span>
              </button>
              <button
                type="button"
                onClick={() => handleFeedback('unhelpful')}
                className="inline-flex items-center gap-2 bg-[#FDFAF7] hover:bg-[#FAEDE7] text-[#525753] px-4 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer border border-[#E3EBE6]"
              >
                <ThumbsDown className="w-4 h-4 text-[#7d837f]" />
                <span>Preciso de mais detalhes</span>
              </button>
            </div>
          )}
        </div>

        {/* Contextual Clinical Tool Recommendation Box */}
        <div className={`mt-10 rounded-3xl p-6 sm:p-7 border shadow-xs ${
          isNightMode 
            ? 'bg-linear-to-br from-[#1E2B26] to-[#151D1A] border-[#2E423B]' 
            : 'bg-linear-to-br from-[#FAEDE7] to-[#FDFAF7] border-[#f3d3c8]'
        }`}>
          <div className="flex items-center gap-2 text-[#C96E56] text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4" />
            <span>Ferramentas Interativas Relacionadas</span>
          </div>

          <h4 className={`font-serif text-xl sm:text-2xl font-bold mb-2 ${isNightMode ? 'text-white' : 'text-[#26463E]'}`}>
            Aplique os aprendizados deste artigo na prática
          </h4>
          <p className={`text-xs sm:text-sm leading-relaxed mb-6 ${isNightMode ? 'text-[#C7DBD2]' : 'text-[#525753]'}`}>
            Utilize nossas calculadoras e geradores clínicos para personalizar sua alimentação, checar seus exames e preparar sua próxima consulta médica.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Protein Calculator */}
            {onOpenProteinCalculator && (
              <button
                type="button"
                onClick={onOpenProteinCalculator}
                className={`p-4 rounded-2xl border hover:shadow-xs transition-all text-left flex items-start justify-between gap-3 group cursor-pointer ${
                  isNightMode ? 'bg-[#1D2824] border-[#2E423B] hover:border-[#C96E56]' : 'bg-white border-[#E3EBE6] hover:border-[#C96E56]'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Dumbbell className="w-4 h-4 text-[#C96E56]" />
                    <span className={`text-xs font-bold group-hover:text-[#C96E56] ${isNightMode ? 'text-white' : 'text-[#26463E]'}`}>
                      Calculadora de Proteína 40+
                    </span>
                  </div>
                  <p className="text-[11px] text-[#7d837f]">
                    Calcule meta de gramas e leucina por refeição.
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#7d837f] group-hover:text-[#C96E56] group-hover:translate-x-0.5 transition-all mt-1 shrink-0" />
              </button>
            )}

            {/* Lab Exams Glossary */}
            {onOpenLabExamsGlossary && (
              <button
                type="button"
                onClick={onOpenLabExamsGlossary}
                className={`p-4 rounded-2xl border hover:shadow-xs transition-all text-left flex items-start justify-between gap-3 group cursor-pointer ${
                  isNightMode ? 'bg-[#1D2824] border-[#2E423B] hover:border-[#58877b]' : 'bg-white border-[#E3EBE6] hover:border-[#58877b]'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <FileText className="w-4 h-4 text-[#58877b]" />
                    <span className={`text-xs font-bold group-hover:text-[#58877b] ${isNightMode ? 'text-white' : 'text-[#26463E]'}`}>
                      Glossário A-Z de Exames
                    </span>
                  </div>
                  <p className="text-[11px] text-[#7d837f]">
                    Valores ideais de FSH, Estradiol, Ferritina e Insulina.
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#7d837f] group-hover:text-[#58877b] group-hover:translate-x-0.5 transition-all mt-1 shrink-0" />
              </button>
            )}

            {/* Doctor Visit Checklist */}
            {onOpenDoctorChecklist && (
              <button
                type="button"
                onClick={onOpenDoctorChecklist}
                className={`p-4 rounded-2xl border hover:shadow-xs transition-all text-left flex items-start justify-between gap-3 group cursor-pointer ${
                  isNightMode ? 'bg-[#1D2824] border-[#2E423B] hover:border-[#FAEDE7]' : 'bg-white border-[#E3EBE6] hover:border-[#26463E]'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Stethoscope className="w-4 h-4 text-[#26463E]" />
                    <span className={`text-xs font-bold ${isNightMode ? 'text-white' : 'text-[#26463E]'}`}>
                      Checklist da Consulta Médica
                    </span>
                  </div>
                  <p className="text-[11px] text-[#7d837f]">
                    Gere folha de apoio com perguntas e exames.
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#7d837f] group-hover:text-[#26463E] group-hover:translate-x-0.5 transition-all mt-1 shrink-0" />
              </button>
            )}

            {/* Supplement & Magnesium Guide */}
            {onOpenSupplementGuide && (
              <button
                type="button"
                onClick={onOpenSupplementGuide}
                className={`p-4 rounded-2xl border hover:shadow-xs transition-all text-left flex items-start justify-between gap-3 group cursor-pointer ${
                  isNightMode ? 'bg-[#1D2824] border-[#2E423B] hover:border-[#C96E56]' : 'bg-white border-[#E3EBE6] hover:border-[#C96E56]'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Pill className="w-4 h-4 text-[#C96E56]" />
                    <span className={`text-xs font-bold group-hover:text-[#C96E56] ${isNightMode ? 'text-white' : 'text-[#26463E]'}`}>
                      Matriz de Magnésio & Suplementos
                    </span>
                  </div>
                  <p className="text-[11px] text-[#7d837f]">
                    Melhor horário, dosagens e tipos de magnésio.
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#7d837f] group-hover:text-[#C96E56] group-hover:translate-x-0.5 transition-all mt-1 shrink-0" />
              </button>
            )}
          </div>
        </div>

        {/* Curated Reference Books Box (Monetization / Affiliate Ready) */}
        <div className={`mt-10 p-6 rounded-3xl border ${
          isNightMode ? 'bg-[#1B2722] border-[#2E423B]' : 'bg-[#FDFAF7] border-[#d2dfd8]'
        }`}>
          <div className="flex items-center gap-2 mb-3">
            <BookMarked className="w-4 h-4 text-[#C96E56]" />
            <h4 className={`font-serif text-base sm:text-lg font-bold ${isNightMode ? 'text-white' : 'text-[#26463E]'}`}>
              Livros & Obras Científicas de Referência
            </h4>
          </div>
          <p className={`text-xs mb-4 ${isNightMode ? 'text-[#B8C8C1]' : 'text-[#525753]'}`}>
            Curadoria das obras internacionais mais respeitadas por ginecologistas funcionais e neurocientistas:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {recommendedBooks.map((book, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-2xl border ${
                  isNightMode ? 'bg-[#151D1A] border-[#2E423B]' : 'bg-white border-[#E3EBE6]'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#58877b] bg-[#F2F6F4] px-2 py-0.5 rounded-full">
                    {book.badge}
                  </span>
                </div>
                <h5 className={`font-serif text-sm font-bold ${isNightMode ? 'text-white' : 'text-[#26463E]'}`}>
                  {book.title}
                </h5>
                <p className="text-[11px] text-[#7d837f] font-medium mb-1">
                  {book.author}
                </p>
                <p className={`text-xs leading-relaxed ${isNightMode ? 'text-[#B8C8C1]' : 'text-[#525753]'}`}>
                  {book.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM AD / PROMOTION SLOT */}
        <EditorialAdSlot
          slotType="inArticleBottom"
          contextCategory={article.category}
          onOpenMaterials={onOpenGuideModal}
          onOpenProteinCalculator={onOpenProteinCalculator}
          onOpenLabExamsGlossary={onOpenLabExamsGlossary}
          onOpenDoctorChecklist={onOpenDoctorChecklist}
          onOpenSupplementGuide={onOpenSupplementGuide}
        />

        {/* In-Article Newsletter Banner */}
        <div className={`mt-12 border rounded-3xl p-6 sm:p-8 text-center space-y-3 ${
          isNightMode ? 'bg-[#1D2824] border-[#2E423B]' : 'bg-[#FDFAF7] border-[#d2dfd8]'
        }`}>
          <div className="w-12 h-12 rounded-full bg-[#FAEDE7] text-[#C96E56] flex items-center justify-center mx-auto">
            <Mail className="w-6 h-6" />
          </div>
          <h4 className={`font-serif text-xl sm:text-2xl font-bold ${isNightMode ? 'text-white' : 'text-[#26463E]'}`}>
            Gostou desta análise científica?
          </h4>
          <p className={`text-xs sm:text-sm max-w-md mx-auto leading-relaxed ${isNightMode ? 'text-[#C7DBD2]' : 'text-[#525753]'}`}>
            Receba nossa newsletter quinzenal gratuita com resumos de pesquisas do PubMed, dicas práticas de suplementação e diretrizes de reposição hormonal.
          </p>
          <button
            onClick={onOpenNewsletterModal || onOpenGuideModal}
            className="inline-flex items-center gap-2 bg-[#26463E] hover:bg-[#1b332d] text-white text-xs sm:text-sm font-semibold px-6 py-3 rounded-xl transition-colors cursor-pointer shadow-xs mt-2"
          >
            <Sparkles className="w-4 h-4 text-[#C96E56]" />
            <span>Assinar Newsletter Gratuita</span>
          </button>
        </div>

        {/* Interactive SEO FAQ Section */}
        {article.faqs && article.faqs.length > 0 && (
          <div className={`mt-14 pt-8 border-t ${isNightMode ? 'border-[#2E423B]' : 'border-[#E3EBE6]'}`}>
            <div className="flex items-center gap-2 mb-6">
              <HelpCircle className="w-5 h-5 text-[#C96E56]" />
              <h3 className={`font-serif text-2xl font-bold ${isNightMode ? 'text-white' : 'text-[#26463E]'}`}>
                Perguntas Frequentes (FAQ)
              </h3>
            </div>
            
            <div className="space-y-3">
              {article.faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className={`rounded-2xl border overflow-hidden transition-all ${
                      isNightMode ? 'bg-[#1D2824] border-[#2E423B]' : 'bg-white border-[#E3EBE6]'
                    }`}
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className={`w-full text-left p-5 flex items-center justify-between gap-4 font-semibold hover:text-[#C96E56] transition-colors cursor-pointer ${
                        isNightMode ? 'text-[#E3ECE7]' : 'text-[#26463E]'
                      }`}
                    >
                      <span className="text-base sm:text-lg font-serif">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 shrink-0 transition-transform duration-200 text-[#58877b] ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className={`px-5 pb-5 text-sm sm:text-base leading-relaxed border-t pt-3 ${
                        isNightMode ? 'border-[#2E423B] text-[#C7DBD2]' : 'border-[#F2F6F4] text-[#525753]'
                      }`}>
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tags */}
        <div className={`mt-10 pt-6 border-t flex flex-wrap items-center gap-2 ${
          isNightMode ? 'border-[#2E423B]' : 'border-[#E3EBE6]'
        }`}>
          <span className="text-xs font-bold text-[#7d837f] uppercase tracking-wider mr-1">
            Tags:
          </span>
          {article.tags.map((tag) => (
            <span
              key={tag}
              className={`text-xs px-3 py-1 rounded-full border ${
                isNightMode ? 'bg-[#1D2824] text-[#C7DBD2] border-[#2E423B]' : 'bg-white text-[#26463E] border-[#E3EBE6]'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Scientific References */}
        {article.references && article.references.length > 0 && (
          <div className={`mt-10 rounded-2xl p-6 border ${
            isNightMode ? 'bg-[#1A2622] border-[#2E423B]' : 'bg-[#F2F6F4] border-[#E3EBE6]'
          }`}>
            <h4 className={`text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-1.5 ${
              isNightMode ? 'text-[#FAEDE7]' : 'text-[#26463E]'
            }`}>
              <BookOpen className="w-3.5 h-3.5 text-[#58877b]" />
              Referências Científicas Consultadas (EEAT)
            </h4>
            <ol className={`text-xs space-y-1.5 list-decimal list-inside ${
              isNightMode ? 'text-[#B8C8C1]' : 'text-[#525753]'
            }`}>
              {article.references.map((ref, idx) => (
                <li key={idx} className="leading-relaxed">
                  {ref}
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Related Reads Section */}
        {relatedArticles.length > 0 && (
          <div className={`mt-14 pt-8 border-t print:hidden ${isNightMode ? 'border-[#2E423B]' : 'border-[#E3EBE6]'}`}>
            <h3 className={`font-serif text-xl sm:text-2xl font-bold mb-6 ${isNightMode ? 'text-white' : 'text-[#26463E]'}`}>
              Leituras Recomendadas
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedArticles.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => { navigate('/artigo/' + rel.slug); window.scrollTo(0,0); }}
                  className={`rounded-2xl p-5 border shadow-xs hover:shadow-md transition-all cursor-pointer group ${
                    isNightMode ? 'bg-[#1D2824] border-[#2E423B]' : 'bg-white border-[#E3EBE6]'
                  }`}
                >
                  <span className="text-[11px] font-bold uppercase text-[#C96E56] block mb-2">
                    {rel.categoryLabel}
                  </span>
                  <h4 className={`font-serif text-base font-bold group-hover:text-[#C96E56] transition-colors mb-2 leading-snug ${
                    isNightMode ? 'text-white' : 'text-[#26463E]'
                  }`}>
                    {rel.title}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-[#7d837f]">
                    <Clock className="w-3 h-3 text-[#58877b]" />
                    <span>{rel.readingTime}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Back to top / Return button */}
        <div className="mt-12 text-center flex flex-col sm:flex-row items-center justify-center gap-4 print:hidden">
          <button
            
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#26463E] text-white text-sm font-semibold px-6 py-3.5 rounded-xl hover:bg-[#1b332d] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar para todos os artigos</span>
          </button>
          
          <button
            onClick={scrollToTop}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 border text-sm font-semibold px-6 py-3.5 rounded-xl transition-colors cursor-pointer ${
              isNightMode 
                ? 'bg-[#1D2824] text-white border-[#2E423B] hover:bg-[#283934]' 
                : 'bg-white text-[#26463E] border-[#E3EBE6] hover:bg-[#E3EBE6]'
            }`}
          >
            <ArrowUp className="w-4 h-4 text-[#58877b]" />
            <span>Voltar ao topo do artigo</span>
          </button>
        </div>
      </article>

      {/* Floating Quick Scroll to Top button on bottom right */}
      {scrollProgress > 25 && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-[#26463E] text-white shadow-xl hover:bg-[#1b332d] transition-all flex items-center justify-center cursor-pointer animate-fadeIn hover:scale-105 print:hidden"
          title="Voltar ao topo"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

