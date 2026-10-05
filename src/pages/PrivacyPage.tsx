import { SEOHead } from '../components/SEOHead';

export function PrivacyPage() {
  return (
    <>
      <SEOHead
        title="Privacy Policy — Finance Guru"
        description="Our privacy pledge: zero third-party tracking cookies, no surveillance advertising, and complete respect for reader privacy."
        canonicalPath="/privacy"
      />

      <main className="max-w-5xl mx-auto px-6 pt-16 pb-24">
        <header className="max-w-[740px] mx-auto pb-12 border-b border-[#D9D7D0]">
          <div className="text-xs uppercase tracking-widest text-[#2E5A44] font-medium mb-4">
            Reader Trust
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-normal tracking-tight text-[#171717]">
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm text-[#66645F] font-sans">
            Effective Date: October 4, 2026
          </p>
        </header>

        <div className="max-w-[740px] mx-auto pt-12 editorial-prose">
          <h2>1. Fundamental Privacy Philosophy</h2>
          <p>
            At Finance Guru, we believe privacy is an indispensable component of intellectual independence. We do not operate ad networks, behavioral tracking pixels, or cross-site profiling scripts. You can read our publication without surveillance.
          </p>

          <h2>2. Information We Collect</h2>
          <p>
            We collect the absolute minimum data required to deliver this website securely and reliably:
          </p>
          <ul className="list-disc">
            <li><strong>Direct Correspondence:</strong> If you choose to contact our editorial desk via our contact form, we collect your name, email address, and message content solely to respond to your inquiry.</li>
            <li><strong>Server Diagnostic Logs:</strong> Standard web server logs collect IP addresses, browser user-agent strings, and requested URLs for security diagnostics and DDoS mitigation. These logs are automatically purged on a rolling 30-day schedule.</li>
          </ul>

          <h2>3. Cookies and Tracking Technologies</h2>
          <p>
            We do not use advertising cookies, commercial tracking pixels, or third-party marketing beacons.
          </p>

          <h2>4. Third-Party Sharing</h2>
          <p>
            We never sell, lease, rent, or trade reader personal data to any third party, financial institution, or marketing broker under any circumstances.
          </p>

          <h2>5. Security</h2>
          <p>
            All connections to Finance Guru are strictly encrypted in transit using Transport Layer Security (TLS 1.3).
          </p>

          <h2>6. Updates to This Policy</h2>
          <p>
            Should our privacy practices ever change, we will update this document with an updated revision date.
          </p>
        </div>
      </main>
    </>
  );
}
