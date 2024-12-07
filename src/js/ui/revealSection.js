class Reveal {
  revealSections() {
    const allSections = document.querySelectorAll("section");
    const revealSection = function (entries, observer) {
      const [entry] = entries;
      if (!entry.isIntersecting) return;
      // incrementing counter category & about us sections
      if (entry.target.id === "category" || entry.target.id === "about") {
        setTimeout(() => {
          const counters = document.querySelectorAll(".counter");
          counters.forEach((counter) => {
            counter.innerText = "0";
            const updateCounter = function () {
              const target = +counter.getAttribute("data-target");
              const c = +counter.innerText;
              const increment = target / 200;
              if (c < target) {
                counter.innerText = `${Math.ceil(c + increment)}`;
                setTimeout(updateCounter, 1);
              } else {
                counter.innerText = target;
              }
            };
            updateCounter();
          });
        }, 1000);
      }
      entry.target.classList.remove("section-hidden");
      observer.unobserve(entry.target);
    };
    const sectionObserver = new IntersectionObserver(revealSection, {
      root: null,
      threshold: 0.15,
    });
    allSections.forEach(function (section) {
      sectionObserver.observe(section);
      section.classList.add("section-hidden");
    });
  }
}
export default new Reveal();
