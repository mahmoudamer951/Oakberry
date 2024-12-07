class Slider {
  imgSlide(a) {
    const slider = document.querySelector(".imgGroup-" + a),
      slides = Array.from(document.querySelectorAll(".proImg-" + a));
    const btnLeft = document.querySelector(".img-left-" + a);
    const btnRight = document.querySelector(".img-right-" + a);
    const dotContainer = document.querySelector(".img-dots-" + a);

    let isDragging = false,
      startPos = 0,
      currentTranslate = 0,
      prevTranslate = 0,
      animationID = 0,
      currentIndex = 0;

    slides.forEach((slide, index) => {
      slide.addEventListener("touchstart", touchStart(index));
      slide.addEventListener("touchend", touchEnd);
      slide.addEventListener("touchmove", touchMove);
      slide.addEventListener("mousedown", touchStart(index));
      slide.addEventListener("mouseup", touchEnd);
      slide.addEventListener("mouseleave", touchEnd);
      slide.addEventListener("mousemove", touchMove);
    });

    // Btn events
    btnLeft.addEventListener("click", () => {
      if (currentIndex > 0) {
        slider.style.transition = "transform 1s ease-out";
        currentIndex -= 1;
        touchEnd();
      }
    });
    btnRight.addEventListener("click", () => {
      if (currentIndex < slides.length - 1) {
        slider.style.transition = "transform 1s ease-out";
        currentIndex += 1;
        touchEnd();
      }
    });
    dotContainer.addEventListener("click", (e) => {
      e.preventDefault();
      if (e.target.classList.contains("img-dots-dot-" + a)) {
        slider.style.transition = "transform 1s ease-out";
        const { slide } = e.target.dataset;
        currentIndex = +slide;
        touchEnd();
      }
    });

    // Show & hide btns
    const showHideBtns = () => {
      if (currentIndex === 0) {
        btnLeft.classList.add("disabled");
      } else {
        btnLeft.classList.remove("disabled");
      }
      if (currentIndex === slides.length - 1) {
        btnRight.classList.add("disabled");
      } else {
        btnRight.classList.remove("disabled");
      }
    };

    // Functions
    const createDots = () => {
      slides.forEach((_, i) => {
        dotContainer.insertAdjacentHTML(
          "beforeend",
          `<button class="img-dots-dot img-dots-dot-${a}" data-slide="${i}"></button>`
        );
      });
    };
    createDots();

    // Dots
    const activateDot = (slide) => {
      document
        .querySelectorAll(".img-dots-dot-" + a)
        .forEach((dot) => dot.classList.remove("img-dots-dot-active"));
      document
        .querySelector(`.img-dots-dot-${a}` + `[data-slide="${slide}"]`)
        .classList.add("img-dots-dot-active");
    };
    activateDot(0);

    // use a HOF so we have index in a closure
    function touchStart(index) {
      return function (event) {
        slider.style.transition = "transform 0.3s ease-out";
        currentIndex = index;
        startPos = getPositionX(event);
        isDragging = true;
        animationID = requestAnimationFrame(animation);
        slider.classList.add("grabbing");
      };
    }

    function touchEnd() {
      isDragging = false;
      cancelAnimationFrame(animationID);
      const movedBy = currentTranslate - prevTranslate;
      if (movedBy < -50 && currentIndex < slides.length - 1) currentIndex += 1;
      if (movedBy > 50 && currentIndex > 0) currentIndex -= 1;
      setPositionByIndex();
      activateDot(currentIndex);
      slider.classList.remove("grabbing");
      showHideBtns();
    }

    function touchMove(event) {
      if (isDragging) {
        let currentPosition = getPositionX(event);
        currentTranslate = prevTranslate + currentPosition - startPos;
      }
    }

    function getPositionX(event) {
      return event.type.includes("mouse")
        ? event.pageX
        : event.touches[0].clientX;
    }

    function animation() {
      setSliderPosition();
      if (isDragging) requestAnimationFrame(animation);
    }

    function setSliderPosition() {
      slider.style.transform = `translateX(${currentTranslate}px)`;
    }

    function setPositionByIndex() {
      currentTranslate =
        currentIndex * -document.querySelector(".imgGroup-" + a).clientWidth;
      prevTranslate = currentTranslate;
      setSliderPosition();
    }
  }
}
export default new Slider();
