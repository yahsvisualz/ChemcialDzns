const revealItems = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
  observer.observe(item);
});

const filters = document.querySelectorAll(".filters button");
const projects = document.querySelectorAll(".project");

filters.forEach((button) => {
  button.addEventListener("click", () => {
    filters.forEach((filter) => filter.classList.remove("active"));
    button.classList.add("active");

    const selected = button.dataset.filter;
    projects.forEach((project) => {
      const matches = selected === "all" || project.dataset.category === selected;
      project.classList.toggle("hidden", !matches);
    });
  });
});

const menuButton = document.querySelector(".menu-button");
const mobileMenu = document.querySelector(".mobile-menu");

function closeMenu() {
  menuButton.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  mobileMenu.classList.remove("open");
  mobileMenu.setAttribute("aria-hidden", "true");
  document.body.classList.remove("menu-open");
}

menuButton.addEventListener("click", () => {
  const willOpen = !mobileMenu.classList.contains("open");
  menuButton.classList.toggle("open", willOpen);
  menuButton.setAttribute("aria-expanded", String(willOpen));
  mobileMenu.classList.toggle("open", willOpen);
  mobileMenu.setAttribute("aria-hidden", String(!willOpen));
  document.body.classList.toggle("menu-open", willOpen);
});

mobileMenu.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

const cursor = document.querySelector(".cursor-dot");
window.addEventListener("pointermove", (event) => {
  cursor.style.left = `${event.clientX}px`;
  cursor.style.top = `${event.clientY}px`;
});

document.querySelectorAll("a, button").forEach((element) => {
  element.addEventListener("pointerenter", () => {
    cursor.style.width = "38px";
    cursor.style.height = "38px";
  });
  element.addEventListener("pointerleave", () => {
    cursor.style.width = "12px";
    cursor.style.height = "12px";
  });
});

document.querySelectorAll(".project-cover").forEach((image) => {
  if (image.complete && image.naturalWidth > 0) {
    image.classList.add("loaded");
    return;
  }

  image.addEventListener("load", () => image.classList.add("loaded"));
  image.addEventListener("error", () => image.remove());
});
