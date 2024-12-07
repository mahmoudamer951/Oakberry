import setPages from "../pages/setPages.js";
import slider from "../slider/slider.js";

const spinner = document.querySelector(".spinner");

class AddProperties {
  addProperties() {
    spinner.innerHTML = "";
    for (let i = setPages.categoryData.length - 1; i >= 0; i--) {
      let prop = setPages.categoryData;
      const formatDate = function () {
        const calcDaysPassed = (date1, date2) =>
          Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
        const dateAdd = new Date(prop[i].date);
        const dateNow = new Date();
        const dayPassed = calcDaysPassed(dateNow, dateAdd);
        if (dayPassed === 0) return "Today";
        if (dayPassed === 1) return "Yesterday";
        if (dayPassed <= 7) return `${dayPassed} days ago`;
        return new Intl.DateTimeFormat(navigator.languages).format(dateAdd);
      };

      setPages.proContent.insertAdjacentHTML(
        "afterbegin",
        `<div class="properties-box swiper-slide" id="${
          setPages.categoryData.length - i
        }">
        <div class="imgGroup imgGroup-${setPages.categoryData.length - i}">` +
          `<img class="proImg proImg-${
            setPages.categoryData.length - i
          }" src="${setPages.categoryData[i].image1}" alt="">` +
          `<img class="proImg proImg-${
            setPages.categoryData.length - i
          }" src="${setPages.categoryData[i].image2}" alt="">` +
          `<img class="proImg proImg-${
            setPages.categoryData.length - i
          }" src="${setPages.categoryData[i].image3}" alt="">` +
          `<img class="proImg proImg-${
            setPages.categoryData.length - i
          }" src="${setPages.categoryData[i].image4}" alt="">` +
          `<img class="proImg proImg-${
            setPages.categoryData.length - i
          }" src="${setPages.categoryData[i].image5}" alt="">` +
          `<img class="proImg proImg-${
            setPages.categoryData.length - i
          }" src="${setPages.categoryData[i].image6}" alt="">` +
          `<img class="proImg proImg-${
            setPages.categoryData.length - i
          }" src="${setPages.categoryData[i].image7}" alt="">` +
          `<img class="proImg proImg-${
            setPages.categoryData.length - i
          }" src="${setPages.categoryData[i].image8}" alt="">` +
          `  </div>
            <div class="img-dots img-dots-${
              setPages.categoryData.length - i
            }"></div>
    <div class="properties-content">
      <div class="owner">
      <div class="owner-group">
        <img src="${setPages.categoryData[i].ownerPhoto}" alt="">
        <p class="name">${setPages.categoryData[i].ownerName}</p>
        </div>
        <div class="date-add">${formatDate()}</div>
      </div>
      <div class="properties-details">
        <h2 class="pro-name">${setPages.categoryData[i].propertyName}</h2>
        <p class="pro-location" id='${
          setPages.categoryData[i].id
        }'><i class="fa-solid fa-location-dot location-dot"></i>` +
          `<span id ="${setPages.categoryData[i].id}" class='country'>` +
          `${setPages.categoryData[i].country} &hyphen; ${setPages.categoryData[i].region}</span></p>` +
          `<div class="price-purpose">
          <span class="price">${setPages.categoryData[i].price} $</span>
          <span class="purpose ${setPages.categoryData[i].purpose}">${
            setPages.categoryData[i].purpose
          }</span>
          </div>
      <div class="pro-details">
      <div class="pro-details-group">
        <i class="fa-solid fa-bed"></i><span>${
          setPages.categoryData[i].room
        }</span>
        </div>
        <span>|</span>
        <div class="pro-details-group">
        <i class="fa-solid fa-shower"></i><span>${
          setPages.categoryData[i].bathroom
        }</span>
          </div>
        <span>|</span>
        <div class="pro-details-group">
        <i class="fa-regular fa-square"></i><span>${
          setPages.categoryData[i].space
        } sqft</span></div>
      </div>
      </div>
    <div
      class="show-contact show-contact-${
        setPages.categoryData.length - i
      } hidden-contact">
      <p
        class="contact-area contact-area-${setPages.categoryData.length - i}"
         >${setPages.categoryData[i].phoneNumber} | <a href="mailto:${
            setPages.categoryData[i].mail
          }" title="send email"><i class="fa-sharp fa-solid fa-paper-plane contact-mail-icon"></i></a></p>
        <div class="contact-header contact-header-${
          setPages.categoryData.length - i
        }"
        id="${setPages.categoryData.length - i}">
        <button class="contact-btn">
        <i class="fa-solid fa-phone"></i>
        </button>
      </div>
    </div>
    
    <div
      class="more-details more-details-${
        setPages.categoryData.length - i
      } hidden-details">
      <p
        class="description-area description-area-${
          setPages.categoryData.length - i
        }"
         >${setPages.categoryData[i].description}</p>
        <div class="description-header description-header-${
          setPages.categoryData.length - i
        }"
        id="${setPages.categoryData.length - i}">
        <i class="arrowDetails arrow-up-${
          setPages.categoryData.length - i
        } fa-solid fa-angle-up"></i>
        <i class="arrowDetails arrow-down-${
          setPages.categoryData.length - i
        } fa-solid fa-angle-down hidden-arrow"></i>
      </div>
    </div>
    </div>
    <button class="img-btn img-left img-left-${
      setPages.categoryData.length - i
    }"><i class="fa-solid fa-angle-left"></i></button>
    <button class="img-btn img-right img-right-${
      setPages.categoryData.length - i
    }"><i class="fa-solid fa-angle-right"></i></button>
    </div>`
      );
      if (window.location.href.match("myproperties.html"))
        document.querySelector(".properties-box").insertAdjacentHTML(
          "beforeend",
          `<div class="update-btn update-property-btn" id="${setPages.categoryData[i].referenceNumber}">Update</div>
              <div class="update-btn delete-property-btn" id="${setPages.categoryData[i].referenceNumber}">Delete</div>`
        );

      document
        .querySelector(
          ".description-header-" + (setPages.categoryData.length - i)
        )
        .addEventListener("click", (e) => {
          e.preventDefault();
          this.showDetails(setPages.categoryData.length - i);
        });

      document
        .querySelector(".contact-header-" + (setPages.categoryData.length - i))
        .addEventListener("click", (e) => {
          e.preventDefault();
          this.showContact(setPages.categoryData.length - i);
        });
    }

    for (let i = 1; i <= setPages.categoryData.length; i++) slider.imgSlide(i);
  }

  showDetails(a) {
    const moreDetails = document.querySelector(".more-details-" + a);
    const arrowUp = document.querySelector(".arrow-up-" + a);
    const arrowDown = document.querySelector(".arrow-down-" + a);
    moreDetails.classList.toggle("hidden-details");
    arrowUp.classList.toggle("hidden-arrow");
    arrowDown.classList.toggle("hidden-arrow");
  }

  showContact(a) {
    const showContact = document.querySelector(".show-contact-" + a);
    showContact.classList.toggle("hidden-contact");
  }
}
export default new AddProperties();
