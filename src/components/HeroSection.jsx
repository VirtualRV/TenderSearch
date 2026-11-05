import React from 'react';
import { Search, MapPin, Building2, Filter, X, ShieldCheck } from 'lucide-react';
import { indianStates, keyMinistries } from '../data/directory';

export default function HeroSection({
  searchQuery,
  setSearchQuery,
  selectedState,
  setSelectedState,
  selectedMinistry,
  setSelectedMinistry,
  selectedCategory,
  setSelectedCategory,
  msmeOnly,
  setMsmeOnly,
  closingSoonOnly,
  setClosingSoonOnly,
  onResetFilters,
  totalResultsCount
}) {
  return (
    <section className="pt-14 pb-16 px-4 sm:px-6 lg:px-10 border-b border-black/[0.07]">
      <div className="max-w-7xl xl:max-w-[1400px] mx-auto">
        
        {/* Bisque Split Rail Header (01) */}
        <div className="border-t border-black/[0.08] pt-3 pb-8 flex items-center justify-between text-xs font-mono text-[#475569] tracking-wider uppercase">
          <div className="flex items-center gap-3">
            <span className="text-[#0F172A] font-semibold">(01)</span>
            <span>TENDER DISCOVERY ENGINE</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#1D4ED8]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-pulse"></span>
            <span>LIVE GEM & CPPP SYNC</span>
          </div>
        </div>

        {/* Hero Headline */}
        <div className="max-w-4xl mb-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F172A] tracking-tight leading-[1.1]">
            Indian Government Tenders.
            <span className="block text-[#1D4ED8] font-medium mt-1">
              Live GeM Opportunities.
            </span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-[#475569] leading-relaxed max-w-3xl">
            Search 50,000+ active central and state government biddings with zero paywalls. Download official tender documents, verify MSME exemptions, and generate bid undertakings for free.
          </p>
        </div>

        {/* Clean Wide Omnibar Search Box */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-black/[0.08] shadow-xs">
          
          {/* Main Input Row */}
          <div className="relative flex items-center">
            <Search className="absolute left-4 w-4 h-4 text-[#94A3B8]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Item (e.g. Laptops, Solar, Security), Ministry, or GeM Bid Number..."
              className="w-full pl-11 pr-24 py-3.5 rounded-xl bg-[#F8F7F4] border border-black/[0.06] text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:ring-1 focus:ring-[#1D4ED8] transition"
            />
            {searchQuery ? (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 p-1.5 text-xs text-[#475569] hover:text-[#0F172A] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            ) : (
              <span className="absolute right-3 hidden sm:inline-block text-[11px] font-mono text-[#94A3B8] bg-white px-2 py-1 rounded border border-black/5">
                Press Enter
              </span>
            )}
          </div>

          {/* Clean Secondary Dropdowns */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
            
            {/* State Filter */}
            <div className="relative">
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#F8F7F4] border border-black/[0.06] text-xs font-mono text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#1D4ED8] cursor-pointer"
              >
                <option value="">All States & UTs (28)</option>
                {indianStates.map((st) => (
                  <option key={st.name} value={st.name}>
                    {st.name} ({st.count} bids)
                  </option>
                ))}
              </select>
            </div>

            {/* Ministry Filter */}
            <div className="relative">
              <select
                value={selectedMinistry}
                onChange={(e) => setSelectedMinistry(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#F8F7F4] border border-black/[0.06] text-xs font-mono text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#1D4ED8] cursor-pointer"
              >
                <option value="">All Central Ministries</option>
                {keyMinistries.map((min) => (
                  <option key={min.name} value={min.name}>
                    {min.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Filter */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#F8F7F4] border border-black/[0.06] text-xs font-mono text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#1D4ED8] cursor-pointer"
              >
                <option value="All">All Categories (Goods, Services, Works)</option>
                <option value="Products">Products / Goods Only</option>
                <option value="Services">Services Only</option>
                <option value="Works">Civil & Electrical Works</option>
              </select>
            </div>

          </div>

          {/* Quick Filter Badges */}
          <div className="mt-3 pt-3 border-t border-black/[0.05] flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-2 font-mono">
              <button
                onClick={() => setMsmeOnly(!msmeOnly)}
                className={`px-3 py-1 rounded-full text-[11px] transition cursor-pointer flex items-center gap-1.5 ${
                  msmeOnly
                    ? 'bg-[#0B1320] text-white shadow-xs'
                    : 'bg-[#F8F7F4] text-[#475569] hover:bg-[#EFECE6] border border-black/[0.06]'
                }`}
              >
                <span>🛡️</span>
                MSME EMD Exempted
              </button>

              <button
                onClick={() => setClosingSoonOnly(!closingSoonOnly)}
                className={`px-3 py-1 rounded-full text-[11px] transition cursor-pointer flex items-center gap-1.5 ${
                  closingSoonOnly
                    ? 'bg-[#B45309] text-white shadow-xs'
                    : 'bg-[#F8F7F4] text-[#475569] hover:bg-[#EFECE6] border border-black/[0.06]'
                }`}
              >
                <span>⏰</span>
                Closing in 48 Hours
              </button>

              {(searchQuery || selectedState || selectedMinistry || selectedCategory !== 'All' || msmeOnly || closingSoonOnly) && (
                <button
                  onClick={onResetFilters}
                  className="text-[11px] text-[#1D4ED8] underline hover:text-[#0F172A] ml-2 cursor-pointer font-semibold"
                >
                  Clear filters
                </button>
              )}
            </div>

            <div className="font-mono text-[11px] text-[#475569]">
              Showing <span className="font-bold text-[#0F172A]">{totalResultsCount}</span> active tenders
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
