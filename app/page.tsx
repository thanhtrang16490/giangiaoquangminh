import Hero from "@/components/Hero";
import PriceTicker from "@/components/PriceTicker";
import Solutions from "@/components/Solutions";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Contact from "@/components/Contact";
import News from "@/components/News";

export default function Home() {
  return (
    <>
      <Hero />
      <PriceTicker />
      <Solutions />
      <Projects />
      <About />
      <News />
      <Contact />
    </>
  );
}
