import "../styles/About.css";

/* ============================================================
   DATA
============================================================ */

const SKILL_GROUPS = [
  {
    label: "Strong",
    skills: [
      "Wireframing",
      "Design Systems",
      "Interaction Design",
      "UI Visual Design",
      "User Flows & Journey Mapping",
      "Prototyping",
    ],
    level: 5,
  },
  {
    label: "Good",
    skills: [
      "UX Research",
      "Usability Testing",
      "Accessibility (WCAG AA)",
      "UX Writing & Microcopy",
      "Heuristic Evaluation",
    ],
    level: 4,
  },
  {
    label: "Learning",
    skills: ["ReactJS", "Vibe Coding", "Java (basics)"],
    level: 2,
  },
];

const TOOL_GROUPS = [
  {
    label: "Design",
    tools: ["Figma", "Photoshop", "After Effects", "Canva", "Sketch (learning)"],
  },
  {
    label: "Research & Testing",
    tools: ["Hotjar", "Maze", "UserBrain"],
  },
  {
    label: "Collaboration & Planning",
    tools: ["Miro", "Notion"],
  },
  {
    label: "Dev Handoff",
    tools: ["Figma Dev Mode", "Git (basic)"],
  },
];

const OFFDUTY_GROUPS = [
  {
    label: "Sports i love to watch",
    items: ["Football ", "Cricket", "Boxing", "Kabaddi"],
  },
  {
    label: "Gaming",
    items: ["FC25 — Division 1", "Clash of Clans — TH13"],
  },
  {
    label: "Favorite Anime",
    items: ["Death Note", "Attack on Titan", "Black Clover"],
  },
  {
    label: "Favorite Shows",
    items: ["Game of Thrones", "Dark", "Vikings"],
  },
];

/* ============================================================
   SKILL DOT RATING
============================================================ */
function SkillDots({ level, max = 5 }) {
  return (
    <div className="about-skill-dots">
      {Array.from({ length: max }).map((_, i) => (
        <span
          key={i}
          className={`about-skill-dot ${i < level ? "is-filled" : ""}`}
        />
      ))}
    </div>
  );
}

/* ============================================================
   ABOUT SECTION
============================================================ */
export default function About() {
  return (
    <section className="about" id="about">
      <div className="container">
        <div className="section-header">
          <p className="mono section-label">ABOUT</p>

          <h2 className="section-title">
            Engineering background. Design instincts.
          </h2>

          <p className="section-description">
            A working snapshot of who I am, what I've studied, and how
            I spend my time — both on screen and off it.
          </p>
        </div>

        <div className="about-bento">
          {/* BIO */}
          <div className="about-tile about-tile--bio">
            <span className="about-tile-label">Bio</span>
            <p className="about-bio-name">Muhilarasan Manivannan</p>
            <p className="about-bio-role">UX & Product Designer · Coimbatore, Tamil Nadu</p>
            <p className="about-bio-body">
              I come from an engineering background —{" "}
              <strong>B.Tech in Information Technology</strong> — which
              means I think in systems, not just screens. That's the
              edge I bring to a team: tighter collaboration with
              developers, and design decisions that hold up once they
              hit real constraints.
            </p>

            <div className="about-philosophy">
              <span className="about-philosophy-split">
                51<span>/</span>49
              </span>
              <span className="about-philosophy-text">
                UX over UI — function first, form right behind it.
              </span>
            </div>
          </div>

          {/* EDUCATION */}
          <div className="about-tile about-tile--education">
            <span className="about-tile-label">Education</span>
            <p className="about-edu-degree">
              B.Tech, Information Technology
            </p>
            <p className="about-edu-meta">
              KSRIET · 2025 · CGPA 7.52
            </p>

            <span className="about-edu-certs-label">Certifications</span>
            <div className="about-chip-row">
              <span className="about-chip">Design Thinking — IBM</span>
              <span className="about-chip">UX Design — Accenture</span>
              <span className="about-chip">UI/UX Design — IBM</span>
            </div>
          </div>

          {/* SKILLS */}
          <div className="about-tile about-tile--skills">
            <span className="about-tile-label">Skills</span>
            <div className="about-skills-groups">
              {SKILL_GROUPS.map((group) => (
                <div key={group.label}>
                  <p className="about-skill-group-label">{group.label}</p>
                  {group.skills.map((skill) => (
                    <div className="about-skill-row" key={skill}>
                      <span className="about-skill-name">{skill}</span>
                      <SkillDots level={group.level} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* STAT — Projects */}
          <div className="about-tile about-tile--stat-projects">
            <span className="about-tile-label">Projects</span>
            <div className="about-stat-num">
              5<span>+</span>
            </div>
            <span className="about-stat-label">In-depth case studies</span>
            <p className="about-stat-sub">
              Plus 10+ practice and exploratory screens
            </p>
          </div>

          {/* STAT — Languages */}
          <div className="about-tile about-tile--stat-languages">
            <span className="about-tile-label">Languages</span>
            <div className="about-stat-num">3</div>
            <span className="about-stat-label">Spoken</span>
            <p className="about-stat-sub">
              Tamil (native) · English (fluent) · Malayalam (learning)
            </p>
          </div>

          {/* STAT — Leadership */}
          <div className="about-tile about-tile--stat-leadership">
            <span className="about-tile-label">Leadership</span>
            <p className="about-edu-degree">
              Vice President, Foreign Language Club
            </p>
            <p className="about-stat-sub">
              Organised multiple internal college events
            </p>
          </div>

          {/* TOOLS */}
          <div className="about-tile about-tile--tools">
            <span className="about-tile-label">Tools</span>
            <div className="about-tools-grid">
              {TOOL_GROUPS.map((group) => (
                <div key={group.label}>
                  <p className="about-tools-group-label">{group.label}</p>
                  <div className="about-chip-row">
                    {group.tools.map((tool) => (
                      <span className="about-chip" key={tool}>
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* OFF DUTY */}
          <div className="about-tile about-tile--offduty">
            <span className="about-tile-label">Off Duty</span>
            <div className="about-offduty-groups">
              {OFFDUTY_GROUPS.map((group) => (
                <div key={group.label}>
                  <p className="about-offduty-label">{group.label}</p>
                  <div className="about-chip-row">
                    {group.items.map((item) => (
                      <span className="about-chip" key={item}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}