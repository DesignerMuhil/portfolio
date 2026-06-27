import Navbar from "../sections/Navbar";
import Hero from "../sections/Hero";
import Experience from "../sections/Experience";
import Projects from "../sections/Projects";
import Contact from "../sections/Contact";
import "../styles/Navbar.css";
import "../styles/Hero.css";
import "../styles/Experience.css";
import About from "../sections/About";


function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Contact />
    </>
  );
}

export default Home;