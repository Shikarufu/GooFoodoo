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


signUp.addEventListener('click',(e)=>{
  e.preventDefault();

  popUp.classList.add('active');
  // alert("hello");


});

okBtn.addEventListener('click',(e)=>{
  e.preventDefault();

  popUp.classList.remove('active');

  document.body.classList.add('fade-in');
  setTimeout(()=>{
    window.location.href='../index.html';
  },500);
});