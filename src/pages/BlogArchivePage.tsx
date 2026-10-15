import { useState, useMemo } from 'react';
import { ARTICLES } from '../data/articles';
import { Link } from '../context/RouterContext';
import { formatDate } from '../utils/date';
import { SEOHead } from '../components/SEOHead';
import { Search, BookOpen, ArrowRight } from 'lucide-react';

export function BlogArchivePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = useMemo(() => {
    const cats = new Set(ARTICLES.map((a) => a.category));
    return ['All', ...Array.from(cats)];
  }, []);

  const filteredArticles = useMemo(() => {
    return ARTICLES.filter((article) => {
      const matchesCategory =
        selectedCategory === 'All' || article.category === selectedCategory;
      const matchesQuery =
        searchQuery.trim() === '' ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.primaryKeyword.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

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
        name: 'Learning Resources',
        item: 'https://ais-pre-qowgo7orkvzlqgbj7a32o3-472407255379.asia-east1.run.app/blog/',
      },
    ],
  };

  return (
    <>
      <SEOHead
        title="Blog and Learning Resources Archive — Finance Guru"
        description="Explore the complete archive of Finance Guru educational essays, research breakdowns, and actionable guides on wealth creation and money management."
        canonicalPath="/blog/"
        schema={breadcrumbSchema}
      />

      <main className="max-w-5xl mx-auto px-6 pt-16 pb-24 text-left">
        {/* Navigation Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8 text-xs text-[#66645F] flex items-center gap-2">
          <Link to="/" className="hover:text-[#171717] transition-colors">Home</Link>
          <span aria-hidden="true">/</span>
          <span className="text-[#171717] font-medium">Learning Resources</span>
        </nav>

        {/* Header Section */}
        <header className="max-w-3xl pb-12 border-b border-[#D9D7D0]">
          <div className="text-xs uppercase tracking-widest text-[#2E5A44] font-medium mb-3 flex items-center gap-1.5 font-mono">
            <BookOpen size={14} /> Comprehensive Archive
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-normal tracking-tight text-[#171717]">
            Learning Resources &amp; Articles
          </h1>
          <p className="mt-5 text-lg text-[#66645F] leading-relaxed font-sans">
            A comprehensive, searchable library of practical personal finance guides, empirical calculations, and structured wealth-building curricula.
          </p>
        </header>

        {/* Filter and Search Bar */}
        <div className="py-8 border-b border-[#D9D7D0] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-[#2E5A44] text-white shadow-xs'
                    : 'bg-[#EFECE6] text-[#171717] hover:bg-[#D9D7D0]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64 shrink-0">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#66645F]" />
            <input
              type="search"
              placeholder="Search all guides..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-[#EFECE6] border-0 rounded text-xs text-[#171717] placeholder:text-[#66645F] focus:ring-1 focus:ring-[#2E5A44] focus:outline-none"
            />
          </div>
        </div>

        {/* Articles List */}
        <section aria-label="Journal Articles" className="py-12">
          {filteredArticles.length === 0 ? (
            <div className="py-16 text-center text-[#66645F]">
              <p className="font-serif text-lg text-[#171717]">No articles matched your criteria.</p>
              <p className="mt-2 text-sm">Try resetting your filter or searching for another term.</p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="mt-4 text-xs uppercase tracking-wider text-[#2E5A44] underline underline-offset-4"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="divide-y divide-[#D9D7D0]">
              {filteredArticles.map((article) => (
                <article key={article.slug} className="py-10 first:pt-0 last:pb-0 group">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#66645F] mb-3">
                    <span className="text-[#2E5A44] font-medium">{article.category}</span>
                    <span aria-hidden="true">·</span>
                    <time dateTime={article.datePublished}>{formatDate(article.datePublished)}</time>
                    <span aria-hidden="true">·</span>
                    <span>{article.readingTime}</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-serif font-medium text-[#171717] group-hover:text-[#2E5A44] transition-colors leading-snug">
                    <Link to={`/${article.categorySlug}/${article.slug}/`} className="focus-visible:outline-none">
                      {article.title}
                    </Link>
                  </h2>

                  <p className="mt-3 text-base text-[#66645F] leading-relaxed max-w-3xl">
                    {article.excerpt}
                  </p>

                  <div className="mt-5 flex items-center justify-between">
                    <Link
                      to={`/${article.categorySlug}/${article.slug}/`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2E5A44] group-hover:translate-x-0.5 transition-transform"
                    >
                      <span>Read Guide</span>
                      <ArrowRight size={14} />
                    </Link>

                    <div className="text-xs text-[#66645F] hidden sm:block">
                      By <span className="text-[#171717] font-medium">{article.author.name}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Scalable Archive notice */}
        <div className="pt-12 border-t border-[#D9D7D0] text-center text-xs text-[#66645F]">
          Showing {filteredArticles.length} of {ARTICLES.length} published guides in the Finance Guru central repository.
        </div>
      </main>
    </>
  );
}
