import readData from "../data/readData.js";
import setPages from "../pages/setPages.js";
import imagesInForm from "../form/imagesInForm.js";
import openAdd from "../form/openAdd.js";
import messageHandler from "../ui/messageHandler.js";

const mypropertiesContentPage = document.querySelector(
  ".myproperties-content-page"
);
const deletePropertyMessage = document.querySelector(
  ".delete-property-message"
);
const deleteYesBtn = document.querySelector(".delete-yes-btn");
const deleteNoBtn = document.querySelector(".delete-no-btn");
const closeUpdateProperty = document.querySelector(".close-update-property");
const updateProOverlay = document.querySelector(".update-pro-overlay");
const addPropertyBtn = document.querySelector(".add-property-btn");
const messageOverlay = document.querySelector(".message-overlay");
const openImages = document.querySelector(".add-images");

class MyProperty {
  location;
  currIndex;
  updateProperty() {
    let referenceNumber;
    let getIndex;
    let getId;

    document
      .querySelector(".myproperties-content-page")
      .addEventListener("click", (e) => {
        if (!e.target.closest(".properties-box")) return;
        getId = e.target
          .closest(".properties-box")
          .querySelector(".country").id;
        if (e.target.closest(".update-property-btn")) {
          this.currIndex = getId;
          referenceNumber = e.target.closest(".update-property-btn").id;
          getIndex = readData.propertiesStorage.findIndex(
            (f) => f.referenceNumber === referenceNumber
          );
          setPages.propertyIndex = getIndex;
          setPages.propertyBtn = "update";
          addPropertyBtn.innerHTML = "Update";
          openImages.innerHTML = "Show Images";
          document
            .querySelector(".update-property")
            .classList.add("update-color");
          openAdd.openAdd();
          this.getPropertyValues();
        }
      });
  }

  // Get property values
  getPropertyValues() {
    title.value = setPages.categoryData[setPages.propertyIndex].propertyName;
    price.value = setPages.categoryData[setPages.propertyIndex].price;
    rooms.value = setPages.categoryData[setPages.propertyIndex].room;
    country.value = setPages.categoryData[setPages.propertyIndex].country;
    bathroom.value = setPages.categoryData[setPages.propertyIndex].bathroom;
    region.value = setPages.categoryData[setPages.propertyIndex].region;
    aria.value = setPages.categoryData[setPages.propertyIndex].space;
    description.value =
      setPages.categoryData[setPages.propertyIndex].description;

    if (setPages.categoryData[setPages.propertyIndex].coordsDot.length !== 0) {
      this.location = setPages.categoryData[setPages.propertyIndex].coordsDot;
    } else {
      this.location = setPages.categoryData[setPages.propertyIndex].coordsName;
    }

    if (setPages.categoryData[setPages.propertyIndex].type === "Land");
    landBtn.checked = true;
    if (setPages.categoryData[setPages.propertyIndex].type === "Residential")
      residentBtn.checked = true;
    if (setPages.categoryData[setPages.propertyIndex].type === "Commercial")
      commercialBtn.checked = true;
    if (setPages.categoryData[setPages.propertyIndex].type === "Industrial")
      industrialBtn.checked = true;
    if (setPages.categoryData[setPages.propertyIndex].purpose === "Sale")
      saleBtn.checked = true;
    if (setPages.categoryData[setPages.propertyIndex].purpose === "Rent")
      rentBtn.checked = true;
    for (let i = 1; i <= 8; i++) this.getImgs(i);
  }

