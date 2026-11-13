import { site } from "@/config/site";
import { LegalPage } from "./LegalPage";

/**
 * [PLACEHOLDER] Template privacy policy. It describes how this website actually
 * processes data, but it is NOT legal advice — have it reviewed for your
 * jurisdiction (e.g. GDPR) before launch.
 */
export default function Privacy() {
  return (
    <LegalPage title="Privacy Policy" lines={["PRIVACY", "POLICY."]} description="How JXSTUDIO handles personal data submitted through this website.">
      <p className="note">Template — to be reviewed and completed before launch. Last updated: {site.privacyLastUpdated}.</p>

      <h2>1. Who we are</h2>
      <p>
        This website is operated by {site.legalName}. You can reach us at{" "}
        <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>. Full company details are listed in our Legal Notice.
      </p>

      <h2>2. What we collect</h2>
      <p>When you send an inquiry through our contact form, we collect:</p>
      <ul>
        <li>your full name and email address;</li>
        <li>your company name, service of interest, project description and budget range, if provided;</li>
        <li>the date and time of your submission and a one-way hashed version of your IP address, used only to prevent abuse.</li>
      </ul>

      <h2>3. Why we use it</h2>
      <p>
        We use this information only to respond to your inquiry and, where relevant, to prepare a proposal. The legal basis is
        your consent and our legitimate interest in answering requests you send us. We do not sell your data or use it for
        unrelated marketing.
      </p>

      <h2>4. Service providers</h2>
      <p>
        Inquiries are stored in a secured database hosted by Supabase and delivered to our inbox through a transactional email
        provider. [PLACEHOLDER — list the providers you use, their locations and the safeguards in place.]
      </p>

      <h2>5. How long we keep it</h2>
      <p>[PLACEHOLDER — e.g. “We keep inquiries for up to 24 months unless they lead to a working relationship.”]</p>

      <h2>6. Your rights</h2>
      <p>
        You may ask us to access, correct or delete your personal data, or withdraw your consent at any time, by emailing{" "}
        <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>. You also have the right to lodge a complaint with a data
        protection authority.
      </p>

      <h2>7. Cookies</h2>
      <p>
        This website does not use tracking or advertising cookies. [PLACEHOLDER — update this section if you add analytics.]
      </p>
    </LegalPage>
  );
}
