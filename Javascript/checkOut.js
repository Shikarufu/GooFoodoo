const backBtn = document.getElementById("backBtn");
const methods = document.querySelectorAll(".method");

backBtn.addEventListener("click", (e) => {
  e.preventDefault();

  document.body.classList.add("fade-in");
  setTimeout(() => {
    window.location.href = "../index.html";
  }, 500);
});

methods.forEach((method) => {
  method.addEventListener("click", () => {
    methods.forEach(item=>
      item.classList.remove("active")
    );
    method.classList.add("active");
  });
});
