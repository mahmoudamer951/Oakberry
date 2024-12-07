import readData from "../data/readData.js";
import showResult from "../properties/showResult.js";
import setPages from "../pages/setPages.js";

const sectionCategoriesPage = document.querySelector(".section-category-page");
const filterCategoryBtn = document.querySelector(".filter-category-btn");
const setCategoryFilter = document.querySelector(".set-category-filter");
const filterPriceFrom = document.querySelector(".filter-price-from");
const filterPriceTo = document.querySelector(".filter-price-to");
const filterSpaceFrom = document.querySelector(".filter-space-from");
const filterSpaceTo = document.querySelector(".filter-space-to");
const filterRoomFrom = document.querySelector(".filter-room-from");
const filterRoomTo = document.querySelector(".filter-room-to");
const filterBathroomFrom = document.querySelector(".filter-bathroom-from");
const filterBathroomTo = document.querySelector(".filter-bathroom-to");
const clearCategoryFilter = document.querySelector(".clear-category-filter");
const sortCategoryDropdown = document.querySelector(".sort-category-dropdown");
const searchCategoryInput = document.querySelector(".category-search-input");
const headerNav = document.querySelector(".header");
const filterCategoryDropdown = document.querySelector(
  ".filter-category-dropdown"
);

class FilterProperties {
  filterProperties() {
    filterCategoryBtn.addEventListener("click", () => {
      if (!sortCategoryDropdown.classList.contains("hidden"))
        sortCategoryDropdown.classList.add("hidden");
      filterCategoryDropdown.classList.toggle("hidden");
    });
    sectionCategoriesPage.addEventListener("click", () => {
      if (!filterCategoryDropdown.classList.contains("hidden"))
        filterCategoryDropdown.classList.add("hidden");
      this.clearFilterProperties();
    });
    setCategoryFilter.addEventListener("click", () => {
      this.filter();
      filterCategoryDropdown.classList.toggle("hidden");
      if (headerNav.classList.contains("nav-open"))
        headerNav.classList.remove("nav-open");
      searchCategoryInput.value = "";
    });
    clearCategoryFilter.addEventListener("click", () => {
      this.clearFilterProperties();
    });

    document.addEventListener("keydown", (e) => {
      if (
        e.key === "Enter" &&
        !filterCategoryDropdown.classList.contains("hidden")
      ) {
        this.filter();
        filterCategoryDropdown.classList.add("hidden");
        if (headerNav.classList.contains("nav-open"))
          headerNav.classList.remove("nav-open");
      }
    });
  }

  clearFilterProperties() {
    filterPriceFrom.value = "";
    filterPriceTo.value = "";
    filterSpaceFrom.value = "";
    filterSpaceTo.value = "";
    filterRoomFrom.value = "";
    filterRoomTo.value = "";
    filterBathroomFrom.value = "";
    filterBathroomTo.value = "";
  }

  filter() {
    showResult.categorySearchResult = [];
    showResult.categorySearchResult = readData.properties.filter((e) => {
      return e.type === setPages.propertyType;
    });
    if (filterPriceFrom.value !== "" && filterPriceTo.value !== "")
      showResult.categorySearchResult = showResult.categorySearchResult.filter(
        (e) => {
          return (
            +e.price >= filterPriceFrom.value && +e.price <= filterPriceTo.value
          );
        }
      );
    if (filterSpaceFrom.value !== "" && filterSpaceTo.value !== "")
      showResult.categorySearchResult = showResult.categorySearchResult.filter(
        (e) => {
          return (
            +e.space >= filterSpaceFrom.value && +e.space <= filterSpaceTo.value
          );
        }
      );
    if (filterRoomFrom.value !== "" && filterRoomTo.value !== "")
      showResult.categorySearchResult = showResult.categorySearchResult.filter(
        (e) => {
          return (
            +e.room >= filterRoomFrom.value && +e.room <= filterRoomTo.value
          );
        }
      );
    if (filterBathroomFrom.value !== "" && filterBathroomTo.value !== "")
      showResult.categorySearchResult = showResult.categorySearchResult.filter(
        (e) => {
          return (
            +e.bathroom >= filterBathroomFrom.value &&
            +e.bathroom <= filterBathroomTo.value
          );
        }
      );
    showResult.showResult();
  }
}
export default new FilterProperties();
