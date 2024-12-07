class Edit {
  showEditBtn(e) {
    const image = e.target.closest(".properties-box");
    if (image === null) return;
    const updateBtn = image.querySelectorAll(".update-btn");
    updateBtn[0].style.transform = "translateX(0)";
    updateBtn[1].style.transform = "translateX(0)";
    image.addEventListener("mouseout", () => {
      updateBtn[0].style.transform = "translateX(6rem)";
      updateBtn[1].style.transform = "translateX(6rem)";
    });
  }
}
export default new Edit();
