import { Seo } from "@/components/ui/Seo";
import { useHeaderTheme } from "@/components/layout/HeaderTheme";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  useHeaderTheme("light");
  return (
    <>
      <Seo title="Page not found" noindex />
      <PageHero eyebrow="404" lines={["THIS PAGE", "ISN’T HERE."]} intro="The page you’re looking for has moved or never existed.">
        <div className="mt-12 flex gap-3 md:justify-end">
          <ButtonLink to="/" arrow>Back to home</ButtonLink>
          <ButtonLink to="/work" variant="secondary">See our work</ButtonLink>
        </div>
      </PageHero>
    </>
  );
}
