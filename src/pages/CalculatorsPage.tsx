import { useState, useMemo } from 'react';
import { SEOHead } from '../components/SEOHead';
import { Link } from '../context/RouterContext';
import { Calculator, TrendingUp, PiggyBank, DollarSign, Clock, ArrowRight, Info } from 'lucide-react';

export function CalculatorsPage() {
  const [activeTab, setActiveTab] = useState<'compound' | 'budget' | 'fees' | 'retirement'>('compound');

  // --- Compound Interest State ---
  const [ciPrincipal, setCiPrincipal] = useState<number>(10000);
  const [ciMonthly, setCiMonthly] = useState<number>(300);
  const [ciRate, setCiRate] = useState<number>(7);
  const [ciYears, setCiYears] = useState<number>(25);

  const compoundResult = useMemo(() => {
    const r = ciRate / 100;
    const n = 12; // monthly compounding
    const t = ciYears;
    const P = ciPrincipal;
    const PMT = ciMonthly;

    // Compound formula with monthly deposits: A = P(1 + r/n)^(nt) + PMT * [((1 + r/n)^(nt) - 1) / (r/n)]
    const ratePerPeriod = r / n;
    const totalPeriods = n * t;

    let futureValue = P * Math.pow(1 + ratePerPeriod, totalPeriods);
    if (ratePerPeriod > 0) {
      futureValue += PMT * ((Math.pow(1 + ratePerPeriod, totalPeriods) - 1) / ratePerPeriod);
    } else {
      futureValue += PMT * totalPeriods;
    }

    const totalContributed = P + (PMT * 12 * t);
    const totalInterest = Math.max(0, futureValue - totalContributed);

    return {
      futureValue: Math.round(futureValue),
      totalContributed: Math.round(totalContributed),
      totalInterest: Math.round(totalInterest),
    };
  }, [ciPrincipal, ciMonthly, ciRate, ciYears]);

  // --- 50/30/20 Budget State ---
  const [budgetIncome, setBudgetIncome] = useState<number>(4500);
  const budgetResult = useMemo(() => {
    const needs = Math.round(budgetIncome * 0.50);
    const wants = Math.round(budgetIncome * 0.30);
    const savings = Math.round(budgetIncome * 0.20);
    return { needs, wants, savings };
  }, [budgetIncome]);

  // --- Fee Impact State ---
  const [feeMonthly, setFeeMonthly] = useState<number>(500);
  const [feeYears, setFeeYears] = useState<number>(30);
  const [feeGrossReturn, setFeeGrossReturn] = useState<number>(7.5);
  const [lowFee, setLowFee] = useState<number>(0.05);
  const [highFee, setHighFee] = useState<number>(1.05);

  const feeResult = useMemo(() => {
    const t = feeYears;
    const PMT = feeMonthly;

    const calcFv = (netRatePercent: number) => {
      const r = (netRatePercent / 100) / 12;
      const n = t * 12;
      if (r <= 0) return PMT * n;
      return PMT * ((Math.pow(1 + r, n) - 1) / r);
    };

    const lowNetReturn = feeGrossReturn - lowFee;
    const highNetReturn = feeGrossReturn - highFee;

    const fvLow = Math.round(calcFv(lowNetReturn));
    const fvHigh = Math.round(calcFv(highNetReturn));
    const totalCostOfFees = Math.max(0, fvLow - fvHigh);

    return { fvLow, fvHigh, totalCostOfFees };
  }, [feeMonthly, feeYears, feeGrossReturn, lowFee, highFee]);

  // --- Retirement 25x State ---
  const [retireMonthlyExpense, setRetireMonthlyExpense] = useState<number>(5000);
  const retirementResult = useMemo(() => {
    const annualExpenses = retireMonthlyExpense * 12;
    const nestEgg4Percent = annualExpenses * 25;
    const nestEgg3Point5Percent = Math.round(annualExpenses * (1 / 0.035));
    return { annualExpenses, nestEgg4Percent, nestEgg3Point5Percent };
  }, [retireMonthlyExpense]);

  const calculatorSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Finance Guru Interactive Financial Calculators Suite',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'All',
    description: 'Free interactive financial calculators: simulate compound interest growth, calculate your 50/30/20 monthly budget, and measure investment fee impact.',
  };

  return (
    <>
      <SEOHead
        title="Financial Calculators: Compound Interest, Budget & Fees — Finance Guru"
        description="Free interactive financial calculators: simulate compound interest growth, calculate your 50/30/20 monthly budget, and measure investment fee impact."
        canonicalPath="/financial-calculators/"
        schema={calculatorSchema}
      />

      <main className="max-w-5xl mx-auto px-6 pt-16 pb-24 text-left">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8 text-xs text-[#66645F] flex items-center gap-2">
          <Link to="/" className="hover:text-[#171717] transition-colors">Home</Link>
          <span aria-hidden="true">/</span>
          <span className="text-[#171717] font-medium">Financial Calculators</span>
        </nav>

        {/* Header */}
        <header className="pb-10 border-b border-[#D9D7D0]">
          <div className="text-xs uppercase tracking-widest text-[#2E5A44] font-medium mb-3 flex items-center gap-1.5">
            <Calculator size={15} /> Mathematical Modeling &amp; Projections
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-normal tracking-tight text-[#171717]">
            Interactive Financial Calculators
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#66645F] max-w-2xl leading-relaxed">
            Test real-world scenarios with clear mathematical formulas, zero ads, and transparent assumptions. See the tangible impact of time, compounding, and expense ratios.
          </p>
        </header>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 pt-8 pb-10 border-b border-[#D9D7D0]">
          <button
            onClick={() => setActiveTab('compound')}
            className={`px-4 py-2.5 rounded text-xs sm:text-sm font-medium transition-colors flex items-center gap-2 ${
              activeTab === 'compound'
                ? 'bg-[#2E5A44] text-white shadow-sm'
                : 'bg-[#EFECE6] text-[#171717] hover:bg-[#D9D7D0]'
            }`}
          >
            <TrendingUp size={16} /> Compound Interest Simulator
          </button>
          <button
            onClick={() => setActiveTab('budget')}
            className={`px-4 py-2.5 rounded text-xs sm:text-sm font-medium transition-colors flex items-center gap-2 ${
              activeTab === 'budget'
                ? 'bg-[#2E5A44] text-white shadow-sm'
                : 'bg-[#EFECE6] text-[#171717] hover:bg-[#D9D7D0]'
            }`}
          >
            <PiggyBank size={16} /> 50/30/20 Budget Planner
          </button>
          <button
            onClick={() => setActiveTab('fees')}
            className={`px-4 py-2.5 rounded text-xs sm:text-sm font-medium transition-colors flex items-center gap-2 ${
              activeTab === 'fees'
                ? 'bg-[#2E5A44] text-white shadow-sm'
                : 'bg-[#EFECE6] text-[#171717] hover:bg-[#D9D7D0]'
            }`}
          >
            <DollarSign size={16} /> 1% Fee Drag Impact
          </button>
          <button
            onClick={() => setActiveTab('retirement')}
            className={`px-4 py-2.5 rounded text-xs sm:text-sm font-medium transition-colors flex items-center gap-2 ${
              activeTab === 'retirement'
                ? 'bg-[#2E5A44] text-white shadow-sm'
                : 'bg-[#EFECE6] text-[#171717] hover:bg-[#D9D7D0]'
            }`}
          >
            <Clock size={16} /> 4% Retirement Estimator
          </button>
        </div>

        {/* CALCULATOR 1: COMPOUND INTEREST */}
        {activeTab === 'compound' && (
          <div className="pt-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-6 space-y-6">
              <h2 className="text-2xl font-serif font-medium text-[#171717]">
                Compound Interest Simulator
              </h2>
              <p className="text-sm text-[#66645F] leading-relaxed">
                Estimate how regular monthly deposits combined with compounding returns grow over decades.
              </p>

              <div className="space-y-4 pt-2">
                <div>
                  <div className="flex justify-between text-xs font-medium text-[#171717] mb-1.5">
                    <span>Initial Deposit:</span>
                    <span className="font-mono text-[#2E5A44]">${ciPrincipal.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100000"
                    step="500"
                    value={ciPrincipal}
                    onChange={(e) => setCiPrincipal(Number(e.target.value))}
                    className="w-full accent-[#2E5A44]"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium text-[#171717] mb-1.5">
                    <span>Monthly Contribution:</span>
                    <span className="font-mono text-[#2E5A44]">${ciMonthly.toLocaleString()} / mo</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    step="50"
                    value={ciMonthly}
                    onChange={(e) => setCiMonthly(Number(e.target.value))}
                    className="w-full accent-[#2E5A44]"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium text-[#171717] mb-1.5">
                    <span>Estimated Annual Return:</span>
                    <span className="font-mono text-[#2E5A44]">{ciRate}%</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="14"
                    step="0.5"
                    value={ciRate}
                    onChange={(e) => setCiRate(Number(e.target.value))}
                    className="w-full accent-[#2E5A44]"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium text-[#171717] mb-1.5">
                    <span>Time Horizon:</span>
                    <span className="font-mono text-[#2E5A44]">{ciYears} Years</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="40"
                    step="1"
                    value={ciYears}
                    onChange={(e) => setCiYears(Number(e.target.value))}
                    className="w-full accent-[#2E5A44]"
                  />
                </div>
              </div>

              <div className="pt-2 text-xs text-[#66645F] flex items-start gap-2">
                <Info size={14} className="shrink-0 mt-0.5 text-[#2E5A44]" />
                <span>
                  Related Guide: Read our in-depth breakdown on{' '}
                  <Link to="/investing-for-beginners/what-is-compound-interest/" className="text-[#2E5A44] underline font-medium">
                    What Is Compound Interest &amp; The Mathematical Formula
                  </Link>.
                </span>
              </div>
            </div>

            <div className="lg:col-span-6 bg-[#EFECE6] p-6 sm:p-8 rounded-lg border border-[#D9D7D0] flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#66645F] font-medium block">
                  Projected Portfolio Value
                </span>
                <div className="text-4xl sm:text-5xl font-serif font-normal text-[#171717] mt-2 mb-6">
                  ${compoundResult.futureValue.toLocaleString()}
                </div>

                <div className="space-y-3 pt-4 border-t border-[#D9D7D0]">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#66645F]">Your Total Contributions:</span>
                    <span className="font-mono font-medium text-[#171717]">${compoundResult.totalContributed.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#66645F]">Total Interest Accumulated:</span>
                    <span className="font-mono font-medium text-[#2E5A44]">+${compoundResult.totalInterest.toLocaleString()}</span>
                  </div>
                </div>

                {/* Visual Ratio Bar */}
                <div className="mt-6 pt-4 border-t border-[#D9D7D0]">
                  <span className="text-xs text-[#66645F] block mb-2">Growth Composition:</span>
                  <div className="h-4 w-full bg-[#D9D7D0] rounded overflow-hidden flex">
                    <div
                      style={{ width: `${Math.round((compoundResult.totalContributed / compoundResult.futureValue) * 100)}%` }}
                      className="bg-[#66645F]"
                      title="Principal"
                    />
                    <div
                      style={{ width: `${Math.round((compoundResult.totalInterest / compoundResult.futureValue) * 100)}%` }}
                      className="bg-[#2E5A44]"
                      title="Interest"
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-[#66645F] mt-1.5">
                    <span>■ Personal Contributions</span>
                    <span className="text-[#2E5A44]">■ Compound Interest Earnings</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-[#D9D7D0]/60 text-xs text-[#66645F]">
                Assumes constant return with monthly compounding. Market volatility is not factored into this linear illustration.
              </div>
            </div>
          </div>
        )}

        {/* CALCULATOR 2: 50/30/20 BUDGET */}
        {activeTab === 'budget' && (
          <div className="pt-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-6 space-y-6">
              <h2 className="text-2xl font-serif font-medium text-[#171717]">
                50/30/20 Monthly Budget Planner
              </h2>
              <p className="text-sm text-[#66645F] leading-relaxed">
                Allocate your monthly net take-home salary into non-negotiable needs, lifestyle wants, and wealth-building savings.
              </p>

              <div className="space-y-4 pt-2">
                <div>
                  <div className="flex justify-between text-xs font-medium text-[#171717] mb-1.5">
                    <span>Monthly Take-Home Pay (After Taxes):</span>
                    <span className="font-mono text-[#2E5A44]">${budgetIncome.toLocaleString()} / mo</span>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="20000"
                    step="100"
                    value={budgetIncome}
                    onChange={(e) => setBudgetIncome(Number(e.target.value))}
                    className="w-full accent-[#2E5A44]"
                  />
                </div>
              </div>

              <div className="pt-2 text-xs text-[#66645F] flex items-start gap-2">
                <Info size={14} className="shrink-0 mt-0.5 text-[#2E5A44]" />
                <span>
                  Related Guide: Read our step-by-step tutorial on{' '}
                  <Link to="/budgeting-and-saving/how-to-create-a-monthly-budget/" className="text-[#2E5A44] underline font-medium">
                    How to Create a Monthly Budget That Works
                  </Link>.
                </span>
              </div>
            </div>

            <div className="lg:col-span-6 bg-[#EFECE6] p-6 sm:p-8 rounded-lg border border-[#D9D7D0] space-y-5">
              <span className="text-xs uppercase tracking-wider text-[#66645F] font-medium block">
                Target Monthly Allocation
              </span>

              {/* Needs card */}
              <div className="p-4 bg-white rounded border border-[#D9D7D0]">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="font-serif text-base font-medium text-[#171717]">Essential Needs (50%)</span>
                  <span className="font-mono text-lg font-bold text-[#171717]">${budgetResult.needs.toLocaleString()}</span>
                </div>
                <p className="text-xs text-[#66645F]">
                  Rent/mortgage, baseline groceries, utilities, health insurance, minimum debt payments.
                </p>
              </div>

              {/* Wants card */}
              <div className="p-4 bg-white rounded border border-[#D9D7D0]">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="font-serif text-base font-medium text-[#171717]">Discretionary Wants (30%)</span>
                  <span className="font-mono text-lg font-bold text-[#171717]">${budgetResult.wants.toLocaleString()}</span>
                </div>
                <p className="text-xs text-[#66645F]">
                  Dining out, streaming subscriptions, leisure travel, recreation, upgraded lifestyle items.
                </p>
              </div>

              {/* Savings card */}
              <div className="p-4 bg-white rounded border border-[#D9D7D0]">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="font-serif text-base font-medium text-[#2E5A44]">Savings &amp; Debt Payoff (20%)</span>
                  <span className="font-mono text-lg font-bold text-[#2E5A44]">${budgetResult.savings.toLocaleString()}</span>
                </div>
                <p className="text-xs text-[#66645F]">
                  Emergency reserve in high-yield savings, IRA/401(k) contributions, high-interest debt acceleration.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* CALCULATOR 3: 1% FEE DRAG */}
        {activeTab === 'fees' && (
          <div className="pt-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-6 space-y-6">
              <h2 className="text-2xl font-serif font-medium text-[#171717]">
                The 1% Fee Drag Calculator
              </h2>
              <p className="text-sm text-[#66645F] leading-relaxed">
                See how a seemingly tiny 1% difference in expense ratios compounds into tens of thousands of lost dollars over a 30-year investing horizon.
              </p>

              <div className="space-y-4 pt-2">
                <div>
                  <div className="flex justify-between text-xs font-medium text-[#171717] mb-1.5">
                    <span>Monthly Investment:</span>
                    <span className="font-mono text-[#2E5A44]">${feeMonthly.toLocaleString()} / mo</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="3000"
                    step="50"
                    value={feeMonthly}
                    onChange={(e) => setFeeMonthly(Number(e.target.value))}
                    className="w-full accent-[#2E5A44]"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium text-[#171717] mb-1.5">
                    <span>Time Horizon:</span>
                    <span className="font-mono text-[#2E5A44]">{feeYears} Years</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="40"
                    step="1"
                    value={feeYears}
                    onChange={(e) => setFeeYears(Number(e.target.value))}
                    className="w-full accent-[#2E5A44]"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium text-[#171717] mb-1.5">
                    <span>Gross Market Return:</span>
                    <span className="font-mono text-[#2E5A44]">{feeGrossReturn}%</span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="10"
                    step="0.5"
                    value={feeGrossReturn}
                    onChange={(e) => setFeeGrossReturn(Number(e.target.value))}
                    className="w-full accent-[#2E5A44]"
                  />
                </div>
              </div>

              <div className="pt-2 text-xs text-[#66645F] flex items-start gap-2">
                <Info size={14} className="shrink-0 mt-0.5 text-[#2E5A44]" />
                <span>
                  Related Guide: Read our detailed analysis on{' '}
                  <Link to="/stocks-and-mutual-funds/investment-fees-impact-retirement/" className="text-[#2E5A44] underline font-medium">
                    The 1% Fee That Can Cost You $100,000+ in Retirement
                  </Link>.
                </span>
              </div>
            </div>

            <div className="lg:col-span-6 bg-[#EFECE6] p-6 sm:p-8 rounded-lg border border-[#D9D7D0] flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider text-rose-800 font-semibold block">
                  Wealth Lost Directly to Excessive Fees
                </span>
                <div className="text-4xl sm:text-5xl font-serif font-normal text-rose-800 mt-2 mb-6">
                  -${feeResult.totalCostOfFees.toLocaleString()}
                </div>

                <div className="space-y-3 pt-4 border-t border-[#D9D7D0]">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#66645F]">Low-Cost Index Fund (0.05% fee):</span>
                    <span className="font-mono font-medium text-[#2E5A44]">${feeResult.fvLow.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#66645F]">Higher-Fee Fund (1.05% fee):</span>
                    <span className="font-mono font-medium text-[#171717]">${feeResult.fvHigh.toLocaleString()}</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-white rounded border border-[#D9D7D0] text-xs text-[#66645F] leading-relaxed">
                  Both scenarios contributed the exact same <span className="font-mono text-[#171717]">${(feeMonthly * 12 * feeYears).toLocaleString()}</span> out of pocket. The <span className="font-bold text-[#171717]">${feeResult.totalCostOfFees.toLocaleString()}</span> gap was captured entirely by asset management fees and commissions.
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-[#D9D7D0]/60 text-xs text-[#66645F]">
                Illustrative calculation assuming constant annual returns. Real market returns fluctuate annually.
              </div>
            </div>
          </div>
        )}

        {/* CALCULATOR 4: RETIREMENT 25X (4% RULE) */}
        {activeTab === 'retirement' && (
          <div className="pt-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-6 space-y-6">
              <h2 className="text-2xl font-serif font-medium text-[#171717]">
                The 4% Retirement Nest Egg Estimator
              </h2>
              <p className="text-sm text-[#66645F] leading-relaxed">
                Determine your target financial independence portfolio based on your desired monthly retirement living expenses (The Rule of 25).
              </p>

              <div className="space-y-4 pt-2">
                <div>
                  <div className="flex justify-between text-xs font-medium text-[#171717] mb-1.5">
                    <span>Desired Monthly Spending in Retirement:</span>
                    <span className="font-mono text-[#2E5A44]">${retireMonthlyExpense.toLocaleString()} / mo</span>
                  </div>
                  <input
                    type="range"
                    min="1500"
                    max="20000"
                    step="250"
                    value={retireMonthlyExpense}
                    onChange={(e) => setRetireMonthlyExpense(Number(e.target.value))}
                    className="w-full accent-[#2E5A44]"
                  />
                </div>

                <div className="p-3 bg-white rounded border border-[#D9D7D0] text-xs text-[#66645F]">
                  Annual Living Expenses Equivalent: <span className="font-mono text-sm font-bold text-[#171717]">${retirementResult.annualExpenses.toLocaleString()} / year</span>
                </div>
              </div>

              <div className="pt-2 text-xs text-[#66645F] flex items-start gap-2">
                <Info size={14} className="shrink-0 mt-0.5 text-[#2E5A44]" />
                <span>
                  Related Guide: Read our research on{' '}
                  <Link to="/retirement-planning/how-much-to-retire-4-percent-rule/" className="text-[#2E5A44] underline font-medium">
                    How Much Do You Need to Retire? The 4% Rule Explained
                  </Link>.
                </span>
              </div>
            </div>

            <div className="lg:col-span-6 bg-[#EFECE6] p-6 sm:p-8 rounded-lg border border-[#D9D7D0] flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#66645F] font-medium block">
                  Target Retirement Nest Egg (4% Rule)
                </span>
                <div className="text-4xl sm:text-5xl font-serif font-normal text-[#171717] mt-2 mb-6">
                  ${retirementResult.nestEgg4Percent.toLocaleString()}
                </div>

                <div className="space-y-3 pt-4 border-t border-[#D9D7D0]">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#66645F]">Standard 4% Safe Withdrawal (25x):</span>
                    <span className="font-mono font-medium text-[#2E5A44]">${retirementResult.nestEgg4Percent.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#66645F]">Conservative 3.5% Rate (Early Retirees):</span>
                    <span className="font-mono font-medium text-[#171717]">${retirementResult.nestEgg3Point5Percent.toLocaleString()}</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-white rounded border border-[#D9D7D0] text-xs text-[#66645F] leading-relaxed">
                  Based on the landmark Trinity Study. At a 4% initial withdrawal rate adjusted annually for inflation, a diversified stock/bond portfolio historically demonstrated a 95% 30-year survival probability.
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-[#D9D7D0]/60 text-xs text-[#66645F]">
                Past performance of capital markets does not guarantee future withdrawal sustainability.
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
