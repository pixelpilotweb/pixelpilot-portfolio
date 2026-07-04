/* ==========================================
   PixelPilot Portfolio
   Main JavaScript
   Version: 1.1
========================================== */

/* ===========================
   PAGE LOADER
=========================== */

window.addEventListener("load", () => {
  const loader = document.getElementById("pageLoader");

  setTimeout(() => {
    loader.classList.add("hide");
  }, 600);
});
/* ==========================================
   DOM Elements
========================================== */

const header = document.querySelector(".header");
const menuBtn = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const topBtn = document.getElementById("backToTop");
const progressBar = document.getElementById("progressBar");

const navLinks = document.querySelectorAll(".nav-menu a");
const reveals = document.querySelectorAll(".reveal");
const counters = document.querySelectorAll("[data-count]");
const faqButtons = document.querySelectorAll(".faq-question");

/* ==========================================
   Event Listeners
========================================== */

document.addEventListener("DOMContentLoaded", init);

window.addEventListener("scroll", handleScroll);

/* ==========================================
   Initialize
========================================== */

function init() {
  initMobileMenu();
  initFAQ();
  initCounters();
  revealOnScroll();
}

/* ==========================================
   Scroll Events
========================================== */

function handleScroll() {
  updateHeader();
  updateProgressBar();
  toggleBackToTop();
  revealOnScroll();
}

// mobile menu
function initMobileMenu() {
  if (!menuBtn || !navMenu) return;

  menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("active");

    navMenu.classList.toggle("active");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menuBtn.classList.remove("active");

      navMenu.classList.remove("active");
    });
  });
}

// header
function updateHeader() {
  if (window.scrollY > 40) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}

// progress bar
function updateProgressBar() {
  if (!progressBar) return;

  const total = document.documentElement.scrollHeight - window.innerHeight;

  const progress = (window.scrollY / total) * 100;

  progressBar.style.width = progress + "%";
}

// back to top btn
function toggleBackToTop() {
  if (!topBtn) return;

  if (window.scrollY > 500) {
    topBtn.classList.add("show");
  } else {
    topBtn.classList.remove("show");
  }
}
topBtn?.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Reveal Animation
function revealOnScroll() {
  reveals.forEach((section) => {
    const top = section.getBoundingClientRect().top;

    if (top < window.innerHeight - 120) {
      section.classList.add("show");
    }
  });
}

// FAQ
function initFAQ() {
  faqButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.parentElement;

      const answer = item.querySelector(".faq-answer");

      const isOpen = item.classList.contains("active");

      /* Close Others */

      document.querySelectorAll(".faq-item").forEach((faq) => {
        faq.classList.remove("active");

        faq.querySelector(".faq-answer").style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add("active");

        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });
}

// counter
function initCounters() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const counter = entry.target;

      const target = parseInt(counter.dataset.count);

      let current = 0;

      const increment = Math.max(1, target / 60);

      function update() {
        current += increment;

        if (current >= target) {
          counter.textContent = target;
        } else {
          counter.textContent = Math.floor(current);

          requestAnimationFrame(update);
        }
      }

      update();

      observer.unobserve(counter);
    });
  });

  counters.forEach((counter) => observer.observe(counter));
}
// custom cursor
/* ===========================
   CUSTOM CURSOR
=========================== */

const cursorDot = document.querySelector(".cursor-dot");
const cursorRing = document.querySelector(".cursor-ring");

if (
  window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
  cursorDot &&
  cursorRing
) {
  let mouseX = 0;
  let mouseY = 0;

  let ringX = 0;
  let ringY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursorDot.style.left = mouseX + "px";
    cursorDot.style.top = mouseY + "px";
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;

    cursorRing.style.left = ringX + "px";
    cursorRing.style.top = ringY + "px";

    requestAnimationFrame(animateRing);
  }

  animateRing();

  const hoverElements = document.querySelectorAll(
    "a, button, .btn, .project-card, .service-card, .faq-question",
  );

  hoverElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      document.body.classList.add("cursor-hover");
    });

    el.addEventListener("mouseleave", () => {
      document.body.classList.remove("cursor-hover");
    });
  });
}

/* ===========================
   EMAILJS
=========================== */

if (typeof emailjs !== "undefined") {
  emailjs.init({
    publicKey: "acICEvHNAyaPm08Og",
  });

  const form = document.getElementById("contactForm");

  form?.addEventListener("submit", function (e) {
    e.preventDefault();

    const submitBtn = form.querySelector("button");

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    emailjs
      .sendForm("service_n1x6thw", "template_jsyg2mp", this)

      .then(() => {
        showToast("Message sent successfully!");

        form.reset();

        submitBtn.disabled = false;
        submitBtn.textContent = "Send Message";
      })

      .catch((error) => {
        console.error(error);

        showToast("Failed to send message.");

        submitBtn.disabled = false;
        submitBtn.textContent = "Send Message";
      });
  });
} else {
  console.error("EmailJS library not loaded.");
}

/* ===========================
   TOAST
=========================== */

function showToast(message) {
  const toast = document.getElementById("toast");

  if (!toast) {
    console.warn("Toast element not found.");
    return;
  }

  toast.textContent = message;

  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}
