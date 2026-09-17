"use client";

import Script from "next/script";

const GA_ID = "G-NEX7TNM74M";

export default function GoogleAnalytics({ enabled }: { enabled: boolean }) {
  if (!enabled) return null;
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_ID}', { anonymize_ip: true });
      `}</Script>
    </>
  );
}
