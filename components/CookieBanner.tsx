"use client";

import { useState, useEffect } from "react";
import GoogleAnalytics from "@/components/GoogleAnalytics";

type Consent = { analytics: boolean } | null;

const STORAGE_KEY = "tealis_cookie_consent";

function getStored(): Consent {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveConsent(consent: Consent) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(consent)); } catch {}
}

export default function CookieBanner() {
  const [consent, setConsent] = useState<Consent | undefined>(undefined);
  const [showPrefs, setShowPrefs] = useState(false);
  const [analyticsChecked, setAnalyticsChecked] = useState(true);

  useEffect(() => {
    setConsent(getStored());
  }, []);

  if (consent === undefined) return null;

  const analyticsEnabled = consent?.analytics === true;

  const acceptAll = () => {
    const c = { analytics: true };
    saveConsent(c);
    setConsent(c);
    setShowPrefs(false);
  };

  const acceptEssential = () => {
    const c = { analytics: false };
    saveConsent(c);
    setConsent(c);
    setShowPrefs(false);
  };

  const savePrefs = () => {
    const c = { analytics: analyticsChecked };
    saveConsent(c);
    setConsent(c);
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
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
                <p className="text-sm text-[var(--text-muted)] leading-relaxed flex-1">
                  Usiamo i cookie per migliorare la tua esperienza e capire come viene usato il sito.
                  Puoi scegliere cosa accettare.
                </p>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0">
                  <button
                    onClick={acceptAll}
                    className="px-5 py-2.5 bg-[var(--color-brand)] text-white text-sm font-semibold rounded-lg hover:bg-[var(--color-brand-hover)] transition-colors"
                  >
                    Accetta tutto
                  </button>
                  <button
                    onClick={acceptEssential}
                    className="px-5 py-2.5 border border-[var(--border-subtle)] text-[var(--text-primary)] text-sm font-medium rounded-lg hover:border-[var(--color-brand)] transition-colors"
                  >
                    Solo essenziali
                  </button>
                  <button
                    onClick={() => setShowPrefs(true)}
                    className="px-5 py-2.5 text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    Preferenze →
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <p className="text-sm font-semibold text-[var(--text-primary)]">Gestisci le preferenze</p>

                {/* Essential — always on */}
                <div className="flex items-center justify-between py-3 border-t border-[var(--border-subtle)]">
                  <div>
                    <p className="text-sm font-medium text-[var(--text-primary)]">Cookie essenziali</p>
                    <p className="text-xs text-[var(--text-muted)] mt-0.5">Necessari per il funzionamento del sito. Sempre attivi.</p>
                  </div>
                  <div className="w-10 h-6 bg-[var(--color-brand)] rounded-full opacity-50 cursor-not-allowed" />
                </div>

                {/* Analytics */}
                <div className="flex items-center justify-between py-3 border-t border-[var(--border-subtle)]">
                  <div>
                    <p className="text-sm font-medium text-[var(--text-primary)]">Cookie analitici</p>
                    <p className="text-xs text-[var(--text-muted)] mt-0.5">Ci aiutano a capire come viene usato il sito (Google Analytics).</p>
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
                    Salva preferenze
                  </button>
                  <button
                    onClick={() => setShowPrefs(false)}
                    className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    ← Indietro
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
