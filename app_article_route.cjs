const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

// Replace ArticleReaderModal import
content = content.replace(
  "import { ArticleReaderModal } from './components/ArticleReaderModal';",
  "import { ArticlePage } from './pages/ArticlePage';"
);

// Remove activeArticle conditional render completely
content = content.replace(
  /\{activeArticle \? \([\s\S]*?<\/>\s*\)}/,
  `<>
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
        </>`
);

content = content.replace("handleReadArticleById(id)", "const art = ARTICLES_DATA.find(a => a.id === id); if (art) navigate('/artigo/' + art.slug);");

fs.writeFileSync('src/App.tsx', content);
