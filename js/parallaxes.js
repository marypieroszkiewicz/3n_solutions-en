/* ---------------------------------------------------- */
/* ----- PARALLAX ----- */
/* ---------------------------------------------------- */


window.addEventListener("DOMContentLoaded", scrollLoop,  false);

const parallax1 = document.querySelector('.main__services-parallax__box-img--first');
const parallax2 = document.querySelector('.main__services-parallax__box-img--second');
const parallax3 = document.querySelector('.main__services-parallax__box-img--third');
const parallax4 = document.querySelector('.main__services-parallax__box-img--fourth');
const parallax5 = document.querySelector('.main__services-parallax__box-img--fifth');


let xScrollPosition;
let yScrollPosition;

function scrollLoop(e) {
  xScrollPosition = window.scrollX;
  yScrollPosition = window.scrollY;

  const parallaxes = [parallax1, parallax2, parallax3, parallax4, parallax5];

  parallaxes.map((p, i)=>{
    const offset =  p.offsetParent.offsetTop + p.offsetTop
    setTranslate(0, (yScrollPosition - offset) * -0.08 + 20, p)
  })

  requestAnimationFrame(scrollLoop);
}

function setTranslate(xPos, yPos, el) {
  el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
}