import { createFileRoute } from "@tanstack/react-router";
import {
  Nav, Hero, About, Education, Skills, Projects, Certifications,
  Experience, Activities, Gallery, Testimonials, Resume, Blog, Contact, Footer,
} from "@/components/portfolio/sections";
import { profile } from "@/components/portfolio/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${profile.name} — ${profile.tagline}` },
      { name: "description", content: `${profile.name}'s portfolio: projects, research, certifications, and engineering work. ${profile.headline}` },
      { property: "og:title", content: `${profile.name} — ${profile.tagline}` },
      { property: "og:description", content: profile.headline },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        name: profile.name,
        jobTitle: profile.tagline,
        email: profile.email,
        address: profile.location,
        url: "/",
      }),
    }],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary-foreground">
      <Nav />
      <main>
        <Hero />
        <About />
        <Education />
        <Skills />
        <Projects />
        <Certifications />
        <Experience />
        <Activities />
        <Gallery />
        <Resume />
        <Testimonials />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
