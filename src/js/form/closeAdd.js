import clearForm from "../form/clearForm.js";
import descriptionBox from "../form/descriptionBox.js";
import mapInForm from "../form/mapInForm.js";
import setPages from "../pages/setPages.js";

const addProperty = document.querySelector(".add-property");
const updateProperty = document.querySelector(".update-property");
const addProOverlay = document.querySelector(".add-pro-overlay");
const updateProOverlay = document.querySelector(".update-pro-overlay");
const headerNav = document.querySelector(".header");
const openImages = document.querySelector(".add-images");
const addPropertyBtn = document.querySelector(".add-property-btn");

class CloseForm {
  closeAdd() {
    addProperty?.classList.add("hidden");
    addProOverlay?.classList.add("hidden");
    updateProperty?.classList.add("hidden");
    updateProOverlay?.classList.add("hidden");
    descriptionBox.resetDescription();
    mapInForm.cancelLocation();
    clearForm.clearForm();
    if (headerNav.classList.contains("nav-open"))
      headerNav.classList.remove("nav-open");
    if (updateProperty?.classList.contains("update-color"))
      document
        .querySelector(".update-property")
        .classList.remove("update-color");
    if (setPages.mode === "update" && setPages.propertyBtn === "update") {
      openImages.innerHTML = "Add Images";
      addPropertyBtn.innerHTML = "Submit";
    }
  }
}
export default new CloseForm();
