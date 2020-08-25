/* ---------------------------------------------------- */
/* ----- PARALLAX ----- */
/* ---------------------------------------------------- */

window.addEventListener("DOMContentLoaded", init,  false);

function init() {
  var scrollY = window.scrollY;
  document.querySelectorAll('.main__services-parallax__box').forEach(function(node) {
    var rect = node.getBoundingClientRect();
    node.style.setProperty('--offset-y', rect.top + scrollY);
  });
  window.addEventListener('scroll', function() {
    document.body.style.setProperty('--scroll-y', window.scrollY);
    document.body.style.setProperty('--scroll-x', window.scrollX);
  });
}
