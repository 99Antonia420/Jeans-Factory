// Jeans Factory — shared behavior
(function () {
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

  // Opening hours: Mo–Fr 10–13 & 14–18, Sa 10–14
  function openState(d) {
    var day = d.getDay(); // 0 Sun
    var mins = d.getHours() * 60 + d.getMinutes();
    if (day >= 1 && day <= 5) return (mins >= 600 && mins < 780) || (mins >= 840 && mins < 1080);
    if (day === 6) return mins >= 600 && mins < 840;
    return false;
  }
  var badge = document.querySelector('[data-open-badge]');
  if (badge) {
    var now = new Date();
    var open = openState(now);
    badge.classList.toggle('closed', !open);
    badge.querySelector('span:last-child').textContent = open ? 'Jetzt geöffnet' : 'Derzeit geschlossen';
  }
  // Highlight today's row
  var map = { 1: 'mo', 2: 'di', 3: 'mi', 4: 'do', 5: 'fr', 6: 'sa', 0: 'so' };
  var row = document.querySelector('.hours-row[data-day="' + map[new Date().getDay()] + '"]');
  if (row) row.classList.add('today');
})();
