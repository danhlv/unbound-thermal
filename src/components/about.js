import { html } from "https://unpkg.com/lit-html?module";
import { mount } from "../utils/dom.js";
import { bio } from "../../user-data/data.js";

const STATS = [
  { value: "PhD-led", label: "Aerospace thermal & fluids leadership" },
  { value: "RANS → LES", label: "Multi-fidelity simulation workflows" },
  { value: "100–1000×", label: "Faster design sweeps via surrogate models" },
  { value: "UQ built-in", label: "Error bars on every recommendation" },
];

const statCard = (stat) => html`
  <div class="about-stat glass glass-interactive" data-reveal>
    <p class="about-stat-value gradient-text">${stat.value}</p>
    <p class="about-stat-label">${stat.label}</p>
  </div>
`;

const aboutTemplate = () => html`
  <div class="container about-inner">
    <div class="about-copy">
      <p class="section-eyebrow" data-reveal>About</p>
      <h2 class="section-title" id="about-title" data-reveal>
        Thermal engineering, backed by simulation and data.
      </h2>
      <div class="about-bio" data-reveal>
        ${bio.map((paragraph) => html`<p>${paragraph}</p>`)}
      </div>
    </div>

    <div class="about-stats">
      ${STATS.map((stat) => statCard(stat))}
    </div>
  </div>
`;

export function mountAbout() {
  return mount("about", aboutTemplate());
}
