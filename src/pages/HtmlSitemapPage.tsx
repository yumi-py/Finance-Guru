import { SEOHead } from '../components/SEOHead';
import { Link } from '../context/RouterContext';
import { CATEGORIES } from '../data/categories';
import { ARTICLES } from '../data/articles';
import { AUTHORS } from '../data/authors';
import { Map, Folder, BookOpen, Calculator, UserCheck, Shield } from 'lucide-react';

export function HtmlSitemapPage() {
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
        name: 'Visual Sitemap',
        item: 'https://ais-pre-qowgo7orkvzlqgbj7a32o3-472407255379.asia-east1.run.app/sitemap/',
      },
    ],
  };

  return (
    <>
      <SEOHead
        title="Website Sitemap: All Pages & Educational Paths — Finance Guru"
        description="Complete visual HTML directory of all learning categories, educational articles, financial calculators, authors, and regulatory disclosures on Finance Guru."
        canonicalPath="/sitemap/"
        schema={breadcrumbSchema}
      />

      <main className="max-w-5xl mx-auto px-6 pt-16 pb-24 text-left">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8 text-xs text-[#66645F] flex items-center gap-2">
          <Link to="/" className="hover:text-[#171717] transition-colors">Home</Link>
          <span aria-hidden="true">/</span>
          <span className="text-[#171717] font-medium">Visual Sitemap</span>
        </nav>

        {/* Header */}
        <header className="pb-12 border-b border-[#D9D7D0]">
          <div className="text-xs uppercase tracking-widest text-[#2E5A44] font-medium mb-3 flex items-center gap-1.5">
            <Map size={15} /> Information Architecture &amp; Index
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-normal tracking-tight text-[#171717]">
            Finance Guru Website Sitemap
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#66645F] max-w-2xl leading-relaxed">
            A comprehensive, hierarchical index of all canonical educational pathways, articles, calculators, author credentials, and regulatory documentation.
          </p>
        </header>

        {/* Sitemap Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pt-12">
          {/* Section 1: Core Navigation & Hubs */}
          <section className="space-y-4">
            <h2 className="text-lg font-serif font-medium text-[#171717] flex items-center gap-2 pb-2 border-b border-[#D9D7D0]">
              <Folder size={16} className="text-[#2E5A44]" /> Primary Portals &amp; Hubs
            </h2>
            <ul className="space-y-2.5 text-xs text-[#171717]">
              <li>
                <Link to="/" className="text-[#2E5A44] hover:underline font-medium">
                  Homepage (/)
                </Link>
                <p className="text-[#66645F] text-[11px]">Primary education portal &amp; learning pillars</p>
              </li>
              <li>
                <Link to="/categories/" className="text-[#2E5A44] hover:underline font-medium">
                  Categories Hub (/categories/)
                </Link>
                <p className="text-[#66645F] text-[11px]">All 8 structured curriculum pathways</p>
              </li>
              <li>
                <Link to="/financial-calculators/" className="text-[#2E5A44] hover:underline font-medium">
                  Financial Calculators Suite (/financial-calculators/)
                </Link>
                <p className="text-[#66645F] text-[11px]">Compound interest, budget, fee drag &amp; retirement</p>
              </li>
              <li>
                <Link to="/blog/" className="text-[#2E5A44] hover:underline font-medium">
                  Resources &amp; Archive (/blog/)
                </Link>
                <p className="text-[#66645F] text-[11px]">Full chronological educational archive</p>
              </li>
            </ul>
          </section>

          {/* Section 2: 8 Learning Pathways */}
          <section className="space-y-4">
            <h2 className="text-lg font-serif font-medium text-[#171717] flex items-center gap-2 pb-2 border-b border-[#D9D7D0]">
              <BookOpen size={16} className="text-[#2E5A44]" /> 8 Learning Categories
            </h2>
            <ul className="space-y-2 text-xs text-[#171717]">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link to={`/${cat.slug}/`} className="text-[#2E5A44] hover:underline font-medium">
                    {cat.name} (/{cat.slug}/)
                  </Link>
                  <p className="text-[#66645F] text-[11px] truncate">{cat.shortDescription}</p>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 3: Educational Articles */}
          <section className="space-y-4">
            <h2 className="text-lg font-serif font-medium text-[#171717] flex items-center gap-2 pb-2 border-b border-[#D9D7D0]">
              <BookOpen size={16} className="text-[#2E5A44]" /> Canonical Educational Articles
            </h2>
            <ul className="space-y-2.5 text-xs text-[#171717]">
              {ARTICLES.map((art) => (
                <li key={art.slug}>
                  <Link to={`/${art.categorySlug}/${art.slug}/`} className="text-[#2E5A44] hover:underline font-medium">
                    {art.title}
                  </Link>
                  <p className="text-[#66645F] text-[11px] font-mono">
                    /{art.categorySlug}/{art.slug}/
                  </p>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 4: Author Profiles */}
          <section className="space-y-4">
            <h2 className="text-lg font-serif font-medium text-[#171717] flex items-center gap-2 pb-2 border-b border-[#D9D7D0]">
              <UserCheck size={16} className="text-[#2E5A44]" /> Editorial Authors
            </h2>
            <ul className="space-y-2.5 text-xs text-[#171717]">
              {Object.values(AUTHORS).map((author) => (
                <li key={author.slug}>
                  <Link to={`/authors/${author.slug}/`} className="text-[#2E5A44] hover:underline font-medium">
                    {author.name}
                  </Link>
                  <p className="text-[#66645F] text-[11px]">{author.role}</p>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 5: Trust, Legal & Standards */}
          <section className="space-y-4">
            <h2 className="text-lg font-serif font-medium text-[#171717] flex items-center gap-2 pb-2 border-b border-[#D9D7D0]">
              <Shield size={16} className="text-[#2E5A44]" /> Trust &amp; Regulatory Disclosures
            </h2>
            <ul className="space-y-2.5 text-xs text-[#171717]">
              <li>
                <Link to="/about/" className="text-[#2E5A44] hover:underline font-medium">
                  About Finance Guru (/about/)
                </Link>
              </li>
              <li>
                <Link to="/editorial-policy/" className="text-[#2E5A44] hover:underline font-medium">
                  Editorial Policy &amp; Verification (/editorial-policy/)
                </Link>
              </li>
              <li>
                <Link to="/financial-disclaimer/" className="text-[#2E5A44] hover:underline font-medium">
                  Financial Disclaimer &amp; Notice (/financial-disclaimer/)
                </Link>
              </li>
              <li>
                <Link to="/contact/" className="text-[#2E5A44] hover:underline font-medium">
                  Contact Editorial Desk (/contact/)
                </Link>
              </li>
              <li>
                <Link to="/privacy/" className="text-[#2E5A44] hover:underline font-medium">
                  Privacy Policy (/privacy/)
                </Link>
              </li>
              <li>
                <Link to="/terms/" className="text-[#2E5A44] hover:underline font-medium">
                  Terms of Use (/terms/)
                </Link>
              </li>
              <li>
                <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="text-[#2E5A44] hover:underline font-medium">
                  Raw XML Sitemap (/sitemap.xml) ↗
                </a>
              </li>
            </ul>
          </section>
        </div>
      </main>
    </>
  );
}
