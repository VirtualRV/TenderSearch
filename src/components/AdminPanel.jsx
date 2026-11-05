import React, { useState } from 'react';
import { 
  ShieldCheck, 
  RefreshCw, 
  Plus, 
  Search, 
  Eye, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  ArrowLeft, 
  Building2, 
  MapPin, 
  Users, 
  LogOut,
  UserPlus
} from 'lucide-react';
import { syncFreshGeMBids } from '../utils/gemSync';
import { ADMIN_ACCOUNTS } from './AdminLoginModal';

export default function AdminPanel({
  tenders,
  currentAdmin = ADMIN_ACCOUNTS[0],
  onToggleLiveStatus,
  onAddNewTender,
  onDeleteTender,
  onInspectTender,
  onCloseAdmin,
  onLogoutAdmin
}) {
  const [activeTab, setActiveTab] = useState('TENDERS'); // 'TENDERS', 'TEAM'
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL'); // 'ALL', 'LIVE', 'PENDING'
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Multi-Admin Team state
  const [teamMembers, setTeamMembers] = useState(ADMIN_ACCOUNTS);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteName, setInviteName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('Senior Tender Reviewer');

  // New tender form state
  const [newBidNumber, setNewBidNumber] = useState(`GEM/2026/B/${Math.floor(1000000 + Math.random() * 9000000)}`);
  const [newTitle, setNewTitle] = useState('');
  const [newDept, setNewDept] = useState('');
  const [newMinistry, setNewMinistry] = useState('Ministry of Defence');
  const [newState, setNewState] = useState('Delhi');
  const [newValue, setNewValue] = useState('5000000');
  const [newCategory, setNewCategory] = useState('Products');
  const [makeLiveImmediately, setMakeLiveImmediately] = useState(true);

  // Derived statistics
  const totalBids = tenders.length;
  const liveBids = tenders.filter(t => t.isLive).length;
  const pendingBids = tenders.filter(t => !t.isLive).length;
  const totalPipelineValue = tenders
    .filter(t => t.isLive)
    .reduce((sum, t) => sum + (t.value || 0), 0);

  const formattedTotalValue = totalPipelineValue >= 10000000
    ? `₹ ${(totalPipelineValue / 10000000).toFixed(2)} Cr`
    : `₹ ${(totalPipelineValue / 100000).toFixed(2)} L`;

  // Filtered tenders list
  const filteredTenders = tenders.filter(t => {
    if (filterStatus === 'LIVE' && !t.isLive) return false;
    if (filterStatus === 'PENDING' && t.isLive) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        t.bidNumber.toLowerCase().includes(q) ||
        t.title.toLowerCase().includes(q) ||
        t.department.toLowerCase().includes(q) ||
        t.ministry.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  const handleTriggerGeMSync = () => {
    setIsSyncing(true);
    setSyncMessage('Connecting to GeM BidPlus portal (bidplus.gem.gov.in)...');

    setTimeout(() => {
      setSyncMessage('Extracting live active tenders & parsing BOQ sheets...');
    }, 900);

    setTimeout(() => {
      const updatedList = syncFreshGeMBids(tenders);
      onAddNewTender(updatedList);
      setIsSyncing(false);
      setSyncMessage(`✓ Success: Synced fresh biddings from GeM into Admin queue (Logged by ${currentAdmin.name})!`);
      setTimeout(() => setSyncMessage(null), 4000);
    }, 2000);
  };

  const handleCreateTenderSubmit = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDept.trim()) return;

    const valNum = Number(newValue) || 1000000;
    const emd = Math.round(valNum * 0.02);

    const createdTender = {
      id: `CUSTOM-${Date.now()}`,
      bidNumber: newBidNumber,
      title: newTitle,
      department: newDept,
      ministry: newMinistry,
      state: newState,
      city: newState === 'Delhi' ? 'New Delhi' : `${newState} Central`,
      category: newCategory,
      sector: newCategory === 'Products' ? 'Commercial Hardware' : 'Professional Services',
      value: valNum,
      valueDisplay: valNum >= 10000000 ? `₹ ${(valNum / 10000000).toFixed(2)} Crore` : `₹ ${(valNum / 100000).toFixed(2)} Lakhs`,
      emdAmount: emd,
      emdDisplay: `₹ ${emd.toLocaleString('en-IN')}`,
      msmeExempted: true,
      startupExempted: true,
      miiPercentage: 50,
      postedDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      hoursRemaining: 336,
      status: makeLiveImmediately ? 'Live' : 'Pending Review',
      isLive: makeLiveImmediately,
      source: `Admin (${currentAdmin.name})`,
      boqItemCount: 5,
      docSize: '2.5 MB',
      description: `Manual procurement listing for ${newTitle}. Created via TenderSearch Administrator backoffice.`,
      eligibility: {
        minTurnover: `₹ ${(valNum * 0.4 / 100000).toFixed(0)} Lakhs`,
        pastExperience: 'Minimum 2 years government experience',
        oemAuthorization: newCategory === 'Products' ? 'MAF required' : 'Not Applicable'
      }
    };

    onAddNewTender([createdTender, ...tenders]);
    setShowAddModal(false);
    setNewTitle('');
    setNewDept('');
    setNewBidNumber(`GEM/2026/B/${Math.floor(1000000 + Math.random() * 9000000)}`);
  };

  const handleAddTeamMember = (e) => {
    e.preventDefault();
    if (!inviteName || !inviteEmail) return;

    const newMember = {
      id: `admin-${Date.now()}`,
      name: inviteName,
      email: inviteEmail,
      role: inviteRole,
      badge: inviteRole === 'Super Administrator' ? 'Full Access' : 'Publishing Rights',
      pin: 'temp123'
    };

    setTeamMembers([...teamMembers, newMember]);
    setShowInviteModal(false);
    setInviteName('');
    setInviteEmail('');
  };

  return (
    <div className="min-h-screen bg-[#F8F7F4] text-[#0F172A] font-sans pb-24">
      
      {/* Admin Top Navigation */}
      <div className="bg-[#0B1320] text-[#EEF4FF] px-4 sm:px-6 py-3.5 border-b border-[#1E293B]">
        <div className="max-w-7xl xl:max-w-[1400px] mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onCloseAdmin}
              className="p-1.5 rounded-lg bg-[#1E293B] text-white hover:bg-[#334155] transition flex items-center gap-1.5 text-xs font-mono cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Public Site</span>
            </button>
            <div className="h-4 w-px bg-[#334155]"></div>
            <span className="font-mono text-xs text-[#EEF4FF] tracking-wide font-bold">
              TENDERSEARCH MULTI-ADMIN CONSOLE
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#60A5FA]"></span>
              <span className="text-white font-medium">{currentAdmin.name}</span>
              <span className="text-[10px] bg-[#1E293B] text-[#93C5FD] px-2 py-0.5 rounded font-semibold">
                {currentAdmin.role}
              </span>
            </div>

            <button
              onClick={onLogoutAdmin}
              className="text-[#94A3B8] hover:text-white flex items-center gap-1 cursor-pointer transition text-[11px]"
              title="Sign Out of Admin Console"
            >
              <LogOut className="w-3 h-3" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pt-8">
        
        {/* Navigation Tabs (Tenders Ingestion vs Admin Team) */}
        <div className="flex items-center justify-between border-b border-black/[0.08] pb-4 mb-8">
          <div className="flex items-center gap-2 font-mono text-xs">
            <button
              onClick={() => setActiveTab('TENDERS')}
              className={`px-4 py-2 rounded-xl transition cursor-pointer font-semibold ${
                activeTab === 'TENDERS'
                  ? 'bg-[#0B1320] text-white shadow-xs'
                  : 'bg-white text-[#475569] hover:text-[#0F172A]'
              }`}
            >
              GeM Ingestion & Tenders ({tenders.length})
            </button>

            <button
              onClick={() => setActiveTab('TEAM')}
              className={`px-4 py-2 rounded-xl transition cursor-pointer font-semibold flex items-center gap-1.5 ${
                activeTab === 'TEAM'
                  ? 'bg-[#0B1320] text-white shadow-xs'
                  : 'bg-white text-[#475569] hover:text-[#0F172A]'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Admin Team & Roles ({teamMembers.length})</span>
            </button>
          </div>

          <div className="text-right text-xs font-mono text-[#64748B]">
            Role-Based Multi-Admin System
          </div>
        </div>

        {activeTab === 'TEAM' ? (
          /* Multi-Admin Team Management Screen */
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[#0F172A]">Administrator Team & Permissions</h2>
                <p className="text-xs text-[#475569] mt-0.5">
                  Manage multiple team members who have authority to scrape, review, and make biddings live.
                </p>
              </div>

              <button
                onClick={() => setShowInviteModal(true)}
                className="px-4 py-2.5 rounded-xl bg-[#0B1320] text-white hover:bg-[#1D4ED8] text-xs font-mono font-medium transition flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Invite New Admin</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {teamMembers.map((member) => (
                <div key={member.id} className="bg-white rounded-2xl p-5 border border-black/[0.08] shadow-xs space-y-3 font-mono">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-sans font-bold text-sm text-[#0F172A]">{member.name}</h4>
                      <div className="text-[11px] text-[#475569]">{member.email}</div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[#EEF4FF] text-[#1D4ED8] font-semibold">
                      {member.badge}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-black/[0.06] text-[11px] text-[#475569]">
                    <strong>Role:</strong> {member.role}
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-[#64748B] pt-1">
                    <span>Status: Active</span>
                    <span className="text-[#1D4ED8]">● 2FA Enabled</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Tenders Ingestion Screen */
          <>
            {/* Header Actions */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-extrabold text-[#0F172A] tracking-tight">
                  Live Tender Ingestion Queue
                </h1>
                <p className="text-sm text-[#475569] mt-1">
                  Manage incoming GeM scraped biddings. Toggling a bid live immediately publishes it on the public user screen.
                </p>
              </div>

              <div className="flex items-center gap-2.5 self-start sm:self-auto">
                <button
                  onClick={() => setShowAddModal(true)}
                  className="px-3.5 py-2.5 rounded-xl border border-black/10 bg-white text-[#0F172A] hover:bg-[#E2E8F0] text-xs font-mono font-medium transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <Plus className="w-4 h-4 text-[#1D4ED8]" />
                  <span>Add Tender</span>
                </button>

                <button
                  onClick={handleTriggerGeMSync}
                  disabled={isSyncing}
                  className="px-4 py-2.5 rounded-xl bg-[#0B1320] hover:bg-[#1D4ED8] text-white text-xs font-mono font-medium transition flex items-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                  <span>{isSyncing ? 'Scraping GeM...' : 'Sync from GeM Portal'}</span>
                </button>
              </div>
            </div>

            {/* Sync Notification */}
            {syncMessage && (
              <div className="mb-6 p-4 rounded-xl bg-[#EEF4FF] border border-[#BFDBFE] text-[#1E3A8A] text-xs font-mono flex items-center gap-2 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-[#1D4ED8] shrink-0" />
                <span>{syncMessage}</span>
              </div>
            )}

            {/* Statistics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              <div className="bg-white p-5 rounded-2xl border border-black/[0.08] shadow-xs">
                <span className="text-[10px] font-mono uppercase text-[#64748B] block">Total In Database</span>
                <span className="text-3xl font-extrabold font-mono text-[#0F172A] mt-1 block">{totalBids}</span>
                <span className="text-[11px] text-[#475569] font-mono mt-0.5 block">Scraped + Manual</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-black/[0.08] shadow-xs">
                <span className="text-[10px] font-mono uppercase text-[#1D4ED8] font-bold block">Live on Public Site</span>
                <span className="text-3xl font-extrabold font-mono text-[#1D4ED8] mt-1 block">{liveBids}</span>
                <span className="text-[11px] text-[#2563EB] font-mono mt-0.5 block">Visible to Visitors</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-black/[0.08] shadow-xs">
                <span className="text-[10px] font-mono uppercase text-[#E06336] font-bold block">Pending Ingestion</span>
                <span className="text-3xl font-extrabold font-mono text-[#E06336] mt-1 block">{pendingBids}</span>
                <span className="text-[11px] text-[#475569] font-mono mt-0.5 block">Awaiting Approval</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-black/[0.08] shadow-xs">
                <span className="text-[10px] font-mono uppercase text-[#64748B] block">Live Pipeline Value</span>
                <span className="text-2xl font-extrabold font-mono text-[#0F172A] mt-1 block">{formattedTotalValue}</span>
                <span className="text-[11px] text-[#475569] font-mono mt-0.5 block">Published tenders</span>
              </div>
            </div>

            {/* Filter Bar */}
            <div className="bg-white rounded-2xl p-4 border border-black/[0.08] shadow-xs mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-96">
                <Search className="absolute left-3.5 w-4 h-4 text-[#848D88]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by Bid No, Title, or Ministry..."
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-[#F8F7F4] border border-black/[0.06] text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#1D4ED8]"
                />
              </div>

              <div className="flex items-center gap-1 bg-[#E2E8F0] p-1 rounded-xl border border-black/[0.06] w-full sm:w-auto">
                {[
                  { id: 'ALL', label: `All (${totalBids})` },
                  { id: 'LIVE', label: `Live (${liveBids})` },
                  { id: 'PENDING', label: `Pending Review (${pendingBids})` }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setFilterStatus(tab.id)}
                    className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition cursor-pointer ${
                      filterStatus === tab.id ? 'bg-white text-[#0F172A] shadow-2xs' : 'text-[#475569]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl border border-black/[0.08] shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-[#F8F7F4] border-b border-black/[0.06] text-[#64748B] uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3.5 px-4 font-semibold">Bid Reference & Source</th>
                      <th className="py-3.5 px-4 font-semibold">Tender Title & Authority</th>
                      <th className="py-3.5 px-4 font-semibold">Est. Value</th>
                      <th className="py-3.5 px-4 font-semibold text-center">Live on Website</th>
                      <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/[0.05]">
                    {filteredTenders.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="py-8 text-center text-[#475569]">
                          No bids match the filter criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredTenders.map(t => (
                        <tr key={t.id} className="hover:bg-[#F8F7F4]/60 transition">
                          
                          <td className="py-4 px-4 whitespace-nowrap">
                            <div className="font-bold text-[#0F172A]">{t.bidNumber}</div>
                            <div className="flex items-center gap-1.5 mt-1">
                              <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#E2E8F0] text-[#475569]">
                                {t.source || 'GeM Ingestion'}
                              </span>
                              <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#F8F7F4] text-[#64748B]">
                                {t.category}
                              </span>
                            </div>
                          </td>

                          <td className="py-4 px-4 max-w-md">
                            <div className="font-sans font-semibold text-[#0F172A] line-clamp-1">
                              {t.title}
                            </div>
                            <div className="text-[11px] text-[#475569] mt-0.5 truncate">
                              {t.department} • <span className="text-[#0F172A]">{t.ministry}</span>
                            </div>
                            <div className="text-[10px] text-[#64748B] mt-0.5">
                              {t.city}, {t.state}
                            </div>
                          </td>

                          <td className="py-4 px-4 whitespace-nowrap">
                            <div className="font-extrabold text-[#0F172A]">{t.valueDisplay}</div>
                            <div className="text-[10px] text-[#475569]">EMD: {t.emdDisplay}</div>
                          </td>

                          {/* Live Toggle */}
                          <td className="py-4 px-4 text-center whitespace-nowrap">
                            <div className="inline-flex flex-col items-center gap-1">
                              <button
                                onClick={() => onToggleLiveStatus(t.id)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition cursor-pointer ${
                                  t.isLive ? 'bg-[#1D4ED8]' : 'bg-[#CBD5E1]'
                                }`}
                                title="Click to toggle live visibility on public visitor screen"
                              >
                                <span
                                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition shadow-sm ${
                                    t.isLive ? 'translate-x-6' : 'translate-x-1'
                                  }`}
                                />
                              </button>
                              
                              <span className={`text-[10px] font-bold ${
                                t.isLive ? 'text-[#1D4ED8]' : 'text-[#64748B]'
                              }`}>
                                {t.isLive ? '● LIVE ON SITE' : 'DRAFT (HIDDEN)'}
                              </span>
                            </div>
                          </td>

                          <td className="py-4 px-4 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => onInspectTender(t)}
                                className="p-1.5 rounded-lg border border-black/10 hover:bg-[#E2E8F0] text-[#475569] hover:text-[#0F172A] transition cursor-pointer"
                                title="View Specs"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                              
                              <button
                                onClick={() => onDeleteTender(t.id)}
                                className="p-1.5 rounded-lg border border-black/10 hover:bg-[#FFE4D4] text-[#E06336] transition cursor-pointer"
                                title="Delete Tender"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>

                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

      </div>

      {/* Manual Add Tender Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-black/[0.08] shadow-xl max-w-xl w-full p-6 my-auto">
            <div className="flex items-center justify-between pb-4 border-b border-black/[0.07] mb-4">
              <h3 className="font-bold text-base text-[#111816]">
                Add Government Tender
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-[#848D88] hover:text-black font-mono text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateTenderSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-mono uppercase text-[#848D88] mb-1 font-semibold text-[10px]">
                  GeM Bid Number
                </label>
                <input
                  type="text"
                  value={newBidNumber}
                  onChange={(e) => setNewBidNumber(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#F7F5EE] border border-black/[0.08] font-mono"
                  required
                />
              </div>

              <div>
                <label className="block font-mono uppercase text-[#848D88] mb-1 font-semibold text-[10px]">
                  Tender Title / Scope
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Supply of High Speed Networking Equipment"
                  className="w-full px-3 py-2 rounded-lg bg-[#F7F5EE] border border-black/[0.08]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono uppercase text-[#848D88] mb-1 font-semibold text-[10px]">
                    Department
                  </label>
                  <input
                    type="text"
                    value={newDept}
                    onChange={(e) => setNewDept(e.target.value)}
                    placeholder="e.g. Military Engineer Services"
                    className="w-full px-3 py-2 rounded-lg bg-[#F7F5EE] border border-black/[0.08]"
                    required
                  />
                </div>

                <div>
                  <label className="block font-mono uppercase text-[#848D88] mb-1 font-semibold text-[10px]">
                    Ministry
                  </label>
                  <select
                    value={newMinistry}
                    onChange={(e) => setNewMinistry(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#F7F5EE] border border-black/[0.08]"
                  >
                    <option value="Ministry of Defence">Ministry of Defence</option>
                    <option value="Ministry of Railways">Ministry of Railways</option>
                    <option value="Ministry of Health and Family Welfare">Ministry of Health</option>
                    <option value="Ministry of Power & Renewable Energy">Ministry of Power</option>
                    <option value="Ministry of Road Transport and Highways">Ministry of Road Transport</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-mono uppercase text-[#848D88] mb-1 font-semibold text-[10px]">
                    State
                  </label>
                  <select
                    value={newState}
                    onChange={(e) => setNewState(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#F7F5EE] border border-black/[0.08]"
                  >
                    <option value="Delhi">Delhi</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Gujarat">Gujarat</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono uppercase text-[#848D88] mb-1 font-semibold text-[10px]">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#F7F5EE] border border-black/[0.08]"
                  >
                    <option value="Products">Products</option>
                    <option value="Services">Services</option>
                    <option value="Works">Works</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono uppercase text-[#848D88] mb-1 font-semibold text-[10px]">
                    Value (₹)
                  </label>
                  <input
                    type="number"
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#F7F5EE] border border-black/[0.08] font-mono"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-black/[0.06]">
                <span className="font-mono text-xs">Publish Live immediately</span>
                <input
                  type="checkbox"
                  checked={makeLiveImmediately}
                  onChange={(e) => setMakeLiveImmediately(e.target.checked)}
                  className="w-4 h-4 accent-[#1D4ED8]"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 font-mono">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl border border-black/10 bg-[#F8F7F4] text-[#475569] hover:bg-[#E2E8F0] transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#0B1320] text-white hover:bg-[#1D4ED8] transition cursor-pointer shadow-xs"
                >
                  Save Tender
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Invite Admin Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-black/[0.08] shadow-xl max-w-md w-full p-6 my-auto font-mono text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-black/[0.07] mb-3">
              <h3 className="font-bold text-sm text-[#0F172A]">
                Invite Administrator
              </h3>
              <button onClick={() => setShowInviteModal(false)} className="text-[#64748B] hover:text-black">✕</button>
            </div>

            <form onSubmit={handleAddTeamMember} className="space-y-3">
              <div>
                <label className="block text-[10px] uppercase text-[#64748B] mb-1 font-bold">Full Name</label>
                <input
                  type="text"
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  placeholder="e.g. Priya Nair"
                  className="w-full px-3 py-2 rounded-lg bg-[#F8F7F4] border border-black/[0.08]"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase text-[#64748B] mb-1 font-bold">Admin Email</label>
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="e.g. priya@tendersearch.co"
                  className="w-full px-3 py-2 rounded-lg bg-[#F8F7F4] border border-black/[0.08]"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase text-[#64748B] mb-1 font-bold">Admin Role</label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#F8F7F4] border border-black/[0.08]"
                >
                  <option value="Senior Tender Reviewer">Senior Tender Reviewer (Publishing Rights)</option>
                  <option value="GeM Ingestion Specialist">GeM Ingestion Specialist (Scraper Operator)</option>
                  <option value="Super Administrator">Super Administrator (Full Access)</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowInviteModal(false)}
                  className="px-3 py-1.5 rounded-lg border border-black/10 hover:bg-[#E2E8F0] transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-[#0B1320] hover:bg-[#1D4ED8] text-white transition cursor-pointer shadow-xs"
                >
                  Add Admin Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
