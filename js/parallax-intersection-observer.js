  //TODO get image and container dimensions after loaded DOM

  const getElementBackgroundHeight = (entry) => {
    let backgroundImage = new Image();
    let backgroundImageUrl = window.getComputedStyle(entry, null).getPropertyValue("background-image");
    backgroundImageUrl = backgroundImageUrl.substr(4).slice(0, -1);
    // to get MS EDGE Compatybility (edge get url withour quotation marks)
    backgroundImage.src = backgroundImageUrl.replace(/["']/g, "");

    return backgroundImage.height;
  };

  let isScrolling = false;
  let elementAnimatingScrollPos;



  const changeBackgroundPos = (entry, intersectionTriggerScrollPos, elementBackgroundStartPosition) => {

    //using requestAnimationFrame
    // let changePos = () => {
    //   elementAnimatingScrollPos = window.scrollY;
    //   entry.style.backgroundPosition = "0 "  + (elementBackgroundStartPosition - (elementAnimatingScrollPos - intersectionTriggerScrollPos)/parallaxSpeed)  + "px";
    // }
    // function myFunc() {
    //   window.requestAnimationFrame(changePos);
    //   if (!animateBackground) {
    //      clearInterval(interval);
    //      document.removeEventListener("scroll", myFunc, true);
    //   }
    // }

    function myFunc() {
      isScrolling = true;
    }

    let interval = setInterval( () => {
      if (isScrolling) {
        isScrolling = false;
        elementAnimatingScrollPos = window.scrollY;
        entry.style.backgroundPosition = "0 "  + (elementBackgroundStartPosition - (elementAnimatingScrollPos - intersectionTriggerScrollPos)/parallaxSpeed)  + "px";

        if (!animateBackground) {
          clearInterval(interval);
          document.removeEventListener("scroll", myFunc, true);
        }
      }
    }, `${speedRatio}0` );

    document.addEventListener("scroll", myFunc, true);
  };

  let initialScrollPos = 0;
  let intersectionTriggerScrollPos;
  let animateBackground = true;
  let endBackgroundPosition;
  let dontHaveObservableElementData = true;
  let parallaxSpeed;
  let speedRatio = 8; //transition and refreshing parallax background position, set the number between 1-9. 1 for fastest refreshing and lowest performance (in theory), 9 for best performance and lowest refreshing ratio. For best results put a number sth between 5-7. I recommend setting 8 - looks great and perfomarce is great too.




  const getObservableElementData = (entry) => {
    let elementHeight = entry.target.clientHeight;
    let elementBackgroundHeight = getElementBackgroundHeight(entry.target);
    endBackgroundPosition = elementBackgroundHeight - elementHeight;
    parallaxSpeed = ((window.innerHeight + elementHeight)/endBackgroundPosition); // *2.[x] , 2 - to half background height, x - ratio margin
    entry.target.style.transition = `background-position ${speedRatio}0ms linear`;
    dontHaveObservableElementData = false;
  };

  window.onload = () => {

    let observableElements = [].slice.call( document.querySelectorAll('.observable') );
    let observerParallax = new IntersectionObserver( entries => {

      entries.forEach( entry => {
        if (dontHaveObservableElementData) {
          getObservableElementData(entry);
        }
        if (entry.isIntersecting) {
          intersectionTriggerScrollPos = window.scrollY;
          animateBackground = true;
          if (intersectionTriggerScrollPos > initialScrollPos) {
            changeBackgroundPos( entry.target, intersectionTriggerScrollPos, 0); // 0 - elementBackgroundStartPosition
          } else {
            changeBackgroundPos( entry.target, intersectionTriggerScrollPos, -endBackgroundPosition);
          }

        } else {
          animateBackground = false;
          intersectionTriggerScrollPos = window.scrollY;
          if (intersectionTriggerScrollPos > elementAnimatingScrollPos) {
            setTimeout( () => {
              entry.target.style.backgroundPosition = "0 " + (-endBackgroundPosition) + "px";
            }, 100);

          } else {
            setTimeout( () => {
              entry.target.style.backgroundPosition = "0 0"
            }, 100);
          }

          initialScrollPos = window.scrollY;
        }

      })
    });

    observableElements.forEach(entry => {
      observerParallax.observe(entry);
    })
  };
