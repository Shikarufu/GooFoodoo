
// save theme so whenever user refresh or go to another page, the page will save what user have set
const root=document.documentElement;
const savedTheme=localStorage.getItem("theme") || "light";

// apply to entire website
root.setAttribute("data-theme",savedTheme);

document.addEventListener("DOMContentLoaded", () => {
  const themeCheckBox=document.getElementById("theme");
  if(themeCheckBox){
    themeCheckBox.checked=savedTheme === "dark";

    themeCheckBox.addEventListener("change",()=>{
      const newTheme=themeCheckBox.checked ? "light" : "dark";

      root.setAttribute("data-theme",newTheme);

      localStorage.setItem("theme",newTheme);
    });
  }
});