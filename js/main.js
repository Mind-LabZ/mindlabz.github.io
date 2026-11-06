(function () {
  'use strict';

  // Mobile menu
  var nav = document.getElementById('nav');
  var toggle = nav.querySelector('.menu-toggle');
  var menu = document.getElementById('nav-menu');

  function setMenu(open) {
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
  }
  toggle.addEventListener('click', function () {
    setMenu(toggle.getAttribute('aria-expanded') !== 'true');
  });
  menu.addEventListener('click', function (e) {
    if (e.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      setMenu(false);
      toggle.focus();
    }
  });

  // Solid nav once the page scrolls
  function onScroll() {
    nav.classList.toggle('is-scrolled', window.scrollY > 24);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Games: the section takes on each game's color as it reaches the middle of the screen
  var games = document.querySelector('.games');
  if (games && 'IntersectionObserver' in window) {
    var panels = Array.prototype.slice.call(games.querySelectorAll('[data-bg]'));

    function activate(panel) {
      games.style.backgroundColor = panel.getAttribute('data-bg');
      panels.forEach(function (p) { p.classList.toggle('is-active', p === panel); });
    }

    games.classList.add('is-morphing');
    activate(panels[0]);

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) activate(entry.target);
      });
    }, { rootMargin: '-45% 0px -45% 0px' });

    panels.forEach(function (p) { io.observe(p); });
  }

  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
