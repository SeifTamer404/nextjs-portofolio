import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Expertise from "@/components/sections/Expertise";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Hero />
      <Projects />
      <Experience />
      <Expertise />
      <Contact />
    </main>
  );
}
