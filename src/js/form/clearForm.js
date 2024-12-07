class ClearForm {
  clearForm() {
    for (let i = 1; i <= 8; i++) {
      document.querySelector(".img-" + i + "-input").value = "";
    }
    title.value = "";
    price.value = "";
    rooms.value = "";
    country.value = "";
    bathroom.value = "";
    region.value = "";
    aria.value = "";
    description.value = "";
    searchInput.value = "";
    saleBtn.checked = false;
    rentBtn.checked = false;
    landBtn.checked = false;
    residentBtn.checked = false;
    commercialBtn.checked = false;
    industrialBtn.checked = false;
  }
}
export default new ClearForm();
