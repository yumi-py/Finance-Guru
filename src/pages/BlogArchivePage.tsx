import { useState, useMemo } from 'react';
import { ARTICLES } from '../data/articles';
import { Link } from '../context/RouterContext';
import { formatDate } from '../utils/date';
import { SEOHead } from '../components/SEOHead';
import { Search } from 'lucide-react';

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
        name: 'Journal',
        item: 'https://ais-pre-qowgo7orkvzlqgbj7a32o3-472407255379.asia-east1.run.app/blog',
      },
    ],
  };

  return (
    <>
      <SEOHead
        title="Journal — Finance Guru"
        description="Essays, empirical research, and long-form analysis on saving, index investing, behavioral finance, and wealth preservation."
        canonicalPath="/blog"
        schema={breadcrumbSchema}
      />

      <main className="max-w-5xl mx-auto px-6 pt-16 pb-24">
        {/* Header Section */}
        <header className="max-w-3xl pb-12 border-b border-[#D9D7D0]">
          <h1 className="text-4xl sm:text-5xl font-serif font-normal tracking-tight text-[#171717]">
            Journal
          </h1>
          <p className="mt-5 text-lg text-[#66645F] leading-relaxed font-sans">
            A continuous archive of long-form essays, empirical analyses, and philosophical inquiries into personal solvency and capital stewardship.
          </p>
        </header>

        {/* Filter and Search Bar (clean functional interactive controls, no static pills) */}
        <div className="py-8 border-b border-[#D9D7D0] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          {/* Functional category tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-[#171717] text-[#F7F6F2]'
                    : 'text-[#66645F] hover:text-[#171717] bg-[#EFECE6]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search input */}
          <div className="relative w-full sm:w-64">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#66645F]"
              aria-hidden="true"
            />
            <input
              type="text"
              placeholder="Search essays or topics..."
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
                <article key={article.slug} className="py-12 first:pt-0 last:pb-0 group">
                  {/* Clean unboxed metadata with separators */}
                  <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#66645F] mb-3">
                    <span className="text-[#2E5A44] font-medium">{article.category}</span>
                    <span aria-hidden="true">·</span>
                    <time dateTime={article.datePublished}>{formatDate(article.datePublished)}</time>
                    <span aria-hidden="true">·</span>
                    <span>{article.readingTime}</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-serif font-medium text-[#171717] group-hover:text-[#2E5A44] transition-colors leading-snug">
                    <Link to={`/blog/${article.slug}`} className="focus-visible:outline-none">
                      {article.title}
                    </Link>
                  </h2>

                  <p className="mt-4 text-base text-[#66645F] leading-relaxed max-w-3xl">
                    {article.excerpt}
                  </p>

                  <div className="mt-6 flex items-center justify-between">
                    <Link
                      to={`/blog/${article.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-[#171717] group-hover:text-[#2E5A44] transition-colors"
                    >
                      <span>Read essay</span>
                      <span aria-hidden="true">→</span>
                    </Link>

                    <div className="text-xs text-[#66645F] hidden sm:block">
                      By {article.author.name}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Scalable Archive notice */}
        <div className="pt-12 border-t border-[#D9D7D0] text-center text-xs text-[#66645F]">
          Showing {filteredArticles.length} of {ARTICLES.length} published essays. New research released bi-weekly.
        </div>
      </main>
    </>
  );
}
