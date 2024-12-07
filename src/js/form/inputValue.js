import imagesInForm from "../form/imagesInForm.js";
import mapInForm from "../form/mapInForm.js";
import myProperty from "../properties/myProperty.js";
import readData from "../data/readData.js";
import setPages from "../pages/setPages.js";
import submitProperty from "../form/submitProperty.js";

const form = document.querySelector(".property-form");

class InputValue {
  propertiesJson = "";
  inputValue() {
    const formData = new FormData(form);
    const userId = function () {
      let timy = Date.now().toString(36).toLowerCase();
      let randy = parseInt(Math.random() * Number.MAX_SAFE_INTEGER);
      randy = randy
        .toString(36)
        .slice(0, 12)
        .padStart(12, "0")
        .toLocaleUpperCase();
      return "".concat(timy, "-", randy);
    };

    if (
      setPages.mode === "add" ||
      (setPages.mode === "update" && setPages.propertyBtn === "add")
    ) {
      readData.propertiesStorage.unshift(Object.fromEntries(formData));
    }
    if (setPages.mode === "update" && setPages.propertyBtn === "update")
      readData.propertiesStorage[setPages.propertyIndex] =
        Object.fromEntries(formData);

    // Add coords
    mapInForm.finalCoords !== ""
      ? (readData.propertiesStorage[setPages.propertyIndex].coordsDot =
          mapInForm.finalCoords)
      : (readData.propertiesStorage[setPages.propertyIndex].coordsDot = []);

    readData.propertiesStorage[setPages.propertyIndex].coordsName = [
      +submitProperty.addressArr[0].lat,
      +submitProperty.addressArr[0].lon,
    ];

    readData.propertiesStorage[setPages.propertyIndex].date = new Date();

    if (
      setPages.mode === "add" ||
      (setPages.mode === "update" && setPages.propertyBtn === "add")
    )
      readData.propertiesStorage[setPages.propertyIndex].id =
        readData.properties.length;

    if (setPages.mode === "update" && setPages.propertyBtn === "update")
      readData.propertiesStorage[setPages.propertyIndex].id =
        myProperty.currIndex;

    readData.propertiesStorage[setPages.propertyIndex].ownerId =
      readData.currentAccount.id;
    readData.propertiesStorage[setPages.propertyIndex].referenceNumber =
      userId();
    readData.propertiesStorage[setPages.propertyIndex].ownerName =
      readData.currentAccount.name;
    readData.propertiesStorage[setPages.propertyIndex].ownerPhoto =
      readData.currentAccount.photo;
    readData.propertiesStorage[setPages.propertyIndex].phoneNumber =
      readData.currentAccount.phoneNumber;
    readData.propertiesStorage[setPages.propertyIndex].mail =
      readData.currentAccount.mail;
    readData.propertiesStorage[setPages.propertyIndex].image1 =
      imagesInForm.imagesArr.image1;
    readData.propertiesStorage[setPages.propertyIndex].image2 =
      imagesInForm.imagesArr.image2;
    readData.propertiesStorage[setPages.propertyIndex].image3 =
      imagesInForm.imagesArr.image3;
    readData.propertiesStorage[setPages.propertyIndex].image4 =
      imagesInForm.imagesArr.image4;
    readData.propertiesStorage[setPages.propertyIndex].image5 =
      imagesInForm.imagesArr.image5;
    readData.propertiesStorage[setPages.propertyIndex].image6 =
      imagesInForm.imagesArr.image6;
    readData.propertiesStorage[setPages.propertyIndex].image7 =
      imagesInForm.imagesArr.image7;
    readData.propertiesStorage[setPages.propertyIndex].image8 =
      imagesInForm.imagesArr.image8;
    this.propertiesJson = JSON.stringify(readData.propertiesStorage);
    localStorage.setItem("properties", this.propertiesJson);
  }
}
export default new InputValue();
