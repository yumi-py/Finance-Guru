import { Article, ArticleSection, TocItem } from '../types/content';

/**
 * Converts any heading text into a clean, readable, lowercase, hyphen-separated slug.
 * Safely strips punctuation, normalizes whitespace, and handles unicode letters and numbers.
 *
 * Examples:
 * - "Introduction" -> "introduction"
 * - "Benefits of SEO" -> "benefits-of-seo"
 * - "How to Get Started" -> "how-to-get-started"
 * - "1. Saving what's left instead of paying yourself first" -> "1-saving-whats-left-instead-of-paying-yourself-first"
 */
export function slugify(text: string): string {
  if (!text) return '';
  return text
    .toString()
    .trim()
    .toLowerCase()
    // Remove apostrophes, quotes, backticks
    .replace(/[''""`]/g, '')
    // Replace characters that are not letters, digits, or spaces with hyphens
    .replace(/[^\p{L}\p{N}\s-]/gu, '-')
    // Replace whitespace and underscores with a single hyphen
    .replace(/[\s_]+/g, '-')
    // Collapse multiple consecutive hyphens
    .replace(/-+/g, '-')
    // Remove leading and trailing hyphens
    .replace(/^-+|-+$/g, '');
}

/**
 * Manages unique slug generation within a single page/article.
 * Guarantees every anchor ID is unique and deterministic across page reloads.
 * Preserves existing explicit IDs whenever provided to avoid breaking existing links.
 */
export class SlugManager {
  private seenSlugs = new Map<string, number>();

  /**
   * Returns a unique ID for a heading.
   * If existingId is provided and hasn't been used yet, it is preserved.
   * Duplicate headings receive deterministic suffixes (-1, -2, etc.).
   */
  getUniqueId(title: string, existingId?: string): string {
    const rawId = existingId?.trim() ? slugify(existingId) : slugify(title);
    const baseSlug = rawId || 'section';
    const count = this.seenSlugs.get(baseSlug) || 0;

    if (count === 0) {
      this.seenSlugs.set(baseSlug, 1);
      return baseSlug;
    }

    // Collision handling for duplicate headings
    let suffix = count;
    let uniqueSlug = `${baseSlug}-${suffix}`;
    while (this.seenSlugs.has(uniqueSlug)) {
      suffix += 1;
      uniqueSlug = `${baseSlug}-${suffix}`;
    }

    this.seenSlugs.set(baseSlug, count + 1);
    this.seenSlugs.set(uniqueSlug, 1);
    return uniqueSlug;
  }

  reset() {
    this.seenSlugs.clear();
  }
}

export interface ResolvedHeading {
  id: string;
  title: string;
  level: 2 | 3;
  sectionIndex?: number;
}

export interface ArticleHeadingsData {
  tocItems: TocItem[];
  sectionIdMap: Map<number, string>;
  faqId: string;
}

/**
 * Automatically extracts all headings (h2, h3, and FAQs) from an article.
 * Guarantees unique, deterministic IDs for all headings and maps them to section indices.
 * Preserves existing curated TOC titles and explicit section IDs where available.
 */
export function extractArticleHeadings(article: Article): ArticleHeadingsData {
  const slugManager = new SlugManager();
  const tocItems: TocItem[] = [];
  const sectionIdMap = new Map<number, string>();

  // Map any existing curated TOC titles by id for fallback lookup
  const curatedTitlesById = new Map<string, string>();
  if (article.tableOfContents) {
    article.tableOfContents.forEach((item) => {
      if (item.id && item.title) {
        curatedTitlesById.set(item.id, item.title);
      }
    });
  }

  // 1. Scan sections for h2 and h3
  article.sections.forEach((section: ArticleSection, index: number) => {
    if (section.type === 'h2' || section.type === 'h3') {
      const headingContent = section.content || '';
      const resolvedId = slugManager.getUniqueId(headingContent, section.id);
      sectionIdMap.set(index, resolvedId);

      const level = section.type === 'h2' ? 2 : 3;
      // Prefer curated title if ID matches, otherwise use heading content
      const displayTitle = (section.id && curatedTitlesById.get(section.id)) || headingContent;

      tocItems.push({
        id: resolvedId,
        title: displayTitle,
        level,
      });
    }
  });

  // 2. Include FAQs if present
  let faqId = 'faqs';
  if (article.faqs && article.faqs.length > 0) {
    faqId = slugManager.getUniqueId('Frequently Asked Questions', 'faqs');
    tocItems.push({
      id: faqId,
      title: 'Frequently Asked Questions',
      level: 2,
    });
  }

  return {
    tocItems,
    sectionIdMap,
    faqId,
  };
}
