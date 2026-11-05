import React from 'react';
import { LockOpen, FileCode, Zap, ArrowRight } from 'lucide-react';

export default function WhyChooseUs({ onOpenDocCreator }) {
  return (
    <section id="why-free" className="py-20 px-4 sm:px-6 lg:px-10 border-b border-black/[0.07]">
      <div className="max-w-7xl xl:max-w-[1400px] mx-auto">
        
        {/* Bisque Split Rail Header (05) */}
        <div className="border-t border-black/[0.08] pt-3 pb-8 flex items-center justify-between text-xs font-mono text-[#475569] tracking-wider uppercase">
          <div className="flex items-center gap-3">
            <span className="text-[#0F172A] font-semibold">(05)</span>
            <span>WHY TENDERSEARCH</span>
          </div>
          <div className="text-right text-[#475569]">
            Empowering Indian MSMEs & Startups
          </div>
        </div>

        {/* Headline */}
        <div className="max-w-3xl mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Clean public tender discovery. Completely free.
          </h2>
          <p className="mt-3 text-[#475569] text-sm sm:text-base leading-relaxed">
            Government procurement notices belong in the public domain. TenderSearch provides an ad-free, paywall-free portal with automated compliance utilities.
          </p>
        </div>

        {/* Feature Cards Grid (Expansive 3-card layout) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white p-7 rounded-2xl border border-black/[0.07] shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#0B1320] text-[#38BDF8] flex items-center justify-center mb-5 shadow-xs">
              <LockOpen className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono font-bold text-[#1D4ED8] uppercase">Zero Paywalls</span>
            <h3 className="text-base font-bold text-[#0F172A] mt-1 mb-2">
              Free Tender Discovery
            </h3>
            <p className="text-xs text-[#475569] leading-relaxed">
              No phone numbers required, no OTP friction. Browse live GeM tenders and download specifications without sales calls.
            </p>
          </div>

          <div className="bg-white p-7 rounded-2xl border border-black/[0.07] shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#0B1320] text-[#38BDF8] flex items-center justify-center mb-5 shadow-xs">
              <FileCode className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono font-bold text-[#1D4ED8] uppercase">Doc's Creator</span>
            <h3 className="text-base font-bold text-[#0F172A] mt-1 mb-2">
              Automated Undertakings
            </h3>
            <p className="text-xs text-[#475569] leading-relaxed">
              Auto-generate Non-Blacklisting affidavits, Make in India local content certificates, and turnover declarations in 1 click.
            </p>
          </div>

          <div className="bg-white p-7 rounded-2xl border border-black/[0.07] shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#0B1320] text-[#38BDF8] flex items-center justify-center mb-5 shadow-xs">
              <Zap className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono font-bold text-[#1D4ED8] uppercase">Real-Time Sync</span>
            <h3 className="text-base font-bold text-[#0F172A] mt-1 mb-2">
              Live Deadline Alerts
            </h3>
            <p className="text-xs text-[#475569] leading-relaxed">
              Track corrigendums, bid opening extensions, and EMD criteria changes across all 28 states in real-time.
            </p>
          </div>

        </div>

        {/* Midnight Obsidian Callout */}
        <div className="mt-8 p-6 sm:p-8 rounded-2xl bg-[#0B1320] text-white border border-[#1E293B] flex flex-col sm:flex-row items-center justify-between gap-5">
          <div>
            <span className="text-[10px] font-mono text-[#38BDF8] uppercase tracking-wider block">
              1-Click Documentation
            </span>
            <h3 className="text-lg sm:text-xl font-bold mt-0.5">
              Generate your GeM tender bid paperwork now.
            </h3>
          </div>

          <button
            onClick={onOpenDocCreator}
            className="px-5 py-2.5 rounded-xl bg-[#1D4ED8] hover:bg-[#1E40AF] text-white font-mono text-xs font-semibold transition flex items-center gap-2 cursor-pointer shrink-0 shadow-sm"
          >
            <span>Launch Doc's Creator</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#38BDF8]" />
          </button>
        </div>

      </div>
    </section>
  );
}
