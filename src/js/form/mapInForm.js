import customIcon from "../ui/customIcon.js";
import messageHandler from "../ui/messageHandler.js";
import myProperty from "../properties/myProperty.js";
import setPages from "../pages/setPages.js";

const searchLocationInput = document.querySelector(".location-search-input");
const searchLocationResult = document.querySelector(".location-search-button");
const mapOverlayInside = document.querySelector(".map-overlay-inside");
const locationGroup = document.querySelector(".location-group");
const okLocation = document.querySelector(".ok-location");
const currentLocation = document.querySelector(".current-location");
const clearLocation = document.querySelector(".clear-location");
const cancelLocation = document.querySelector(".cancel-location");
const locationMap = document.createElement("div");
locationMap.classList.add("location-map");
locationMap.setAttribute("id", "location-map");

class MapInForm {
  map = "";
  marker = null;
  searchResult = "";
  mapZoomLevel = 13;
  currCoords = "";
  coordsDot = "";
  finalCoords = "";
  startCoords = [30.0443879, 31.2357257]; // Egypt

  async showMapInForm() {
    if (this.map === "") {
      if (setPages.mode === "update" && setPages.propertyBtn === "update")
        this.startCoords = myProperty.location;
      if (this.finalCoords.length !== 0) this.startCoords = this.finalCoords;

      this.map = await L.map("location-map").setView(
        this.startCoords,
        this.mapZoomLevel
      );
      await L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(this.map);

      this.marker = await L.marker(this.startCoords, {
        icon: customIcon.customIcon(),
      }).addTo(this.map);

      this.map.on("click", this.addMarker.bind(this));

      searchLocationResult.addEventListener("click", () => {
        this.searchLocation();
      });

      searchLocationInput.addEventListener("keydown", (e) => {
        e.key === "Enter" && this.searchLocation();
      });

      okLocation.addEventListener("click", this.okLocation.bind(this));
      currentLocation.addEventListener(
        "click",
        this.currentLocation.bind(this)
      );

      clearLocation.addEventListener("click", this.clearMarker.bind(this));
      cancelLocation.addEventListener("click", this.cancelLocation.bind(this));
    }
  }

  clearMarker() {
    this.finalCoords !== ""
      ? (this.startCoords = this.finalCoords)
      : this.startCoords;
    if (this.marker !== null) {
      this.map.removeLayer(this.marker);
      this.map.setView(this.startCoords, this.mapZoomLevel, {
        animate: true,
        pan: { duration: 1 },
      });
      this.marker = new L.marker(this.startCoords, {
        draggable: true,
        icon: customIcon.customIcon(),
      }).addTo(this.map);
    }
  }

  addMarker(e) {
    const coordsMarker = [e.latlng.lat, e.latlng.lng];
    if (this.marker !== null) {
      this.map.removeLayer(this.marker);
    }
    this.map.setView(coordsMarker, this.mapZoomLevel, {
      animate: true,
      pan: { duration: 1 },
    });
    this.marker = new L.marker(coordsMarker, {
      draggable: true,
      icon: customIcon.customIcon(),
    }).addTo(this.map);
    this.currCoords = "";
    this.searchResult = "";
    this.coordsDot = coordsMarker;
  }

  async searchLocation() {
    try {
      searchLocationInput.blur();
      let add = searchLocationInput.value;
      let searchArr;
      const url = `https://nominatim.openstreetmap.org/search?format=json&limit=3&q=${add}`;
      const res = await fetch(url);
      const data = await res.json();
      await (searchArr = data);
      if (searchLocationInput.value === "") {
        searchLocationInput.blur();
        throw new Error("Input field is empty! Try again");
      }
      if (searchArr.length === 0) {
        searchLocationInput.blur();
        throw new Error(
          "Incorrect name of country or region, Please enter a correct name!"
        );
      }
      this.searchResult = [+searchArr[0].lat, +searchArr[0].lon];
      this.currCoords = "";
      this.coordsDot = "";
      if (this.marker !== null) {
        this.map.removeLayer(this.marker);
      }
      this.map.setView(this.searchResult, this.mapZoomLevel, {
        animate: true,
        pan: { duration: 1 },
      });
      this.marker = L.marker(this.searchResult, {
        draggable: true,
        icon: customIcon.customIcon(),
      }).addTo(this.map);
    } catch (err) {
      messageHandler.errorHandler(err.message);
    }
  }

  okLocation() {
    if (this.searchResult !== "") this.finalCoords = this.searchResult;
    if (this.currCoords !== "") this.finalCoords = this.currCoords;
    if (this.coordsDot !== "") this.finalCoords = this.coordsDot;
    if (this.map !== "") {
      this.map.off();
      this.map.remove();
      this.map = "";
      document
        .querySelector(".location-container")
        .removeChild(document.querySelector(".location-map"));
    }
    locationGroup.classList.add("hidden-location");
    mapOverlayInside.classList.add("hidden");
    this.startCoords = [30.0443879, 31.2357257];
  }

  currentLocation() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this.successCoords.bind(this),
        this.rejectCoords.bind(this)
      );
  }

  successCoords(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    this.currCoords = [latitude, longitude];
    this.searchResult = "";
    this.coordsDot = "";
    if (this.marker !== null) {
      this.map.removeLayer(this.marker);
    }
    this.map.setView(this.currCoords, this.mapZoomLevel, {
      animate: true,
      pan: { duration: 1 },
    });
    this.marker = L.marker(this.currCoords, {
      draggable: true,
      icon: customIcon.customIcon(),
    }).addTo(this.map);
  }

  rejectCoords() {
    messageHandler.errorHandler("Could not get your location!");
  }

  closeLocationFn() {
    locationGroup.classList.add("hidden-location");
    mapOverlayInside.classList.add("hidden");
  }

  cancelLocation() {
    if (this.map !== "") {
      if (this.marker !== null) {
        this.map.removeLayer(this.marker);
      }
      this.finalCoords = "";
      this.map.off();
      this.map.remove();
      this.map = "";
      document
        .querySelector(".location-container")
        .removeChild(document.querySelector(".location-map"));
    }
    locationGroup.classList.add("hidden-location");
    mapOverlayInside.classList.add("hidden");
    this.startCoords = [30.0443879, 31.2357257];
    searchInput.value = "";
  }
}
export default new MapInForm();
