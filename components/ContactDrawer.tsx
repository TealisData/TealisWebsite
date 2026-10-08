"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, AlertCircle } from "lucide-react";

// Web3Forms delivers each submission by email to info@tealisdata.com.
// The access key is public by design (it only allows sending to that inbox).
const WEB3FORMS_ACCESS_KEY = "a9b3448c-ea54-437d-bdf0-dbcd758b86d7";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  countryCode: string;
  mobile: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  message?: string;
}

const INITIAL: FormData = { firstName: "", lastName: "", email: "", message: "", countryCode: "+1", mobile: "" };

const COUNTRY_CODES = [
  { code: "+1", label: "🇺🇸 +1" },
  { code: "+39", label: "🇮🇹 +39" },
  { code: "+44", label: "🇬🇧 +44" },
  { code: "+33", label: "🇫🇷 +33" },
  { code: "+49", label: "🇩🇪 +49" },
  { code: "+34", label: "🇪🇸 +34" },
  { code: "+31", label: "🇳🇱 +31" },
  { code: "+32", label: "🇧🇪 +32" },
  { code: "+41", label: "🇨🇭 +41" },
  { code: "+43", label: "🇦🇹 +43" },
  { code: "+971", label: "🇦🇪 +971" },
  { code: "+1-CA", label: "🇨🇦 +1" },
  { code: "+61", label: "🇦🇺 +61" },
];

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.firstName.trim()) errors.firstName = "First name is required";
  if (!data.lastName.trim()) errors.lastName = "Last name is required";
  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email";
  }
  if (!data.message.trim()) errors.message = "Message is required";
  return errors;
}

