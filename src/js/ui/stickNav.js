class Sticky {
  stickyNav() {
    const sectionHeroEl = document.querySelector(".section-hero");
    const stickyObserver = new IntersectionObserver(
      function (entries) {
        const ent = entries[0];
        if (!ent.isIntersecting) document.body.classList.add("sticky");
        if (ent.isIntersecting) document.body.classList.remove("sticky");
      },
      {
        root: null,
        threshold: 0,
        rootMargin: "-80px",
      }
    );
    stickyObserver.observe(sectionHeroEl);
  }
}
export default new Sticky();
