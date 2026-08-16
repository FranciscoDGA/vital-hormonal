import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Menu, 
  X, 
  Search, 
  BookOpen, 
  Heart, 
  ArrowRight, 
  FolderDown,
  Dumbbell,
  FileText,
  Stethoscope,
  Pill,
  ChevronDown,
  Wrench
} from 'lucide-react';
import { CategoryType } from '../types';

interface NavbarProps {
  onSelectCategory: (category: CategoryType) => void;
  onOpenGuideModal: () => void;
  onOpenSearch: () => void;
  onOpenAssessment: () => void;
  savedCount: number;
  onOpenSavedArticles: () => void;
  onOpenAboutModal?: () => void;
  onOpenFreeMaterials?: () => void;
  onOpenNewsletterModal?: () => void;
  onOpenProteinCalculator?: () => void;
  onOpenLabExamsGlossary?: () => void;
  onOpenDoctorChecklist?: () => void;
  onOpenSupplementGuide?: () => void;
  onSelectHome: () => void;
  onSelectBlog: (category?: CategoryType) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onSelectCategory,
  onOpenGuideModal,
  onOpenSearch,
  onOpenAssessment,
  savedCount,
  onOpenSavedArticles,
  onOpenAboutModal,
  onOpenFreeMaterials,
  onOpenNewsletterModal,
  onOpenProteinCalculator,
  onOpenLabExamsGlossary,
  onOpenDoctorChecklist,
  onOpenSupplementGuide,
  onOpenContactModal,
  onSelectHome,
  onSelectBlog,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { label: string; category?: CategoryType; isAction?: 'home' | 'about' | 'contact' | 'blog' | 'tools' }[] = [
    { label: 'Home', isAction: 'home' },
    { label: 'Sobre Nós', isAction: 'about' },
    { label: 'Blog', category: 'todos' },
    { label: 'Contato', isAction: 'contact' },
  ];

  const dropdownLinks: { label: string; category?: CategoryType; isAction?: 'tools' }[] = [
    { label: 'Sintomas', category: 'sintomas' },
    { label: 'Nutrição', category: 'nutricao' },
    { label: 'Hormônios 35+', category: 'hormonios' },
    { label: 'Ferramentas 40+', isAction: 'tools' },
  ];

