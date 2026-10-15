import { PageRegistryItem } from '../types/content';
import { CATEGORIES } from './categories';
import { ARTICLES } from './articles';
import { AUTHORS } from './authors';

export const BASE_CANONICAL_DOMAIN = 'https://ais-pre-qowgo7orkvzlqgbj7a32o3-472407255379.asia-east1.run.app';

export const STATIC_PAGES: PageRegistryItem[] = [
  {
    url: '/',
    pageType: 'Home',
    title: 'Finance Guru — Learn Money. Build Wealth. Own Your Future.',
    h1Title: 'Learn Money. Build Wealth. Own Your Future.',
    primaryKeyword: 'personal finance education',
    relatedKeywords: ['learn personal finance', 'build wealth for beginners'],
    searchIntent: 'Informational',
    targetAudience: 'Beginners, students, young professionals, and families seeking financial literacy',
    metaDescription: 'Finance Guru provides clear, evidence-based guides on saving, budgeting, investing, loans, insurance, and taxes to build long-term financial independence.',
    canonicalUrl: `${BASE_CANONICAL_DOMAIN}/`,
    indexable: true,
    status: 'Published',
    targetJurisdiction: 'Global / Universal',
    lastUpdated: '2026-10-14',
  },
  {
    url: '/about/',
    pageType: 'Utility',
    title: 'About Finance Guru — Editorial Mission & Standards',
    h1Title: 'An Independent Journal Dedicated to Financial Education',
    primaryKeyword: 'about finance guru',
    relatedKeywords: ['finance guru mission', 'financial literacy platform'],
    searchIntent: 'Navigational',
    targetAudience: 'Readers and researchers verifying editorial credibility and background',
    metaDescription: 'Learn about Finance Guru\'s educational mission, multi-stage editorial verification standards, and dedication to transparent financial literacy.',
    canonicalUrl: `${BASE_CANONICAL_DOMAIN}/about/`,
    indexable: true,
    status: 'Published',
    targetJurisdiction: 'Global / Universal',
    lastUpdated: '2026-10-14',
  },
  {
    url: '/contact/',
    pageType: 'Utility',
    title: 'Contact Finance Guru — Editorial Desk & Inquiries',
    h1Title: 'Contact Our Editorial & Research Desk',
    primaryKeyword: 'contact finance guru',
    relatedKeywords: ['editorial corrections', 'finance inquiries'],
    searchIntent: 'Navigational',
    targetAudience: 'Readers, academic collaborators, and press seeking editorial correspondence',
    metaDescription: 'Get in touch with the editorial team at Finance Guru for analytical citations, corrections, academic partnerships, or reader feedback.',
    canonicalUrl: `${BASE_CANONICAL_DOMAIN}/contact/`,
    indexable: true,
    status: 'Published',
    targetJurisdiction: 'Global / Universal',
    lastUpdated: '2026-10-14',
  },
  {
    url: '/categories/',
    pageType: 'Category',
    title: 'Finance Learning Categories & Curricula — Finance Guru',
    h1Title: 'Explore All Finance Learning Pathways',
    primaryKeyword: 'finance learning categories',
    relatedKeywords: ['financial education topics', 'personal finance curriculum'],
    searchIntent: 'Informational',
    targetAudience: 'Learners seeking structured curriculum paths from basics to advanced planning',
    metaDescription: 'Browse Finance Guru\'s structured finance learning categories: budgeting, investing, stocks, credit cards, loans, insurance, taxes, and retirement.',
    canonicalUrl: `${BASE_CANONICAL_DOMAIN}/categories/`,
    indexable: true,
    status: 'Published',
    targetJurisdiction: 'Global / Universal',
    lastUpdated: '2026-10-14',
  },
  {
    url: '/financial-calculators/',
    pageType: 'Calculator',
    title: 'Financial Calculators: Compound Interest, Budget & Fees — Finance Guru',
    h1Title: 'Interactive Financial Calculators',
    primaryKeyword: 'financial calculators',
    relatedKeywords: ['compound interest calculator', '50 30 20 budget calculator'],
    searchIntent: 'Commercial',
    targetAudience: 'Savers, planners, and investors modeling real-time financial projections',
    metaDescription: 'Free interactive financial calculators: simulate compound interest growth, calculate your 50/30/20 monthly budget, and measure investment fee impact.',
    canonicalUrl: `${BASE_CANONICAL_DOMAIN}/financial-calculators/`,
    indexable: true,
    status: 'Published',
    targetJurisdiction: 'Global / Universal',
    lastUpdated: '2026-10-14',
  },
  {
    url: '/blog/',
    pageType: 'Utility',
    title: 'Journal & Learning Resources Archive — Finance Guru',
    h1Title: 'All Educational Articles & Research',
    primaryKeyword: 'financial education blog',
    relatedKeywords: ['personal finance articles', 'money guides'],
    searchIntent: 'Informational',
    targetAudience: 'Readers browsing latest published research and practical essays',
    metaDescription: 'Explore the complete archive of Finance Guru educational essays, research breakdowns, and actionable guides on wealth creation and money management.',
    canonicalUrl: `${BASE_CANONICAL_DOMAIN}/blog/`,
    indexable: true,
    status: 'Published',
    targetJurisdiction: 'Global / Universal',
    lastUpdated: '2026-10-14',
  },
  {
    url: '/editorial-policy/',
    pageType: 'Legal',
    title: 'Editorial Policy & Fact-Checking Charter — Finance Guru',
    h1Title: 'Editorial Policy & Verification Standards',
    primaryKeyword: 'financial editorial policy',
    relatedKeywords: ['fact checking standards', 'financial research methodology'],
    searchIntent: 'Informational',
    targetAudience: 'Users, institutions, and search evaluators inspecting trustworthiness (E-E-A-T)',
    metaDescription: 'Read the Finance Guru Editorial Policy: our four-tier verification protocol, strict independence from sponsors, and regulatory primary source citations.',
    canonicalUrl: `${BASE_CANONICAL_DOMAIN}/editorial-policy/`,
    indexable: true,
    status: 'Published',
    targetJurisdiction: 'Global / Universal',
    lastUpdated: '2026-10-14',
  },
  {
    url: '/financial-disclaimer/',
    pageType: 'Legal',
    title: 'Financial Disclaimer & Educational Notice — Finance Guru',
    h1Title: 'Financial Disclaimer & Regulatory Disclosure',
    primaryKeyword: 'financial disclaimer',
    relatedKeywords: ['not financial advice', 'educational disclosure'],
    searchIntent: 'Informational',
    targetAudience: 'All website visitors needing clear legal boundaries of educational guidance',
    metaDescription: 'Essential educational disclaimer: Finance Guru provides educational analysis and does not constitute certified personalized financial, investment, or legal advice.',
    canonicalUrl: `${BASE_CANONICAL_DOMAIN}/financial-disclaimer/`,
    indexable: true,
    status: 'Published',
    targetJurisdiction: 'Global / Universal',
    lastUpdated: '2026-10-14',
  },
  {
    url: '/privacy/',
    pageType: 'Legal',
    title: 'Privacy Policy — Finance Guru',
    h1Title: 'Reader Privacy & Data Protection Pledge',
    primaryKeyword: 'privacy policy finance guru',
    relatedKeywords: ['data protection', 'zero tracking policy'],
    searchIntent: 'Navigational',
    targetAudience: 'Readers reviewing data collection and privacy practices',
    metaDescription: 'Our reader privacy commitment: zero third-party marketing cookies, no sale of personal information, and encrypted TLS 1.3 security.',
    canonicalUrl: `${BASE_CANONICAL_DOMAIN}/privacy/`,
    indexable: true,
    status: 'Published',
    targetJurisdiction: 'Global / Universal',
    lastUpdated: '2026-10-14',
  },
  {
    url: '/terms/',
    pageType: 'Legal',
    title: 'Terms of Use & Legal Terms — Finance Guru',
    h1Title: 'Terms and Conditions of Use',
    primaryKeyword: 'terms of use finance guru',
    relatedKeywords: ['terms and conditions', 'website usage agreement'],
    searchIntent: 'Navigational',
    targetAudience: 'Website users and intellectual property reviewers',
    metaDescription: 'Terms of use, intellectual property guidelines, and conditions for accessing educational publications on Finance Guru.',
    canonicalUrl: `${BASE_CANONICAL_DOMAIN}/terms/`,
    indexable: true,
    status: 'Published',
    targetJurisdiction: 'Global / Universal',
    lastUpdated: '2026-10-14',
  },
  {
    url: '/sitemap/',
    pageType: 'Utility',
    title: 'Website Sitemap: All Pages & Educational Paths — Finance Guru',
    h1Title: 'Visual HTML Directory & Sitemap',
    primaryKeyword: 'finance guru sitemap',
    relatedKeywords: ['website directory', 'all financial topics'],
    searchIntent: 'Navigational',
    targetAudience: 'Readers and web crawlers needing a hierarchical directory of all indexable URLs',
    metaDescription: 'Complete visual HTML directory of all learning categories, educational articles, financial calculators, authors, and regulatory disclosures on Finance Guru.',
    canonicalUrl: `${BASE_CANONICAL_DOMAIN}/sitemap/`,
    indexable: true,
    status: 'Published',
    targetJurisdiction: 'Global / Universal',
    lastUpdated: '2026-10-14',
  },
];

