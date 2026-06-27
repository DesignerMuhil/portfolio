import { useState } from "react";
import "../styles/ThemeToggle.css";

/* ============================================================
   THEME TOGGLE
   Flips a "light-mode" class on <body>. Every component reads
   color values from CSS variables defined in tokens.css, so
   this single class flip re-themes the entire site.

   No localStorage — always starts in dark mode on page load,
   per design decision.
============================================================ */
export default function ThemeToggle() {
  const [isLight, setIsLight] = useState(false);

  function handleToggle() {
    const next = !isLight;
    setIsLight(next);
    document.body.classList.toggle("light-mode", next);
  }

  return (
    <button
      className="theme-toggle"
      onClick={handleToggle}
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      title={isLight ? "Switch to dark mode" : "Switch to light mode"}
    >
      <span className="theme-toggle-icon">
        {/* Moon — shown in dark mode */}
        <svg
          className="icon-moon"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>

        {/* Sun — shown in light mode */}
        <svg
          className="icon-sun"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="4.5" />
          <path d="M12 2.5v3M12 18.5v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2.5 12h3M18.5 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
        </svg>
      </span>
    </button>
  );
}