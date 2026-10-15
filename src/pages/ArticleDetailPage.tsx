import { useEffect, useState, useMemo } from 'react';
import { ARTICLES, getArticleBySlug } from '../data/articles';
import { Link } from '../context/RouterContext';
import { formatDate } from '../utils/date';
import { SEOHead } from '../components/SEOHead';
import { FormattedText } from '../components/FormattedText';
import { ArrowLeft, Clock, Calendar, ShieldCheck, ExternalLink, Calculator, BookOpen } from 'lucide-react';

interface ArticleDetailPageProps {
  slug: string;
  categorySlug?: string;
}

export function ArticleDetailPage({ slug, categorySlug }: ArticleDetailPageProps) {
  const [readingProgress, setReadingProgress] = useState(0);

  const article = useMemo(() => {
    return getArticleBySlug(slug) || ARTICLES.find((a) => a.slug === slug);
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
        <h1 className="text-3xl font-serif font-normal text-[#171717]">Educational Guide Not Found</h1>
        <p className="mt-4 text-[#66645F]">
          The article you are looking for may have been moved or updated in our learning index.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            to="/categories/"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#2E5A44] underline underline-offset-4"
          >
            <ArrowLeft size={16} /> Browse Categories
          </Link>
          <Link
            to="/blog/"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#171717] underline underline-offset-4"
          >
            View All Guides
          </Link>
        </div>
      </main>
    );
  }

  // Related articles
  const relatedArticles = ARTICLES.filter((a) => article.relatedSlugs?.includes(a.slug));

  const canonicalPath = `/${article.categorySlug}/${article.slug}/`;

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
      url: `https://ais-pre-qowgo7orkvzlqgbj7a32o3-472407255379.asia-east1.run.app/authors/${article.author.slug}/`,
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
      '@id': `https://ais-pre-qowgo7orkvzlqgbj7a32o3-472407255379.asia-east1.run.app${canonicalPath}`,
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
        name: article.category,
        item: `https://ais-pre-qowgo7orkvzlqgbj7a32o3-472407255379.asia-east1.run.app/${article.categorySlug}/`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.title,
        item: `https://ais-pre-qowgo7orkvzlqgbj7a32o3-472407255379.asia-east1.run.app${canonicalPath}`,
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

  const pageTitle = article.titleTag ? article.titleTag : `${article.title} — Finance Guru`;
  const pageDescription = article.metaDescription || article.excerpt;

  return (
    <>
      <SEOHead
        title={pageTitle}
        description={pageDescription}
        canonicalPath={canonicalPath}
        type="article"
        keywords={[article.primaryKeyword, ...(article.secondaryKeywords || []), ...article.tags].join(', ')}
        schema={schemas}
      />

      {/* Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 h-[2px] bg-[#2E5A44] z-50 transition-all duration-75"
        style={{ width: `${readingProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(readingProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Reading progress"
      />

      <article className="max-w-5xl mx-auto px-6 pt-12 pb-24 text-left">
        {/* Navigation Breadcrumb */}
        <nav aria-label="Breadcrumbs" className="mb-10 text-xs text-[#66645F] flex flex-wrap items-center gap-2">
          <Link to="/" className="hover:text-[#171717] transition-colors">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <Link to={`/${article.categorySlug}/`} className="hover:text-[#171717] transition-colors">
            {article.category}
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-[#171717] font-medium truncate max-w-xs">{article.title}</span>
        </nav>

        {/* Article Header */}
        <header className="max-w-[760px] mx-auto pb-10 border-b border-[#D9D7D0]">
          <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-wider text-[#2E5A44] font-mono font-medium mb-4">
            <Link to={`/${article.categorySlug}/`} className="hover:underline">
              {article.category}
            </Link>
            <span aria-hidden="true">·</span>
            <span className="text-[#66645F] flex items-center gap-1">
              <Clock size={12} /> {article.readingTime}
            </span>
            <span aria-hidden="true">·</span>
            <span className="text-[#66645F] flex items-center gap-1">
              <ShieldCheck size={12} /> Peer-Reviewed
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal tracking-tight text-[#171717] leading-[1.18] text-balance">
            {article.h1Title || article.title}
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-[#66645F] leading-relaxed font-sans font-normal">
            {article.excerpt}
          </p>

          {/* Author Byline */}
          <div className="mt-8 pt-6 border-t border-[#D9D7D0]/60 flex flex-wrap items-center justify-between gap-4 text-xs text-[#66645F]">
            <div className="flex items-center gap-3">
              <Link
                to={`/authors/${article.author.slug}/`}
                className="w-10 h-10 rounded-full bg-[#2E5A44]/15 text-[#2E5A44] flex items-center justify-center font-serif text-base font-bold shrink-0 hover:bg-[#2E5A44]/25 transition-colors"
              >
                {article.author.name.charAt(0)}
              </Link>
              <div>
                <p className="font-medium text-[#171717] text-sm">
                  By{' '}
                  <Link to={`/authors/${article.author.slug}/`} className="hover:text-[#2E5A44] underline underline-offset-2">
                    {article.author.name}
                  </Link>
                </p>
                <p className="text-[11px] text-[#66645F]">{article.author.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 font-mono text-[11px]">
              <span className="flex items-center gap-1">
                <Calendar size={13} /> {formatDate(article.datePublished)}
              </span>
              {article.dateModified !== article.datePublished && (
                <span className="flex items-center gap-1 text-[#2E5A44]">
                  Updated {formatDate(article.dateModified)}
                </span>
              )}
            </div>
          </div>
        </header>

        {/* Content Container */}
        <div className="max-w-[760px] mx-auto pt-10">
          {/* Table of Contents */}
          {article.tableOfContents && article.tableOfContents.length > 0 && (
            <aside aria-label="Table of contents" className="mb-12 p-6 bg-[#EFECE6]/70 border border-[#D9D7D0] rounded-lg">
              <div className="text-xs font-mono uppercase tracking-widest text-[#2E5A44] font-medium mb-3">
                In This Guide
              </div>
              <ul className="space-y-2 text-sm">
                {article.tableOfContents.map((item) => (
                  <li key={item.id} className={item.level === 3 ? 'pl-4' : ''}>
                    <a
                      href={`#${item.id}`}
                      className="text-[#171717] hover:text-[#2E5A44] transition-colors leading-normal"
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </aside>
          )}

          {/* Editorial Prose Content */}
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
                  <h2 key={idx} id={section.id} className="scroll-mt-24 font-serif text-2xl sm:text-3xl font-normal text-[#171717] mt-12 mb-4">
                    {section.content}
                  </h2>
                );
              }

              if (section.type === 'h3') {
                return (
                  <h3 key={idx} id={section.id} className="scroll-mt-24 font-serif text-xl font-medium text-[#171717] mt-8 mb-3">
                    {section.content}
                  </h3>
                );
              }

              if (section.type === 'blockquote') {
                return (
                  <blockquote key={idx} className="my-8 pl-6 border-l-2 border-[#2E5A44] italic font-serif text-lg text-[#171717]">
                    <p>“{section.content}”</p>
                    {section.authorQuote && (
                      <cite className="block not-italic text-xs font-sans text-[#66645F] mt-2">
                        — {section.authorQuote}
                      </cite>
                    )}
                  </blockquote>
                );
              }

              if (section.type === 'list' && section.items) {
                return (
                  <ul key={idx} className="list-disc pl-6 space-y-2 text-sm sm:text-base text-[#171717]">
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
                      <div className="text-xs uppercase tracking-wider text-[#66645F] mb-2 font-mono font-medium">
                        {section.tableData.caption}
                      </div>
                    )}
                    <table className="w-full text-left border-collapse border border-[#D9D7D0] text-sm">
                      <thead className="bg-[#EFECE6]">
                        <tr>
                          {section.tableData.headers.map((h, hIdx) => (
                            <th key={hIdx} className="p-3 border border-[#D9D7D0] font-medium text-[#171717] text-xs uppercase tracking-wider">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {section.tableData.rows.map((row, rIdx) => (
                          <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-white' : 'bg-[#FAF9F5]'}>
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className="p-3 border border-[#D9D7D0] text-[#171717]">
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
                  <div key={idx} className="my-8 p-5 bg-[#EFECE6]/80 border-l-3 border-[#2E5A44] rounded-r text-sm text-[#171717] leading-relaxed shadow-xs">
                    <FormattedText text={section.content || ''} />
                  </div>
                );
              }

              if (section.type === 'formula' && section.formulaData) {
                return (
                  <div key={idx} className="my-8 p-6 bg-white border border-[#D9D7D0] rounded-lg space-y-4">
                    <div className="text-xs uppercase tracking-wider font-mono text-[#2E5A44] font-medium">
                      Mathematical Formula
                    </div>
                    <div className="p-4 bg-[#EFECE6] rounded text-center font-mono text-base sm:text-lg font-bold text-[#171717]">
                      {section.formulaData.latexFormula}
                    </div>
                    <p className="text-xs sm:text-sm text-[#66645F] leading-relaxed">
                      {section.formulaData.explanation}
                    </p>
                    <div className="space-y-1.5 pt-2 border-t border-[#D9D7D0]/60 text-xs text-[#171717]">
                      {section.formulaData.variables.map((v, vIdx) => (
                        <div key={vIdx} className="flex items-baseline gap-2">
                          <span className="font-mono font-bold text-[#2E5A44] shrink-0">{v.symbol}:</span>
                          <span className="text-[#66645F]"><strong className="text-[#171717]">{v.label}</strong> — {v.meaning}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }

              return null;
            })}
          </div>

          {/* FAQs section */}
          {article.faqs && article.faqs.length > 0 && (
            <section id="faqs" aria-label="Frequently Asked Questions" className="mt-14 pt-10 border-t border-[#D9D7D0]">
              <h2 className="font-serif text-2xl font-medium text-[#171717] mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {article.faqs.map((faq, fIdx) => (
                  <div key={fIdx} className="p-5 bg-white rounded-lg border border-[#D9D7D0]">
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

          {/* External References (Primary Regulator Sources) */}
          {article.externalReferences && article.externalReferences.length > 0 && (
            <section aria-label="External Citations" className="mt-12 p-5 bg-[#EFECE6]/50 rounded-lg border border-[#D9D7D0]">
              <h3 className="text-xs uppercase font-mono tracking-wider text-[#2E5A44] font-semibold mb-3 flex items-center gap-1.5">
                <ExternalLink size={13} /> Regulatory Sources &amp; Empirical References
              </h3>
              <ul className="space-y-2 text-xs">
                {article.externalReferences.map((ref, rIdx) => (
                  <li key={rIdx}>
                    <a
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#171717] hover:text-[#2E5A44] font-medium underline underline-offset-2 flex items-center gap-1"
                    >
                      {ref.title} <ExternalLink size={11} className="text-[#66645F]" />
                    </a>
                    <span className="text-[#66645F] text-[11px] block mt-0.5">
                      Source: {ref.sourceName} {ref.isGovernmentOrRegulator && '• Official Regulatory Body'}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Article Disclaimer */}
          {article.disclaimer && (
            <div className="mt-10 p-4 bg-[#EFECE6]/40 border-l-2 border-[#66645F] text-xs text-[#66645F] italic leading-relaxed">
              <span className="font-medium not-italic text-[#171717]">Disclaimer: </span>
              {article.disclaimer} Read our full{' '}
              <Link to="/financial-disclaimer/" className="text-[#2E5A44] underline not-italic font-medium">
                Financial Education Notice
              </Link>.
            </div>
          )}

          {/* Author Bio Box */}
          <footer className="mt-14 pt-10 border-t border-[#D9D7D0]">
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Link
                to={`/authors/${article.author.slug}/`}
                className="w-12 h-12 rounded-full bg-[#2E5A44]/15 text-[#2E5A44] flex items-center justify-center font-serif text-lg font-bold shrink-0 hover:bg-[#2E5A44]/25 transition-colors"
              >
                {article.author.name.charAt(0)}
              </Link>
              <div className="space-y-1">
                <h3 className="font-serif text-lg font-medium text-[#171717]">
                  About{' '}
                  <Link to={`/authors/${article.author.slug}/`} className="hover:text-[#2E5A44] underline underline-offset-2">
                    {article.author.name}
                  </Link>
                </h3>
                <p className="text-xs text-[#2E5A44] font-medium">
                  {article.author.role}
                </p>
                <p className="text-sm text-[#66645F] leading-relaxed pt-1">
                  {article.author.bio}
                </p>
                <div className="pt-2">
                  <Link
                    to={`/authors/${article.author.slug}/`}
                    className="text-xs font-semibold text-[#2E5A44] hover:underline"
                  >
                    View Full Author Profile &amp; Credentials →
                  </Link>
                </div>
              </div>
            </div>

            {/* Article Tags */}
            <div className="mt-8 pt-6 border-t border-[#D9D7D0]/60 flex flex-wrap items-center gap-2">
              <span className="text-xs text-[#66645F] uppercase tracking-wider font-mono">Tags:</span>
              {article.tags.map((tag, tIdx) => (
                <span key={tag} className="text-xs text-[#171717] bg-[#EFECE6] px-2 py-0.5 rounded">
                  {tag}
                </span>
              ))}
            </div>
          </footer>
        </div>

        {/* Related Articles Section */}
        {relatedArticles.length > 0 && (
          <section aria-label="Related Reading" className="max-w-[760px] mx-auto mt-20 pt-12 border-t border-[#D9D7D0]">
            <h2 className="text-2xl font-serif font-medium text-[#171717] mb-8">
              Related Educational Reading
            </h2>

            <div className="divide-y divide-[#D9D7D0]">
              {relatedArticles.map((rel) => (
                <article key={rel.slug} className="py-6 first:pt-0 last:pb-0 group">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#66645F] mb-1.5">
                    <span className="text-[#2E5A44]">{rel.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{rel.readingTime}</span>
                  </div>
                  <h3 className="text-xl font-serif font-medium text-[#171717] group-hover:text-[#2E5A44] transition-colors">
                    <Link to={`/${rel.categorySlug}/${rel.slug}/`} className="focus-visible:outline-none">
                      {rel.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-[#66645F] mt-2 line-clamp-2 leading-relaxed">
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