// Dynamically generate category page items
export const CATEGORY_PAGES: PageRegistryItem[] = CATEGORIES.map((cat) => ({
  url: `/${cat.slug}/`,
  pageType: 'Category',
  title: cat.seoTitle,
  h1Title: cat.name,
  primaryKeyword: cat.primaryKeyword,
  relatedKeywords: cat.secondaryKeywords,
  searchIntent: cat.searchIntent,
  targetAudience: cat.targetAudience,
  metaDescription: cat.metaDescription,
  canonicalUrl: `${BASE_CANONICAL_DOMAIN}/${cat.slug}/`,
  indexable: true,
  status: 'Published',
  targetJurisdiction: 'Global / Universal',
  lastUpdated: '2026-10-14',
}));

// Dynamically generate article page items
export const ARTICLE_PAGES: PageRegistryItem[] = ARTICLES.map((art) => ({
  url: `/${art.categorySlug}/${art.slug}/`,
  pageType: 'Article',
  title: art.titleTag,
  h1Title: art.h1Title || art.title,
  primaryKeyword: art.primaryKeyword,
  relatedKeywords: art.secondaryKeywords || [],
  searchIntent: art.searchIntent,
  targetAudience: art.targetAudience,
  metaDescription: art.metaDescription,
  canonicalUrl: `${BASE_CANONICAL_DOMAIN}/${art.categorySlug}/${art.slug}/`,
  indexable: true,
  status: 'Published',
  targetJurisdiction: art.jurisdiction,
  lastUpdated: art.dateModified,
}));

