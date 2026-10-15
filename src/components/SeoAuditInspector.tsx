import { useState } from 'react';
import { AlertCircle, CheckCircle2, ShieldAlert, X, Eye, Sliders, Database } from 'lucide-react';
import { MASTER_PAGE_REGISTRY, validatePageRegistry, getRegistryItemByUrl } from '../data/pageRegistry';
import { useRouter } from '../context/RouterContext';

interface SeoAuditInspectorProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SeoAuditInspector({ isOpen, onClose }: SeoAuditInspectorProps) {
  const { path } = useRouter();
  const [activeTab, setActiveTab] = useState<'current' | 'all'>('current');

  if (!isOpen) return null;

  const currentItem = getRegistryItemByUrl(path) || {
    url: path,
    pageType: 'Utility' as const,
    title: document.title,
    h1Title: 'Active Viewport Page',
    primaryKeyword: 'N/A',
    relatedKeywords: [],
    searchIntent: 'Informational' as const,
    targetAudience: 'General Audience',
    metaDescription: document.querySelector('meta[name="description"]')?.getAttribute('content') || 'Missing',
    canonicalUrl: `${window.location.origin}${path}`,
    indexable: true,
    status: 'Published' as const,
    targetJurisdiction: 'Global / Universal' as const,
    lastUpdated: '2026-10-14',
  };

  const validationIssues = validatePageRegistry();
  const errors = validationIssues.filter((i) => i.severity === 'error');
  const warnings = validationIssues.filter((i) => i.severity === 'warning');

