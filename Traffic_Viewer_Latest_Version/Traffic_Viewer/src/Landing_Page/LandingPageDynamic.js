const ham_icon = document.getElementById("hamburger-icon");
const navbar = document.getElementById("mobile_navbar");
const backToTop = document.getElementById("back_to_top");
const iconPath = document.querySelector("#hamburger-icon svg path");
const upIcon = document.querySelector(".to_top");
const members_container = document.querySelector(".members_Slider");
const members = members_container.children;
const NextMember = document.getElementById("next");
const PrevMember = document.getElementById("prev");
let currMemberCard = 0;
let isOpen = false;
const hamburgerPath =
  "M120-240v-66.67h720V-240H120Zm0-206.67v-66.66h720v66.66H120Zm0-206.66V-720h720v66.67H120Z";
const closePath =
  "m251.33-204.67-46.66-46.66L433.33-480 204.67-708.67l46.66-46.66L480-526.67l228.67-228.66 46.66 46.66L526.67-480l228.66 228.67-46.66 46.66L480-433.33 251.33-204.67Z";

ham_icon.addEventListener("click", () => {
  isOpen = !isOpen;
  iconPath.setAttribute("d", isOpen ? closePath : hamburgerPath);
  navbar.style.height = isOpen ? "144px" : "0px";
});
// Smooth Slowly scrolling  ( Start )
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      smoothScroll(targetElement, 1000);
    }
  });
});
function smoothScroll(target, duration) {
  const targetPosition = target.getBoundingClientRect().top + window.scrollY;
  const startPosition = window.scrollY;
  const distance = targetPosition - startPosition;
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}
// Smooth Slowly scrolling ( End )
window.onscroll = function () {
  if (window.scrollY >= 300) {
    upIcon.classList.add("show");
  } else {
    upIcon.classList.remove("show");
  }
};

upIcon.onclick = function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

window.onload = function () {
  const loadingScreen = document.getElementById("loading");
  setTimeout(() => {
    loadingScreen.style.opacity = "0";
    loadingScreen.style.transition = "opacity 0.5s ease";
    setTimeout(() => {
      loadingScreen.style.display = "none";
      document.body.style.overflow = "auto";
    }, 500);
  }, 1000);
};

members[currMemberCard].id = "selected_member";
let memberWidth = members[currMemberCard].offsetWidth;
let sliderOffset;

function moveToNextMember() {
  members[currMemberCard].id = "selected_member";
  const slideWidth = memberWidth + 20;
  const sliderOffset = -(currMemberCard - 0.5) * slideWidth;
  members_container.style.transform = `translateX(${sliderOffset}px)`;
}

NextMember.addEventListener("click", () => {
  members[currMemberCard].id = "";
  currMemberCard = (currMemberCard + 1) % 8;
  moveToNextMember();
});
PrevMember.addEventListener("click", () => {
  members[currMemberCard].id = "";
  currMemberCard = currMemberCard - 1 < 0 ? 7 : currMemberCard - 1;
  moveToNextMember();
});
