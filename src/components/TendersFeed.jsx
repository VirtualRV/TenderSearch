import React, { useState } from 'react';
import { Clock, MapPin, Building2, Bookmark, ArrowUpRight, FileText, LayoutList, LayoutGrid } from 'lucide-react';

export default function TendersFeed({
  tenders,
  onSelectTender,
  onOpenDocCreatorForTender
}) {
  const [activeTab, setActiveTab] = useState('ALL');
  const [viewMode, setViewMode] = useState('LIST');
  const [bookmarkedIds, setBookmarkedIds] = useState([]);

  const toggleBookmark = (id, e) => {
    e.stopPropagation();
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds(bookmarkedIds.filter(i => i !== id));
    } else {
      setBookmarkedIds([...bookmarkedIds, id]);
    }
  };

  const filteredTenders = tenders.filter(t => {
    if (activeTab === 'CENTRAL') return t.ministry && t.ministry.startsWith('Ministry');
    if (activeTab === 'STATES') return t.state !== 'Delhi';
    if (activeTab === 'HIGH_VALUE') return t.value >= 10000000;
    if (activeTab === 'CLOSING') return t.hoursRemaining <= 48;
    return true;
  });

  return (
    <section id="tenders" className="py-20 px-4 sm:px-6 lg:px-10 border-b border-black/[0.07]">
      <div className="max-w-7xl xl:max-w-[1400px] mx-auto">
        
        {/* Bisque Split Rail Header (03) */}
        <div className="border-t border-black/[0.08] pt-3 pb-8 flex items-center justify-between text-xs font-mono text-[#535C57] tracking-wider uppercase">
          <div className="flex items-center gap-3">
            <span className="text-[#111816] font-semibold">(03)</span>
            <span>LIVE OPPORTUNITY RADAR</span>
          </div>
          <div className="text-right text-[#535C57]">
            {filteredTenders.length} active opportunities found
          </div>
        </div>

        {/* Section Headline & Tab Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111816] tracking-tight">
              Live Central & State Tenders
            </h2>
            <p className="text-xs sm:text-sm text-[#535C57] mt-1">
              Real-time bids aggregated directly from GeM and state procurement authorities.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            {/* View Switcher */}
            <div className="hidden sm:flex items-center bg-[#EFECE3] p-1 rounded-xl border border-black/[0.06]">
              <button
                onClick={() => setViewMode('LIST')}
                className={`p-1.5 rounded-lg transition cursor-pointer ${
                  viewMode === 'LIST' ? 'bg-white text-[#111816] shadow-xs' : 'text-[#535C57]'
                }`}
                title="List View (Bidhelp clean style)"
              >
                <LayoutList className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode('GRID')}
                className={`p-1.5 rounded-lg transition cursor-pointer ${
                  viewMode === 'GRID' ? 'bg-white text-[#111816] shadow-xs' : 'text-[#535C57]'
                }`}
                title="Grid View (3-column)"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1 bg-[#EFECE3] p-1 rounded-xl border border-black/[0.06]">
              {[
                { id: 'ALL', label: 'All Bids' },
                { id: 'CENTRAL', label: 'Central Ministries' },
                { id: 'STATES', label: 'States' },
                { id: 'CLOSING', label: 'Ending Soon' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-white text-[#111816] shadow-2xs'
                      : 'text-[#535C57] hover:text-[#111816]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tenders Listing */}
        {filteredTenders.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-black/[0.08]">
            <p className="text-sm text-[#535C57]">No tenders match the chosen filters. Try clearing your search filters above.</p>
          </div>
        ) : viewMode === 'LIST' ? (
          /* Ultra-Clean Structured List View (Spacious & Responsive) */
          <div className="space-y-3">
            {filteredTenders.map(tender => {
              const isBookmarked = bookmarkedIds.includes(tender.id);

              return (
                <div
                  key={tender.id}
                  onClick={() => onSelectTender(tender)}
                  className="bg-white rounded-2xl p-4 sm:p-5 border border-black/[0.08] hover:border-[#0F3B2E] transition-all hover:shadow-xs cursor-pointer group flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                >
                  {/* Left Column: Metadata & Title */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5 text-xs font-mono">
                      <span className="font-semibold text-[#111816]">
                        {tender.bidNumber}
                      </span>
                      <span className="text-[#848D88]">•</span>
                      <span className="text-[#535C57]">
                        {tender.department}
                      </span>
                      <span className="text-[#848D88]">•</span>
                      <span className="text-[#535C57] flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#0F3B2E]" />
                        {tender.city}, {tender.state}
                      </span>
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-[#111816] group-hover:text-[#0F3B2E] transition leading-snug line-clamp-2">
                      {tender.title}
                    </h3>

                    <div className="flex items-center gap-2 mt-2 text-[11px] font-mono text-[#535C57]">
                      <span className="bg-[#F7F5EE] px-2 py-0.5 rounded border border-black/5">
                        {tender.category}
                      </span>
                      {tender.msmeExempted && (
                        <span className="bg-[#DDF1E3] text-[#0F3B2E] px-2 py-0.5 rounded font-medium">
                          MSME EMD Exempted
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Value, Timeline & Actions */}
                  <div className="flex items-center justify-between lg:justify-end gap-6 shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-black/5">
                    
                    <div className="text-left lg:text-right font-mono">
                      <div className="text-base sm:text-lg font-extrabold text-[#111816]">
                        {tender.valueDisplay}
                      </div>
                      <div className={`text-[11px] flex items-center lg:justify-end gap-1 ${
                        tender.hoursRemaining <= 48 ? 'text-[#E06336] font-semibold' : 'text-[#535C57]'
                      }`}>
                        <Clock className="w-3 h-3" />
                        <span>{tender.hoursRemaining <= 48 ? `${tender.hoursRemaining}h remaining` : `${Math.round(tender.hoursRemaining / 24)} days left`}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenDocCreatorForTender(tender);
                        }}
                        className="p-2 rounded-xl border border-black/10 bg-[#F7F5EE] text-[#535C57] hover:text-[#111816] hover:bg-[#EFECE3] transition cursor-pointer"
                        title="Make Bid Documents"
                      >
                        <FileText className="w-4 h-4 text-[#0F3B2E]" />
                      </button>

                      <button
                        onClick={(e) => toggleBookmark(tender.id, e)}
                        className="p-2 rounded-xl border border-black/10 bg-[#F7F5EE] text-[#535C57] hover:text-[#111816] hover:bg-[#EFECE3] transition cursor-pointer"
                        title="Save Bid"
                      >
                        <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-[#0F3B2E] text-[#0F3B2E]' : ''}`} />
                      </button>

                      <button
                        onClick={() => onSelectTender(tender)}
                        className="px-3.5 py-2 rounded-xl bg-[#0F3B2E] text-white hover:bg-[#0A2C22] text-xs font-mono font-medium transition flex items-center gap-1 cursor-pointer"
                      >
                        <span>BOQ</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        ) : (
          /* Clean 3-Column Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredTenders.map(tender => (
              <div
                key={tender.id}
                onClick={() => onSelectTender(tender)}
                className="bg-white rounded-2xl p-5 border border-black/[0.08] hover:border-[#0F3B2E] transition-all hover:shadow-xs cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-[#535C57] pb-3 border-b border-black/5 mb-3">
                    <span className="font-semibold text-[#111816]">{tender.bidNumber}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded ${
                      tender.hoursRemaining <= 48 ? 'bg-[#FFE4D4] text-[#E06336]' : 'bg-[#DDF1E3] text-[#0F3B2E]'
                    }`}>
                      {tender.hoursRemaining}h left
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-[#111816] group-hover:text-[#0F3B2E] transition leading-snug line-clamp-2">
                    {tender.title}
                  </h3>

                  <div className="mt-2 text-xs text-[#535C57] font-mono">
                    {tender.department} • {tender.city}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-black/5 flex items-center justify-between font-mono">
                  <div>
                    <span className="text-[10px] text-[#848D88] block">Value</span>
                    <span className="text-sm font-extrabold text-[#111816]">{tender.valueDisplay}</span>
                  </div>

                  <button
                    onClick={() => onSelectTender(tender)}
                    className="px-3 py-1.5 rounded-lg bg-[#0F3B2E] text-white text-xs font-medium"
                  >
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
