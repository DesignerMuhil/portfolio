import { useState } from "react";
import ScanOverlay from "./ScanOverlay";
import "../styles/Navbar.css";

function Navbar() {
  const [scanActive, setScanActive] = useState(false);

  const handleLogoClick = () => {
    setScanActive(true);

    setTimeout(() => {
      document.getElementById("hero")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 300);

    setTimeout(() => {
      setScanActive(false);
    }, 1400);
  };

  return (
    <>
      <ScanOverlay active={scanActive} />

      <nav className="navbar">
        <div className="navbar-container">

          <button
            className="navbar-logo"
            onClick={handleLogoClick}
          >
            M.
          </button>

          <div className="navbar-right">

            <div className="navbar-status">
              <span className="status-dot"></span>
              <span>OPEN TO WORK</span>
            </div>

            <a href="#about">
              About
            </a>

            <a href="#projects">
              Cases
            </a>

            <a href="#contact">
              Contact
            </a>

            <a
              href="/resume.pdf"
              download="Muhilarasan-Manivannan-Resume.pdf"
              className="resume-btn"
            >
              Resume ↗
            </a>

          </div>

        </div>
      </nav>
    </>
  );
}

export default Navbar;