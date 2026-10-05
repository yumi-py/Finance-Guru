import { useEffect, useState, useMemo } from 'react';
import { ARTICLES } from '../data/articles';
import { Link } from '../context/RouterContext';
import { formatDate } from '../utils/date';
import { SEOHead } from '../components/SEOHead';
import { FormattedText } from '../components/FormattedText';
import { ArrowLeft, Clock, Calendar, RefreshCw } from 'lucide-react';

interface ArticleDetailPageProps {
  slug: string;
}

export function ArticleDetailPage({ slug }: ArticleDetailPageProps) {
  const [readingProgress, setReadingProgress] = useState(0);

  const article = useMemo(() => {
    return ARTICLES.find((a) => a.slug === slug);
  }, [slug]);

  // Track reading progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) {
        setReadingProgress(0);
        return;
      }
      const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
      setReadingProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [slug]);

  if (!article) {
    return (
      <main className="max-w-3xl mx-auto px-6 py-24 text-center">
        <h1 className="text-3xl font-serif font-normal text-[#171717]">Essay Not Found</h1>
        <p className="mt-4 text-[#66645F]">
          The essay you are looking for may have been moved or archived.
        </p>
        <div className="mt-8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#2E5A44] underline underline-offset-4"
          >
            <ArrowLeft size={16} /> Return to Journal
          </Link>
        </div>
      </main>
    );
  }

  // Related articles
  const relatedArticles = ARTICLES.filter((a) => article.relatedSlugs.includes(a.slug));

  // JSON-LD Article Schema
  const articleSchema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.metaDescription || article.excerpt,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      '@type': 'Person',
      name: article.author.name,
      jobTitle: article.author.role,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Finance Guru',
      logo: {
        '@type': 'ImageObject',
        url: 'https://ais-pre-qowgo7orkvzlqgbj7a32o3-472407255379.asia-east1.run.app/favicon.svg',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://ais-pre-qowgo7orkvzlqgbj7a32o3-472407255379.asia-east1.run.app/blog/${article.slug}`,
    },
    keywords: [article.primaryKeyword, ...(article.secondaryKeywords || []), ...article.tags]
      .filter(Boolean)
      .join(', '),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://ais-pre-qowgo7orkvzlqgbj7a32o3-472407255379.asia-east1.run.app/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Journal',
        item: 'https://ais-pre-qowgo7orkvzlqgbj7a32o3-472407255379.asia-east1.run.app/blog',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.title,
        item: `https://ais-pre-qowgo7orkvzlqgbj7a32o3-472407255379.asia-east1.run.app/blog/${article.slug}`,
      },
    ],
  };

  const schemas: Record<string, unknown>[] = [articleSchema, breadcrumbSchema];

  if (article.faqs && article.faqs.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: article.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    });
  }

  const pageTitle = article.titleTag ? `${article.titleTag} — Finance Guru` : `${article.title} — Finance Guru`;
  const pageDescription = article.metaDescription || article.excerpt;

  return (
    <>
      <SEOHead
        title={pageTitle}
        description={pageDescription}
        canonicalPath={`/blog/${article.slug}`}
        type="article"
        schema={schemas}
      />

      {/* Reading Progress Indicator */}
      <div
        className="fixed top-0 left-0 h-[2px] bg-[#2E5A44] z-50 transition-all duration-75"
        style={{ width: `${readingProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(readingProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Reading progress"
      />

      <article className="max-w-5xl mx-auto px-6 pt-12 pb-24">
        {/* Navigation Breadcrumb */}
        <nav aria-label="Breadcrumbs" className="mb-10 text-xs text-[#66645F] flex items-center gap-2">
          <Link to="/" className="hover:text-[#171717] transition-colors">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <Link to="/blog" className="hover:text-[#171717] transition-colors">
            Journal
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-[#171717] truncate max-w-xs">{article.category}</span>
        </nav>

        {/* Article Header (constrained reading width) */}
        <header className="max-w-[740px] mx-auto pb-10 border-b border-[#D9D7D0]">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#2E5A44] font-medium mb-4">
            <span>{article.category}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium tracking-tight text-[#171717] leading-[1.2] text-balance">
            {article.title}
          </h1>

          <p className="mt-6 text-xl text-[#66645F] leading-relaxed font-sans">
            {article.excerpt}
          </p>

          {/* Author and metadata line */}
          <div className="mt-8 pt-6 border-t border-[#D9D7D0]/60 flex flex-wrap items-center justify-between gap-y-4 text-xs text-[#66645F]">
            <div className="flex items-center gap-2">
              <span className="font-medium text-[#171717]">By {article.author.name}</span>
              <span aria-hidden="true">·</span>
              <span>{article.author.role}</span>
            </div>

            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-1.5">
                <Calendar size={13} aria-hidden="true" />
                <time dateTime={article.datePublished}>{formatDate(article.datePublished)}</time>
              </span>

              {article.dateModified && article.dateModified !== article.datePublished && (
                <span className="inline-flex items-center gap-1 text-[#66645F]/80" title="Last updated">
                  <RefreshCw size={11} aria-hidden="true" />
                  <span>Updated {formatDate(article.dateModified)}</span>
                </span>
              )}

              <span className="inline-flex items-center gap-1.5">
                <Clock size={13} aria-hidden="true" />
                <span>{article.readingTime}</span>
              </span>
            </div>
          </div>
        </header>

        {/* Desktop Layout: Table of Contents & Main Article */}
        <div className="max-w-[740px] mx-auto pt-10">
          {/* Table of contents (inline on mobile/tablet and top of long form) */}
          {article.tableOfContents && article.tableOfContents.length > 0 && (
            <aside aria-label="Table of Contents" className="mb-12 p-6 bg-[#EFECE6]/60 rounded border border-[#D9D7D0]">
              <div className="text-xs uppercase tracking-widest font-medium text-[#171717] mb-3">
                Contents
              </div>
              <ol className="space-y-2 text-sm text-[#66645F]">
                {article.tableOfContents.map((item, index) => (
                  <li key={item.id} className="flex items-baseline gap-2">
                    <span className="text-xs text-[#2E5A44] font-mono tabular-nums">0{index + 1}.</span>
                    <a
                      href={`#${item.id}`}
                      className="hover:text-[#171717] hover:underline underline-offset-4 transition-colors"
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ol>
            </aside>
          )}

          {/* Article Body Content */}
          <div className="editorial-prose">
            {article.sections.map((section, idx) => {
              if (section.type === 'paragraph') {
                return (
                  <p key={idx}>
                    <FormattedText text={section.content || ''} />
                  </p>
                );
              }

              if (section.type === 'h2') {
                return (
                  <h2 key={idx} id={section.id} className="scroll-mt-24">
                    {section.content}
                  </h2>
                );
              }

              if (section.type === 'h3') {
                return (
                  <h3 key={idx} id={section.id} className="scroll-mt-24">
                    {section.content}
                  </h3>
                );
              }

              if (section.type === 'blockquote') {
                return (
                  <blockquote key={idx}>
                    <p>“{section.content}”</p>
                    {section.authorQuote && (
                      <cite className="block not-italic text-sm font-sans text-[#66645F] mt-2">
                        — {section.authorQuote}
                      </cite>
                    )}
                  </blockquote>
                );
              }

              if (section.type === 'list' && section.items) {
                return (
                  <ul key={idx} className="list-disc">
                    {section.items.map((item, itemIdx) => (
                      <li key={itemIdx}>
                        <FormattedText text={item} />
                      </li>
                    ))}
                  </ul>
                );
              }

              if (section.type === 'table' && section.tableData) {
                return (
                  <div key={idx} className="overflow-x-auto my-8">
                    {section.tableData.caption && (
                      <div className="text-xs uppercase tracking-wider text-[#66645F] mb-2 font-medium">
                        {section.tableData.caption}
                      </div>
                    )}
                    <table>
                      <thead>
                        <tr>
                          {section.tableData.headers.map((h, hIdx) => (
                            <th key={hIdx}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {section.tableData.rows.map((row, rIdx) => (
                          <tr key={rIdx}>
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className={cIdx > 0 ? 'text-right sm:text-left' : ''}>
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                );
              }

              if (section.type === 'callout') {
                return (
                  <div key={idx} className="my-8 p-5 bg-[#EFECE6]/80 border-l-2 border-[#2E5A44] text-sm text-[#171717] leading-relaxed">
                    <FormattedText text={section.content || ''} />
                  </div>
                );
              }

              return null;
            })}
          </div>

          {/* FAQs section if present */}
          {article.faqs && article.faqs.length > 0 && (
            <section id="faqs" aria-label="Frequently Asked Questions" className="mt-12 pt-8 border-t border-[#D9D7D0]">
              <h2 className="font-serif text-2xl font-medium text-[#171717] mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                {article.faqs.map((faq, fIdx) => (
                  <div key={fIdx} className="p-5 bg-[#EFECE6]/60 rounded border border-[#D9D7D0]/70">
                    <h3 className="font-serif text-base font-medium text-[#171717] mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-sm text-[#66645F] leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Article Disclaimer */}
          {article.disclaimer && (
            <div className="mt-10 p-4 bg-[#EFECE6]/40 border-l-2 border-[#66645F] text-xs text-[#66645F] italic leading-relaxed">
              <span className="font-medium not-italic text-[#171717]">Disclaimer: </span>
              {article.disclaimer}
            </div>
          )}

          {/* Author Bio Box */}
          <footer className="mt-16 pt-10 border-t border-[#D9D7D0]">
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#2E5A44]/15 text-[#2E5A44] flex items-center justify-center font-serif text-lg font-bold shrink-0">
                {article.author.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-serif text-lg font-medium text-[#171717]">
                  About {article.author.name}
                </h3>
                <p className="text-xs text-[#2E5A44] font-medium mt-0.5">
                  {article.author.role}
                </p>
                <p className="text-sm text-[#66645F] leading-relaxed mt-2">
                  {article.author.bio}
                </p>
              </div>
            </div>

            {/* Article Tags */}
            <div className="mt-8 pt-6 border-t border-[#D9D7D0]/60 flex flex-wrap items-center gap-2">
              <span className="text-xs text-[#66645F] uppercase tracking-wider">Filed under:</span>
              {article.tags.map((tag, tIdx) => (
                <span key={tag} className="text-xs text-[#171717]">
                  {tag}{tIdx < article.tags.length - 1 ? ' ·' : ''}
                </span>
              ))}
            </div>
          </footer>
        </div>

        {/* Related Articles Section */}
        {relatedArticles.length > 0 && (
          <section aria-label="Related Reading" className="max-w-[740px] mx-auto mt-20 pt-12 border-t border-[#D9D7D0]">
            <h2 className="text-xl font-serif font-medium text-[#171717] mb-8">
              Related Reading
            </h2>

            <div className="divide-y divide-[#D9D7D0]">
              {relatedArticles.map((rel) => (
                <article key={rel.slug} className="py-6 first:pt-0 last:pb-0 group">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#66645F] mb-1.5">
                    <span className="text-[#2E5A44]">{rel.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{rel.readingTime}</span>
                  </div>
                  <h3 className="text-lg font-serif font-medium text-[#171717] group-hover:text-[#2E5A44] transition-colors">
                    <Link to={`/blog/${rel.slug}`} className="focus-visible:outline-none">
                      {rel.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-[#66645F] mt-2 line-clamp-2">
                    {rel.excerpt}
                  </p>
                </article>
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
}
