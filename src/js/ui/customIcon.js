import readData from "../data/readData.js";

class CustomIcon {
  customIcon() {
    let customIcon = 0;
    customIcon = L.icon({
      iconUrl: readData.iconMap[0].markerPin,
      shadowUrl: readData.iconMap[0].markerShadow,
      iconSize: [25, 45],
      shadowSize: [41, 41],
      iconAnchor: [12, 41],
      shadowAnchor: [12, 41],
      popupAnchor: [1, -40],
    });
    return customIcon;
  }
}
export default new CustomIcon();
