export type CategoryType = 
  | 'todos'
  | 'sintomas'
  | 'nutricao'
  | 'hormonios'
  | 'rotinas'
  | 'longevidade';

export interface Author {
  name: string;
  role: string;
  avatarUrl: string;
  crmOrBio?: string;
}

export interface ArticleFaq {
  question: string;
  answer: string;
}

export interface MedicalReviewer {
  name: string;
  title: string;
  crmOrRole: string;
  reviewDate: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  content: string[]; // Formatted paragraphs & sections
  category: CategoryType;
  categoryLabel: string;
  readingTime: string;
  publishedAt: string;
  imageUrl: string;
  author: Author;
  featured?: boolean;
  tags: string[];
  keyTakeaways: string[];
  references?: string[];
  suggestedAction?: string;
  faqs?: ArticleFaq[];
  medicalReviewer?: MedicalReviewer;
  metaDescription?: string;
}

export interface QuickTrack {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  symptoms: string[];
  categoryFilter: CategoryType;
  recommendedArticleId: string;
  colorScheme: 'sage' | 'terracotta' | 'mint';
}
