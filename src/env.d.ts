/// <reference types="astro/client" />

// Some editors may not pick up the Astro global in .astro frontmatter immediately.
// This explicit declaration helps the TypeScript server understand the global.
declare const Astro: import("astro").AstroGlobal;