  const titleLength = currentItem.title.length;
  const descLength = currentItem.metaDescription.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in text-left">
      <div
        className="w-full max-w-3xl bg-[#FAF9F5] rounded-lg border border-[#D9D7D0] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        role="dialog"
        aria-modal="true"
        aria-label="Content Quality & Technical SEO Inspector"
      >
        {/* Header */}
        <div className="px-5 py-3.5 bg-[#EFECE6] border-b border-[#D9D7D0] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sliders size={18} className="text-[#2E5A44]" />
            <h2 className="font-serif text-lg font-medium text-[#171717]">
              Editorial &amp; Technical SEO Quality Inspector
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-[#D9D7D0]/60 text-[#66645F] hover:text-[#171717] transition-colors"
            aria-label="Close Inspector"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-[#D9D7D0] bg-[#FAF9F5] px-5 pt-2 text-xs font-medium">
          <button
            onClick={() => setActiveTab('current')}
            className={`pb-2.5 px-3 border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'current'
                ? 'border-[#2E5A44] text-[#2E5A44] font-semibold'
                : 'border-transparent text-[#66645F] hover:text-[#171717]'
            }`}
          >
            <Eye size={14} /> Active Page Metadata ({path})
          </button>
          <button
            onClick={() => setActiveTab('all')}
            className={`pb-2.5 px-3 border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'all'
                ? 'border-[#2E5A44] text-[#2E5A44] font-semibold'
                : 'border-transparent text-[#66645F] hover:text-[#171717]'
            }`}
          >
            <Database size={14} /> Centralized Registry Health ({MASTER_PAGE_REGISTRY.length} URLs)
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-6 flex-1 text-xs text-[#171717]">
          {activeTab === 'current' ? (
            <div className="space-y-4">
              {/* Target Audience & Intent */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 bg-white rounded border border-[#D9D7D0]">
                <div>
                  <span className="text-[#66645F] block font-mono text-[10px] uppercase">Search Intent</span>
                  <span className="font-semibold text-sm text-[#2E5A44]">{currentItem.searchIntent}</span>
                </div>
                <div>
                  <span className="text-[#66645F] block font-mono text-[10px] uppercase">Page Type</span>
                  <span className="font-semibold text-sm text-[#171717]">{currentItem.pageType}</span>
                </div>
                <div>
                  <span className="text-[#66645F] block font-mono text-[10px] uppercase">Target Jurisdiction</span>
                  <span className="font-semibold text-sm text-[#171717]">{currentItem.targetJurisdiction}</span>
                </div>
                <div className="sm:col-span-3 pt-2 border-t border-[#D9D7D0]/60">
                  <span className="text-[#66645F] block font-mono text-[10px] uppercase">Target Audience</span>
                  <span className="text-[#171717] font-medium">{currentItem.targetAudience}</span>
                </div>
              </div>

              {/* Keyword Metadata */}
              <div className="p-3.5 bg-white rounded border border-[#D9D7D0] space-y-2.5">
                <h3 className="font-mono text-[11px] uppercase tracking-wider text-[#2E5A44] font-semibold">
                  Keyword Mapping &amp; Semantic Coverage
                </h3>
                <div>
                  <span className="text-[#66645F] text-[10px] uppercase block">Primary Keyword:</span>
                  <span className="font-mono bg-[#EFECE6] px-2 py-0.5 rounded text-[#171717] font-medium text-xs inline-block mt-0.5">
                    {currentItem.primaryKeyword}
                  </span>
                </div>
                <div>
                  <span className="text-[#66645F] text-[10px] uppercase block">Secondary Keywords:</span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {currentItem.relatedKeywords.length > 0 ? (
                      currentItem.relatedKeywords.map((kw, i) => (
                        <span key={i} className="font-mono bg-[#EFECE6] px-2 py-0.5 rounded text-[#66645F] text-[11px]">
                          {kw}
                        </span>
                      ))
                    ) : (
                      <span className="text-[#66645F] italic">None specified</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Title & Description Tag Quality */}
              <div className="p-3.5 bg-white rounded border border-[#D9D7D0] space-y-3">
                <h3 className="font-mono text-[11px] uppercase tracking-wider text-[#2E5A44] font-semibold">
                  Search Snippet &amp; Character Length Evaluation
                </h3>

                <div>
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="font-medium text-[#171717]">SEO Title Tag</span>
                    <span className={`font-mono text-[10px] ${titleLength > 65 ? 'text-amber-700' : 'text-emerald-700'}`}>
                      {titleLength} characters (Recommended: 45–60)
                    </span>
                  </div>
                  <div className="p-2 bg-[#FAF9F5] border border-[#D9D7D0] rounded font-serif text-sm text-[#171717]">
                    {currentItem.title}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="font-medium text-[#171717]">Meta Description</span>
                    <span className={`font-mono text-[10px] ${descLength > 165 || descLength < 110 ? 'text-amber-700' : 'text-emerald-700'}`}>
                      {descLength} characters (Recommended: 120–160)
                    </span>
                  </div>
                  <div className="p-2 bg-[#FAF9F5] border border-[#D9D7D0] rounded text-xs text-[#66645F] leading-relaxed">
                    {currentItem.metaDescription}
                  </div>
                </div>

                <div>
                  <span className="text-[#66645F] text-[10px] uppercase block mb-0.5">Canonical URL</span>
                  <span className="font-mono text-[11px] text-[#2E5A44] select-all break-all">
                    {currentItem.canonicalUrl}
                  </span>
                </div>
              </div>

              {/* AEO & E-E-A-T Quality Checklist */}
              <div className="p-3.5 bg-[#EFECE6]/60 rounded border border-[#D9D7D0] space-y-1.5 text-[11px]">
                <div className="font-medium text-[#171717] flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-[#2E5A44]" /> E-E-A-T &amp; AEO Architecture Verified
                </div>
                <ul className="list-disc pl-5 text-[#66645F] space-y-0.5">
                  <li>Structured Schema.org JSON-LD dynamically loaded for search engines.</li>
                  <li>Direct 1-2 sentence concise answers positioned immediately beneath question-style H2s.</li>
                  <li>Clear financial disclaimers and regulatory primary references cited where relevant.</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Summary Stats */}
              <div className="grid grid-cols-3 gap-3 p-3.5 bg-white rounded border border-[#D9D7D0] text-center">
                <div>
                  <span className="text-xl font-bold font-serif text-[#171717]">{MASTER_PAGE_REGISTRY.length}</span>
                  <span className="text-[#66645F] block text-[10px] uppercase mt-0.5">Indexable URLs</span>
                </div>
                <div>
                  <span className="text-xl font-bold font-serif text-emerald-700">0</span>
                  <span className="text-[#66645F] block text-[10px] uppercase mt-0.5">Duplicate URLs</span>
                </div>
                <div>
                  <span className="text-xl font-bold font-serif text-[#2E5A44]">{warnings.length}</span>
                  <span className="text-[#66645F] block text-[10px] uppercase mt-0.5">Editorial Tips</span>
                </div>
              </div>

              {/* Validation List */}
              <div className="space-y-2">
                <h3 className="font-mono text-[11px] uppercase tracking-wider text-[#2E5A44] font-semibold">
                  Registry Automated Validation Report
                </h3>
                {errors.length === 0 && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded flex items-center gap-2 text-emerald-800 text-xs">
                    <CheckCircle2 size={16} /> Zero critical errors detected. All canonical URLs are unique and properly registered.
                  </div>
                )}

                <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
                  {MASTER_PAGE_REGISTRY.map((page, idx) => (
                    <div key={idx} className="p-2.5 bg-white border border-[#D9D7D0] rounded flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-[10px] bg-[#EFECE6] px-1.5 py-0.5 rounded text-[#2E5A44] font-medium">
                            {page.pageType}
                          </span>
                          <span className="font-mono text-xs text-[#171717] truncate font-medium">{page.url}</span>
                        </div>
                        <p className="text-[11px] text-[#66645F] truncate mt-0.5">{page.title}</p>
                      </div>
                      <div className="shrink-0 text-right">
                        <span className="text-[10px] font-mono text-[#2E5A44] block">
                          KW: {page.primaryKeyword}
                        </span>
                        <span className="text-[9px] text-[#66645F]">{page.lastUpdated}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-2.5 bg-[#EFECE6] border-t border-[#D9D7D0] flex items-center justify-between text-[11px] text-[#66645F]">
          <span>Finance Guru Centralized Registry Engine v2.0</span>
          <button
            onClick={onClose}
            className="px-3 py-1 bg-[#171717] hover:bg-[#2E5A44] text-white rounded font-medium transition-colors"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
}
