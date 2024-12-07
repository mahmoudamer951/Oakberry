class SwiperSection {
  swiperProperties;
  swiperAgent;
  swiperBlog;

  // Agent swiper
  agentSwiper() {
    this.swiperAgent = new Swiper(".agent-slide-content", {
      slidesPerView: 3,
      spaceBetween: 25,
      allowTouchMove: true,
      grabCursor: true,
      navigation: {
        nextEl: ".swiper-button-next.agent-swiper-btn",
        prevEl: ".swiper-button-prev.agent-swiper-btn",
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        520: {
          slidesPerView: 2,
        },
        950: {
          slidesPerView: 3,
        },
      },
    });
  }

  // Blog swiper
  blogSwiper() {
    this.swiperBlog = new Swiper(".blog-slide-content", {
      slidesPerView: 3,
      spaceBetween: 25,
      allowTouchMove: true,
      grabCursor: true,
      navigation: {
        nextEl: ".swiper-button-next.blog-swiper-btn",
        prevEl: ".swiper-button-prev.blog-swiper-btn",
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        520: {
          slidesPerView: 2,
        },
        950: {
          slidesPerView: 3,
        },
      },
    });
  }

  // properties swiper
  propertiesSwiper() {
    this.swiperProperties = new Swiper(".properties-slide-content", {
      slidesPerView: 3,
      spaceBetween: 25,
      allowTouchMove: true,
      grabCursor: true,
      navigation: {
        nextEl: ".swiper-button-next.propertis-swiper-btn",
        prevEl: ".swiper-button-prev.propertis-swiper-btn",
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        520: {
          slidesPerView: 2,
        },
        950: {
          slidesPerView: 3,
        },
      },
    });
  }
}
export default new SwiperSection();
