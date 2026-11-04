import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, QrCode, CreditCard, Smartphone, ArrowRight, Lock } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function RazorpayModal({
  isOpen,
  onClose,
  plan = {
    name: "Single Project Bid Pack",
    price: 500,
    tenderId: "GEM/2026/B/9182301",
    tenderTitle: "High-Performance Server Equipment"
  },
  onPaymentComplete
}) {
  const [selectedMethod, setSelectedMethod] = useState('UPI'); // 'UPI', 'CARD', 'NETBANKING'
  const [upiId, setUpiId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [receiptData, setReceiptData] = useState(null);

  if (!isOpen) return null;

  const handlePayNow = () => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      const generatedReceipt = {
        paymentId: `pay_${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
        orderId: `order_${Math.floor(100000 + Math.random() * 900000)}`,
        amount: plan.price,
        planName: plan.name,
        tenderId: plan.tenderId,
        date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
      };
      setReceiptData(generatedReceipt);

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });

      if (onPaymentComplete) {
        onPaymentComplete(generatedReceipt);
      }
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl border border-black/[0.08] shadow-2xl max-w-md w-full overflow-hidden my-auto text-xs">
        
        {/* Razorpay Authentic Blue/Forest Header */}
        <div className="bg-[#0A2C22] text-[#DDF1E3] p-5 border-b border-[#0F3B2E]">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#0F3B2E] border border-[#1A5241] flex items-center justify-center font-mono font-bold text-xs text-[#DDF1E3]">
                TS
              </div>
              <span className="font-bold text-sm text-white font-sans">
                TenderSearch Payments
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1 rounded-md text-[#DDF1E3]/70 hover:text-white transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-baseline justify-between pt-1 font-mono">
            <div>
              <span className="text-[10px] text-[#DDF1E3]/70 block uppercase">Amount Payable</span>
              <span className="text-2xl font-bold text-white">₹ {plan.price}.00</span>
            </div>
            <span className="text-[10px] bg-[#1A5241] text-[#DDF1E3] px-2 py-0.5 rounded font-semibold flex items-center gap-1">
              <Lock className="w-2.5 h-2.5" /> Razorpay 256-bit Encrypted
            </span>
          </div>
        </div>

        {paymentSuccess && receiptData ? (
          /* Payment Success State */
          <div className="p-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#DDF1E3] text-[#0F3B2E] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div>
              <h3 className="text-base font-bold text-[#111816]">Payment Successful!</h3>
              <p className="text-[#535C57] text-[11px] mt-0.5">
                Your payment of ₹{receiptData.amount} has been verified via Razorpay.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#F7F5EE] border border-black/[0.06] text-left font-mono text-[11px] space-y-1">
              <div className="flex justify-between">
                <span className="text-[#848D88]">Payment ID:</span>
                <span className="font-bold text-[#111816]">{receiptData.paymentId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#848D88]">Order ID:</span>
                <span className="text-[#111816]">{receiptData.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#848D88]">Plan:</span>
                <span className="text-[#0F3B2E] font-semibold">{receiptData.planName}</span>
              </div>
              {plan.tenderId && (
                <div className="flex justify-between">
                  <span className="text-[#848D88]">Tender:</span>
                  <span className="text-[#111816]">{plan.tenderId}</span>
                </div>
              )}
            </div>

            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-[#0F3B2E] text-white font-mono font-medium hover:bg-[#0A2C22] transition"
            >
              Access Unlocked Bid Pack & Affidavits →
            </button>
          </div>
        ) : (
          /* Payment Methods Selection */
          <div className="p-6 space-y-4 font-mono">
            
            {/* Plan Info Badge */}
            <div className="p-3 rounded-xl bg-[#F7F5EE] border border-black/[0.06] flex items-center justify-between">
              <div>
                <span className="font-bold text-[#111816] block">{plan.name}</span>
                <span className="text-[10px] text-[#535C57] line-clamp-1">
                  {plan.tenderTitle || "Full BOQ, Technical Docs & Legal Affidavits"}
                </span>
              </div>
              <span className="text-sm font-bold text-[#0F3B2E] shrink-0 ml-2">₹{plan.price}</span>
            </div>

            {/* Payment Method Tabs */}
            <div>
              <span className="text-[10px] uppercase text-[#848D88] font-bold block mb-2">
                Select Indian Payment Gateway
              </span>

              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'UPI', label: 'UPI / QR', icon: QrCode },
                  { id: 'CARD', label: 'Cards', icon: CreditCard },
                  { id: 'NETBANKING', label: 'NetBanking', icon: Smartphone }
                ].map((m) => {
                  const Icon = m.icon;
                  return (
                    <button
                      key={m.id}
                      onClick={() => setSelectedMethod(m.id)}
                      className={`py-2 px-2.5 rounded-xl border transition text-center cursor-pointer ${
                        selectedMethod === m.id
                          ? 'bg-[#0F3B2E] text-white border-[#0F3B2E]'
                          : 'bg-[#F7F5EE] text-[#535C57] border-black/[0.06] hover:border-black/20'
                      }`}
                    >
                      <Icon className="w-4 h-4 mx-auto mb-1" />
                      <span className="text-[10px] font-semibold block">{m.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* UPI Option */}
            {selectedMethod === 'UPI' && (
              <div className="space-y-3 pt-2">
                <div className="p-4 rounded-xl border border-dashed border-black/20 text-center bg-[#F7F5EE]">
                  <div className="w-24 h-24 bg-white border border-black/10 rounded-lg mx-auto flex items-center justify-center p-2 shadow-2xs">
                    <img 
                      src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=upi://pay?pa=tendersearch@icici&pn=TenderSearch&am=500&cu=INR" 
                      alt="Razorpay UPI QR"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-[10px] text-[#535C57] mt-2 block font-sans">
                    Scan with Google Pay, PhonePe, Paytm, or BHIM
                  </span>
                </div>

                <div className="text-center text-[10px] text-[#848D88]">— OR ENTER UPI ID —</div>

                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="e.g. mobile@upi or name@okaxis"
                  className="w-full px-3 py-2 text-xs rounded-xl bg-[#F7F5EE] border border-black/[0.08] focus:outline-none focus:ring-1 focus:ring-[#0F3B2E]"
                />
              </div>
            )}

            {/* Card Option */}
            {selectedMethod === 'CARD' && (
              <div className="space-y-2.5 pt-2">
                <input
                  type="text"
                  placeholder="Card Number (Visa / Mastercard / RuPay)"
                  defaultValue="4111 2222 3333 4444"
                  className="w-full px-3 py-2 text-xs rounded-xl bg-[#F7F5EE] border border-black/[0.08]"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="MM / YY"
                    defaultValue="09/28"
                    className="w-full px-3 py-2 text-xs rounded-xl bg-[#F7F5EE] border border-black/[0.08]"
                  />
                  <input
                    type="password"
                    placeholder="CVV"
                    defaultValue="123"
                    className="w-full px-3 py-2 text-xs rounded-xl bg-[#F7F5EE] border border-black/[0.08]"
                  />
                </div>
              </div>
            )}

            {/* NetBanking Option */}
            {selectedMethod === 'NETBANKING' && (
              <div className="pt-2">
                <select className="w-full px-3 py-2 text-xs rounded-xl bg-[#F7F5EE] border border-black/[0.08]">
                  <option>State Bank of India (SBI)</option>
                  <option>HDFC Bank</option>
                  <option>ICICI Bank</option>
                  <option>Axis Bank</option>
                  <option>Punjab National Bank</option>
                  <option>Bank of Baroda</option>
                </select>
              </div>
            )}

            {/* Pay Button */}
            <div className="pt-2">
              <button
                onClick={handlePayNow}
                disabled={isProcessing}
                className="w-full py-3 rounded-xl bg-[#0F3B2E] hover:bg-[#0A2C22] text-white font-mono text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-60"
              >
                <span>{isProcessing ? 'Contacting Razorpay Gateway...' : `Pay ₹ ${plan.price}.00 via Razorpay`}</span>
                {!isProcessing && <ArrowRight className="w-3.5 h-3.5" />}
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#848D88] mt-2 font-sans">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2F9E6A]" />
                <span>Powered by Razorpay Payments Pvt Ltd • Instant Auto-Unlock</span>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
