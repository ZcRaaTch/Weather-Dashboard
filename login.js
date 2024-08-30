// dark theme switch start
let darktheme = localStorage.getItem("darktheme");
const body = document.querySelector(".body");
const themeToggle = document.querySelector("#theme-toggle");

function enableDarktheme() {
  body.classList.add("darktheme");
  localStorage.setItem("darktheme", "active");
}
function disableDarktheme() {
  body.classList.remove("darktheme");
  localStorage.setItem("darktheme", null);
}
if (darktheme === "active") enableDarktheme();
themeToggle.addEventListener("click", () => {
  darktheme = localStorage.getItem("darktheme");
  darktheme !== "active" ? enableDarktheme() : disableDarktheme();
});
// dark theme switch ends
// changing between login and signup window
const wrapper = document.querySelector(".wrapper");
const main = document.querySelector(".main");
const loginWindow = document.querySelector(".login-window");
const signupWindow = document.querySelector(".signup-window");

loginWindow.addEventListener("click", () => {
  main.classList.add("hidden");
  wrapper.classList.remove("hidden");
});
signupWindow.addEventListener("click", () => {
  wrapper.classList.add("hidden");
  main.classList.remove("hidden");
});
