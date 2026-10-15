import { getCategoryBySlug } from '../data/categories';
import { ARTICLES } from '../data/articles';
import { SEOHead } from '../components/SEOHead';
import { Link } from '../context/RouterContext';
import { formatDate } from '../utils/date';
import { NotFoundPage } from './NotFoundPage';
import { BookOpen, ArrowRight, CheckCircle2, Calculator } from 'lucide-react';

interface CategoryDetailPageProps {
  categorySlug: string;
}

export function CategoryDetailPage({ categorySlug }: CategoryDetailPageProps) {
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    return <NotFoundPage />;
  }

  const categoryArticles = ARTICLES.filter((art) => art.categorySlug === category.slug);

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
        name: 'Categories',
        item: 'https://ais-pre-qowgo7orkvzlqgbj7a32o3-472407255379.asia-east1.run.app/categories/',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: category.name,
        item: `https://ais-pre-qowgo7orkvzlqgbj7a32o3-472407255379.asia-east1.run.app/${category.slug}/`,
      },
    ],
  };

  return (
    <>
      <SEOHead
        title={category.seoTitle}
        description={category.metaDescription}
        canonicalPath={`/${category.slug}/`}
        keywords={[category.primaryKeyword, ...category.secondaryKeywords].join(', ')}
        schema={breadcrumbSchema}
      />

      <main className="max-w-5xl mx-auto px-6 pt-16 pb-24 text-left">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-8 text-xs text-[#66645F] flex items-center gap-2">
          <Link to="/" className="hover:text-[#171717] transition-colors">Home</Link>
          <span aria-hidden="true">/</span>
          <Link to="/categories/" className="hover:text-[#171717] transition-colors">Categories</Link>
          <span aria-hidden="true">/</span>
          <span className="text-[#171717] font-medium">{category.name}</span>
        </nav>

        {/* Category Header */}
        <header className="pb-12 border-b border-[#D9D7D0]">
          <div className="text-xs uppercase tracking-widest text-[#2E5A44] font-medium mb-3 flex items-center gap-1.5">
            <BookOpen size={14} /> Learning Curriculum
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-normal tracking-tight text-[#171717]">
            {category.name}
          </h1>
          <p className="mt-5 text-lg text-[#66645F] leading-relaxed max-w-3xl">
            {category.fullDescription}
          </p>

          {/* Curriculum Checklist */}
          <div className="mt-8 p-6 bg-white border border-[#D9D7D0] rounded-lg">
            <h2 className="text-xs font-mono uppercase tracking-wider text-[#2E5A44] font-semibold mb-3">
              Core Competencies &amp; Learning Objectives
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#171717]">
              {category.curriculumOverview.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <CheckCircle2 size={15} className="text-[#2E5A44] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </header>

        {/* Articles List */}
        <section className="pt-12">
          <div className="flex items-baseline justify-between mb-8">
            <h2 className="text-2xl font-serif font-medium text-[#171717]">
              Published Guides in this Category ({categoryArticles.length})
            </h2>
          </div>

          {categoryArticles.length > 0 ? (
            <div className="divide-y divide-[#D9D7D0]">
              {categoryArticles.map((art) => (
                <article key={art.slug} className="py-8 first:pt-0 last:pb-0 group">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#66645F] mb-2 font-mono">
                    <span className="text-[#2E5A44] font-medium">{art.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{art.readingTime}</span>
                    <span aria-hidden="true">·</span>
                    <span>Updated {formatDate(art.dateModified)}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-serif font-medium text-[#171717] group-hover:text-[#2E5A44] transition-colors">
                    <Link to={`/${art.categorySlug}/${art.slug}/`} className="focus-visible:outline-none">
                      {art.title}
                    </Link>
                  </h3>

                  <p className="text-sm sm:text-base text-[#66645F] mt-2.5 max-w-3xl leading-relaxed">
                    {art.excerpt}
                  </p>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-[#66645F]">
                      By <span className="text-[#171717] font-medium">{art.author.name}</span> ({art.author.role})
                    </span>
                    <Link
                      to={`/${art.categorySlug}/${art.slug}/`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2E5A44] group-hover:translate-x-0.5 transition-transform"
                    >
                      Read Guide <ArrowRight size={14} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="p-8 bg-[#EFECE6] rounded border border-[#D9D7D0] text-sm text-[#66645F]">
              Additional in-depth research guides are currently undergoing peer review by the Finance Guru Editorial Board.
            </div>
          )}
        </section>

        {/* Calculators Callout */}
        <aside className="mt-16 p-8 bg-[#EFECE6] border border-[#D9D7D0] rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#2E5A44] font-medium mb-1.5">
              <Calculator size={15} /> Practical Interactive Tools
            </div>
            <h3 className="text-xl font-serif font-medium text-[#171717]">
              Model Your Numbers with Financial Calculators
            </h3>
            <p className="text-xs sm:text-sm text-[#66645F] mt-1 max-w-lg leading-relaxed">
              Test compounding growth curves, simulate 50/30/20 monthly budget splits, and measure the exact drag of fund expense ratios.
            </p>
          </div>
          <Link
            to="/financial-calculators/"
            className="px-4 py-2.5 bg-[#2E5A44] hover:bg-[#224333] text-white text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 shadow-sm"
          >
            Open Calculators Suite →
          </Link>
        </aside>
      </main>
    </>
  );
}
