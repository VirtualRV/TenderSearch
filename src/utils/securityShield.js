/**
 * TenderSearch Anti-Scraping & DevTools Security Shield
 * Protects proprietary tender data, affidavits, and BOQ items
 * from automated LLM/AI bots, scrapers, and unauthorized inspect/copying.
 */

// Show sleek security notification toast when inspect/right-click is attempted
let activeToast = null;
export function showSecurityToast(message = "TenderSearch Data Protected: Inspect & Right-Click are disabled.") {
  if (typeof document === 'undefined') return;

  if (activeToast) {
    try {
      activeToast.remove();
    } catch (e) {}
  }

  const toast = document.createElement('div');
  toast.className = 'fixed bottom-5 right-5 z-[99999] bg-[#0B1320] text-white border border-[#1D4ED8]/40 shadow-2xl rounded-xl px-4 py-3 font-mono text-xs flex items-center gap-2.5 transition-all duration-300 opacity-0 translate-y-2 pointer-events-none';
  toast.innerHTML = `
    <span class="w-2 h-2 rounded-full bg-[#1D4ED8] animate-ping shrink-0"></span>
    <span class="text-white font-medium">${message}</span>
  `;

  document.body.appendChild(toast);
  activeToast = toast;

  requestAnimationFrame(() => {
    toast.classList.remove('opacity-0', 'translate-y-2');
    toast.classList.add('opacity-100', 'translate-y-0');
  });

  setTimeout(() => {
    if (activeToast === toast) {
      toast.classList.remove('opacity-100', 'translate-y-0');
      toast.classList.add('opacity-0', 'translate-y-2');
      setTimeout(() => {
        try { toast.remove(); } catch (e) {}
        if (activeToast === toast) activeToast = null;
      }, 300);
    }
  }, 2200);
}

// Bot & Headless Browser Detection
export function isAutomatedScraper() {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;

  const isWebdriver = Boolean(navigator.webdriver);
  const isPhantom = Boolean(window.callPhantom || window._phantom);
  const isNightmare = Boolean(window.__nightmare);
  const isSelenium = Boolean(
    window.document.documentElement.getAttribute('webdriver') ||
    window.document.documentElement.getAttribute('selenium') ||
    window.document.documentElement.getAttribute('driver') ||
    window.cdc_adoQpoasnfa76pfcZLmcfl_Array ||
    window.cdc_adoQpoasnfa76pfcZLmcfl_Promise
  );
  const hasNoPlugins = navigator.plugins && navigator.plugins.length === 0 && !/mobile|android|iphone/i.test(navigator.userAgent);
  const isHeadlessUA = /headlesschrome|electron|phantomjs|puppeteer|playwright|selenium/i.test(navigator.userAgent);

  return isWebdriver || isPhantom || isNightmare || isSelenium || isHeadlessUA;
}

// Initialize complete security shield
export function initSecurityShield() {
  if (typeof window === 'undefined') return;

  // 1. Prevent Right-Click Context Menu
  window.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    e.stopPropagation();
    showSecurityToast("Content Protected: Right-click is disabled.");
    return false;
  }, true);

  // 2. Prevent Keyboard Shortcuts for Inspect, View Source, DevTools
  window.addEventListener('keydown', (e) => {
    const isCtrlOrCmd = e.ctrlKey || e.metaKey;
    const isShift = e.shiftKey;
    const key = (e.key || '').toUpperCase();
    const keyCode = e.keyCode;

    // F12 key
    if (key === 'F12' || keyCode === 123) {
      e.preventDefault();
      e.stopPropagation();
      showSecurityToast("Developer Tools are disabled on this page.");
      return false;
    }

    // Ctrl + Shift + I (Inspect)
    if (isCtrlOrCmd && isShift && (key === 'I' || keyCode === 73)) {
      e.preventDefault();
      e.stopPropagation();
      showSecurityToast("Element inspection is disabled.");
      return false;
    }

    // Ctrl + Shift + J (Console)
    if (isCtrlOrCmd && isShift && (key === 'J' || keyCode === 74)) {
      e.preventDefault();
      e.stopPropagation();
      showSecurityToast("Console access is restricted.");
      return false;
    }

    // Ctrl + Shift + C (Element selector)
    if (isCtrlOrCmd && isShift && (key === 'C' || keyCode === 67)) {
      e.preventDefault();
      e.stopPropagation();
      showSecurityToast("DOM Inspector is disabled.");
      return false;
    }

    // Ctrl + Shift + K (Firefox Console)
    if (isCtrlOrCmd && isShift && (key === 'K' || keyCode === 75)) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Ctrl + U (View Source)
    if (isCtrlOrCmd && (key === 'U' || keyCode === 85)) {
      e.preventDefault();
      e.stopPropagation();
      showSecurityToast("View Source is disabled.");
      return false;
    }

    // Ctrl + S (Save Page)
    if (isCtrlOrCmd && (key === 'S' || keyCode === 83)) {
      e.preventDefault();
      e.stopPropagation();
      showSecurityToast("Page downloading is prohibited.");
      return false;
    }
  }, true);

  // 3. Prevent Drag and Drop of proprietary elements & images
  window.addEventListener('dragstart', (e) => {
    e.preventDefault();
    return false;
  }, true);

  // 4. Console Poisoning in Production
  if (import.meta.env.PROD) {
    const noop = () => {};
    console.log = noop;
    console.debug = noop;
    console.info = noop;
    console.warn = noop;
    console.table = noop;

    // Continuous console sanitization
    setInterval(() => {
      try {
        console.clear();
      } catch (e) {}
    }, 1500);

    // Anti-DevTools Debugger Trap (slows down unauthorized debugging)
    setInterval(() => {
      try {
        const start = performance.now();
        (function() { Function('debugger')(); })();
        const elapsed = performance.now() - start;
        // If debugger paused execution, elapsed will be high
        if (elapsed > 100) {
          showSecurityToast("Unauthorized debugger detected.");
        }
      } catch (e) {}
    }, 2000);
  }

  // 5. Anti-Bot / Scraper Guard
  if (isAutomatedScraper()) {
    console.warn("Automated bot crawler detected. Enforcing restricted sandbox mode.");
    // Scramble / mask proprietary data if automated headless bot is detected
    document.addEventListener('DOMContentLoaded', () => {
      const shieldNotice = document.createElement('div');
      shieldNotice.style.cssText = 'position:fixed;inset:0;background:#0B1320;color:#fff;z-index:999999;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:monospace;padding:20px;text-align:center;';
      shieldNotice.innerHTML = `
        <h1 style="font-size:20px;font-weight:bold;margin-bottom:10px;">Security Verification Required</h1>
        <p style="font-size:12px;color:#94A3B8;max-width:480px;line-height:1.6;">
          TenderSearch automated scraping detection shield has flagged this session.
          Automated bot crawlers and AI model scrapers are strictly prohibited.
        </p>
      `;
      document.body.appendChild(shieldNotice);
    });
  }
}
