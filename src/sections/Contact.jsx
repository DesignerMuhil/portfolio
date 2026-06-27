import "../styles/Contact.css";

/* ============================================================
   CONTACT DETAILS — placeholders, replace with your real info
============================================================ */
const EMAIL = "dezignermuhil@gmail.com"; // ← replace with your real email
const PHONE = "+91 93444 78374"; // ← replace with your real phone number
const LINKEDIN_URL = "https://www.linkedin.com/in/muhilarasan-m-a65b022a8?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"; // ← replace
const BEHANCE_URL = "https://www.behance.net/muhilarasan2"; // ← replace

const CONTACT_LINKS = [
  {
    label: "Email",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
  },
  {
    label: "Phone",
    value: PHONE,
    href: `tel:${PHONE.replace(/\s/g, "")}`,
  },
  {
    label: "LinkedIn",
    value: "Muhilarasan Manivannan", // ← replace with display text
    href: LINKEDIN_URL,
  },
  {
    label: "Behance",
    value: "muhilarasan", // ← replace with display text
    href: BEHANCE_URL,
  },
];

/* ============================================================
   CONTACT SECTION
============================================================ */
export default function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="container">
        <div className="section-header">
          <p className="mono section-label">CONTACT</p>
        </div>

        <p className="section-description">
          Open to UI/UX, Product Design, and UX Designer roles —
          let's talk about what you're building.
        </p>

        <div className="contact-cta-wrap">
          <a href={`mailto:${EMAIL}`} className="contact-cta">
            Say hello
            <span className="contact-cta-arrow">↗</span>
          </a>
          <p className="contact-cta-sub">{EMAIL}</p>
        </div>

        <div className="contact-links">
          {CONTACT_LINKS.map((link) => (
            <a
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="contact-link-card"
              key={link.label}
            >
              <span className="contact-link-label">{link.label}</span>
              <span className="contact-link-value">{link.value}</span>
            </a>
          ))}
        </div>

        <p className="contact-footer-note">
          © {new Date().getFullYear()} Muhilarasan Manivannan — built and designed solo.
        </p>
      </div>
    </section>
  );
}