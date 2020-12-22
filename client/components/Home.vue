<template>
  <div class="centered">
    <h2 class="subtitle">"Explore it."</h2>
        <h4 class='signature'>Developped and Designed by Viet Khoi DONG and Wilfried PONNOU</h4>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
            <div class="center">
                <div id="social-test">
                    <ul class="social">
                        <li><a href="https://github.com/DONGVK/Projet-web" target="_blank"><i class="fa fa-github"  aria-hidden="true"></a></i></li>
                        <li><a href="#" onclick="window.open('https://fr.linkedin.com/in/wilfried-ponnou-66a191195');window.open('https://www.linkedin.com/in/viet-khoi-jean-dong-a91b69198/');"><i class="fa fa-linkedin" aria-hidden="true"></a></i></li>
                    </ul>
                </div>
            </div>
  </div>
</template>

<script>

module.exports = {
  props: {
    user: {id: null, connexion: null}
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>
@import url('../style.css');
body{
    animation-name:startingfade;
    animation-duration:5s;
}
@keyframes startingfade {
  0%{opacity:0}
  100%{opacity: 100;}
}

/* SUBTITLE */
h2{
  position: relative;
  margin-top: 0%;
  text-align: center;
}

.subtitle{
    font-family: "Champagne";
    font-size: 75px;
    animation-name: greyeffect ;
    animation-duration: 10s;
    animation-iteration-count:infinite;
    animation-timing-function:linear;

}

@keyframes greyeffect{
    0%{color: rgb(15, 15, 15);opacity:20}
   /* 25%{color: rgb(65, 65, 65);}*/
    50%{color: rgb(82, 82, 82);}	
  /*  75%{color: rgb(124, 124, 124);}	*/
    100%{color: rgb(204, 204, 204);opacity:100}
    /*50%{color: rgb(255, 255, 255);}*/
 }
</style>
