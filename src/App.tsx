/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RouterProvider, useRouter } from './context/RouterContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { BlogArchivePage } from './pages/BlogArchivePage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { NotFoundPage } from './pages/NotFoundPage';

function AppContent() {
  const { path } = useRouter();

  // Route matching
  const renderCurrentPage = () => {
    // Normalizing trailing slash except for root '/'
    const normalizedPath = path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path;

    if (normalizedPath === '' || normalizedPath === '/') {
      return <HomePage />;
    }

    if (normalizedPath === '/blog') {
      return <BlogArchivePage />;
    }

    if (normalizedPath.startsWith('/blog/')) {
      const slug = normalizedPath.replace('/blog/', '').split(/[?#]/)[0];
      return <ArticleDetailPage slug={slug} />;
    }

    if (normalizedPath === '/about') {
      return <AboutPage />;
    }

    if (normalizedPath === '/contact') {
      return <ContactPage />;
    }

    if (normalizedPath === '/privacy') {
      return <PrivacyPage />;
    }

    if (normalizedPath === '/terms') {
      return <TermsPage />;
    }

    return <NotFoundPage />;
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F7F6F2] text-[#171717]">
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