// Dynamically generate author page items
export const AUTHOR_PAGES: PageRegistryItem[] = Object.values(AUTHORS).map((author) => ({
  url: `/authors/${author.slug}/`,
  pageType: 'Author',
  title: `${author.name} — Editorial Bio & Credentials — Finance Guru`,
  h1Title: author.name,
  primaryKeyword: `${author.name} financial analyst`,
  relatedKeywords: [author.role, 'finance guru editorial board'],
  searchIntent: 'Navigational',
  targetAudience: 'Readers reviewing author qualifications, background, and reviewed articles',
  metaDescription: `Read the professional background, credentials, and published personal finance guides authored by ${author.name} at Finance Guru.`,
  canonicalUrl: `${BASE_CANONICAL_DOMAIN}/authors/${author.slug}/`,
  indexable: true,
  status: 'Published',
  targetJurisdiction: 'Global / Universal',
  lastUpdated: '2026-10-14',
}));

// Complete Master Page Registry
export const MASTER_PAGE_REGISTRY: PageRegistryItem[] = [
  ...STATIC_PAGES,
  ...CATEGORY_PAGES,
  ...ARTICLE_PAGES,
  ...AUTHOR_PAGES,
];

export interface ValidationIssue {
  severity: 'error' | 'warning' | 'info';
  url: string;
  field: string;
  message: string;
}

