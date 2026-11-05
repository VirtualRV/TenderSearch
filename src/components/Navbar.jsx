import React, { useState } from 'react';
import { Search, FileText, ShieldCheck, Menu, X, ArrowUpRight, Lock, UserCheck, CreditCard } from 'lucide-react';

export default function Navbar({ 
  onOpenDocCreator, 
  onOpenAdminAuth, 
  currentAdmin,
  unlockedCount = 0
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Top Stream Bar - Deep Obsidian Midnight */}
      <div className="bg-[#0B1320] text-[#E2E8F0] text-[11px] py-2 px-4 sm:px-6 lg:px-10 border-b border-[#1E293B] font-mono tracking-tight">
        <div className="max-w-7xl xl:max-w-[1400px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-1.5 w-1.5 relative shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#38BDF8] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#38BDF8]"></span>
            </span>
            <span className="font-semibold text-white uppercase tracking-wider shrink-0">GeM Live Stream:</span>
            <span className="text-[#94A3B8] truncate">
              48,290+ Active GeM Bids | ₹14,200+ Cr Pipeline | Free Public Tool
            </span>
          </div>

          <div className="hidden md:flex items-center gap-4 text-[#94A3B8] shrink-0">
            <a href="#pricing" className="text-[#E2E8F0] hover:text-white flex items-center gap-1 transition">
              <CreditCard className="w-3 h-3 text-[#38BDF8]" />
              <span>Single Project Plan ₹500</span>
            </a>
            <span>•</span>
            <button
              onClick={onOpenAdminAuth}
              className="text-[#E2E8F0] hover:text-white flex items-center gap-1 cursor-pointer transition"
            >
              <Lock className="w-2.5 h-2.5 text-[#38BDF8]" />
              <span>{currentAdmin ? `Admin (${currentAdmin.name.split(' ')[0]})` : 'Admin Ingestion'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header className="sticky top-0 z-40 bg-[#F8F7F4]/95 backdrop-blur-md border-b border-black/[0.07]">
        <div className="max-w-7xl xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 h-18 flex items-center justify-between">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-9 h-9 rounded-xl bg-[#0B1320] flex items-center justify-center text-white shadow-xs group-hover:bg-[#1E293B] transition">
              <span className="font-mono font-bold text-sm text-[#38BDF8]">TS</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-sans font-extrabold text-xl tracking-tight text-[#0F172A]">
                TenderSearch
              </span>
              <span className="text-[10px] font-mono text-[#1D4ED8] font-semibold bg-[#EEF4FF] border border-[#BFDBFE] px-2 py-0.5 rounded-full hidden sm:inline-block">
                India
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 text-[13px] font-medium text-[#475569]">
            <a href="#tenders" className="hover:text-[#0F172A] transition">
              Live Tenders
            </a>
            <a href="#make" className="hover:text-[#0F172A] transition flex items-center gap-1.5">
              Eligibility Matcher
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full border border-black/10 text-[#475569]">#make</span>
            </a>
            <button 
              onClick={onOpenDocCreator}
              className="hover:text-[#0F172A] transition text-left cursor-pointer"
            >
              Doc's Creator
            </button>
            <a href="#pricing" className="hover:text-[#0F172A] transition flex items-center gap-1">
              <span>Plans</span>
              <span className="text-[10px] font-mono bg-[#EEF4FF] text-[#1D4ED8] border border-[#BFDBFE] px-1.5 py-0.2 rounded font-bold">
                ₹500
              </span>
            </a>
            <a href="#directory" className="hover:text-[#0F172A] transition">
              States & Ministries
            </a>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button 
              onClick={onOpenAdminAuth}
              className={`px-3 py-1.5 rounded-full text-xs font-mono font-medium transition cursor-pointer flex items-center gap-1.5 ${
                currentAdmin 
                  ? 'bg-[#EEF4FF] text-[#1D4ED8] border border-[#BFDBFE]' 
                  : 'border border-black/10 bg-white text-[#475569] hover:text-[#0F172A]'
              }`}
            >
              <Lock className="w-3 h-3 text-[#1D4ED8]" />
              <span>{currentAdmin ? currentAdmin.name.split(' ')[0] : 'Admin'}</span>
            </button>

            <a 
              href="#pricing"
              className="px-4 py-2 rounded-full text-xs font-mono font-medium bg-[#0B1320] hover:bg-[#1E293B] text-white transition shadow-xs flex items-center gap-1"
            >
              <span>Single Project Pack (₹500)</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#38BDF8]" />
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[#0F172A] hover:bg-[#EFECE6] transition"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-black/[0.08] px-6 py-5 space-y-3 font-medium text-sm text-[#0F172A]">
            <a 
              href="#tenders" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 border-b border-black/5"
            >
              Live Indian Tenders
            </a>
            <a 
              href="#pricing" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 border-b border-black/5 text-[#1D4ED8] font-bold"
            >
              Single Project Plan (₹500) & Custom Plan
            </a>
            <a 
              href="#make" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 border-b border-black/5"
            >
              Eligibility Matcher (#make)
            </a>
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDocCreator();
              }}
              className="block py-2 border-b border-black/5 text-left w-full"
            >
              Doc's Creator Suite
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdminAuth();
              }}
              className="block py-2 text-left w-full text-[#1D4ED8] font-bold font-mono"
            >
              🔒 Admin Ingestion Portal (Multi-Admin)
            </button>
          </div>
        )}
      </header>
    </>
  );
}
