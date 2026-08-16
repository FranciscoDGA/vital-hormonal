import React, { useState, useEffect, useMemo } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ARTICLES_DATA } from './data/articles';
import { Article, CategoryType, QuickTrack } from './types';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { BlogPage } from './pages/BlogPage';
import { HeroSection } from './components/HeroSection';
import { FeaturedPost } from './components/FeaturedPost';
import { StarterTracks } from './components/StarterTracks';
import { InteractiveToolsSection } from './components/InteractiveToolsSection';
import { ArticleGrid } from './components/ArticleGrid';
import { LeadMagnetBanner } from './components/LeadMagnetBanner';
import { ArticlePage } from './pages/ArticlePage';
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
import { ContactPage } from './components/ContactPage';

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

  // View state for separate pages (Sobre, Legal, Contato)
  const navigate = useNavigate();
  const location = useLocation();
  const [legalModalTab, setLegalModalTab] = useState<'privacy' | 'terms' | 'lgpd'>('privacy');
  
  // 4 Interactive High-Authority Clinical Modals
  const [isProteinCalcOpen, setIsProteinCalcOpen] = useState(false);
  const [isLabGlossaryOpen, setIsLabGlossaryOpen] = useState(false);
  const [isDoctorChecklistOpen, setIsDoctorChecklistOpen] = useState(false);
  const [isSupplementGuideOpen, setIsSupplementGuideOpen] = useState(false);
  const [labGlossaryInitialExam, setLabGlossaryInitialExam] = useState<string | undefined>(undefined);

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
    navigate('/blog');
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-[#FDFAF7] text-[#2D312E] flex flex-col font-sans selection:bg-[#FAEDE7] selection:text-[#26463E]">
      {/* Rich JSON-LD SEO Structured Data for Google and Generative AI Search Engines */}
      <SeoStructuredData article={activeArticle} />

      {/* Dynamic View: Active Full Article or Main Index Portal */}
      <>
          {/* Header / Navbar */}
          <Navbar
            onSelectHome={() => {
              navigate('/');
              window.scrollTo(0, 0);
            }}
            onSelectBlog={(cat) => {
              if (cat) setSelectedCategory(cat);
              else setSelectedCategory('todos');
              navigate('/blog');
              window.scrollTo(0, 0);
            }}
            onOpenGuideModal={() => setIsFreeMaterialsOpen(true)}
            onOpenSearch={() => setIsSearchModalOpen(true)}
            onOpenAssessment={() => setIsAssessmentModalOpen(true)}
            savedCount={savedArticleIds.length}
            onOpenSavedArticles={() => setIsSavedDrawerOpen(true)}
            onOpenAboutModal={() => {
              navigate('/sobre');
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
            onSelectContact={() => {
              navigate('/contato');
              window.scrollTo(0, 0);
            }}
          />

          <Routes>
            <Route path="/" element={
              <HomePage
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onSubmitSearch={() => {
                  navigate('/blog');
                  window.scrollTo(0, 0);
                }}
                onSymptomSelect={handleSymptomSelect}
                onOpenAssessment={() => setIsAssessmentModalOpen(true)}
                onOpenGuideModal={() => setIsFreeMaterialsOpen(true)}
                featuredArticle={featuredArticle}
                onReadArticle={(art) => navigate('/artigo/' + art.slug)}
                savedArticleIds={savedArticleIds}
                onToggleSave={toggleSaveArticle}
                onSelectTrack={handleSelectTrack}
                onReadArticleById={handleReadArticleById}
                onOpenProteinCalculator={() => setIsProteinCalcOpen(true)}
                onOpenDoctorChecklist={() => setIsDoctorChecklistOpen(true)}
                onOpenLabExamsGlossary={() => {
                  setLabGlossaryInitialExam(undefined);
                  setIsLabGlossaryOpen(true);
                }}
                onOpenSupplementGuide={() => setIsSupplementGuideOpen(true)}
                selectedCategory={selectedCategory}
              />
            } />
            <Route path="/blog" element={
              <BlogPage
                filteredArticles={filteredArticles}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                searchQuery={searchQuery}
                onClearSearch={() => setSearchQuery('')}
                onReadArticle={(art) => navigate('/artigo/' + art.slug)}
                savedArticleIds={savedArticleIds}
                onToggleSave={toggleSaveArticle}
              />
            } />
            <Route path="/artigo/:slug" element={
              <ArticlePage
                savedArticleIds={savedArticleIds}
                onToggleSave={toggleSaveArticle}
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
            } />
            <Route path="/sobre" element={<AboutPage onOpenGuideModal={() => setIsFreeMaterialsOpen(true)} />} />
            <Route path="/legal" element={<LegalPage initialTab={legalModalTab} />} />
            <Route path="/contato" element={<ContactPage />} />
          </Routes>
        </>

      {/* Complete Semantic Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setActiveArticle(null);
          setSelectedCategory(cat);
          navigate('/blog');
          window.scrollTo(0, 0);
        }}
        onOpenGuideModal={() => setIsGuideModalOpen(true)}
        onOpenFreeMaterials={() => setIsFreeMaterialsOpen(true)}
        onOpenAssessment={() => setIsAssessmentModalOpen(true)}
        onOpenAboutModal={() => {
          navigate('/sobre');
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
          navigate('/legal');
          window.scrollTo(0, 0);
        }}
        onOpenContactModal={() => {
          navigate('/contato');
          window.scrollTo(0, 0);
        }}
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
          const art = ARTICLES_DATA.find(a => a.id === id); if (art) navigate('/artigo/' + art.slug);;
        }}
      />

      <LabExamsGlossaryModal
        isOpen={isLabGlossaryOpen}
        onClose={() => {
          setIsLabGlossaryOpen(false);
          setLabGlossaryInitialExam(undefined);
        }}
        onReadArticleById={(id) => {
          setIsLabGlossaryOpen(false);
          handleReadArticleById(id);
        }}
      />

      <DoctorVisitChecklistModal
        isOpen={isDoctorChecklistOpen}
        onClose={() => setIsDoctorChecklistOpen(false)}
      />

      <SupplementGuideModal
        isOpen={isSupplementGuideOpen}
        onClose={() => setIsSupplementGuideOpen(false)}
        onReadArticleById={(id) => {
          setIsSupplementGuideOpen(false);
          handleReadArticleById(id);
        }}
      />
    </div>
  );
}
