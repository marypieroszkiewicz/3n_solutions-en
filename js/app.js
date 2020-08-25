document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------- */
  /* ----- TOGGLE HEADER MENU ----- */
  /* ---------------------------------------------------- */

  const btn = document.querySelector('#btnToggle');
  btn.addEventListener('click', function (e) {
    e.preventDefault();
    document.body.classList.toggle('menu--show');
    this.classList.toggle('btn-toggle--toggled');
  });


  /* ---------------------------------------------------- */
  /* ----- TOGGLE SUBMENU ----- */
  /* ---------------------------------------------------- */

  const submenu = document.querySelector('.menu__link-dropdown');
  submenu.addEventListener('click', function (evt) {
    evt.preventDefault();
    document.querySelector('.menu-dropdown').classList.toggle('menu-dropdown--show');
  });


  const media = window.matchMedia('(min-width: 1024px)');

  if (media.matches) {

    let scrollpos = window.scrollY;
    const dropdown = document.querySelector('.menu-dropdown');
    const dropdownHeight = dropdown.offsetHeight;

    const remove_class_on_scroll = () => dropdown.classList.remove('menu-dropdown--show');


    window.addEventListener('scroll', function() {
      scrollpos = window.scrollY


      if (scrollpos >= dropdownHeight) {
        remove_class_on_scroll()
      }

      //console.log(scrollpos)
    });



    addEventListener (
        'scroll',
        _ => [...document.querySelectorAll('.menu-submenu--show')]
            .forEach(
                e => e.classList.remove('menu-submenu--show')
            )
    );


  }


  const menu = document.querySelector(".menu");
  const links = menu.querySelectorAll("a:not(.js-anchor--link)");

  for (const el of links) {
    el.addEventListener("click", function (e) {
      e.preventDefault();

      const ul = this.nextElementSibling;
      if (ul !== null) {
        ul.classList.toggle("menu-submenu--show");
      }


      let par = this.parentElement;
      while (true) {
        if (par.parentElement.classList.contains("menu")) break;
        par = par.parentElement;
      }

      console.log(par)
      const mainLiChild = menu.children;
      for (const li of mainLiChild) {
        if (li !== par) {
          li.querySelectorAll(".menu-submenu").forEach(el =>
              el.classList.remove("menu-submenu--show"));}
      }
    })
  }


  /* ---------------------------------------------------- */
  /* ----- HIGHLIGHT CURRENT PAGE ACTIVE MENU ITEM ----- */
  /* ---------------------------------------------------- */

  const items = document.querySelectorAll('.menu__link');

  function makeActive() {

    items.forEach(elem => elem.classList.remove('active'));
    this.classList.add('active');

  }

  items.forEach(elem => {
    elem.addEventListener('click', makeActive);
  });


  /* ---------------------------------------------------- */
  /* ----- SHOW / HIDE BOXES ----- */
  /* ---------------------------------------------------- */

  const tabs = document.querySelectorAll('.js-tabs-el');
  const tabsCnt = document.querySelectorAll('.js-tabs-content');

  function mark(e) {
    e.preventDefault();

    //usuwam klasę aktywna z zakladek
    tabs.forEach(el => el.classList.remove('is-active'));

    //dodaje tylko wybranej
    this.classList.add('is-active');

    const link = this.querySelector('a');
    const href = link.getAttribute('href');
    const targetTab = document.querySelector(href);

    //usuwam aktywna klase z tresci
    tabsCnt.forEach(el => el.classList.remove('is-active'));
    //dodaje tylko wybranej
    targetTab.classList.add('is-active');

  }

  function unmark() {
    tabs.forEach(el => el.classList.remove('is-active'));
    tabsCnt.forEach(el => el.classList.remove('is-active'));
  }

  tabs.forEach(el => {
    el.addEventListener('click', mark);
  });



  /* ---------------------------------------------------- */
  /* ----- WIZARD STAGE PROGRESS ----- */
  /* ---------------------------------------------------- */

  const stages = document.querySelectorAll('.maintenance__wizard-stage');
  const boxes = document.querySelectorAll ('.maintenance__wizard-content__box');

  function markbox(e) {
    e.preventDefault();

    stages.forEach(el => el.classList.remove('is-enabled'));

    this.classList.add('is-enabled');

    const stage = this.querySelector('a');
    const href = stage.getAttribute('href');
    const targetBox = document.querySelector(href);

    boxes.forEach(el => el.classList.remove('is-enabled'));
    targetBox.classList.add('is-enabled');
  }

  function unmarkbox() {
    stages.forEach(el => el.classList.remove('is-enabled'));
    boxes.forEach(el => el.classList.remove('is-enabled'));
  }

  stages.forEach(el => {
    el.addEventListener('click', markbox);
  });

})



