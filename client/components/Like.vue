<template>
<div>
    <div class="container">
      <div v-if="profil != user.id" v-for="profil in like" :key="profil" v-on:click="seeProfil(profil.id)" class="item">
        {{profils[profils.findIndex(a => a.id === profil)].firstname}}
        {{profils[profils.findIndex(a => a.id === profil)].lastname}}'s profil <br>
        Domaine : {{profils[profils.findIndex(a => a.id === profil)].domain}} <br> <br>
        <img :src="profils[profils.findIndex(a => a.id === profil)].img"/>
      </div>
    </div>
</div>
</template>
 
<script>
module.exports = {
  props:{
    user:{type: Object },
    like: {type: Array, default: []},
    profils: {type: Array, default: []}
  },
  methods: {
      seeProfil(id) {
      this.$emit('see-profil', id)
    }
  }
}
</script>

<style scoped>
 /* Item block */
.container{
    margin-top: 1%;
    height: 20%;
    width: 100%;
    text-align: center;
}
.item{
    display: inline-block;
    margin-left: 5%;
    width: 30vh;
    height: 30vh;
    background-color: black;
    border-radius: 10px;
    color: white;
    opacity: 0.2;
}
.item:hover{
  box-shadow: 0px 0px 0px 1px white;
  opacity: 1;
}

div.container img{
  height: 100px;
  width: 100px;
}
</style>
