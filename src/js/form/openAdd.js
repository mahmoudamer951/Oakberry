import imagesInForm from "../form/imagesInForm.js";
import setPages from "../pages/setPages.js";

const addPropertyImages = document.querySelector(".images");
const addProperty = document.querySelector(".add-property");
const addProOverlay = document.querySelector(".add-pro-overlay");
const updateProperty = document.querySelector(".update-property");
const updateProOverlay = document.querySelector(".update-pro-overlay");

const query45em = window.matchMedia("(max-width: 45em)");

class Open {
  openAdd() {
    if (
      (setPages.mode === "add" && query45em.matches) ||
      (setPages.mode === "update" && query45em.matches)
    ) {
      addPropertyImages.classList.add("hidden");
      document.querySelector(".add-images").addEventListener("click", (e) => {
        e.preventDefault();
        addPropertyImages.classList.remove("hidden");
      });
      document.querySelector(".images").addEventListener("click", (e) => {
        if (e.target === document.querySelector(".images"))
          addPropertyImages.classList.add("hidden");
      });
    }
    if (setPages.mode === "add" && localStorage.saveLogin !== "") {
      addProperty.classList.remove("hidden");
      addProOverlay.classList.remove("hidden");
    }
    if (setPages.mode === "update") {
      updateProperty.classList.remove("hidden");
      updateProOverlay.classList.remove("hidden");
      // Add img in form
    }
    for (let i = 1; i <= 8; i++) imagesInForm.addImgInForm(`img-${i}`);
  }
}
export default new Open();
