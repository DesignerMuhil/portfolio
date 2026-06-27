import "../styles/Experience.css";
import { Link } from "react-router-dom";

function Experience() {
  return (
    <section className="experience">
      <div className="container">

        <div className="section-header">
          <p className="mono section-label">
            PROFESSIONAL EXPERIENCE
          </p>

          <h2 className="section-title">
            Real products. Real constraints.
            Real outcomes.
          </h2>

          <p className="section-description">
            Product design work completed at
            Neuronest AI. Certain interfaces
            remain confidential, but the
            process, decisions, and measurable
            outcomes are shared below.
          </p>
        </div>

        {/* Unique class prefix added here to prevent style bleeding */}
        <div className="exp-timeline">

          <div className="exp-timeline-item">
            <div className="exp-timeline-dot"></div>

            <div className="exp-timeline-content">
              <p className="exp-timeline-company">
                Neuronest AI Pvt Ltd, Coimbatore June 2025 – December 2025
              </p>

              <h3>Diginest 2.0</h3>

              <p className="exp-timeline-tag">
                Enterprise SaaS • Confidential
              </p>

              <p>
                Led the redesign of Diginest 2.0
                into a scalable SaaS platform,
                improving usability, structure,
                and consistency across 14 modules.
              </p>

              <div className="exp-timeline-outcome">
                <span>89% Task Success</span>
                <span>+78.5 SUS Score</span>
                <span>30–40% Faster Tasks</span>
              </div>

              <Link to="/experience/diginest" className="case-btn">
                Open Case File →
              </Link>
            </div>
          </div>

          <div className="exp-timeline-item">
            <div className="exp-timeline-dot"></div>

            <div className="exp-timeline-content">
              <p className="exp-timeline-company">
                Neuronest AI Pvt Ltd
              </p>

              <h3>JuristBot AI</h3>

              <p className="exp-timeline-tag">
                AI Product • Confidential
              </p>

              <p>
                Simplified complex legal workflows
                through improved onboarding,
                navigation systems, and guided
                interactions.
              </p>

              <div className="exp-timeline-outcome">
                <span>100% Flow Success</span>
                <span>8.6/10 UX Score</span>
                <span>8.3/10 Ease Of Use</span>
              </div>

              <Link to="/experience/juristbot" className="case-btn">
                Open Case File →
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Experience;