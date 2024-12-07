class Scroll {
  scrollBehavior() {
    document
      .querySelector(".main-nav-list")
      .addEventListener("click", function (e) {
        e.preventDefault();

        if (e.target.classList.contains("main-nav-link")) {
          const id = e.target.getAttribute("href");
          document.querySelector(id).scrollIntoView({ behavior: "smooth" });
        }
      });
  }
}
export default new Scroll();
