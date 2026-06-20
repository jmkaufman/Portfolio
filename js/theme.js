// theme.js — manual light/dark toggle persisted in localStorage (D-14).
// The inline <head> bootstrap in index.html already applied any stored preference
// before first paint (no flash); this module wires the toggle button and keeps it
// in sync. With no stored preference the OS setting is followed via color-scheme.

const STORAGE_KEY = "theme";
const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

function systemPrefersDark() {
  return darkQuery.matches;
}

function storedPreference() {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch (e) {
    return null;
  }
}

// The theme currently in effect: an explicit choice if present, else the OS value.
function currentTheme() {
  const attr = document.documentElement.getAttribute("data-theme");
  if (attr === "light" || attr === "dark") return attr;
  return systemPrefersDark() ? "dark" : "light";
}

function applyTheme(theme) {
  const root = document.documentElement;
  root.setAttribute("data-theme", theme);
  root.style.colorScheme = theme;
}

// The button performs an action, so its accessible name describes that action
// (no aria-pressed — the name alone is unambiguous). The visible sun/moon icon
// carries the same meaning visually (CSS in components.css).
function syncToggle(button) {
  const goingDark = currentTheme() !== "dark";
  button.setAttribute(
    "aria-label",
    goingDark ? "Switch to dark theme" : "Switch to light theme"
  );
}

export function initTheme() {
  const button = document.querySelector(".theme-toggle");
  if (!button) return;

  button.removeAttribute("aria-pressed");
  syncToggle(button);

  button.addEventListener("click", () => {
    const next = currentTheme() === "dark" ? "light" : "dark";
    applyTheme(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch (e) {
      /* storage unavailable — theme still applies for this session */
    }
    syncToggle(button);
  });

  // Follow OS changes while no manual preference is stored (auto mode).
  darkQuery.addEventListener("change", () => {
    if (!storedPreference()) syncToggle(button);
  });
}
