import swiper from "../slider/swiper.js";
import setProperties from "../pages/setProperties.js";
import gallery from "../ui/gallery.js";
import messageHandler from "../ui/messageHandler.js";

const spinner = document.querySelector(".gallery-spinner");

class Data {
  imageDrag = false;
  properties = "";
  propertiesJson = "";
  propertiesStorage = "";
  currentAccount = "";
  swiperProperties;
  iconMap;
  // Read data from API
  async readData() {
    try {
      const res = await fetch("https://api.mahmoudamer.com");
      const data = await res.json();
      await (this.properties = data.data.properties);
      await (this.iconMap = data.data.iconMap);
      await (localStorage.properties != null
        ? (this.propertiesStorage = JSON.parse(localStorage.properties))
        : (this.propertiesStorage = []));
      if (localStorage.saveLogin !== "") {
        this.currentAccount = JSON.parse(localStorage.saveLogin);
      }
      this.getDataFromLocalStorage();
      // Checker properties
      if (this.properties !== null) {
        // Run swiper
        swiper.propertiesSwiper();
        // Get properties
        setProperties.setProperties();
        // Run gallery
        if (
          window.location.pathname === "/" ||
          window.location.pathname === "/index.html"
        ) {
          setTimeout(() => {
            spinner.innerHTML = "";
            gallery.removeImages();
            gallery.runGallery = true;
            gallery.galleryLoopCall();
          }, 9000);
        }
      }
    } catch (err) {
      messageHandler.errorHandler(`${err.message} data! Try again`);
    }
  }

  getDataFromLocalStorage() {
    if (this.propertiesStorage !== "") {
      for (let k = this.propertiesStorage.length - 1; k >= 0; k--) {
        this.properties.unshift(this.propertiesStorage[k]);
      }
    }
  }
}
export default new Data();
