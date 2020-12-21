<template>
  <div class="centered">
    <h2 class="subtitle">"Explore it."</h2>
        <h4 class='signature'>Developped and Designed by Viet Khoi DONG and Wilfried PONNOU</h4>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
            <div class="center">
                <div id="social-test">
                    <ul class="social">
                        <li><a href="https://github.com/DONGVK/Projet-web"><i class="fa fa-github" aria-hidden="true"></a></i></li>
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
    font-size: 500%;
    -webkit-animation: greyeffect 5s infinite;
}

@keyframes greyeffect{
    0%{color: rgb(15, 15, 15);}
    50%{color: rgb(65, 65, 65);}
    50%{color: rgb(82, 82, 82);}	
    50%{color: rgb(124, 124, 124);}	
    50%{color: rgb(204, 204, 204);}
    50%{color: rgb(255, 255, 255);}
 }
</style>
