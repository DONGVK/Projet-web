<template>
  <div><p>Hello ! {{user.firstname}} {{user.lastname}}</p></div>
</template>
 
<script>
module.exports = {
    props:{
        user: {type: Object}
    },
}
</script>
 
<style scoped>
p{
    color: white;
}
</style>

