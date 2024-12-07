const categoriesPagination = document.querySelector(".categories-pagination");
const paginationContainerUl = document.createElement("ul");
paginationContainerUl.classList.add("pagination-container");

class Pagination {
  totalPages;
  page;
  maxItem = 8;
  pagination(totalPages, page) {
    categoriesPagination.appendChild(paginationContainerUl);
    this.totalPages = totalPages;
    this.page = page;
    const element = document.querySelector(".pagination-container");
    let liTag = "";
    let active;
    let beforePage = this.page;
    let afterPage = this.page;
    if (this.totalPages >= 5) {
      beforePage = this.page - 1;
      afterPage = this.page + 1;
    }
    for (
      let i = 0;
      i < document.querySelector(".category-content-page").childElementCount;
      i++
    ) {
      document.querySelectorAll(".properties-box")[i].classList.remove("show");
      document.querySelectorAll(".properties-box")[i].classList.add("hide");
      if (
        i >= this.page * this.maxItem - this.maxItem &&
        i < this.page * this.maxItem
      ) {
        document
          .querySelectorAll(".properties-box")
          [i].classList.remove("hide");
        document.querySelectorAll(".properties-box")[i].classList.add("show");
      }
    }
    if (this.page > 1) {
      liTag += `<li class="btn prev btn-prev" id="btn"><span><i class="fas fa-angle-left"></i> Prev</span></li>`;
      setTimeout(() => {
        if (document.querySelector(".btn-prev") !== null) {
          document.querySelector(".btn-prev").addEventListener("click", () => {
            this.pagination(totalPages, page - 1);
            window.scroll({ top: 0, behavior: "smooth" });
          });
        }
      }, 1000);
    }
    if (this.page > 2) {
      liTag += `<li class="first numb first-numb" id="btn"><span>1</span></li>`;
      setTimeout(() => {
        if (document.querySelector(".first-numb") !== null) {
          document
            .querySelector(".first-numb")
            .addEventListener("click", () => {
              this.pagination(totalPages, 1);
              window.scroll({ top: 0, behavior: "smooth" });
            });
        }
      }, 1000);
      if (this.page > 3) {
        liTag += `<li class="dots" id="btn"><span>...</span></li>`;
      }
    }
    if (this.page == this.totalPages) {
      beforePage = beforePage - 1;
    } else if (this.page == this.totalPages - 1) {
      beforePage = beforePage - 1;
    }
    if (this.page == 1) {
      afterPage = afterPage + 1;
    } else if (this.page == 2) {
      afterPage = afterPage + 1;
    }
    for (let plength = beforePage; plength <= afterPage; plength++) {
      if (plength > this.totalPages) {
        continue;
      }
      if (plength == 0) {
        plength = plength + 1;
      }
      if (this.page == plength) {
        active = "pagination-active";
      } else {
        active = "";
      }
      liTag += `<li class="numb numb-${plength} ${active}" id="btn"><span>${plength}</span></li>`;
      setTimeout(() => {
        if (document.querySelector(".numb") !== null) {
          document
            .querySelector(".numb-" + plength)
            .addEventListener("click", () => {
              this.pagination(totalPages, plength);
              window.scroll({ top: 0, behavior: "smooth" });
            });
        }
      }, 1000);
    }
    if (this.page < this.totalPages - 1) {
      if (this.page < this.totalPages - 2) {
        liTag += `<li class="dots" id="btn"><span>...</span></li>`;
      }
      liTag += `<li class="last numb last-numb" id="btn"><span>${this.totalPages}</span></li>`;
      setTimeout(() => {
        if (document.querySelector(".last-numb") !== null) {
          document.querySelector(".last-numb").addEventListener("click", () => {
            this.pagination(totalPages, totalPages);
            window.scroll({ top: 0, behavior: "smooth" });
          });
        }
      }, 1000);
    }
    if (this.page < this.totalPages) {
      liTag += `<li class="btn next btn-next" id="btn"><span>Next <i class="fas fa-angle-right"></i></span></li>`;
      setTimeout(() => {
        if (document.querySelector(".btn-next") !== null) {
          document.querySelector(".btn-next").addEventListener("click", () => {
            this.pagination(totalPages, page + 1);
            window.scroll({ top: 0, behavior: "smooth" });
          });
        }
      }, 1000);
      // }
    }
    element.innerHTML = liTag;
    return liTag;
  }
}
export default new Pagination();
