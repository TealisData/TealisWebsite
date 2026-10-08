"use client";

import { useState, useSyncExternalStore } from "react";
import GoogleAnalytics from "@/components/GoogleAnalytics";

type Consent = { analytics: boolean } | null;

const STORAGE_KEY = "tealis_cookie_consent";
const CHANGE_EVENT = "tealis:consent-change";

// Raw stored value: null on the server/hydration, "" when nothing is stored
function readRaw(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? "";
  } catch {
    return "";
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

function parse(raw: string): Consent {
  try {
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveConsent(consent: Consent) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(consent)); } catch {}
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export default function CookieBanner() {
  const raw = useSyncExternalStore<string | null>(subscribe, readRaw, () => null);
  const [showPrefs, setShowPrefs] = useState(false);
  const [analyticsChecked, setAnalyticsChecked] = useState(true);

  if (raw === null) return null;
  const consent = parse(raw);

  const analyticsEnabled = consent?.analytics === true;

  const acceptAll = () => {
    const c = { analytics: true };
    saveConsent(c);
    setShowPrefs(false);
  };

  const acceptEssential = () => {
    const c = { analytics: false };
    saveConsent(c);
    setShowPrefs(false);
  };

  const savePrefs = () => {
    const c = { analytics: analyticsChecked };
    saveConsent(c);
    setShowPrefs(false);
  };

  return (
    <>
      <GoogleAnalytics enabled={analyticsEnabled} />

      {consent === null && (
        <div
          role="dialog"
          aria-label="Cookie consent"
          className="fixed bottom-[54px] left-0 right-0 z-[100] px-4 pb-4 sm:px-6"
        >
          <div className="max-w-4xl mx-auto bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-2xl shadow-xl p-5 sm:p-6">

            {!showPrefs ? (
              <div className="flex flex-col gap-4">
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  We use cookies to improve your experience and understand how the site is used.
                  You can choose what to accept.
                </p>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <button
                    onClick={acceptAll}
                    className="px-5 py-2.5 bg-[var(--color-brand)] text-white text-sm font-semibold rounded-lg hover:bg-[var(--color-brand-hover)] transition-colors text-center"
                  >
                    Accept all
                  </button>
                  <button
                    onClick={acceptEssential}
                    className="px-5 py-2.5 border border-[var(--border-subtle)] text-[var(--text-primary)] text-sm font-medium rounded-lg hover:border-[var(--color-brand)] transition-colors text-center"
                  >
                    Essential only
                  </button>
                  <button
                    onClick={() => setShowPrefs(true)}
                    className="px-5 py-2.5 text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors text-center"
                  >
                    Preferences →
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <p className="text-sm font-semibold text-[var(--text-primary)]">Manage preferences</p>

                {/* Essential — always on */}
                <div className="flex items-center justify-between py-3 border-t border-[var(--border-subtle)]">
                  <div>
                    <p className="text-sm font-medium text-[var(--text-primary)]">Essential cookies</p>
                    <p className="text-xs text-[var(--text-muted)] mt-0.5">Required for the site to function. Always active.</p>
                  </div>
                  <div className="w-10 h-6 bg-[var(--color-brand)] rounded-full opacity-50 cursor-not-allowed" />
                </div>

                {/* Analytics */}
                <div className="flex items-center justify-between py-3 border-t border-[var(--border-subtle)]">
                  <div>
                    <p className="text-sm font-medium text-[var(--text-primary)]">Analytics cookies</p>
                    <p className="text-xs text-[var(--text-muted)] mt-0.5">Help us understand how the site is used (Google Analytics).</p>
                  </div>
                  <button
                    role="switch"
                    aria-checked={analyticsChecked}
                    onClick={() => setAnalyticsChecked(v => !v)}
                    className={`w-10 h-6 rounded-full transition-colors duration-200 relative ${analyticsChecked ? "bg-[var(--color-brand)]" : "bg-[var(--border-subtle)]"}`}
                  >
                    <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${analyticsChecked ? "translate-x-4" : "translate-x-0.5"}`} />
                  </button>
                </div>

                <div className="flex items-center gap-3 pt-1">
                  <button
                    onClick={savePrefs}
                    className="px-5 py-2.5 bg-[var(--color-brand)] text-white text-sm font-semibold rounded-lg hover:bg-[var(--color-brand-hover)] transition-colors"
                  >
                    Save preferences
                  </button>
                  <button
                    onClick={() => setShowPrefs(false)}
                    className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    ← Back
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
