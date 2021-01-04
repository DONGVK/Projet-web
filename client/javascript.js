var navbar = document.querySelector(".navbar")
var ham = document.querySelector(".ham")
ham.addEventListener("click", toggleHamburger)
// toggles hamburger menu in and out when clicking on the hamburger
function toggleHamburger(){
    navbar.classList.toggle("showNav")
    ham.classList.toggle("showClose")
  }