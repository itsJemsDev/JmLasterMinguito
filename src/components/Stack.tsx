"use client";

const technologies = [
  "React", "TypeScript", "Next.js", "Tailwind CSS", "PHP", "Laravel",
  "React Native", "Flutter", "MySQL", "PostgreSQL", "Firebase", "Supabase",
  "Node.js", "Arduino", "ESP32", "Git",
];

export default function Stack() {
  return (
    <section id="stack" className="stack-marquee-section">
      <p>Built on</p>
      <div className="stack-marquee-window">
        <div className="stack-marquee-track">
          {[...technologies, ...technologies].map((technology, index) => (
            <span key={`${technology}-${index}`}>{technology}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
