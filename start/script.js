const dropDown = document.getElementById("user_type");
const userFields = document.getElementById("user_fields");
const adminFields = document.getElementById("admin_fields");
const normalUserName = document.getElementById("normalUserName");
const adminUserName = document.getElementById("adminUserName");
const secretPass = document.getElementById("secretPass");
const enterBtn = document.getElementById("enterBtn");
const form = document.querySelector("form");
const togglePassword = document.getElementById("togglePassword");

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

togglePassword.addEventListener("click", function () {
  const type =
    secretPass.getAttribute("type") === "password" ? "text" : "password";
  secretPass.setAttribute("type", type);

  // تغيير الأيقونة
  const eyeIcon = this.querySelector("i");
  eyeIcon.classList.toggle("fa-eye");
  eyeIcon.classList.toggle("fa-eye-slash");
});

// دوال حفظ واسترجاع بيانات المستخدم
function saveUserData(userType, username) {
  if (document.getElementById("remember").checked) {
    localStorage.setItem("userType", userType);
    localStorage.setItem("username", username);
    localStorage.setItem("remembered", "true");
  } else {
    localStorage.removeItem("userType");
    localStorage.removeItem("username");
    localStorage.removeItem("remembered");
  }
}

function loadUserData() {
  const remembered = localStorage.getItem("remembered");
  if (remembered) {
    const userType = localStorage.getItem("userType");
    const username = localStorage.getItem("username");

    // تعيين نوع المستخدم
    dropDown.value = userType;
    checkUserType();

    // تعيين اسم المستخدم
    if (userType === "normal") {
      normalUserName.value = username;
    } else {
      adminUserName.value = username;
    }

    // تحديد checkbox
    document.getElementById("remember").checked = true;
  }
}

// دالة لإظهار رسائل
function showToast(type, title, message, duration = 5000) {
  const container = document.getElementById("toast-container");
  if (!container) return; // التحقق من وجود العنصر

  // إنشاء عنصر الرسالة
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;

  // إضافة الأيقونة حسب نوع الرسالة
  let icon = "";
  switch (type) {
    case "error":
      icon = "fa-circle-xmark";
      break;
    case "success":
      icon = "fa-circle-check";
      break;
    case "warning":
      icon = "fa-triangle-exclamation";
      break;
  }

  toast.innerHTML = `
    <i class="fas ${icon}"></i>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      <div class="toast-message">${message}</div>
    </div>
    <i class="fas fa-times toast-close"></i>
  `;

  // إضافة الرسالة للصفحة
  container.appendChild(toast);

  // تأكيد ظهور التأثير الحركي
  setTimeout(() => {
    toast.style.opacity = "1";
    toast.style.transform = "translateX(0)";
  }, 10);

  // إضافة حدث للزر إغلاق
  const closeBtn = toast.querySelector(".toast-close");
  closeBtn.addEventListener("click", () => {
    removeToast(toast);
  });

  // إزالة الرسالة تلقائياً
  if (duration > 0) {
    setTimeout(() => {
      if (container.contains(toast)) {
        removeToast(toast);
      }
    }, duration);
  }
}

// دالة لإزالة الرسالة بتأثير حركي
function removeToast(toast) {
  toast.style.animation = "slideOut 0.3s ease forwards";
  setTimeout(() => {
    if (toast.parentElement) {
      toast.parentElement.removeChild(toast);
    }
  }, 300);
}

// دالة لإنشاء كلمة مرور فريدة
function generateUniquePassword(username) {
  // أخذ أول حرف
  const firstChar = username.charCodeAt(0);

  // أخذ آخر حرف
  const lastChar = username.charCodeAt(username.length - 1);

  // أخذ طول الاسم
  const nameLength = username.length;

  // حساب مجموع قيم ASCII لكل الحروف
  const sumChars = username
    .split("")
    .reduce((sum, char) => sum + char.charCodeAt(0), 0);

  // إنشاء كلمة المرور من مزيج هذه العوامل
  const password = `${firstChar}${nameLength}${lastChar}${sumChars % 100}`;

  return password;
}

// Modal functionality
const modal = document.getElementById("infoModal");
const infoBtn = document.getElementById("passwordInfo");
const closeBtn = document.querySelector(".close-modal");

infoBtn.onclick = function () {
  modal.style.display = "block";
  document.body.style.overflow = "hidden"; // منع التمرير في الخلفية
};

closeBtn.onclick = function () {
  modal.style.display = "none";
  document.body.style.overflow = "auto";
};

// إغلاق Modal عند النقر خارجه
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }
};

form.onsubmit = (e) => {
  e.preventDefault();
  if (form.checkValidity()) {
    if (dropDown.value == "normal") {
      saveUserData("normal", normalUserName.value);
      showToast(
        "success",
        "Login Successful",
        "Welcome to Traffic Monitoring System",
        3000
      );
      setTimeout(() => (window.location.href = "../live"), 3000);
    } else {
      let username = adminUserName.value;
      let secret = generateUniquePassword(username);
      if (secretPass.value === secret) {
        saveUserData("admin", username);
        showToast(
          "success",
          "Login Successful",
          "Welcome to Admin Dashboard",
          3000
        );
        setTimeout(() => (window.location.href = "../live"), 3000);
      } else {
        showToast(
          "error",
          "Login Failed",
          "Invalid password. Please try again."
        );
      }
    }
  } else {
    showToast(
      "warning",
      "Warning",
      "Please fill in all required fields correctly"
    );
    form.reportValidity();
  }
};

window.onload = function () {
  checkUserType();
  loadUserData();
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
