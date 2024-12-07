class OnHoverImage {
  onHoverImage(e) {
    const image = e.target.closest(".properties-box");
    if (image === null) return;
    const imgBtn = image.querySelectorAll(".img-btn");
    const dotsBtn = image.querySelectorAll(".img-dots-dot");
    const contactBtn = image.querySelector(".contact-btn");
    imgBtn[0].style.transform = "translateX(0)";
    imgBtn[1].style.transform = "translateX(0)";
    contactBtn.style.transform = "translateX(0)";
    image.addEventListener("mouseout", () => {
      imgBtn[0].style.transform = "translateX(-6rem)";
      imgBtn[1].style.transform = "translateX(6rem)";
      if (
        image
          .querySelector(".show-contact")
          .classList.contains("hidden-contact")
      )
        contactBtn.style.transform = "translateX(3rem)";
    });
  }
}
export default new OnHoverImage();
