class Testimonial {
  testimonialSlider() {
    const slider = document.querySelector(".testimonial-content"),
      slides = Array.from(document.querySelectorAll(".testimonial-box"));
    const btnLeft = document.querySelector(".testimonial-btn-left");
    const btnRight = document.querySelector(".testimonial-btn-right");
    const dotContainer = document.querySelector(".dots");

    let isDragging = false,
      startPos = 0,
      currentTranslate = 0,
      prevTranslate = 0,
      animationID = 0,
      currentIndex = 0;

    slides.forEach((slide, index) => {
      const slideImage = slide.querySelector(".testimonial");
      slideImage.addEventListener("dragstart", (e) => e.preventDefault());
      slide.addEventListener("touchstart", touchStart(index));
      slide.addEventListener("touchend", touchEnd);
      slide.addEventListener("touchmove", touchMove);
      slide.addEventListener("mousedown", touchStart(index));
      slide.addEventListener("mouseup", touchEnd);
      slide.addEventListener("mouseleave", touchEnd);
      slide.addEventListener("mousemove", touchMove);
    });

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
      if (e.target.classList.contains("dots-dot")) {
        slider.style.transition = "transform 1s ease-out";
        const { slide } = e.target.dataset;
        currentIndex = +slide;
        touchEnd();
      }
    });
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

    const createDots = () => {
      slides.forEach((_, i) => {
        dotContainer.insertAdjacentHTML(
          "beforeend",
          `<button class="dots-dot" data-slide="${i}"></button>`
        );
      });
    };
    createDots();

    const activateDot = (slide) => {
      document
        .querySelectorAll(".dots-dot")
        .forEach((dot) => dot.classList.remove("dots-dot-active"));
      document
        .querySelector(`.dots-dot[data-slide="${slide}"]`)
        .classList.add("dots-dot-active");
    };
    activateDot(0);

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
        currentIndex *
        -document.querySelector(".testimonial-container").clientWidth;
      prevTranslate = currentTranslate;
      setSliderPosition();
    }
  }
}
export default new Testimonial();
