import { AUTHORS } from '../data/authors';
import { ARTICLES } from '../data/articles';
import { SEOHead } from '../components/SEOHead';
import { Link } from '../context/RouterContext';
import { formatDate } from '../utils/date';
import { NotFoundPage } from './NotFoundPage';
import { Award, CheckCircle2, BookOpen, ArrowRight, Shield } from 'lucide-react';

interface AuthorProfilePageProps {
  authorSlug: string;
}

export function AuthorProfilePage({ authorSlug }: AuthorProfilePageProps) {
  const author = AUTHORS[authorSlug];

  if (!author) {
    return <NotFoundPage />;
  }

  const authoredArticles = ARTICLES.filter((art) => art.author.slug === author.slug);

  const authorSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: author.name,
    jobTitle: author.role,
    description: author.bio,
    knowsAbout: author.reviewedTopics,
    worksFor: {
      '@type': 'Organization',
      name: 'Finance Guru',
      url: 'https://ais-pre-qowgo7orkvzlqgbj7a32o3-472407255379.asia-east1.run.app',
    },
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
        name: 'Authors',
        item: 'https://ais-pre-qowgo7orkvzlqgbj7a32o3-472407255379.asia-east1.run.app/about/',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: author.name,
        item: `https://ais-pre-qowgo7orkvzlqgbj7a32o3-472407255379.asia-east1.run.app/authors/${author.slug}/`,
      },
    ],
  };

  return (
    <>
      <SEOHead
        title={`${author.name} — Editorial Bio & Credentials — Finance Guru`}
        description={`Read the professional background, credentials, and published personal finance guides authored by ${author.name} at Finance Guru.`}
        canonicalPath={`/authors/${author.slug}/`}
        schema={[authorSchema, breadcrumbSchema]}
      />

      <main className="max-w-5xl mx-auto px-6 pt-16 pb-24 text-left">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8 text-xs text-[#66645F] flex items-center gap-2">
          <Link to="/" className="hover:text-[#171717] transition-colors">Home</Link>
          <span aria-hidden="true">/</span>
          <Link to="/about/" className="hover:text-[#171717] transition-colors">About</Link>
          <span aria-hidden="true">/</span>
          <span className="text-[#171717] font-medium">{author.name}</span>
        </nav>

        {/* Profile Header */}
        <header className="p-8 sm:p-10 bg-white border border-[#D9D7D0] rounded-lg shadow-sm">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="w-20 h-20 rounded-full bg-[#2E5A44]/15 text-[#2E5A44] flex items-center justify-center font-serif text-3xl font-bold shrink-0">
              {author.name.charAt(0)}
            </div>

            <div className="space-y-3 flex-1">
              <div className="text-xs uppercase tracking-widest text-[#2E5A44] font-mono font-medium flex items-center gap-1.5">
                <Shield size={14} /> Verified Editorial Contributor
              </div>
              <h1 className="text-3xl sm:text-4xl font-serif font-normal text-[#171717]">
                {author.name}
              </h1>
              <p className="text-sm font-medium text-[#2E5A44]">
                {author.role}
              </p>
              <p className="text-sm sm:text-base text-[#66645F] leading-relaxed max-w-2xl">
                {author.bio}
              </p>

              {/* Credentials Badges */}
              <div className="pt-3 border-t border-[#D9D7D0]/60 space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#66645F] block">
                  Professional Credentials &amp; Background
                </span>
                <div className="flex flex-wrap gap-2">
                  {author.credentials.map((cred, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-[#EFECE6] border border-[#D9D7D0] rounded text-xs text-[#171717] flex items-center gap-1.5"
                    >
                      <Award size={13} className="text-[#2E5A44]" /> {cred}
                    </span>
                  ))}
                  {author.yearsExperience && (
                    <span className="px-2.5 py-1 bg-[#EFECE6] border border-[#D9D7D0] rounded text-xs text-[#171717]">
                      {author.yearsExperience}+ Years Experience
                    </span>
                  )}
                </div>
              </div>

              {/* Topics of Expertise */}
              <div className="pt-2 flex flex-wrap items-center gap-1.5 text-xs text-[#66645F]">
                <span className="font-medium text-[#171717]">Reviewed Topics:</span>
                {author.reviewedTopics.map((top, i) => (
                  <span key={i} className="bg-[#FAF9F5] px-2 py-0.5 rounded border border-[#D9D7D0] text-[11px]">
                    {top}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </header>

        {/* Authored & Reviewed Articles */}
        <section className="mt-16">
          <div className="flex items-baseline justify-between mb-8 pb-4 border-b border-[#D9D7D0]">
            <h2 className="text-2xl font-serif font-medium text-[#171717] flex items-center gap-2">
              <BookOpen size={20} className="text-[#2E5A44]" /> Educational Guides by {author.name} ({authoredArticles.length})
            </h2>
          </div>

          <div className="divide-y divide-[#D9D7D0]">
            {authoredArticles.map((art) => (
              <article key={art.slug} className="py-6 first:pt-0 group">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#66645F] mb-1.5">
                  <span className="text-[#2E5A44] font-medium">{art.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{art.readingTime}</span>
                  <span aria-hidden="true">·</span>
                  <span>Updated {formatDate(art.dateModified)}</span>
                </div>

                <h3 className="text-xl font-serif font-medium text-[#171717] group-hover:text-[#2E5A44] transition-colors">
                  <Link to={`/${art.categorySlug}/${art.slug}/`} className="focus-visible:outline-none">
                    {art.title}
                  </Link>
                </h3>

                <p className="text-sm text-[#66645F] mt-2 line-clamp-2 max-w-2xl leading-relaxed">
                  {art.excerpt}
                </p>

                <div className="mt-3">
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
        </section>
      </main>
    </>
  );
}
