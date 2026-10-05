import { useState, FormEvent } from 'react';
import { SEOHead } from '../components/SEOHead';
import { CheckCircle2 } from 'lucide-react';

export function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('Editorial Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSubmitted(true);
  };

  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Finance Guru',
    description: 'Get in touch with the editorial team at Finance Guru for reader questions, citations, or corrections.',
    mainEntity: {
      '@type': 'Organization',
      name: 'Finance Guru',
      email: 'editorial@financeguru.com',
    },
  };

  return (
    <>
      <SEOHead
        title="Contact — Finance Guru"
        description="Get in touch with the editorial team at Finance Guru for reader feedback, analytical citations, corrections, or inquiries."
        canonicalPath="/contact"
        schema={contactSchema}
      />

      <main className="max-w-5xl mx-auto px-6 pt-16 pb-24">
        <header className="max-w-[740px] mx-auto pb-12 border-b border-[#D9D7D0]">
          <div className="text-xs uppercase tracking-widest text-[#2E5A44] font-medium mb-4">
            Correspondence
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-normal tracking-tight text-[#171717]">
            Get in touch with the editorial desk.
          </h1>
          <p className="mt-6 text-xl text-[#66645F] leading-relaxed font-sans">
            We welcome analytical corrections, methodological inquiries, academic citations, and thoughtful reader questions.
          </p>
        </header>

        <div className="max-w-[740px] mx-auto pt-12">
          {submitted ? (
            <div className="p-8 bg-[#EFECE6] border border-[#D9D7D0] rounded">
              <div className="flex items-center gap-3 text-[#2E5A44] mb-3">
                <CheckCircle2 size={24} aria-hidden="true" />
                <h2 className="text-xl font-serif font-medium text-[#171717]">
                  Correspondence Received
                </h2>
              </div>
              <p className="text-sm text-[#66645F] leading-relaxed">
                Thank you for writing, {name}. Our editorial team reviews reader submissions weekly. If your note pertains to a factual correction or mathematical inquiry, a researcher will follow up at {email}.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setMessage('');
                }}
                className="mt-6 text-xs uppercase tracking-wider text-[#2E5A44] underline underline-offset-4 font-medium"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="contact-name" className="block text-xs uppercase tracking-wider text-[#171717] font-medium mb-2">
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Eleanor Vance"
                    className="w-full px-4 py-2.5 bg-[#EFECE6] border border-[#D9D7D0] rounded text-sm text-[#171717] placeholder:text-[#66645F]/70 focus:ring-1 focus:ring-[#2E5A44] focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-xs uppercase tracking-wider text-[#171717] font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. eleanor@domain.com"
                    className="w-full px-4 py-2.5 bg-[#EFECE6] border border-[#D9D7D0] rounded text-sm text-[#171717] placeholder:text-[#66645F]/70 focus:ring-1 focus:ring-[#2E5A44] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-topic" className="block text-xs uppercase tracking-wider text-[#171717] font-medium mb-2">
                  Topic of Inquiry
                </label>
                <select
                  id="contact-topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#EFECE6] border border-[#D9D7D0] rounded text-sm text-[#171717] focus:ring-1 focus:ring-[#2E5A44] focus:outline-none"
                >
                  <option value="Editorial Inquiry">General Editorial Inquiry</option>
                  <option value="Factual Correction">Mathematical or Factual Correction</option>
                  <option value="Essay Feedback">Reader Reflection or Case Study</option>
                  <option value="Press / Syndication">Academic Citation or Syndication</option>
                </select>
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs uppercase tracking-wider text-[#171717] font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Detail your question or observation..."
                  className="w-full px-4 py-2.5 bg-[#EFECE6] border border-[#D9D7D0] rounded text-sm text-[#171717] placeholder:text-[#66645F]/70 focus:ring-1 focus:ring-[#2E5A44] focus:outline-none"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#171717] hover:bg-[#2E5A44] text-[#F7F6F2] text-xs uppercase tracking-wider font-medium rounded transition-colors"
                >
                  Transmit Message
                </button>
              </div>
            </form>
          )}

          <div className="mt-16 pt-12 border-t border-[#D9D7D0] grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm text-[#66645F]">
            <div>
              <h2 className="font-serif text-base font-medium text-[#171717] mb-2">Direct Editorial Desk</h2>
              <p className="font-mono text-xs text-[#2E5A44]">editorial@financeguru.com</p>
              <p className="text-xs text-[#66645F] mt-1">PGP key available upon request for verified sources.</p>
            </div>
            <div>
              <h2 className="font-serif text-base font-medium text-[#171717] mb-2">Location &amp; Registry</h2>
              <p className="text-xs text-[#66645F]">Finance Guru Publications Ltd.</p>
              <p className="text-xs text-[#66645F]">Financial District, New York, NY</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
