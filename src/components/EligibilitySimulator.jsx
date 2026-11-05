import React, { useState } from 'react';
import { Check, ShieldCheck, Sparkles, Download, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function EligibilitySimulator() {
  const [finish, setFinish] = useState('Midnight'); // 'Midnight', 'Cobalt', 'Bone', 'Graphite'
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

  // Card themes: Zero green! High-craft Midnight, Cobalt, Bone, and Graphite.
  const cardThemes = {
    Midnight: {
      cardBg: 'bg-[#0B1320]',
      textPrimary: 'text-white',
      textMuted: 'text-[#94A3B8]',
      badgeBg: 'bg-[#1E293B]',
      badgeText: 'text-[#38BDF8]',
      chipBg: 'bg-[#F59E0B]',
      border: 'border-[#1E293B]'
    },
    Cobalt: {
      cardBg: 'bg-[#1D4ED8]',
      textPrimary: 'text-white',
      textMuted: 'text-[#BFDBFE]',
      badgeBg: 'bg-[#1E40AF]',
      badgeText: 'text-white',
      chipBg: 'bg-white',
      border: 'border-[#1E40AF]'
    },
    Bone: {
      cardBg: 'bg-[#EFECE6]',
      textPrimary: 'text-[#0F172A]',
      textMuted: 'text-[#64748B]',
      badgeBg: 'bg-[#E2DFD7]',
      badgeText: 'text-[#0F172A]',
      chipBg: 'bg-[#94A3B8]',
      border: 'border-[#CBD5E1]'
    },
    Graphite: {
      cardBg: 'bg-[#1E293B]',
      textPrimary: 'text-white',
      textMuted: 'text-[#94A3B8]',
      badgeBg: 'bg-[#334155]',
      badgeText: 'text-[#F1F5F9]',
      chipBg: 'bg-[#F59E0B]',
      border: 'border-[#334155]'
    }
  };

  const currentTheme = cardThemes[finish];

  return (
    <section id="make" className="py-20 px-4 sm:px-6 lg:px-10 border-b border-black/[0.07] bg-[#F8F7F4]">
      <div className="max-w-7xl xl:max-w-[1400px] mx-auto">
        
        {/* Bisque Split Rail Header (02) */}
        <div className="border-t border-black/[0.08] pt-3 pb-8 flex items-center justify-between text-xs font-mono text-[#475569] tracking-wider uppercase">
          <div className="flex items-center gap-3">
            <span className="text-[#0F172A] font-semibold">(02)</span>
            <span>ELIGIBILITY & BID MATCHER</span>
          </div>
          <div className="text-right text-[#475569]">
            Try it — instant exemption audit
          </div>
        </div>

        {/* Section Headline */}
        <div className="max-w-3xl mb-12">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight leading-tight">
            Check your tender eligibility.
            <span className="block text-[#475569] font-normal text-2xl sm:text-3xl mt-1">
              Takes about nine seconds.
            </span>
          </h2>
          <p className="mt-3 text-[#475569] text-sm sm:text-base leading-relaxed">
            Name your business classification, set your annual turnover, and verify your 100% EMD fee waiver status under India's Public Procurement Policy.
          </p>
        </div>

        {/* Interactive Dual-Panel Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Configuration Panel */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-black/[0.08] shadow-xs space-y-6">
            
            {/* Control 1: Card Finish Selector (Midnight, Cobalt, Bone, Graphite) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[11px] font-mono uppercase text-[#64748B] font-semibold">
                  Card Theme Finish
                </label>
                <span className="text-[10px] font-mono text-[#1D4ED8]">Interactive Finish</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {['Midnight', 'Cobalt', 'Bone', 'Graphite'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFinish(f)}
                    className={`py-2 px-3 rounded-xl text-xs font-mono font-medium border transition cursor-pointer text-center ${
                      finish === f
                        ? 'bg-[#0B1320] text-white border-[#0B1320] shadow-xs'
                        : 'bg-[#F8F7F4] text-[#475569] border-black/[0.06] hover:border-black/20'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Control 2: Entity Classification */}
            <div>
              <label className="block text-[11px] font-mono uppercase text-[#64748B] font-semibold mb-2">
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
                        ? 'bg-[#0B1320] text-white border-[#0B1320] shadow-xs'
                        : 'bg-[#F8F7F4] text-[#0F172A] border-black/[0.06] hover:border-black/20'
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
                <label className="text-[11px] font-mono uppercase text-[#64748B] font-semibold">
                  Average Annual Turnover
                </label>
                <span className="text-xs font-mono font-bold text-[#0F172A] bg-[#F8F7F4] px-2 py-0.5 rounded border border-black/[0.06]">
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
                className="w-full h-1.5 bg-[#EFECE6] rounded-lg appearance-none cursor-pointer accent-[#1D4ED8]"
              />
              <div className="flex justify-between text-[10px] font-mono text-[#64748B] mt-1">
                <span>₹10 Lakhs</span>
                <span>₹1 Crore</span>
                <span>₹4 Crores+</span>
              </div>
            </div>

            {/* Control 4: Experience */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[11px] font-mono uppercase text-[#64748B] font-semibold">
                  Prior Operating Experience
                </label>
                <span className="text-xs font-mono font-bold text-[#0F172A] bg-[#F8F7F4] px-2 py-0.5 rounded border border-black/[0.06]">
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
                className="w-full h-1.5 bg-[#EFECE6] rounded-lg appearance-none cursor-pointer accent-[#1D4ED8]"
              />
            </div>

            {/* Toggle */}
            <div className="pt-3 border-t border-black/[0.06] flex items-center justify-between">
              <div>
                <span className="text-xs font-medium text-[#0F172A] block">Active Udyam Registration</span>
                <span className="text-[11px] text-[#475569]">Enables 100% EMD fee waiver across GeM</span>
              </div>
              <button
                onClick={() => setHasUdyam(!hasUdyam)}
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition cursor-pointer ${
                  hasUdyam ? 'bg-[#1D4ED8]' : 'bg-[#CBD5E1]'
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
                  <div className={`w-6 h-6 rounded-md ${currentTheme.chipBg} opacity-90 flex items-center justify-center`}>
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
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
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
                <span className="text-[#64748B]">Live Matched Bids</span>
                <span className="font-bold text-[#1D4ED8] bg-[#EEF4FF] border border-[#BFDBFE] px-2 py-0.5 rounded">
                  {estimatedMatches.toLocaleString('en-IN')} Tenders
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-[#475569]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className={`w-4 h-4 ${isEmdExempt ? 'text-[#1D4ED8]' : 'text-gray-300'}`} />
                  <span>EMD Fee Waiver: <strong>{isEmdExempt ? 'Applicable (₹0 EMD)' : 'Not Eligible'}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className={`w-4 h-4 ${turnoverRelaxation ? 'text-[#1D4ED8]' : 'text-gray-300'}`} />
                  <span>Turnover Requirement: <strong>{turnoverRelaxation ? '50% Relaxed' : 'Standard'}</strong></span>
                </div>
              </div>

              <button
                onClick={handleDownload}
                className="w-full mt-3 py-2.5 px-4 rounded-xl bg-[#0B1320] hover:bg-[#1E293B] text-white font-mono text-xs font-medium transition cursor-pointer flex items-center justify-center gap-2"
              >
                <Download className="w-3.5 h-3.5 text-[#38BDF8]" />
                {downloadSuccess ? 'Pack Generated Successfully!' : 'Download Qualification Pack'}
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
