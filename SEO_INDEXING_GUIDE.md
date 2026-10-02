# AIremover.online — Technical SEO & Search Console Indexing Guide

This document outlines the technical SEO architecture, canonical routes, structured data schemas, and exact Google Search Console procedures for **https://airemover.online/**.

---

## 1. Core Technical Endpoints & URLs

| Resource | Canonical URL | Description |
| :--- | :--- | :--- |
| **Primary Domain** | `https://airemover.online/` | Canonical HTTPS root domain |
| **Sitemap XML** | `https://airemover.online/sitemap.xml` | Standard XML sitemap listing indexable URLs |
| **Robots Directives** | `https://airemover.online/robots.txt` | Crawler permissions and sitemap pointer |
| **Social Card (OG Image)**| `https://airemover.online/og-image.svg` | 1200x630 vector preview asset for Open Graph / Twitter |
| **Brand Favicon** | `https://airemover.online/favicon.svg` | Scalable vector favicon & apple-touch-icon |
| **Google Tag (GA4)** | `G-CZTG75H895` | Global site tag for traffic analytics & SPA pageviews |
| **Authorized Digital Sellers (ads.txt)** | `https://airemover.online/ads.txt` | Google AdSense seller verification record |

---

## 2. Indexable Canonical Routes

All URLs are canonicalized to `https://airemover.online` with HTTPS and consistent trailing-slash normalization:

1. **`https://airemover.online/`**
   - **Primary Search Intent:** AI Metadata Remover
   - **Title:** `AI Metadata Remover – Remove Hidden Metadata Online | Airemover`
   - **Meta Description:** `Remove AI metadata, EXIF data, author information and hidden file tags online with Airemover. Clean supported images quickly and securely with 100% privacy.`
   - **H1:** `AI Metadata Remover`

2. **`https://airemover.online/ai-metadata-remover`**
   - **Title:** `AI Metadata Remover – Strip Prompts, Seeds & EXIF Online | AIremover`
   - **Meta Description:** `Remove AI metadata including generation prompts, negative prompts, seeds, ComfyUI workflows, and EXIF parameters from images at 100% visual quality.`
   - **H1:** `AI Metadata Remover`

3. **`https://airemover.online/image-metadata-remover`**
   - **Title:** `Image Metadata Remover – Remove EXIF, GPS & Hidden Tags | AIremover`
   - **Meta Description:** `Free online image metadata remover. Clean EXIF data, GPS coordinates, camera specs, and AI tags from PNG, JPEG, WebP, and AVIF images with 100% quality.`
   - **H1:** `Image Metadata Remover`

4. **`https://airemover.online/exif-remover`**
   - **Title:** `EXIF Remover – Remove EXIF Data from Photos Online Free | AIremover`
   - **Meta Description:** `Remove EXIF data, camera settings, timestamps, and GPS geotags from photos online for free. Clean EXIF tags securely in your browser with AIremover.`
   - **H1:** `EXIF Remover`

5. **`https://airemover.online/remove-metadata-online`**
   - **Title:** `Remove Metadata Online – Free Hidden Metadata Cleaner | AIremover`
   - **Meta Description:** `Remove metadata online for free. Strip hidden EXIF tags, AI generation prompts, and author information from supported image files with AIremover.`
   - **H1:** `Remove Metadata Online`

6. **`https://airemover.online/ai-tag-remover`**
   - **Title:** `AI Tag Remover – Strip AI Tags & Prompts Online Free | AIremover`
   - **Meta Description:** `Free online AI tag remover to purge embedded AI tags, generation prompts, seed parameters, and provenance markers from images without quality loss.`
   - **H1:** `AI Tag Remover`

7. **`https://airemover.online/ai-hyphen-remover`**
   - **Title:** `AI Hyphen Remover – Clean Em Dashes & En Dashes in AI Text | AIremover`
   - **Meta Description:** `Remove repetitive em dashes (—), en dashes (–), and unnecessary hyphens from ChatGPT, Claude, and AI-generated text for natural, human readability.`
   - **H1:** `AI Hyphen Remover`

8. **`https://airemover.online/remove-ai-metadata`**
   - **Title:** `Remove AI Metadata – Free Online Tool for AI Files | AIremover`
   - **Meta Description:** `Learn how to remove AI metadata and provenance tags from your files online. Free, fast, and 100% private client-side metadata cleaner.`
   - **H1:** `Remove AI Metadata`

9. **`https://airemover.online/remove-ai-metadata-from-images`**
   - **Title:** `Remove AI Metadata from Images – PNG, JPEG, WebP | AIremover`
   - **Meta Description:** `Remove AI metadata from images (PNG, JPEG, WebP, AVIF) at 100% original quality. Strip C2PA credentials, Midjourney prompts, and Stable Diffusion EXIF.`
   - **H1:** `Remove AI Metadata from Images`

---

## 3. Structured Data (Schema.org JSON-LD)

The application embeds valid JSON-LD metadata for search engines and AI assistants across every route:

- **`WebSite`**: Primary brand name, canonical HTTPS URL, and query capabilities.
- **`WebApplication`**: Specific tool name, operating systems, requirements, and free offer (`price: "0"`).
- **`BreadcrumbList`**: Clean hierarchical breadcrumb structure linking back to home.
- **`FAQPage`**: Dynamic entity rendering containing visible questions & answers matching on-page FAQs.

---

## 4. Google Search Console Setup & Verification Steps

To ensure complete indexation by Googlebot:

1. **Sign In to Google Search Console:**
   - Navigate to [search.google.com/search-console](https://search.google.com/search-console).
   - Select **URL prefix** and enter `https://airemover.online/`.
2. **Verify Ownership:**
   - HTML tag verification is already enabled in `<head>` via Google Analytics (`G-CZTG75H895`) and Google AdSense (`ca-pub-7813443546025415`). Click **Verify**.
3. **Submit the XML Sitemap:**
   - In the left sidebar, click **Sitemaps**.
   - Under **Add a new sitemap**, type `sitemap.xml` and click **Submit**.
   - Verify that the status turns green (**Success**).
4. **Inspect & Request Indexing:**
   - Paste `https://airemover.online/` into the top search bar (**Inspect any URL**).
   - Click **Test Live URL** to confirm Googlebot renders the page and receives HTTP 200.
   - Click **Request Indexing**.
   - Repeat for key subpages:
     - `https://airemover.online/ai-metadata-remover`
     - `https://airemover.online/image-metadata-remover`
     - `https://airemover.online/exif-remover`
     - `https://airemover.online/remove-metadata-online`
     - `https://airemover.online/ai-tag-remover`
     - `https://airemover.online/ai-hyphen-remover`
     - `https://airemover.online/remove-ai-metadata-from-images`
