import { useEffect, useRef, useState } from "react";
import "../styles/JuristBot.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import CardSwap, { Card } from "../Components/CardSwap";

import signup from "../assets/juristbot/signup.png";
import chatbot from "../assets/juristbot/chatbot.png";
import response from "../assets/juristbot/chat-response.png";
import profile from "../assets/juristbot/profile-settings.png";

function ReflectionBody() {
  const [trackRef, progress] = useScrollProgress();

  return (
    <div className="reflection-body" ref={trackRef}>
      <div className="lesson-list">
        {LESSONS.map((lesson) => (
          <ReflectionLesson key={lesson.num} lesson={lesson} />
        ))}
      </div>

      <div className="progress-rail">
        <div
          className="progress-fill"
          style={{ height: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
}

/* ============================================================
   useScrollProgress — tracks how far through a container
   the user has scrolled, as a 0–1 value
============================================================ */
function useScrollProgress() {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    function handleScroll() {
      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight;

      // Start filling when the container enters the bottom of the viewport,
      // finish filling when its bottom passes the top of the viewport.
      const total = rect.height + viewportH;
      const scrolled = viewportH - rect.top;
      const pct = Math.min(Math.max(scrolled / total, 0), 1);

      setProgress(pct);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return [ref, progress];
}

/* ============================================================
   REFLECTION — one lesson revealed at a time on scroll
============================================================ */
const LESSONS = [
  {
    num: "01",
    title: "Structure always comes before screens.",
    body: "Rebuilding the information architecture first meant every screen that followed had a clear, intentional purpose. No amount of beautiful UI fixes a broken structure underneath it.",
  },
  {
    num: "02",
    title: "Accessibility is the floor, not a finishing touch.",
    body: "Designing for Rajesh — 52, low to medium tech proficiency — improved the experience for everyone else too. Accessible design is just inclusive design with a deadline attached.",
  },
  {
    num: "03",
    title: "Real users will always break your assumptions.",
    body: "Internal testers carry bias, even when they're not advocates. Even five guerrilla sessions with real legal professionals would have surfaced richer, more honest signal than a clean internal score.",
  },
  {
    num: "04",
    title: "Tight timelines teach ruthless prioritization.",
    body: "Three weeks meant being ruthless about what mattered most. Saying no to scope creep turned out to be a design skill in its own right, not a failure of ambition.",
  },
];

function ReflectionLesson({ lesson }) {
  const [ref, inView] = useInView(0.4);

  return (
    <div className={`lesson-row ${inView ? "is-visible" : ""}`} ref={ref}>
      <span className="lesson-num">{lesson.num}</span>
      <div className="lesson-body">
        <h3 className="lesson-title">{lesson.title}</h3>
        <p className="lesson-text">{lesson.body}</p>
      </div>
    </div>
  );
}
/* ============================================================
   IMPACT BENTO
============================================================ */
function ImpactBento() {
  const [ref, inView] = useInView(0.3);

  const uxScore = useCountUp(86, inView); // displayed as 8.6
  const accessPct = useCountUp(90, inView);
  const frictionPct = useCountUp(71, inView);
  const flowSuccess = useCountUp(100, inView);

  

  return (
    <div className="impact-bento" ref={ref}>
      {/* Big headline score tile */}
      <div className="ib-card ib-score">
        <span className="ib-tag">Overall UX Score</span>
        <div className="ib-score-num">
          {(uxScore / 10).toFixed(1)}
          <span className="ib-score-unit">/10</span>
        </div>
        <p className="ib-score-desc">
          Up from 2/5 on the original audit — a 330% improvement, measured
          the same way the product was first scored broken.
        </p>
      </div>

      {/* Metric tiles */}
      <div className="ib-card ib-metric">
        <span className="ib-metric-num">{accessPct}%</span>
        <span className="ib-metric-label">Faster feature access</span>
        <span className="ib-metric-sub">30s → 3s</span>
      </div>

      <div className="ib-card ib-metric">
        <span className="ib-metric-num">{frictionPct}%</span>
        <span className="ib-metric-label">Less signup friction</span>
        <span className="ib-metric-sub">7 fields → 2 fields</span>
      </div>

      <div className="ib-card ib-metric">
        <span className="ib-metric-num">{flowSuccess}%</span>
        <span className="ib-metric-label">Success on 4 critical flows</span>
        <span className="ib-metric-sub">Sign-in, registration, feature & blog nav</span>
      </div>

      {/* Flow-test breakdown */}
      <div className="ib-card ib-flows">
        <span className="ib-tag">Maze AI · 12 testers · 8 flows</span>
        <div className="ib-flow-row">
          <span className="ib-flow-name">Chatbot interaction</span>
          <span className="ib-flow-stat ib-flow-stat--miss">33.3% drop-off</span>
          <span className="ib-flow-fix">→ added onboarding tooltip</span>
        </div>
        <div className="ib-flow-row">
          <span className="ib-flow-name">Profile setup</span>
          <span className="ib-flow-stat ib-flow-stat--miss">33% misclick</span>
          <span className="ib-flow-fix">→ redesigned label placement</span>
        </div>
        <div className="ib-flow-row">
          <span className="ib-flow-name">Subscription upgrade</span>
          <span className="ib-flow-stat ib-flow-stat--miss">13.6% misclick</span>
          <span className="ib-flow-fix">→ added static selection indicators</span>
        </div>
      </div>

      {/* Stakeholder quotes */}
      <div className="ib-card ib-quotes">
        <span className="ib-tag">Stakeholder Feedback</span>
        <div className="ib-quote-row">
          <span className="ib-quote-team">Engineering</span>
          <p className="ib-quote-text">Component system accelerated implementation.</p>
        </div>
        <div className="ib-quote-row">
          <span className="ib-quote-team">Sales</span>
          <p className="ib-quote-text">Product finally looked and felt premium.</p>
        </div>
        <div className="ib-quote-row">
          <span className="ib-quote-team">Customer Success</span>
          <p className="ib-quote-text">Predicted a meaningful drop in support tickets.</p>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   useInView — tiny IntersectionObserver hook
============================================================ */
function useInView(threshold = 0.35) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}

/* ============================================================
   01 — SIGNUP FLOW step pills
============================================================ */
function SignupStepPills() {
  const [ref, inView] = useInView(0.4);

  const oldFields = [
    "Name", "Password", "Confirm", "Mobile", "Role", "Referral", "Submit",
  ];
  const newSteps = ["Google OAuth", "Name + Mobile", "Role Card (Skipable)", "Personalize (Skipable)"];

  return (
    <div className="signup-compare" ref={ref}>
      <div className="signup-track">
        <span className="signup-track-label">Before — 7 fields, one page</span>
        <div className="signup-pills signup-pills--old">
          {oldFields.map((field, i) => (
            <motion.span
              key={field}
              className="signup-pill signup-pill--old"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.25, delay: inView ? i * 0.045 : 0 }}
            >
              {field}
            </motion.span>
          ))}
        </div>
      </div>

      <div className="signup-track">
        <span className="signup-track-label">After — 4 calm steps</span>
        <div className="signup-pills signup-pills--new">
          {newSteps.map((step, i) => (
            <motion.span
              key={step}
              className="signup-pill signup-pill--new"
              initial={{ opacity: 0, x: -12 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
              transition={{ duration: 0.4, delay: inView ? 0.4 + i * 0.22 : 0, ease: "easeOut" }}
            >
              <span className="signup-pill-num">{i + 1}</span>
              {step}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   02 — CHATBOT ENTRY auto-playback
============================================================ */
const OLD_STEPS = ["Open chat", 'Type "Hi"', "Wait for response", "Read options", "Pick feature"];
const NEW_STEPS = ["Pick a chip", "Start working"];

function ChatbotPlayback() {
  const [ref, inView] = useInView(0.4);
  const [phase, setPhase] = useState("idle");
  const [activeStep, setActiveStep] = useState(-1);
  const [seconds, setSeconds] = useState(0);
  const [manualMode, setManualMode] = useState(false);

  useEffect(() => {
    if (!inView || phase !== "idle") return;

    let timeouts = [];
    setPhase("old");

    OLD_STEPS.forEach((_, i) => {
      timeouts.push(
        setTimeout(() => {
          setActiveStep(i);
          setSeconds(Math.round(((i + 1) / OLD_STEPS.length) * 27));
        }, i * 1100)
      );
    });

    const oldDuration = OLD_STEPS.length * 1100;
    timeouts.push(
      setTimeout(() => {
        setPhase("new");
        setActiveStep(-1);
        setSeconds(0);
      }, oldDuration + 700)
    );

    NEW_STEPS.forEach((_, i) => {
      timeouts.push(
        setTimeout(() => {
          setActiveStep(i);
          setSeconds(i === NEW_STEPS.length - 1 ? 3 : 1);
        }, oldDuration + 700 + 450 + i * 450)
      );
    });

    timeouts.push(
      setTimeout(() => {
        setPhase("done");
        setManualMode(true); // hand control to the user once playback finishes
      }, oldDuration + 700 + 450 + NEW_STEPS.length * 450 + 600)
    );

    return () => timeouts.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  const showNew = phase === "new" || phase === "done";
  const steps = showNew ? NEW_STEPS : OLD_STEPS;
  // While manual, activeStep should show the full completed sequence
  const effectiveActiveStep = manualMode ? steps.length - 1 : activeStep;

  function handleToggle(target) {
    // target: "old" | "new"
    setManualMode(true);
    setPhase(target === "old" ? "old-manual" : "done");
    setActiveStep((target === "old" ? OLD_STEPS : NEW_STEPS).length - 1);
    setSeconds(target === "old" ? 27 : 3);
  }

  const isOldView = phase === "old-manual" || (!manualMode && phase === "old");
  const displaySteps = isOldView ? OLD_STEPS : NEW_STEPS;
  const isNewPhase = !isOldView;

  return (
    <div className="chatbot-playback" ref={ref}>
      <div className={`chatbot-stage ${isNewPhase ? "is-new" : ""}`}>
        <div className="chatbot-stage-header">
          <span className="chatbot-stage-tag">{isNewPhase ? "After" : "Before"}</span>
          <span className="chatbot-timer">{phase === "idle" ? "—" : `${seconds}s`}</span>
        </div>

        <div className="chatbot-steps">
          {displaySteps.map((step, i) => (
            <div
              key={step}
              className={`chatbot-step ${
                effectiveActiveStep >= i || manualMode ? "is-active" : ""
              } ${effectiveActiveStep === i && !manualMode ? "is-current" : ""}`}
            >
              <span className="chatbot-step-dot" />
              <span className="chatbot-step-label">{step}</span>
            </div>
          ))}
        </div>
      </div>

      {manualMode && (
        <div className="chatbot-toggle">
          <button
            className={`chatbot-toggle-btn ${isOldView ? "is-selected" : ""}`}
            onClick={() => handleToggle("old")}
          >
            Before
          </button>
          <button
            className={`chatbot-toggle-btn ${!isOldView ? "is-selected" : ""}`}
            onClick={() => handleToggle("new")}
          >
            After
          </button>
        </div>
      )}

      <p className="chatbot-quote">"Why do I have to type Hi every single time?"</p>
    </div>
  );
}

/* ============================================================
   03 — DESIGN SYSTEM stat strip
============================================================ */
function useCountUp(target, inView, duration = 900) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = null;
    let frame;

    const step = (timestamp) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setValue(Math.round(progress * target));
      if (progress < 1) frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [inView, target, duration]);

  return value;
}

function DesignSystemStrip() {
  const [ref, inView] = useInView(0.4);

  const components = useCountUp(40, inView);
  const spacingMax = useCountUp(96, inView);
  const typeMax = useCountUp(64, inView);
  const typeMin = useCountUp(12, inView);

  return (
    <div className="ds-strip" ref={ref}>
      <div className="ds-stat">
        <span className="ds-stat-num">{components}+</span>
        <span className="ds-stat-label">Reusable components</span>
      </div>
      <div className="ds-stat">
        <span className="ds-stat-num">
          4–{spacingMax}<span className="ds-stat-unit">px</span>
        </span>
        <span className="ds-stat-label">Spacing scale (8px grid)</span>
      </div>
      <div className="ds-stat">
        <span className="ds-stat-num">
          {typeMin}–{typeMax}<span className="ds-stat-unit">px</span>
        </span>
        <span className="ds-stat-label">Type scale, display to caption</span>
      </div>
      <div className="ds-stat">
        <span className="ds-stat-num">
          200–400<span className="ds-stat-unit">ms</span>
        </span>
        <span className="ds-stat-label">Motion, never decorative</span>
      </div>
    </div>
  );
}

export default function JuristBotCaseStudy() {
  useEffect(() => {
    const rows = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    rows.forEach((row, i) => {
      row.style.transitionDelay = `${i * 0.08}s`;
      observer.observe(row);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main className="case-page">
      {/* STICKY BACK TO HOME */}
      <Link to="/" className="case-back-btn">
        ← Back to Home
      </Link>
      {/* HERO */}

      <section className="case-hero">
        <motion.div
          className="hero-left"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="case-label">CASE FILE 01</p>

          <h1>JuristBot AI</h1>

          <h2>
            Rebuilding A Legal AI Product
            From Friction To Confidence
          </h2>

          <p className="hero-description">
            A complete end-to-end redesign of an AI-powered
            legal assistant platform completed during my time
            at Neuronest AI. The objective was to improve
            onboarding, accessibility, feature discovery and
            overall user confidence while working under a
            three-week delivery timeline.
          </p>
        </motion.div>

        <div className="hero-right">
          <div className="cardswap-wrapper">
            <CardSwap
              width={480}
              height={320}
              cardDistance={40}
              verticalDistance={45}
              delay={3500}
              pauseOnHover={true}
            >
              <Card><img src={signup} alt="" /></Card>
              <Card><img src={chatbot} alt="" /></Card>
              <Card><img src={response} alt="" /></Card>
              <Card><img src={profile} alt="" /></Card>
            </CardSwap>
          </div>
        </div>
      </section>

      {/* THE CHALLENGE */}
      <section className="challenge-section">
        <p className="section-label mono">02 — The Challenge</p>
        <h2 className="challenge-heading">A product nobody wanted to use.</h2>
        <p className="challenge-sub">
          JuristBot had real, functioning features — legal drafting, scenario
          solving, judgment search. But nobody wanted to use it. The interface
          had never once been questioned.
        </p>

        <div className="problems-grid">
          <div className="problem-card">
            <span className="problem-number">PROBLEM 01</span>
            <div className="problem-stat">7<span> fields.</span></div>
            <p className="problem-title">Signup friction</p>
            <p className="problem-desc">
              Name, password, confirm password, mobile, role, referral — all
              mandatory, all on one page, no social login anywhere.
            </p>
            <p className="problem-quote">
              "Estimated 40–50% abandonment before anyone clicked submit."
            </p>
          </div>

          <div className="problem-card">
            <span className="problem-number">PROBLEM 02</span>
            <div className="problem-stat">5<span> steps.</span></div>
            <p className="problem-title">Hidden features</p>
            <p className="problem-desc">
              Open chat → type "Hi" → wait → read options → pick feature →
              sub-feature. 25–30 seconds of pure friction. Every. Single. Session.
            </p>
            <p className="problem-quote">
              "Why do I have to type Hi every single time?"
            </p>
          </div>

          <div className="problem-card">
            <span className="problem-number">PROBLEM 03</span>
            <div className="problem-stat">2<span>/5.</span></div>
            <p className="problem-title">Accessibility failures</p>
            <p className="problem-desc">
              Poor contrast and readability failing the core demographic —
              legal professionals aged 45–60.
            </p>
            <p className="problem-quote">
              "Design that had never once been questioned."
            </p>
          </div>
        </div>
      </section>

      {/* EVIDENCE */}
      <section className="evidence-section">
        <p className="section-label mono">03 — The Evidence</p>
        <h2 className="evidence-heading">The audit told the whole story.</h2>
        <p className="evidence-sub">
          Every section scored. Every failure documented. Not opinions — findings.
          The product hadn't been questioned once since it launched.
        </p>

        <div className="audit-bento">
          <div className="ab-card ab-1">
            <span className="ab-tag">01 — Landing</span>
            <div className="ab-score">2<span>/5</span></div>
            <p className="ab-title">Hero & Landing</p>
            <div className="score-bar">
              <div className="score-dot dot-filled"></div>
              <div className="score-dot dot-filled"></div>
              <div className="score-dot dot-empty"></div>
              <div className="score-dot dot-empty"></div>
              <div className="score-dot dot-empty"></div>
            </div>
            <p className="ab-desc">No clear value proposition. Wall of text. One weak CTA. Poor contrast throughout.</p>
          </div>

          <div className="ab-card ab-2">
            <span className="ab-tag">02 — Registration</span>
            <div className="ab-score ab-score--red">1<span>/5</span></div>
            <p className="ab-title">Signup Flow</p>
            <div className="score-bar">
              <div className="score-dot dot-filled"></div>
              <div className="score-dot dot-empty"></div>
              <div className="score-dot dot-empty"></div>
              <div className="score-dot dot-empty"></div>
              <div className="score-dot dot-empty"></div>
            </div>
            <p className="ab-desc">7 mandatory fields. No social login. Slow email verification before first access.</p>
          </div>

          <div className="ab-card ab-3">
            <span className="ab-tag">03 — Chat</span>
            <div className="ab-score">2<span>/5</span></div>
            <p className="ab-title">Chat Experience</p>
            <div className="score-bar">
              <div className="score-dot dot-filled"></div>
              <div className="score-dot dot-filled"></div>
              <div className="score-dot dot-empty"></div>
              <div className="score-dot dot-empty"></div>
              <div className="score-dot dot-empty"></div>
            </div>
            <p className="ab-desc">5 steps before any feature. Type "Hi" every session. Credit balance hidden from view.</p>
          </div>

          <div className="ab-card ab-4">
            <span className="ab-tag">04 — Pricing</span>
            <div className="ab-score ab-score--red">1<span>/5</span></div>
            <p className="ab-title">Pricing Page</p>
            <div className="score-bar">
              <div className="score-dot dot-filled"></div>
              <div className="score-dot dot-empty"></div>
              <div className="score-dot dot-empty"></div>
              <div className="score-dot dot-empty"></div>
              <div className="score-dot dot-empty"></div>
            </div>
            <p className="ab-desc">Opaque credit system. Repetitive copy. No recommended plan. Users couldn't figure out what they were paying for.</p>
          </div>

          <div className="ab-card ab-5">
            <span className="ab-tag">05 — Trust</span>
            <div className="ab-score">2<span>/5</span></div>
            <p className="ab-title">Testimonials & FAQ</p>
            <div className="score-bar">
              <div className="score-dot dot-filled"></div>
              <div className="score-dot dot-filled"></div>
              <div className="score-dot dot-empty"></div>
              <div className="score-dot dot-empty"></div>
              <div className="score-dot dot-empty"></div>
            </div>
            <p className="ab-desc">No photos, no user counts, no credibility signals. Nothing to build trust.</p>
          </div>

          <div className="ab-card ab-6">
            <div className="ab-6-left">
              <span className="ab-tag">06 — Accessibility</span>
              <div className="ab-score">2<span>/5</span></div>
              <p className="ab-title">WCAG 2.1 AA Compliance</p>
              <div className="score-bar">
                <div className="score-dot dot-filled"></div>
                <div className="score-dot dot-filled"></div>
                <div className="score-dot dot-empty"></div>
                <div className="score-dot dot-empty"></div>
                <div className="score-dot dot-empty"></div>
              </div>
            </div>
            <div className="ab-6-right">
              <p className="ab-verdict">
                "Failing contrast standards for the very demographic the product
                was supposed to serve —{" "}
                <span>users aged 45 to 60.</span>{" "}
                Design that had never once been questioned."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* INVESTIGATION */}
      <section className="investigation-section">
        <p className="section-label mono">04 — Investigation</p>
        <h2 className="inv-heading">Eight competitors. Four rules. One direction.</h2>
        <p className="inv-sub">
          Studied 8 legal AI platforms — not to clone them, but to find the gaps
          JuristBot could own. Four non-negotiable design rules followed.
        </p>

        <div className="inv-cols">
          <div>
            <p className="col-label">Market Gaps Found</p>

            <div className="gap-row reveal">
              <span className="gap-index">GAP 01</span>
              <div className="gap-body">
                <p className="gap-title">Social login was a baseline expectation</p>
                <p className="gap-desc">7 out of 8 competitors offered Google OAuth. JuristBot was the lone outlier — directly costing signups every day.</p>
                <span className="gap-pill">7/8 COMPETITORS HAD IT</span>
              </div>
            </div>

            <div className="gap-row reveal">
              <span className="gap-index">GAP 02</span>
              <div className="gap-body">
                <p className="gap-title">Content drives discovery</p>
                <p className="gap-desc">Top platforms invested in blogs and legal guides for SEO. JuristBot had no content strategy — zero organic traffic.</p>
                <span className="gap-pill">ZERO ORGANIC TRAFFIC</span>
              </div>
            </div>

            <div className="gap-row reveal">
              <span className="gap-index">GAP 03</span>
              <div className="gap-body">
                <p className="gap-title">Trust is everything in legal tech</p>
                <p className="gap-desc">Every leading platform showed certifications, user counts, credibility signals. JuristBot had none.</p>
                <span className="gap-pill">NO TRUST SIGNALS</span>
              </div>
            </div>

            <div className="gap-row reveal">
              <span className="gap-index">GAP 04</span>
              <div className="gap-body">
                <p className="gap-title">Feature access needed to be instant</p>
                <p className="gap-desc">No modern legal AI made users type a greeting to start. The market had moved. JuristBot hadn't.</p>
                <span className="gap-pill">30 SEC TO FIRST FEATURE</span>
              </div>
            </div>
          </div>

          <div>
            <p className="col-label">Design Rules — Every Decision Passed Through These</p>

            <div className="rule-row reveal">
              <div className="rule-big-num">01</div>
              <div className="rule-body">
                <p className="rule-title">Clarity First</p>
                <p className="rule-desc">Legal users work under stress. Max 3 choices per section, F-pattern layouts, bold headlines, generous whitespace.</p>
                <span className="rule-pill">Cognitive load → minimum</span>
              </div>
            </div>

            <div className="rule-row reveal">
              <div className="rule-big-num">02</div>
              <div className="rule-body">
                <p className="rule-title">Accessible by Default</p>
                <p className="rule-desc">WCAG 2.1 AA wasn't a finishing touch — it was the floor. 16px body, 4.5:1 contrast, full keyboard navigation.</p>
                <span className="rule-pill">Non-negotiable</span>
              </div>
            </div>

            <div className="rule-row reveal">
              <div className="rule-big-num">03</div>
              <div className="rule-body">
                <p className="rule-title">Progressive Disclosure</p>
                <p className="rule-desc">Never dump everything at once. Segment registration, feature dropdowns over menus, let users breathe.</p>
                <span className="rule-pill">One step at a time</span>
              </div>
            </div>

            <div className="rule-row reveal">
              <div className="rule-big-num">04</div>
              <div className="rule-body">
                <p className="rule-title">Familiar Patterns</p>
                <p className="rule-desc">If users already recognise it, they trust it faster. Google login follows Google's guidelines. Chat borrows from WhatsApp.</p>
                <span className="rule-pill">Meet users where they are</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THE REDESIGN */}
<section className="redesign-section">
  <p className="section-label mono">05 — The Redesign</p>
  <h2 className="redesign-heading">Three decisions. Each one a tradeoff.</h2>
  <p className="redesign-sub">
    Every fix traded something away on purpose — a field, a step, a
    habit the old product had trained into people. Here's what changed,
    and why it was worth it.
  </p>

  <div className="decision-block">
    <div className="decision-head">
      <span className="decision-num">01</span>
      <div>
        <h3 className="decision-title">Signup Flow</h3>
        <p className="decision-desc">
          Seven mandatory fields on one page, no social login, an
          estimated 40–50% abandonment rate before anyone clicked
          submit. Replaced with a four-step progressive flow starting
          with Google OAuth.
        </p>
      </div>
      <span className="decision-metric">71% less friction</span>
    </div>
    <SignupStepPills />
  </div>

  <div className="decision-block">
    <div className="decision-head">
      <span className="decision-num">02</span>
      <div>
        <h3 className="decision-title">Chatbot Entry</h3>
        <p className="decision-desc">
          Five steps and a typed greeting stood between users and every
          feature, every session. Replaced with feature chips —
          pick a tool, start working.
        </p>
      </div>
      <span className="decision-metric">30s → 3s</span>
    </div>
    <ChatbotPlayback />
  </div>

  <div className="decision-block">
    <div className="decision-head">
      <span className="decision-num">03</span>
      <div>
        <h3 className="decision-title">Design System</h3>
        <p className="decision-desc">
          No two sections shared a spacing rule, a shadow, or a button
          style. Built from scratch so every screen after it would
          share one visual language.
        </p>
      </div>
      <span className="decision-metric">Built from zero</span>
    </div>
    <DesignSystemStrip />
  </div>
</section>

      {/* IMPACT */}
<section className="impact-section">
  <p className="section-label mono">06 — The Impact</p>
  <h2 className="impact-heading">The verdict, measured the same way it was broken.</h2>
  <p className="impact-sub">
    Same benchmark, same flows, three weeks apart. The numbers moved
    because the decisions did.
  </p>
  <ImpactBento />
</section>
{/* REFLECTION */}
<section className="reflection-section">
  <p className="section-label mono">07 — Reflection</p>
  <h2 className="reflection-heading">What stuck, after the deadline passed.</h2>
  <p className="reflection-sub">
    Four things carried forward into every project since.
  </p>

  <ReflectionBody />
</section>
{/* NDA / CLOSING */}
<section className="confidential-note reveal">
  <h2>Confidentiality Notice</h2>

  <p>
    Product screens, prototypes and business workflows remain
    protected under NDA.
  </p>

  <p>
    The complete project walkthrough can be presented during
    interviews and portfolio reviews.
  </p>

  <div className="case-closing">
    <p className="case-closing-line">From broken to built.</p>
    <p className="case-closing-recap">
      8.6/10 UX score · 100% success on 4 critical flows ·
      Full WCAG 2.1 AA compliance · Solo, three weeks.
    </p>
  </div>
</section>
{/* CASE NAVIGATION */}
<section className="case-nav">
  <Link to="/" className="case-nav-home">
    ↑ All Cases
  </Link>

  <Link to="/experience/diginest" className="case-nav-next">
    <span className="case-nav-next-label">Previous Case File</span>
    <span className="case-nav-next-title">← Diginest </span>
  </Link>
</section>
    </main>
  );
}
