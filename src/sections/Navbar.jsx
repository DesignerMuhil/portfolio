import { useState } from "react";
import ScanOverlay from "./ScanOverlay";
import "../styles/Navbar.css";

function Navbar() {
  const [scanActive, setScanActive] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogoClick = () => {
    setScanActive(true);
    setMenuOpen(false);
    setTimeout(() => {
      document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
    }, 300);
    setTimeout(() => {
      setScanActive(false);
    }, 1400);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <ScanOverlay active={scanActive} />

      <nav className="navbar">
        <div className="navbar-container">

          <button className="navbar-logo" onClick={handleLogoClick}>
            M.
          </button>

          <div className="navbar-right">
            <div className="navbar-status">
              <span className="status-dot"></span>
              <span>OPEN TO WORK</span>
            </div>
            <a href="#about">About</a>
            <a href="#projects">Cases</a>
            <a href="#contact">Contact</a>
            <a href="/resume.pdf" download="Muhilarasan-Manivannan-Resume.pdf" className="resume-btn">Resume ↗</a>
          </div>

          <button className={`hamburger ${menuOpen ? "hamburger--open" : ""}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            <span></span>
            <span></span>
            <span></span>
          </button>

        </div>
      </nav>

      <div className={`mobile-menu ${menuOpen ? "mobile-menu--open" : ""}`}>
        <div className="mobile-menu-inner">
          <div className="mobile-status">
            <span className="status-dot"></span>
            <span>OPEN TO WORK</span>
          </div>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#projects" onClick={closeMenu}>Cases</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
          <a href="/resume.pdf" download="Muhilarasan-Manivannan-Resume.pdf" onClick={closeMenu} className="mobile-resume-btn">Resume ↗</a>
        </div>
      </div>
    </>
  );
}

export default Navbar;