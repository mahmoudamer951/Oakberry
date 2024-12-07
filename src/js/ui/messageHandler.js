import descriptionBox from "../form/descriptionBox.js";

const searchCategoryInput = document.querySelector(".category-search-input");
const searchLocationInput = document.querySelector(".location-search-input");
const messagePopupSuccess = document.querySelector(".message-popup-success");
const incorrectDoneBtn = document.querySelector(".incorrect-done-btn");
const successMessage = document.querySelector(".success-message");
const errorMessage = document.querySelector(".error-message");
const userName = document.querySelector(".userName");
const password = document.querySelector(".password");
const country = document.getElementById("country");
const messageOverlay = document.querySelector(".message-overlay");
const messagePopupIncorrect = document.querySelector(
  ".message-popup-incorrect"
);

class MessageHandler {
  successMessage(message) {
    messagePopupSuccess.classList.remove("hidden");
    messageOverlay.classList.remove("hidden");
    successMessage.innerHTML = message;
    setTimeout(() => {
      messagePopupSuccess.classList.add("hidden");
      messageOverlay.classList.add("hidden");
    }, 3000);
  }

  errorHandler(message) {
    searchLocationInput?.blur();
    searchCategoryInput?.blur();
    userName?.blur();
    password?.blur();
    messagePopupIncorrect.classList.remove("hidden");
    messageOverlay.classList.remove("hidden");
    errorMessage.innerHTML = message;
    this.closeMessage();
  }

  closeMessage() {
    incorrectDoneBtn.addEventListener("click", () => {
      messagePopupIncorrect.classList.add("hidden");
      messageOverlay.classList.add("hidden");
      descriptionBox.addDescription();
      country?.focus();
      searchLocationInput?.focus();
      searchCategoryInput?.focus();
    });
    document.addEventListener(
      "keydown",
      (e) => {
        if (
          e.key === "Enter" &&
          !messagePopupIncorrect.classList.contains("hidden")
        ) {
          messagePopupIncorrect.classList.add("hidden");
          messageOverlay.classList.add("hidden");
          searchCategoryInput?.focus();
          searchLocationInput?.focus();
          if (userName?.value === "") userName?.focus();
          if (password?.value === "") password?.focus();
        }
      },
      1
    );
  }
}
export default new MessageHandler();
