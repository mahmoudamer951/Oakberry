import showResult from "../properties/showResult.js";
import setPages from "../pages/setPages.js";

const sectionCategoriesPage = document.querySelector(".section-category-page");
const sortCategoryDropdown = document.querySelector(".sort-category-dropdown");
const searchCategoryInput = document.querySelector(".category-search-input");
const sortCategoryBtn = document.querySelector(".sort-category-btn");
const headerNav = document.querySelector(".header");
const priceLowToHigh = document.querySelector(".price-low-to-high");
const priceHighToLow = document.querySelector(".price-high-to-low");
const dateOldestToNewest = document.querySelector(".date-oldest-to-newest");
const dateNewestToOldest = document.querySelector(".date-newest-to-oldest");
const filterCategoryDropdown = document.querySelector(
  ".filter-category-dropdown"
);

class Sort {
  sortProperties() {
    const Reset = function () {
      sortCategoryDropdown.classList.toggle("hidden");
      if (headerNav.classList.contains("nav-open"))
        headerNav.classList.remove("nav-open");
      searchCategoryInput.value = "";
    };

    sortCategoryBtn.addEventListener("click", () => {
      if (!filterCategoryDropdown.classList.contains("hidden"))
        filterCategoryDropdown.classList.add("hidden");
      sortCategoryDropdown.classList.toggle("hidden");
    });
    sectionCategoriesPage.addEventListener("click", () => {
      if (!sortCategoryDropdown.classList.contains("hidden"))
        sortCategoryDropdown.classList.add("hidden");
    });

    priceLowToHigh.addEventListener("click", () => {
      showResult.categorySearchResult = [];
      showResult.categorySearchResult = setPages.categoryData.sort(
        (a, b) => +a.price - +b.price
      );
      showResult.showResult();
      Reset();
    });

    priceHighToLow.addEventListener("click", () => {
      showResult.categorySearchResult = [];
      showResult.categorySearchResult = setPages.categoryData.sort(
        (a, b) => +b.price - +a.price
      );
      showResult.showResult();
      Reset();
    });

    dateOldestToNewest.addEventListener("click", () => {
      showResult.categorySearchResult = [];
      showResult.categorySearchResult = setPages.categoryData.sort(
        (a, b) =>
          Math.round(Math.abs(new Date(a.date))) -
          Math.round(Math.abs(new Date(b.date)))
      );
      showResult.showResult();
      Reset();
    });

    dateNewestToOldest.addEventListener("click", () => {
      showResult.categorySearchResult = [];
      showResult.categorySearchResult = setPages.categoryData.sort(
        (a, b) =>
          Math.round(Math.abs(new Date(b.date))) -
          Math.round(Math.abs(new Date(a.date)))
      );
      showResult.showResult();
      Reset();
    });
  }
}
export default new Sort();
