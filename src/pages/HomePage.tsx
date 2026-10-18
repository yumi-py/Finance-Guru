import { useState, useMemo } from 'react';
import { ARTICLES } from '../data/articles';
import { CATEGORIES } from '../data/categories';
import { Link } from '../context/RouterContext';
import { formatDate } from '../utils/date';
import { SEOHead } from '../components/SEOHead';
import { ArrowRight, Search, CheckCircle2, TrendingUp, Calculator, ShieldCheck, Wallet, PiggyBank, CreditCard, Clock, LineChart } from 'lucide-react';

export function HomePage() {
  const featuredArticles = useMemo(() => {
    return ARTICLES.filter((a) => a.featured || ['what-is-compound-interest', 'how-to-create-a-monthly-budget', 'how-do-credit-scores-work'].includes(a.slug));
  }, []);

  // Quick Home Calculator Simulator State
  const [calcMonthly, setCalcMonthly] = useState<number>(300);
  const [calcYears, setCalcYears] = useState<number>(25);

  const quickSimValue = useMemo(() => {
    const r = 0.07 / 12;
    const n = calcYears * 12;
    const PMT = calcMonthly;
    const fv = PMT * ((Math.pow(1 + r, n) - 1) / r);
    const contributed = PMT * n;
    return {
      fv: Math.round(fv),
      contributed: Math.round(contributed),
      interest: Math.round(fv - contributed),
    };
  }, [calcMonthly, calcYears]);

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Finance Guru',
    url: 'https://ais-pre-qowgo7orkvzlqgbj7a32o3-472407255379.asia-east1.run.app',
    description: 'Empirical, evidence-based personal finance education covering budgeting, compound interest, low-cost investing, credit scores, taxes, and retirement.',
    publisher: {
      '@type': 'Organization',
      name: 'Finance Guru',
      logo: {
        '@type': 'ImageObject',
        url: 'https://ais-pre-qowgo7orkvzlqgbj7a32o3-472407255379.asia-east1.run.app/favicon.svg',
      },
    },
  };

  return (
    <>
      <SEOHead
        title="Finance Guru — Learn Money. Build Wealth. Own Your Future."
        description="Empirical, evidence-based personal finance education covering budgeting, compound interest, low-cost investing, credit scores, taxes, and retirement."
        canonicalPath="/"
        schema={websiteSchema}
      />

      <main className="max-w-5xl mx-auto px-6 pt-16 pb-24 text-left">
        {/* Hero Section */}
        <section className="max-w-3xl pb-16 md:pb-20 border-b border-[#D9D7D0]">
          <div className="text-xs uppercase tracking-widest text-[#2E5A44] font-mono font-medium mb-4">
            Educational Financial Literacy
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-normal tracking-tight text-[#171717] leading-[1.12] text-balance">
            Learn Money. Build Wealth. Own Your Future.
          </h1>

          <p className="mt-8 text-lg sm:text-xl text-[#66645F] leading-relaxed font-sans max-w-2xl">
            Practical, evidence-based education on saving, budgeting, index investing, credit scores, taxes, and wealth creation. Zero sponsored hype. 100% reproducible math.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              to="/categories/"
              className="px-5 py-2.5 bg-[#2E5A44] hover:bg-[#224333] text-white text-sm font-medium rounded transition-colors shadow-sm inline-flex items-center gap-2"
            >
              Explore Learning Pathways
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/financial-calculators/"
              className="px-5 py-2.5 bg-white hover:bg-[#EFECE6] text-[#171717] border border-[#D9D7D0] text-sm font-medium rounded transition-colors inline-flex items-center gap-2"
            >
              <Calculator size={16} className="text-[#2E5A44]" />
              Interactive Calculators
            </Link>
          </div>
        </section>

        {/* 8 Core Categories Quick Jump */}
        <section className="py-16 border-b border-[#D9D7D0]">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-8 gap-2">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#2E5A44] font-medium block">
                Structured Curricula
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-medium text-[#171717]">
                Finance Learning Categories
              </h2>
            </div>
            <Link
              to="/categories/"
              className="text-xs uppercase tracking-wider text-[#2E5A44] hover:underline font-semibold"
            >
              View all 8 pathways →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                to={`/${cat.slug}/`}
                className="p-4 bg-white border border-[#D9D7D0] rounded-lg hover:border-[#2E5A44] hover:shadow-xs transition-all group flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-serif text-base font-medium text-[#171717] group-hover:text-[#2E5A44] transition-colors leading-snug">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-[#66645F] mt-1 line-clamp-2 leading-relaxed">
                    {cat.shortDescription}
                  </p>
                </div>
                <span className="mt-3 text-[11px] font-semibold text-[#2E5A44] inline-flex items-center gap-1">
                  Start Path <ArrowRight size={11} />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Interactive Compound Calculator Spotlight */}
        <section className="py-16 border-b border-[#D9D7D0]">
          <div className="p-8 bg-[#EFECE6] rounded-xl border border-[#D9D7D0] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white rounded border border-[#D9D7D0] text-xs font-mono text-[#2E5A44] font-medium">
                <TrendingUp size={14} /> Interactive Simulation
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-medium text-[#171717]">
                How $300/Month Compounds Over Time
              </h2>
              <p className="text-sm text-[#66645F] leading-relaxed">
                Adjust the sliders below to see the mathematical acceleration of broad-market index compounding at an illustrative 7% annual return.
              </p>

              <div className="space-y-4 pt-2">
                <div>
                  <div className="flex justify-between text-xs font-medium text-[#171717] mb-1">
                    <span>Monthly Savings Contribution:</span>
                    <span className="font-mono text-[#2E5A44] font-bold">${calcMonthly} / month</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="1500"
                    step="50"
                    value={calcMonthly}
                    onChange={(e) => setCalcMonthly(Number(e.target.value))}
                    className="w-full accent-[#2E5A44]"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium text-[#171717] mb-1">
                    <span>Years of Compounding:</span>
                    <span className="font-mono text-[#2E5A44] font-bold">{calcYears} Years</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="40"
                    step="1"
                    value={calcYears}
                    onChange={(e) => setCalcYears(Number(e.target.value))}
                    className="w-full accent-[#2E5A44]"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white p-6 rounded-lg border border-[#D9D7D0] text-center space-y-3">
              <span className="text-xs uppercase tracking-wider text-[#66645F] font-mono block">
                Estimated Future Balance
              </span>
              <div className="text-4xl font-serif font-normal text-[#171717]">
                ${quickSimValue.fv.toLocaleString()}
              </div>
              <div className="pt-3 border-t border-[#D9D7D0]/60 text-xs text-[#66645F] space-y-1">
                <div className="flex justify-between">
                  <span>Your Deposits:</span>
                  <span className="font-mono font-medium text-[#171717]">${quickSimValue.contributed.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Interest Growth:</span>
                  <span className="font-mono font-medium text-[#2E5A44]">+${quickSimValue.interest.toLocaleString()}</span>
                </div>
              </div>

              <div className="pt-3">
                <Link
                  to="/financial-calculators/"
                  className="w-full py-2 bg-[#2E5A44] hover:bg-[#224333] text-white text-xs font-medium rounded block transition-colors shadow-xs"
                >
                  Open Full Calculators Suite →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Educational Guides */}
        <section className="py-16 border-b border-[#D9D7D0]">
          <div className="flex items-baseline justify-between mb-10">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#2E5A44] font-medium block">
                Recommended Reading
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-medium text-[#171717]">
                Foundational Educational Guides
              </h2>
            </div>
            <Link
              to="/blog/"
              className="text-xs uppercase tracking-wider text-[#2E5A44] hover:underline font-semibold"
            >
              Browse all guides ({ARTICLES.length}) →
            </Link>
          </div>

          <div className="divide-y divide-[#D9D7D0]">
            {featuredArticles.map((art) => (
              <article key={art.slug} className="py-8 first:pt-0 group">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#66645F] mb-2">
                  <span className="text-[#2E5A44] font-medium">{art.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{art.readingTime}</span>
                  <span aria-hidden="true">·</span>
                  <span>Updated {formatDate(art.dateModified)}</span>
                </div>

                <div className="flex flex-col md:flex-row gap-6 items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl font-serif font-medium text-[#171717] group-hover:text-[#2E5A44] transition-colors">
                      <Link to={`/${art.categorySlug}/${art.slug}/`} className="focus-visible:outline-none">
                        {art.title}
                      </Link>
                    </h3>

                    <p className="text-sm sm:text-base text-[#66645F] mt-2.5 max-w-2xl leading-relaxed">
                      {art.excerpt}
                    </p>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs text-[#66645F]">
                        By <span className="text-[#171717] font-medium">{art.author.name}</span>
                      </span>
                      <Link
                        to={`/${art.categorySlug}/${art.slug}/`}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2E5A44] group-hover:translate-x-0.5 transition-transform"
                      >
                        Read Guide <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>

                  {art.heroImage && (
                    <Link
                      to={`/${art.categorySlug}/${art.slug}/`}
                      className="w-full md:w-52 aspect-16/9 md:aspect-auto md:h-32 shrink-0 rounded-lg overflow-hidden border border-[#D9D7D0] bg-[#EFECE6] block group-hover:border-[#2E5A44]/50 transition-colors shadow-2xs"
                      tabIndex={-1}
                      aria-hidden="true"
                    >
                      <picture className="block w-full h-full">
                        {(art.heroImage.webpSrc || (typeof art.heroImage.src === 'string' && art.heroImage.src.includes('.jpg'))) && (
                          <source
                            srcSet={art.heroImage.webpSrc || art.heroImage.src.replace(/\.(jpg|jpeg)$/, '.webp')}
                            type="image/webp"
                          />
                        )}
                        <img
                          src={art.heroImage.src}
                          alt={art.heroImage.alt}
                          width={400}
                          height={225}
                          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300 block"
                          loading="lazy"
                        />
                      </picture>
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* The Finance Guru Standards / E-E-A-T Section */}
        <section className="py-16">
          <div className="text-xs font-mono uppercase tracking-wider text-[#2E5A44] font-medium mb-3">
            Why Finance Guru
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-medium text-[#171717] mb-4">
            An Education Charter Built on Trust &amp; Empirical Math
          </h2>
          <p className="text-[#66645F] max-w-2xl text-sm sm:text-base leading-relaxed mb-10">
            We reject the sensationalism, sponsored credit card affiliate lists, and trading gambling promoted across commercial financial media.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 bg-white border border-[#D9D7D0] rounded-lg space-y-2">
              <ShieldCheck size={20} className="text-[#2E5A44]" />
              <h3 className="font-serif text-lg font-medium text-[#171717]">
                Primary Regulatory Sources
              </h3>
              <p className="text-xs text-[#66645F] leading-relaxed">
                All data, rules, and formulas cite primary authorities: the SEC, IRS, CFPB, Federal Reserve, and peer-reviewed economic literature.
              </p>
            </div>

            <div className="p-6 bg-white border border-[#D9D7D0] rounded-lg space-y-2">
              <CheckCircle2 size={20} className="text-[#2E5A44]" />
              <h3 className="font-serif text-lg font-medium text-[#171717]">
                Reproducible Equations
              </h3>
              <p className="text-xs text-[#66645F] leading-relaxed">
                Compound growth curves, fee erosion calculations, and 4% rule metrics are documented with transparent mathematical proofs.
              </p>
            </div>

            <div className="p-6 bg-white border border-[#D9D7D0] rounded-lg space-y-2">
              <Wallet size={20} className="text-[#2E5A44]" />
              <h3 className="font-serif text-lg font-medium text-[#171717]">
                Zero Commercial Bias
              </h3>
              <p className="text-xs text-[#66645F] leading-relaxed">
                We do not sell investment products, accept kickbacks from loan providers, or compromise reader trust for advertising volume.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
