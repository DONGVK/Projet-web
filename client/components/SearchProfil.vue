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
