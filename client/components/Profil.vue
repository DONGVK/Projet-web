<template>
<div id='portfolio' v-bind:user="user">
      <div id='presentation'><p>Hello ! {{user.firstname}} {{user.lastname}}</p></div>
      <div id='skills'></div>
      <div id='experiences'></div>
      <div id='other'></div>
</div>
</template>
 
<script>
module.exports = {
    props:{
        user: {type: Object},
        profils: {type: Array}
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
</script>
 
<style scoped>
html {
  scroll-behavior: smooth;
}

p{
    color: white;
}

#portfolio{
    position: absolute;
    top:0;
    left:0;
    width: 100%;
    height: 100vh;
}

#portfolio > div{
    float:left;
    width: 100%;
    height: 100vh;
    overflow: hidden;
}
#presentation{
    background-color: red;
}
#skills{
    background-color: blue;
}
#experiences{
    background-color: white;
}
</style>

