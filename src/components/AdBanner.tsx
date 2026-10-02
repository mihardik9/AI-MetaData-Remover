import React, { useEffect, useRef } from 'react';

interface AdBannerProps {
  className?: string;
  slot?: string;
  format?: 'auto' | 'fluid' | 'rectangle';
  responsive?: boolean;
}

declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, unknown>>;
  }
}

export const AdBanner: React.FC<AdBannerProps> = ({
  className = '',
  slot = '3517457575',
  format = 'auto',
  responsive = true,
}) => {
  const adRef = useRef<HTMLModElement | null>(null);
  const pushedRef = useRef(false);

  useEffect(() => {
    // Only push once per mounted ad slot instance
    if (pushedRef.current) return;

    try {
      if (typeof window !== 'undefined') {
        window.adsbygoogle = window.adsbygoogle || [];
        window.adsbygoogle.push({});
        pushedRef.current = true;
      }
    } catch (e) {
      console.error('AdSense display error:', e);
    }
  }, []);

  return (
    <div
      className={`w-full overflow-hidden flex flex-col items-center justify-center my-6 min-h-[90px] ${className}`}
      aria-label="Advertisement"
    >
      <div className="text-[10px] tracking-wider uppercase text-neutral-400 dark:text-neutral-500 mb-1 select-none font-medium">
        Advertisement
      </div>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', minHeight: '90px' }}
        data-ad-client="ca-pub-7813443546025415"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
};
