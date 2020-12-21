<template>
  <div class="gradient-border" id="box">
    <form v-on:submit.prevent="addUser()">
        <h2> Inscription </h2>
        <input class="border-gradient border-gradient-purple" type='text' v-model="newUsers.email" placeholder="Nom" required/>
        <input class="border-gradient border-gradient-purple" type='text' v-model="newUsers.password" placeholder="Prénom" required/>
        <input class="border-gradient border-gradient-purple" type='email' v-model="newUsers.email" placeholder="Adresse mail" required/>
        <input class="border-gradient border-gradient-purple" type='password' v-model="newUsers.password" placeholder="Mot de passe" required/>
        <button class="border-gradient border-gradient-purple" type="submit">S'inscrire</button>
    </form>
  </div>
</template>
 
<script>
module.exports = {
  data () {
    return {
        newUsers: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
      addUser() {
        this.$emit('add-user', this.newUsers)
      }
  }
}
</script>
 
<style scoped>
form input{
  border:none;
  background-color: rgb(24, 23, 23);
  color:grey;
}
.border-gradient {
  padding:2.2px;
  margin-left:5px;
  border: 5px solid;
  border-image-slice: 1;
  border-width: 1.5px;
  background-color:#1D1F20;
  color:white;
  margin-bottom:10px;
}
.border-gradient:hover {
  margin-left:5px;
  border: 5px solid;
  border-image-slice: 1;
  border-width: 1.5px;
  background-color:white;
  color:black;
  border-image-source: linear-gradient(to left, #743ad5, #d53a9d);

}
.border-gradient-purple {
  border-image-source: linear-gradient(to left, #743ad5, #d53a9d);
}
form{
  text-align:center;
}
input{
  margin-left:auto;
  margin-right:auto;
}
.gradient-border{
  text-align:center;
  color:white;
}
.number{
  width: 50px;
}
  @import url('https://fonts.googleapis.com/css?family=Raleway:200');

}
#box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 250px;
  color: white;
  font-family: 'Raleway';
  font-size: 2.5rem;
}
.gradient-border {
  --borderWidth: 3px;
  background: #1D1F20;
  position: relative;
  border-radius: var(--borderWidth);
}
.gradient-border:after {
  content: '';
  position: absolute;
  top: calc(-1 * var(--borderWidth));
  left: calc(-1 * var(--borderWidth));
  height: calc(100% + var(--borderWidth) * 2);
  width: calc(100% + var(--borderWidth) * 2);
  background: linear-gradient(60deg, #f79533, #f37055, #ef4e7b, #a166ab, #5073b8, #1098ad, #07b39b, #6fba82);
  border-radius: calc(2 * var(--borderWidth));
  z-index: -1;
  animation: animatedgradient 3s ease alternate infinite;
  background-size: 300% 300%;
}


@keyframes animatedgradient {
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
}

</style>

