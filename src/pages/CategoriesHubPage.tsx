import { SEOHead } from '../components/SEOHead';
import { CATEGORIES } from '../data/categories';
import { ARTICLES } from '../data/articles';
import { Link } from '../context/RouterContext';
import { Wallet, PiggyBank, TrendingUp, LineChart, CreditCard, ShieldCheck, Receipt, Clock, ArrowRight, BookOpen } from 'lucide-react';

const ICON_MAP: Record<string, React.ReactNode> = {
  Wallet: <Wallet size={24} className="text-[#2E5A44]" />,
  PiggyBank: <PiggyBank size={24} className="text-[#2E5A44]" />,
  TrendingUp: <TrendingUp size={24} className="text-[#2E5A44]" />,
  LineChart: <LineChart size={24} className="text-[#2E5A44]" />,
  CreditCard: <CreditCard size={24} className="text-[#2E5A44]" />,
  ShieldCheck: <ShieldCheck size={24} className="text-[#2E5A44]" />,
  Receipt: <Receipt size={24} className="text-[#2E5A44]" />,
  Clock: <Clock size={24} className="text-[#2E5A44]" />,
};

export function CategoriesHubPage() {
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
        name: 'Finance Learning Categories',
        item: 'https://ais-pre-qowgo7orkvzlqgbj7a32o3-472407255379.asia-east1.run.app/categories/',
      },
    ],
  };

  return (
    <>
      <SEOHead
        title="Finance Learning Categories &amp; Curricula — Finance Guru"
        description="Browse Finance Guru's structured finance learning categories: budgeting, investing, stocks, credit cards, loans, insurance, taxes, and retirement."
        canonicalPath="/categories/"
        schema={breadcrumbSchema}
      />

      <main className="max-w-5xl mx-auto px-6 pt-16 pb-24 text-left">
        {/* Navigation Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8 text-xs text-[#66645F] flex items-center gap-2">
          <Link to="/" className="hover:text-[#171717] transition-colors">Home</Link>
          <span aria-hidden="true">/</span>
          <span className="text-[#171717] font-medium">Categories</span>
        </nav>

        {/* Header */}
        <header className="max-w-3xl pb-12 border-b border-[#D9D7D0]">
          <div className="text-xs uppercase tracking-widest text-[#2E5A44] font-medium mb-3 flex items-center gap-2">
            <BookOpen size={14} /> Structured Knowledge Pillars
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-normal tracking-tight text-[#171717]">
            Finance Learning Categories
          </h1>
          <p className="mt-5 text-lg text-[#66645F] leading-relaxed">
            Organized step-by-step pathways designed to take you from foundational money literacy to sophisticated wealth compounding and retirement security.
          </p>
        </header>

        {/* Grid of 8 Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12">
          {CATEGORIES.map((cat) => {
            const count = ARTICLES.filter((a) => a.categorySlug === cat.slug).length;
            return (
              <article
                key={cat.id}
                className="p-8 bg-white border border-[#D9D7D0] rounded-lg hover:border-[#2E5A44]/60 transition-all shadow-sm hover:shadow-md flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-lg bg-[#EFECE6] flex items-center justify-center mb-6">
                    {ICON_MAP[cat.iconName] || <BookOpen size={24} className="text-[#2E5A44]" />}
                  </div>

                  <h2 className="text-2xl font-serif font-medium text-[#171717] group-hover:text-[#2E5A44] transition-colors">
                    <Link to={`/${cat.slug}/`} className="focus-visible:outline-none">
                      {cat.name}
                    </Link>
                  </h2>

                  <p className="mt-3 text-sm text-[#66645F] leading-relaxed">
                    {cat.shortDescription}
                  </p>

                  {/* Curriculum topics */}
                  <div className="mt-6 pt-5 border-t border-[#D9D7D0]/60 space-y-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#2E5A44] font-medium block">
                      Core Curriculum Focus
                    </span>
                    <ul className="text-xs text-[#66645F] space-y-1.5 list-disc pl-4">
                      {cat.curriculumOverview.slice(0, 3).map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-[#D9D7D0] flex items-center justify-between">
                  <span className="text-xs text-[#66645F] font-mono">
                    {count} {count === 1 ? 'Comprehensive Guide' : 'Comprehensive Guides'}
                  </span>
                  <Link
                    to={`/${cat.slug}/`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2E5A44] group-hover:translate-x-0.5 transition-transform"
                  >
                    Explore Pathway <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </main>
    </>
  );
}
