import React, { useState, useEffect } from 'react';
import { X, Copy, Check, Download, FileText, CheckCircle2 } from 'lucide-react';
import { standardDocumentTemplates } from '../data/directory';

export default function DocsCreatorModal({ isOpen, onClose, preselectedTender }) {
  const [selectedTemplate, setSelectedTemplate] = useState('non-blacklisting');
  const [companyName, setCompanyName] = useState('Apex Technologies Private Limited');
  const [signatoryName, setSignatoryName] = useState('Rajesh Sharma');
  const [designation, setDesignation] = useState('Managing Director');
  const [panNumber, setPanNumber] = useState('AAACA1234F');
  const [bidNumber, setBidNumber] = useState(preselectedTender ? preselectedTender.bidNumber : 'GEM/2026/B/9182301');
  const [tenderTitle, setTenderTitle] = useState(preselectedTender ? preselectedTender.title : 'Supply, Installation & Maintenance of Server Equipment');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (preselectedTender) {
      setBidNumber(preselectedTender.bidNumber);
      setTenderTitle(preselectedTender.title);
    }
  }, [preselectedTender]);

  if (!isOpen) return null;

  const generateDocumentContent = () => {
    const today = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });

    if (selectedTemplate === 'non-blacklisting') {
      return `UNDERTAKING REGARDING NON-BLACKLISTING / NON-DEBARMENT
(To be submitted on Firm's Official Letterhead)

Date: ${today}
To,
The Competent Procurement Authority,
Government e-Marketplace (GeM) / Procuring Entity

Subject: Declaration of Non-Blacklisting for Bid No: ${bidNumber}
Tender Title: ${tenderTitle}

Respected Sir/Madam,

I, ${signatoryName}, in my capacity as ${designation} and Authorized Signatory of M/s ${companyName} (PAN: ${panNumber}), having its registered office in India, do hereby solemnly state and affirm as follows:

1. That M/s ${companyName} or any of its partners/directors has not been debarred, blacklisted, or suspended by any Central Government Ministry, Department, State Government, or Public Sector Undertaking (PSU) from participating in any bidding process as of the bid submission deadline.

2. That there is no ongoing vigilance investigation or criminal proceeding against the firm or its key managerial personnel in relation to fraudulent or corrupt trade practices.

3. That if this declaration is found to be false or incorrect at any stage, the Procuring Authority shall be at liberty to cancel our bid, terminate any awarded contract, forfeit the Bid Security / Performance Bank Guarantee, and initiate debarment proceedings as per GeM GTC and GFR 2017 rules.

For and on behalf of M/s ${companyName}

Authorized Signatory: ${signatoryName}
Designation: ${designation}
Company Stamp & Signature: _______________________`;
    }

    if (selectedTemplate === 'make-in-india') {
      return `LOCAL CONTENT DECLARATION UNDER PUBLIC PROCUREMENT (PREFERENCE TO MAKE IN INDIA) ORDER
(As per DPIIT Order No. P-45021/2/2017-PP (BE-II) dated 16.09.2020)

Date: ${today}
Bid Number: ${bidNumber}
Project: ${tenderTitle}

We, M/s ${companyName}, hereby declare and certify the following in respect of the subject tender:

1. Classification: We qualify as a CLASS-I LOCAL SUPPLIER as defined under the Make in India Procurement Policy.
2. Percentage of Local Content: The percentage of local content offered in the quoted equipment / service is 68.5% (exceeding the minimum 50% threshold).
3. Location of Value Addition: Local value addition, fabrication, and integration is carried out at our manufacturing facility located in India.
4. Compliance: We understand that false declarations regarding local content will be in breach of the Code of Integrity under Rule 175(1)(i)(h) of GFR 2017 and may result in debarment for up to two years.

Declared by:
${signatoryName} (${designation})
M/s ${companyName} | PAN: ${panNumber}`;
    }

    if (selectedTemplate === 'turnover-certificate') {
      return `ANNUAL TURNOVER & FINANCIAL SOUNDNESS SELF-DECLARATION
(In compliance with Financial Criteria for GeM Bid No: ${bidNumber})

Date: ${today}

This is to certify that M/s ${companyName} (PAN: ${panNumber}) has achieved the following audited annual financial turnover during the preceding three financial years:

Financial Year 2023-24: ₹ 1,45,20,000/- (Rupees One Crore Forty Five Lakhs Twenty Thousand Only)
Financial Year 2024-25: ₹ 1,92,80,000/- (Rupees One Crore Ninety Two Lakhs Eighty Thousand Only)
Financial Year 2025-26: ₹ 2,34,50,000/- (Rupees Two Crores Thirty Four Lakhs Fifty Thousand Only)

Average Annual Turnover for the past 3 FYs: ₹ 1,90,83,333/-
Net Worth as on 31st March 2026: POSITIVE (₹ 84,20,000/-)

Authorized Signatory:
${signatoryName}, ${designation}
M/s ${companyName}`;
    }

    if (selectedTemplate === 'land-border') {
      return `LAND BORDER SHARING COMPLIANCE UNDERTAKING
(As per Rule 144(xi) of General Financial Rules, 2017 and OM F.No.6/18/2019-PPD)

Tender / GeM Bid Reference: ${bidNumber}

I have read the clause regarding restrictions on procurement from a bidder of a country which shares a land border with India.

I hereby certify that M/s ${companyName} is NOT from such a country, or if from such a country, has been duly registered with the Competent Authority (DPIIT Registration Committee). I further certify that this bidder fulfills all requirements in this regard.

Signatory: ${signatoryName}
${designation}, M/s ${companyName}`;
    }

    return `MANUFACTURER'S AUTHORIZATION FORM (MAF)
(To be obtained from OEM on their Official Letterhead)

Date: ${today}
To: The Competent Authority, Tender/Bid No: ${bidNumber}

WHEREAS [OEM Company Name], who are official manufacturers of [Product Category], do hereby authorize M/s ${companyName} to submit a bid against Bid No: ${bidNumber}.

We hereby extend our full guarantee, warranty, and spare-part availability for 3 years as per General and Special Conditions of Contract.

For OEM:
Authorized Signatory & Seal`;
  };

  const docText = generateDocumentContent();

  const handleCopy = () => {
    navigator.clipboard.writeText(docText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([docText], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${selectedTemplate}_${bidNumber.replace(/\//g, '_')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl border border-black/[0.08] shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden my-auto">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-black/[0.07] flex items-center justify-between bg-[#F7F5EE]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#0F3B2E] text-white flex items-center justify-center">
              <FileText className="w-4 h-4 text-[#DDF1E3]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#111816]">
                Doc's Creator — TenderSearch Suite
              </h3>
              <p className="text-[11px] text-[#535C57] font-mono">
                Generate compliant undertakings & declarations for GeM bidding.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-[#EFECE3] text-[#535C57] hover:text-black transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Left Form: Template Picker & Details */}
          <div className="md:col-span-5 space-y-4">
            <div>
              <label className="block text-[10px] font-mono uppercase text-[#848D88] font-semibold mb-1.5">
                Select Declaration Format
              </label>
              <div className="space-y-1.5">
                {standardDocumentTemplates.map(tmpl => (
                  <button
                    key={tmpl.id}
                    onClick={() => setSelectedTemplate(tmpl.id)}
                    className={`w-full p-2.5 rounded-xl text-left border transition text-xs cursor-pointer ${
                      selectedTemplate === tmpl.id
                        ? 'bg-[#0F3B2E] text-white border-[#0F3B2E]'
                        : 'bg-[#F7F5EE] text-[#111816] border-black/[0.06] hover:border-black/20'
                    }`}
                  >
                    <div className="font-semibold text-xs">{tmpl.title}</div>
                    <div className="text-[10px] opacity-75 mt-0.5 truncate">{tmpl.tags.join(' • ')}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-black/[0.06] space-y-2.5">
              <div>
                <label className="block text-[10px] font-mono uppercase text-[#848D88] font-semibold mb-1">
                  Company / Firm Name
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-lg bg-[#F7F5EE] border border-black/[0.08] text-[#111816]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-[#848D88] font-semibold mb-1">
                    Signatory Name
                  </label>
                  <input
                    type="text"
                    value={signatoryName}
                    onChange={(e) => setSignatoryName(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-lg bg-[#F7F5EE] border border-black/[0.08] text-[#111816]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase text-[#848D88] font-semibold mb-1">
                    Designation
                  </label>
                  <input
                    type="text"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-lg bg-[#F7F5EE] border border-black/[0.08] text-[#111816]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-[#848D88] font-semibold mb-1">
                  GeM Bid Number
                </label>
                <input
                  type="text"
                  value={bidNumber}
                  onChange={(e) => setBidNumber(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs font-mono rounded-lg bg-[#F7F5EE] border border-black/[0.08] text-[#111816]"
                />
              </div>
            </div>
          </div>

          {/* Right Panel: Clean Legal Text Preview */}
          <div className="md:col-span-7 flex flex-col">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-mono uppercase text-[#848D88] font-semibold">
                Formatted Text Preview
              </span>
              <span className="text-[10px] font-mono text-[#0F3B2E]">Ready for GeM Technical Upload</span>
            </div>

            <div className="flex-1 p-4 rounded-xl bg-[#F7F5EE] border border-black/[0.07] font-mono text-[11px] leading-relaxed text-[#111816] overflow-y-auto whitespace-pre-wrap max-h-80 select-all">
              {docText}
            </div>

            <div className="mt-4 flex items-center justify-end gap-2 font-mono">
              <button
                onClick={handleCopy}
                className="px-3 py-2 rounded-xl text-xs border border-black/10 bg-white text-[#111816] hover:bg-[#EFECE3] transition flex items-center gap-1.5 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#0F3B2E]" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied' : 'Copy'}
              </button>

              <button
                onClick={handleDownload}
                className="px-4 py-2 rounded-xl text-xs bg-[#0F3B2E] hover:bg-[#0A2C22] text-white transition flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                Download (.txt)
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
