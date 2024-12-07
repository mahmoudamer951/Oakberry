// Submit property
import readData from "../data/readData.js";
import closeAdd from "../form/closeAdd.js";
import inputValue from "../form/inputValue.js";
import swiper from "../slider/swiper.js";
import gallery from "../ui/gallery.js";
import mapInForm from "../form/mapInForm.js";
import messageHandler from "../ui/messageHandler.js";
import setPages from "../pages/setPages.js";

const form = document.querySelector(".property-form");
const headerNav = document.querySelector(".header");

class Submit {
  addressArr;
  submitProperty() {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      let add =
        Object.fromEntries(formData).country +
        ", " +
        Object.fromEntries(formData).region;
      let url = `https://nominatim.openstreetmap.org/search?format=json&limit=3&q=${add}`;
      let res = await fetch(url);
      let data = await res.json();
      await (this.addressArr = data);
      if (this.addressArr.length === 0) {
        messageHandler.errorHandler(
          "Incorrect name of country or region, Please enter a correct name!"
        );
        return;
      }
      inputValue.inputValue();
      document
        .querySelectorAll(".properties-box")
        ?.forEach((el) => el.remove());
      document
        .querySelectorAll(".pagination-container")
        ?.forEach((el) => el.remove());
      swiper.swiperProperties.destroy();
      if (headerNav.classList.contains("nav-open"))
        headerNav.classList.remove("nav-open");
      gallery.runGallery = false;
      readData.readData();
      closeAdd.closeAdd();
      mapInForm.finalCoords = "";
      if (setPages.mode === "add" || setPages.propertyBtn === "add")
        messageHandler.successMessage("Property has been added successfully!");
      if (setPages.mode === "update" && setPages.propertyBtn === "update") {
        mapInForm.okLocation();
        messageHandler.successMessage(
          "Property has been updated successfully!"
        );
      }
    });
  }
}
export default new Submit();
