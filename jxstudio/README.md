# JXSTUDIO — Website

Marketing website for **JXSTUDIO & MANAGEMENT**.
Built with React, TypeScript, Vite, Tailwind CSS and Framer Motion, hosted on Netlify with Netlify Forms for the contact form. It uses the same stack as Lovable.

```bash
npm install
cp .env.example .env     # then fill in the values
npm run dev              # http://localhost:8080
npm run build            # production build in dist/ (also regenerates sitemap.xml)
```

## Editing content (no design changes needed)

| What | File |
| --- | --- |
| Company name, email, phone, address, social links, Impressum details | `src/config/site.ts` |
| Services (name, description, "includes" list, visual) | `src/content/services.ts` |
| Portfolio projects | `src/content/projects.ts` |
| Process steps and About principles | `src/content/process.ts` |
| Budget ranges in the form | `src/lib/inquiry.ts` |
| Privacy Policy / Legal Notice text | `src/pages/Privacy.tsx`, `src/pages/Legal.tsx` |

Anything marked `[PLACEHOLDER]` must be replaced before launch.

### Projects
The Work section shows four **concept projects**: demo websites for fictional businesses, hosted at `jxstudio.de/examples/…`.
Each one is labelled "Concept project" and links to its live demo. Their images are in `src/assets/projects/`.

To add real client work, copy an object in `src/content/projects.ts`, give it a unique `slug`, and leave out `label`
(or set your own). Import real images the same way the existing projects do. Use WebP exported at about 2400px wide.

### Imagery
The site ships with art-directed SVG light studies (`src/components/visuals/Visual.tsx`) instead of stock photography.
They are sharp at any size, weigh almost nothing, and never break. Every visual slot also accepts a real `image`.

## Design system

- **Colours** (in `tailwind.config.ts`): `ink #000`, `paper #FFF`, `mist #F5F5F7`, `stone #86868B`, `night #111`, `line #D2D2D7`.
- **Type:** Inter Tight for display and Inter for body, both self-hosted variable fonts. The fluid scale runs from `display-2xl` to `display-sm`, plus `lead` and `eyebrow`.
- **Motion:** one easing curve (`cubic-bezier(0.22,1,0.36,1)`). The primitives are in `src/components/ui/Reveal.tsx`: `Reveal`, `TextReveal`, `ImageReveal` and `Parallax`.
  `ScrollText` brightens words as you scroll. Lenis provides smooth scrolling. Every animation respects `prefers-reduced-motion`.
- **Rhythm:** sections alternate between light (`paper`/`mist`) and dark (`ink`/`night`). Each page tells the navigation which theme its hero uses with `useHeaderTheme("dark" | "light")`.

## Contact form (Netlify Forms)

The form is submitted to **Netlify Forms**, so there's no extra service or API key.
- Netlify finds the form at deploy time from the hidden copy in `index.html`. Keep its fields in sync with `src/lib/inquiry.ts`.
- Spam protection: the hidden honeypot field `website` plus Netlify's built-in Akismet filtering.
- The form is validated in the browser, and it shows success only when Netlify confirms it received the submission.
  Run locally with `npm run dev`, the form shows an error because there's no Netlify behind it. That's expected.

**After the first deploy:**
1. Netlify → **Forms** → enable form detection if it isn't already on, then redeploy.
2. **Site configuration → Forms → Form notifications → Add notification → Email notification**, and enter `soban.waris@jxstudio.de`.
3. Submit a test inquiry on the live site and check that it arrives.

## SEO
- Each page sets its own title, description, canonical URL and Open Graph and Twitter tags (`src/components/ui/Seo.tsx`).
- `public/sitemap.xml` and `public/robots.txt` are generated from `VITE_SITE_URL` by `npm run build`.
- The share image is in `public/og-image.png`.
- No structured data yet. Add `Organization` JSON-LD once the business details are confirmed.

## Deploying (Netlify)
1. In Netlify: **Add new site → Import from Git →** choose the `my-web` repo and this branch.
2. Set **Base directory** to `jxstudio`. The build command and publish folder come from `netlify.toml`.
3. Under **Site configuration → Environment variables** add `VITE_SITE_URL=https://jxstudio.de`.
4. Point the `jxstudio.de` domain at the new site (or swap it on your existing Netlify site).
