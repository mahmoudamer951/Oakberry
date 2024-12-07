import openAdd from "../form/openAdd.js";
import descriptionBox from "../form/descriptionBox.js";
import readData from "../data/readData.js";
import setPages from "../pages/setPages.js";
import messageHandler from "../ui/messageHandler.js";

const userLoginOverlay = document.querySelector(".user-login-overlay");
const incorectUserPass = document.querySelector(".incorect-user-pass");
const openAddDescription = document.querySelector(".text-area-arrow");
const userDropdownBtn = document.querySelector(".userDropdownBtn");
const userSigninBtn = document.querySelector(".userSigninBtn");
const userIcon = document.querySelector(".fa-solid.fa-user");
const userLogin = document.querySelector(".user-login");
const userPhoto = document.querySelector(".user-photo");
const userName1 = document.querySelector(".user-name");
const loginBtn = document.querySelector(".login-btn");
const userName = document.querySelector(".userName");
const password = document.querySelector(".password");
const headerNav = document.querySelector(".header");
const btnNav = document.querySelector(".btnNav");
const submitBtn = document.createElement("button");
submitBtn.setAttribute("type", "button");
submitBtn.classList.add("btn-nav");
submitBtn.classList.add("btn-link");
submitBtn.classList.add("show-add-property");
submitBtn.innerHTML = "+";

class UserAccount {
  accounts = "";
  closeUserLogin() {
    userLogin.classList.add("hidden");
    userLoginOverlay.classList.add("hidden");
    userName.value = "";
    password.value = "";
    keepLogin.checked = false;
  }

  loginBtn() {
    if (
      localStorage.getItem("saveLogin") !== null &&
      localStorage.saveLogin !== ""
    ) {
      readData.currentAccount = JSON.parse(localStorage.saveLogin);
      this.showSubmitProperty();
      userSigninBtn.classList.add("hidden");
      userDropdownBtn.classList.remove("hidden");
      userName1.innerHTML = readData.currentAccount.name;
      if (readData.currentAccount.photo !== "") {
        userIcon.classList.add("hidden");
        userPhoto.innerHTML = `<img src="${readData.currentAccount.photo}" alt="">`;
      } else {
        userPhoto.classList.add("hidden");
      }
    } else {
      this.signOutBtn();
    }
    loginBtn.addEventListener("click", () => {
      this.getUserAccounts();
    });
    userName.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !userLogin.classList.contains("hidden"))
        this.getUserAccounts();
    });
    password.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !userLogin.classList.contains("hidden"))
        this.getUserAccounts();
    });
  }

  signOutBtn() {
    localStorage.saveLogin = "";
    submitBtn.remove();
    userSigninBtn.classList.remove("hidden");
    userDropdownBtn.classList.add("hidden");
  }

  showSubmitProperty() {
    btnNav.appendChild(submitBtn);
    document.querySelector(".btn-nav").addEventListener("click", () => {
      setPages.propertyBtn = "add";
      openAdd.openAdd();
    });
    openAddDescription.addEventListener("click", () => {
      if (setPages.mode === "add") descriptionBox.addDescription();
      if (setPages.mode === "update") descriptionBox.addDescription.bind(this);
    });
  }

  getCurrentUserAccount() {
    for (let k = 0; k < this.accounts.length; k++) {
      if (
        this.accounts[k].userName === userName.value &&
        this.accounts[k].password === +password.value
      ) {
        readData.currentAccount = this.accounts[k];
        this.keepLoginJson = JSON.stringify(readData.currentAccount);
        localStorage.setItem("saveLogin", this.keepLoginJson);
        if (keepLogin.checked) {
          this.rememberMeJson = JSON.stringify(readData.currentAccount);
          localStorage.setItem("rememberMe", this.rememberMeJson);
        } else {
          localStorage.rememberMe = "";
        }
        if (headerNav.classList.contains("nav-open"))
          headerNav.classList.remove("nav-open");
        this.closeUserLogin();
        this.showSubmitProperty();
        userSigninBtn.classList.add("hidden");
        userDropdownBtn.classList.remove("hidden");
        userName1.innerHTML = readData.currentAccount.name;
        if (readData.currentAccount.photo !== "") {
          userIcon.classList.add("hidden");
          userPhoto.innerHTML = `<img src="${readData.currentAccount.photo}" alt="">`;
        } else {
          userPhoto.classList.add("hidden");
        }
        keepLogin.checked = false;
        if (!incorectUserPass.classList.contains("hidden"))
          incorectUserPass.classList.add("hidden");
      } else {
        incorectUserPass.classList.remove("hidden");
        if (userName?.value === "") userName?.focus();
        if (password?.value === "") password?.focus();
      }
    }
  }

  // Get user account from  API
  async getUserAccounts() {
    try {
      const res = await fetch("https://api.mahmoudamer.com");
      const data = await res.json();
      await (this.accounts = data.data.account);
      this.getCurrentUserAccount();
    } catch (err) {
      messageHandler.errorHandler(`${err.message} data! Try again`);
    }
  }
}
export default new UserAccount();
