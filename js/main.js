/* Site logic — you shouldn't need to edit this file.
   Your details: js/site.js · Your projects: js/projects.js */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var canHover = window.matchMedia("(hover: hover)").matches;
  var pad = function (n) { return String(n).padStart(2, "0"); };
  var isEmbed = function (url) { return /youtube\.com|youtu\.be|vimeo\.com/.test(url); };

  /* ---------- Fill in text & links from site.js ---------- */
  function fillSite() {
    document.title = SITE.name + " — " + SITE.role;
    document.querySelectorAll("[data-site]").forEach(function (el) {
      var value = SITE[el.dataset.site];
      if (value) el.textContent = value;
    });

    var links = {
      email: "mailto:" + SITE.email,
      "email-btn": "mailto:" + SITE.email,
      instagram: SITE.instagramUrl,
      phone: "tel:" + SITE.phone.replace(/[^\d+]/g, ""),
    };
    var labels = { email: SITE.email, instagram: SITE.instagram, phone: SITE.phone };
    document.querySelectorAll("[data-link]").forEach(function (el) {
      var key = el.dataset.link;
      el.href = links[key];
      if (!el.textContent.trim() && labels[key]) el.textContent = labels[key];
    });

    var portrait = document.getElementById("portrait");
    portrait.src = SITE.portrait;
    portrait.alt = "Portrait of " + SITE.name;
  }

  /* ---------- Hero video ---------- */
  function initHero() {
    var video = document.getElementById("heroVideo");
    var mobile = SITE.heroVideoMobile && window.matchMedia("(max-width: 720px) and (orientation: portrait)").matches;
    var poster = mobile ? SITE.heroPosterMobile : SITE.heroPoster;
    if (poster) {
      video.poster = poster;
      video.parentElement.style.backgroundImage = "url('" + poster + "')";
    }
    if (reduceMotion) return; // poster only
    video.src = mobile ? SITE.heroVideoMobile : SITE.heroVideo;
    video.play().catch(function () {});
  }

  /* ---------- Work grid ---------- */
  function initWork() {
    var grid = document.getElementById("workGrid");
    document.getElementById("projectCount").textContent = pad(PROJECTS.length) + " Projects";

    PROJECTS.forEach(function (p, i) {
      var a = document.createElement("a");
      a.className = "project reveal" + (p.featured ? " featured" : "");
      a.href = p.video;
      a.style.setProperty("--d", (p.featured ? 0 : (i % 3) * 0.12) + "s");
      a.innerHTML =
        '<div class="project-media">' +
          '<img src="' + p.poster + '" alt="' + p.title + '" loading="lazy" decoding="async" />' +
          (p.preview ? '<video muted loop playsinline preload="none" aria-hidden="true"></video>' : "") +
          '<span class="project-play">Play Film</span>' +
        "</div>" +
        '<div class="project-info">' +
          '<span class="project-num">' + pad(i + 1) + "</span>" +
          '<h3 class="project-title">' + p.title + "</h3>" +
          '<span class="project-cat">' + p.category + "</span>" +
        "</div>";

      a.addEventListener("click", function (e) {
        e.preventDefault();
        openPlayer(p, i);
      });
      grid.appendChild(a);

      if (p.preview && !reduceMotion) setupPreview(a, p.preview);
    });
  }

  // Preview clips are only downloaded when needed (hover on desktop, in view on phones)
  var touchObserver = null;
  function setupPreview(card, src) {
    var media = card.querySelector(".project-media");
    var video = media.querySelector("video");
    var play = function () {
      if (!video.src) video.src = src;
      var pr = video.play();
      if (pr) pr.then(function () { media.classList.add("playing"); }).catch(function () {});
    };
    var stop = function () {
      video.pause();
      media.classList.remove("playing");
    };

    if (canHover) {
      card.addEventListener("mouseenter", play);
      card.addEventListener("mouseleave", stop);
      card.addEventListener("focus", play);
      card.addEventListener("blur", stop);
    } else {
      if (!touchObserver) {
        touchObserver = new IntersectionObserver(function (entries) {
          entries.forEach(function (en) {
            en.target._preview[en.isIntersecting ? "play" : "stop"]();
          });
        }, { threshold: 0.6 });
      }
      card._preview = { play: play, stop: stop };
      touchObserver.observe(card);
    }
  }

  /* ---------- Player ---------- */
  var player, stage, lastFocus;
  function openPlayer(p, i) {
    lastFocus = document.activeElement;
    document.getElementById("playerNum").textContent = pad(i + 1);
    document.getElementById("playerTitle").textContent = p.title;
    document.getElementById("playerCat").textContent = p.category;

    if (isEmbed(p.video)) {
      stage.innerHTML = '<iframe src="' + p.video + (p.video.indexOf("?") > -1 ? "&" : "?") +
        'autoplay=1" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>';
    } else {
      var v = document.createElement("video");
      v.src = p.video;
      v.controls = true;
      v.autoplay = true;
      v.playsInline = true;
      stage.appendChild(v);
    }

    player.hidden = false;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(function () { player.classList.add("open"); });
    document.getElementById("playerClose").focus();
  }

  function closePlayer() {
    if (player.hidden) return;
    player.classList.remove("open");
    var v = stage.querySelector("video");
    if (v) v.pause();
    setTimeout(function () {
      player.hidden = true;
      stage.innerHTML = "";
    }, reduceMotion ? 0 : 400);
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus({ preventScroll: true });
  }

  function initPlayer() {
    player = document.getElementById("player");
    stage = document.getElementById("playerStage");
    document.getElementById("playerClose").addEventListener("click", closePlayer);
    player.addEventListener("click", function (e) {
      if (e.target === player || e.target === stage) closePlayer();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closePlayer();
    });
  }

  /* ---------- Services ---------- */
  function initServices() {
    var list = document.getElementById("serviceList");
    list.innerHTML = SITE.services.map(function (s, i) {
      return '<li class="service reveal">' +
        '<span class="service-num">' + pad(i + 1) + "</span>" +
        '<span class="service-name">' + s.name + "</span>" +
        '<span class="service-text">' + s.text + "</span>" +
        "</li>";
    }).join("");
  }

  /* ---------- Scroll reveal & nav ---------- */
  function initReveal() {
    var els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (el) { io.observe(el); });
  }

  function initNav() {
    var nav = document.getElementById("nav");
    var onScroll = function () { nav.classList.toggle("scrolled", window.scrollY > 40); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  fillSite();
  initHero();
  initWork();
  initServices();
  initPlayer();
  initReveal();
  initNav();
})();
