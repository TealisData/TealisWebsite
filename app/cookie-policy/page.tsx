import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy – Tealis",
};

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen pt-14 md:pt-[69px] bg-[var(--bg-primary)]">
      <div className="max-w-3xl mx-auto px-6 sm:px-8 py-20 flex flex-col gap-10">

        <div className="flex flex-col gap-3">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand)]">Legal</p>
          <h1 className="text-4xl font-bold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-heading)" }}>
            Cookie Policy
          </h1>
          <p className="text-sm text-[var(--text-muted)]">Last updated: January 2026</p>
        </div>

        <div className="flex flex-col gap-8 text-[var(--text-muted)] leading-relaxed text-sm">

          <section className="flex flex-col gap-3">
            <h2 className="text-base font-semibold text-[var(--text-primary)]">What are cookies?</h2>
            <p>
              Cookies are small text files stored in your browser when you visit a website.
              They are widely used to make websites work, or work more efficiently,
              and to provide information to the site owners.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-base font-semibold text-[var(--text-primary)]">Cookies we use</h2>
            <p>Tealisdata.com uses only strictly necessary cookies. We do not use advertising, tracking or analytics cookies.</p>

            <div className="overflow-x-auto rounded-xl border border-[var(--border-subtle)]">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-[var(--border-subtle)] bg-[var(--bg-surface)]">
                    <th className="text-left px-4 py-3 font-semibold text-[var(--text-primary)]">Cookie</th>
                    <th className="text-left px-4 py-3 font-semibold text-[var(--text-primary)]">Purpose</th>
                    <th className="text-left px-4 py-3 font-semibold text-[var(--text-primary)]">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "theme", purpose: "Stores your light/dark mode preference", duration: "1 year" },
                    { name: "__vercel_live_token", purpose: "Vercel deployment infrastructure (strictly necessary)", duration: "Session" },
                  ].map((row, i) => (
                    <tr key={row.name} className={i % 2 === 0 ? "" : "bg-[var(--bg-surface)]"}>
                      <td className="px-4 py-3 font-mono text-[var(--text-primary)]">{row.name}</td>
                      <td className="px-4 py-3">{row.purpose}</td>
                      <td className="px-4 py-3">{row.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-base font-semibold text-[var(--text-primary)]">Third-party cookies</h2>
            <p>
              We do not load any third-party tracking scripts (Google Analytics, Meta Pixel, etc.).
              Our fonts are loaded via Google Fonts, which may set a session cookie for font delivery optimization —
              no personal data is stored or shared.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-base font-semibold text-[var(--text-primary)]">Managing cookies</h2>
            <p>
              You can control and delete cookies through your browser settings.
              Note that disabling strictly necessary cookies may affect the functionality of this site
              (e.g., your theme preference will not be remembered).
              For guidance on managing cookies in your browser, visit{" "}
              <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-[var(--color-brand)] hover:underline">allaboutcookies.org</a>.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-base font-semibold text-[var(--text-primary)]">Contact</h2>
            <p>
              If you have questions about our use of cookies, contact us at{" "}
              <a href="mailto:info@tealisdata.com" className="text-[var(--color-brand)] hover:underline">info@tealisdata.com</a>.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
