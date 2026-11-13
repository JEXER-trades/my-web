# JXSTUDIO — Website

Marketing website for **JXSTUDIO & MANAGEMENT**.
Built with React, TypeScript, Vite, Tailwind CSS, Framer Motion and a Supabase backend for the contact form. It uses the same stack as Lovable.

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

### Adding a project
Copy one of the objects in `src/content/projects.ts`, give it a unique `slug`, and remove `placeholder: true`.
To use real photography, set `image` (and `gallery[].image`) to a URL or an imported file, e.g.
`import hero from "@/assets/projects/acme-hero.jpg"`. Use WebP/AVIF exported at about 2400px wide.
Projects marked as placeholders are set to `noindex` and are left out of the sitemap.

### Imagery
The site ships with art-directed SVG light studies (`src/components/visuals/Visual.tsx`) instead of stock photography.
They are sharp at any size, weigh almost nothing, and never break. Every visual slot also accepts a real `image`.

## Design system

- **Colours** (in `tailwind.config.ts`): `ink #000`, `paper #FFF`, `mist #F5F5F7`, `stone #86868B`, `night #111`, `line #D2D2D7`.
- **Type:** Inter Tight for display and Inter for body, both self-hosted variable fonts. The fluid scale runs from `display-2xl` to `display-sm`, plus `lead` and `eyebrow`.
- **Motion:** one easing curve (`cubic-bezier(0.22,1,0.36,1)`). The primitives are in `src/components/ui/Reveal.tsx`: `Reveal`, `TextReveal`, `ImageReveal` and `Parallax`.
  `ScrollText` brightens words as you scroll. Lenis provides smooth scrolling. Every animation respects `prefers-reduced-motion`.
- **Rhythm:** sections alternate between light (`paper`/`mist`) and dark (`ink`/`night`). Each page tells the navigation which theme its hero uses with `useHeaderTheme("dark" | "light")`.

## Contact form backend (Supabase + Resend)

The form posts to the Supabase Edge Function `send-inquiry`. The function:
1. Checks the origin (`ALLOWED_ORIGINS`) and the request size.
2. Applies spam protection: a hidden honeypot field, a minimum fill time, and a limit of 5 submissions per hashed IP per hour.
3. Validates every field on the server.
4. Stores the inquiry in `public.inquiries`. Row Level Security is on and there are no public policies, so nobody can read the table with the anon key.
5. Emails the inquiry to you through [Resend](https://resend.com), with `reply-to` set to the sender.

The site reports success only when the inquiry was actually stored or emailed. If the backend isn't configured, the form shows an error and offers the email address instead. It never shows a fake success.

### Setup
```bash
supabase link --project-ref YOUR-PROJECT
supabase db push                                   # creates the inquiries table
supabase secrets set \
  RESEND_API_KEY=re_xxx \
  INQUIRY_TO_EMAIL=hello@yourdomain.com \
  INQUIRY_FROM_EMAIL="JXSTUDIO Website <website@yourdomain.com>" \
  ALLOWED_ORIGINS=https://www.yourdomain.com,http://localhost:8080
supabase functions deploy send-inquiry --no-verify-jwt
```
Then set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in `.env` (or in your host's environment settings).
The sender domain must be verified in Resend. On Lovable, connect the Supabase integration and add the same secrets.

## SEO
- Each page sets its own title, description, canonical URL and Open Graph and Twitter tags (`src/components/ui/Seo.tsx`).
- `public/sitemap.xml` and `public/robots.txt` are generated from `VITE_SITE_URL` by `npm run build`.
- The share image is in `public/og-image.png`.
- No structured data yet. Add `Organization` JSON-LD once the business details are confirmed.

## Deploying
This is a static single-page app. `vercel.json` (Vercel) and `public/_redirects` (Netlify) route every path to `index.html` and set security and cache headers.
