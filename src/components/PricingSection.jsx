import React, { useState } from 'react';
import { Check, ShieldCheck, Zap, ArrowRight, Sparkles, Sliders } from 'lucide-react';

export default function PricingSection({ onInitiateCheckout }) {
  const [bidsPerMonth, setBidsPerMonth] = useState(15);
  const [needsOemSupport, setNeedsOemSupport] = useState(true);
  const [needsReverseAuction, setNeedsReverseAuction] = useState(false);

  const calculatedCustomPrice = (bidsPerMonth * 350) + (needsOemSupport ? 2500 : 0) + (needsReverseAuction ? 4000 : 0);

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-10 border-b border-black/[0.07] bg-[#F8F7F4]">
      <div className="max-w-7xl xl:max-w-[1400px] mx-auto">
        
        {/* Split Rail Header */}
        <div className="border-t border-black/[0.08] pt-3 pb-8 flex items-center justify-between text-xs font-mono text-[#475569] tracking-wider uppercase">
          <div className="flex items-center gap-3">
            <span className="text-[#0F172A] font-semibold">(PRICING)</span>
            <span>TRANSPARENT TENDER PROCUREMENT PLANS</span>
          </div>
          <div className="text-right text-[#475569]">
            Secured by Razorpay • Instant Auto-Unlock
          </div>
        </div>

        {/* Section Headline */}
        <div className="max-w-3xl mb-12">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight">
            Pay per project, or scale with custom.
            <span className="block text-[#475569] font-normal text-2xl sm:text-3xl mt-1">
              Zero long-term lock-in contracts.
            </span>
          </h2>
          <p className="mt-3 text-[#475569] text-sm sm:text-base leading-relaxed">
            Search is always free. When you decide to bid on a specific tender, unlock the full technical BOQ, competitor history, and pre-formatted legal affidavits for just ₹500.
          </p>
        </div>

        {/* Plans Grid (Wide 3-Column on desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          
          {/* Plan 1: Free Public Search */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-black/[0.08] shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase text-[#64748B] font-bold tracking-wider">
                Explorer
              </span>
              <h3 className="text-xl font-bold text-[#0F172A] mt-1">Free Public Search</h3>
              <p className="text-xs text-[#475569] mt-1.5 leading-relaxed">
                For contractors and startups looking to discover active government opportunities.
              </p>

              <div className="my-6 pb-6 border-b border-black/[0.06]">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold font-mono text-[#0F172A]">₹0</span>
                  <span className="text-xs text-[#475569] font-mono">/ forever</span>
                </div>
                <span className="text-[11px] text-[#1D4ED8] font-mono font-semibold block mt-1">
                  Zero credit card or OTP required
                </span>
              </div>

              <ul className="space-y-2.5 text-xs text-[#475569] font-sans">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#1D4ED8] shrink-0" />
                  <span>50,000+ live GeM & CPPP tender search</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#1D4ED8] shrink-0" />
                  <span>28 States & UTs jurisdiction filtering</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#1D4ED8] shrink-0" />
                  <span>Real-time closing deadline alerts</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#1D4ED8] shrink-0" />
                  <span>Interactive eligibility calculator (#make)</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-black/[0.06]">
              <a
                href="#tenders"
                className="w-full py-2.5 rounded-xl border border-black/10 bg-[#F8F7F4] hover:bg-[#EFECE6] text-[#0F172A] font-mono text-xs font-semibold transition block text-center"
              >
                Start Free Search
              </a>
            </div>
          </div>

          {/* Plan 2: Single Project Bid Pack (Featured ₹500 - Deep Obsidian Midnight & Cobalt) */}
          <div className="bg-[#0B1320] text-white rounded-2xl p-6 sm:p-8 border border-[#1E293B] shadow-md flex flex-col justify-between relative overflow-hidden">
            
            <div className="absolute top-4 right-4">
              <span className="px-2.5 py-0.5 rounded-full bg-[#1D4ED8] text-white text-[10px] font-mono font-bold uppercase tracking-wider shadow-xs">
                Most Popular
              </span>
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase text-[#38BDF8] font-bold tracking-wider">
                Per-Project Model
              </span>
              <h3 className="text-xl font-bold text-white mt-1">Single Project Pack</h3>
              <p className="text-xs text-[#94A3B8] mt-1.5 leading-relaxed">
                Everything required to submit a verified, compliant bid for 1 specific tender.
              </p>

              <div className="my-6 pb-6 border-b border-white/10">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold font-mono text-white">₹500</span>
                  <span className="text-xs text-[#94A3B8] font-mono">/ single tender</span>
                </div>
                <span className="text-[11px] text-[#38BDF8] font-mono font-semibold block mt-1">
                  One-time fee • Instant Razorpay Unlock
                </span>
              </div>

              <ul className="space-y-2.5 text-xs text-[#E2E8F0] font-sans">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#38BDF8] shrink-0" />
                  <span><strong>Full BOQ Schedule:</strong> Unlocked line-by-line item specs</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#38BDF8] shrink-0" />
                  <span><strong>5 Legal Affidavits:</strong> Non-blacklisting, MII, GFR 144(xi)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#38BDF8] shrink-0" />
                  <span><strong>Past L1 Rate Insights:</strong> Historical winning price trends</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#38BDF8] shrink-0" />
                  <span><strong>Deadline SMS/WhatsApp:</strong> Never miss a corrigendum</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#38BDF8] shrink-0" />
                  <span><strong>GST Tax Invoice:</strong> 100% compliant business expense</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10">
              <button
                onClick={() => onInitiateCheckout({
                  name: "Single Project Bid Pack",
                  price: 500,
                  tenderId: "SPECIFIC_PROJECT_UNLOCK",
                  tenderTitle: "Complete BOQ & Compliance Affidavits Pack"
                })}
                className="w-full py-3 rounded-xl bg-[#1D4ED8] hover:bg-[#1E40AF] text-white font-mono text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <span>Pay ₹500 with Razorpay</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#38BDF8]" />
              </button>
            </div>
          </div>

          {/* Plan 3: Custom & Enterprise Plan */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-black/[0.08] shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase text-[#64748B] font-bold tracking-wider">
                For High-Volume Bidders
              </span>
              <h3 className="text-xl font-bold text-[#0F172A] mt-1">Custom Plan</h3>
              <p className="text-xs text-[#475569] mt-1.5 leading-relaxed">
                Configure your monthly bid volume and specialized procurement assistance.
              </p>

              {/* Interactive Custom Sliders */}
              <div className="my-5 p-3.5 rounded-xl bg-[#F8F7F4] border border-black/[0.06] space-y-3 font-mono">
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-[#64748B]">Bids Tracked / Month:</span>
                    <span className="font-bold text-[#0F172A]">{bidsPerMonth} Bids</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="60"
                    step="5"
                    value={bidsPerMonth}
                    onChange={(e) => setBidsPerMonth(Number(e.target.value))}
                    className="w-full h-1 bg-[#EFECE6] rounded accent-[#1D4ED8] cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] pt-1">
                  <span className="text-[#475569]">OEM Authorization Desk</span>
                  <input
                    type="checkbox"
                    checked={needsOemSupport}
                    onChange={(e) => setNeedsOemSupport(e.target.checked)}
                    className="accent-[#1D4ED8]"
                  />
                </div>

                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[#475569]">Reverse Auction Advisory</span>
                  <input
                    type="checkbox"
                    checked={needsReverseAuction}
                    onChange={(e) => setNeedsReverseAuction(e.target.checked)}
                    className="accent-[#1D4ED8]"
                  />
                </div>

                <div className="pt-2 border-t border-black/[0.06] flex items-baseline justify-between">
                  <span className="text-[10px] text-[#64748B]">Calculated Plan:</span>
                  <span className="text-base font-extrabold text-[#1D4ED8]">
                    ₹ {calculatedCustomPrice.toLocaleString('en-IN')}/mo
                  </span>
                </div>
              </div>

              <ul className="space-y-2 text-xs text-[#475569] font-sans">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#1D4ED8] shrink-0" />
                  <span>Unlimited BOQ & document downloads</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#1D4ED8] shrink-0" />
                  <span>Dedicated GeM senior bidding consultant</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#1D4ED8] shrink-0" />
                  <span>Custom API feed directly into your CRM</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-black/[0.06]">
              <button
                onClick={() => onInitiateCheckout({
                  name: `Custom Enterprise Plan (${bidsPerMonth} Bids/mo)`,
                  price: calculatedCustomPrice,
                  tenderId: "CUSTOM_ENTERPRISE_SUITE",
                  tenderTitle: `${bidsPerMonth} Bids/mo + OEM Assistance + Reverse Auction Advisory`
                })}
                className="w-full py-2.5 rounded-xl border border-black/10 bg-[#0B1320] hover:bg-[#1E293B] text-white font-mono text-xs font-semibold transition cursor-pointer"
              >
                Checkout Custom via Razorpay
              </button>
            </div>
          </div>

        </div>

        {/* Razorpay Trust Banner */}
        <div className="mt-8 p-4 rounded-xl bg-white border border-black/[0.06] flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#475569]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#1D4ED8]" />
            <span>Official Razorpay Payment Gateway Partner (UPI, RuPay, Cards, NetBanking)</span>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-[#64748B]">
            <span>100% Money-Back Guarantee if BOQ Mismatches</span>
            <span>•</span>
            <span>Instant PDF Receipt</span>
          </div>
        </div>

      </div>
    </section>
  );
}
