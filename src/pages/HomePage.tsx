import { ARTICLES } from '../data/articles';
import { Link } from '../context/RouterContext';
import { formatDate } from '../utils/date';
import { SEOHead } from '../components/SEOHead';
import { ArrowRight } from 'lucide-react';

export function HomePage() {
  const latestArticles = ARTICLES.slice(0, 3);

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Finance Guru',
    url: 'https://ais-pre-qowgo7orkvzlqgbj7a32o3-472407255379.asia-east1.run.app',
    description: 'Practical, evidence-based ideas for saving, investing, spending, and building long-term financial independence.',
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
        description="Practical, evidence-based ideas for saving, investing, spending, and building long-term financial independence. An editorial personal finance publication."
        canonicalPath="/"
        schema={websiteSchema}
      />

      <main className="max-w-5xl mx-auto px-6 pt-16 pb-24">
        {/* Hero Section */}
        <section className="max-w-3xl pb-16 md:pb-24 border-b border-[#D9D7D0]">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-normal tracking-tight text-[#171717] leading-[1.15] text-balance">
            Learn Money. Build Wealth. Own Your Future.
          </h1>

          <p className="mt-8 text-lg sm:text-xl text-[#66645F] leading-relaxed font-sans max-w-2xl">
            Practical, evidence-based ideas for saving, investing, spending, and building long-term financial independence.
          </p>

          <div className="mt-10">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#171717] hover:text-[#2E5A44] transition-colors py-2 border-b border-[#171717] hover:border-[#2E5A44]"
            >
              Read the latest essays
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </section>

        {/* Latest Articles Section */}
        <section id="latest" className="py-16 md:py-20 border-b border-[#D9D7D0]">
          <div className="flex items-baseline justify-between mb-12">
            <h2 className="text-2xl font-serif font-normal text-[#171717]">
              Recent Writing
            </h2>
            <Link
              to="/blog"
              className="text-xs uppercase tracking-wider text-[#66645F] hover:text-[#171717] transition-colors"
            >
              View all ({ARTICLES.length}) →
            </Link>
          </div>

          <div className="divide-y divide-[#D9D7D0]/70">
            {latestArticles.map((article) => (
              <article key={article.slug} className="py-10 first:pt-0 last:pb-0 group">
                {/* Zero-pill metadata */}
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#66645F] mb-3">
                  <span className="text-[#2E5A44] font-medium">{article.category}</span>
                  <span aria-hidden="true">·</span>
                  <time dateTime={article.datePublished}>{formatDate(article.datePublished)}</time>
                  <span aria-hidden="true">·</span>
                  <span>{article.readingTime}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-serif font-medium text-[#171717] group-hover:text-[#2E5A44] transition-colors leading-snug">
                  <Link to={`/blog/${article.slug}`} className="focus-visible:outline-none">
                    {article.title}
                  </Link>
                </h3>

                <p className="mt-4 text-base text-[#66645F] leading-relaxed max-w-3xl">
                  {article.excerpt}
                </p>

                <div className="mt-5">
                  <Link
                    to={`/blog/${article.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-[#171717] group-hover:text-[#2E5A44] transition-colors"
                  >
                    <span>Read essay</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* What We Cover Section */}
        <section className="py-16 md:py-20 border-b border-[#D9D7D0]">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-serif font-normal text-[#171717] mb-4">
              Areas of Inquest
            </h2>
            <p className="text-sm text-[#66645F] leading-relaxed mb-10">
              We focus strictly on the structural drivers of private wealth. No market forecasts, no speculative timing, no sponsored promotions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            <div className="border-t border-[#D9D7D0] pt-6">
              <h3 className="font-serif text-lg font-medium text-[#171717] mb-2">Saving &amp; Solvency</h3>
              <p className="text-sm text-[#66645F] leading-relaxed">
                Liquidity architectures, cash preservation, risk-free yield optimization, and building shock absorbers against life dislocations.
              </p>
            </div>

            <div className="border-t border-[#D9D7D0] pt-6">
              <h3 className="font-serif text-lg font-medium text-[#171717] mb-2">Passive Indexing</h3>
              <p className="text-sm text-[#66645F] leading-relaxed">
                Evidence-based asset allocation, broad-market index instruments, minimizing frictional fee drag, and mathematical compounding.
              </p>
            </div>

            <div className="border-t border-[#D9D7D0] pt-6">
              <h3 className="font-serif text-lg font-medium text-[#171717] mb-2">Money Psychology</h3>
              <p className="text-sm text-[#66645F] leading-relaxed">
                Examining the behavioral hazards of lifestyle creep, social comparison, hedonic treadmill effects, and the fear of missing out.
              </p>
            </div>

            <div className="border-t border-[#D9D7D0] pt-6">
              <h3 className="font-serif text-lg font-medium text-[#171717] mb-2">Financial Independence</h3>
              <p className="text-sm text-[#66645F] leading-relaxed">
                Decoupling your time from operational employment through high savings rates, sustainable withdrawal mechanics, and quiet frugality.
              </p>
            </div>
          </div>
        </section>

        {/* Editorial Standards / Trust Section */}
        <section className="pt-16 md:pt-20">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-serif font-normal text-[#171717] mb-4">
              Our Editorial Principles
            </h2>
            <p className="text-sm text-[#66645F] leading-relaxed mb-6">
              Finance Guru operates under a strict independent editorial charter. We do not accept payment to review or endorse financial products, nor do we run affiliate schemes disguised as educational articles.
            </p>
            <Link
              to="/about"
              className="text-xs uppercase tracking-wider text-[#2E5A44] hover:text-[#224333] font-medium"
            >
              Read our full editorial charter &amp; standards →
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
