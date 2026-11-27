export default function Hero() {
  return (
    <section id="home" className="hero-section reference-hero">
      <div className="hero-identity-pill">
        <span>IT Student &amp; Developer</span>
        <span className="hero-pill-divider" />
        <span>Web · Mobile · IoT</span>
      </div>
      <h1 className="reference-hero-title">
        Ideas that work. <em>Products</em>
        <span>that make a difference.</span>
      </h1>
      <p className="reference-hero-description">
        I&apos;m Jm Laster D. Minguito  — I design and build responsive web systems, mobile apps, and IoT projects that solve real problems.
      </p>
      <a href="#projects" className="reference-hero-button">
        <span className="reference-hero-label">Explore my work</span>
        <span className="reference-hero-arrow" aria-hidden="true">→</span>
      </a>
    </section>
  );
}
