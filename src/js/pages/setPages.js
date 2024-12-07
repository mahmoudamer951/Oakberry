import readData from "../data/readData.js";
import pagination from "../pages/pagination.js";
import editBtn from "../properties/editBtn.js";
import onHoverImage from "../ui/onHoverImage.js";
import propertyPopup from "../properties/propertyPopup.js";
import filterProperties from "../properties/filterProperties.js";
import addProperties from "../form/addProperties.js";
import userAccount from "../data/userAccount.js";
import searchProperties from "../properties/searchProperties.js";
import sortProperties from "../properties/sortProperties.js";
import swiper from "../slider/swiper.js";
import propertyGuide from "../ui/propertyGuide.js";

const sectionCategoriesPage = document.querySelector(".section-category-page");
const headerNav = document.querySelector(".header");
const btnNav = document.querySelector(".btnNav");
const categoriesPagination = document.querySelector(".categories-pagination");
const propertyContainer = document.getElementById("properties-container");
const paginationContainerUl = document.createElement("ul");
paginationContainerUl.classList.add("pagination-container");
const signOutBtn = document.querySelector(".signOut");
const userDropdownBtn = document.querySelector(".userDropdownBtn");
const userName1 = document.querySelector(".user-name");
const userPhoto = document.querySelector(".user-photo");
const userIcon = document.querySelector(".fa-solid.fa-user");
const sectionMyproperties = document.querySelector(".section-myproperties");
const propertisSwiperBtn = document.querySelectorAll(".propertis-swiper-btn");
const propertyPopupGuide = document.querySelector(".property-popup-guide");
const arrowSwipeAgents = document.querySelector(".arrow-swipe-agents");
const arrowSwipeBlog = document.querySelector(".arrow-swipe-blog");
const spinner = document.querySelector(".spinner");
const query75em = window.matchMedia("(max-width: 75em)");
const query55em = window.matchMedia("(max-width: 55em)");

class SetPages {
  propertyType = "";
  proContent = "";
  categoryData;
  propertyIndex = 0;
  propertyBtn;
  mode;
  setHomePage() {
    this.mode = "add";
    this.propertyIndex = 0;
    document.querySelectorAll(".main-nav-link").forEach((link) =>
      link.addEventListener("click", () => {
        if (headerNav.classList.contains("nav-open"))
          headerNav.classList.remove("nav-open");
      })
    );
    signOutBtn.addEventListener("click", userAccount.signOutBtn.bind(this));
    this.proContent = document.getElementById("properties-container");
    this.categoryData = [];
    if (readData.properties !== "") {
      propertisSwiperBtn.forEach((e) => e.classList.remove("hidden"));
      for (let k = 0; k < 10; k++) {
        this.categoryData.push(readData.properties[k]);
      }
    }
    if (this.categoryData === 0) spinner.innerHTML = "Not found";
    setTimeout(() => {
      if (!query75em.matches) {
        propertyContainer.addEventListener(
          "mouseover",
          onHoverImage.onHoverImage.bind(this)
        );
      } else {
        document
          .querySelectorAll(".img-btn")
          .forEach((e) => (e.style.transform = "translateX(0)"));
        document
          .querySelectorAll(".contact-btn")
          .forEach((e) => (e.style.transform = "translateX(0)"));
      }

      // Property popup guide
      propertyGuide.propertyGuide();
      propertyGuide.agentGuide();
      propertyGuide.blogGuide();
      setTimeout(() => {
        propertyGuide.galleryGuide();
      }, 9000);

      // Swiper Drag
      document
        .querySelectorAll(".imgGroup")
        .forEach((e) =>
          e.addEventListener(
            "touchstart",
            () => (swiper.swiperProperties.allowTouchMove = false)
          )
        );
      document
        .querySelectorAll(".properties-content")
        .forEach((e) =>
          e.addEventListener(
            "touchstart",
            () => (swiper.swiperProperties.allowTouchMove = true)
          )
        );
      document
        .querySelectorAll(".imgGroup")
        .forEach((e) =>
          e.addEventListener(
            "mouseover",
            () => (swiper.swiperProperties.allowTouchMove = false)
          )
        );
      document
        .querySelectorAll(".properties-content")
        .forEach((e) =>
          e.addEventListener(
            "mouseover",
            () => (swiper.swiperProperties.allowTouchMove = true)
          )
        );
    }, 1000);
    addProperties.addProperties();
  }

