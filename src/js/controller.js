"use strict";
import scrollBehavior from "./../js/ui/scrollBehavior.js";
import revealSection from "./../js/ui/revealSection.js";
import stickNav from "./../js/ui/stickNav.js";
import swiper from "./../js/slider/swiper.js";
import testimonialSlider from "./../js/slider/testimonialSlider.js";
import submitProperty from "./../js/form/submitProperty.js";
import readData from "./../js/data/readData.js";
import userAccount from "./../js/data/userAccount.js";
import propertyPopup from "./../js/properties/propertyPopup.js";
import activeOnScroll from "./../js/ui/activeOnScroll.js";
import closeAdd from "./../js/form/closeAdd.js";
import mapInForm from "./../js/form/mapInForm.js";
import myProperty from "./../js/properties/myProperty.js";
import descriptionBox from "./../js/form/descriptionBox.js";

const addProperty = document.querySelector(".add-property");
const updateProperty = document.querySelector(".update-property");
const userBtn = document.querySelector(".user-btn");
const userLogin = document.querySelector(".user-login");
const userName = document.querySelector(".userName");
const password = document.querySelector(".password");
const showPassword = document.querySelector(".show-password");
const hidePassword = document.querySelector(".hide-password");
const closeUserLogin = document.querySelector(".close-user-login");
const userLoginOverlay = document.querySelector(".user-login-overlay");
const choseOnMap = document.querySelector(".chose-on-map");
const closeLocation = document.querySelector(".close-location");
const locationGroup = document.querySelector(".location-group");
const mapOverlayInside = document.querySelector(".map-overlay-inside");
const locationContainer = document.querySelector(".location-container");
const locationMap = document.createElement("div");
locationMap.classList.add("location-map");
locationMap.setAttribute("id", "location-map");
const propertyContainer = document.getElementById("properties-container");
const popupGuide = document.querySelector(".popup-guide");
const popupGuideBtn = document.querySelector(".popup-guide-btn");
const closeAddProperty = document.querySelector(".close-add-property");
const addProOverlay = document.querySelector(".add-pro-overlay");
const headerNav = document.querySelector(".header");
const menuOpen = document.querySelector(".nav-menu");
const menuClose = document.querySelector(".nav-close");
const openAddDescription = document.querySelector(".text-area-arrow");
const closeUpdateProperty = document.querySelector(".close-update-property");
const updateProOverlay = document.querySelector(".update-pro-overlay");

// Querries
const query75em = window.matchMedia("(max-width: 75em)");
const query62em = window.matchMedia("(max-width: 62em)");
const query41em = window.matchMedia("(max-width: 41em)");
const query30em = window.matchMedia("(max-width: 30em)");

