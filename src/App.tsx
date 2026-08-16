import React, { useState, useEffect, useMemo } from 'react';
import { ARTICLES_DATA } from './data/articles';
import { Article, CategoryType, QuickTrack } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeaturedPost } from './components/FeaturedPost';
import { StarterTracks } from './components/StarterTracks';
import { InteractiveToolsSection } from './components/InteractiveToolsSection';
import { ArticleGrid } from './components/ArticleGrid';
import { LeadMagnetBanner } from './components/LeadMagnetBanner';
import { ArticleReaderModal } from './components/ArticleReaderModal';
import { LeadMagnetModal } from './components/LeadMagnetModal';
import { FreeMaterialsModal } from './components/FreeMaterialsModal';
import { AdminLeadsModal } from './components/AdminLeadsModal';
import { SymptomAssessmentModal } from './components/SymptomAssessmentModal';
import { SearchModal } from './components/SearchModal';
import { SavedArticlesDrawer } from './components/SavedArticlesDrawer';
import { NewsletterModal } from './components/NewsletterModal';
import { ProteinCalculatorModal } from './components/ProteinCalculatorModal';
import { LabExamsGlossaryModal } from './components/LabExamsGlossaryModal';
import { DoctorVisitChecklistModal } from './components/DoctorVisitChecklistModal';
import { SupplementGuideModal } from './components/SupplementGuideModal';
import { SeoStructuredData } from './components/SeoStructuredData';
import { Footer } from './components/Footer';
import { AboutPage } from './components/AboutPage';
import { LegalPage } from './components/LegalPage';
import { ContactModal } from './components/ContactModal';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  
  // Modals & Drawers state
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);
  const [isFreeMaterialsOpen, setIsFreeMaterialsOpen] = useState(false);
  const [isAdminLeadsOpen, setIsAdminLeadsOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isAssessmentModalOpen, setIsAssessmentModalOpen] = useState(false);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);

  // View state for separate pages (Sobre, Legal)
  const [currentView, setCurrentView] = useState<'home' | 'about' | 'legal'>('home');
  const [legalModalTab, setLegalModalTab] = useState<'privacy' | 'terms' | 'lgpd'>('privacy');
  
  // 4 Interactive High-Authority Clinical Modals
  const [isProteinCalcOpen, setIsProteinCalcOpen] = useState(false);
  const [isLabGlossaryOpen, setIsLabGlossaryOpen] = useState(false);
  const [isDoctorChecklistOpen, setIsDoctorChecklistOpen] = useState(false);
  const [isSupplementGuideOpen, setIsSupplementGuideOpen] = useState(false);
  const [labGlossaryInitialExam, setLabGlossaryInitialExam] = useState<string | undefined>(undefined);
  
  // New Modals
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Auto-trigger Newsletter pop-up after 22 seconds for first-time / non-subscribed visitors
  useEffect(() => {
    try {
      const isSubscribed = localStorage.getItem('vital_hormonal_newsletter_subscribed');
      const dismissedUntil = localStorage.getItem('vital_hormonal_newsletter_dismissed_until');
      
      if (isSubscribed === 'true') return;
      if (dismissedUntil && Number(dismissedUntil) > Date.now()) return;

      const timer = setTimeout(() => {
        setIsNewsletterOpen(true);
      }, 22000);

      return () => clearTimeout(timer);
    } catch {
      // ignore
    }
  }, []);

  // Keyboard shortcut for Admin Leads Panel (Ctrl + Shift + L)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'L') {
        e.preventDefault();
        setIsAdminLeadsOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Saved/Bookmarked articles with local storage persistence
  const [savedArticleIds, setSavedArticleIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('vital_hormonal_saved_articles');
      return saved ? JSON.parse(saved) : ['art-1'];
    } catch {
      return ['art-1'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('vital_hormonal_saved_articles', JSON.stringify(savedArticleIds));
    } catch {
      // ignore
    }
  }, [savedArticleIds]);

  const toggleSaveArticle = (articleId: string) => {
    setSavedArticleIds((prev) =>
      prev.includes(articleId) ? prev.filter((id) => id !== articleId) : [...prev, articleId]
    );
  };

  const handleClearSaved = () => {
    setSavedArticleIds([]);
  };

  // Filter articles based on category and search query
  const filteredArticles = useMemo(() => {
    return ARTICLES_DATA.filter((art) => {
      const matchesCategory =
        selectedCategory === 'todos' || art.category === selectedCategory;

      const matchesSearch =
        !searchQuery.trim() ||
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        art.keyTakeaways.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Featured article is art-1 or first matching
  const featuredArticle = useMemo(() => {
    return ARTICLES_DATA.find((a) => a.featured) || ARTICLES_DATA[0];
  }, []);

  // Saved articles list
  const savedArticlesList = useMemo(() => {
    return ARTICLES_DATA.filter((a) => savedArticleIds.includes(a.id));
  }, [savedArticleIds]);

  const handleSelectTrack = (track: QuickTrack) => {
    setSelectedCategory(track.categoryFilter);
    const targetArticle = ARTICLES_DATA.find((a) => a.id === track.recommendedArticleId);
    if (targetArticle) {
      setActiveArticle(targetArticle);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const target = document.getElementById('artigos-section');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleReadArticleById = (id: string) => {
    const target = ARTICLES_DATA.find((a) => a.id === id);
    if (target) {
      setActiveArticle(target);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSymptomSelect = (tag: string) => {
    setSearchQuery(tag);
    const target = document.getElementById('artigos-section');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFAF7] text-[#2D312E] flex flex-col font-sans selection:bg-[#FAEDE7] selection:text-[#26463E]">
      {/* Rich JSON-LD SEO Structured Data for Google and Generative AI Search Engines */}
      <SeoStructuredData article={activeArticle} />

      {/* Dynamic View: Active Full Article or Main Index Portal */}
      {activeArticle ? (
        <ArticleReaderModal
          article={activeArticle}
          onClose={() => setActiveArticle(null)}
          savedArticleIds={savedArticleIds}
          onToggleSave={toggleSaveArticle}
          onSelectArticle={(art) => {
            setActiveArticle(art);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenGuideModal={() => setIsFreeMaterialsOpen(true)}
          onOpenNewsletterModal={() => setIsNewsletterOpen(true)}
          onOpenProteinCalculator={() => setIsProteinCalcOpen(true)}
          onOpenLabExamsGlossary={() => {
            setLabGlossaryInitialExam(undefined);
            setIsLabGlossaryOpen(true);
          }}
          onOpenDoctorChecklist={() => setIsDoctorChecklistOpen(true)}
          onOpenSupplementGuide={() => setIsSupplementGuideOpen(true)}
        />
      ) : (
        /* Main Portal View */
        <>
          {/* Header / Navbar */}
          <Navbar
            onSelectCategory={(cat) => {
              setSelectedCategory(cat);
              setCurrentView('home');
            }}
            onOpenGuideModal={() => setIsFreeMaterialsOpen(true)}
            onOpenSearch={() => setIsSearchModalOpen(true)}
            onOpenAssessment={() => setIsAssessmentModalOpen(true)}
            savedCount={savedArticleIds.length}
            onOpenSavedArticles={() => setIsSavedDrawerOpen(true)}
            onOpenAboutModal={() => {
              setCurrentView('about');
              window.scrollTo(0, 0);
            }}
            onOpenFreeMaterials={() => setIsFreeMaterialsOpen(true)}
            onOpenNewsletterModal={() => setIsNewsletterOpen(true)}
            onOpenProteinCalculator={() => setIsProteinCalcOpen(true)}
            onOpenLabExamsGlossary={() => {
              setLabGlossaryInitialExam(undefined);
              setIsLabGlossaryOpen(true);
            }}
            onOpenDoctorChecklist={() => setIsDoctorChecklistOpen(true)}
            onOpenSupplementGuide={() => setIsSupplementGuideOpen(true)}
            onOpenContactModal={() => setIsContactModalOpen(true)}
          />

          {currentView === 'home' && (
            <main className="flex-1">
              {/* 1. Hero Section (Acolhimento & Propósito com busca de sintomas) */}
              <HeroSection
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onSymptomSelect={handleSymptomSelect}
                onOpenAssessment={() => setIsAssessmentModalOpen(true)}
                onOpenGuideModal={() => setIsFreeMaterialsOpen(true)}
              />

              {/* 2. Featured Post (Destaque Editorial da Semana) */}
              {searchQuery === '' && selectedCategory === 'todos' && (
                <FeaturedPost
                  article={featuredArticle}
                  onReadArticle={setActiveArticle}
                  isSaved={savedArticleIds.includes(featuredArticle.id)}
                  onToggleSave={toggleSaveArticle}
                />
              )}

              {/* 3. Por Onde Começar (Trilhas Rápidas de Leitura) */}
              <StarterTracks
                onSelectTrack={handleSelectTrack}
                onReadArticleById={handleReadArticleById}
              />

              {/* 4. Seção de Ferramentas & Calculadoras Clínicas Interativas (SEO / E-E-A-T) */}
              <div id="ferramentas-section">
                <InteractiveToolsSection
                  onOpenProteinCalculator={() => setIsProteinCalcOpen(true)}
                  onOpenLabExamsGlossary={() => {
                    setLabGlossaryInitialExam(undefined);
                    setIsLabGlossaryOpen(true);
                  }}
                  onOpenDoctorChecklist={() => setIsDoctorChecklistOpen(true)}
                  onOpenSupplementGuide={() => setIsSupplementGuideOpen(true)}
                  onOpenAssessment={() => setIsAssessmentModalOpen(true)}
                />
              </div>

              {/* 5. Grid de Artigos Recentes / Por Sintomas */}
              <ArticleGrid
                articles={filteredArticles}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                searchQuery={searchQuery}
                onClearSearch={() => setSearchQuery('')}
                onReadArticle={setActiveArticle}
                savedArticleIds={savedArticleIds}
                onToggleSave={toggleSaveArticle}
              />

              {/* 6. Banner de Conversão / Isca Digital (Lead Magnet) */}
              <LeadMagnetBanner
                onOpenModal={() => setIsGuideModalOpen(true)}
                onOpenFreeMaterials={() => setIsFreeMaterialsOpen(true)}
              />
            </main>
          )}

          {currentView === 'about' && (
            <AboutPage onOpenGuideModal={() => setIsFreeMaterialsOpen(true)} />
          )}

          {currentView === 'legal' && (
            <LegalPage initialTab={legalModalTab} />
          )}
        </>
      )}

      {/* Complete Semantic Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setActiveArticle(null);
          setSelectedCategory(cat);
          setCurrentView('home');
          setTimeout(() => {
            document.getElementById('artigos-section')?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }}
        onOpenGuideModal={() => setIsGuideModalOpen(true)}
        onOpenFreeMaterials={() => setIsFreeMaterialsOpen(true)}
        onOpenAssessment={() => setIsAssessmentModalOpen(true)}
        onOpenAboutModal={() => {
          setCurrentView('about');
          window.scrollTo(0, 0);
        }}
        onOpenAdminLeads={() => setIsAdminLeadsOpen(true)}
        onOpenNewsletterModal={() => setIsNewsletterOpen(true)}
        onOpenProteinCalculator={() => setIsProteinCalcOpen(true)}
        onOpenLabExamsGlossary={() => {
          setLabGlossaryInitialExam(undefined);
          setIsLabGlossaryOpen(true);
        }}
        onOpenDoctorChecklist={() => setIsDoctorChecklistOpen(true)}
        onOpenSupplementGuide={() => setIsSupplementGuideOpen(true)}
        onOpenLegalModal={(tab) => {
          setLegalModalTab(tab);
          setCurrentView('legal');
          window.scrollTo(0, 0);
        }}
        onOpenContactModal={() => setIsContactModalOpen(true)}
      />

      {/* Global Modals & Drawers */}
      <NewsletterModal
        isOpen={isNewsletterOpen}
        onClose={() => setIsNewsletterOpen(false)}
      />

      <FreeMaterialsModal
        isOpen={isFreeMaterialsOpen}
        onClose={() => setIsFreeMaterialsOpen(false)}
      />

      <AdminLeadsModal
        isOpen={isAdminLeadsOpen}
        onClose={() => setIsAdminLeadsOpen(false)}
      />

      <LeadMagnetModal
        isOpen={isGuideModalOpen}
        onClose={() => setIsGuideModalOpen(false)}
        onOpenFreeMaterials={() => {
          setIsGuideModalOpen(false);
          setIsFreeMaterialsOpen(true);
        }}
      />

      <SymptomAssessmentModal
        isOpen={isAssessmentModalOpen}
        onClose={() => setIsAssessmentModalOpen(false)}
        onReadArticle={(art) => {
          setActiveArticle(art);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenGuideModal={() => setIsFreeMaterialsOpen(true)}
      />

      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onSelectArticle={(art) => {
          setActiveArticle(art);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      <SavedArticlesDrawer
        isOpen={isSavedDrawerOpen}
        onClose={() => setIsSavedDrawerOpen(false)}
        savedArticles={savedArticlesList}
        onReadArticle={(art) => {
          setActiveArticle(art);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onRemoveSaved={toggleSaveArticle}
        onClearAll={handleClearSaved}
      />

      {/* 4 Interactive Clinical Tools Modals */}
      <ProteinCalculatorModal
        isOpen={isProteinCalcOpen}
        onClose={() => setIsProteinCalcOpen(false)}
        onReadArticleById={(id) => {
          setIsProteinCalcOpen(false);
          handleReadArticleById(id);
        }}
        onOpenMaterials={() => {
          setIsProteinCalcOpen(false);
          setIsFreeMaterialsOpen(true);
        }}
      />

      <LabExamsGlossaryModal
        isOpen={isLabGlossaryOpen}
        onClose={() => {
          setIsLabGlossaryOpen(false);
          setLabGlossaryInitialExam(undefined);
        }}
        initialExamId={labGlossaryInitialExam}
        onReadArticleById={(id) => {
          setIsLabGlossaryOpen(false);
          handleReadArticleById(id);
        }}
        onOpenDoctorChecklist={() => {
          setIsLabGlossaryOpen(false);
          setIsDoctorChecklistOpen(true);
        }}
      />

      <DoctorVisitChecklistModal
        isOpen={isDoctorChecklistOpen}
        onClose={() => setIsDoctorChecklistOpen(false)}
        onOpenLabExams={(examId) => {
          setIsDoctorChecklistOpen(false);
          setLabGlossaryInitialExam(examId);
          setIsLabGlossaryOpen(true);
        }}
      />

      <SupplementGuideModal
        isOpen={isSupplementGuideOpen}
        onClose={() => setIsSupplementGuideOpen(false)}
        onReadArticleById={(id) => {
          setIsSupplementGuideOpen(false);
          handleReadArticleById(id);
        }}
        onOpenMaterials={() => {
          setIsSupplementGuideOpen(false);
          setIsFreeMaterialsOpen(true);
        }}
      />

      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </div>
  );
}
