(function () {
  "use strict";

  var CONTACT_EMAIL = "silvy@rajagiritech.edu.in";

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Toast ---------- */
  var toast = document.getElementById("toast");
  var toastTimer;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove("is-visible");
    }, 2200);
  }

  /* ---------- Mobile menu ---------- */
  var menuBtn = document.querySelector(".menu-toggle");
  var nav = document.getElementById("site-nav");

  function setMenu(open) {
    nav.classList.toggle("is-open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.querySelector(".menu-label").textContent = open ? "Close" : "Menu";
  }

  if (menuBtn && nav) {
    menuBtn.addEventListener("click", function () {
      setMenu(menuBtn.getAttribute("aria-expanded") !== "true");
    });

    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") setMenu(false);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        setMenu(false);
        menuBtn.focus();
      }
    });
  }

  /* ---------- Highlight the current section in the nav ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".site-nav a"));
  var sections = navLinks
    .map(function (link) {
      return document.querySelector(link.getAttribute("href"));
    })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          navLinks.forEach(function (link) {
            var active = link.getAttribute("href") === "#" + entry.target.id;
            link.classList.toggle("is-active", active);
            if (active) link.setAttribute("aria-current", "true");
            else link.removeAttribute("aria-current");
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach(function (s) { observer.observe(s); });
  }

  /* ---------- Work / Education tabs ---------- */
  var tabs = Array.prototype.slice.call(document.querySelectorAll('[role="tab"]'));

  function selectTab(tab, moveFocus) {
    tabs.forEach(function (t) {
      var selected = t === tab;
      t.setAttribute("aria-selected", String(selected));
      t.tabIndex = selected ? 0 : -1;
      document.getElementById(t.getAttribute("aria-controls")).hidden = !selected;
    });
    if (moveFocus) tab.focus();
  }

  tabs.forEach(function (tab, i) {
    tab.addEventListener("click", function () { selectTab(tab, false); });

    tab.addEventListener("keydown", function (e) {
      var next;
      if (e.key === "ArrowRight") next = tabs[(i + 1) % tabs.length];
      else if (e.key === "ArrowLeft") next = tabs[(i - 1 + tabs.length) % tabs.length];
      else if (e.key === "Home") next = tabs[0];
      else if (e.key === "End") next = tabs[tabs.length - 1];
      if (next) {
        e.preventDefault();
        selectTab(next, true);
      }
    });
  });

  /* ---------- Copy buttons ---------- */
  function fallbackCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    var ok = false;
    try { ok = document.execCommand("copy"); } catch (err) { ok = false; }
    document.body.removeChild(ta);
    return ok;
  }

  document.querySelectorAll("[data-copy]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var text = btn.getAttribute("data-copy");
      var done = function () { showToast("Copied " + text); };
      var fail = function () { showToast("Could not copy. Please select and copy it by hand."); };

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(done, function () {
          fallbackCopy(text) ? done() : fail();
        });
      } else {
        fallbackCopy(text) ? done() : fail();
      }
    });
  });

  /* ---------- Contact form: validate, then open the email app ---------- */
  var form = document.getElementById("contact-form");
  var status = document.getElementById("form-status");

  function setError(input, message) {
    var error = document.getElementById(input.id + "-error");
    error.textContent = message;
    if (message) {
      input.setAttribute("aria-invalid", "true");
      input.setAttribute("aria-describedby", error.id);
    } else {
      input.removeAttribute("aria-invalid");
      input.removeAttribute("aria-describedby");
    }
    return !message;
  }

  function validate(form) {
    var name = form.elements.name;
    var email = form.elements.email;
    var message = form.elements.message;
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    var checks = [
      setError(name, name.value.trim() ? "" : "Enter your name."),
      setError(
        email,
        !email.value.trim()
          ? "Enter your email so I can reply."
          : emailPattern.test(email.value.trim())
            ? ""
            : "Enter a valid email, like name@example.com."
      ),
      setError(message, message.value.trim() ? "" : "Write a short message.")
    ];

    if (checks.every(Boolean)) return true;

    var firstBad = form.querySelector('[aria-invalid="true"]');
    if (firstBad) firstBad.focus();
    return false;
  }

  if (form) {
    form.addEventListener("input", function (e) {
      if (e.target.getAttribute("aria-invalid") === "true") setError(e.target, "");
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      status.textContent = "";
      if (!validate(form)) return;

      var name = form.elements.name.value.trim();
      var email = form.elements.email.value.trim();
      var message = form.elements.message.value.trim();

      var subject = "Message from " + name;
      var body = message + "\n\nFrom: " + name + " (" + email + ")";

      window.location.href =
        "mailto:" + CONTACT_EMAIL +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);

      status.textContent =
        "Your email app should open now. If it does not, write to " + CONTACT_EMAIL + ".";
    });
  }
})();