  // Get imgs
  getImgs(i) {
    const resetImgInputs = function () {
      label.classList.remove("hidden");
      image.remove();
      input.value = "";
      trash.classList.add("hidden");
    };
    const showTrash = function () {
      label.classList.add("hidden");
      trash.classList.remove("hidden");
    };
    const input = document.querySelector(".img-" + i + "-input");
    const label = document.querySelector(".img-" + i + "-label");
    const trash = document.querySelector("#img-" + i + "-trash");
    const addImage = document.querySelector("#img-" + i);
    const image = document.createElement("div");
    image.classList.add("photo");
    if (
      i === 1 &&
      setPages.categoryData[setPages.propertyIndex].image1 !== ""
    ) {
      imagesInForm.imagesArr.image1 =
        setPages.categoryData[setPages.propertyIndex].image1;
      addImage.prepend(image);
      image.innerHTML = `<img src=${
        setPages.categoryData[setPages.propertyIndex].image1
      } alt=""/>`;
      showTrash();
    }
    if (
      i === 2 &&
      setPages.categoryData[setPages.propertyIndex].image2 !== ""
    ) {
      imagesInForm.imagesArr.image2 =
        setPages.categoryData[setPages.propertyIndex].image2;
      addImage.prepend(image);
      image.innerHTML = `<img src=${
        setPages.categoryData[setPages.propertyIndex].image2
      } alt=""/>`;
      showTrash();
    }
    if (
      i === 3 &&
      setPages.categoryData[setPages.propertyIndex].image3 !== ""
    ) {
      imagesInForm.imagesArr.image3 =
        setPages.categoryData[setPages.propertyIndex].image3;
      addImage.prepend(image);
      image.innerHTML = `<img src=${
        setPages.categoryData[setPages.propertyIndex].image3
      } alt=""/>`;
      showTrash();
    }
    if (
      i === 4 &&
      setPages.categoryData[setPages.propertyIndex].image4 !== ""
    ) {
      imagesInForm.imagesArr.image4 =
        setPages.categoryData[setPages.propertyIndex].image4;
      addImage.prepend(image);
      image.innerHTML = `<img src=${
        setPages.categoryData[setPages.propertyIndex].image4
      } alt=""/>`;
      showTrash();
    }
    if (
      i === 5 &&
      setPages.categoryData[setPages.propertyIndex].image5 !== ""
    ) {
      imagesInForm.imagesArr.image5 =
        setPages.categoryData[setPages.propertyIndex].image5;
      addImage.prepend(image);
      image.innerHTML = `<img src=${
        setPages.categoryData[setPages.propertyIndex].image5
      } alt=""/>`;
      showTrash();
    }
    if (
      i === 6 &&
      setPages.categoryData[setPages.propertyIndex].image6 !== ""
    ) {
      imagesInForm.imagesArr.image6 =
        setPages.categoryData[setPages.propertyIndex].image6;
      addImage.prepend(image);
      image.innerHTML = `<img src=${
        setPages.categoryData[setPages.propertyIndex].image6
      } alt=""/>`;
      showTrash();
    }
    if (
      i === 7 &&
      setPages.categoryData[setPages.propertyIndex].image7 !== ""
    ) {
      imagesInForm.imagesArr.image7 =
        setPages.categoryData[setPages.propertyIndex].image7;
      addImage.prepend(image);
      image.innerHTML = `<img src=${
        setPages.categoryData[setPages.propertyIndex].image7
      } alt=""/>`;
      showTrash();
    }
    if (
      i === 8 &&
      setPages.categoryData[setPages.propertyIndex].image8 !== ""
    ) {
      imagesInForm.imagesArr.image8 =
        setPages.categoryData[setPages.propertyIndex].image8;
      addImage.prepend(image);
      image.innerHTML = `<img src=${
        setPages.categoryData[setPages.propertyIndex].image8
      } alt=""/>`;
      showTrash();
    }
    trash.addEventListener("click", () => {
      if (trash.id === "img-1-trash") imagesInForm.imagesArr.image1 = "";
      if (trash.id === "img-2-trash") imagesInForm.imagesArr.image2 = "";
      if (trash.id === "img-3-trash") imagesInForm.imagesArr.image3 = "";
      if (trash.id === "img-4-trash") imagesInForm.imagesArr.image4 = "";
      if (trash.id === "img-5-trash") imagesInForm.imagesArr.image5 = "";
      if (trash.id === "img-6-trash") imagesInForm.imagesArr.image6 = "";
      if (trash.id === "img-7-trash") imagesInForm.imagesArr.image7 = "";
      if (trash.id === "img-8-trash") imagesInForm.imagesArr.image8 = "";
      resetImgInputs();
    });
    if (window.location.href.match("myproperties.html")) {
      closeUpdateProperty.addEventListener("click", () => {
        resetImgInputs();
      });
      updateProOverlay.addEventListener("click", () => {
        resetImgInputs();
      });
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          resetImgInputs();
        }
      });
    }
  }

  deleteProperty() {
    let referenceNumber;
    let getIndex;
    mypropertiesContentPage.addEventListener("click", (e) => {
      if (e.target.closest(".delete-property-btn")) {
        deletePropertyMessage.classList.remove("hidden");
        messageOverlay.classList.remove("hidden");
        deleteNoBtn.focus();
        referenceNumber = e.target.closest(".delete-property-btn").id;
        getIndex = readData.propertiesStorage.findIndex(
          (f) => f.referenceNumber === referenceNumber
        );
      }
    });
    deleteNoBtn.addEventListener("click", () => {
      deletePropertyMessage.classList.add("hidden");
      messageOverlay.classList.add("hidden");
    });
    deleteNoBtn.addEventListener("keydown", (e) => {
      if (
        e.key === "Enter" &&
        !deletePropertyMessage.classList.contains("hidden")
      ) {
        deletePropertyMessage.classList.add("hidden");
        messageOverlay.classList.add("hidden");
      }
    });
    deleteYesBtn.addEventListener("click", () => {
      deletePropertyMessage.classList.add("hidden");
      messageOverlay.classList.add("hidden");
      readData.propertiesStorage.splice(getIndex, 1);
      localStorage.properties = JSON.stringify(readData.propertiesStorage);
      document.querySelectorAll(".properties-box").forEach((el) => el.remove());
      readData.properties = [];
      readData.readData();
      messageHandler.successMessage("Property has been deleted successfully!");
    });
  }
}
export default new MyProperty();
