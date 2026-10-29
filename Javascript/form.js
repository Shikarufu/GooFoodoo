const backBtn = document.getElementById("backBtn"),
  signUp = document.getElementById("signUp"),
  popUp = document.getElementById("popUp"),
  okBtn = document.getElementById("okBtn");

const name = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

const warningPopUp = document.getElementById("warningPopUp");
const errorPopUp = document.getElementById("errorPopUp");
const okBtnErrors = document.querySelectorAll(".okBtnError");

const msg = document.getElementById("msg");

// clean
const SUPABASE_URL = "https://bwbcymurogftbchfbjmf.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3YmN5bXVyb2dmdGJjaGZiam1mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMyODIzNjAsImV4cCI6MjEwODg1ODM2MH0.XaXgEEfMFlRzwvveBT1tdbpIIyKIiFbwB25N9lgzb5Y";

const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

okBtnErrors.forEach((okBtnError) => {
  okBtnError.addEventListener("click", () => {
    warningPopUp.classList.remove("active");
  });

  okBtnError.addEventListener("click", () => {
    errorPopUp.classList.remove("active");
  });
});

backBtn.addEventListener("click", (e) => {
  e.preventDefault();
  document.body.classList.add("fade-in");
  setTimeout(() => {
    window.location.href = "../index.html";
  }, 500);
});

signUp.addEventListener("click", async (e) => {
  e.preventDefault();

  if (
    !name.value.trim() ||
    !email.value.trim() ||
    !password.value.trim() ||
    !confirmPassword.value.trim()
  ) {
    warningPopUp.classList.add("active");
    return;
  }

  try {
    const { data, error } = await _supabase.auth.signUp({
      email: email.value.trim(),
      password: password.value.trim(),
      options: {
        data: {
          name: name.value.trim(),
        },
      },
    });

    if (error) {
      // console.log("Erreur Supabase :", error.message);
      msg.textContent = error.message;
      errorPopUp.classList.add("active");
    } else {
      console.log("Inscription réussie !", data);
      popUp.classList.add("active");
    }
  } catch (error) {
    console.log("Erreur réseau / Inaccessible :", error);
    errorPopUp.classList.add("active");
  }
});

okBtn.addEventListener("click", (e) => {
  e.preventDefault();
  popUp.classList.remove("active");
  document.body.classList.add("fade-in");
  setTimeout(() => {
    window.location.href = "../index.html";
  }, 500);
});

const pwMsg = document.getElementById("pwMsg");
const CfPwMsg = document.getElementById("CfPwMsg");

password.addEventListener("input", () => {
  if (password.value.length >= 8) {
    pwMsg.textContent = "Password length is valid";
    pwMsg.className = "match";
  } else {
    pwMsg.textContent = `Password needs ${8 - password.value.length} characters more`;
    pwMsg.className = "notMatch";
  }
});

confirmPassword.addEventListener("input", () => {
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
    CfPwMsg.textContent = "Password does not match";
    CfPwMsg.className = "notMatch";
  }
};
