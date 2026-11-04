import React, { useState } from 'react';
import { X, Lock, ShieldCheck, UserCheck, AlertCircle, ArrowRight } from 'lucide-react';

export const ADMIN_ACCOUNTS = [
  {
    id: "admin-1",
    name: "Vikram Malhotra",
    email: "superadmin@tendersearch.co",
    role: "Super Administrator",
    badge: "Full Access",
    pin: "admin123"
  },
  {
    id: "admin-2",
    name: "Ananya Deshmukh",
    email: "reviewer@tendersearch.co",
    role: "Senior Tender Reviewer",
    badge: "Publishing Rights",
    pin: "review123"
  },
  {
    id: "admin-3",
    name: "Karan Singhania",
    email: "operator@tendersearch.co",
    role: "GeM Ingestion Specialist",
    badge: "Scraper Operator",
    pin: "operator123"
  }
];

export default function AdminLoginModal({
  isOpen,
  onClose,
  onLoginSuccess
}) {
  const [email, setEmail] = useState('superadmin@tendersearch.co');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      setIsLoading(false);
      const foundAccount = ADMIN_ACCOUNTS.find(
        acc => acc.email.toLowerCase() === email.toLowerCase() && acc.pin === password
      );

      if (foundAccount) {
        onLoginSuccess(foundAccount);
      } else {
        setError('Invalid administrator email or password. Please try again.');
      }
    }, 600);
  };

  const handleQuickSelect = (acc) => {
    setEmail(acc.email);
    setPassword(acc.pin);
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-black/[0.08] shadow-2xl max-w-md w-full overflow-hidden my-auto text-xs font-mono">
        
        {/* Header */}
        <div className="bg-[#0A2C22] text-[#DDF1E3] p-5 border-b border-[#0F3B2E]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#0F3B2E] border border-[#1A5241] flex items-center justify-center text-white">
                <Lock className="w-4 h-4 text-[#DDF1E3]" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-white font-sans">
                  Admin Security Verification
                </h3>
                <span className="text-[10px] text-[#DDF1E3]/70 font-mono">
                  Multi-Admin Role-Based Ingestion Console
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1 rounded text-[#DDF1E3]/70 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-4">
          
          <div className="p-3 rounded-xl bg-[#F7F5EE] border border-black/[0.06] text-[11px] text-[#535C57]">
            This portal is restricted to authorized administrative personnel. Select an admin account or enter your credentials.
          </div>

          {/* Quick Admin Account Selector */}
          <div>
            <span className="text-[10px] uppercase text-[#848D88] font-bold block mb-1.5">
              Select Administrator Account
            </span>
            <div className="space-y-1.5">
              {ADMIN_ACCOUNTS.map(acc => (
                <button
                  key={acc.id}
                  type="button"
                  onClick={() => handleQuickSelect(acc)}
                  className={`w-full p-2.5 rounded-xl text-left border transition cursor-pointer flex items-center justify-between ${
                    email === acc.email
                      ? 'bg-[#0F3B2E] text-white border-[#0F3B2E]'
                      : 'bg-[#F7F5EE] text-[#111816] border-black/[0.06] hover:border-black/20'
                  }`}
                >
                  <div>
                    <div className="font-semibold text-xs">{acc.name}</div>
                    <div className="text-[10px] opacity-75">{acc.role}</div>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-mono ${
                    email === acc.email ? 'bg-[#1A5241] text-[#DDF1E3]' : 'bg-[#EFECE3] text-[#535C57]'
                  }`}>
                    {acc.badge}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="p-2.5 rounded-lg bg-[#FFE4D4] text-[#E06336] text-[11px] flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Credentials Form */}
          <form onSubmit={handleSubmit} className="space-y-3 pt-2 border-t border-black/[0.06]">
            <div>
              <label className="block text-[10px] uppercase text-[#848D88] font-bold mb-1">
                Admin Work Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-[#F7F5EE] border border-black/[0.08] focus:outline-none focus:ring-1 focus:ring-[#0F3B2E]"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase text-[#848D88] font-bold mb-1">
                Security Password / Token
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-[#F7F5EE] border border-black/[0.08] focus:outline-none focus:ring-1 focus:ring-[#0F3B2E]"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3 rounded-xl bg-[#0F3B2E] hover:bg-[#0A2C22] text-white font-mono text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              <UserCheck className="w-4 h-4 text-[#DDF1E3]" />
              <span>{isLoading ? 'Verifying Credentials...' : 'Authenticate & Enter Admin Console'}</span>
            </button>
          </form>

        </div>

      </div>
    </div>
  );
}
