const backBtn = document.getElementById("backBtn"),
  signInPage = document.getElementById("signInPage"),
  signIn = document.getElementById("signIn"),
  warningPopUp = document.getElementById("warningPopUp"),
  email=document.getElementById("email"),
  password=document.getElementById("password"),
  successModal=document.getElementById("successModal"),
  headmsg=document.getElementById("headmsg"),
  bodymsg=document.getElementById("bodymsg"),
  unsuccessModal=document.getElementById("unsuccessModal"),
  unsuccessBtn=document.getElementById("unsuccessBtn");

const okBtnError = document.querySelector(".okBtnError"),
      successBtn=document.querySelector(".success-btn");

const api_url="https://goofoodoobackend-production.up.railway.app";


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
    try{
      const response=await fetch(`${api_url}/api/users/login`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          email:email.value,
          password:password.value,
        }),

      });
      // console.log(response.status);
      if(response.ok){
        const user=await response.json();

        localStorage.setItem("userId",user.id);
        console.log("login success");
        successModal.classList.add("見せて");

      }
      // more clean
      if(!response.ok){
        // reesponse.text() it takes from javaa with this code  return ResponseEntity.status(404).body("Email not found");

        const errormsg=await response.text();
        unsuccessModal.classList.add("show");
        headmsg.textContent=errormsg;
        bodymsg.textContent=`Please check again`;
      }
    }
    catch(error){
        unsuccessModal.classList.add("show");
        headmsg.textContent="Server is offline";
        bodymsg.textContent=`Can not connect to GooFoodoo server.`;
    }
    // if(response.status === 401){
    //   const errormsg=await response.text();
    //   unsuccessModal.classList.add("show");
    //   headmsg.textContent=errormsg;
    //   bodymsg.textContent=`Please check again`;
  
    //   // console.log("error hx bro");
    // }
    // if(response.status === 404){
    //   const errormsg=await response.text();
    //   unsuccessModal.classList.add("show");
    //   headmsg.textContent=errormsg;
    //   bodymsg.textContent=`Please check again`;

    // }
  }
  
});

okBtnError.addEventListener("click", () => {
  warningPopUp.classList.remove("active");
});

successBtn.addEventListener("click",(e)=>{
  e.preventDefault();
  successModal.classList.remove("見せて");
  document.body.classList.add("fade-in");
  setTimeout(()=>{
    window.location.href="../index.html";
  },500);
});
// tmr we do a sign in button feature

unsuccessBtn.addEventListener("click",(e)=>{
  e.preventDefault();
  unsuccessModal.classList.remove("show");
  setTimeout(()=>{
    window.location.reload();
  },500);
});