export function validatePageRegistry(): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const seenUrls = new Set<string>();
  const seenTitles = new Set<string>();
  const seenPrimaryKeywords = new Set<string>();

  for (const page of MASTER_PAGE_REGISTRY) {
    // 1. Check duplicate URLs
    if (seenUrls.has(page.url)) {
      issues.push({
        severity: 'error',
        url: page.url,
        field: 'url',
        message: `Duplicate URL detected in registry: ${page.url}`,
      });
    } else {
      seenUrls.add(page.url);
    }

    // 2. Check duplicate titles
    if (seenTitles.has(page.title)) {
      issues.push({
        severity: 'warning',
        url: page.url,
        field: 'title',
        message: `Duplicate SEO title across pages: "${page.title}"`,
      });
    } else {
      seenTitles.add(page.title);
    }

    // 3. Check duplicate primary keyword (same search intent)
    const normalizedKeyword = page.primaryKeyword.toLowerCase().trim();
    if (seenPrimaryKeywords.has(normalizedKeyword) && page.pageType === 'Article') {
      issues.push({
        severity: 'warning',
        url: page.url,
        field: 'primaryKeyword',
        message: `Primary keyword "${page.primaryKeyword}" is repeated on multiple articles. Ensure distinct search intents.`,
      });
    } else {
      seenPrimaryKeywords.add(normalizedKeyword);
    }

    // 4. Validate title length (recommended 40 - 65 chars)
    if (page.title.length < 30) {
      issues.push({
        severity: 'warning',
        url: page.url,
        field: 'title',
        message: `SEO title is short (${page.title.length} chars). Aim for 45-60 characters for maximum search snippet clarity.`,
      });
    } else if (page.title.length > 70) {
      issues.push({
        severity: 'warning',
        url: page.url,
        field: 'title',
        message: `SEO title is long (${page.title.length} chars). Risk of Google truncation above 65 characters.`,
      });
    }

    // 5. Validate meta description length (recommended 120 - 160 chars)
    if (!page.metaDescription || page.metaDescription.trim() === '') {
      issues.push({
        severity: 'error',
        url: page.url,
        field: 'metaDescription',
        message: 'Missing meta description.',
      });
    } else if (page.metaDescription.length < 100) {
      issues.push({
        severity: 'warning',
        url: page.url,
        field: 'metaDescription',
        message: `Meta description is short (${page.metaDescription.length} chars). Aim for 130-160 characters.`,
      });
    } else if (page.metaDescription.length > 170) {
      issues.push({
        severity: 'warning',
        url: page.url,
        field: 'metaDescription',
        message: `Meta description is long (${page.metaDescription.length} chars). Google may truncate descriptions exceeding 160 characters.`,
      });
    }

    // 6. Check missing primary or related keywords
    if (!page.primaryKeyword) {
      issues.push({
        severity: 'error',
        url: page.url,
        field: 'primaryKeyword',
        message: 'Missing primary keyword assignment.',
      });
    }
    if (!page.relatedKeywords || page.relatedKeywords.length < 2) {
      issues.push({
        severity: 'warning',
        url: page.url,
        field: 'relatedKeywords',
        message: 'Fewer than 2 secondary keywords specified for editorial targeting.',
      });
    }
  }

  return issues;
}

export function getRegistryItemByUrl(url: string): PageRegistryItem | undefined {
  // Normalize trailing slash
  const normalized = url.endsWith('/') ? url : `${url}/`;
  return MASTER_PAGE_REGISTRY.find((item) => item.url === normalized || item.url === url);
}
