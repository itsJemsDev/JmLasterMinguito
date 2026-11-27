"use client";

export default function Navbar() {
  const links = [
    ["#about", "About"], ["#stack", "Stack"], ["#projects", "Projects"],
    ["#experience", "Experience"], ["#education", "Education"],
  ];
  const openContact = () => window.dispatchEvent(new Event("open-contact-modal"));

  return (
    <nav className="reference-navbar sticky top-0 z-[100]">
      <div className="reference-navbar-inner">
        <a href="#home" className="navbar-brand-link"><img className="brand-profile" src="/profile.jpg" alt="Jems Dev profile" /> Jems Dev</a>
        <div className="reference-navbar-links" aria-label="Main navigation">
          {links.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
          <button type="button" onClick={openContact} className="navbar-contact-link">Get in Touch</button>
        </div>
        <button type="button" onClick={openContact} className="navbar-contact-link navbar-contact-mobile">Contact</button>
      </div>
    </nav>
  );
}
