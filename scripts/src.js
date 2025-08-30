"use strict";
// document.addEventListener("DOMContentLoaded", () => {
const navDots = document.querySelectorAll(".nav-dot");
const sectionIds = Array.from(navDots).map((dot) =>
  dot.getAttribute("data-target")
);
const sections = sectionIds.map((id) => document.getElementById(id));
const navLinks = document.querySelectorAll(".nav-link");
const header = document.querySelector("#header");
const footer = document.getElementById("footer");
const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".tab-panel");
const contactBtns = document.querySelectorAll(".contact");
const contactLink = document.getElementById("contactBtn");
const btn = document.getElementById("scrollToTopBtn");
const hamburgerBtn = document.getElementById("hamburgerBtn");
const closeBtn = document.getElementById("closeBtn");
const sideMenu = document.getElementById("sideMenu");
const links = document.querySelectorAll(".nav-links-list a");

let currentIndex = 0;

function isMobileDevice() {
  return window.matchMedia("(max-width: 1024px)").matches;
}

function scrollToSection(index) {
  if (index < 0) return;

  if (index >= sections.length) {
    footer.scrollIntoView({ behavior: "smooth" });
    return;
  }

  currentIndex = index;
  sections[currentIndex].scrollIntoView({ behavior: "smooth" });

  // Remove active class from all nav links
  navLinks.forEach((link) => link.classList.remove("active"));
  const targetId = sections[currentIndex].id;
  const activeLink = document.querySelector(`.nav-link[href="#${targetId}"]`);
  if (activeLink) activeLink.classList.add("active");

  navDots.forEach((dot) => {
    const isActive =
      dot.getAttribute("data-target") === sectionIds[currentIndex];
    dot.classList.toggle("active", isActive);
  });
}

navDots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    scrollToSection(i);
  });
});

window.addEventListener("keydown", (e) => {
  if (isMobileDevice()) return; // 🔥 disable keyboard nav on mobile

  if (e.key === "ArrowDown") {
    e.preventDefault();
    scrollToSection(currentIndex + 1);
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    scrollToSection(currentIndex - 1);
  }
});

let lastScrollTop = 0;

window.addEventListener("scroll", () => {
  let scrollPosition = window.scrollY + 10;

  sections.forEach((section, index) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      navDots.forEach((dot) => {
        dot.classList.toggle(
          "active",
          dot.getAttribute("data-target") === sectionIds[index]
        );
      });
      currentIndex = index;
    }
  });
  // Handle header hide on scroll down and back on top again
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    // scrolling down
    header.classList.add("hide");
  } else {
    // scrolling up
    header.classList.remove("hide");
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

const activateTab = (tabName) => {
  tabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.tab === tabName);
  });

  panels.forEach((panel) => {
    panel.classList.toggle("active", panel.id === tabName);
  });
};

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    activateTab(tab.dataset.tab);
  });
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.forEach((l) => l.classList.remove("active")); // remove from others
    link.classList.add("active"); // add to clicked one
  });
});
contactBtns.forEach((button) => {
  button.addEventListener("click", () => {
    navLinks.forEach((l) => l.classList.remove("active"));
    contactLink.classList.add("active");
  });
});

window.onscroll = function () {
  if (
    document.body.scrollTop > 200 ||
    document.documentElement.scrollTop > 200
  ) {
    btn.classList.add("show");
  } else {
    btn.classList.remove("show");
  }
};

btn.onclick = function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
  navLinks.forEach((l) => l.classList.remove("active"));
};

function closeMenu() {
  sideMenu.classList.remove("open");
  hamburgerBtn.classList.remove("active");
}

hamburgerBtn.addEventListener("click", () => {
  hamburgerBtn.classList.toggle("active");
  sideMenu.classList.toggle("open");
});

closeBtn.addEventListener("click", closeMenu);

// Optional: close menu when a nav link is clicked
links.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

// Handling Form Data using API FormData
const form = document.querySelector(".form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);

  // Object.fromEntries(formData);
  console.log(
    "🚀 ~ Object.fromEntries(formData);:",
    Object.fromEntries(formData)
  );
});

// Another way but not good u keep track of all letter is written in input field
// const data = {};

// function handleInputValues(e) {
//   const inputName = e.target.name;
//   const inputValue = e.target.value;

//   data[inputName] = inputValue;

//   console.log("🚀 ~ handleInputValues ~ data:", data);
//   return { ...data };
// }

// form.addEventListener("input", handleInputValues);

const toggleBtn = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");

// Load saved theme or fallback to system preference
let savedTheme = localStorage.getItem("theme");

if (savedTheme) {
  document.documentElement.setAttribute("data-theme", savedTheme);
  themeIcon.textContent = savedTheme === "dark" ? "🌞" : "🌙";
} else {
  let prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  document.documentElement.setAttribute(
    "data-theme",
    prefersDark ? "dark" : "light"
  );
  themeIcon.textContent = prefersDark ? "🌞" : "🌙";
}

// Toggle theme
toggleBtn.addEventListener("click", () => {
  let current = document.documentElement.getAttribute("data-theme");
  let newTheme = current === "dark" ? "light" : "dark";

  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  themeIcon.textContent = newTheme === "dark" ? "🌞" : "🌙";
});
