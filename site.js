// Jeans Factory — shared behavior
(function () {
  'use strict';

  // Clickjacking-Schutz: GitHub Pages kann keine frame-ancestors/X-Frame-Options
  // Header senden, daher Framebuster als Fallback.
  if (window.top !== window.self) {
    try { window.top.location = window.self.location; }
    catch (e) { document.documentElement.style.display = 'none'; }
  }

  // Mobile nav
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
    });
  }

  // Reveal on scroll
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

  // Kontaktformular (standort.html): öffnet die E-Mail-App per mailto
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('cf-name').value;
      var email = document.getElementById('cf-email').value;
      var msg = document.getElementById('cf-msg').value;
      var body = msg + '\n\n– ' + name + ' (' + email + ')';
      location.href = 'mailto:jeansfactory@modehaus-alber.de?subject=' +
        encodeURIComponent('Anfrage über die Website') + '&body=' + encodeURIComponent(body);
    });
  }

  // Lightbox (galerie.html)
  var lb = document.getElementById('lightbox');
  if (lb) {
    var lbImg = lb.querySelector('img');
    document.querySelectorAll('.masonry .photo img').forEach(function (img) {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', function () {
        lbImg.src = img.src; lbImg.alt = img.alt;
        lb.classList.add('open');
      });
    });
    lb.addEventListener('click', function () { lb.classList.remove('open'); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') lb.classList.remove('open'); });
  }
})();
