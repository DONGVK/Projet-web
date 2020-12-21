<template>
  <div class="gradient-border" id="box">
    <form v-on:submit.prevent="connexion()">
      
        <h2 > Connexion  </h2>
        <div class="error">Voulez-vous vous <router-link class='red' to='/register'>inscrire</router-link> ?</div>
        <input type='email' v-model="connexionUser.email" placeholder="Adresse mail" required/>
        <input type='password' v-model="connexionUser.password" placeholder="Mot de passe" required/>
        <button type="submit">Se connecter</button>
    
    </form>
  </div>
</template>
 
<script>
module.exports = {
  data () {
    return {
        connexionUser: {
            email: '',
            password: ''
      }
    }
  },
  methods: {
      connexion() {
        console.log(this.user)
        this.$emit('connexion-user', this.connexionUser)
      }
  }
}
</script>
 
<style scoped>
form input{
  border:none;
  background-color: rgb(24, 23, 23);
  color: white;
  height: 6vh;
  width: 80%;
}

.red{
  color: rgb(216, 148, 47);
  font-weight: bold;
  text-decoration: none;
}
form{
  text-align:center;
}

input{
  margin-bottom:10px;
  text-align: center;
  color:white;
  margin-left:auto;
  margin-right:auto;
  background-color:rgb(26,26,26);
  opacity: 0.5;
  border-bottom:1px solid white;
  font-family: "Bebas Neue";
}

input:focus{
  opacity: 1;
}

#box {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  background-color: black;
  margin-top: 8%;
  margin-left: 35%;
  width: 400px;
  height: 100%;
  color: white;
  font-size: 2.5rem;
  background-image: linear-gradient(to right, #2e2d3f, #2b2b2b);
  box-shadow: 0px 0px 10px -1px rgba(0,0,0,0.92);
}

.error{
  font-size: medium;
  margin-bottom: 10%;
}

button{
  border:none;
  background-color: rgb(38, 32, 48);
  color: white;
  height: 6vh;
  width: 80%;
  border-radius: 5%;
  margin-bottom: 5%;
}

</style>
