"use client";

export default function About() {
  return (
    <section id="about" className="section reveal">
      <div className="max-w-[1000px] mx-auto px-6">
        <h2 className="font-[family-name:var(--font-sans)] text-[1.3rem] font-semibold mb-6 tracking-tight relative inline-block">
          About Me
          <span className="absolute -bottom-2 left-0 w-12 h-[3px] bg-[var(--color-accent)] rounded-full" />
        </h2>
        <div className="reveal-sm" style={{ transitionDelay: "0.15s" }}>
          <p className="text-[0.95rem] text-[var(--color-text)] leading-[1.8] text-justify">
            I'm <span className="text-[var(--color-text)]">Jm Laster D. Minguito</span>, a third-year IT student and developer. I build <span className="text-[var(--color-text)]">responsive web systems</span>, <span className="text-[var(--color-text)]">cross-platform mobile apps</span>, and <span className="text-[var(--color-text)]">IoT (Internet of Things) projects</span>.
          </p>
        </div>
      </div>
    </section>
  );
}
