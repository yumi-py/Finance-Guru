import { SEOHead } from '../components/SEOHead';

export function TermsPage() {
  return (
    <>
      <SEOHead
        title="Terms of Use & Legal Terms — Finance Guru"
        description="Terms of use and essential educational disclaimers for Finance Guru personal finance publication."
        canonicalPath="/terms/"
      />

      <main className="max-w-5xl mx-auto px-6 pt-16 pb-24">
        <header className="max-w-[740px] mx-auto pb-12 border-b border-[#D9D7D0]">
          <div className="text-xs uppercase tracking-widest text-[#2E5A44] font-medium mb-4">
            Legal &amp; Regulatory
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-normal tracking-tight text-[#171717]">
            Terms of Use
          </h1>
          <p className="mt-4 text-sm text-[#66645F] font-sans">
            Effective Date: October 4, 2026
          </p>
        </header>

        <div className="max-w-[740px] mx-auto pt-12 editorial-prose">
          <h2>1. Educational and Informational Purpose Only</h2>
          <p>
            All content published by Finance Guru—including articles, mathematical comparisons, tables, and commentary—is created strictly for general educational and informational purposes. None of the materials constitute personalized financial, investment, tax, accounting, or legal advice.
          </p>

          <h2>2. No Fiduciary Relationship</h2>
          <p>
            Your access to or use of this website does not establish a financial advisor-client, fiduciary, or confidential advisory relationship between you and Finance Guru or any of its contributing authors.
          </p>

          <h2>3. No Guarantees or Warranties</h2>
          <p>
            Investing involves substantial financial risk, including the possible loss of principal. Past performance of any security, index, or asset allocation is no guarantee of future results. While we make every effort to verify citations and calculations, Finance Guru makes no warranties regarding the complete accuracy or timeliness of information presented.
          </p>

          <h2>4. Intellectual Property</h2>
          <p>
            All articles, analyses, tables, and original written works published on Finance Guru are the proprietary intellectual property of Finance Guru Publications Ltd. You may quote brief excerpts provided that clear attribution and a direct link to the original publication are included.
          </p>

          <h2>5. Consultation with Licensed Professionals</h2>
          <p>
            Prior to executing significant financial transactions, altering your tax strategy, or implementing asset allocation changes, you are strongly advised to consult with a licensed, fee-only Certified Financial Planner (CFP) or Certified Public Accountant (CPA) who can evaluate your unique circumstances.
          </p>
        </div>
      </main>
    </>
  );
}
