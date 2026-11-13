const backBtn = document.getElementById("backBtn"),
  signUp = document.getElementById("signUp"),
  successModal = document.getElementById("successModal"),
  successBtn = document.getElementById("successBtn"),
  unsuccessModal=document.getElementById("unsuccessModal"),
  headmsg=document.getElementById("headmsg"),
  bodymsg=document.getElementById("bodymsg"),
  unsuccessBtn=document.getElementById("unsuccessBtn");

const name = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

const warningPopUp = document.getElementById("warningPopUp");
const errorPopUp = document.getElementById("errorPopUp");
const okBtnErrors = document.querySelectorAll(".okBtnError");

const msg = document.getElementById("msg");

const api_url="https://goofoodoobackend-production.up.railway.app";

// clean


backBtn.addEventListener("click", (e) => {
  e.preventDefault();
  document.body.classList.add("fade-in");
  setTimeout(() => {
    window.location.href = "signIn.html";
  }, 500);
});

signUp.addEventListener("click", async (e) => {
  e.preventDefault();

  // popUp.classList.add('active');
  // alert("hello");

  // declare variable
  const name = document.getElementById("name");
  
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirmPassword");

  const warningPopUp = document.getElementById("warningPopUp");

  const okBtnErrors = document.querySelectorAll(".okBtnError");
  if (
    !name.value.trim() ||
    !email.value.trim() ||
    !password.value.trim() ||
    !confirmPassword.value.trim()
  ) {
    warningPopUp.classList.add("active");

    okBtnErrors.forEach((okBtnError) => {
      okBtnError.addEventListener("click", () => {
        warningPopUp.classList.remove("active");
      });
    });
  }

  // request
  // this once the user fill the form
  else {
    try{
      const response = await fetch(`${api_url}/api/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.value,
          email: email.value,
          password: password.value,
        }),
      });
      if (response.ok) {
        successModal.classList.add("show");
      }
      
    }
    catch(error){
      unsuccessModal.classList.add("shows");
      headmsg.textContent="Sign up failed";
      bodymsg.textContent="Due to GooFoodoo server is offline";
    }
  }


});

successBtn.addEventListener("click", (e) => {
  e.preventDefault();

  successModal.classList.remove("show");

  document.body.classList.add("fade-in");
  setTimeout(() => {
    window.location.href = "../index.html";
  }, 500);
});

unsuccessBtn.addEventListener("click",()=>{
  unsuccessModal.classList.remove("shows");
});

// once user click the password field
// span
const pwMsg = document.getElementById("pwMsg");
const CfPwMsg = document.getElementById("CfPwMsg");

// password.addEventListener('focus',()=>{
//   password.placeholder="Minimum 8 characters";
// });

// password.addEventListener('blur',()=>{
//   password.placeholder="Password";
// });

// confirmPassword.addEventListener('focus',()=>{
//   confirmPassword.placeholder="Minimum 8 characters";
// });

// confirmPassword.addEventListener('blur',()=>{
//   confirmPassword.placeholder="Password";
// });
password.addEventListener("input", () => {
  // console.log("you click me");
  if (password.value.length >= 8) {
    pwMsg.textContent = "Password length is valid";
    pwMsg.className = "match";
  } else {
    pwMsg.textContent = `Password needs ${8 - password.value.length} characters more`;
    pwMsg.className = "notMatch";
  }
});
confirmPassword.addEventListener("input", () => {
  // console.log("you click me too");
  if (confirmPassword.value.length >= 8) {
    CfPwMsg.textContent = "Password length is valid";
    CfPwMsg.className = "match";
  } else {
    CfPwMsg.textContent = `Password needs ${8 - confirmPassword.value.length} characters more`;
    CfPwMsg.className = "notMatch";
  }
});

const checkPw = () => {
  const good = "#66cc85";
  const bad = "#f71919";

  if (password.value === confirmPassword.value) {
    confirmPassword.style.backgroundColor = good;
    CfPwMsg.textContent = " ";
  } else {
    confirmPassword.style.backgroundColor = bad;
    password.style.backgroundColor = good;
    CfPwMsg.textContent = "Passowrd does not match";
    CfPwMsg.className = "notMatch";
  }
};


