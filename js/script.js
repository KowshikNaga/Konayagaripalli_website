// =========================================================
// KONAYAGARIPALLI — SCRIPT
// Two small features live here:
//   1. Character counter on the "Advice / Concerns" textarea
//   2. Horizontal scroller + progress bar for "Meet our members"
// =========================================================

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Navbar: move the "active" pill to whichever link you click ---------- */
  var navLinks = document.querySelectorAll('.nav-links a');

  function setActiveLink(link) {
    navLinks.forEach(function (l) { l.classList.remove('active'); });
    link.classList.add('active');
  }

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      setActiveLink(link);
    });
  });

  // On page load, if the URL already has a #hash matching a nav link
  // (e.g. someone opened yoursite.com/#members), highlight that one.
  // Otherwise default to the first link.
  var initialLink = null;
  if (window.location.hash) {
    initialLink = document.querySelector('.nav-links a[href="' + window.location.hash + '"]');
  }
  setActiveLink(initialLink || navLinks[0]);

  /* ---------- Advice / Concerns: character counter ---------- */
  var adviceField = document.getElementById('advice-message');
  var charCount = document.getElementById('advice-char-count');

  if (adviceField && charCount) {
    var maxLen = adviceField.getAttribute('maxlength') || 2000;
    adviceField.addEventListener('input', function () {
      charCount.textContent = adviceField.value.length + ' / ' + maxLen;
    });
  }

  var adviceForm = document.getElementById('advice-form');
  if (adviceForm) {
    adviceForm.addEventListener('submit', function (e) {
      e.preventDefault();
      // Hook this up to your backend / form service of choice.
      alert('Thanks — your message has been noted. (Wire this up to your backend to actually send it.)');
      adviceForm.reset();
      if (charCount) charCount.textContent = '0 / ' + (adviceField ? adviceField.getAttribute('maxlength') : 2000);
    });
  }

  /* ---------- Members: horizontal scroll + progress bar ---------- */
  var scrollEl = document.getElementById('members-scroll');
  var fillEl = document.getElementById('members-scroll-fill');
  var prevBtn = document.getElementById('members-prev');
  var nextBtn = document.getElementById('members-next');

  function updateFill() {
    if (!scrollEl || !fillEl) return;
    var maxScroll = scrollEl.scrollWidth - scrollEl.clientWidth;
    var pct = maxScroll > 0 ? (scrollEl.scrollLeft / maxScroll) * 100 : 0;
    var minWidth = 15; // keep the bar visible even at the start
    fillEl.style.width = Math.max(pct, minWidth) + '%';
  }

  if (scrollEl) {
    scrollEl.addEventListener('scroll', updateFill);
    updateFill();

    var cardWidth = 240; // approx card width + gap, matches .member-card flex-basis + gap in style.css

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        scrollEl.scrollBy({ left: -cardWidth, behavior: 'smooth' });
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        scrollEl.scrollBy({ left: cardWidth, behavior: 'smooth' });
      });
    }
  }

});
