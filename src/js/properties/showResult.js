import addProperties from "../form/addProperties.js";
import pagination from "../pages/pagination.js";
import setPages from "../pages/setPages.js";

const spinner = document.querySelector(".spinner");
const categoriesPagination = document.querySelector(".categories-pagination");
const paginationContainerUl = document.createElement("ul");
paginationContainerUl.classList.add("pagination-container");

class ShowResult {
  categorySearchResult = [];
  showResult() {
    spinner.insertAdjacentHTML(
      "afterbegin",
      `
      <div class="spinner-icon">
        <i class="fa-solid fa-spinner fa-spin-pulse"></i>
      </div>`
    );
    const childNum = document.querySelector(
      ".category-content-page"
    ).childElementCount;
    for (let i = 0; i < childNum; i++) {
      document.querySelectorAll(".properties-box")[0].remove();
    }
    setPages.categoryData = this.categorySearchResult;
    pagination.totalPages = Math.ceil(
      setPages.categoryData.length / pagination.maxItem
    );
    document
      .querySelectorAll(".pagination-container")
      ?.forEach((el) => el.remove());
    setTimeout(() => {
      // Init pagination
      if (pagination.totalPages >= 1) {
        categoriesPagination.appendChild(paginationContainerUl);
        document.querySelector(".pagination-container").innerHTML =
          pagination.pagination(pagination.totalPages, 1);
      }
    }, 1000);
    if (this.categorySearchResult.length === 0) {
      spinner.innerHTML = "Not found";
    } else {
      addProperties.addProperties();
    }
  }
}
export default new ShowResult();
