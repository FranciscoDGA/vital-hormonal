const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf-8');

// 1. Add router imports
content = content.replace(
  "import React, { useState, useEffect, useMemo } from 'react';",
  "import React, { useState, useEffect, useMemo } from 'react';\nimport { Routes, Route, useNavigate, useLocation } from 'react-router-dom';\nimport { Helmet } from 'react-helmet-async';"
);

// 2. Add HomePage and BlogPage imports
content = content.replace(
  "import { Navbar } from './components/Navbar';",
  "import { Navbar } from './components/Navbar';\nimport { HomePage } from './pages/HomePage';\nimport { BlogPage } from './pages/BlogPage';"
);

// Remove unused component imports
content = content.replace(/import { HeroSection } from '\.\/components\/HeroSection';\n/, '');
content = content.replace(/import { FeaturedPost } from '\.\/components\/FeaturedPost';\n/, '');
content = content.replace(/import { StarterTracks } from '\.\/components\/StarterTracks';\n/, '');
content = content.replace(/import { InteractiveToolsSection } from '\.\/components\/InteractiveToolsSection';\n/, '');
content = content.replace(/import { ArticleGrid } from '\.\/components\/ArticleGrid';\n/, '');
content = content.replace(/import { LeadMagnetBanner } from '\.\/components\/LeadMagnetBanner';\n/, '');

// 3. Replace useState for currentView with useNavigate
content = content.replace(
  "  const [currentView, setCurrentView] = useState<'home' | 'about' | 'legal' | 'contact' | 'blog'>('home');",
  "  const navigate = useNavigate();\n  const location = useLocation();"
);

// 4. Replace setCurrentView calls
content = content.replace(/setCurrentView\('blog'\)/g, "navigate('/blog')");
content = content.replace(/setCurrentView\('home'\)/g, "navigate('/')");
content = content.replace(/setCurrentView\('about'\)/g, "navigate('/sobre')");
content = content.replace(/setCurrentView\('legal'\)/g, "navigate('/legal')");
content = content.replace(/setCurrentView\('contact'\)/g, "navigate('/contato')");

// 5. Replace view logic with Routes
const mainViewMatch = content.match(/\{currentView === 'home' && \([\s\S]*?\{currentView === 'contact' && \(\s*<ContactPage \/>\s*\)\s*\}/);
if (mainViewMatch) {
  const routesStr = `
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
                onReadArticle={setActiveArticle}
                savedArticleIds={savedArticleIds}
                onToggleSave={toggleSaveArticle}
                onSelectTrack={handleSelectTrack}
                onReadArticleById={handleReadArticleById}
                onOpenProteinCalculator={() => setIsProteinCalcOpen(true)}
                onOpenLabExamsGlossary={() => {
                  setLabGlossaryInitialExam(undefined);
                  setIsLabGlossaryOpen(true);
                }}
                onOpenDoctorChecklist={() => setIsDoctorChecklistOpen(true)}
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
                onReadArticle={setActiveArticle}
                savedArticleIds={savedArticleIds}
                onToggleSave={toggleSaveArticle}
              />
            } />
            <Route path="/sobre" element={<AboutPage onOpenGuideModal={() => setIsFreeMaterialsOpen(true)} />} />
            <Route path="/legal" element={<LegalPage initialTab={legalModalTab} />} />
            <Route path="/contato" element={<ContactPage />} />
          </Routes>`;
  
  content = content.replace(mainViewMatch[0], routesStr);
}

// 6. Fix Navbar props
content = content.replace(
  /onSelectCategory=\{\(cat\) => \{[\s\S]*?navigate\('\/'\);\s*\}\}/,
  `onSelectHome={() => {\n              navigate('/');\n              window.scrollTo(0, 0);\n            }}\n            onSelectBlog={(cat) => {\n              if (cat) setSelectedCategory(cat);\n              else setSelectedCategory('todos');\n              navigate('/blog');\n              window.scrollTo(0, 0);\n            }}`
);
content = content.replace(
  /onOpenContactModal=\{\(\) => \{\s*navigate\('\/contato'\);\s*window\.scrollTo\(0, 0\);\s*\}\}/,
  `onSelectContact={() => {\n              navigate('/contato');\n              window.scrollTo(0, 0);\n            }}`
);

fs.writeFileSync('src/App.tsx', content);
