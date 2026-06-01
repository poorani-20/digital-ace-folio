import { useState } from "react";
import {
  Download, Mail, Github, Linkedin, Twitter, ArrowRight, MapPin, Phone,
  FileText, Award, GraduationCap, Briefcase, BookOpen, Trophy, Users, Palette,
  Code2, Sparkles, ExternalLink,
} from "lucide-react";
import { toast } from "sonner";
import { ThemeToggle } from "@/components/ThemeToggle";
import { supabase } from "@/integrations/supabase/client";
import portrait from "@/assets/portrait.jpg";
import {
  profile, stats, education, technicalSkills, softwareSkills, softSkills,
  projects, certifications, internships, research, achievements, workshops,
  extracurriculars, gallery, testimonials, blog,
} from "@/components/portfolio/data";

const navLinks = [
  ["About", "about"],
  ["Education", "education"],
  ["Skills", "skills"],
  ["Projects", "projects"],
  ["Experience", "experience"],
  ["Gallery", "gallery"],
  ["Contact", "contact"],
] as const;

export function Nav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/75 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#top" className="font-semibold text-heading tracking-tight">
          {profile.name.split(" ")[0]}<span className="text-primary">.</span>
        </a>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          {navLinks.map(([label, id]) => (
            <a key={id} href={`#${id}`} className="hover:text-primary transition-colors">{label}</a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium bg-primary text-primary-foreground py-2 px-3 rounded-md ring-1 ring-primary/20 hover:opacity-90 transition-opacity"
          >
            <Download className="size-4" />
            Resume
          </a>
        </div>
      </div>
    </nav>
  );
}

export function Hero() {
  return (
    <section id="top" className="py-20 lg:py-28 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div className="lg:col-span-7 animate-fade-up">
          <span className="text-primary text-sm font-medium tracking-widest uppercase mb-4 block">
            {profile.tagline}
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-heading leading-[1.05] text-balance mb-6 max-w-[20ch]">
            {profile.headline}
          </h1>
          <p className="text-lg text-foreground/80 leading-relaxed text-pretty max-w-[52ch] mb-8">
            {profile.intro}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a href="#projects" className="px-6 py-2.5 bg-surface text-heading text-sm font-medium rounded-md ring-1 ring-border hover:bg-surface-2 transition-colors inline-flex items-center gap-2">
              View Projects <ArrowRight className="size-4" />
            </a>
            <a href="#contact" className="px-6 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:opacity-90 transition-opacity inline-flex items-center gap-2">
              <Download className="size-4" /> Download CV
            </a>
            <div className="flex gap-3 ml-2">
              <a href={profile.socials.github} aria-label="GitHub" className="size-9 grid place-items-center rounded-md ring-1 ring-border text-muted-foreground hover:text-primary hover:ring-primary/40 transition-all">
                <Github className="size-4" />
              </a>
              <a href={profile.socials.linkedin} aria-label="LinkedIn" className="size-9 grid place-items-center rounded-md ring-1 ring-border text-muted-foreground hover:text-primary hover:ring-primary/40 transition-all">
                <Linkedin className="size-4" />
              </a>
              <a href={profile.socials.twitter} aria-label="Twitter" className="size-9 grid place-items-center rounded-md ring-1 ring-border text-muted-foreground hover:text-primary hover:ring-primary/40 transition-all">
                <Twitter className="size-4" />
              </a>
            </div>
          </div>
        </div>
        <div className="lg:col-span-5 animate-fade-up" style={{ animationDelay: "120ms" }}>
          <div className="relative">
            <div className="absolute -inset-4 bg-primary/10 blur-3xl rounded-full opacity-50" aria-hidden />
            <img
              src={portrait}
              alt={`${profile.name} portrait`}
              width={1080}
              height={1350}
              className="relative w-full aspect-[4/5] object-cover rounded-xl ring-1 ring-border"
            />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 border-y border-border py-8">
        {stats.map((s) => (
          <div key={s.label}>
            <div className="text-3xl font-semibold text-heading">{s.value}</div>
            <div className="text-[11px] uppercase tracking-widest text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SectionHeading({ kicker, title, desc }: { kicker: string; title: string; desc?: string }) {
  return (
    <div className="max-w-[42ch] mb-12">
      <span className="text-primary text-xs font-mono uppercase tracking-widest mb-3 block">{kicker}</span>
      <h2 className="text-3xl sm:text-4xl font-semibold text-heading mb-3">{title}</h2>
      {desc && <p className="text-foreground/70 text-pretty">{desc}</p>}
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading kicker="01 / About" title="A glimpse into who I am." />
        <div className="grid lg:grid-cols-2 gap-12">
          <p className="text-foreground/80 leading-relaxed text-lg text-pretty">
            I'm a dedicated Electronics &amp; Communication Engineering student at Sona College of
            Technology, Salem. I work across Digital Electronics, Embedded Systems, Signal Processing,
            IoT and VLSI Design — and enjoy turning theory into working hardware and software.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {[
              ["Areas of interest", "VLSI, Embedded Systems, IoT, DSP"],
              ["Strengths", "Problem solving, fast learning"],
              ["Future goal", "Core ECE / Embedded engineering role"],
              ["Currently", "Open to internships & projects"],
            ].map(([h, b]) => (
              <div key={h} className="glass rounded-lg p-4">
                <div className="text-[11px] uppercase tracking-widest text-muted-foreground mb-1">{h}</div>
                <div className="text-sm text-heading font-medium">{b}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Education() {
  return (
    <section id="education" className="py-24 px-6 bg-surface/40">
      <div className="max-w-6xl mx-auto">
        <SectionHeading kicker="02 / Academic path" title="Education timeline." desc="Formal training across school, higher secondary, and undergraduate engineering." />
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4 hidden lg:block">
            <GraduationCap className="size-12 text-primary mb-4" />
            <p className="text-sm text-muted-foreground max-w-[34ch]">
              Anchored in fundamentals, with active research in mechatronics and computational engineering.
            </p>
          </div>
          <div className="lg:col-span-8 space-y-10 border-l border-border pl-8 ml-2 relative">
            {education.map((e) => (
              <div key={e.title} className="relative">
                <div className={`absolute -left-[37px] top-1.5 size-4 rounded-full bg-background ring-2 ${e.active ? "ring-primary" : "ring-border"}`} />
                <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                  <h3 className="font-medium text-heading">{e.title}</h3>
                  <span className={`text-xs font-mono px-2 py-1 rounded ${e.active ? "text-primary bg-primary/10" : "text-muted-foreground bg-surface"}`}>
                    {e.period}
                  </span>
                </div>
                <p className="text-sm text-foreground/80 mb-1">{e.org}</p>
                <p className="text-xs text-muted-foreground">{e.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Skills() {
  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading kicker="03 / Capabilities" title="Skills & toolkit." desc="Technical depth in engineering systems, with day-to-day fluency in modern tooling." />

        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 space-y-5">
            {technicalSkills.map((s) => (
              <div key={s.name}>
                <div className="flex justify-between text-xs font-mono uppercase tracking-wider mb-2">
                  <span className="text-heading">{s.name}</span>
                  <span className="text-primary">{s.level}%</span>
                </div>
                <div className="h-1.5 w-full bg-surface rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full animate-grow-x" style={{ width: `${s.level}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="glass rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Code2 className="size-4 text-primary" />
                <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Software & Tools</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {softwareSkills.map((t) => (
                  <span key={t} className="px-2.5 py-1 text-xs bg-surface ring-1 ring-border rounded-md text-heading">{t}</span>
                ))}
              </div>
            </div>
            <div className="glass rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="size-4 text-primary" />
                <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Soft Skills</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {softSkills.map((t) => (
                  <span key={t} className="px-2.5 py-1 text-xs bg-surface ring-1 ring-border rounded-md text-heading">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Projects() {
  const cats = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="projects" className="py-24 px-6 bg-surface/40">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
          <div className="max-w-[42ch]">
            <span className="text-primary text-xs font-mono uppercase tracking-widest mb-3 block">04 / Selected work</span>
            <h2 className="text-3xl sm:text-4xl font-semibold text-heading mb-3">Technical case studies.</h2>
            <p className="text-foreground/70 text-pretty">End-to-end hardware and software integration projects developed during academic labs and independent research.</p>
          </div>
          <div className="flex gap-1 p-1 bg-surface rounded-lg ring-1 ring-border">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${active === c ? "bg-surface-2 text-heading" : "text-muted-foreground hover:text-foreground"}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <article key={p.title} className="group bg-card rounded-xl p-4 ring-1 ring-border hover:ring-primary/40 transition-all">
              <div className="relative w-full aspect-[4/3] rounded-lg mb-4 overflow-hidden ring-1 ring-border">
                <img src={p.img} alt={p.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <h3 className="font-medium text-heading mb-2">{p.title}</h3>
              <p className="text-sm text-foreground/75 leading-relaxed mb-4">{p.desc}</p>
              <div className="flex gap-2 flex-wrap mb-4">
                {p.tags.map((t) => (
                  <span key={t} className="px-2 py-0.5 text-[10px] bg-surface ring-1 ring-border rounded text-muted-foreground">{t}</span>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <a href={p.demo} className="text-xs font-medium text-primary inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Live demo <ExternalLink className="size-3" />
                </a>
                <a href={p.github} aria-label="GitHub" className="text-muted-foreground hover:text-primary transition-colors">
                  <Github className="size-4" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Experience() {
  if (internships.length === 0 && research.length === 0 && achievements.length === 0) return null;
  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16">
        {internships.length > 0 && (
          <div>
            <SectionHeading kicker="05 / Industry" title="Internships & training." />
            <div className="space-y-6">
              {internships.map((i) => (
                <div key={i.company} className="glass rounded-xl p-5">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <div className="font-medium text-heading">{i.role}</div>
                      <div className="text-sm text-foreground/70">{i.company}</div>
                    </div>
                    <span className="text-xs font-mono text-muted-foreground whitespace-nowrap">{i.period}</span>
                  </div>
                  <p className="text-sm text-foreground/70 leading-relaxed">{i.learned}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className={internships.length === 0 ? "lg:col-span-2" : ""}>
          {research.length > 0 && (
            <>
              <SectionHeading kicker="06 / Research" title="Publications & papers." />
              <div className="space-y-4 mb-12">
                {research.map((r) => (
                  <div key={r.title} className="glass rounded-xl p-5 flex items-start gap-4">
                    <BookOpen className="size-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-heading text-sm leading-snug">{r.title}</div>
                      <div className="text-xs text-muted-foreground mt-1">{r.venue} • {r.type}</div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {achievements.length > 0 && (
            <>
              <SectionHeading kicker="07 / Recognition" title="Achievements & awards." />
              <div className="grid grid-cols-1 gap-3">
                {achievements.map((a) => (
                  <div key={a} className="flex items-start gap-3 p-3 rounded-lg bg-surface/60 ring-1 ring-border">
                    <Trophy className="size-4 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground/85">{a}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export function Certifications() {
  const cats = ["All", ...Array.from(new Set(certifications.map((c) => c.category)))];
  const [active, setActive] = useState("All");
  const list = active === "All" ? certifications : certifications.filter((c) => c.category === active);

  return (
    <section id="certifications" className="py-24 px-6 bg-surface/40">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
          <div className="max-w-[42ch]">
            <span className="text-primary text-xs font-mono uppercase tracking-widest mb-3 block">08 / Credentials</span>
            <h2 className="text-3xl sm:text-4xl font-semibold text-heading mb-3">Certifications.</h2>
          </div>
          <div className="flex gap-1 p-1 bg-surface rounded-lg ring-1 ring-border flex-wrap">
            {cats.map((c) => (
              <button key={c} onClick={() => setActive(c)} className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${active === c ? "bg-surface-2 text-heading" : "text-muted-foreground hover:text-foreground"}`}>
                {c}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map((c) => (
            <div key={c.name} className="bg-card ring-1 ring-border rounded-xl p-5 hover:ring-primary/40 transition-all">
              <Award className="size-5 text-primary mb-3" />
              <div className="font-medium text-heading text-sm leading-snug mb-1">{c.name}</div>
              <div className="text-xs text-muted-foreground">{c.org} • {c.date}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Activities() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16">
        <div>
          <SectionHeading kicker="09 / Beyond class" title="Workshops & seminars." />
          <div className="space-y-3">
            {workshops.map((w) => (
              <div key={w.name} className="flex items-start justify-between gap-4 p-4 glass rounded-lg">
                <div>
                  <div className="font-medium text-heading text-sm">{w.name}</div>
                  <div className="text-xs text-muted-foreground">{w.org}</div>
                </div>
                <span className="text-xs font-mono text-muted-foreground whitespace-nowrap">{w.date}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <SectionHeading kicker="10 / Community" title="Extracurricular activities." />
          <div className="grid grid-cols-1 gap-3">
            {extracurriculars.map((e) => (
              <div key={e} className="flex items-start gap-3 p-4 glass rounded-lg">
                <Users className="size-4 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-foreground/85">{e}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Gallery() {
  return (
    <section id="gallery" className="py-24 px-6 bg-surface/40">
      <div className="max-w-6xl mx-auto">
        <SectionHeading kicker="11 / Creative" title="Art & creative gallery." desc="Sketches, renders, and design experiments outside the engineering desk." />
        <div className="columns-2 md:columns-3 gap-4 [&>*]:mb-4">
          {gallery.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Creative work ${i + 1}`}
              loading="lazy"
              className="w-full rounded-lg ring-1 ring-border break-inside-avoid hover:opacity-90 transition-opacity"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  if (testimonials.length === 0) return null;
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading kicker="12 / Voices" title="Testimonials." />
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <figure key={t.name} className="glass rounded-xl p-6">
              <blockquote className="text-foreground/85 leading-relaxed text-pretty">"{t.quote}"</blockquote>
              <figcaption className="mt-5 text-sm">
                <div className="font-medium text-heading">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Blog() {
  if (blog.length === 0) return null;
  return (
    <section id="blog" className="py-24 px-6 bg-surface/40">
      <div className="max-w-6xl mx-auto">
        <SectionHeading kicker="13 / Writing" title="From the blog." desc="Notes on engineering workflows, learning, and career experiments." />
        <div className="grid md:grid-cols-3 gap-6">
          {blog.map((b) => (
            <a key={b.title} href="#" className="group bg-card ring-1 ring-border rounded-xl p-6 hover:ring-primary/40 transition-all block">
              <div className="text-xs font-mono text-muted-foreground mb-3">{b.date} • {b.read}</div>
              <h3 className="font-medium text-heading group-hover:text-primary transition-colors mb-4 leading-snug">{b.title}</h3>
              <span className="text-xs font-medium text-primary inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                Read article <ArrowRight className="size-3" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Resume() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto glass rounded-2xl p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="size-12 grid place-items-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/20">
            <FileText className="size-5" />
          </div>
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1">14 / Document</div>
            <h2 className="text-2xl font-semibold text-heading mb-1">Resume / CV</h2>
            <p className="text-sm text-foreground/70 max-w-[50ch]">Full résumé with detailed coursework, project breakdowns, and references.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <a href="#" className="px-5 py-2.5 bg-surface ring-1 ring-border rounded-md text-sm font-medium hover:bg-surface-2 transition-colors inline-flex items-center gap-2">
            <ExternalLink className="size-4" /> Preview
          </a>
          <a href="#" className="px-5 py-2.5 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:opacity-90 transition-opacity inline-flex items-center gap-2">
            <Download className="size-4" /> Download PDF
          </a>
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  const [submitting, setSubmitting] = useState(false);
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const message = String(fd.get("message") || "").trim();
    if (!name || !email || !message) return;
    setSubmitting(true);
    const { error } = await supabase.from("contact_messages").insert({ name, email, message });
    setSubmitting(false);
    if (error) { toast.error("Couldn't send message. Please try again."); return; }
    toast.success("Thanks! I'll get back to you shortly.");
    e.currentTarget.reset();
  }
  return (
    <section id="contact" className="py-24 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
        <div>
          <SectionHeading kicker="15 / Get in touch" title="Let's build something." desc="Open to internships, core ECE roles, and collaborative projects." />
          <div className="space-y-3 mb-8">
            <a href={`mailto:${profile.email}`} className="flex items-center gap-3 text-sm font-mono text-foreground/85 hover:text-primary transition-colors">
              <Mail className="size-4 text-primary" /> {profile.email}
            </a>
            <div className="flex items-center gap-3 text-sm font-mono text-foreground/85">
              <Phone className="size-4 text-primary" /> {profile.phone}
            </div>
            <div className="flex items-center gap-3 text-sm font-mono text-foreground/85">
              <MapPin className="size-4 text-primary" /> {profile.location}
            </div>
          </div>
          <div className="flex gap-3">
            <a href={profile.socials.github} className="size-10 grid place-items-center rounded-md ring-1 ring-border text-muted-foreground hover:text-primary hover:ring-primary/40 transition-all"><Github className="size-4" /></a>
            <a href={profile.socials.linkedin} className="size-10 grid place-items-center rounded-md ring-1 ring-border text-muted-foreground hover:text-primary hover:ring-primary/40 transition-all"><Linkedin className="size-4" /></a>
            <a href={profile.socials.twitter} className="size-10 grid place-items-center rounded-md ring-1 ring-border text-muted-foreground hover:text-primary hover:ring-primary/40 transition-all"><Twitter className="size-4" /></a>
          </div>
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); alert("Thanks! I'll get back to you shortly."); }}
          className="glass rounded-2xl p-6 space-y-4"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-[11px] uppercase tracking-widest text-muted-foreground">Name</span>
              <input required maxLength={100} className="mt-1 w-full bg-surface ring-1 ring-border rounded-md px-3 py-2 text-sm focus:ring-primary outline-none transition" placeholder="Your name" />
            </label>
            <label className="block">
              <span className="text-[11px] uppercase tracking-widest text-muted-foreground">Email</span>
              <input required type="email" maxLength={255} className="mt-1 w-full bg-surface ring-1 ring-border rounded-md px-3 py-2 text-sm focus:ring-primary outline-none transition" placeholder="you@email.com" />
            </label>
          </div>
          <label className="block">
            <span className="text-[11px] uppercase tracking-widest text-muted-foreground">Message</span>
            <textarea required maxLength={1000} rows={5} className="mt-1 w-full bg-surface ring-1 ring-border rounded-md px-3 py-2 text-sm focus:ring-primary outline-none transition resize-none" placeholder="Tell me about the role or project..." />
          </label>
          <button type="submit" className="w-full py-3 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:opacity-90 transition-opacity inline-flex items-center justify-center gap-2">
            Send message <ArrowRight className="size-4" />
          </button>
        </form>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="py-10 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
        <span>© {new Date().getFullYear()} {profile.name}. All rights reserved.</span>
        <div className="flex gap-6">
          <a href="#about" className="hover:text-primary">About</a>
          <a href="#projects" className="hover:text-primary">Projects</a>
          <a href="#contact" className="hover:text-primary">Contact</a>
        </div>
      </div>
    </footer>
  );
}
