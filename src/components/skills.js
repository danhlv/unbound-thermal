import { html } from "https://unpkg.com/lit-html?module";
import { mount } from "../utils/dom.js";
import { skills } from "../../user-data/data.js";

// Display-only grouping layered on top of the flat `skills` list in user-data/data.js
const CATEGORIES = [
  {
    category: "Thermal & Fluids",
    icon: "fa-solid fa-temperature-high",
    match: ["Conjugate Heat Transfer", "Regenerative Cooling", "Conduction & Convection", "Radiation", "Two-Phase Flow", "Electronics Cooling"],
  },
  {
    category: "CFD & Simulation",
    icon: "fa-solid fa-wind",
    match: ["ANSYS Fluent", "OpenFOAM", "RANS", "LES", "Wind-Tunnel Correlation"],
  },
  {
    category: "Design & Optimization",
    icon: "fa-solid fa-gears",
    match: ["Parametric Sweeps", "Gaussian-Process Surrogates", "Bayesian Optimization", "NXOpen Automation"],
  },
  {
    category: "Data & Assurance",
    icon: "fa-solid fa-robot",
    match: ["Python", "ML Pipelines", "Uncertainty Quantification", "V&V"],
  },
];

function groupSkills() {
  const remaining = new Set(skills);
  const groups = CATEGORIES.map(({ category, icon, match }) => {
    const items = match.filter((name) => remaining.has(name));
    items.forEach((name) => remaining.delete(name));
    return { category, icon, items };
  }).filter((group) => group.items.length);

  if (remaining.size) {
    groups.push({ category: "Other", icon: "fa-solid fa-star", items: [...remaining] });
  }
  return groups;
}

const skillGroup = (group, index) => html`
  <div class="skill-group glass glass-interactive glow-card" data-reveal style="--reveal-index: ${index}">
    <div class="skill-group-head">
      <span class="skill-group-icon"><i class="${group.icon}" aria-hidden="true"></i></span>
      <h3>${group.category}</h3>
    </div>
    <ul class="skill-chip-list">
      ${group.items.map((item) => html`<li class="chip">${item}</li>`)}
    </ul>
  </div>
`;

const skillsTemplate = () => html`
  <div class="container">
    <div class="section-heading">
      <p class="section-eyebrow" data-reveal>Capabilities</p>
      <h2 class="section-title" id="skills-title" data-reveal>
        What we <span class="gradient-text">do</span>.
      </h2>
      <p class="section-subtitle" data-reveal>
        Physics-first simulation, accelerated by modern data-science methods.
      </p>
    </div>
    <div class="skills-grid">
      ${groupSkills().map((group, i) => skillGroup(group, i))}
    </div>
  </div>
`;

export function mountSkills() {
  return mount("skills", skillsTemplate());
}
