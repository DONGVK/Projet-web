<template>
<div>
    <div class="centered">
      <input placeholder="Rechercher un profil" class="search" type="text"/>
    </div>
    <div class="container">
      <div class="item">DONG's profil</div>
      <div class="item">PONNOU's profil</div>
    </div>
</div>
</template>
 
<script>
module.exports = {
  data () {
    return {
        newArticle: {
        name: '',
        description: '',
        image: '',
        price: 0
      }
    }
  },
  props: {
   show: Boolean
  },
  methods: {
      addArticle () {
      this.$emit('add-article', this.newArticle)
    }
  }
}
</script>

<style scoped>
.centered{
    width: 100%;
    text-align: center;
}

.search{
    width: 60%;
    text-align: center;
    font-size: larger;
    color: white;
    border: solid rgb(172, 172, 172);
    border-radius: 10px;
    background-color: transparent;
    outline: none;
}

.search:focus {
    border: solid white;
    border-radius: 10px;
}
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
    height: 50vh;
    background-color: black;
    border-radius: 10px;
    color: white;
    opacity: 0.2;
}
</style>
