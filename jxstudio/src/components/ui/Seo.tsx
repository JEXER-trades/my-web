import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { site } from "@/config/site";

/** Per-page title, description, canonical URL and Open Graph tags. */
export function Seo({ title, description = site.description, noindex }: { title?: string; description?: string; noindex?: boolean }) {
  const { pathname } = useLocation();
  const fullTitle = title ? `${title} — ${site.name}` : `${site.name} — We create what's next`;
  const url = `${site.url}${pathname === "/" ? "" : pathname}`;
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={`${site.url}/og-image.png`} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {noindex && <meta name="robots" content="noindex" />}
    </Helmet>
  );
}
