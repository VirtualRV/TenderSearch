import React, { useState } from 'react';
import { MapPin, Building2 } from 'lucide-react';
import { indianStates, keyMinistries } from '../data/directory';

export default function DirectorySection({ onSelectState, onSelectMinistry }) {
  const [activeTab, setActiveTab] = useState('STATES');

  return (
    <section id="directory" className="py-20 px-4 sm:px-6 lg:px-10 border-b border-black/[0.07] bg-[#F7F5EE]">
      <div className="max-w-7xl xl:max-w-[1400px] mx-auto">
        
        {/* Bisque Split Rail Header (04) */}
        <div className="border-t border-black/[0.08] pt-3 pb-8 flex items-center justify-between text-xs font-mono text-[#535C57] tracking-wider uppercase">
          <div className="flex items-center gap-3">
            <span className="text-[#111816] font-semibold">(04)</span>
            <span>JURISDICTION DIRECTORY</span>
          </div>
          <div className="text-right text-[#535C57]">
            28 States & 50+ Central Authorities
          </div>
        </div>

        {/* Section Headline */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111816] tracking-tight">
              Browse Bids by Region
            </h2>
            <p className="text-xs sm:text-sm text-[#535C57] mt-1">
              Select any state or ministry to filter active public procurement opportunities.
            </p>
          </div>

          <div className="flex items-center gap-1 bg-[#EFECE3] p-1 rounded-xl border border-black/[0.06] self-start sm:self-auto">
            <button
              onClick={() => setActiveTab('STATES')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition cursor-pointer ${
                activeTab === 'STATES' ? 'bg-white text-[#111816] shadow-2xs' : 'text-[#535C57]'
              }`}
            >
              States & UTs (28)
            </button>
            <button
              onClick={() => setActiveTab('MINISTRIES')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition cursor-pointer ${
                activeTab === 'MINISTRIES' ? 'bg-white text-[#111816] shadow-2xs' : 'text-[#535C57]'
              }`}
            >
              Central Ministries (10)
            </button>
          </div>
        </div>

        {/* States Grid (28 States fully utilizing wide layout: 2 col on mobile, 4 col tablet, 6 col desktop) */}
        {activeTab === 'STATES' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
            {indianStates.map(state => (
              <button
                key={state.name}
                onClick={() => onSelectState(state.name)}
                className="bg-white p-3.5 rounded-xl border border-black/[0.07] hover:border-[#0F3B2E] transition text-left group flex items-center justify-between cursor-pointer"
              >
                <div className="min-w-0 pr-1">
                  <div className="text-[10px] font-mono text-[#848D88] uppercase">
                    {state.code}
                  </div>
                  <div className="font-semibold text-xs sm:text-sm text-[#111816] group-hover:text-[#0F3B2E] transition mt-0.5 truncate">
                    {state.name}
                  </div>
                </div>
                <span className="text-xs font-mono font-semibold text-[#535C57] bg-[#F7F5EE] px-2 py-0.5 rounded shrink-0">
                  {state.count}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Ministries Grid (Clean wide grid: 1 col on mobile, 2 col tablet, 3-5 col desktop) */}
        {activeTab === 'MINISTRIES' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {keyMinistries.map(min => (
              <button
                key={min.name}
                onClick={() => onSelectMinistry(min.name)}
                className="bg-white p-4 rounded-xl border border-black/[0.07] hover:border-[#0F3B2E] transition text-left group flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-[#F7F5EE] flex items-center justify-center text-[#0F3B2E] shrink-0">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono font-bold text-[#0F3B2E] uppercase block">
                      {min.acronym}
                    </span>
                    <span className="font-medium text-xs sm:text-sm text-[#111816] truncate block">
                      {min.name}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-mono font-semibold text-[#535C57] bg-[#F7F5EE] px-2 py-0.5 rounded shrink-0 ml-2">
                  {min.count}
                </span>
              </button>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
