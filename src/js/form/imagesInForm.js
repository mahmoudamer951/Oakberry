const closeAddProperty = document.querySelector(".close-add-property");
const addProOverlay = document.querySelector(".add-pro-overlay");

class ImagesInForm {
  imagesArr = {
    image1: "",
    image2: "",
    image3: "",
    image4: "",
    image5: "",
    image6: "",
    image7: "",
    image8: "",
  };
  addImgInForm(i) {
    const input = document.querySelector("." + i + "-input");
    const label = document.querySelector("." + i + "-label");
    const trash = document.querySelector("#" + i + "-trash");
    const addImage = document.querySelector("#" + i);
    const image = document.createElement("div");
    image.classList.add("photo");
    input.addEventListener("change", () => {
      let reader = new FileReader();
      reader.readAsDataURL(input.files[0]);
      reader.addEventListener("load", () => {
        if (input.id === "img-1-file") this.imagesArr.image1 = reader.result;
        if (input.id === "img-2-file") this.imagesArr.image2 = reader.result;
        if (input.id === "img-3-file") this.imagesArr.image3 = reader.result;
        if (input.id === "img-4-file") this.imagesArr.image4 = reader.result;
        if (input.id === "img-5-file") this.imagesArr.image5 = reader.result;
        if (input.id === "img-6-file") this.imagesArr.image6 = reader.result;
        if (input.id === "img-7-file") this.imagesArr.image7 = reader.result;
        if (input.id === "img-8-file") this.imagesArr.image8 = reader.result;
        addImage.prepend(image);
        image.innerHTML = `<img src=${reader.result} alt=""/>`;
        label.classList.add("hidden");
        trash.classList.remove("hidden");
      });
      trash.addEventListener("click", () => {
        if (trash.id === "img-1-trash") this.imagesArr.image1 = "";
        if (trash.id === "img-2-trash") this.imagesArr.image2 = "";
        if (trash.id === "img-3-trash") this.imagesArr.image3 = "";
        if (trash.id === "img-4-trash") this.imagesArr.image4 = "";
        if (trash.id === "img-5-trash") this.imagesArr.image5 = "";
        if (trash.id === "img-6-trash") this.imagesArr.image6 = "";
        if (trash.id === "img-7-trash") this.imagesArr.image7 = "";
        if (trash.id === "img-8-trash") this.imagesArr.image8 = "";
        resetImgInputs();
      });
    });
    if (
      window.location.pathname === "/" ||
      window.location.pathname === "/index.html"
    ) {
      closeAddProperty.addEventListener("click", () => {
        resetImgInputs();
      });
      addProOverlay.addEventListener("click", () => {
        resetImgInputs();
      });
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          resetImgInputs();
        }
      });
    }
    const resetImgInputs = function () {
      label.classList.remove("hidden");
      image.remove();
      input.value = "";
      trash.classList.add("hidden");
    };
  }
}
export default new ImagesInForm();
