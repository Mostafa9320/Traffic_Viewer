const dropDown = document.getElementById("user_type");
const userFields = document.getElementById("user_fields");
const adminFields = document.getElementById("admin_fields");
const normalUserName = document.getElementById("normalUserName");
const adminUserName = document.getElementById("adminUserName");
const secretPass = document.getElementById("secretPass");
const enterBtn = document.getElementById("enterBtn");
const form = document.querySelector("form");

function checkUserType() {
  let val = dropDown.value;
  if (val == "normal") {
    userFields.style.display = "flex";
    adminFields.style.display = "none";
    normalUserName.setAttribute("required", "true");
    adminUserName.removeAttribute("required");
    secretPass.removeAttribute("required");
  } else {
    adminFields.style.display = "flex";
    userFields.style.display = "none";
    adminUserName.setAttribute("required", "true");
    secretPass.setAttribute("required", "true");
    normalUserName.removeAttribute("required");
  }
}
dropDown.onchange = checkUserType;

form.onsubmit = (e) => {
  e.preventDefault();
  if (form.checkValidity()) {
    if (dropDown.value == "normal") window.location.href = "../live";
    else {
      let username = adminUserName.value;
      let secret = `${username.charCodeAt(
        username.length - 1
      )}${username.charCodeAt(username[0])}`;
      if (secretPass.value === secret) window.location.href = "../live";
      else alert("Wrong Password!" + ` \n\nRight Password: ${secret}`);
    }
  } else {
    form.reportValidity();
  }
};

window.onload = function () {
  checkUserType();
  const loadingScreen = document.getElementById("loading");
  setTimeout(() => {
    loadingScreen.style.opacity = "0";
    loadingScreen.style.transition = "opacity 0.5s ease";
    setTimeout(() => {
      loadingScreen.style.display = "none";
      document.body.style.overflow = "auto";
    }, 500);
  }, 5000);
};
