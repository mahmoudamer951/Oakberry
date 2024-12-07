import setPages from "../pages/setPages.js";

const sectionGallery = document.querySelector(".section-gallery");
const images = document.createElement("div");
images.classList.add("gallery");

class Gallery {
  runGallery = true;

  // Styles
  style = {
    one: [
      [0, -1, 0, -1],
      [1, -1, -1, -1],
      [2, 1, -3, 2],
      [3, 2, -3, 2],
      [2, 2, 4, 3],
      [2, 4, 3, 4],
      [3, 6, 2, 6],
      [5, 6, 2, 6],
      [6, 6, 1, 8],
      [4, 8, 9, 9],
      [5, 9, 9, 9],
      [6, 10, 8, 11],
      [8, 10, 8, 10],
      [8, 12, 6, 13],
    ],
    two: [
      [0, -2, 0, -1],
      [1, 0, -1, 1],
      [2, 1, -1, 1],
      [3, 2, -2, 3],
      [4, 2, -2, 3],
      [2, 5, 5, 4],
      [4, 4, 4, 3],
      [4, 7, 1, 6],
      [4, 6, 8, 7],
      [4, 8, 7, 9],
      [5, 9, 7, 10],
      [6, 10, 7, 11],
      [7, 11, 7, 12],
      [9, 11, 7, 12],
    ],
    three: [
      [0, -1, 0, -1],
      [1, 0, -1, -2],
      [2, 1, -4, 1],
      [1, 2, 3, 3],
      [2, 3, 3, 3],
      [3, 4, 2, 4],
      [4, 5, 1, 5],
      [5, 6, 0, 7],
      [4, 6, 8, 7],
      [5, 9, 7, 9],
      [6, 10, 7, 9],
      [7, 11, 6, 11],
      [8, 10, 6, 11],
      [8, 12, 11, 10],
    ],
  };

  // style
  n = 0;

  // style index
  k = 0;

  // span value
  a = 0;
  b = 0;
  c = 0;
  d = 0;

  // time change style
  timeChange = 3000;

  // functionality

  // next style
  plusK() {
    this.k++;
  }

  // reset style
  resetK() {
    this.k = 0;
  }

  // init
  galleryCall() {
    for (let i = 1; i <= 14; i++) {
      this.n = Object.entries(this.style)[this.k][1];
      this.a = this.n[i - 1][0];
      this.b = this.n[i - 1][1];
      this.c = this.n[i - 1][2];
      this.d = this.n[i - 1][3];
      sectionGallery.append(images);
      images.insertAdjacentHTML(
        "beforeend",
        `<figure class="img-${i}" style="grid-row: ${i - this.a} / span ${
          i - this.b
        }; grid-column: ${i - this.c} / span ${i - this.d}">
            <img src="${
              setPages.categoryData[
                Math.floor(Math.random() * setPages.categoryData.length)
              ].image1
            }" alt="GalleryImage image ${i + 1}" class="gallery-img" />
          </figure>
          `
      );
    }
  }

  // Remove previous style
  removeGallery() {
    for (let i = 1; i <= 14; i++) document.querySelector(`.img-${i}`)?.remove();
  }

  // Remove all images
  removeImages() {
    images.remove();
  }

  // Change style every 3s function
  galleryLoopCall() {
    this.galleryCall();
    setTimeout(() => {
      this.removeGallery();
      this.plusK();
      this.galleryCall();
    }, `${this.timeChange}`);
    setTimeout(() => {
      this.removeGallery();
      this.plusK();
      this.galleryCall();
    }, `${this.timeChange * 2}`);
    setTimeout(() => {
      this.removeGallery();
      this.resetK();
      this.runGallery && this.galleryLoopCall();
    }, `${this.timeChange * 3}`);
  }
}

export default new Gallery();