  const handleLinkClick = (item: typeof navLinks[0]) => {
    setMobileMenuOpen(false);
    if (item.isAction === 'home') {
      onSelectHome();
    } else if (item.category) {
      onSelectBlog(item.category);
    } else if (item.isAction === 'tools') {
      const target = document.getElementById('ferramentas-section');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (item.isAction === 'about') {
      if (onOpenAboutModal) {
        onOpenAboutModal();
      }
    } else if (item.isAction === 'contact') {
      if (onOpenContactModal) {
        onOpenContactModal();
      }
    }
  };

  return (
    <header
      id="main-header"
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-[#E3EBE6]'
          : 'bg-white border-b border-[#E3EBE6]'
      }`}
    >
      {/* Top micro announcement bar */}
      <div className="bg-[#26463E] text-[#E3EBE6] text-xs py-1.5 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-[#C96E56] animate-pulse"></span>
        <span className="text-[11px] sm:text-xs">Central de Materiais: Baixe o Checklist & Tabela de Suplementação</span>
        <button
          onClick={onOpenFreeMaterials || onOpenGuideModal}
          className="underline text-white font-semibold hover:text-[#FAEDE7] transition-colors ml-1 cursor-pointer text-[11px] sm:text-xs"
        >
          Acessar Grátis
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          {/* Logo */}
          <div
            id="brand-logo"
            onClick={onSelectHome}
            className="flex flex-col cursor-pointer group select-none"
          >
            <div className="flex items-center gap-2.5">
              <span className="font-serif text-2xl font-bold tracking-tight text-[#26463E] leading-none">
                Vital Hormonal
              </span>
            </div>
            <span className="text-[10px] uppercase tracking-widest text-[#26463E] opacity-70 font-semibold mt-1">
              Saúde Funcional & Longevidade
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-5 text-sm font-medium text-[#2D312E]">
            {navLinks.map((item) => (
              <React.Fragment key={item.label}>
                {item.label === 'Blog' ? (
                  <div 
                    className="relative group"
                    onMouseEnter={() => setToolsDropdownOpen(true)}
                    onMouseLeave={() => setToolsDropdownOpen(false)}
                  >
                    <button 
                      onClick={() => handleLinkClick(item)}
                      className="flex items-center gap-1 hover:text-[#C96E56] transition-colors cursor-pointer py-2"
                    >
                      <span>Blog / Assuntos</span>
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                    
                    {toolsDropdownOpen && (
                      <div className="absolute top-full left-0 w-48 bg-white border border-[#E3EBE6] shadow-xl rounded-xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
                        {dropdownLinks.map((dropdownItem) => (
                          <button
                            key={dropdownItem.label}
                            onClick={() => {
                              handleLinkClick(dropdownItem as any);
                              setToolsDropdownOpen(false);
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-[#2D312E] hover:bg-[#F2F6F4] hover:text-[#C96E56] transition-colors"
                          >
                            {dropdownItem.isAction === 'tools' && <Wrench className="w-3.5 h-3.5 inline mr-1.5 text-[#C96E56]" />}
                            {dropdownItem.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    id={`nav-${item.label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                    onClick={() => handleLinkClick(item)}
                    className="hover:text-[#C96E56] transition-colors cursor-pointer"
                  >
                    <span>{item.label}</span>
                  </button>
                )}
              </React.Fragment>
            ))}
          </nav>

          {/* Right Action Icons & Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Quick Search Button */}
            <button
              id="search-trigger-btn"
              onClick={onOpenSearch}
              aria-label="Buscar artigos e sintomas"
              className="p-2 hover:bg-[#F9F7F2] rounded-full text-[#2D312E] hover:text-[#26463E] transition-colors cursor-pointer"
              title="Buscar sintomas ou artigos"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Saved articles bookmark icon */}
            <button
              id="saved-articles-btn"
              onClick={onOpenSavedArticles}
              aria-label="Artigos salvos"
              className="p-2 hover:bg-[#F9F7F2] rounded-full text-[#2D312E] hover:text-[#26463E] transition-colors relative cursor-pointer"
              title="Leituras salvas"
            >
              <Heart className="w-5 h-5" />
              {savedCount > 0 && (
                <span className="absolute top-0 right-0 bg-[#C96E56] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Quiz / Symptom assessment button */}
            <button
              id="btn-self-assessment"
              onClick={onOpenAssessment}
              className="text-xs font-semibold text-[#26463E] bg-[#E3EBE6] hover:bg-[#c2d5cd] px-3.5 py-2 rounded-full transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#26463E]" />
              <span>Autoavaliação</span>
            </button>

            {/* Primary CTA Button */}
            <button
              id="header-cta-guia"
              onClick={onOpenFreeMaterials || onOpenGuideModal}
              className="bg-[#C96E56] hover:bg-[#b55c45] text-white text-sm font-semibold px-4.5 py-2 rounded-full shadow-xs transition-all duration-200 flex items-center gap-2 cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>Materiais Grátis</span>
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              id="mobile-search-btn"
              onClick={onOpenSearch}
              aria-label="Buscar"
              className="p-2 rounded-lg text-[#2D312E] hover:bg-[#E3EBE6]/70 transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
              className="p-2 rounded-lg text-[#26463E] hover:bg-[#E3EBE6] transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="lg:hidden bg-[#F9F7F2] border-b border-[#E3EBE6] px-4 pt-3 pb-6 space-y-3 shadow-lg animate-in slide-in-from-top-2 duration-200"
        >
          <div className="space-y-1">
            {navLinks.map((item) => (
              <React.Fragment key={item.label}>
                <button
                  onClick={() => handleLinkClick(item as any)}
                  className="w-full text-left py-2.5 px-3 rounded-lg text-[#2D312E] hover:text-[#26463E] hover:bg-[#E3EBE6] font-medium text-base transition-colors flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  <ArrowRight className="w-4 h-4 text-[#58877b]" />
                </button>
                {item.label === 'Blog' && dropdownLinks.map((dropdownItem) => (
                  <button
                    key={dropdownItem.label}
                    onClick={() => handleLinkClick(dropdownItem as any)}
                    className="w-full text-left py-2 px-3 pl-8 rounded-lg text-[#525753] hover:text-[#C96E56] hover:bg-[#F2F6F4] font-medium text-sm transition-colors flex items-center justify-between"
                  >
                    <span>{dropdownItem.isAction === 'tools' && <Wrench className="w-3.5 h-3.5 inline mr-1.5 text-[#C96E56]" />}{dropdownItem.label}</span>
                  </button>
                ))}
              </React.Fragment>
            ))}
          </div>

          <div className="pt-3 border-t border-[#E3EBE6] space-y-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenFreeMaterials) onOpenFreeMaterials();
                else onOpenGuideModal();
              }}
              className="w-full py-3 px-4 rounded-xl bg-[#C96E56] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-xs"
            >
              <BookOpen className="w-4 h-4" />
              <span>Acessar Todos os Materiais Gratuitos</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAssessment();
              }}
              className="w-full py-2.5 px-3 rounded-xl bg-[#E3EBE6] text-[#26463E] font-medium text-sm flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#26463E]" />
              <span>Fazer Autoavaliação de Sintomas</span>
            </button>

            {savedCount > 0 && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSavedArticles();
                }}
                className="w-full py-2 px-3 text-center text-xs text-[#58877b] hover:text-[#26463E] font-medium"
              >
                Ver {savedCount} {savedCount === 1 ? 'artigo salvo' : 'artigos salvos'}
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
