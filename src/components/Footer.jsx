import React from 'react';
import { ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-black/[0.08] pt-16 pb-12 px-4 sm:px-6 lg:px-10 text-xs font-mono">
      <div className="max-w-7xl xl:max-w-[1400px] mx-auto space-y-10">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          
          <div className="sm:col-span-2 space-y-3 font-sans">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#0B1320] flex items-center justify-center text-[#38BDF8] font-mono font-bold text-xs">
                TS
              </div>
              <span className="font-extrabold text-base text-[#0F172A]">
                TenderSearch
              </span>
            </div>
            <p className="text-xs text-[#475569] leading-relaxed max-w-md">
              India's free open procurement portal for contractors, MSMEs, and suppliers to search, qualify, and win central and state government biddings.
            </p>
            <div className="text-[11px] font-mono text-[#64748B]">
              New Delhi, India • GST Registered Enterprise
            </div>
          </div>

          <div>
            <h4 className="font-bold text-[#0F172A] uppercase tracking-wider mb-2.5">Portals</h4>
            <ul className="space-y-1.5 text-[#475569]">
              <li><a href="#tenders" className="hover:text-[#1D4ED8] transition">Live GeM Bids</a></li>
              <li><a href="#tenders" className="hover:text-[#1D4ED8] transition">Central Ministries</a></li>
              <li><a href="#directory" className="hover:text-[#1D4ED8] transition">State Tenders</a></li>
              <li><a href="#make" className="hover:text-[#1D4ED8] transition">Eligibility Matcher (#make)</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[#0F172A] uppercase tracking-wider mb-2.5">Plans & Pricing</h4>
            <ul className="space-y-1.5 text-[#475569]">
              <li><a href="#pricing" className="hover:text-[#1D4ED8] transition">Free Public Search</a></li>
              <li><a href="#pricing" className="hover:text-[#1D4ED8] transition">Single Project Pack (₹500)</a></li>
              <li><a href="#pricing" className="hover:text-[#1D4ED8] transition">Custom Enterprise Suite</a></li>
              <li><a href="#pricing" className="hover:text-[#1D4ED8] transition">Razorpay Instant Invoicing</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[#0F172A] uppercase tracking-wider mb-2.5">Official Portals</h4>
            <ul className="space-y-1.5 text-[#475569]">
              <li>
                <a href="https://gem.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-[#1D4ED8] transition flex items-center gap-1">
                  GeM Portal <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </li>
              <li>
                <a href="https://eprocure.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-[#1D4ED8] transition flex items-center gap-1">
                  CPPP Central <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </li>
              <li>
                <a href="https://udyamregistration.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-[#1D4ED8] transition flex items-center gap-1">
                  Udyam MSME <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Statutory Disclaimer */}
        <div className="p-4 rounded-xl bg-[#F8F7F4] border border-black/[0.05] text-[11px] leading-relaxed text-[#64748B]">
          <strong>Disclaimer:</strong> TenderSearch (tendersearch.co) is an independent public tender discovery platform. It is privately owned and does not represent, endorse, or act on behalf of the Government of India, the Government e-Marketplace (GeM SPV), or any statutory procurement agency.
        </div>

        {/* Bottom */}
        <div className="pt-5 border-t border-black/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-[#64748B] text-[11px]">
          <div>
            © {new Date().getFullYear()} TenderSearch. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-[#0F172A] transition">Privacy</a>
            <span>•</span>
            <a href="#" className="hover:text-[#0F172A] transition">Terms</a>
            <span>•</span>
            <a href="#" className="hover:text-[#0F172A] transition">Security</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
