import { SEOHead } from '../components/SEOHead';
import { Link } from '../context/RouterContext';
import { AlertTriangle, ShieldAlert, Scale, HelpCircle } from 'lucide-react';

export function FinancialDisclaimerPage() {
  return (
    <>
      <SEOHead
        title="Financial Disclaimer & Educational Notice — Finance Guru"
        description="Essential educational disclaimer: Finance Guru provides educational analysis and does not constitute certified personalized financial, investment, or legal advice."
        canonicalPath="/financial-disclaimer/"
      />

      <main className="max-w-5xl mx-auto px-6 pt-16 pb-24 text-left">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8 text-xs text-[#66645F] flex items-center gap-2">
          <Link to="/" className="hover:text-[#171717] transition-colors">Home</Link>
          <span aria-hidden="true">/</span>
          <span className="text-[#171717] font-medium">Financial Disclaimer</span>
        </nav>

        {/* Header */}
        <header className="max-w-[760px] pb-12 border-b border-[#D9D7D0]">
          <div className="text-xs uppercase tracking-widest text-[#2E5A44] font-medium mb-3 flex items-center gap-1.5">
            <AlertTriangle size={15} /> Regulatory &amp; Consumer Disclosure
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-normal tracking-tight text-[#171717]">
            Financial Disclaimer &amp; Regulatory Notice
          </h1>
          <p className="mt-5 text-base sm:text-lg text-[#66645F] leading-relaxed">
            Please read this disclaimer carefully before applying any concepts, formulas, or strategies described on Finance Guru.
          </p>
        </header>

        {/* Body Content */}
        <div className="max-w-[760px] pt-12 space-y-10 text-sm sm:text-base text-[#171717]">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-serif font-medium text-[#171717]">
              1. General Educational and Literacy Purpose Only
            </h2>
            <p className="text-[#66645F] leading-relaxed">
              All content published across Finance Guru—including articles, mathematical compounding simulations, budgeting templates, expense ratio comparisons, and FAQs—is created strictly for general consumer financial literacy and educational illumination.
            </p>
            <p className="text-[#66645F] leading-relaxed">
              Nothing published on this website constitutes personalized financial advice, fiduciary investment advice, tax counseling, accounting guidance, or legal representation.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-serif font-medium text-[#171717]">
              2. No Advisory or Fiduciary Relationship Established
            </h2>
            <p className="text-[#66645F] leading-relaxed">
              Accessing, viewing, or interacting with our website, calculators, or editorial desk does not establish a financial advisor-client, broker-client, or fiduciary relationship between you and Finance Guru or any of its contributing authors.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-serif font-medium text-[#171717]">
              3. Investment Risk, Market Volatility, and No Guarantees
            </h2>
            <p className="text-[#66645F] leading-relaxed">
              All capital market investments—including broad-market index funds, exchange-traded funds (ETFs), equities, bonds, and mutual funds—involve inherent investment risk, including the possible loss of principal capital.
            </p>
            <div className="p-4 bg-[#EFECE6] rounded border border-[#D9D7D0] text-xs text-[#171717] space-y-1.5">
              <strong className="block text-[#2E5A44] uppercase font-mono">Explicit No-Guarantee Pledge:</strong>
              <p>• Finance Guru never guarantees market returns, portfolio gains, debt elimination, or credit score leaps.</p>
              <p>• Past historical performance of any index, asset class, or strategy is no assurance of future returns.</p>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-serif font-medium text-[#171717]">
              4. Hypothetical Calculations vs. Real-World Outcomes
            </h2>
            <p className="text-[#66645F] leading-relaxed">
              All figures generated within our interactive calculators (such as the Compound Interest Simulator, 50/30/20 Planner, or Fee Drag Model) rely on user-supplied assumptions and constant annual returns. Real capital markets experience non-linear returns, inflationary fluctuations, sequence of returns risk, and individual tax liabilities that will cause real-world outcomes to vary from linear mathematical models.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-serif font-medium text-[#171717]">
              5. Consultation with Licensed Professionals
            </h2>
            <p className="text-[#66645F] leading-relaxed">
              Before making significant life decisions—such as allocating retirement assets, refinancing debt, altering tax filing elections, or purchasing insurance contracts—you are strongly encouraged to consult with a licensed, fee-only Certified Financial Planner (CFP®) or Certified Public Accountant (CPA) who can evaluate your unique financial balance sheet and jurisdiction.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
