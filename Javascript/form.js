const backBtn=document.getElementById('backBtn'),
      signUp=document.getElementById('signUp'),
      popUp=document.getElementById('popUp'),
      okBtn=document.getElementById('okBtn');

backBtn.addEventListener('click',(e)=>{
  e.preventDefault();
  document.body.classList.add('fade-in');
  setTimeout(()=>{
    window.location.href='../index.html';
  },500);
});


signUp.addEventListener('click',async(e)=>{
  e.preventDefault();

  // popUp.classList.add('active');
  // alert("hello");

  // declare variable
  const name=document.getElementById("name").value;
  const email=document.getElementById("email").value;
  const password=document.getElementById("password").value;
  const confirmPassword=document.getElementById("confirmPassword").value;

  // request
  const response=
  await fetch(
    "http://localhost:8081/api/users/register",
    {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        name:name,
        email:email,
        password:password
      })

    
    }
  );

  if(response.ok){
    popUp.classList.add('active');
  }


});

okBtn.addEventListener('click',(e)=>{
  e.preventDefault();

  popUp.classList.remove('active');

  document.body.classList.add('fade-in');
  setTimeout(()=>{
    window.location.href='../index.html';
  },500);
});

// once user click the password field
const pwMsg=document.getElementById("pwMsg");
const CfPwMsg=document.getElementById("CfPwMsg");

password.addEventListener('focus',()=>{
  password.placeholder="Minimum 8 characters";
});

password.addEventListener('blur',()=>{
  password.placeholder="Password";
});

confirmPassword.addEventListener('focus',()=>{
  confirmPassword.placeholder="Minimum 8 characters";
});

confirmPassword.addEventListener('blur',()=>{
  confirmPassword.placeholder="Password";
});
// password.addEventListener("input",()=>{
//   // console.log("you click me");
//   if(password.value.length >= 8){
//     pwMsg.textContent="Password length is valid";
//     pwMsg.className="valid";
//   }
//   else{
//     pwMsg.textContent=`Password needs ${8 - password.value.length} characters more`;
//     pwMsg.className="invalid";
//   }
// })
// confirmPassword.addEventListener("input",()=>{
//   // console.log("you click me too");
//   if(confirmPassword.value.length >= 8){
//     CfPwMsg.textContent="Password length is valid";
//     CfPwMsg.className="valid";
//   }
//   else{
//     CfPwMsg.textContent=`Password needs ${8 - confirmPassword.value.length} characters more`;
//     CfPwMsg.className="invalid";
//   }
// })

// const checkPw=()=>{
//   if(pwMsg.value === CfPwMsg.value){
//     console.log("Password must be match");
//   }
// };
