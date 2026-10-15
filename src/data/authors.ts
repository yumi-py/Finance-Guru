import { Author } from '../types/content';

export const AUTHORS: Record<string, Author> = {
  'marcus-vance': {
    id: 'auth-1',
    slug: 'marcus-vance',
    name: 'Marcus Vance, CFA',
    role: 'Senior Financial Analyst & Investment Research Lead',
    credentials: ['Chartered Financial Analyst (CFA)', 'B.S. in Quantitative Economics (Columbia University)'],
    bio: 'Marcus has spent over 14 years evaluating equity markets, fund expense structures, and index compounding models. He specializes in low-cost portfolio architecture and helping everyday investors avoid recurring fee leakage.',
    yearsExperience: 14,
    reviewedTopics: ['Investing for Beginners', 'Stocks and Mutual Funds', 'Retirement Planning'],
  },
  'elena-rodriguez': {
    id: 'auth-2',
    slug: 'elena-rodriguez',
    name: 'Elena Rodriguez, CFP®',
    role: 'Personal Finance & Credit Education Specialist',
    credentials: ['Certified Financial Planner (CFP®)', 'M.S. in Personal Financial Planning', 'FINRA Series 65 Licensee'],
    bio: 'Elena is a fee-only Certified Financial Planner dedicated to empowering young professionals, families, and first-time earners. She writes on actionable cash flow systems, high-interest debt elimination, and building unshakeable credit scores.',
    yearsExperience: 11,
    reviewedTopics: ['Personal Finance', 'Budgeting and Saving', 'Loans and Credit Cards'],
  },
  'dr-ananya-sen': {
    id: 'auth-3',
    slug: 'dr-ananya-sen',
    name: 'Dr. Ananya Sen, PhD',
    role: 'Behavioral Economist & Tax Policy Analyst',
    credentials: ['PhD in Behavioral Economics (LSE)', 'Author on Decision Theory & Consumer Solvency', 'Consultant on Global Tax Systems'],
    bio: 'Dr. Sen studies how human cognitive biases, loss aversion, and institutional tax structures intersect. Her research translates complex fiscal policy and marginal tax brackets into crystal-clear consumer knowledge.',
    yearsExperience: 16,
    reviewedTopics: ['Tax Education', 'Insurance', 'Retirement Planning'],
  },
  'editorial-desk': {
    id: 'auth-editorial',
    slug: 'editorial-desk',
    name: 'Finance Guru Editorial Desk',
    role: 'Multi-Disciplinary Editorial Board',
    credentials: ['Four-Stage Editorial Fact-Check Protocol', 'Primary Regulatory Source Verification (SEC, FINRA, IRS, RBI)'],
    bio: 'The Finance Guru Editorial Desk brings together economists, chartered financial analysts, and consumer advocates to produce transparent, unbiased financial guidance free of product sponsorship.',
    yearsExperience: 20,
    reviewedTopics: ['All Finance Learning Categories', 'Financial Calculators', 'Regulatory Standards'],
  },
};

export const PRIMARY_AUTHOR = AUTHORS['editorial-desk'];
