import { site } from "@/config/site";
import { LegalPage } from "./LegalPage";

/** [PLACEHOLDER] Legal notice / Impressum. Fill in every bracketed field in src/config/site.ts. */
export default function Legal() {
  const { legal, contact } = site;
  return (
    <LegalPage title="Legal Notice" lines={["LEGAL NOTICE", "/ IMPRESSUM."]} description="Legal notice and company information for JXSTUDIO.">
      <p className="note">Template — complete all bracketed details before launch.</p>

      <h2>Company</h2>
      <p>
        {site.legalName}
        <br />
        {contact.address.length ? contact.address.map((l) => <span key={l}>{l}<br /></span>) : "[Registered address]"}
      </p>

      <h2>Contact</h2>
      <p>
        Email: <a href={`mailto:${contact.email}`}>{contact.email}</a>
        {contact.phone && <><br />Phone: {contact.phone}</>}
      </p>

      <h2>Represented by</h2>
      <p>{legal.representative}</p>

      <h2>Registration</h2>
      <p>{legal.register}<br />{legal.vatId}</p>

      <h2>Responsible for content</h2>
      <p>{legal.responsibleForContent}</p>

      <h2>Liability for links</h2>
      <p>
        This website contains links to external websites over whose content we have no control. The respective provider or
        operator of the linked pages is always responsible for their content.
      </p>
    </LegalPage>
  );
}
