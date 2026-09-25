import React, { useState, useMemo } from 'react';
import './PricingCalculatorPage.css';

const BASE_PACKAGES = {
  premium: {
    id: 'premium',
    name: 'Premium Fλow',
    tag: 'The Anchor',
    price: 26500,
    hours: 440,
    accent: 'amber',
    features: [
      'Enterprise Praxis CRM',
      'Proactive AI Agent',
      'Shift Management System',
      'Full Data Migration & Auditing',
      '4 In-Person Dedicated Staff Trainings'
    ],
    desc: 'Comprehensive enterprise implementation tailored for mission-critical operations and multi-tier medical/clinical staff.'
  },
  core: {
    id: 'core',
    name: 'Core Fλow',
    tag: 'The Sweet Spot',
    recommended: true,
    price: 16800,
    hours: 280,
    accent: 'teal',
    features: [
      'Core Praxis CRM Implementation',
      'Reactive AI Customer Agent',
      'Basic Beneficiary & Patient Cards',
      '2 Online Interactive Trainings'
    ],
    desc: 'Optimized for growing high-volume clinics requiring structured workflows and responsive automated communications.'
  },
  starter: {
    id: 'starter',
    name: 'Starter Fλow',
    tag: 'The Launchpad',
    price: 8500,
    hours: 140,
    accent: 'slate',
    features: [
      'Basic CRM Digital Rolodex',
      'Simple Website FAQ Bot'
    ],
    desc: 'Essential digital rolodex and automated website concierge for early-stage practices moving away from legacy paper.'
  }
};

const ADDON_FEATURES = [
  {
    id: 'feat_website',
    name: 'Website Creation + Basic RAG Chatbot',
    shortName: 'Website + RAG Chatbot',
    price: 3500,
    hours: 60,
    desc: 'Custom responsive digital portal integrated with a retrieval-augmented knowledge base for dynamic public & patient Q&A.'
  },
  {
    id: 'feat_voice',
    name: 'Advanced Voice Agent (Clinical Notes)',
    shortName: 'Advanced Voice Agent',
    price: 4500,
    hours: 75,
    desc: 'Automated voice dictation and clinical note extraction for practitioners, converting spoken summaries into structured EHR fields.'
  },
  {
    id: 'feat_omnichannel',
    name: 'Proactive Omnichannel Notifications (Viber/WhatsApp)',
    shortName: 'Omnichannel Triggers',
    price: 2000,
    hours: 35,
    desc: 'Viber, WhatsApp & SMS direct integrations for automated appointment dispatch, reminders, and follow-up survey flows.'
  },
  {
    id: 'feat_migration',
    name: '100% Done-For-You Data Entry & Migration',
    shortName: 'Full Data Migration',
    price: 1500,
    hours: 40,
    desc: '100% white-glove manual cleansing, optical scanning, legacy spreadsheet scraping, and sanitization before CRM launch.'
  }
];

const OPEX_OPTIONS = {
  basic: {
    id: 'basic',
    name: 'Basic Hosting & LLM Fuel',
    tier: 'Standard Tier',
    priceYearly: 2400,
    priceMonthly: 200,
    breakdownMonthly: '€7 basic hosting + €193 LLM API fuel & maintenance',
    sla: '99.5% Standard SLA',
    desc: 'Engineered for standard practice workloads with steady conversational volume and monthly system maintenance.'
  },
  premium: {
    id: 'premium',
    name: 'Premium Hosting & Enterprise LLM Fuel',
    tier: 'Enterprise Tier',
    priceYearly: 6000,
    priceMonthly: 500,
    breakdownMonthly: '€50 dedicated AWS/Azure instance + €450 high-volume token fuel & 24/7 SLA',
    sla: '99.99% 24/7 Dedicated SLA',
    desc: 'Dedicated, isolated sovereign cloud instance with high-throughput token pipelines and guaranteed 24/7 priority response.'
  }
};

