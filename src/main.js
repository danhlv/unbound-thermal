import { observeReveals } from "./animations/scrollReveal.js";
import { initInteractions } from "./animations/interactions.js";

import { mountNav } from "./components/nav.js";
import { mountHero } from "./components/hero.js";
import { mountAbout } from "./components/about.js";
import { mountSkills } from "./components/skills.js";
import { mountProjects } from "./components/projects.js";
import { mountContact, initContactForm } from "./components/contact.js";
import { mountFooter } from "./components/footer.js";

import { initNavScroll } from "./services/nav-scroll.js";
import { initTheme } from "./services/theme.js";
import { initCommandPalette } from "./services/commandPalette.js";
import { initEasterEggs } from "./services/easterEgg.js";
import { initProfileCards } from "./services/profileCard.js";
import { initOrbitBackground } from "./animations/orbitBg.js";

function mountStaticSections() {
  mountNav();
  mountHero();
  mountAbout();
  mountSkills();
  mountProjects();
  mountContact();
  mountFooter();
}

function initServices() {
  initTheme();
  initNavScroll();
  initCommandPalette();
  initEasterEggs();
  initInteractions();
  initContactForm();
  initProfileCards();
  initOrbitBackground();
}

mountStaticSections();
initServices();
observeReveals();
