import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalPath?: string;
  type?: 'website' | 'article';
  schema?: Record<string, unknown> | Record<string, unknown>[];
}

const BASE_URL = 'https://ais-pre-qowgo7orkvzlqgbj7a32o3-472407255379.asia-east1.run.app';

export function SEOHead({
  title,
  description,
  canonicalPath = '',
  type = 'website',
  schema,
}: SEOHeadProps) {
  useEffect(() => {
    // 1. Page title
    document.title = title;

    // 2. Meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // 3. Canonical link
    const cleanPath = canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`;
    const fullCanonicalUrl = `${BASE_URL}${cleanPath === '/' ? '' : cleanPath}`;
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', fullCanonicalUrl);

    // 4. OpenGraph tags
    const updateMeta = (attrName: string, attrVal: string, contentVal: string) => {
      let el = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrName, attrVal);
        document.head.appendChild(el);
      }
      el.setAttribute('content', contentVal);
    };

    updateMeta('property', 'og:title', title);
    updateMeta('property', 'og:description', description);
    updateMeta('property', 'og:url', fullCanonicalUrl);
    updateMeta('property', 'og:type', type);
    updateMeta('property', 'og:site_name', 'Finance Guru');

    // 5. Twitter tags
    updateMeta('name', 'twitter:title', title);
    updateMeta('name', 'twitter:description', description);
    updateMeta('name', 'twitter:card', 'summary_large_image');

    // 6. JSON-LD structured data
    let scriptJsonLd = document.getElementById('seo-json-ld');
    if (schema) {
      if (!scriptJsonLd) {
        scriptJsonLd = document.createElement('script');
        scriptJsonLd.id = 'seo-json-ld';
        scriptJsonLd.setAttribute('type', 'application/ld+json');
        document.head.appendChild(scriptJsonLd);
      }
      scriptJsonLd.textContent = JSON.stringify(schema, null, 2);
    } else if (scriptJsonLd) {
      scriptJsonLd.remove();
    }

    return () => {
      // Cleanup on unmount if needed
    };
  }, [title, description, canonicalPath, type, schema]);

  return null;
}
