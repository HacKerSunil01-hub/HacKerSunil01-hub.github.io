document.addEventListener("DOMContentLoaded", () => {
  // COPYRIGHT YEAR
  const yearElement = document.getElementById("current-year");
  if (yearElement) yearElement.textContent = new Date().getFullYear();

  // MOBILE NAVIGATION
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("menu-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("menu-open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("click", event => {
      if (!menuToggle.contains(event.target) && !navLinks.contains(event.target)) {
        navLinks.classList.remove("menu-open");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // SMOOTH SCROLLING
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", event => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;
      const target = document.querySelector(targetId);
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // ACTIVE NAVIGATION
  const sections = document.querySelectorAll("main section[id]");
  const navigationLinks = document.querySelectorAll(".nav-links a");

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navigationLinks.forEach(link => {
          link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    }, { rootMargin: "-30% 0px -60% 0px" });
    sections.forEach(section => sectionObserver.observe(section));
  }

  // SCROLL REVEAL: hero items are included so they cannot remain hidden.
  const revealElements = document.querySelectorAll(
    ".hero-content, .hero-image, .content-section, .stat-card, .timeline-item, " +
    ".skill-card, .project-card, .education-card, .internship-card, .certification-card"
  );
  revealElements.forEach(element => element.classList.add("reveal"));

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealElements.forEach(element => revealObserver.observe(element));
  } else {
    revealElements.forEach(element => element.classList.add("visible"));
  }

  // SUBTLE TERMINAL INTRO: cycles through truthful learning/project messages.
  const terminalText = document.getElementById("terminalText");
  const terminalMessages = [
    "learning --track blue-team",
    "project status: VYRNOX completed",
    "project status: SENTRIX in-development",
    "focus: network-security + SOC fundamentals"
  ];
  if (terminalText && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    let messageIndex = 0;
    window.setInterval(() => {
      messageIndex = (messageIndex + 1) % terminalMessages.length;
      terminalText.textContent = terminalMessages[messageIndex];
    }, 3600);
  }

  // HEADER SCROLL EFFECT
  const header = document.querySelector(".header");
  if (header) {
    const updateHeader = () => header.classList.toggle("scrolled", window.scrollY > 40);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
  }

  // CERTIFICATE MODAL
  const modal = document.getElementById("certificateModal");
  const modalImage = document.getElementById("certificateModalImage");
  const modalTitle = document.getElementById("certificateModalTitle");
  const closeButton = document.getElementById("closeCertificateModal");
  const certificateButtons = document.querySelectorAll(".certificate-view");
  let previouslyFocusedElement = null;

  function openCertificate(imagePath, title) {
    if (!modal || !modalImage || !modalTitle) return;
    previouslyFocusedElement = document.activeElement;
    modalImage.src = imagePath;
    modalImage.alt = title;
    modalTitle.textContent = title;
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    if (closeButton) closeButton.focus();
  }

  function closeCertificate() {
    if (!modal) return;
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (modalImage) modalImage.src = "";
    if (previouslyFocusedElement) previouslyFocusedElement.focus();
  }

  certificateButtons.forEach(button => {
    button.addEventListener("click", () => {
      const imagePath = button.dataset.preview;
      const title = button.dataset.title || "Certificate Preview";
      if (imagePath) openCertificate(imagePath, title);
    });
  });

  if (closeButton) closeButton.addEventListener("click", closeCertificate);
  if (modal) {
    modal.addEventListener("click", event => {
      if (event.target === modal) closeCertificate();
    });
  }
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && modal && modal.classList.contains("active")) {
      closeCertificate();
    }
  });

  console.log("%cSunil Choudhary | Cybersecurity Portfolio",
    "color:#00b8ff;font-size:16px;font-weight:bold;");
  console.log("Portfolio loaded successfully.");
});
