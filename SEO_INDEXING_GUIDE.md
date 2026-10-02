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
   - **Primary Search Intent:** AI Tag Remover
   - **Title:** `AI Tag Remover – Remove AI Metadata & Tags Online Free | AIremover`
   - **Meta Description:** `Remove AI-related metadata and tags from supported files online with AIremover. Fast, simple and privacy-focused AI tag removal tool.`
   - **H1:** `AI Tag Remover`

2. **`https://airemover.online/ai-tag-remover`**
   - **Title:** `AI Tag Remover – Strip AI Tags & Prompts Online Free | AIremover`
   - **Meta Description:** `Free online AI tag remover to purge embedded AI tags, generation prompts, seed parameters, and provenance markers from images without quality loss.`
   - **H1:** `AI Tag Remover`

3. **`https://airemover.online/ai-metadata-remover`**
   - **Title:** `AI Metadata Remover – Strip Prompts, Seeds & EXIF Online | AIremover`
   - **Meta Description:** `Remove AI metadata including generation prompts, negative prompts, seeds, ComfyUI workflows, and EXIF parameters from images at 100% visual quality.`
   - **H1:** `AI Metadata Remover`

4. **`https://airemover.online/ai-hyphen-remover`**
   - **Title:** `AI Hyphen Remover – Clean Em Dashes & En Dashes in AI Text | AIremover`
   - **Meta Description:** `Remove repetitive em dashes (—), en dashes (–), and unnecessary hyphens from ChatGPT, Claude, and AI-generated text for natural, human readability.`
   - **H1:** `AI Hyphen Remover`

5. **`https://airemover.online/remove-ai-metadata`**
   - **Title:** `Remove AI Metadata – Free Online Tool for AI Files | AIremover`
   - **Meta Description:** `Learn how to remove AI metadata and provenance tags from your files online. Free, fast, and 100% private client-side metadata cleaner.`
   - **H1:** `Remove AI Metadata`

6. **`https://airemover.online/remove-ai-metadata-from-images`**
   - **Title:** `Remove AI Metadata from Images – PNG, JPEG, WebP | AIremover`
   - **Meta Description:** `Remove AI metadata from images (PNG, JPEG, WebP, AVIF) at 100% original quality. Strip C2PA credentials, Midjourney prompts, and Stable Diffusion EXIF.`
   - **H1:** `Remove AI Metadata from Images`

---

## 3. Structured Data (Schema.org JSON-LD)

The application embeds valid JSON-LD metadata for search engines and AI assistants:

- **`WebSite`**:
  - `name`: AIremover
  - `url`: `https://airemover.online/`
  - `description`: Fast, simple and privacy-focused AI tag and metadata removal tool.
- **`WebApplication`**:
  - `applicationCategory`: MultimediaApplication
  - `operatingSystem`: All
  - `browserRequirements`: Requires JavaScript. Requires HTML5 Canvas.
  - `offers`: Free (`price: 0, priceCurrency: USD`)
- **`FAQPage`**:
  - Contains exact, visible questions and answers relating to AI metadata, C2PA Content Credentials, privacy, and file handling.
  - *No fake ratings, no fake reviews, no deceptive pricing.*

---

## 4. Google Search Console Setup & Verification Steps

Follow these exact steps to verify domain ownership and expedite Google indexing:

### Step 1: Add Property in Google Search Console
1. Navigate to [Google Search Console](https://search.google.com/search-console).
2. Click **Add Property** in the left sidebar dropdown.
3. Choose one of two methods:
   - **Domain Property (Recommended):** Enter `airemover.online`. This covers `http`, `https`, `www`, and non-www automatically.
   - **URL Prefix Property:** Enter `https://airemover.online/`.

### Step 2: Verify Ownership
- **DNS TXT Record (For Domain Property):**
  1. Copy the TXT record provided by Google Search Console (e.g. `google-site-verification=...`).
  2. Log into your domain registrar / DNS provider (Namecheap, Cloudflare, GoDaddy, Google Domains, etc.).
  3. Add a new `TXT` record with:
     - **Name / Host:** `@`
     - **Value / Content:** Paste the Google verification string
     - **TTL:** Auto or 300
  4. Return to Search Console and click **Verify**.
- **HTML Tag Method (Alternative for URL Prefix):**
  - Add `<meta name="google-site-verification" content="YOUR_KEY" />` into the `<head>` of `index.html`.

### Step 3: Submit Your Sitemap
1. In Google Search Console, click **Sitemaps** in the left menu under *Indexing*.
2. In the "Add a new sitemap" input box, enter:
   ```text
   sitemap.xml
   ```
3. Click **Submit**.
4. Status should change to green **"Success"**. Googlebot will queue all 6 canonical pages for discovery and indexing.

### Step 4: URL Inspection & Instant Request Indexing
1. At the top of Google Search Console, locate the **Inspect any URL in "airemover.online"** search bar.
2. Enter the homepage URL: `https://airemover.online/`
3. Click **Test Live URL** to ensure Googlebot renders the page, discovers the H1 `AI Tag Remover`, reads the JSON-LD schemas, and receives HTTP status 200.
4. Click **Request Indexing**.
5. Repeat for any high-priority subpages:
   - `https://airemover.online/ai-tag-remover`
   - `https://airemover.online/ai-metadata-remover`
   - `https://airemover.online/ai-hyphen-remover`

---

## 5. Bing Webmaster Tools Setup

1. Open [Bing Webmaster Tools](https://www.bing.com/webmasters).
2. Choose **Import from Google Search Console** (one-click instant verification).
3. Under **Sitemaps**, verify `https://airemover.online/sitemap.xml` is present.
4. Use **URL Submission** to submit `https://airemover.online/` for immediate Bing indexing.
