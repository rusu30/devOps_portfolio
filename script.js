// ============================================================
// Portfolio interactions — typing effect, counters, scroll reveal
// ============================================================
(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------- Footer year ----------
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---------- Terminal typing effect ----------
  var typedEl = document.getElementById("typed");
  var typedText = "whoami --role devops --focus kubernetes,aws,gitops";

  function typeWriter() {
    if (!typedEl) return;
    if (prefersReducedMotion) {
      typedEl.textContent = typedText;
      return;
    }
    var i = 0;
    (function tick() {
      if (i <= typedText.length) {
        typedEl.textContent = typedText.slice(0, i);
        i++;
        setTimeout(tick, 28);
      }
    })();
  }
  typeWriter();

  // ---------- Status bar uptime counter ----------
  var uptimeEl = document.getElementById("uptimeCounter");
  function animateUptime() {
    if (!uptimeEl) return;
    if (prefersReducedMotion) {
      uptimeEl.textContent = "99.98%";
      return;
    }
    var target = 99.98;
    var current = 0;
    var step = target / 60;
    var interval = setInterval(function () {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      uptimeEl.textContent = current.toFixed(2) + "%";
    }, 20);
  }
  animateUptime();

  // ---------- Animated stat counters ----------
  var statEls = document.querySelectorAll(".stat-value[data-count]");

  function animateCount(el) {
    var target = parseInt(el.getAttribute("data-count"), 10) || 0;
    if (prefersReducedMotion) {
      el.textContent = target;
      return;
    }
    var current = 0;
    var duration = 900;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      current = Math.floor(progress * target);
      el.textContent = current;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    }
    requestAnimationFrame(step);
  }

  // ---------- Scroll reveal via IntersectionObserver ----------
  var revealTargets = document.querySelectorAll(
    ".panel, .section-head, .logentry"
  );
  revealTargets.forEach(function (el) {
    el.classList.add("reveal");
  });

  var statsTriggered = false;

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");

            // Trigger stat counters once the about panel is visible
            if (!statsTriggered && entry.target.classList.contains("about-panel")) {
              statsTriggered = true;
              statEls.forEach(animateCount);
            }

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    revealTargets.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: reveal everything immediately
    revealTargets.forEach(function (el) {
      el.classList.add("is-visible");
    });
    statEls.forEach(animateCount);
  }

  // ---------- Active nav link highlighting ----------
  var sections = document.querySelectorAll("main .section");
  var navLinks = document.querySelectorAll(".nav-links a");

  function setActiveLink() {
    var scrollPos = window.scrollY + 160;
    sections.forEach(function (section) {
      var top = section.offsetTop;
      var bottom = top + section.offsetHeight;
      var id = section.getAttribute("id");
      var link = document.querySelector('.nav-links a[href="#' + id + '"]');
      if (!link) return;
      if (scrollPos >= top && scrollPos < bottom) {
        navLinks.forEach(function (l) { l.style.color = ""; });
        link.style.color = "var(--cyan)";
      }
    });
  }

  window.addEventListener("scroll", setActiveLink, { passive: true });
  setActiveLink();
})();