  setCategoryPage() {
    if (readData.currentAccount !== "") {
      document.querySelector(".my-properties").classList.remove("hidden");
    }
    sectionCategoriesPage.addEventListener("click", (e) =>
      propertyPopup.property(e)
    );
    this.proContent = document.querySelector(".category-content-page");
    this.categoryData = [];
    for (let k = 0; k < readData.properties.length; k++) {
      if (readData.properties[k].type === this.propertyType) {
        this.categoryData.push(readData.properties[k]);
      }
    }
    pagination.totalPages = Math.ceil(
      this.categoryData.length / pagination.maxItem
    );
    searchProperties.searchProperties();
    filterProperties.filterProperties();
    sortProperties.sortProperties();
    if (this.categoryData.length === 0) {
      spinner.innerHTML = "Not found";
    } else {
      setTimeout(() => {
        !query75em.matches
          ? document
              .querySelector(".category-content-page")
              .addEventListener(
                "mouseover",
                onHoverImage.onHoverImage.bind(this)
              )
          : document
              .querySelectorAll(".contact-btn")
              .forEach((e) => (e.style.transform = "translateX(0)"));
        // Init pagination
        if (pagination.totalPages >= 1) {
          categoriesPagination.appendChild(paginationContainerUl);
          document.querySelector(".pagination-container").innerHTML =
            pagination.pagination(pagination.totalPages, 1);
        }
      }, 1000);
      addProperties.addProperties();
    }
  }

  setMyPropertiesPage() {
    this.mode = "update";
    if (
      localStorage.getItem("saveLogin") !== null &&
      localStorage.saveLogin !== ""
    ) {
      userAccount.showSubmitProperty();
      this.propertyBtn = "add";
      btnNav.classList.add("btnNavMyProperty");
      // openImages.innerHTML = "Add Images";
      // addPropertyBtn.innerHTML = "Submit";
    }

    if (readData.currentAccount !== "") {
      userDropdownBtn.classList.remove("hidden");
      userName1.innerHTML = readData.currentAccount.name;
      if (readData.currentAccount.photo !== "") {
        userIcon.classList.add("hidden");
        userPhoto.innerHTML = `<img src="${readData.currentAccount.photo}" alt="">`;
      } else {
        userPhoto.classList.add("hidden");
      }
      signOutBtn.addEventListener("click", () => {
        window.location.href = "index.html";
        userAccount.signOutBtn();
        window.href("index.html").reload();
      });

      this.proContent = document.querySelector(".myproperties-content-page");
      this.categoryData = [];
      if (readData.properties !== "") {
        this.categoryData = readData.properties.filter(
          (i) => i.ownerId === readData.currentAccount.id
        );
      }
      pagination.totalPages = Math.ceil(
        this.categoryData.length / pagination.maxItem
      );
      setTimeout(() => {
        // Init pagination
        document
          .querySelectorAll(".pagination-container")
          ?.forEach((el) => el.remove());
        if (pagination.totalPages >= 1) {
          categoriesPagination.appendChild(paginationContainerUl);
          document.querySelector(".pagination-container").innerHTML =
            pagination.pagination(pagination.totalPages, 1);
        }
        sectionMyproperties.addEventListener("click", (e) =>
          propertyPopup.property(e)
        );
        if (!query75em.matches) {
          document
            .querySelector(".myproperties-content-page")
            .addEventListener("mouseover", (e) => {
              onHoverImage.onHoverImage(e);
              editBtn.showEditBtn(e);
            });
        } else {
          document
            .querySelectorAll(".contact-btn")
            .forEach((e) => (e.style.transform = "translateX(0)"));
          document
            .querySelectorAll(".update-btn")
            .forEach((e) => (e.style.transform = "translateX(0)"));
        }
        if (this.categoryData.length === 0) {
          paginationContainerUl.remove();
          spinner.innerHTML = "Not found";
        }
      }, 1000);

      addProperties.addProperties();
    } else {
      spinner.innerHTML = "Not found";
    }
  }
}
export default new SetPages();
