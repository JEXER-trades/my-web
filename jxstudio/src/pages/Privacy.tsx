import { site } from "@/config/site";
import { LegalPage } from "./LegalPage";

/**
 * Privacy policy, based on the existing jxstudio.de policy and updated for how
 * this website processes data (Netlify hosting + Netlify Forms, self-hosted fonts).
 * Not legal advice — have it reviewed.
 */
export default function Privacy() {
  const { contact } = site;
  const mail = <a href={`mailto:${contact.email}`}>{contact.email}</a>;
  return (
    <LegalPage title="Privacy Policy" lines={["PRIVACY", "POLICY."]} description="How Jxstudio processes personal data on this website (GDPR).">
      <p className="note">Last updated: {site.privacyLastUpdated}</p>

      <h2>1. Controller</h2>
      <p>
        {site.legalName}, Owner: {site.owner}
        <br />
        {contact.address.join(", ")}
        <br />
        Email: {mail}
      </p>

      <h2>2. General</h2>
      <p>
        Protecting your personal data matters to us. We process personal data only within the scope of the law, in particular
        the General Data Protection Regulation (GDPR). This website does not use cookies or any analytics or tracking tools.
      </p>

      <h2>3. Hosting</h2>
      <p>
        When you visit this website, our hosting provider automatically processes technical data (server log files), such as
        your IP address, the date and time of access, the page requested, browser type and operating system. This is technically
        necessary to deliver the website and keep it secure. The legal basis is Art. 6(1)(f) GDPR (legitimate interest in secure
        and stable operation). This website is hosted by Netlify, Inc., 512 2nd Street, Suite 200, San Francisco, CA 94107,
        USA. Data may be transferred to the USA on the basis of the EU-US Data Privacy Framework or the EU Standard Contractual
        Clauses.
      </p>

      <h2>4. Contact form and email</h2>
      <p>
        If you contact us through the contact form or by email, we process the details you provide (name, email address,
        company, service of interest, project description and budget range, if given) in order to respond to your inquiry. The
        legal basis is Art. 6(1)(b) GDPR (pre-contractual measures) and Art. 6(1)(f) GDPR (legitimate interest in answering
        inquiries). We delete the data once it is no longer needed and no statutory retention obligations apply.
      </p>
      <p>
        Form submissions are processed and stored by our hosting provider, Netlify, Inc. (see section 3), using its Netlify
        Forms service, and forwarded to us by email. To protect against spam, submissions may be checked by Akismet (Automattic
        Inc.). Data may be transferred to the USA; such transfers are based on the EU-US Data Privacy Framework or the EU
        Standard Contractual Clauses.
      </p>

      <h2>5. Fonts</h2>
      <p>The fonts on this website are hosted on our own server. No connection to Google or other font providers is made.</p>

      <h2>6. Your rights</h2>
      <p>You have the right at any time to:</p>
      <ul>
        <li>access the data we hold about you (Art. 15 GDPR);</li>
        <li>have inaccurate data corrected (Art. 16 GDPR);</li>
        <li>have your data deleted (Art. 17 GDPR);</li>
        <li>restrict processing (Art. 18 GDPR);</li>
        <li>data portability (Art. 20 GDPR);</li>
        <li>object to processing (Art. 21 GDPR).</li>
      </ul>
      <p>To exercise these rights, simply email us at {mail}.</p>

      <h2>7. Right to lodge a complaint</h2>
      <p>
        You have the right to lodge a complaint with a data protection supervisory authority, in particular in the federal state
        where you live or where we are based.
      </p>
    </LegalPage>
  );
}
