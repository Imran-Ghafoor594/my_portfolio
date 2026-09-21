// Static site-wide links and navigation config.
// Update URLs here once — every section imports from this file.

export const EMAIL = "meimranghafoor@gmail.com";
export const GITHUB_USER = "Imran-Ghafoor594";
export const GITHUB_URL = `https://github.com/${GITHUB_USER}`;
export const LINKEDIN_URL = "https://linkedin.com/in/imranghafoor56";

export const RESUME_URL = "/resume/Imran%20Ghafoor.pdf";
export const NEUROFIVE_CERT_URL = "/certificates/neurofive-certificate.pdf";
export const DECODE_LABS_CERT_URL = "/certificates/decodelabs-certificate.pdf";
export const TEYZIX_CERT_URL = "/certificates/teyzixcore-certificate.pdf";
export const HACKTHONE_CERT_URL = "/certificates/hackathon-certificate.pdf";

export type NavLink = { id: string; label: string };

/** Desktop pill navigation. */
export const NAV_LINKS: NavLink[] = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

/** Mobile menu — same destinations, plus a way back to the hero. */
export const MOBILE_NAV_LINKS: NavLink[] = [{ id: "top", label: "Home" }, ...NAV_LINKS];
