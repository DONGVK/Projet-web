<template>
<div id='portfolio' v-bind:user="user">
    <div id='presentation' class="section">
            <img class="pp" :src="profil.img"/>
            <p><span style="white-space: pre-line">{{profil.description}}</span></p>
    </div>
      <div id='skills' class="section">{{profil.skills}}</div>
      <div id='experiences' class="section">{{profil.experience}}</div>
      <div id='other' class="section"></div>
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
}

$(document).ready(function()
{
    var position = $(window).scrollTop();

    $(window).scroll(function(){
        var scroll = $(window).scrollTop();
        if(scroll > position) {
            console.log('scrollDown');
            $('body').scrollTo(position + window.innerHeight);
        } if(scroll < position && position > 0) {
            console.log('scrollUp');
            $('html,body').animate({
                scrollTop: (position - window.innerHeight)},
            'slow');
        }
        console.log(position)
        position = scroll
    })

});
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
#skills{
    background-color: blue;
}
#experiences{
    background-color: red;
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

