import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy – Tealis",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen pt-14 md:pt-[69px] bg-[var(--bg-primary)]">
      <div className="max-w-3xl mx-auto px-6 sm:px-8 py-20 flex flex-col gap-10">

        <div className="flex flex-col gap-3">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand)]">Legal</p>
          <h1 className="text-4xl font-bold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-heading)" }}>
            Privacy Policy
          </h1>
          <p className="text-sm text-[var(--text-muted)]">Last updated: September 2026</p>
        </div>

        <div className="flex flex-col gap-8 text-[var(--text-muted)] leading-relaxed text-sm">

          <section className="flex flex-col gap-3">
            <h2 className="text-base font-semibold text-[var(--text-primary)]">1. Controller</h2>
            <p>
              Tealisdata OÜ, a company incorporated under Estonian law (VAT EE102990636),
              with registered address at Pärnu mnt 388b, Tallinn, Estonia, is the data controller for all personal data
              processed through the website tealisdata.com.
            </p>
            <p>Contact: <a href="mailto:info@tealisdata.com" className="text-[var(--color-brand)] hover:underline">info@tealisdata.com</a></p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-base font-semibold text-[var(--text-primary)]">2. Data we collect</h2>
            <p>We collect only the data you voluntarily provide when contacting us:</p>
            <ul className="flex flex-col gap-1.5 pl-4">
              {["Name and email address (via contact form or email)", "Company name and role (optional)", "Message content"].map(item => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-[var(--text-muted)] shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <p>
              If you consent, we also collect anonymous usage data through Google Analytics 4
              (page views, traffic source, approximate location at country level).
              No personal data is collected through analytics. You can withdraw consent at any time
              via the cookie banner at the bottom of any page.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-base font-semibold text-[var(--text-primary)]">3. Legal basis and purpose</h2>
            <p>
              Processing is based on your consent (Art. 6(1)(a) GDPR) when you contact us or accept analytics cookies,
              and on our legitimate interest (Art. 6(1)(f) GDPR) in responding to business inquiries.
              Data is used solely to respond to your request and improve the website.
              It is not sold, rented or shared with third parties for marketing purposes.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-base font-semibold text-[var(--text-primary)]">4. Data retention</h2>
            <p>
              We retain contact data for a maximum of 24 months from the last interaction,
              unless a longer retention period is required by law or by an ongoing contractual relationship.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-base font-semibold text-[var(--text-primary)]">5. Your rights</h2>
            <p>Under GDPR, you have the right to: access your data, request correction or deletion, object to processing, and request data portability. To exercise any of these rights, contact us at <a href="mailto:info@tealisdata.com" className="text-[var(--color-brand)] hover:underline">info@tealisdata.com</a>.</p>
            <p>You also have the right to lodge a complaint with the Estonian Data Protection Inspectorate (Andmekaitse Inspektsioon) at <a href="https://www.aki.ee" target="_blank" rel="noopener noreferrer" className="text-[var(--color-brand)] hover:underline">aki.ee</a>.</p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-base font-semibold text-[var(--text-primary)]">6. International transfers</h2>
            <p>
              Our website is hosted on Vercel Inc. (USA). Data transfers to the US are covered by
              Vercel&apos;s Standard Contractual Clauses pursuant to EU Commission Decision 2021/914.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-base font-semibold text-[var(--text-primary)]">7. Changes</h2>
            <p>
              We may update this policy from time to time. The date at the top of this page indicates
              when it was last revised. Continued use of the site constitutes acceptance of the updated policy.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
