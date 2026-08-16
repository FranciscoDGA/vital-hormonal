import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { FeaturedPost } from '../components/FeaturedPost';
import { StarterTracks } from '../components/StarterTracks';
import { InteractiveToolsSection } from '../components/InteractiveToolsSection';
import { LeadMagnetBanner } from '../components/LeadMagnetBanner';
import { Article, CategoryType, QuickTrack } from '../types';

interface HomePageProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSubmitSearch: () => void;
  onSymptomSelect: (symptom: string) => void;
  onOpenAssessment: () => void;
  onOpenGuideModal: () => void;
  featuredArticle: Article;
  onReadArticle: (article: Article) => void;
  savedArticleIds: string[];
  onToggleSave: (id: string) => void;
  onSelectTrack: (track: QuickTrack) => void;
  
  onReadArticleById: (id: string) => void;
  onOpenProteinCalculator: () => void;
  onOpenLabExamsGlossary: () => void;
  onOpenDoctorChecklist: () => void;
  onOpenSupplementGuide: () => void;
  selectedCategory: string;
}

export const HomePage: React.FC<HomePageProps> = (props) => {
  return (
    <main className="flex-1">
      <HeroSection
        searchQuery={props.searchQuery}
        onSearchChange={props.onSearchChange}
        onSubmitSearch={props.onSubmitSearch}
        onSymptomSelect={props.onSymptomSelect}
        onOpenAssessment={props.onOpenAssessment}
        onOpenGuideModal={props.onOpenGuideModal}
      />

      {props.searchQuery === '' && props.selectedCategory === 'todos' && (
        <FeaturedPost
          article={props.featuredArticle}
          onReadArticle={props.onReadArticle}
          isSaved={props.savedArticleIds.includes(props.featuredArticle.id)}
          onToggleSave={props.onToggleSave}
        />
      )}

      <StarterTracks
        onSelectTrack={props.onSelectTrack}
        onReadArticleById={props.onReadArticleById}
      />

      <div id="ferramentas-section">
        <InteractiveToolsSection
          onOpenProteinCalculator={props.onOpenProteinCalculator}
          onOpenLabExamsGlossary={props.onOpenLabExamsGlossary}
          onOpenDoctorChecklist={props.onOpenDoctorChecklist}
          onOpenSupplementGuide={props.onOpenSupplementGuide}
          onOpenAssessment={props.onOpenAssessment}
        />
      </div>

      <LeadMagnetBanner
        onOpenModal={props.onOpenGuideModal}
        onOpenFreeMaterials={props.onOpenGuideModal}
      />
    </main>
  );
};
