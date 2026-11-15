import { html } from "https://unpkg.com/lit-html?module";
import { mount } from "../utils/dom.js";

const FLOATING_BADGES = [
  { label: "CFD", icon: "fa-solid fa-wind", pos: "badge-1" },
  { label: "Heat Transfer", icon: "fa-solid fa-temperature-high", pos: "badge-2" },
  { label: "Surrogate Models", icon: "fa-solid fa-chart-line", pos: "badge-3" },
  { label: "Design Optimization", icon: "fa-solid fa-gears", pos: "badge-4" },
  { label: "V&V + UQ", icon: "fa-solid fa-check-double", pos: "badge-5" },
];

const badgeTemplate = (badge) => html`
  <div class="hero-badge glass ${badge.pos}" aria-hidden="true">
    <i class="${badge.icon}" aria-hidden="true"></i>
    <span>${badge.label}</span>
  </div>
`;

const heroTemplate = () => html`
  <div class="hero-bg" aria-hidden="true">
    <div class="hero-mesh"></div>
    <div class="hero-blob hero-blob-1"></div>
    <div class="hero-blob hero-blob-2"></div>
    <div class="hero-blob hero-blob-3"></div>
  </div>

  <div class="container hero-inner">
    <div class="hero-copy">
      <p class="hero-eyebrow" data-reveal>
        <span class="hero-status-dot"></span>
        Now taking projects
      </p>
      <h1 class="hero-title" data-reveal>
        Thermal Design<br />& Simulation
      </h1>
      <p class="hero-role gradient-text-animated" data-reveal>
        CFD &middot; Heat Transfer &middot; Data-Driven Design
      </p>
      <p class="hero-description" data-reveal>
        We design, analyze, and optimize thermal systems — from regenerative
        cooling channels to electronics thermal management — combining
        high-fidelity simulation with ML-driven design sweeps and rigorous
        verification.
      </p>
      <div class="hero-cta-row" data-reveal>
        <a class="btn btn-primary magnetic ripple" href="#projects">
          <i class="fa-solid fa-rocket" aria-hidden="true"></i>
          See Our Work
        </a>
        <a class="btn btn-secondary magnetic ripple" href="#skills">
          Services
        </a>
        <a class="btn btn-ghost underline-link magnetic" href="#contact">
          Contact
          <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
        </a>
      </div>
    </div>

    <div class="hero-visual" data-reveal>
      <div class="hero-orbit">
        <div class="hero-orbit-core glass">
          <i class="fa-solid fa-rocket" aria-hidden="true"></i>
        </div>
        ${FLOATING_BADGES.map((badge) => badgeTemplate(badge))}
      </div>
    </div>
  </div>

  <a class="hero-scroll-cue underline-link" href="#about" aria-label="Scroll to About section">
    <span>Scroll</span>
    <i class="fa-solid fa-chevron-down" aria-hidden="true"></i>
  </a>
`;

export function mountHero() {
  return mount("hero", heroTemplate());
}
