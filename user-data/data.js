export const bio = [
  "We are a small, senior engineering team specializing in thermal design, computational fluid dynamics, and data-driven simulation. We help aerospace, energy, and electronics teams move faster from concept to validated hardware.",
  "Our approach combines high-fidelity physics (conjugate heat transfer, CFD, two-phase flows) with modern machine-learning methods — multi-fidelity surrogate models, Bayesian optimization, and uncertainty quantification — so design sweeps that used to take weeks finish in days, with error bars attached.",
  "We work as an extension of your team: hands-on, verification-first, and focused on results you can put in front of a design review.",
];

export const skills = [
  "Conjugate Heat Transfer",
  "Regenerative Cooling",
  "Conduction & Convection",
  "Radiation",
  "Two-Phase Flow",
  "Electronics Cooling",
  "ANSYS Fluent",
  "OpenFOAM",
  "RANS",
  "LES",
  "Wind-Tunnel Correlation",
  "Parametric Sweeps",
  "Gaussian-Process Surrogates",
  "Bayesian Optimization",
  "NXOpen Automation",
  "Python",
  "ML Pipelines",
  "Uncertainty Quantification",
  "V&V",
];

export const projects = [
  {
    title: "Regenerative Cooling Channel Analysis",
    description:
      "End-to-end conjugate heat-transfer workflow for liquid-propulsion cooling channels — wall heat flux, subcooled boiling margins, and structural limits — automated from CAD to report, with every design point traceable.",
    tags: ["CHT", "ANSYS Fluent", "Python", "V&V"],
    repo: "https://github.com/danhlv",
    demo: null,
    icon: "fa-solid fa-fire-flame-curved",
  },
  {
    title: "Surrogate-Driven Thermal Design Sweeps",
    description:
      "Multi-fidelity Gaussian-process surrogates (PCA + GPR) trained on cheap RANS and scarce high-fidelity runs — design sweeps accelerated by orders of magnitude while preserving physics and delivering uncertainty bounds.",
    tags: ["GPR", "PCA", "Bayesian Optimization", "UQ"],
    repo: "https://github.com/danhlv",
    demo: null,
    icon: "fa-solid fa-chart-line",
  },
  {
    title: "Electronics Thermal Management",
    description:
      "High-heat-flux electronics cooling: heat-sink and cold-plate optimization, thermal-interface materials, transient thermal cycling, and derating analysis for power electronics and avionics.",
    tags: ["Conduction", "CHT", "Optimization", "Transient"],
    repo: "https://github.com/danhlv",
    demo: null,
    icon: "fa-solid fa-microchip",
  },
  {
    title: "Test-Data & Simulation ML Pipeline",
    description:
      "POD/PCA + GPR pipelines that correlate wind-tunnel and thermal-test data with simulation — rapid prediction across the envelope, with validation metrics and error estimates built in.",
    tags: ["ML", "POD", "Experimental Correlation", "Python"],
    repo: "https://github.com/danhlv",
    demo: null,
    icon: "fa-solid fa-wind",
  },
];

export const contact = [
  {
    label: "Email",
    icon: "fa-solid fa-envelope",
    link: "mailto:dan.hlevca@gmail.com",
  },
  {
    label: "GitHub",
    icon: "fa-brands fa-github",
    link: "https://github.com/danhlv",
  },
];

export const footer = [
  {
    label: "copyright-text",
    data: ["© 2026 — Thermal design, simulation & optimization."],
  },
];
