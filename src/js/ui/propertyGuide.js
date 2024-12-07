class PropertyGuide {
  propertyGuide() {
    document.querySelector(".properties-box").insertAdjacentHTML(
      "afterbegin",
      `<div class="property-popup-guide">
          <div class="property-guide-btn">Done</div>
          <div class="swipe-group-property swipe-group-img">
             <i class="swipe-img fa-regular fa-hand-point-up hand-swipe"></i>
             <p class="swipe-text swipe-text-img">swipe</p>
            </div>
            <div class="swipe-group-property swipe-group-box">
            <i class="swipe-box fa-regular fa-hand-point-up hand-swipe"></i>
            <p class="swipe-text swipe-text-box">swipe</p>
          </div>
          <i class="swipe-icon click-arrow-img fa-regular fa-hand-point-down fa-fade"></i>
          <i class="swipe-icon click-contact fa-regular fa-hand-point-up fa-fade"></i>
          <i class="swipe-icon click-location fa-regular fa-hand-point-up fa-fade"></i>
          <i class="swipe-icon click-description fa-regular fa-hand-point-down fa-fade"></i>
          <i class="swipe-icon click-img-dots fa-regular fa-hand-point-down fa-fade"></i>
        </div>`
    );
    document
      .querySelector(".property-guide-btn")
      .addEventListener("click", () =>
        document.querySelector(".property-popup-guide").remove()
      );
  }
  agentGuide() {
    document.querySelector(".agent-box").insertAdjacentHTML(
      "afterbegin",
      `<div class="agent-popup-guide">
          <div class="agent-guide-btn">Done</div>
            <div class="swipe-group-agent">
            <i class="swipe-box fa-regular fa-hand-point-up hand-swipe"></i>
            <p class="swipe-text swipe-text-box">swipe</p>
          </div>
        </div>`
    );
    document
      .querySelector(".agent-guide-btn")
      .addEventListener("click", () =>
        document.querySelector(".agent-popup-guide").remove()
      );
  }
  blogGuide() {
    document.querySelector(".blog-box").insertAdjacentHTML(
      "afterbegin",
      `<div class="blog-popup-guide">
          <div class="blog-guide-btn">Done</div>
            <div class="swipe-group-blog">
            <i class="swipe-box fa-regular fa-hand-point-up hand-swipe"></i>
            <p class="swipe-text swipe-text-box">swipe</p>
          </div>
        </div>`
    );
    document
      .querySelector(".blog-guide-btn")
      .addEventListener("click", () =>
        document.querySelector(".blog-popup-guide").remove()
      );
  }
  galleryGuide() {
    document.querySelector(".gallery").insertAdjacentHTML(
      "afterbegin",
      `<div class="gallery-popup-guide">
      <div class="gallery-guide-message">
            <p>Display random images in 3 styles every 3 sec. of the last 10 properties that were added.</p>
            </div>
            <div class="gallery-guide-btn">Done</div>
        </div>`
    );
    document
      .querySelector(".gallery-guide-btn")
      .addEventListener("click", () =>
        document.querySelector(".gallery-popup-guide").remove()
      );
  }
}
export default new PropertyGuide();
