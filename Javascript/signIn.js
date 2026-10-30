const backBtn = document.getElementById("backBtn"),
  signInPage = document.getElementById("signInPage"),
  signIn = document.getElementById("signIn"),
  warningPopUp = document.getElementById("warningPopUp");

const okBtnError = document.querySelector(".okBtnError");

backBtn.addEventListener("click", (e) => {
  e.preventDefault();
  document.body.classList.add("fade-in");
  setTimeout(() => {
    window.location.href = "../index.html";
  }, 500);
});

signInPage.addEventListener("click", (e) => {
  e.preventDefault();
  document.body.classList.add("fade-in");
  setTimeout(() => {
    window.location.href = "signUp.html";
  }, 500);
});

signIn.addEventListener("click", () => {
  warningPopUp.classList.add("active");
});

okBtnError.addEventListener("click", () => {
  warningPopUp.classList.remove("active");
});
