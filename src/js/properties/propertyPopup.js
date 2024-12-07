import setPages from "../pages/setPages.js";
import customIcon from "../ui/customIcon.js";

const details = document.getElementById("details");
const mapBox = document.querySelector(".map-box");
const btnCloseMap = document.querySelector(".close-map");
const mapOverlay = document.querySelector(".map-overlay");
const mapPopupEl = document.createElement("div");
mapPopupEl.classList.add("map");
mapPopupEl.setAttribute("id", "mapPopup");

const query55em = window.matchMedia("(max-width: 55em)");

class PropertyPopup {
  coords = "";
  getPosition = "";
  mapZoomLevel = 13;
  map = "";
  property(e) {
    const getDate = e.target.closest(".properties-box");
    if (getDate === null) return;
    const date = getDate.querySelector(".date-add").innerHTML;

    // Check click
    if (e.target.closest(".country") && details.childElementCount === 0) {
      let getId = e.target.closest(".country").id;
      this.getPosition = [];
      this.getPosition = setPages.categoryData.filter((s) => s.id == getId);

      if (this.getPosition[0].coordsDot.length !== 0) {
        this.coords = this.getPosition[0].coordsDot;
        this.addMap();
      } else {
        this.coords = this.getPosition[0].coordsName;
        this.addMap();
      }

      // Add property in map popup
      if (!query55em.matches) {
        details.insertAdjacentHTML(
          "afterbegin",
          `<div class="properties-box-popup" id="properties-box">
          <img class="proImg-popup" src="${this.getPosition[0].image1}" alt="">
    <div class="properties-content-popup">
      <div class="owner-popup">
      <div class="owner-group-popup">
        <img src="${this.getPosition[0].ownerPhoto}" alt="">
        <p class="name-popup">${this.getPosition[0].ownerName}</p>
        </div>
        <div class="date-add-popup">${date}</div>
      </div>
      <div class="properties-details-popup">
        <h2 class="pro-name-popup">${this.getPosition[0].propertyName}</h2>
        <p class="pro-location-popup"><i class="fa-solid fa-location-dot location-dot"></i>
          <span class='country-popup'>
          ${this.getPosition[0].country} &hyphen; ${this.getPosition[0].region}</span></p>
          <div class="price-purpose-popup">
          <span class="price-popup">${this.getPosition[0].price} $</span>
          <span class="purpose-popup ${this.getPosition[0].purpose}-popup">${this.getPosition[0].purpose}</span>
          </div>
      <div class="pro-details-popup">
      <div class="pro-details-group-popup">
        <i class="fa-solid fa-bed"></i><span>${this.getPosition[0].room}</span>
        </div>
        <span>|</span>
        <div class="pro-details-group-popup">
        <i class="fa-solid fa-shower"></i><span>${this.getPosition[0].bathroom}</span>
        </div>
        <span>|</span>
        <div class="pro-details-group-popup">
        <i class="fa-regular fa-square"></i><span>${this.getPosition[0].space} sqft</span></div>
      </div>
      </div>
    <div
      class="more-details-popup hidden-details-popup">
      <p
        class="description-area-popup"
         >${this.getPosition[0].description}</p>
        <div class="description-header-popup">
        <i class="arrowDetails-popup arrow-up-popup fa-solid fa-angle-up"></i>
        <i class="arrowDetails-popup arrow-down-popup fa-solid fa-angle-down hidden-arrow"></i>
      </div>
    </div>
    </div>
    </div>`
        );
        document
          .querySelector(".description-header-popup")
          .addEventListener("click", () => {
            document
              .querySelector(".more-details-popup")
              .classList.toggle("hidden-details-popup");
            document
              .querySelector(".arrow-up-popup")
              .classList.toggle("hidden-arrow");
            document
              .querySelector(".arrow-down-popup")
              .classList.toggle("hidden-arrow");
          });
      }
      mapBox.classList.remove("hidden");
      mapOverlay.classList.remove("hidden");
    }
  }

  addMap() {
    mapBox.appendChild(mapPopupEl);
    if (this.map === "") {
      setTimeout(() => {
        this.map = L.map("mapPopup").setView(this.coords, this.mapZoomLevel);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(this.map);
        L.marker(this.coords, { icon: customIcon.customIcon() })
          .addTo(this.map)
          .bindPopup(
            `<h1 class="header-popup-in-map">${this.getPosition[0].propertyName}</h1><img class="img-popup-in-map" src='${this.getPosition[0].image1}'>`
          )
          .openPopup();
        btnCloseMap.addEventListener("click", () => {
          if (this.map !== "") {
            this.map.off();
            this.map.remove();
            this.map = "";
          }
        });
        mapOverlay.addEventListener("click", () => {
          if (this.map !== "") {
            this.map.off();
            this.map.remove();
            this.map = "";
          }
        });
        document.addEventListener("keydown", (e) => {
          if (e.key === "Escape") {
            if (this.map !== "") {
              this.map.off();
              this.map.remove();
              this.map = "";
            }
          }
        });
      }, 100);
    }
  }

  closeMap() {
    mapBox.classList.add("hidden");
    mapOverlay.classList.add("hidden");
    if (!query55em.matches)
      document.querySelector(".properties-box-popup").remove();
    mapBox.removeChild(mapPopupEl);
    this.coords = "";
  }

  // Close map popup
  closeMapPopup() {
    // Close map popup
    btnCloseMap.addEventListener("click", this.closeMap.bind(this));
    mapOverlay.addEventListener("click", this.closeMap.bind(this));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !mapBox.classList.contains("hidden")) {
        this.closeMap();
      }
    });
  }
}
export default new PropertyPopup();
