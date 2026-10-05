export interface Author {
  name: string;
  role: string;
  bio: string;
  avatar?: string;
}

export interface TocItem {
  id: string;
  title: string;
  level: 2 | 3;
}

export interface ArticleSection {
  type: 'paragraph' | 'h2' | 'h3' | 'blockquote' | 'list' | 'table' | 'callout';
  id?: string;
  content?: string;
  authorQuote?: string;
  items?: string[];
  tableData?: {
    headers: string[];
    rows: (string | number)[][];
    caption?: string;
  };
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Article {
  slug: string;
  title: string;
  titleTag?: string;
  metaDescription?: string;
  primaryKeyword?: string;
  secondaryKeywords?: string[];
  excerpt: string;
  category: string;
  tags: string[];
  author: Author;
  datePublished: string;
  dateModified: string;
  readingTime: string;
  featured?: boolean;
  tableOfContents: TocItem[];
  sections: ArticleSection[];
  relatedSlugs: string[];
  faqs?: FAQItem[];
  disclaimer?: string;
}
