// main.js — entry module; wires the progressive enhancements (D-06). Loaded as a
// deferred ES module, so the DOM is parsed by the time it runs; JS is enhancement
// only and never required to see content or the default theme (D-05).
import { initTheme } from "./theme.js";
import { initNav } from "./nav.js";

function init() {
  initTheme();
  initNav();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
