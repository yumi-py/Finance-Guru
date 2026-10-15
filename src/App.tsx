/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RouterProvider, useRouter } from './context/RouterContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { CategoriesHubPage } from './pages/CategoriesHubPage';
import { CategoryDetailPage } from './pages/CategoryDetailPage';
import { CalculatorsPage } from './pages/CalculatorsPage';
import { BlogArchivePage } from './pages/BlogArchivePage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { AuthorProfilePage } from './pages/AuthorProfilePage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { EditorialPolicyPage } from './pages/EditorialPolicyPage';
import { FinancialDisclaimerPage } from './pages/FinancialDisclaimerPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { HtmlSitemapPage } from './pages/HtmlSitemapPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Categories data for route verification
import { CATEGORIES } from './data/categories';
import { ARTICLES } from './data/articles';

function AppContent() {
  const { path } = useRouter();

  const renderCurrentPage = () => {
    // Normalize path by stripping hash and query params
    const cleanPath = path.split(/[?#]/)[0];
    const segments = cleanPath.split('/').filter(Boolean);

    // Root '/'
    if (segments.length === 0) {
      return <HomePage />;
    }

    const first = segments[0];

    // Static Utility Pages
    if (first === 'about') return <AboutPage />;
    if (first === 'contact') return <ContactPage />;
    if (first === 'categories') return <CategoriesHubPage />;
    if (first === 'financial-calculators') return <CalculatorsPage />;
    if (first === 'editorial-policy') return <EditorialPolicyPage />;
    if (first === 'financial-disclaimer') return <FinancialDisclaimerPage />;
    if (first === 'privacy') return <PrivacyPage />;
    if (first === 'terms') return <TermsPage />;
    if (first === 'sitemap') return <HtmlSitemapPage />;

    // Blog Archive & legacy blog paths
    if (first === 'blog') {
      if (segments.length === 1) {
        return <BlogArchivePage />;
      }
      const articleSlug = segments[1];
      return <ArticleDetailPage slug={articleSlug} />;
    }

    // Author Profiles (/authors/:slug)
    if (first === 'authors' || first === 'author') {
      if (segments.length > 1) {
        return <AuthorProfilePage authorSlug={segments[1]} />;
      }
      return <AboutPage />;
    }

    // 8 Learning Categories & Nested Articles
    // Scenario A: Category Hub (/personal-finance/)
    const matchedCategory = CATEGORIES.find((c) => c.slug === first);
    if (matchedCategory) {
      if (segments.length === 1) {
        return <CategoryDetailPage categorySlug={matchedCategory.slug} />;
      }
      if (segments.length === 2) {
        // Nested article under category (e.g. /investing-for-beginners/what-is-compound-interest/)
        const articleSlug = segments[1];
        return <ArticleDetailPage slug={articleSlug} categorySlug={matchedCategory.slug} />;
      }
    }

    // Scenario B: Direct article slug in root (e.g. /what-is-compound-interest/)
    const matchedArticle = ARTICLES.find((a) => a.slug === first);
    if (matchedArticle && segments.length === 1) {
      return <ArticleDetailPage slug={matchedArticle.slug} categorySlug={matchedArticle.categorySlug} />;
    }

    return <NotFoundPage />;
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F7F6F2] text-[#171717] antialiased">
      <Header />
      <div className="flex-1">
        {renderCurrentPage()}
      </div>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <AppContent />
    </RouterProvider>
  );
}
