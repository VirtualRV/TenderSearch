import React, { useState } from 'react';
import { Check, ShieldCheck, Sparkles, Download, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function EligibilitySimulator() {
  const [finish, setFinish] = useState('Forest');
  const [businessType, setBusinessType] = useState('MSME');
  const [turnover, setTurnover] = useState(80);
  const [experience, setExperience] = useState(3);
  const [hasUdyam, setHasUdyam] = useState(true);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Exemption logic
  const isEmdExempt = (businessType === 'MSME' && hasUdyam) || businessType === 'Startup';
  const turnoverRelaxation = businessType === 'MSME' || businessType === 'Startup';
  
  // Score calculation
  let score = 70;
  if (isEmdExempt) score += 15;
  if (turnover >= 50) score += 8;
  if (experience >= 2) score += 5;
  if (score > 98) score = 98;

  const estimatedMatches = Math.round((turnover * 14) + (experience * 90) + (isEmdExempt ? 380 : 150));

  const handleDownload = () => {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3500);
  };

  const cardThemes = {
    Forest: {
      cardBg: 'bg-[#0F3B2E]',
      textPrimary: 'text-[#FCFAF6]',
      textMuted: 'text-[#DDF1E3]/80',
      badgeBg: 'bg-[#1A5241]',
      badgeText: 'text-[#DDF1E3]',
      chipBg: 'bg-[#C9BC98]',
      border: 'border-[#1A5241]'
    },
    Mint: {
      cardBg: 'bg-[#DDF1E3]',
      textPrimary: 'text-[#0A2C22]',
      textMuted: 'text-[#0F3B2E]/70',
      badgeBg: 'bg-[#B8E3C6]',
      badgeText: 'text-[#0A2C22]',
      chipBg: 'bg-[#0F3B2E]',
      border: 'border-[#B8E3C6]'
    },
    Bone: {
      cardBg: 'bg-[#EFECE3]',
      textPrimary: 'text-[#111816]',
      textMuted: 'text-[#535C57]',
      badgeBg: 'bg-[#E4DFC6]',
      badgeText: 'text-[#111816]',
      chipBg: 'bg-[#848D88]',
      border: 'border-[#D4CEBF]'
    },
    Ink: {
      cardBg: 'bg-[#111816]',
      textPrimary: 'text-white',
      textMuted: 'text-gray-400',
      badgeBg: 'bg-[#222B27]',
      badgeText: 'text-[#DDF1E3]',
      chipBg: 'bg-[#C9BC98]',
      border: 'border-[#222B27]'
    }
  };

  const currentTheme = cardThemes[finish];

  return (
    <section id="make" className="py-20 px-4 sm:px-6 lg:px-10 border-b border-black/[0.07] bg-[#F7F5EE]">
      <div className="max-w-7xl xl:max-w-[1400px] mx-auto">
        
        {/* Bisque Split Rail Header (02) */}
        <div className="border-t border-black/[0.08] pt-3 pb-8 flex items-center justify-between text-xs font-mono text-[#535C57] tracking-wider uppercase">
          <div className="flex items-center gap-3">
            <span className="text-[#111816] font-semibold">(02)</span>
            <span>ELIGIBILITY & BID MATCHER</span>
          </div>
          <div className="text-right text-[#535C57]">
            Try it — instant exemption audit
          </div>
        </div>

        {/* Section Headline */}
        <div className="max-w-3xl mb-12">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#111816] tracking-tight leading-tight">
            Check your tender eligibility.
            <span className="block text-[#535C57] font-normal text-2xl sm:text-3xl mt-1">
              Takes about nine seconds.
            </span>
          </h2>
          <p className="mt-3 text-[#535C57] text-sm sm:text-base leading-relaxed">
            Name your business classification, set your annual turnover, and verify your 100% EMD fee waiver status under India's Public Procurement Policy.
          </p>
        </div>

        {/* Interactive Dual-Panel Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Configuration Panel */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-black/[0.08] shadow-xs space-y-6">
            
            {/* Control 1: Card Finish Selector */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[11px] font-mono uppercase text-[#848D88] font-semibold">
                  Card Theme Finish
                </label>
                <span className="text-[10px] font-mono text-[#0F3B2E]">Interactive Finish</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {['Forest', 'Mint', 'Bone', 'Ink'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFinish(f)}
                    className={`py-2 px-3 rounded-xl text-xs font-mono font-medium border transition cursor-pointer text-center ${
                      finish === f
                        ? 'bg-[#0F3B2E] text-white border-[#0F3B2E]'
                        : 'bg-[#F7F5EE] text-[#535C57] border-black/[0.06] hover:border-black/20'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Control 2: Entity Classification */}
            <div>
              <label className="block text-[11px] font-mono uppercase text-[#848D88] font-semibold mb-2">
                Business Entity Type
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'MSME', label: 'Udyam MSME', sub: 'Micro / Small' },
                  { id: 'Startup', label: 'DPIIT Startup', sub: 'Recognized' },
                  { id: 'Enterprise', label: 'General Corp', sub: 'Standard' }
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setBusinessType(type.id)}
                    className={`py-2.5 px-3 rounded-xl text-left border transition cursor-pointer ${
                      businessType === type.id
                        ? 'bg-[#0F3B2E] text-white border-[#0F3B2E]'
                        : 'bg-[#F7F5EE] text-[#111816] border-black/[0.06] hover:border-black/20'
                    }`}
                  >
                    <div className="font-semibold text-xs">{type.label}</div>
                    <div className="text-[10px] opacity-75 font-mono">{type.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Control 3: Turnover Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[11px] font-mono uppercase text-[#848D88] font-semibold">
                  Average Annual Turnover
                </label>
                <span className="text-xs font-mono font-bold text-[#111816] bg-[#F7F5EE] px-2 py-0.5 rounded border border-black/[0.06]">
                  ₹ {turnover >= 100 ? `${(turnover / 100).toFixed(2)} Cr` : `${turnover} Lakhs`}
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="400"
                step="5"
                value={turnover}
                onChange={(e) => setTurnover(Number(e.target.value))}
                className="w-full h-1.5 bg-[#EFECE3] rounded-lg appearance-none cursor-pointer accent-[#0F3B2E]"
              />
              <div className="flex justify-between text-[10px] font-mono text-[#848D88] mt-1">
                <span>₹10 Lakhs</span>
                <span>₹1 Crore</span>
                <span>₹4 Crores+</span>
              </div>
            </div>

            {/* Control 4: Experience */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[11px] font-mono uppercase text-[#848D88] font-semibold">
                  Prior Operating Experience
                </label>
                <span className="text-xs font-mono font-bold text-[#111816] bg-[#F7F5EE] px-2 py-0.5 rounded border border-black/[0.06]">
                  {experience} {experience === 1 ? 'Year' : 'Years'}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                step="1"
                value={experience}
                onChange={(e) => setExperience(Number(e.target.value))}
                className="w-full h-1.5 bg-[#EFECE3] rounded-lg appearance-none cursor-pointer accent-[#0F3B2E]"
              />
            </div>

            {/* Toggle */}
            <div className="pt-3 border-t border-black/[0.06] flex items-center justify-between">
              <div>
                <span className="text-xs font-medium text-[#111816] block">Active Udyam Registration</span>
                <span className="text-[11px] text-[#535C57]">Enables 100% EMD fee waiver across GeM</span>
              </div>
              <button
                onClick={() => setHasUdyam(!hasUdyam)}
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition cursor-pointer ${
                  hasUdyam ? 'bg-[#0F3B2E]' : 'bg-[#D4CEBF]'
                }`}
              >
                <span
                  className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition ${
                    hasUdyam ? 'translate-x-4.5' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

          </div>

          {/* Right Live Virtual Card */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* The Stylized Virtual Card */}
            <div className={`${currentTheme.cardBg} ${currentTheme.border} rounded-2xl p-6 sm:p-8 border shadow-sm transition-all duration-300 relative overflow-hidden flex flex-col justify-between min-h-[280px]`}>
              
              {/* Card Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-md ${currentTheme.chipBg} opacity-85 flex items-center justify-center`}>
                    <div className="w-4 h-3 border border-black/20 rounded-xs"></div>
                  </div>
                  <span className={`font-mono text-xs font-semibold tracking-wider uppercase ${currentTheme.textPrimary}`}>
                    TenderSearch
                  </span>
                </div>

                <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full font-bold ${currentTheme.badgeBg} ${currentTheme.badgeText}`}>
                  {businessType} Verified
                </span>
              </div>

              {/* Card Middle: Score & Value */}
              <div className="my-6">
                <div className={`text-[10px] font-mono uppercase tracking-wider ${currentTheme.textMuted}`}>
                  Live GeM Compatibility Rating
                </div>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className={`text-5xl font-mono font-extrabold tracking-tight ${currentTheme.textPrimary}`}>
                    {score}%
                  </span>
                  <span className={`text-xs font-mono ${currentTheme.badgeText}`}>
                    Qualifying Status
                  </span>
                </div>
              </div>

              {/* Card Footer: Metadata */}
              <div className="pt-4 border-t border-black/10 flex items-center justify-between text-xs font-mono">
                <div>
                  <div className={`text-[10px] opacity-75 ${currentTheme.textMuted}`}>Turnover Bracket</div>
                  <div className={`font-semibold ${currentTheme.textPrimary}`}>
                    ₹ {turnover >= 100 ? `${(turnover / 100).toFixed(2)} Cr` : `${turnover} L`}
                  </div>
                </div>

                <div className="text-right">
                  <div className={`text-[10px] opacity-75 ${currentTheme.textMuted}`}>EMD Status</div>
                  <div className={`font-bold ${currentTheme.textPrimary}`}>
                    {isEmdExempt ? '100% EXEMPTED' : 'STANDARD'}
                  </div>
                </div>
              </div>

            </div>

            {/* Benefit Summary Box */}
            <div className="bg-white rounded-2xl p-5 border border-black/[0.08] shadow-xs space-y-3">
              <div className="flex items-center justify-between text-xs font-mono pb-2 border-b border-black/[0.06]">
                <span className="text-[#848D88]">Live Matched Bids</span>
                <span className="font-bold text-[#0F3B2E] bg-[#DDF1E3] px-2 py-0.5 rounded">
                  {estimatedMatches.toLocaleString('en-IN')} Tenders
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-[#535C57]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className={`w-4 h-4 ${isEmdExempt ? 'text-[#0F3B2E]' : 'text-gray-300'}`} />
                  <span>EMD Fee Waiver: <strong>{isEmdExempt ? 'Applicable (₹0 EMD)' : 'Not Eligible'}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className={`w-4 h-4 ${turnoverRelaxation ? 'text-[#0F3B2E]' : 'text-gray-300'}`} />
                  <span>Turnover Requirement: <strong>{turnoverRelaxation ? '50% Relaxed' : 'Standard'}</strong></span>
                </div>
              </div>

              <button
                onClick={handleDownload}
                className="w-full mt-3 py-2.5 px-4 rounded-xl bg-[#0F3B2E] hover:bg-[#0A2C22] text-[#FCFAF6] font-mono text-xs font-medium transition cursor-pointer flex items-center justify-center gap-2"
              >
                <Download className="w-3.5 h-3.5" />
                {downloadSuccess ? 'Pack Generated Successfully!' : 'Download Qualification Pack'}
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
