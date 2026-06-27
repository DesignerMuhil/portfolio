import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/Diginest.css";

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

function WalletVisual() {
  const [ref, inView] = useInView(0.4);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    if (inView && !animated) setAnimated(true);
  }, [inView, animated]);

  return (
    <div className="wallet-visual" ref={ref}>
      <span className="wallet-label">Wallet · ₹12,400 remaining</span>
      <div className="wallet-total">₹50,000</div>
      <div className="wallet-bar-row">
        <div className="wallet-bar-label">
          <span>Broadcast</span><span>₹18,200 · 36%</span>
        </div>
        <div className="wallet-bar-track">
          <div className="wallet-bar-fill bar-green"
            style={{ width: animated ? '36%' : '0%' }}></div>
        </div>
      </div>
      <div className="wallet-bar-row">
        <div className="wallet-bar-label">
          <span>Support Tickets</span><span>₹11,800 · 24%</span>
        </div>
        <div className="wallet-bar-track">
          <div className="wallet-bar-fill bar-amber"
            style={{ width: animated ? '24%' : '0%', transitionDelay: '0.2s' }}></div>
        </div>
      </div>
      <div className="wallet-bar-row">
        <div className="wallet-bar-label">
          <span>Meta Ads</span><span>₹7,600 · 15%</span>
        </div>
        <div className="wallet-bar-track">
          <div className="wallet-bar-fill bar-red"
            style={{ width: animated ? '15%' : '0%', transitionDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   IMPACT — before/after bars
============================================================ */
const IMPACT_METRICS = [
  {
    name: "Task success rate",
    context: "Across all 5 tested flows",
    before: 74,
    after: 96,
    max: 100,
    unit: "%",
    isPct: true,
  },
  {
    name: "Broadcast creation time",
    context: "Average, start to sent",
    before: 5.5,
    after: 2.5,
    max: 6,
    unit: " min",
    lowerIsBetter: true,
  },
  {
    name: "Appointment booking time",
    context: "Average, start to confirmed",
    before: 3.2,
    after: 1.8,
    max: 4,
    unit: " min",
    lowerIsBetter: true,
  },
  {
    name: "Overall task completion",
    context: "Speed vs. v1.0 baseline",
    before: 100,
    after: 65,
    max: 100,
    unit: "%",
    lowerIsBetter: true,
    note: "30–40% faster",
  },
];

function ImpactBarRow({ metric }) {
  const [ref, inView] = useInView(0.5);
  const beforePct = (metric.before / metric.max) * 100;
  const afterPct = (metric.after / metric.max) * 100;

  const delta = metric.lowerIsBetter
    ? `↓ ${Math.round(((metric.before - metric.after) / metric.before) * 100)}%`
    : `↑ ${Math.round(((metric.after - metric.before) / metric.before) * 100)}%`;

  return (
    <div className="impact-bar-row" ref={ref}>
      <div className="impact-bar-label">
        <span className="impact-bar-name">{metric.name}</span>
        <span className="impact-bar-context">{metric.context}</span>
      </div>
      <div className="impact-bar-track-group">
        <div className={`impact-bar-track ${metric.isPct ? "is-pct" : ""} ${inView ? "is-revealed" : ""}`}>
          <div
            className="impact-bar-fill impact-bar-fill--before"
            style={{ width: inView ? `${beforePct}%` : "0%" }}
          />
          <div
            className="impact-bar-fill impact-bar-fill--after"
            style={{ width: inView ? `${afterPct}%` : "0%", transitionDelay: "0.25s" }}
          />
          <span className="impact-bar-delta">{metric.note || delta}</span>
        </div>
        <div className="impact-bar-readout">
          <span className="impact-bar-before-val">
            Before · {metric.before}{metric.unit}
          </span>
          <span className="impact-bar-after-val">
            After · {metric.after}{metric.unit}
          </span>
        </div>
      </div>
    </div>
  );
}

function ImpactBars() {
  return (
    <div className="impact-bars">
      {IMPACT_METRICS.map((metric) => (
        <ImpactBarRow metric={metric} key={metric.name} />
      ))}
    </div>
  );
}

/* ============================================================
   IMPACT — quote marquee
============================================================ */
const IMPACT_QUOTES = [
  {
    role: "Business Owner",
    quote: "I finally understand where my wallet balance is going. The colour indicators make it obvious at a glance.",
  },
  {
    role: "Support Executive",
    quote: "Switching between chats and tickets is smooth now. I don't lose my place anymore.",
  },
  {
    role: "Marketing Manager",
    quote: "The AI assist wrote a better broadcast intro than I would have in the same time.",
  },
  {
    role: "Operations Manager",
    quote: "I sent a test message and immediately saw the green toast. I knew it worked.",
  },
];

function QuoteMarquee() {
  const doubled = [...IMPACT_QUOTES, ...IMPACT_QUOTES];

  return (
    <div className="impact-marquee-wrap">
      <div className="impact-marquee-track">
        {doubled.map((q, i) => (
          <div className="impact-quote-card" key={`${q.role}-${i}`}>
            <span className="impact-quote-role">{q.role}</span>
            <p className="impact-quote-text">"{q.quote}"</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   REFLECTION — scroll-driven progress rail
============================================================ */
function useScrollRail(itemCount) {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    function handleScroll() {
      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const total = rect.height + viewportH;
      const scrolled = viewportH - rect.top;
      const pct = Math.min(Math.max(scrolled / total, 0), 1);
      setProgress(pct);
      setActiveIndex(Math.min(itemCount - 1, Math.floor(pct * itemCount)));
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [itemCount]);

  return [containerRef, progress, activeIndex];
}

const LESSONS = [
  {
    title: "Research is not a phase. It's a posture.",
    body: "I used to think research was something you completed at the beginning and moved past. Diginest taught me it never stops — the stakeholder review, the low-fi test, the usability test were all research wearing different clothes.",
  },
  {
    title: "My first instinct isn't always the user's reality.",
    body: "I assumed the pricing confusion was a UI problem. Users told me clearly it was a mental model problem. Fixing the interface without fixing the model would have changed nothing.",
  },
  {
    title: "Designing a system is not designing a screen.",
    body: "Building 50-plus components required a different kind of thinking — every decision had to work in isolation and in combination with everything else, simultaneously.",
  },
  {
    title: "Stakeholder communication is itself a design skill.",
    body: "The two-hour session taught me that showing work isn't enough. I had to tell the story of why each decision existed — and when I did, the room changed.",
  },
  {
    title: "Imperfection is part of the process, not a failure of it.",
    body: "My first high-fidelity screens had issues stakeholders caught. My first usability test had friction He'd missed entirely. Each iteration made the product genuinely better. That's not a bug — that's the process.",
  },
];

function ReflectionRail() {
  const [containerRef, progress, activeIndex] = useScrollRail(LESSONS.length);

  return (
    <div className="reflection-layout" ref={containerRef}>
      <div className="reflection-rail">
        <div
          className="reflection-rail-fill"
          style={{ height: `${progress * 100}%` }}
        />
      </div>

      <div className="reflection-lessons">
        {LESSONS.map((lesson, i) => (
          <div
            className={`reflection-lesson ${i <= activeIndex ? "is-active" : ""}`}
            key={lesson.title}
          >
            <span className="reflection-lesson-num">
              0{i + 1} / 0{LESSONS.length}
            </span>
            <h3 className="reflection-lesson-title">{lesson.title}</h3>
            <p className="reflection-lesson-body">{lesson.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   RETROSPECTIVE — what she'd do differently
============================================================ */
const RETRO_ITEMS = [
  "Interview more users earlier — four gave direction, but eight would have given confidence, before touching a single wireframe.",
  "Define success metrics upfront — not just \"did the test succeed\" but what a 10% improvement actually means for the business.",
  "Test full flows, not just screens, at the low-fidelity stage — cross-screen friction is invisible until someone tries a task start to finish.",
  "Loop in developers from day one — some high-fidelity decisions carried technical complexity that earlier input would have shaped better.",
  "Document decisions as I went, rather than reconstructing rationale from memory — a living log makes every review sharper.",
  "Be more ruthless about scope — phase lower-priority modules into a later release, and invest that time in the most critical flows.",
];

function RetrospectiveGrid() {
  return (
    <div className="retro-section">
      <h3 className="retro-heading">If I started again today, I'd do six things differently.</h3>
      <div className="retro-grid">
        {RETRO_ITEMS.map((text, i) => (
          <div className="retro-card" key={i}>
            <span className="retro-card-num">0{i + 1}</span>
            <p className="retro-card-text">{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DiginestCaseStudy() {
  useEffect(() => {
    function setupReveal(selector, delayStep = 0.08) {
      const els = document.querySelectorAll(selector);
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
      els.forEach((el, i) => {
        el.style.transitionDelay = `${i * delayStep}s`;
        observer.observe(el);
      });
      return observer;
    }

    const revealObserver = setupReveal(".reveal");
    const decObserver = setupReveal(".reveal-dec");

    return () => {
      revealObserver.disconnect();
      decObserver.disconnect();
    };
  }, []);

  return (
    <main className="dg-page">

      <Link to="/" className="case-back-btn">← Back to Home</Link>

      {/* HERO */}
      <section className="dg-hero">

        <motion.div
          className="dg-left"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="dg-case-label">Case File 02</span>
          <h1 className="dg-title">Diginest</h1>
          <span className="dg-title-version">2.0 Redesign</span>
          <p className="dg-subtitle">
            An all-in-one WhatsApp Business platform rebuilt from the ground up —
            14 modules, 100+ screens, and a product that finally felt as powerful
            as it actually was.
          </p>
          <div className="dg-tags">
            <span className="dg-tag">End-to-End UX</span>
            <span className="dg-tag">Design System</span>
            <span className="dg-tag">User Research</span>
            <span className="dg-tag">Usability Testing</span>
          </div>
        </motion.div>

        <motion.div
          className="dg-meta"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="dg-meta-item">
            <span className="dg-meta-key">Role</span>
            <span className="dg-meta-val">Product Designer</span>
            <span className="dg-meta-sub">Solo — end to end</span>
          </div>

          <div className="dg-meta-item">
            <span className="dg-meta-key">Platform</span>
            <span className="dg-meta-val">AI Business Automation Platform</span>
            <span className="dg-meta-sub">SMB-focused SaaS</span>
          </div>

          <div className="dg-meta-item">
            <span className="dg-meta-key">Task Success</span>
            <span className="dg-meta-val dg-meta-val--big">96%</span>
            <span className="dg-meta-sub">Up from 74% in v1.0</span>
          </div>

          <div className="dg-meta-item">
            <span className="dg-meta-key">SUS Score</span>
            <span className="dg-meta-val dg-meta-val--big">78.5</span>
            <span className="dg-meta-sub">Above industry average</span>
          </div>

          <div className="dg-meta-item">
            <span className="dg-meta-key">Output</span>
            <span className="dg-meta-val">100+ Screens</span>
            <span className="dg-meta-sub">50+ components · Full design system</span>
          </div>

          <div className="dg-meta-item">
            <span className="dg-meta-key">New Features Built</span>
            <span className="dg-meta-val">6 from zero</span>
            <span className="dg-meta-sub">
              Meta Ads · AI Content · Auto-save · Toasts · Fund Allocation · Status Indicators
            </span>
          </div>

          <div className="dg-meta-item dg-meta-item--span2">
            <span className="dg-meta-key">Scope — 14 Modules Redesigned</span>
            <div className="dg-scope-list">
              <span className="dg-scope-item">Broadcast Campaigns · Appointment Bot · Support Tickets</span>
              <span className="dg-scope-item">Meta Ads Manager · Wallet & Billing · Flow Builder</span>
              <span className="dg-scope-item">AI Content Generation · Contact Management · Analytics</span>
            </div>
          </div>
        </motion.div>

      </section>
      {/* THE BRIEF */}
<section className="dg-section">
  <span className="dg-sec-label">02 — The Brief</span>
  <h2 className="dg-sec-heading">Two missions. One assignment.</h2>
  <p className="dg-sec-sub">
    A working v1.0 already existed with real users depending on it daily.
    The brief didn't just ask to fix what was broken — it asked to build
    what was missing too.
  </p>

  <div className="brief-grid">

    <div className="brief-col">
      <span className="brief-col-label">What Existed</span>
      <div className="brief-item">
        <div className="brief-dot dot-white"></div>
        <p className="brief-item-text">14 core modules — broadcast, bots, tickets, wallet, analytics and more</p>
      </div>
      <div className="brief-item">
        <div className="brief-dot dot-white"></div>
        <p className="brief-item-text">Real users actively depending on it to run their businesses every day</p>
      </div>
      <div className="brief-item">
        <div className="brief-dot dot-white"></div>
        <p className="brief-item-text">Ambitious vision — unified communication, marketing, and operations in one place</p>
      </div>
      <div className="brief-item">
        <div className="brief-dot dot-white"></div>
        <p className="brief-item-text">74% task success rate in v1.0 baseline</p>
      </div>
    </div>

    <div className="brief-col">
      <span className="brief-col-label">What Was Broken</span>
      <div className="brief-item">
        <div className="brief-dot dot-red"></div>
        <p className="brief-item-text">Navigation 3 levels deep with no hierarchy — constant backtracking</p>
      </div>
      <div className="brief-item">
        <div className="brief-dot dot-red"></div>
        <p className="brief-item-text">Wallet showed a number but no story — no visibility into where money went</p>
      </div>
      <div className="brief-item">
        <div className="brief-dot dot-red"></div>
        <p className="brief-item-text">Silent actions — no confirmation, no toast, no feedback of any kind</p>
      </div>
      <div className="brief-item">
        <div className="brief-dot dot-red"></div>
        <p className="brief-item-text">Red used for three entirely different meanings across the product</p>
      </div>
      <div className="brief-item">
        <div className="brief-dot dot-red"></div>
        <p className="brief-item-text">No design system, no component library, zero accessibility considerations</p>
      </div>
    </div>

    <div className="brief-col">
      <span className="brief-col-label">What Needed to Be Built New</span>
      <div className="brief-item">
        <div className="brief-dot dot-accent"></div>
        <p className="brief-item-text">Meta Ads Manager — designed entirely from nothing</p>
      </div>
      <div className="brief-item">
        <div className="brief-dot dot-accent"></div>
        <p className="brief-item-text">Fund allocation within wallet — module-by-module visibility</p>
      </div>
      <div className="brief-item">
        <div className="brief-dot dot-accent"></div>
        <p className="brief-item-text">AI-enhanced content generation embedded in broadcast builder</p>
      </div>
      <div className="brief-item">
        <div className="brief-dot dot-accent"></div>
        <p className="brief-item-text">Auto-save for drafts running every 30 seconds across all major editors</p>
      </div>
      <div className="brief-item">
        <div className="brief-dot dot-accent"></div>
        <p className="brief-item-text">Toast notification system for every significant action</p>
      </div>
      <div className="brief-item">
        <div className="brief-dot dot-accent"></div>
        <p className="brief-item-text">Colour-coded status indicators with icon and text fallback always present</p>
      </div>
    </div>

  </div>

  <div className="brief-stats">
    <div className="brief-stat">
      <div className="brief-stat-num">14<span> modules</span></div>
      <span className="brief-stat-label">Fully redesigned</span>
    </div>
    <div className="brief-stat">
      <div className="brief-stat-num">100<span>+ screens</span></div>
      <span className="brief-stat-label">High-fidelity UI</span>
    </div>
    <div className="brief-stat">
      <div className="brief-stat-num">50<span>+ components</span></div>
      <span className="brief-stat-label">Design system built from zero</span>
    </div>
    <div className="brief-stat">
      <div className="brief-stat-num">6<span> new</span></div>
      <span className="brief-stat-label">Features built from scratch</span>
    </div>
  </div>

</section>
{/* RESEARCH */}
<section className="dg-section">
  <span className="dg-sec-label">03 — Research</span>
  <h2 className="dg-sec-heading">Four users. Six patterns. One foundation.</h2>
  <p className="dg-sec-sub">
    Before touching a single wireframe, I sat with the product as a
    first-time user — then shut up and listened to the people who
    actually used it every day.
  </p>

  <span className="timeline-label">One-on-one interviews · 4 real users · Ages 21–40</span>

  <div className="timeline">
    <div className="tl-stop">
      <div className="tl-dot"></div>
      <span className="tl-role">Business Owner</span>
      <span className="tl-meta">Age 34 · Low tech</span>
      <p className="tl-quote">"I just want to know if my message actually reached people."</p>
      <p className="tl-pain">The product was asking users to trust it without any evidence. Confirmation was the core need.</p>
    </div>

    <div className="tl-stop">
      <div className="tl-dot"></div>
      <span className="tl-role">Support Executive</span>
      <span className="tl-meta">Age 26 · Medium tech</span>
      <p className="tl-quote">"Every time I switch between chats and tickets I lose my place."</p>
      <p className="tl-pain">Context-switching was a daily tax. Reorienting from scratch every time added friction to every task.</p>
    </div>

    <div className="tl-stop">
      <div className="tl-dot"></div>
      <span className="tl-role">Marketing Manager</span>
      <span className="tl-meta">Age 31 · High tech</span>
      <p className="tl-quote">"The broadcast builder has too many steps and I can't save drafts."</p>
      <p className="tl-pain">Hours of campaign work could vanish without warning. The flow was long and the safety net was missing.</p>
    </div>

    <div className="tl-stop">
      <div className="tl-dot"></div>
      <span className="tl-role">Operations Manager</span>
      <span className="tl-meta">Age 38 · Medium tech</span>
      <p className="tl-quote">"I added money to the wallet but I have no idea where it went."</p>
      <p className="tl-pain">Money went in. The product gave nothing back. No allocation, no visibility, no story.</p>
    </div>
  </div>

  <span className="patterns-label">
    6 patterns that emerged — foundation for every decision that followed
  </span>

  <div className="pattern-row reveal">
    <div className="pattern-num">01</div>
    <p className="pattern-title">Simplicity over more features</p>
    <div className="pattern-right">
      <p className="pattern-desc">Users weren't struggling because they lacked capabilities — they were overwhelmed because too much was shown too early. Show what's needed, when it's needed, and nothing more.</p>
      <span className="pattern-tag">Progressive disclosure</span>
    </div>
  </div>

  <div className="pattern-row reveal">
    <div className="pattern-num">02</div>
    <p className="pattern-title">Feedback is trust</p>
    <div className="pattern-right">
      <p className="pattern-desc">Every silent action created anxiety. The product was asking users to trust it without giving them any reason to. Every action needs a visible, unambiguous result.</p>
      <span className="pattern-tag">Toast system</span>
    </div>
  </div>

  <div className="pattern-row reveal">
    <div className="pattern-num">03</div>
    <p className="pattern-title">Visuals beat text</p>
    <div className="pattern-right">
      <p className="pattern-desc">Showing a progress bar instead of a raw wallet number changed faces immediately during research. Visual information is intuitive. Text requires conscious effort every time.</p>
      <span className="pattern-tag">Fund allocation bars</span>
    </div>
  </div>

  <div className="pattern-row reveal">
    <div className="pattern-num">04</div>
    <p className="pattern-title">Pricing must feel transparent</p>
    <div className="pattern-right">
      <p className="pattern-desc">The wallet concept wasn't wrong — the presentation was completely opaque. Users needed to see how funds were allocated across modules, not a single number sitting without context.</p>
      <span className="pattern-tag">Wallet redesign</span>
    </div>
  </div>

  <div className="pattern-row reveal">
    <div className="pattern-num">05</div>
    <p className="pattern-title">Terminology creates walls</p>
    <div className="pattern-right">
      <p className="pattern-desc">"Flow Builder" and "Broadcast Node" weren't jargon — they were barriers that made non-technical users feel excluded and inadequate. Plain language was essential, not a design preference.</p>
      <span className="pattern-tag">Language audit</span>
    </div>
  </div>

  <div className="pattern-row reveal">
    <div className="pattern-num">06</div>
    <p className="pattern-title">Recovery matters more than perfection</p>
    <div className="pattern-right">
      <p className="pattern-desc">Users don't need flawless flows — they need to feel safe enough to make mistakes. Auto-save, undo, and confirmation before irreversible actions matter more than visual polish.</p>
      <span className="pattern-tag">Safety nets</span>
    </div>
  </div>

</section>
{/* DECISIONS */}
<section className="dg-section">
  <span className="dg-sec-label">04 — Decisions</span>
  <h2 className="dg-sec-heading">Six decisions. Each one a tradeoff.</h2>
  <p className="dg-sec-sub">
    Research tells you what's wrong. Design is the work of figuring out
    what to do about it — and defending those choices clearly in front
    of people who have their own pressures.
  </p>

  {/* 01 WALLET */}
  <div className="dec-01 reveal-dec">
    <div>
      <span className="dec-tag">Decision 01 — Wallet</span>
      <h3 className="dec-title">Replace raw numbers with visual fund allocation</h3>
      <p className="dec-desc">
        Users couldn't understand where their money was going. The fix
        wasn't a better number — it was a different mental model entirely.
        Progress bars per module, with colour states for healthy, warning,
        and critical. Colour is never used alone — every state has an icon
        and a text label too.
      </p>
      <span className="dec-outcome">↑ Wallet comprehension — zero explanation needed in testing</span>
    </div>
    <WalletVisual />
  </div>

  {/* 02 FORMS */}
  <div className="dec-02 reveal-dec">
    <div className="dec-02-inner">
      <div>
        <span className="dec-tag">Decision 02 — Forms</span>
        <h3 className="dec-title">Multi-step guided flows instead of long scrolls</h3>
        <p className="dec-desc">
          Long forms caused drop-off and disorientation. Every major task
          was split into discrete, clearly labelled steps with a visible
          progress indicator. Users always knew where they were, what was
          next, and could go back without losing work.
        </p>
        <span className="dec-outcome">↓ 30–40% faster task completion</span>
      </div>
      <div>
        <p className="dec-step-label">Broadcast creation — step flow</p>
        <div className="step-strip">
          <div className="step-item step-item--active">
            <span className="step-n">01</span>
            <span className="step-name">Audience</span>
          </div>
          <div className="step-item step-item--active">
            <span className="step-n">02</span>
            <span className="step-name">Content</span>
          </div>
          <div className="step-item">
            <span className="step-n">03</span>
            <span className="step-name">Schedule</span>
          </div>
          <div className="step-item">
            <span className="step-n">04</span>
            <span className="step-name">Review</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* 03 AUTO-SAVE */}
  <div className="dec-03 reveal-dec">
    <div className="dec-03-left">
      <span className="dec-tag">Decision 03 — Auto-Save</span>
      <h3 className="dec-title">Draft saved every 30 seconds across all major editors</h3>
      <p className="dec-desc">
        Users were losing hours of work to session timeouts and browser
        crashes. Auto-save runs silently. A subtle "Draft saved" toast
        appears — reassuring enough to notice, unobtrusive enough never
        to interrupt.
      </p>
      <span className="dec-outcome">Zero data loss after implementation</span>
    </div>
    <div className="dec-03-right">
      <div className="big-stat">30<span>s</span></div>
      <p className="big-stat-label">Auto-save interval</p>
    </div>
  </div>

  {/* 04 TOAST */}
  <div className="dec-04 reveal-dec">
    <div className="dec-04-inner">
      <div>
        <span className="dec-tag">Decision 04 — Feedback</span>
        <h3 className="dec-title">A toast for every significant action in the platform</h3>
        <p className="dec-desc">
          Silent actions were creating anxiety across the entire product.
          Now every action surfaces a contextual toast — success, error,
          or warning — using colour, icon, and text together. No ambiguity
          about what just happened.
        </p>
        <span className="dec-outcome">Confidence replacing doubt every session</span>
      </div>
      <div className="toast-stack">
        <div className="toast toast--success">
          <div className="toast-icon">✓</div>
          <span className="toast-text">Broadcast sent to 1,240 contacts</span>
          <span className="toast-label">SUCCESS</span>
        </div>
        <div className="toast toast--error">
          <div className="toast-icon">✕</div>
          <span className="toast-text">Wallet balance too low to send</span>
          <span className="toast-label">ERROR</span>
        </div>
        <div className="toast toast--warning">
          <div className="toast-icon">!</div>
          <span className="toast-text">Draft auto-saved — session expiring soon</span>
          <span className="toast-label">WARNING</span>
        </div>
      </div>
    </div>
  </div>

  {/* 05 AI */}
  <div className="dec-05 reveal-dec">
    <div>
      <span className="dec-tag">Decision 05 — AI Content</span>
      <h3 className="dec-title">AI generation embedded directly in the broadcast builder</h3>
      <p className="dec-desc">
        Writing broadcast copy was slow and painful — starting from a
        blank page every time. Users describe what they want to achieve,
        the AI drafts it, they refine. No blank page. No wasted time.
      </p>
      <span className="dec-outcome">Faster campaign creation · Less cognitive effort</span>
    </div>
    <div className="ai-visual">
      <p className="ai-prompt">→ "Write a Diwali offer message for my clothing store, friendly tone"</p>
      <p className="ai-output">
        🎉 This Diwali, celebrate in style! Get up to 40% off on our
        entire collection — from ethnic wear to western fusion. Offer
        valid until October 24th. Shop now and make this festive season
        extra special. ✨
      </p>
      <span className="ai-badge">✦ AI Generated · Edit before sending</span>
    </div>
  </div>

  {/* 06 SAFETY */}
  <div className="dec-06 reveal-dec">
    <span className="dec-tag">Decision 06 — Safety Nets</span>
    <h3 className="dec-title">Confirmation modals for every high-stakes action</h3>
    <p className="dec-desc">
      Destructive actions had no confirmation step — a misclick had
      immediate, irreversible consequences. Every high-impact action now
      surfaces a modal with plain-language description of exactly what
      will happen.
    </p>
    <div className="confirm-strip">
      <div className="confirm-item">
        <span className="confirm-action">Delete contact group</span>
        <p className="confirm-desc">
          This will permanently remove 847 contacts and all associated
          conversation history. This cannot be undone.
        </p>
      </div>
      <div className="confirm-item">
        <span className="confirm-action">Send broadcast</span>
        <p className="confirm-desc">
          This will immediately send your message to 1,240 contacts.
          Scheduled messages can be cancelled up to 5 minutes before
          send time.
        </p>
      </div>
      <div className="confirm-item">
        <span className="confirm-action">Clear wallet balance</span>
        <p className="confirm-desc">
          This will remove ₹12,400 from your wallet. Funds cannot be
          recovered after this action is confirmed.
        </p>
      </div>
    </div>
  </div>

</section>

{/* IMPACT */}
<section className="dg-section">
  <span className="dg-sec-label">05 — Impact</span>
  <h2 className="dg-sec-heading">Same benchmark, three weeks apart.</h2>
  <p className="dg-sec-sub">
    Every number moved because a decision did. Behind each one is a
    person who used to struggle with something — and now doesn't.
  </p>

  <ImpactBars />
  <QuoteMarquee />
</section>

{/* REFLECTION */}
<section className="dg-section">
  <span className="dg-sec-label">06 — Reflection</span>
  <h2 className="dg-sec-heading">What carried forward, after the deadline passed.</h2>
  <p className="dg-sec-sub">
    The most end-to-end project I'd ever owned — and five things I
    now carries into every project I touches.
  </p>

  <ReflectionRail />
  <RetrospectiveGrid />

  <div className="dg-closing">
    <p className="dg-closing-line">
      "Great design isn't about how it looks. It's about how it feels
      to the person using it."
    </p>
    <p className="dg-closing-recap">
      100+ screens · 50+ components · 96% task success · SUS 78.5
    </p>
    <p className="dg-closing-note">
      Because the work involved licensed resources from my previous
      organisation, UI screens can't be shared publicly — but I'm
      happy to walk anyone through the full project in a live session,
      any time.
    </p>
  </div>

  <div className="dg-case-nav">
    <Link to="/" className="dg-case-nav-home">↑ All Cases</Link>
    <Link to="/experience/juristbot" className="dg-case-nav-next">
      <span className="dg-case-nav-next-label">Next Case File</span>
      <span className="dg-case-nav-next-title">JuristBot AI →</span>
    </Link>
  </div>
</section>

    </main>
  );
}