const formatEUR = (val) => {
  return new Intl.NumberFormat('el-GR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(val).replace('€', '€ ');
};

export default function PricingCalculatorPage() {
  const [basePackageKey, setBasePackageKey] = useState('core');
  const [selectedFeatures, setSelectedFeatures] = useState({
    feat_website: false,
    feat_voice: true,
    feat_omnichannel: true,
    feat_migration: false
  });
  const [opexKey, setOpexKey] = useState('basic');
  const [opexCadence, setOpexCadence] = useState('yearly'); // 'yearly' | 'monthly'
  const [clientName, setClientName] = useState('Metropolitan Health Group S.A.');
  const [proposalRef] = useState('SIM-2026-04');
  const [copied, setCopied] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Toggle Feature Add-on
  const toggleFeature = (id) => {
    setSelectedFeatures(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Presets
  const applyPreset = (type) => {
    if (type === 'anchor') {
      setBasePackageKey('premium');
      setSelectedFeatures({
        feat_website: true,
        feat_voice: true,
        feat_omnichannel: true,
        feat_migration: true
      });
      setOpexKey('premium');
    } else if (type === 'sweetspot') {
      setBasePackageKey('core');
      setSelectedFeatures({
        feat_website: false,
        feat_voice: true,
        feat_omnichannel: true,
        feat_migration: false
      });
      setOpexKey('basic');
    } else if (type === 'starter') {
      setBasePackageKey('starter');
      setSelectedFeatures({
        feat_website: false,
        feat_voice: false,
        feat_omnichannel: false,
        feat_migration: false
      });
      setOpexKey('basic');
    }
  };

  // Calculations Engine
  const calculations = useMemo(() => {
    const basePkg = BASE_PACKAGES[basePackageKey];
    
    // Addon totals
    let addOnsCost = 0;
    let addOnsHours = 0;
    const activeAddons = [];

    ADDON_FEATURES.forEach(f => {
      if (selectedFeatures[f.id]) {
        addOnsCost += f.price;
        addOnsHours += f.hours;
        activeAddons.push(f);
      }
    });

    // CAPEX Upfront
    const totalNetCapex = basePkg.price + addOnsCost;
    const vatCapex = totalNetCapex * 0.24; // 24% Greek VAT
    const totalGrossCapex = totalNetCapex + vatCapex;
    const totalHours = basePkg.hours + addOnsHours;

    // Margin & Blended Rate
    const blendedHourlyRate = totalHours > 0 ? (totalNetCapex / totalHours) : 0;
    const targetRate = 60.0;
    const isTargetMet = blendedHourlyRate >= targetRate;
    const rateDelta = blendedHourlyRate - targetRate;

    // OPEX
    const opexOption = OPEX_OPTIONS[opexKey];
    const totalNetOpexYearly = opexOption.priceYearly;
    const vatOpexYearly = totalNetOpexYearly * 0.24;
    const totalGrossOpexYearly = totalNetOpexYearly + vatOpexYearly;

    const totalNetOpexMonthly = opexOption.priceMonthly;
    const vatOpexMonthly = totalNetOpexMonthly * 0.24;
    const totalGrossOpexMonthly = totalNetOpexMonthly + vatOpexMonthly;

    // Year 1 Total Gross Outlay
    const totalYear1Gross = totalGrossCapex + totalGrossOpexYearly;

    return {
      basePkg,
      activeAddons,
      totalNetCapex,
      vatCapex,
      totalGrossCapex,
      totalHours,
      blendedHourlyRate,
      targetRate,
      isTargetMet,
      rateDelta,
      opexOption,
      totalNetOpexYearly,
      vatOpexYearly,
      totalGrossOpexYearly,
      totalNetOpexMonthly,
      vatOpexMonthly,
      totalGrossOpexMonthly,
      totalYear1Gross
    };
  }, [basePackageKey, selectedFeatures, opexKey]);

  // Copy Markdown
  const copySummaryMarkdown = () => {
    const c = calculations;
    let featuresList = c.activeAddons.map(f => `  - ${f.name}: ${formatEUR(f.price)} (${f.hours} hrs)`).join('\n');
    if (!featuresList) featuresList = '  - (None selected)';

    const markdown = `
# Commercial Proposal: Fλow Digital Ecosystem
**Client:** ${clientName}
**Reference:** ${proposalRef}
**Provider:** SimasiaAI (Athens Innovation Hub)
**Date:** ${new Date().toLocaleDateString('en-GB')}

---

### 1. Upfront Implementation (CAPEX)
- **Base Package:** ${c.basePkg.name} (${c.basePkg.tag}) — ${formatEUR(c.basePkg.price)} (${c.basePkg.hours} hrs)
- **Custom Add-Ons:**
${featuresList}
- **Total Net CAPEX:** ${formatEUR(c.totalNetCapex)}
- **Greek VAT (24%):** ${formatEUR(c.vatCapex)}
- **Total Gross CAPEX:** ${formatEUR(c.totalGrossCapex)}

---

### 2. Ongoing Infrastructure & LLM Fuel (OPEX)
- **Service Tier:** ${c.opexOption.name} (${c.opexOption.tier})
- **Net OPEX / Year:** ${formatEUR(c.totalNetOpexYearly)} (${formatEUR(c.totalNetOpexMonthly)} / month)
- **VAT (24%):** ${formatEUR(c.vatOpexYearly)}
- **Gross OPEX / Year:** ${formatEUR(c.totalGrossOpexYearly)}

---

### 3. Investment Total & Agency Margin
- **Year 1 Total Outlay (Gross):** ${formatEUR(c.totalYear1Gross)}
- **Total Mapped Effort:** ${c.totalHours} working hours
- **Blended Realized Rate:** ${formatEUR(c.blendedHourlyRate)} / hour (Status: ${c.isTargetMet ? 'HEALTHY / >= €60/h' : 'MONITOR'})
    `.trim();

    navigator.clipboard.writeText(markdown).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  const handleExportPDF = () => {
    setShowModal(true);
    setTimeout(() => {
      window.print();
    }, 300);
  };

  return (
    <div className="flow-calc-page pt-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Title Section */}
        <div className="no-print border-b border-white/10 pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-medium mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
              Greek Corporate VAT 24% Engine • Real-Time Agency Blended Rate
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Fλow Digital Ecosystem <span className="bg-gradient-to-r from-teal-400 via-teal-200 to-amber-300 bg-clip-text text-transparent">Pricing Configurator</span>
            </h1>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              High-ticket commercial calculator for SimasiaAI institutional clients. Calculates upfront CAPEX, recurring OPEX, and protects the agency blended rate target.
            </p>
          </div>

          {/* Client Details Box */}
          <div className="flow-calc-glass p-3.5 flex flex-wrap sm:flex-nowrap items-center gap-3">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Client / Entity</label>
              <input 
                type="text" 
                value={clientName} 
                onChange={(e) => setClientName(e.target.value)}
                className="bg-navy-950 border border-white/15 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-teal-500 w-56 font-medium"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Reference</label>
              <span className="inline-block bg-navy-950 px-2.5 py-1.5 rounded-lg border border-white/15 font-mono text-xs text-teal-300">
                {proposalRef}
              </span>
            </div>
          </div>
        </div>

        {/* Presets Bar */}
        <div className="no-print flex items-center justify-between gap-3 mb-6 bg-navy-900/60 p-2.5 rounded-xl border border-white/5">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 font-semibold px-1">Quick Scenarios:</span>
            <button 
              onClick={() => applyPreset('anchor')} 
              className={`px-3 py-1 rounded-lg transition font-medium ${basePackageKey === 'premium' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'text-slate-300 hover:bg-navy-800'}`}>
              Anchor Enterprise
            </button>
            <button 
              onClick={() => applyPreset('sweetspot')} 
              className={`px-3 py-1 rounded-lg transition font-medium ${basePackageKey === 'core' ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30' : 'text-slate-300 hover:bg-navy-800'}`}>
              Clinic Sweet Spot
            </button>
            <button 
              onClick={() => applyPreset('starter')} 
              className={`px-3 py-1 rounded-lg transition font-medium ${basePackageKey === 'starter' ? 'bg-slate-700 text-white border border-slate-600' : 'text-slate-300 hover:bg-navy-800'}`}>
              Starter Launchpad
            </button>
          </div>
          <a 
            href="/calculator.html" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs text-teal-400 hover:text-teal-300 font-mono underline flex items-center gap-1">
            Standalone View ↗
          </a>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ================= LEFT CONFIGURATION PANEL ================= */}
          <div className="lg:col-span-7 xl:col-span-7 space-y-8 no-print">

            {/* STEP 1: BASE PACKAGES */}
            <section className="flow-calc-glass p-6 relative overflow-hidden border border-white/10">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 via-teal-400 to-transparent"></div>
              
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-teal-500/20 text-teal-300 font-mono text-xs font-bold border border-teal-500/30">01</span>
                  <div>
                    <h2 className="text-lg font-bold text-white tracking-tight">Select Base Package</h2>
                    <p className="text-xs text-slate-400">Core foundation of the Fλow Ecosystem (Select exactly one)</p>
                  </div>
                </div>
                <span className="text-xs font-mono text-slate-400 bg-navy-950 px-2.5 py-1 rounded-md border border-white/5">Upfront CAPEX</span>
              </div>

              <div className="space-y-3.5">
                {Object.values(BASE_PACKAGES).map((pkg) => {
                  const isSelected = basePackageKey === pkg.id;
                  const activeClass = isSelected 
                    ? (pkg.accent === 'amber' ? 'active-amber' : pkg.accent === 'teal' ? 'active-teal' : 'active-slate') 
                    : '';

                  return (
                    <div 
                      key={pkg.id} 
                      onClick={() => setBasePackageKey(pkg.id)}
                      className={`flow-calc-glass flow-calc-card p-5 border border-white/10 rounded-xl transition-all ${activeClass}`}>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
                            <input 
                              type="radio" 
                              name="reactBasePackage" 
                              checked={isSelected} 
                              onChange={() => setBasePackageKey(pkg.id)}
                              className="accent-teal-400"
                            />
                            <span className="text-base font-bold text-white">{pkg.name}</span>
                            <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase ${
                              pkg.accent === 'amber' 
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' 
                                : pkg.accent === 'teal' 
                                ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40' 
                                : 'bg-slate-700 text-slate-300 border border-slate-600'
                            }`}>
                              {pkg.tag}
                            </span>
                            {pkg.recommended && (
                              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 uppercase">
                                Recommended
                              </span>
                            )}
                            <span className="text-xs font-mono text-slate-400 bg-navy-950 px-2 py-0.5 rounded border border-white/5">
                              {pkg.hours} Hours Mapped
                            </span>
                          </div>

                          <p className="text-xs text-slate-300 mb-3 leading-relaxed">
                            {pkg.desc}
                          </p>

                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                            {pkg.features.map((feat, idx) => (
                              <li key={idx} className="flex items-center gap-2">
                                <svg className={`w-3.5 h-3.5 flex-shrink-0 ${pkg.accent === 'amber' ? 'text-amber-400' : 'text-teal-400'}`} fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                                </svg>
                                <span>{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="text-right flex-shrink-0 pl-2">
                          <div className={`text-2xl font-black font-mono tracking-tight ${pkg.accent === 'amber' ? 'text-amber-400' : pkg.accent === 'teal' ? 'text-teal-400' : 'text-slate-300'}`}>
                            {formatEUR(pkg.price)}
                          </div>
                          <div className="text-[11px] text-slate-400 mt-0.5">Net Base CAPEX</div>
                          <div className="text-[11px] font-mono text-teal-400/90 mt-1">
                            €{(pkg.price / pkg.hours).toFixed(2)}/hr yield
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* STEP 2: CUSTOM FEATURE TOGGLES */}
            <section className="flow-calc-glass p-6 relative overflow-hidden border border-white/10">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-amber-400 to-transparent"></div>

              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-amber-500/20 text-amber-300 font-mono text-xs font-bold border border-amber-500/30">02</span>
                  <div>
                    <h2 className="text-lg font-bold text-white tracking-tight">Custom Feature Add-ons</h2>
                    <p className="text-xs text-slate-400">Expand capability matrix (Adds directly to Net Upfront CAPEX)</p>
                  </div>
                </div>
                <span className="text-xs font-mono text-slate-400 bg-navy-950 px-2.5 py-1 rounded-md border border-white/5">Multi-Select</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {ADDON_FEATURES.map((feat) => {
                  const isChecked = selectedFeatures[feat.id];

                  return (
                    <div 
                      key={feat.id}
                      onClick={() => toggleFeature(feat.id)}
                      className={`flow-calc-glass flow-calc-card p-4 border rounded-xl flex flex-col justify-between transition-all ${
                        isChecked 
                          ? 'border-teal-400 bg-teal-950/25 shadow-glow-teal' 
                          : 'border-white/10 hover:border-white/20'
                      }`}>
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span className="text-sm font-bold text-white flex items-center gap-2">
                            <input 
                              type="checkbox" 
                              checked={isChecked} 
                              onChange={() => toggleFeature(feat.id)}
                              className="accent-teal-400 rounded"
                            />
                            {feat.shortName}
                          </span>
                          <span className="font-mono text-teal-400 font-bold text-sm">+{formatEUR(feat.price)}</span>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed pl-5">
                          {feat.desc}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-3 mt-3 border-t border-white/5 text-[11px] pl-5">
                        <span className="font-mono text-slate-400">+{feat.hours} Working Hours</span>
                        <span className={`font-medium flex items-center gap-1.5 ${isChecked ? 'text-teal-300' : 'text-slate-500'}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${isChecked ? 'bg-teal-400' : 'bg-slate-600'}`}></span>
                          {isChecked ? 'Included' : 'Add to scope'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* STEP 3: OPEX & RECURRING HOSTING / TOKEN FUEL */}
            <section className="flow-calc-glass p-6 relative overflow-hidden border border-white/10">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 via-amber-400 to-transparent"></div>

              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-teal-500/20 text-teal-300 font-mono text-xs font-bold border border-teal-500/30">03</span>
                  <div>
                    <h2 className="text-lg font-bold text-white tracking-tight">Select OPEX / Recurring Model</h2>
                    <p className="text-xs text-slate-400">Cloud compute, Token API Fuel & SLA (Annual Commitments)</p>
                  </div>
                </div>

                {/* Cadence Selector */}
                <div className="flex items-center gap-1 bg-navy-950 p-1 rounded-lg border border-white/5 text-xs font-mono">
                  <button 
                    type="button" 
                    onClick={() => setOpexCadence('monthly')}
                    className={`px-2 py-1 rounded transition ${opexCadence === 'monthly' ? 'bg-teal-500/20 text-teal-300 font-semibold border border-teal-500/30' : 'text-slate-400 hover:text-white'}`}>
                    Monthly
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setOpexCadence('yearly')}
                    className={`px-2 py-1 rounded transition ${opexCadence === 'yearly' ? 'bg-teal-500/20 text-teal-300 font-semibold border border-teal-500/30' : 'text-slate-400 hover:text-white'}`}>
                    Yearly
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.values(OPEX_OPTIONS).map((op) => {
                  const isSelected = opexKey === op.id;
                  const isPrem = op.id === 'premium';

                  return (
                    <div 
                      key={op.id}
                      onClick={() => setOpexKey(op.id)}
                      className={`flow-calc-glass flow-calc-card p-5 border rounded-xl flex flex-col justify-between transition-all ${
                        isSelected 
                          ? (isPrem ? 'border-amber-400 bg-amber-950/20 shadow-glow-amber' : 'border-teal-400 bg-teal-950/20 shadow-glow-teal')
                          : 'border-white/10 hover:border-white/20'
                      }`}>
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-sm font-bold text-white flex items-center gap-2">
                            <input 
                              type="radio" 
                              name="reactOpexOption" 
                              checked={isSelected} 
                              onChange={() => setOpexKey(op.id)}
                              className="accent-teal-400"
                            />
                            {op.name}
                          </span>
                          <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded ${
                            isPrem 
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' 
                              : 'bg-slate-800 text-slate-300 border border-slate-700'
                          }`}>
                            {op.tier}
                          </span>
                        </div>

                        <div className="mb-3">
                          <div className={`text-xl font-mono font-extrabold ${isPrem ? 'text-amber-400' : 'text-teal-400'}`}>
                            {formatEUR(op.priceYearly)} <span className="text-xs text-slate-400 font-sans font-normal">/ year</span>
                          </div>
                          <div className="text-xs text-slate-400 font-mono">
                            Equivalent to {formatEUR(op.priceMonthly)} / month
                          </div>
                        </div>

                        <p className="text-xs text-slate-300 leading-relaxed mb-3">
                          {op.desc}
                        </p>

                        <div className="p-2.5 rounded-lg bg-navy-950/80 border border-white/5 text-[11px] font-mono text-slate-300">
                          {op.breakdownMonthly}
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                        <span>{op.sla}</span>
                        <span className={isPrem ? 'text-amber-400 font-medium' : 'text-teal-400 font-medium'}>
                          {isPrem ? 'Dedicated Tenant' : 'Standard Quota'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

          </div>

          {/* ================= RIGHT COLUMN: GRAND SLAM OFFER RECEIPT (STICKY) ================= */}
          <div className="lg:col-span-5 xl:col-span-5 lg:sticky lg:top-28 space-y-6" id="summary-card">
            
            <div className="flow-calc-receipt p-6 sm:p-7 space-y-6">
              
              {/* Receipt Header */}
              <div className="flex items-start justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-teal-400 font-bold">Proposal Order Summary</span>
                  <h3 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-1.5 mt-0.5">
                    The "Grand Slam" Offer
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">Client: {clientName || 'Valued Client'}</p>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 text-[10px] font-mono font-bold border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> LIVE ENGINE
                  </span>
                  <div className="text-[10px] font-mono text-slate-500 mt-1">
                    {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </div>
                </div>
              </div>

              {/* Scope Deliverables Line Items */}
              <div className="space-y-3">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                  <span>Scope Deliverable</span>
                  <span>Net EUR</span>
                </div>

                {/* Base Package */}
                <div className="flex items-center justify-between text-xs py-1 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-teal-400"></span>
                    <span className="text-slate-200 font-medium">{calculations.basePkg.name} ({calculations.basePkg.tag})</span>
                  </div>
                  <span className="font-mono text-white font-semibold">{formatEUR(calculations.basePkg.price)}</span>
                </div>

                {/* Features */}
                <div className="space-y-1.5">
                  {calculations.activeAddons.length === 0 ? (
                    <div className="text-xs text-slate-500 italic py-0.5">No optional add-ons selected</div>
                  ) : (
                    calculations.activeAddons.map(f => (
                      <div key={f.id} className="flex items-center justify-between text-xs py-1 border-b border-white/5">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-300"></span>
                          <span className="text-slate-300">{f.name}</span>
                        </div>
                        <span className="font-mono text-slate-200 font-medium">+{formatEUR(f.price)}</span>
                      </div>
                    ))
                  )}
                </div>

                {/* OPEX Line */}
                <div className="flex items-center justify-between text-xs py-1 border-t border-dashed border-white/10 pt-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                    <span className="text-slate-200 font-medium">{calculations.opexOption.name}</span>
                  </div>
                  <span className="font-mono text-amber-300 font-semibold">{formatEUR(calculations.opexOption.priceYearly)} / yr</span>
                </div>
              </div>

              {/* PRIMARY METRIC 1: TOTAL NET CAPEX */}
              <div className="p-5 rounded-xl bg-navy-950/90 border border-teal-500/30 shadow-inner relative overflow-hidden">
                <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-teal-500/10 rounded-full blur-xl pointer-events-none"></div>

                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-300">Total Net CAPEX (Upfront)</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-950 border border-teal-500/30 text-teal-300">One-Time Setup</span>
                </div>

                <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white my-1">
                  {formatEUR(calculations.totalNetCapex)}
                </div>

                <div className="pt-2 mt-2 border-t border-white/10 flex flex-wrap items-center justify-between text-xs text-slate-300 font-mono">
                  <div>
                    <span className="text-slate-400">+ 24% Greek VAT: </span>
                    <span className="text-teal-400 font-semibold">{formatEUR(calculations.vatCapex)}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Total Gross: </span>
                    <span className="text-white font-bold">{formatEUR(calculations.totalGrossCapex)}</span>
                  </div>
                </div>
              </div>

              {/* PRIMARY METRIC 2: TOTAL NET OPEX */}
              <div className="p-5 rounded-xl bg-navy-950/90 border border-amber-500/30 shadow-inner relative overflow-hidden">
                <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-amber-500/10 rounded-full blur-xl pointer-events-none"></div>

                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-300">Total Net OPEX (Run Rate)</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 border border-amber-500/30 text-amber-300">
                    {opexCadence === 'yearly' ? 'Annual Contract' : 'Monthly Cadence'}
                  </span>
                </div>

                <div className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-white flex items-baseline gap-2 my-1">
                  <span>
                    {opexCadence === 'yearly' ? formatEUR(calculations.totalNetOpexYearly) : formatEUR(calculations.totalNetOpexMonthly)}
                  </span>
                  <span className="text-xs font-normal text-slate-400 font-sans">
                    {opexCadence === 'yearly' ? `/ year (${formatEUR(calculations.totalNetOpexMonthly)}/mo)` : `/ month (${formatEUR(calculations.totalNetOpexYearly)}/yr)`}
                  </span>
                </div>

                <div className="pt-2 mt-2 border-t border-white/10 flex flex-wrap items-center justify-between text-xs text-slate-300 font-mono">
                  <div>
                    <span className="text-slate-400">+ 24% Greek VAT: </span>
                    <span className="text-amber-400 font-semibold">
                      {opexCadence === 'yearly' ? formatEUR(calculations.vatOpexYearly) : formatEUR(calculations.vatOpexMonthly)}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400">Gross: </span>
                    <span className="text-white font-bold">
                      {opexCadence === 'yearly' ? formatEUR(calculations.totalGrossOpexYearly) : formatEUR(calculations.totalGrossOpexMonthly)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Grand 1st Year Investment Outlay */}
              <div className="flex items-center justify-between px-3.5 py-2.5 rounded-lg bg-navy-950 border border-white/5 text-xs">
                <span className="text-slate-400 font-medium">Year 1 Total Outlay (Gross CAPEX + OPEX):</span>
                <span className="font-mono text-emerald-400 font-bold text-sm">
                  {formatEUR(calculations.totalYear1Gross)}
                </span>
              </div>

              {/* INTERNAL AGENCY MARGIN STATS */}
              <div className="p-4 rounded-xl bg-navy-950/70 border border-white/5 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <svg className="w-3 h-3 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
                    Agency Margin & Profitability Engine
                  </span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold border ${
                    calculations.isTargetMet 
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' 
                      : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                  }`}>
                    {calculations.isTargetMet ? 'TARGET MET (≥ €60/h)' : 'MONITOR MARGIN (< €60/h)'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="bg-navy-900/90 p-2.5 rounded-lg border border-white/5">
                    <div className="text-[10px] text-slate-400">Total Working Hours</div>
                    <div className="text-base font-black font-mono text-white mt-0.5">{calculations.totalHours} hrs</div>
                    <div className="text-[9px] text-slate-500">Agency effort budgeted</div>
                  </div>

                  <div className="bg-navy-900/90 p-2.5 rounded-lg border border-white/5">
                    <div className="text-[10px] text-slate-400">Blended Effective Rate</div>
                    <div className="text-base font-black font-mono text-teal-400 mt-0.5">{formatEUR(calculations.blendedHourlyRate)} / hr</div>
                    <div className={`text-[9px] font-medium ${calculations.isTargetMet ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {calculations.rateDelta >= 0 ? `+${formatEUR(calculations.rateDelta)} above €60/h` : `${formatEUR(calculations.rateDelta)} below €60/h`}
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="pt-1">
                  <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-1">
                    <span>Target: €60.00/hr</span>
                    <span>{Math.round(Math.min((calculations.blendedHourlyRate / 60) * 100, 150))}% Target Index</span>
                  </div>
                  <div className="w-full h-1.5 bg-navy-900 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-300 ${calculations.isTargetMet ? 'bg-gradient-to-r from-teal-500 to-emerald-400' : 'bg-gradient-to-r from-amber-500 to-orange-400'}`}
                      style={{ width: `${Math.min((calculations.blendedHourlyRate / 60) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="space-y-2.5 pt-2">
                <button 
                  type="button" 
                  onClick={handleExportPDF}
                  className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-teal-400 via-teal-500 to-amber-500 hover:from-teal-300 hover:to-amber-400 text-slate-950 font-extrabold text-sm sm:text-base tracking-tight shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 transform hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2.5 cursor-pointer">
                  <svg className="w-5 h-5 text-slate-950" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                  <span>Export Proposal PDF</span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button 
                    type="button" 
                    onClick={copySummaryMarkdown}
                    className="w-full py-2.5 px-3 rounded-lg bg-navy-950 hover:bg-navy-800 text-slate-300 hover:text-white border border-white/10 text-xs font-medium transition flex items-center justify-center gap-1.5 cursor-pointer">
                    <svg className="w-3.5 h-3.5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/></svg>
                    <span>{copied ? 'Copied!' : 'Copy Markdown'}</span>
                  </button>

                  <button 
                    type="button" 
                    onClick={() => setShowModal(true)}
                    className="w-full py-2.5 px-3 rounded-lg bg-navy-950 hover:bg-navy-800 text-slate-300 hover:text-white border border-white/10 text-xs font-medium transition flex items-center justify-center gap-1.5 cursor-pointer">
                    <svg className="w-3.5 h-3.5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                    <span>Preview Document</span>
                  </button>
                </div>

                {copied && (
                  <div className="text-xs text-center py-2 px-3 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono">
                    ✓ Proposal summary copied to clipboard!
                  </div>
                )}
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* ================= PRINT / PDF EXPORT MODAL ================= */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto no-print">
          <div className="bg-navy-900 border border-white/15 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
            
            {/* Modal Header */}
            <div className="sticky top-0 bg-navy-950 border-b border-white/10 px-6 py-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-teal-400"></span>
                <h3 className="text-base font-bold text-white">Executive Proposal Document Preview</h3>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => window.print()} 
                  className="px-3 py-1.5 rounded-lg bg-teal-500 text-navy-950 font-bold text-xs hover:bg-teal-400 transition flex items-center gap-1.5 cursor-pointer">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
                  Print / Save System PDF
                </button>
                <button 
                  onClick={() => setShowModal(false)} 
                  className="text-slate-400 hover:text-white p-1 cursor-pointer">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
              </div>
            </div>

            {/* Printable Formal Document */}
            <div className="p-8 sm:p-12 bg-white text-slate-900 font-sans proposal-print-container">
              
              {/* Header Letterhead */}
              <div className="flex items-start justify-between border-b-2 border-slate-900 pb-6 mb-8">
                <div>
                  <div className="text-2xl font-black tracking-tight text-slate-900 flex items-center gap-2">
                    SIMASIA<span className="text-teal-600">AI</span>
                  </div>
                  <div className="text-xs font-semibold text-slate-600 uppercase tracking-widest mt-0.5">Applied Artificial Intelligence & Digital Systems</div>
                  <div className="text-xs text-slate-500 mt-2">
                    Athens Innovation Center • contact@simasia.ai • www.simasia.ai
                  </div>
                </div>
                <div className="text-right">
                  <div className="inline-block px-3 py-1 bg-slate-100 rounded text-xs font-mono font-bold text-slate-800 border border-slate-300">
                    COMMERCIAL PROPOSAL
                  </div>
                  <div className="text-xs text-slate-500 mt-2 font-mono">Date: <span className="font-bold text-slate-800">{new Date().toLocaleDateString('en-GB')}</span></div>
                  <div className="text-xs text-slate-500 font-mono">Ref: <span className="font-bold text-slate-800">{proposalRef}</span></div>
                  <div className="text-xs text-slate-500 font-mono">Valid: 30 Calendar Days</div>
                </div>
              </div>

              {/* Client Info Block */}
              <div className="grid grid-cols-2 gap-6 p-4 rounded-lg bg-slate-50 border border-slate-200 mb-8 text-xs">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Target Client</div>
                  <div className="text-sm font-bold text-slate-900 mt-0.5">{clientName || 'Valued Client'}</div>
                  <div className="text-slate-600 mt-1">Enterprise Digital Transformation & Praxis Architecture</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Solution Ecosystem</div>
                  <div className="text-sm font-bold text-slate-900 mt-0.5">Fλow Digital Ecosystem (End-to-End)</div>
                  <div className="text-slate-600 mt-1">Praxis CRM • Autonomous AI Agents • Enterprise Guardrails</div>
                </div>
              </div>

              {/* Deliverables Table */}
              <div className="mb-8">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-2 mb-3">
                  Section 1: Initial Implementation Scope (CAPEX Upfront)
                </h4>
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-300 text-slate-600 font-semibold">
                      <th className="py-2">Deliverable Component</th>
                      <th className="py-2">Specifications & Mapped Scope</th>
                      <th className="py-2 text-right">Effort</th>
                      <th className="py-2 text-right">Net Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-800">
                    <tr>
                      <td className="py-2.5 font-bold text-slate-900">{calculations.basePkg.name} <span className="text-[10px] text-teal-700 uppercase font-mono">({calculations.basePkg.tag})</span></td>
                      <td className="py-2.5 text-slate-600">
                        {calculations.basePkg.desc}
                        <div className="text-[10px] text-slate-500 mt-0.5">{calculations.basePkg.features.join(' • ')}</div>
                      </td>
                      <td className="py-2.5 text-right font-mono">{calculations.basePkg.hours} hrs</td>
                      <td className="py-2.5 text-right font-mono font-bold text-slate-900">{formatEUR(calculations.basePkg.price)}</td>
                    </tr>
                    {calculations.activeAddons.map(f => (
                      <tr key={f.id}>
                        <td className="py-2 font-semibold text-slate-800">{f.name}</td>
                        <td className="py-2 text-slate-600">{f.desc}</td>
                        <td className="py-2 text-right font-mono">+{f.hours} hrs</td>
                        <td className="py-2 text-right font-mono font-semibold text-slate-800">+{formatEUR(f.price)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* CAPEX Summary */}
              <div className="flex justify-end mb-8">
                <div className="w-72 space-y-2 text-xs border-t-2 border-slate-900 pt-3">
                  <div className="flex justify-between text-slate-600">
                    <span>Total Net CAPEX:</span>
                    <span className="font-mono font-bold text-slate-900">{formatEUR(calculations.totalNetCapex)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Greek VAT (24%):</span>
                    <span className="font-mono font-bold text-slate-900">{formatEUR(calculations.vatCapex)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-black text-slate-900 pt-1 border-t border-slate-300">
                    <span>Total Gross CAPEX:</span>
                    <span className="font-mono text-teal-700">{formatEUR(calculations.totalGrossCapex)}</span>
                  </div>
                </div>
              </div>

              {/* OPEX Block */}
              <div className="mb-8">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-2 mb-3">
                  Section 2: Recurring Infrastructure & LLM Fuel (OPEX Run Rate)
                </h4>
                <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-bold text-slate-900">{calculations.opexOption.name} ({calculations.opexOption.tier})</span>
                      <p className="text-slate-600 text-[11px] mt-0.5">{calculations.opexOption.breakdownMonthly} • {calculations.opexOption.sla}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-black text-slate-900 text-sm">{formatEUR(calculations.totalNetOpexYearly)} / yr</div>
                      <div className="text-[10px] text-slate-500 font-mono">+ 24% VAT = {formatEUR(calculations.totalGrossOpexYearly)} / yr</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Terms & Signatures */}
              <div className="border-t border-slate-300 pt-6 text-[11px] text-slate-600 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="font-bold text-slate-900">Payment Milestones:</span>
                    <ul className="list-disc list-inside mt-1 space-y-0.5">
                      <li>50% upfront deposit upon contract signing</li>
                      <li>30% upon staging verification & schema ingestion</li>
                      <li>20% upon final acceptance & staff trainings</li>
                      <li>OPEX billed annually in advance</li>
                    </ul>
                  </div>
                  <div>
                    <span className="font-bold text-slate-900">Governance & Security:</span>
                    <ul className="list-disc list-inside mt-1 space-y-0.5">
                      <li>EU AI Act Compliant Architecture</li>
                      <li>Zero data retention for third-party models</li>
                      <li>Intellectual property assignment upon completion</li>
                    </ul>
                  </div>
                </div>

                <div className="pt-8 grid grid-cols-2 gap-12 text-xs">
                  <div>
                    <div className="border-b border-slate-400 pb-12"></div>
                    <div className="font-bold text-slate-900 mt-2">For SimasiaAI</div>
                    <div className="text-[10px] text-slate-500">Authorized Technical & Commercial Director</div>
                  </div>
                  <div>
                    <div className="border-b border-slate-400 pb-12"></div>
                    <div className="font-bold text-slate-900 mt-2">For {clientName || 'Client Acceptance'}</div>
                    <div className="text-[10px] text-slate-500">Authorized Representative Signature & Date</div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
