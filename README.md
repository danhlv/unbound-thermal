# Thermal Design & Simulation — Projects

A static showcase site for thermal design, CFD, and data-driven simulation
services. Live at **https://danhlv.github.io/thermal-projects/**

## Stack

- Vanilla ES modules + [lit-html](https://lit.dev/docs/libraries/standalone-templates/) — no build step
- Custom canvas animation: planetary orbits background (`src/animations/orbitBg.js`)
- Deployed via GitHub Pages

## Editing content

All page content lives in [`user-data/data.js`](user-data/data.js) (bio,
capabilities, projects, contact links). Section copy lives in
`src/components/*.js`. Contact form messages are composed via the visitor's
mail client to `CONTACT_EMAIL` in `src/constants/urls.js`.

## Local preview

Serve over HTTP (ES modules won't load over `file://`):

```bash
python -m http.server 8000
# or: npx serve .
```

## Credits

Based on the [vinaysomawat.github.io](https://github.com/vinaysomawat/vinaysomawat.github.io)
portfolio template, © Vinay Somawat, released under the [MIT License](LICENSE).
The orbital background animation is an original implementation for this site.

## License

Code from the template is MIT-licensed (see `LICENSE`). Site content and the
orbital animation are © 2026 the site owners.