class Controller {
  constructor() {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Enter") e.preventDefault();
    });

    // Home Page
    if (
      window.location.pathname === "/" ||
      window.location.pathname === "/index.html"
    ) {
      this.setMethods();
    }

    // Categories Page
    if (window.location.pathname === "/categories.html") {
      document.querySelector(".land-category").addEventListener("click", () => {
        window.location.href = "categories.html#land";
        this.reloadPage();
      });
      document
        .querySelector(".residential-category")
        .addEventListener("click", () => {
          window.location.href = "categories.html#residential";
          this.reloadPage();
        });
      document
        .querySelector(".commercial-category")
        .addEventListener("click", () => {
          window.location.href = "categories.html#commercial";
          this.reloadPage();
        });
      document
        .querySelector(".industrial-category")
        .addEventListener("click", () => {
          window.location.href = "categories.html#industrial";
          this.reloadPage();
        });
      readData.readData();
      propertyPopup.closeMapPopup();
    }

    // My Property Page
    if (window.location.pathname === "/myproperties.html") {
      readData.readData();
      submitProperty.submitProperty();
      propertyPopup.closeMapPopup();
      myProperty.deleteProperty();
      myProperty.updateProperty();

      // Description btn
      openAddDescription.addEventListener(
        "click",
        descriptionBox.addDescription.bind(this)
      );

      // Open map in form
      choseOnMap.addEventListener("click", () => {
        locationContainer.append(locationMap);
        locationGroup.classList.remove("hidden-location");
        mapOverlayInside.classList.remove("hidden");
        mapInForm.showMapInForm();
      });

      // Close update property
      closeUpdateProperty.addEventListener("click", () => closeAdd.closeAdd());
      updateProOverlay.addEventListener("click", () => closeAdd.closeAdd());
      closeLocation.addEventListener("click", () =>
        mapInForm.closeLocationFn()
      );
      mapOverlayInside.addEventListener("click", () =>
        mapInForm.closeLocationFn()
      );

      document.addEventListener("keydown", (e) => {
        if (
          e.key === "Escape" &&
          !updateProperty.classList.contains("hidden") &&
          locationGroup.classList.contains("hidden-location")
        ) {
          closeAdd.closeAdd();
        }
        if (
          e.key === "Escape" &&
          !locationGroup.classList.contains("hidden-location") &&
          !updateProperty.classList.contains("hidden")
        ) {
          mapInForm.closeLocationFn();
        }
      });
    }

    // Mobile navigation open & close
    menuOpen.addEventListener("click", () => {
      headerNav.classList.add("nav-open");
    });
    menuClose.addEventListener("click", () => {
      headerNav.classList.remove("nav-open");
    });
  }

  setMethods() {
    // Read Data
    readData.readData();

    // Scroll behaviour
    scrollBehavior.scrollBehavior();

    // Reveal sections
    revealSection.revealSections();

    // Sticky nav
    stickNav.stickyNav();

    // Login btn
    userAccount.loginBtn();

    // Agent swiper
    swiper.agentSwiper();

    // Blog swiper
    swiper.blogSwiper();

    // testimonial slider
    testimonialSlider.testimonialSlider();

    // Close map popup
    propertyPopup.closeMapPopup();

    // Submit property
    submitProperty.submitProperty();

    // Active navbar on scroll
    if (!query75em.matches) activeOnScroll.activeOnScroll();

    // Popup guide
    if (readData.currentAccount === "") {
      setTimeout(() => {
        popupGuide.classList.remove("guide-hidden");
        setTimeout(() => {
          popupGuide.style.opacity = "100%";
        }, 1000);
      }, 1000);
    }
    popupGuideBtn.addEventListener("click", () => {
      popupGuide.style.opacity = "0";
      setTimeout(() => {
        popupGuide.classList.add("guide-hidden");
      }, 1000);
    });

    // Hide password
    hidePassword.addEventListener("click", () => {
      password.type = "text";
      showPassword.classList.toggle("hidden");
      hidePassword.classList.toggle("hidden");
    });

    // Show password
    showPassword.addEventListener("click", () => {
      password.type = "password";
      showPassword.classList.toggle("hidden");
      hidePassword.classList.toggle("hidden");
    });

    // user login
    userBtn.addEventListener("click", () => {
      password.type = "password";
      if (
        localStorage.getItem("rememberMe") !== null &&
        localStorage.rememberMe !== ""
      ) {
        this.rememberMeAccount = JSON.parse(localStorage.rememberMe);
        keepLogin.checked = true;
        userName.value = this.rememberMeAccount.userName;
        password.value = this.rememberMeAccount.password;
      } else {
        keepLogin.checked = false;
        userName.value = "";
        password.value = "";
      }
      userLogin.classList.remove("hidden");
      userLoginOverlay.classList.remove("hidden");
    });
    closeUserLogin.addEventListener(
      "click",
      userAccount.closeUserLogin.bind(this)
    );
    userLoginOverlay.addEventListener(
      "click",
      userAccount.closeUserLogin.bind(this)
    );
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !userLogin.classList.contains("hidden")) {
        this.closeUserLogin.bind(this);
      }
    });

    // Close add property
    closeAddProperty.addEventListener("click", closeAdd.closeAdd.bind(this));
    addProOverlay.addEventListener("click", closeAdd.closeAdd.bind(this));
    closeLocation.addEventListener("click", () => mapInForm.closeLocationFn());
    mapOverlayInside.addEventListener("click", () =>
      mapInForm.closeLocationFn()
    );
    document.addEventListener("keydown", (e) => {
      if (
        e.key === "Escape" &&
        !addProperty.classList.contains("hidden") &&
        locationGroup.classList.contains("hidden-location")
      ) {
        closeAdd.closeAdd();
      }
      if (
        e.key === "Escape" &&
        !locationGroup.classList.contains("hidden-location") &&
        !addProperty.classList.contains("hidden")
      ) {
        mapInForm.closeLocationFn();
      }
    });

    // Open map in form
    choseOnMap.addEventListener("click", () => {
      locationContainer.append(locationMap);
      locationGroup.classList.remove("hidden-location");
      mapOverlayInside.classList.remove("hidden");
      mapInForm.showMapInForm();
    });

    // Open property in map popup
    propertyContainer.addEventListener("click", (e) => {
      propertyPopup.property(e);
    });

    // Querries function
    if (query62em.matches) document.querySelector(".image-1").remove();
    if (query41em.matches) {
      document.querySelector(".category-content").remove();
      document.querySelector(".section-video").remove();
      document
        .querySelector(".main-nav-list")
        .querySelectorAll("li")[2]
        .remove();
    }
    if (query30em.matches)
      for (let i = 0; i < 3; i++)
        document.querySelector(".footer-box").remove();

    // Mobile navigation open & close login popup
    document.querySelector(".nav-close").addEventListener("click", () => {
      if (!userLogin.classList.contains("hidden")) {
        userLogin.classList.add("hidden");
        userLoginOverlay.classList.add("hidden");
      }
    });

    // Copy Right
    document.querySelector(".current-year").innerHTML =
      new Date().getFullYear();
  }

  reloadPage() {
    window.location.reload();
  }
}
export default new Controller();
