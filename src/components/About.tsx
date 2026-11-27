"use client";


export default function About() {
  return (
    <section id="about" className="section">
      <div className="max-w-[1000px] mx-auto px-6">
        <h2 className="font-[family-name:var(--font-sans)] text-[1.3rem] font-semibold mb-6 tracking-tight relative inline-block">
          About Me
          <span className="absolute -bottom-2 left-0 w-12 h-[3px] bg-[var(--color-accent)] rounded-full" />
        </h2>
        <p className="about-copy text-[0.95rem] leading-[1.8]">
          I'm <span className="about-highlight">Jm Laster D. Minguito</span>, a third-year IT student and developer. I build <span className="about-highlight">responsive web systems</span>, <span className="about-highlight">cross-platform mobile apps</span>, and <span className="about-highlight">IoT (Internet of Things) projects</span>.
        </p>
      </div>
    </section>
  );
}
