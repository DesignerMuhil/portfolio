import "../styles/Hero.css";
import profileImage from "../assets/profile-pic.png";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="container">
        <div className="hero-content">

          <div className="hero-left">

            <motion.p
              className="mono hero-label"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              UX & Product Designer
            </motion.p>

            <motion.h1
              className="hero-title"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: "easeOut"
              }}
            >
              Assumptions are easy.
              <span>Understanding is earned.</span>
            </motion.h1>

            <motion.p
              className="hero-description"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 0.4,
                duration: 0.8
              }}
            >
              I'm Muhilarasan, a Product Designer focused on
              solving real problems through research, strategy,
              and thoughtful design. The evidence is always in
              the user experience.
            </motion.p>

            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.6,
                duration: 0.6
              }}
            >
              <Link to="/experience/diginest" className="case-btn-wrapper">
                  <button className="btn-primary">
                    View Case Files
                  </button>
                </Link>

              <a
                href="/resume.pdf"
                download="Muhilarasan-Manivannan-Resume.pdf"
                className="btn-secondary"
              >
                Resume
              </a>
            </motion.div>

          </div>

          <motion.div
            className="hero-right"
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 1,
              delay: 0.3
            }}
          >
            <img
              src={profileImage}
              alt="Muhilarasan"
              className="hero-image"
            />

          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default Hero;