export default function ContactDrawer() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormData>(INITIAL);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  // Spam trap: hidden from people, bots tend to fill it; Web3Forms rejects submissions where it is set
  const [honeypot, setHoneypot] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("tealis:open-contact", handler);
    return () => window.removeEventListener("tealis:open-contact", handler);
  }, []);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    setSubmitError(null);
    const name = `${form.firstName.trim()} ${form.lastName.trim()}`;
    const phone = form.mobile.trim() ? `${form.countryCode.replace("-CA", "")} ${form.mobile.trim()}` : "—";
    let ok = false;
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New contact request from tealisdata.com — ${name}`,
          from_name: "Tealis website",
          replyto: form.email.trim(),
          botcheck: honeypot,
          Name: name,
          Email: form.email.trim(),
          Phone: phone,
          Message: form.message.trim(),
        }),
      });
      const data = await res.json();
      ok = res.ok && data.success === true;
    } catch {
      ok = false;
    }
    setLoading(false);
    if (!ok) {
      setSubmitError("Something went wrong. Please try again or email us at info@tealisdata.com.");
      return;
    }
    setSubmitted(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => { setSubmitted(false); setForm(INITIAL); setErrors({}); setSubmitError(null); }, 400);
  };

  const fieldBase =
    "text-sm text-[var(--text-primary)] placeholder:text-[var(--text-primary)]/40 rounded-xl border transition-colors outline-none focus:ring-2 focus:ring-[var(--color-brand)]/30";

  const inputClass = (field: keyof FormErrors) =>
    `w-full px-4 py-3 ${fieldBase} ${
      errors[field]
        ? "border-red-400 bg-red-500/10 focus:border-red-400"
        : "border-[var(--border-subtle)] bg-[var(--bg-surface)] focus:border-[var(--color-brand)] focus:bg-[var(--bg-primary)]"
    }`;

  const labelClass = "block text-xs font-semibold text-[var(--text-primary)]/70 mb-1.5";

  return (
    <>
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-[var(--bg-primary)] border-l border-[var(--border-subtle)] z-50 shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-[var(--border-subtle)]">
                <div>
                  <h2 className="text-xl font-bold text-[var(--text-primary)]">Get In Touch</h2>
                  <p className="text-sm text-[var(--text-primary)]/50 mt-0.5">We&apos;ll get back to you within 24 hours</p>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 rounded-xl hover:bg-[var(--border-subtle)] transition-colors"
                  aria-label="Close"
                >
                  <X size={20} className="text-[var(--text-primary)]/60" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center h-full text-center gap-6 py-16"
                  >
                    <div className="w-16 h-16 rounded-full bg-[var(--color-brand)]/10 flex items-center justify-center">
                      <CheckCircle2 size={32} className="text-[var(--color-brand)]" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[var(--text-primary)]">Request Sent!</h3>
                      <p className="text-[var(--text-primary)]/60 mt-2 text-sm leading-relaxed">
                        Thank you for reaching out. A Tealis consultant will contact you shortly.
                      </p>
                    </div>
                    <button
                      onClick={handleClose}
                      className="px-6 py-3 bg-[var(--color-brand)] text-white rounded-xl font-semibold text-sm hover:bg-[var(--color-brand-hover)] transition-colors"
                    >
                      Close
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
                    <input
                      type="checkbox"
                      name="botcheck"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      className="hidden"
                      checked={honeypot}
                      onChange={(e) => setHoneypot(e.target.checked)}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>
                          First Name <span className="text-red-400">*</span>
                        </label>
                        <input
                          name="firstName"
                          value={form.firstName}
                          onChange={handleChange}
                          placeholder="John"
                          className={inputClass("firstName")}
                        />
                        {errors.firstName && (
                          <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                            <AlertCircle size={10} /> {errors.firstName}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className={labelClass}>
                          Last Name <span className="text-red-400">*</span>
                        </label>
                        <input
                          name="lastName"
                          value={form.lastName}
                          onChange={handleChange}
                          placeholder="Smith"
                          className={inputClass("lastName")}
                        />
                        {errors.lastName && (
                          <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                            <AlertCircle size={10} /> {errors.lastName}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className={labelClass}>
                        Email <span className="text-red-400">*</span>
                      </label>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="john@company.com"
                        className={inputClass("email")}
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                          <AlertCircle size={10} /> {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className={labelClass}>
                        Mobile Number <span className="text-[var(--text-primary)]/40 font-normal">(optional)</span>
                      </label>
                      <div className="flex gap-2">
                        <select
                          name="countryCode"
                          value={form.countryCode}
                          onChange={handleChange}
                          className={`px-3 py-3 ${fieldBase} border-[var(--border-subtle)] bg-[var(--bg-surface)] focus:border-[var(--color-brand)] min-w-[90px]`}
                        >
                          {COUNTRY_CODES.map(({ code, label }) => (
                            <option key={code} value={code} className="bg-[var(--bg-primary)] text-[var(--text-primary)]">{label}</option>
                          ))}
                        </select>
                        <input
                          name="mobile"
                          type="tel"
                          value={form.mobile}
                          onChange={handleChange}
                          placeholder="123 456 7890"
                          className={`flex-1 px-4 py-3 ${fieldBase} border-[var(--border-subtle)] bg-[var(--bg-surface)] focus:border-[var(--color-brand)] focus:bg-[var(--bg-primary)]`}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={labelClass}>
                        Message <span className="text-red-400">*</span>
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell us about your project or question..."
                        rows={5}
                        className={`${inputClass("message")} resize-none`}
                      />
                      {errors.message && (
                        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                          <AlertCircle size={10} /> {errors.message}
                        </p>
                      )}
                    </div>

                    {submitError && (
                      <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-400/40 rounded-xl text-sm text-red-500">
                        <AlertCircle size={14} className="shrink-0" />
                        {submitError}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 bg-[var(--color-brand)] text-white font-semibold rounded-xl hover:bg-[var(--color-brand-hover)] transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                          </svg>
                          Sending...
                        </>
                      ) : "Send Request"}
                    </button>

                    <p className="text-xs text-[var(--text-primary)]/50 text-center">
                      By submitting, you agree to our privacy policy. We never share your data.
                    </p>
                  </form>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
