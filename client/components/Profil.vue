<template>
<div id='portfolio' v-bind:user="user">
    <div id='presentation' class="section">
            <img class="pp" :src="profil.img"/>
            <p><span style="white-space: pre-line">{{profil.firstname}}  {{profil.lastname}}</span></p>
            <p><span style="white-space: pre-line">{{profil.description}}</span></p>
    </div>
      <div id='skills' class="section">
          <h4>Compétences<h4>
          <div v-for="item of profil.skills">
            • {{item.name}}
         </div>
     </div>
      <div id='experiences' class="section">
          <h4>Expériences<h4>
          {{profil.experience}}
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
            <div class="center">
                <div id="social-test">
                    <ul class="social">
                        <li class="link"><a :href="profil.linkedin" target="_blank"><i class="fa fa-linkedin" aria-hidden="true"></a></i></li>
                    </ul>
                </div>
            </div>
      </div>
</template>
 
<script>
module.exports = {
    props:{
        user: {type: Object},
        profil: {type: Array, default: []}
    },
    mounted(){
        if (localStorage.getItem('reloaded')) {
            // The page was just reloaded. Clear the value from local storage
            // so that it will reload the next time this page is visited.
            localStorage.removeItem('reloaded');
        } else {
            // Set a flag so that we know not to reload the page twice.
            localStorage.setItem('reloaded', '1');
            location.reload();
        }
    },
    ready(){
        console.log('vbdshfdjezndsbhkdsdsbwbrghbfhs')
    }
}
</script>
 
<style scoped>
p{
    color: white;
    text-align: center;
    font-size: 3vh;
}

#portfolio{
    position: absolute;
    top:0;
    left:0;
    width: 100%;
    height: 100vh;
}

#portfolio > div{
    width: 100%;
    height: 100vh;
    overflow: hidden;
}
#presentation{
    background-color: transparent;
}

.section{
    width:50%;
    display:flex;
    flex-direction: column;
    justify-content:center;
    align-items:center;
    height:auto;
    font-size:35px;

}
h4{
    font-weight:bold;
    font-family:'Champagne';
    font-size:50px;
}
#skills{
    background-image:url('../src/img/bgd.jpg');
    background-size: cover;
}
#experiences{
    background-image:url('../src/img/bgd2.jpg');
    background-size: cover;
}

.pp{
    display: block;
    margin-top: 5%;
    margin-bottom: 1%;
    border-radius: 50%;
    margin-left: auto;
    margin-right: auto;
    height: 200px;
    width: 200px;
}
</style>

