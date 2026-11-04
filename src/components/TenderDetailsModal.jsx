import React from 'react';
import { X, Building2, MapPin, Calendar, Clock, Download, FileText, CheckCircle2, ShieldCheck, ExternalLink, Lock, CreditCard } from 'lucide-react';

export default function TenderDetailsModal({ 
  tender, 
  onClose, 
  onOpenDocCreator,
  onInitiateCheckout,
  isUnlocked = false
}) {
  if (!tender) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl border border-black/[0.08] shadow-xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden my-auto">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-black/[0.07] flex items-start justify-between bg-[#F7F5EE]">
          <div>
            <div className="flex items-center gap-2 mb-1.5 text-xs font-mono">
              <span className="font-semibold bg-[#0F3B2E] text-white px-2 py-0.5 rounded">
                {tender.bidNumber}
              </span>
              <span className="px-2 py-0.5 rounded bg-[#DDF1E3] text-[#0F3B2E]">
                {tender.status}
              </span>
              <span className="px-2 py-0.5 rounded bg-[#EFECE3] text-[#535C57]">
                {tender.category}
              </span>
              {isUnlocked && (
                <span className="px-2 py-0.5 rounded bg-[#0F3B2E] text-[#DDF1E3] font-bold">
                  ✓ Unlocked (₹500 Pack)
                </span>
              )}
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-[#111816] leading-snug">
              {tender.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-[#EFECE3] text-[#535C57] transition shrink-0 ml-4"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          
          {/* Razorpay Single Project Unlock Callout (If not yet unlocked) */}
          {!isUnlocked ? (
            <div className="p-4 rounded-xl bg-[#0F3B2E] text-white flex flex-col sm:flex-row items-center justify-between gap-3 font-mono">
              <div>
                <span className="text-[10px] text-[#DDF1E3] uppercase tracking-wider block">
                  Per-Project Plan • ₹500 Only
                </span>
                <span className="font-bold text-sm block">
                  Unlock Itemized BOQ + 5 Auto-Generated Affidavits
                </span>
                <span className="text-[11px] text-[#DDF1E3]/80">
                  Instant activation via Razorpay (UPI, QR, Cards)
                </span>
              </div>

              <button
                onClick={() => onInitiateCheckout({
                  name: `Single Project Pack (${tender.bidNumber})`,
                  price: 500,
                  tenderId: tender.bidNumber,
                  tenderTitle: tender.title
                })}
                className="px-4 py-2 rounded-xl bg-white text-[#0F3B2E] hover:bg-[#DDF1E3] font-bold text-xs transition flex items-center gap-1.5 cursor-pointer shrink-0 shadow-sm"
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>Pay ₹500 via Razorpay</span>
              </button>
            </div>
          ) : (
            <div className="p-3 rounded-xl bg-[#DDF1E3] border border-[#B8E3C6] text-[#0A2C22] text-xs font-mono flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-bold">
                <CheckCircle2 className="w-4 h-4 text-[#2F9E6A]" />
                Full Project Pack Active (Razorpay Verified Receipt Attached)
              </span>
              <span className="text-[10px] bg-white px-2 py-0.5 rounded border border-black/10">
                All Downloads Unlocked
              </span>
            </div>
          )}

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="p-3.5 rounded-xl bg-[#F7F5EE] border border-black/[0.05]">
              <span className="text-[10px] font-mono uppercase text-[#848D88] block">Estimated Value</span>
              <span className="text-base font-bold font-mono text-[#111816] block mt-0.5">{tender.valueDisplay}</span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#F7F5EE] border border-black/[0.05]">
              <span className="text-[10px] font-mono uppercase text-[#848D88] block">EMD Required</span>
              <span className="text-base font-bold font-mono text-[#111816] block mt-0.5">{tender.emdDisplay}</span>
              {tender.msmeExempted && (
                <span className="text-[10px] text-[#0F3B2E] font-mono block">MSME: ₹ 0 (Exempt)</span>
              )}
            </div>

            <div className="p-3.5 rounded-xl bg-[#F7F5EE] border border-black/[0.05]">
              <span className="text-[10px] font-mono uppercase text-[#848D88] block">Closing Deadline</span>
              <span className="text-xs font-bold font-mono text-[#111816] block mt-0.5">
                {new Date(tender.endDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
              </span>
              <span className="text-[10px] text-[#535C57] font-mono block">{tender.hoursRemaining}h left</span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#F7F5EE] border border-black/[0.05]">
              <span className="text-[10px] font-mono uppercase text-[#848D88] block">MII Local Content</span>
              <span className="text-base font-bold font-mono text-[#111816] block mt-0.5">{tender.miiPercentage}% Min</span>
            </div>
          </div>

          {/* Department Meta */}
          <div className="p-3.5 rounded-xl bg-[#F7F5EE] border border-black/[0.05] flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#535C57]">
            <div className="flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-[#0F3B2E]" />
              <span><strong>Department:</strong> {tender.department}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0F3B2E]" />
              <span><strong>Ministry:</strong> {tender.ministry}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#0F3B2E]" />
              <span><strong>Location:</strong> {tender.city}, {tender.state}</span>
            </div>
          </div>

          {/* Scope */}
          <div>
            <h4 className="text-[11px] font-mono uppercase text-[#848D88] font-semibold mb-1.5">
              Tender Scope & Description
            </h4>
            <p className="text-xs text-[#535C57] leading-relaxed bg-[#F7F5EE] p-3.5 rounded-xl border border-black/[0.05]">
              {tender.description}
            </p>
          </div>

          {/* Eligibility */}
          <div>
            <h4 className="text-[11px] font-mono uppercase text-[#848D88] font-semibold mb-1.5">
              Eligibility & OEM Conditions
            </h4>
            <div className="space-y-1.5 text-xs text-[#111816]">
              <div className="flex items-start gap-2 bg-[#F7F5EE] p-2.5 rounded-lg border border-black/[0.04]">
                <CheckCircle2 className="w-4 h-4 text-[#0F3B2E] shrink-0 mt-0.5" />
                <span><strong>Turnover:</strong> {tender.eligibility.minTurnover}</span>
              </div>
              <div className="flex items-start gap-2 bg-[#F7F5EE] p-2.5 rounded-lg border border-black/[0.04]">
                <CheckCircle2 className="w-4 h-4 text-[#0F3B2E] shrink-0 mt-0.5" />
                <span><strong>Past Experience:</strong> {tender.eligibility.pastExperience}</span>
              </div>
              <div className="flex items-start gap-2 bg-[#F7F5EE] p-2.5 rounded-lg border border-black/[0.04]">
                <CheckCircle2 className="w-4 h-4 text-[#0F3B2E] shrink-0 mt-0.5" />
                <span><strong>OEM Authorization:</strong> {tender.eligibility.oemAuthorization}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-black/[0.07] bg-[#F7F5EE] flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
          <div className="text-[#535C57]">
            BOQ Items: <span className="font-semibold text-[#111816]">{tender.boqItemCount} lines</span> ({tender.docSize})
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onOpenDocCreator(tender);
              }}
              className="px-3 py-2 rounded-xl border border-black/10 bg-white text-[#111816] hover:bg-[#EFECE3] transition flex items-center gap-1.5 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-[#0F3B2E]" />
              Make Affidavits
            </button>

            <a
              href="https://gem.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-[#0F3B2E] hover:bg-[#0A2C22] text-white transition flex items-center gap-1.5"
            >
              <span>View on GeM</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
