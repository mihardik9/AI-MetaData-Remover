import { useEffect } from 'react';
import { RouteSeoConfig } from './seoConfig';

function updateMetaTag(selector: string, attr: string, value: string) {
  let element = document.querySelector(selector);
  if (!element) {
    element = document.createElement('meta');
    const [attrName, attrVal] = selector.replace(/[\[\]"]/g, '').split('=');
    element.setAttribute(attrName, attrVal);
    document.head.appendChild(element);
  }
  element.setAttribute(attr, value);
}

function updateLinkCanonical(url: string) {
  let element = document.querySelector('link[rel="canonical"]');
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', 'canonical');
    document.head.appendChild(element);
  }
  element.setAttribute('href', url);
}

export function useSeoHead(config: RouteSeoConfig) {
  useEffect(() => {
    // 1. Page Title
    document.title = config.title;

    // 2. Meta description & keywords
    updateMetaTag('meta[name="description"]', 'content', config.metaDescription);
    updateMetaTag('meta[name="keywords"]', 'content', config.keywords);

    // 3. Canonical link
    updateLinkCanonical(config.canonicalUrl);

    // 4. Open Graph
    updateMetaTag('meta[property="og:title"]', 'content', config.ogTitle);
    updateMetaTag('meta[property="og:description"]', 'content', config.ogDescription);
    updateMetaTag('meta[property="og:url"]', 'content', config.canonicalUrl);
    updateMetaTag('meta[property="og:type"]', 'content', 'website');
    updateMetaTag('meta[property="og:site_name"]', 'content', 'AIremover');
    updateMetaTag('meta[property="og:image"]', 'content', 'https://airemover.online/og-image.svg');

    // 5. Twitter / X
    updateMetaTag('meta[name="twitter:title"]', 'content', config.ogTitle);
    updateMetaTag('meta[name="twitter:description"]', 'content', config.ogDescription);
    updateMetaTag('meta[name="twitter:url"]', 'content', config.canonicalUrl);
    updateMetaTag('meta[name="twitter:card"]', 'content', 'summary_large_image');
    updateMetaTag('meta[name="twitter:image"]', 'content', 'https://airemover.online/og-image.svg');

    // 6. Structured Data (JSON-LD)
    const existingLdJson = document.getElementById('dynamic-json-ld');
    if (existingLdJson) {
      existingLdJson.remove();
    }

    const script = document.createElement('script');
    script.id = 'dynamic-json-ld';
    script.type = 'application/ld+json';

    const structuredDataArray: any[] = [
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'AIremover',
        url: 'https://airemover.online/',
        description: 'Fast, simple, and privacy-focused online AI tag and metadata removal tool.',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: config.h1,
        url: config.canonicalUrl,
        applicationCategory: 'MultimediaApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript. Modern web browser with HTML5 Canvas support.',
        description: config.metaDescription,
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: config.path === '/' ? [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://airemover.online/',
          }
        ] : [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://airemover.online/',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: config.h1,
            item: config.canonicalUrl,
          }
        ],
      },
    ];

    // Add FAQPage schema if faqs exist on this route
    if (config.faqList && config.faqList.length > 0) {
      structuredDataArray.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: config.faqList.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      });
    }

    script.textContent = JSON.stringify(structuredDataArray);
    document.head.appendChild(script);

    // 7. Google Analytics SPA Page View Tracking
    if (typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', 'page_view', {
        page_title: config.title,
        page_location: config.canonicalUrl,
        page_path: config.path,
      });
    }

    return () => {
      // Clean up script tag on unmount if needed
    };
  }, [config]);
}
