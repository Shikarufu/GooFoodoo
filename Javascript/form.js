const backBtn=document.querySelector('.btn');

backBtn.addEventListener('click',(e)=>{
  e.preventDefault();
  document.body.classList.add('fade-in');
  setTimeout(()=>{
    window.location.href='index.html';
  },500);
});