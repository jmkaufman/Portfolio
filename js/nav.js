// nav.js — active-section highlight on the primary nav (D-11, D-29).
// Smooth scrolling is handled natively by CSS scroll-behavior (it works without JS
// and is disabled under prefers-reduced-motion in base.css), so this module only
// reflects the section currently in view onto the nav via aria-current.

export function initNav() {
  const links = Array.from(document.querySelectorAll(".primary-nav__link"));
  if (!links.length) return;

  const linkById = new Map();
  const sections = [];
  links.forEach((link) => {
    const id = (link.getAttribute("href") || "").replace(/^#/, "");
    const section = id && document.getElementById(id);
    if (section) {
      linkById.set(id, link);
      sections.push(section);
    }
  });
  if (!sections.length) return;

  const header = document.querySelector(".site-header");
  let activeId = null;

  function setActive(id) {
    if (id === activeId) return;
    activeId = id;
    linkById.forEach((link, key) => {
      if (key === id) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
  }

  function update() {
    // Active = the last section whose top has scrolled past the header line.
    // (On this short page a brief trailing section may yield to the next once the
    // page bottom is reached; that is acceptable and still announces a valid
    // current section.)
    const offset = (header ? header.offsetHeight : 0) + 24;
    let currentId = sections[0].id;
    for (const section of sections) {
      if (section.getBoundingClientRect().top - offset <= 1) currentId = section.id;
    }
    // At the page bottom, pin to the last section: short trailing sections can't
    // scroll under the header line, so without this the final nav item would
    // never register when the visitor reaches the end.
    if (
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 2
    ) {
      currentId = sections[sections.length - 1].id;
    }
    setActive(currentId);
  }

  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      update();
      ticking = false;
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  update();
}
