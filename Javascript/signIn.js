const backBtn = document.getElementById("backBtn"),
  signInPage = document.getElementById("signInPage"),
  signIn = document.getElementById("signIn"),
  warningPopUp = document.getElementById("warningPopUp"),
  email=document.getElementById("email"),
  password=document.getElementById("password");

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

signIn.addEventListener("click", async (e) => {
  e.preventDefault();
  // បើសិនជាអ្នកប្រើប្រាស់់​ចុចប៊ូតុងដោយគ្មានការបញ្ចូលនោះវានិងលោតនៅសារប្រាប់ថា អត់អាចទទួលតម្លៃទទេបានទេ
  if(
  !email.value.trim() ||
  !password.value.trim()
  ){
    warningPopUp.classList.add("active");
  }
  else{
    const response=await fetch("http://localhost:8082/api/users/login",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        email:email.value,
        password:password.value,
      }),

    });

    if(response.ok){
      const user=await response.json();

      localStorage.setItem("userId",user.id);
      console.log("login success");
    }
  }
  
});

okBtnError.addEventListener("click", () => {
  warningPopUp.classList.remove("active");
});
