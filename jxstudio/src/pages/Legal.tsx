import { site } from "@/config/site";
import { LegalPage } from "./LegalPage";

/** Legal notice (Impressum) per § 5 DDG. Details come from src/config/site.ts. */
export default function Legal() {
  const { legal, contact } = site;
  return (
    <LegalPage title="Legal Notice" lines={["LEGAL NOTICE", "/ IMPRESSUM."]} description="Legal notice (Impressum) for Jxstudio, Berlin.">
      <h2>Information pursuant to § 5 DDG</h2>
      <p>
        {site.legalName}
        <br />
        Owner: {site.owner}
        <br />
        {contact.address.map((l) => <span key={l}>{l}<br /></span>)}
      </p>

      <h2>Contact</h2>
      <p>
        Email: <a href={`mailto:${contact.email}`}>{contact.email}</a>
        {contact.phone && <><br />Phone: {contact.phone}</>}
      </p>

      {(legal.register || legal.vatId) && (
        <>
          <h2>Registration</h2>
          <p>{legal.register}{legal.register && legal.vatId && <br />}{legal.vatId}</p>
        </>
      )}

      <h2>Responsible for content pursuant to § 18 (2) MStV</h2>
      <p>{legal.responsibleForContent}</p>

      <h2>Consumer dispute resolution</h2>
      <p>We are neither willing nor obliged to participate in dispute resolution proceedings before a consumer arbitration board.</p>

      <h2>Liability for content</h2>
      <p>
        The content of these pages has been created with the greatest care. However, we cannot guarantee that it is accurate,
        complete or up to date. As a service provider, we are responsible for our own content on these pages under general law.
      </p>

      <h2>Liability for links</h2>
      <p>
        Our website may contain links to external third-party websites whose content we have no control over. The respective
        provider or operator of the linked pages is always responsible for their content. If we become aware of any legal
        violations, we will remove such links immediately.
      </p>

      <h2>Copyright</h2>
      <p>
        The content and works created by the site operator on these pages are subject to German copyright law. Reproduction,
        editing, distribution and any kind of use beyond the limits of copyright law require the written consent of the
        respective author.
      </p>
    </LegalPage>
  );
}
