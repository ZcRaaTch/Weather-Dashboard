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
