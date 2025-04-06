'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle: Array<Record<string, unknown>>;
  }
}

export default function AMPAd() {
  useEffect(() => {
    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch (e) {
      console.error("AdSense error", e);
    }
  }, []);

  return (
    <>
      <ins className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-6580779703282784"
        data-ad-slot="1052370986"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </>
  );
}
