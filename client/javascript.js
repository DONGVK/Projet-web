var btn= document.querySelector('.toggle_btn');
  var nav=document.querySelector('menu nav');

  btn.onclick=function(){
    nav.classList.toggle('nav_open');
  }