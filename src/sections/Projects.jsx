import "../styles/Projects.css";

/* ============================================================
   IMAGES
   Drop your real thumbnails into src/assets/ using these exact
   filenames — thumb-1.png, thumb-2.png, thumb-3.png, thumb-4.png —
   and they'll appear automatically, no code changes needed.
============================================================ */
import thumb1 from "../assets/thumb-1.png";
import thumb2 from "../assets/thumb-2.png";
import thumb3 from "../assets/thumb-3.png";
import thumb4 from "../assets/thumb-4.png";

/* ============================================================
   PROJECT DATA — placeholder content, edit freely in VS Code
============================================================ */
const PROJECTS = [
  {
    kind: "Product Design",
    title: "BrandOS — A Decision-Driven AI Branding System",
    desc: "Simplifying branding through guided exploration and informed decision-making.",
    tags: ["UX Research", "UI Design", "Prototyping"],
    image: thumb1,
    filename: "thumb-1.png",
    link: "https://www.behance.net/gallery/246682941/BrandOS-A-Decision-Driven-AI-Branding-System",
  },
  {
    kind: "Product Design",
    title: "Spendly — A.I. Powered Financial Behaviour Tracker",
    desc: "Turning raw UPI transactions into actionable financial habits through thoughtful UX.",
    tags: ["Design Systems", "Mobile App"],
    image: thumb2,
    filename: "thumb-2.png",
    link: "https://www.behance.net/gallery/249557039/Spendly-AI-Powered-Financial-Behaviour-Tracker",
  },
  {
    kind: "Product Design",
    title: "TripGenie — AI-Powered Travel Planning App",
    desc: "Helping travelers discover, plan, and book with AI-powered guidance.",
    tags: ["Web App", "Interaction Design"],
    image: thumb3,
    filename: "thumb-3.png",
    link: "https://www.behance.net/gallery/226218371/TripGenie-Travel-partner-app-ft-AI",
  },
  {
    kind: "Graphic Design",
    title: "Graphic Design Gallery",
    desc: "A collection of posters, branding, and visual design work.",
    tags: ["Branding", "Visual Design", "Gallery"],
    image: thumb4,
    filename: "thumb-4.png",
    link: "https://www.behance.net/gallery/223794791/Social-Media-Graphics",
    isGallery: true,
  },
];

/* ============================================================
   PROJECT CARD
============================================================ */
function ProjectCard({ project }) {
  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className={`proj-card ${project.isGallery ? "proj-card--gallery" : ""}`}
    >
      <div className="proj-card-thumb-wrap" data-filename={project.filename}>
        <img
          className="proj-card-thumb"
          src={project.image}
          alt={project.title}
        />
        <div className="proj-card-view-overlay">
          <span className="proj-card-view-label">View on Behance</span>
        </div>
      </div>

      <div className="proj-card-body">
        <span className="proj-card-kind">{project.kind}</span>
        <p className="proj-card-title">{project.title}</p>
        <p className="proj-card-desc">{project.desc}</p>
        <div className="proj-card-tags">
          {project.tags.map((tag) => (
            <span className="proj-card-tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}

/* ============================================================
   PROJECTS SECTION
============================================================ */
export default function Projects() {
  return (
    <section className="projects" id="projects">
      <div className="container">
        <div className="section-header">
          <p className="mono section-label">PROJECTS</p>

          <h2 className="section-title">
            Selected work, hosted on Behance.
          </h2>

          <p className="section-description">
            A mix of product design case studies and graphic design
            exploration. Click through to see the full project.
          </p>
        </div>

        <div className="proj-grid">
          {PROJECTS.map((project) => (
            <ProjectCard project={project} key={project.title} />
          ))}
        </div>
      </div>
    </section>
  );
}