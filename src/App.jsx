import React, { useState, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import EligibilitySimulator from './components/EligibilitySimulator';
import TendersFeed from './components/TendersFeed';
import PricingSection from './components/PricingSection';
import DirectorySection from './components/DirectorySection';
import WhyChooseUs from './components/WhyChooseUs';
import Footer from './components/Footer';
import TenderDetailsModal from './components/TenderDetailsModal';
import DocsCreatorModal from './components/DocsCreatorModal';
import AdminPanel from './components/AdminPanel';
import AdminLoginModal, { ADMIN_ACCOUNTS } from './components/AdminLoginModal';
import RazorpayModal from './components/RazorpayModal';
import { initialMockTenders, getSavedTenders, saveTenders } from './data/mockTenders';

export default function App() {
  // Master Tenders state
  const [tenders, setTenders] = useState(() => getSavedTenders());

  // View state: 'PUBLIC' or 'ADMIN'
  const [currentView, setCurrentView] = useState('PUBLIC');

  // Authenticated Admin state (multi-admin)
  const [currentAdmin, setCurrentAdmin] = useState(() => {
    try {
      const savedAdmin = localStorage.getItem('tendersearch_admin_user');
      return savedAdmin ? JSON.parse(savedAdmin) : null;
    } catch {
      return null;
    }
  });

  // Unlocked Tenders (₹500 Single Project Plan unlocks)
  const [unlockedTenderIds, setUnlockedTenderIds] = useState(() => {
    try {
      const savedUnlocks = localStorage.getItem('tendersearch_unlocked_bids');
      return savedUnlocks ? JSON.parse(savedUnlocks) : [];
    } catch {
      return [];
    }
  });

  // Razorpay Gateway state
  const [isRazorpayOpen, setIsRazorpayOpen] = useState(false);
  const [activeCheckoutPlan, setActiveCheckoutPlan] = useState({
    name: "Single Project Bid Pack",
    price: 500,
    tenderId: null,
    tenderTitle: ""
  });

  // Admin Auth Modal state
  const [isAdminAuthModalOpen, setIsAdminAuthModalOpen] = useState(false);

  // Search & Filter state for Public Screen
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedMinistry, setSelectedMinistry] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [msmeOnly, setMsmeOnly] = useState(false);
  const [closingSoonOnly, setClosingSoonOnly] = useState(false);

  // Modals state
  const [selectedTender, setSelectedTender] = useState(null);
  const [isDocCreatorOpen, setIsDocCreatorOpen] = useState(false);
  const [preselectedTenderForDocs, setPreselectedTenderForDocs] = useState(null);

  // Persist tenders
  useEffect(() => {
    saveTenders(tenders);
  }, [tenders]);

  // Persist admin session
  useEffect(() => {
    if (currentAdmin) {
      localStorage.setItem('tendersearch_admin_user', JSON.stringify(currentAdmin));
    } else {
      localStorage.removeItem('tendersearch_admin_user');
    }
  }, [currentAdmin]);

  // Persist unlocked bids
  useEffect(() => {
    localStorage.setItem('tendersearch_unlocked_bids', JSON.stringify(unlockedTenderIds));
  }, [unlockedTenderIds]);

  // Public visitor tenders: ONLY tenders where isLive === true!
  const publicLiveTenders = useMemo(() => {
    return tenders.filter(item => {
      if (!item.isLive) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesQuery =
          item.title.toLowerCase().includes(q) ||
          item.bidNumber.toLowerCase().includes(q) ||
          item.department.toLowerCase().includes(q) ||
          item.ministry.toLowerCase().includes(q) ||
          item.state.toLowerCase().includes(q) ||
          item.sector.toLowerCase().includes(q);
        if (!matchesQuery) return false;
      }

      if (selectedState && item.state !== selectedState) return false;
      if (selectedMinistry && item.ministry !== selectedMinistry) return false;
      if (selectedCategory !== 'All' && item.category !== selectedCategory) return false;
      if (msmeOnly && !item.msmeExempted) return false;
      if (closingSoonOnly && item.hoursRemaining > 48) return false;

      return true;
    });
  }, [tenders, searchQuery, selectedState, selectedMinistry, selectedCategory, msmeOnly, closingSoonOnly]);

  // Admin Access Control
  const handleOpenAdminClick = () => {
    if (currentAdmin) {
      setCurrentView('ADMIN');
    } else {
      setIsAdminAuthModalOpen(true);
    }
  };

  const handleAdminLoginSuccess = (adminProfile) => {
    setCurrentAdmin(adminProfile);
    setIsAdminAuthModalOpen(false);
    setCurrentView('ADMIN');
  };

  const handleAdminLogout = () => {
    setCurrentAdmin(null);
    setCurrentView('PUBLIC');
  };

  // Razorpay Checkout Trigger
  const handleInitiateRazorpay = (planData) => {
    setActiveCheckoutPlan(planData);
    setIsRazorpayOpen(true);
  };

  const handlePaymentSuccess = (receipt) => {
    if (receipt.tenderId) {
      setUnlockedTenderIds(prev => [...new Set([...prev, receipt.tenderId])]);
    }
  };

  // Admin Operations
  const handleToggleLiveStatus = (tenderId) => {
    setTenders(prev => 
      prev.map(t => {
        if (t.id === tenderId) {
          const nextLive = !t.isLive;
          return {
            ...t,
            isLive: nextLive,
            status: nextLive ? 'Live' : 'Pending Review'
          };
        }
        return t;
      })
    );
  };

  const handleAddNewTender = (updatedList) => {
    setTenders(updatedList);
  };

  const handleDeleteTender = (tenderId) => {
    if (window.confirm("Are you sure you want to delete this tender from the database?")) {
      setTenders(prev => prev.filter(t => t.id !== tenderId));
    }
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedState('');
    setSelectedMinistry('');
    setSelectedCategory('All');
    setMsmeOnly(false);
    setClosingSoonOnly(false);
  };

  const handleOpenDocCreator = (tender = null) => {
    setPreselectedTenderForDocs(tender);
    setIsDocCreatorOpen(true);
  };

  const handleStateClick = (stateName) => {
    setSelectedState(stateName);
    const element = document.getElementById('tenders');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleMinistryClick = (ministryName) => {
    setSelectedMinistry(ministryName);
    const element = document.getElementById('tenders');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // If in Admin View, show the Admin Panel
  if (currentView === 'ADMIN' && currentAdmin) {
    return (
      <>
        <AdminPanel
          tenders={tenders}
          currentAdmin={currentAdmin}
          onToggleLiveStatus={handleToggleLiveStatus}
          onAddNewTender={handleAddNewTender}
          onDeleteTender={handleDeleteTender}
          onInspectTender={(t) => setSelectedTender(t)}
          onCloseAdmin={() => setCurrentView('PUBLIC')}
          onLogoutAdmin={handleAdminLogout}
        />
        
        <TenderDetailsModal
          tender={selectedTender}
          onClose={() => setSelectedTender(null)}
          onOpenDocCreator={(tender) => handleOpenDocCreator(tender)}
          onInitiateCheckout={handleInitiateRazorpay}
          isUnlocked={selectedTender ? unlockedTenderIds.includes(selectedTender.bidNumber) : false}
        />
      </>
    );
  }

  // Public Visitor Website
  return (
    <div className="min-h-screen bg-[#F7F5EE] text-[#111816] font-sans">
      
      {/* Navigation */}
      <Navbar 
        onOpenDocCreator={() => handleOpenDocCreator(null)} 
        onOpenAdminAuth={handleOpenAdminClick}
        currentAdmin={currentAdmin}
        unlockedCount={unlockedTenderIds.length}
      />

      {/* Hero & Omnibar Search */}
      <HeroSection
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedState={selectedState}
        setSelectedState={setSelectedState}
        selectedMinistry={selectedMinistry}
        setSelectedMinistry={setSelectedMinistry}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        msmeOnly={msmeOnly}
        setMsmeOnly={setMsmeOnly}
        closingSoonOnly={closingSoonOnly}
        setClosingSoonOnly={setClosingSoonOnly}
        onResetFilters={handleResetFilters}
        totalResultsCount={publicLiveTenders.length}
      />

      {/* Section (02): Eligibility & Bid Matcher (#make Equivalent from Framer Bisque) */}
      <EligibilitySimulator />

      {/* Section (03): Live Opportunity Feed (Bidhelp Structure) */}
      <TendersFeed
        tenders={publicLiveTenders}
        onSelectTender={(tender) => setSelectedTender(tender)}
        onOpenDocCreatorForTender={(tender) => handleOpenDocCreator(tender)}
      />

      {/* Section (PRICING): Single Project ₹500 & Custom Plans with Razorpay */}
      <PricingSection onInitiateCheckout={handleInitiateRazorpay} />

      {/* Section (04): Jurisdiction Directory (28 States & Key Ministries) */}
      <DirectorySection
        onSelectState={handleStateClick}
        onSelectMinistry={handleMinistryClick}
      />

      {/* Section (05): Why TenderSearch */}
      <WhyChooseUs onOpenDocCreator={() => handleOpenDocCreator(null)} />

      {/* Footer */}
      <Footer />

      {/* Interactive Modals */}
      <TenderDetailsModal
        tender={selectedTender}
        onClose={() => setSelectedTender(null)}
        onOpenDocCreator={(tender) => handleOpenDocCreator(tender)}
        onInitiateCheckout={handleInitiateRazorpay}
        isUnlocked={selectedTender ? unlockedTenderIds.includes(selectedTender.bidNumber) : false}
      />

      <DocsCreatorModal
        isOpen={isDocCreatorOpen}
        onClose={() => setIsDocCreatorOpen(false)}
        preselectedTender={preselectedTenderForDocs}
      />

      {/* Razorpay Gateway Modal */}
      <RazorpayModal
        isOpen={isRazorpayOpen}
        onClose={() => setIsRazorpayOpen(false)}
        plan={activeCheckoutPlan}
        onPaymentComplete={handlePaymentSuccess}
      />

      {/* Admin Authentication Guard */}
      <AdminLoginModal
        isOpen={isAdminAuthModalOpen}
        onClose={() => setIsAdminAuthModalOpen(false)}
        onLoginSuccess={handleAdminLoginSuccess}
      />
    </div>
  );
}
