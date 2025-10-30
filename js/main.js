// main.js — menu toggle behaviour with accessibility + outside click + escape key + close on link click

(function () {
  const menuToggle = document.getElementById("menu-toggle");
  const headerList = document.getElementById("primary-navigation");
  const body = document.body;

  if (!menuToggle || !headerList) return;

  function openMenu() {
    menuToggle.classList.add("active");
    headerList.classList.add("active");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close menu");
    // optionally prevent body scroll when menu open on small screens
    if (window.matchMedia("(max-width: 768px)").matches) {
      body.style.overflow = "hidden";
    }
  }

  function closeMenu() {
    menuToggle.classList.remove("active");
    headerList.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
    body.style.overflow = "";
  }

  menuToggle.addEventListener("click", (e) => {
    const expanded = menuToggle.classList.toggle("active");
    headerList.classList.toggle("active");
    const isOpen = menuToggle.classList.contains("active");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    if (isOpen && window.matchMedia("(max-width: 768px)").matches) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "";
    }
  });

  // close when link clicked (use event delegation)
  headerList.addEventListener("click", (e) => {
    const target = e.target;
    if (target.matches(".header-link")) {
      // close only on small screens where overlay is used
      if (window.matchMedia("(max-width: 768px)").matches) {
        closeMenu();
      }
    }
  });

  // close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeMenu();
    }
  });

  // click outside to close (only when menu is open)
  document.addEventListener("click", (e) => {
    const isClickInsideNav = headerList.contains(e.target) || menuToggle.contains(e.target);
    if (!isClickInsideNav && headerList.classList.contains("active")) {
      closeMenu();
    }
  });

  // Optional: close menu when resizing up (so state doesn't persist)
  window.addEventListener("resize", () => {
    if (window.matchMedia("(min-width: 769px)").matches) {
      // ensure menu closed on desktop
      closeMenu();
    }
  });
})();


// Slideshow kod
const slides = document.querySelectorAll('.slide');
let current = 0;

function showNextSlide() {
  slides[current].classList.remove('active');
  current = (current + 1) % slides.length;
  slides[current].classList.add('active');
}

// har 2 soniyada slaydni almashtirish
setInterval(showNextSlide, 2000);


