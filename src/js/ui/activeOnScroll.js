class Active {
  activeOnScroll() {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".main-nav-list a");
    window.onscroll = () => {
      sections.forEach((sec) => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 80;
        let height = sec.offsetHeight;
        let id = sec.getAttribute("id");
        if (top >= offset && top < offset + height) {
          navLinks.forEach((links) => {
            links.classList.remove("active");
            document
              .querySelector(".main-nav-list a[href*=" + id + "]")
              ?.classList.add("active");
          });
        }
        if (top < 500) {
          navLinks.forEach((links) => {
            links.classList.remove("active");
          });
        }
      });
    };
  }
}
export default new Active();
