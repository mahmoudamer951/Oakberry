import showResult from "../properties/showResult.js";
import readData from "../data/readData.js";
import setPages from "../pages/setPages.js";
import messageHandler from "../ui/messageHandler.js";

const searchCategoryResult = document.querySelector(".category-search-button");
const sortCategoryDropdown = document.querySelector(".sort-category-dropdown");
const searchCategoryInput = document.querySelector(".category-search-input");
const headerNav = document.querySelector(".header");
const filterCategoryDropdown = document.querySelector(
  ".filter-category-dropdown"
);

class SearchProperties {
  searchProperties() {
    searchCategoryResult.addEventListener("click", () => {
      try {
        if (searchCategoryInput.value !== "") this.search();
        if (searchCategoryInput.value === "")
          throw new Error("Input field is empty!");
      } catch (err) {
        messageHandler.errorHandler(err.message);
      }
    });
    searchCategoryInput.addEventListener("keydown", (e) => {
      try {
        if (e.key === "Enter" && searchCategoryInput.value !== "")
          this.search();
        if (e.key === "Enter" && searchCategoryInput.value === "") {
          throw new Error("Input field is empty!");
        }
      } catch (err) {
        messageHandler.errorHandler(err.message);
      }
    });
  }

  search() {
    searchCategoryInput.blur();
    showResult.categorySearchResult = [];
    for (let k = 0; k < readData.properties.length; k++) {
      readData.properties[k].type === setPages.propertyType &&
      (readData.properties[k].country.includes(
        searchCategoryInput.value.toLowerCase()
      ) ||
        readData.properties[k].region.includes(
          searchCategoryInput.value.toLowerCase()
        ) ||
        readData.properties[k].propertyName.includes(
          searchCategoryInput.value.toLowerCase()
        ))
        ? showResult.categorySearchResult.push(readData.properties[k])
        : 0;
    }

    if (!filterCategoryDropdown.classList.contains("hidden"))
      filterCategoryDropdown.classList.add("hidden");
    if (!sortCategoryDropdown.classList.contains("hidden"))
      sortCategoryDropdown.classList.add("hidden");
    if (headerNav.classList.contains("nav-open"))
      headerNav.classList.remove("nav-open");
    showResult.showResult();
  }
}
export default new SearchProperties();
