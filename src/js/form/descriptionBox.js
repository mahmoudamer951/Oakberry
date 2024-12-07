const addDetails = document.querySelector(".add-details");
const addUp = document.querySelector(".add-up");
const addDown = document.querySelector(".add-down");
const submit = document.querySelector(".add-property-btn");

class DescriptionBox {
  addDescription() {
    addDetails?.classList.toggle("hidden-add-details");
    addUp?.classList.toggle("hidden-add-arrow");
    addDown?.classList.toggle("hidden-add-arrow");
    submit?.classList.contains("submit-hidden")
      ? setTimeout(() => {
          submit?.classList.toggle("submit-hidden");
        }, 1000)
      : submit?.classList.toggle("submit-hidden");
  }

  resetDescription() {
    addDetails?.classList.add("hidden-add-details");
    addUp?.classList.remove("hidden-add-arrow");
    addDown?.classList.add("hidden-add-arrow");
    submit?.classList.add("submit-hidden");
  }
}
export default new DescriptionBox();
