export type SearchIntent = 'Informational' | 'Commercial' | 'Transactional' | 'Navigational';
export type PageType = 'Home' | 'Category' | 'Article' | 'Calculator' | 'Author' | 'Utility' | 'Legal';
export type Jurisdiction = 'US' | 'India' | 'Global / Universal';

export interface Author {
  id: string;
  slug: string;
  name: string;
  role: string;
  credentials: string[];
  bio: string;
  avatar?: string;
  reviewedTopics: string[];
  yearsExperience?: number;
}

export interface ExternalReference {
  title: string;
  sourceName: string;
  url: string;
  year?: string;
  isGovernmentOrRegulator?: boolean;
}

export interface ImageMetadata {
  src: string;
  webpSrc?: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  attribution?: string;
}

export interface TocItem {
  id: string;
  title: string;
  level: 2 | 3;
}

export interface ArticleSection {
  type: 'paragraph' | 'h2' | 'h3' | 'blockquote' | 'list' | 'table' | 'callout' | 'formula';
  id?: string;
  content?: string;
  authorQuote?: string;
  items?: string[];
  formulaData?: {
    latexFormula: string;
    explanation: string;
    variables: { symbol: string; label: string; meaning: string }[];
  };
  tableData?: {
    headers: string[];
    rows: (string | number)[][];
    caption?: string;
  };
  calloutType?: 'info' | 'warning' | 'tip' | 'stat';
  image?: ImageMetadata;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Article {
  id: string;
  slug: string;
  categorySlug: string;
  title: string;
  h1Title?: string;
  titleTag: string;
  metaDescription: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  searchIntent: SearchIntent;
  targetAudience: string;
  excerpt: string;
  category: string;
  tags: string[];
  author: Author;
  datePublished: string;
  dateModified: string;
  readingTime: string;
  featured?: boolean;
  jurisdiction: Jurisdiction;
  tableOfContents: TocItem[];
  sections: ArticleSection[];
  relatedSlugs: string[];
  faqs?: FAQItem[];
  disclaimer?: string;
  externalReferences?: ExternalReference[];
  heroImage?: ImageMetadata;
}

export interface LearningCategory {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  seoTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  searchIntent: SearchIntent;
  targetAudience: string;
  iconName: string;
  curriculumOverview: string[];
  articleSlugs: string[];
}

export interface PageRegistryItem {
  url: string;
  pageType: PageType;
  title: string;
  h1Title: string;
  primaryKeyword: string;
  relatedKeywords: string[];
  searchIntent: SearchIntent;
  targetAudience: string;
  metaDescription: string;
  canonicalUrl: string;
  indexable: boolean;
  status: 'Published' | 'Draft' | 'Under Review';
  targetJurisdiction: Jurisdiction;
  lastUpdated: string;
}
