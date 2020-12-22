<template>
  <div class="gradient-border" id="box">
    <form v-on:submit.prevent="connexion()">
      
        <h2 > Connexion  </h2>
        
        <div class="group">
          <input type='text' v-model="connexionUser.email"  required/>
          <span class="highlight"></span>
          <span class="bar"></span>
          <label>Email</label>
        </div>
        <div class="group">
          <input type='password' v-model="connexionUser.password"  required/>
          <span class="highlight"></span>
          <span class="bar"></span>
          <label>Mot de passe</label>
        </div>
        <button class='button' type="submit">Se connecter</button>
        <div class="error">Pas encore inscrit ? <router-link class='red' to='/register'>S'inscrire</router-link> </div>

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
template{
  animation-name:startingfade;
  animation-duration:2s;
}
@keyframes startingfade {
  0%{opacity:0}
  100%{opacity: 100;}
}

* { box-sizing:border-box; }

/* form starting stylings ------------------------------- */

.group 			  { 
  position:relative; 
  margin-bottom:45px; 
}
input 				{
  font-size:18px;
  padding:10px 10px 10px 5px;
  display:block;
  width:300px;
  border:none;
  color:white;
  font-family:'Champagne';
  background-color:rgba(71, 71, 71, 0.493);
  border-bottom:1px solid #757575;
}
input:focus 		{ outline:none; }

/* LABEL ======================================= */
label 				 {
  color:rgb(255, 255, 255); 
  font-size:18px;
  font-weight:bold;
  font-family:'Champagne';
  position:absolute;
  pointer-events:none;
  left:5px;
  top:10px;
  transition:0.6s ease all; 
  -moz-transition:0.6s ease all; 
  -webkit-transition:0.6s ease all;
}

/* active state */
input:focus ~ label, input:valid ~ label 		{
  top:-20px;
  font-size:14px;
  color:#ffffff;
}

/* BOTTOM BARS ================================= */
.bar 	{ position:relative; display:block; width:300px; }
.bar:before, .bar:after 	{
  content:'';
  height:3px; 
  width:0;
  bottom:0px; 
  position:absolute;
  background:linear-gradient(to left, #743ad5, #d53a9d); 
  transition:0.6s ease all; 
  -moz-transition:0.6s ease all; 
  -webkit-transition:0.6s ease all;
}
.bar:before {
  left:0%;
}
.bar:after {
  right:0%; 
}

/* active state */
input:focus ~ .bar:before, input:focus ~ .bar:after {
  width:100%;
}


.red{
  color: rgb(255, 255, 255);
  font-weight: bold;
  text-decoration: none;
  font-family:'Champagne';
}
form{
  text-align:center;
}



#box {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  width: 400px;
  height: 100%;
  color: white;
  font-size: 2.5rem;
  background-image: linear-gradient(	 rgba(56, 56, 56, 0.295),rgba(5, 5, 5, 0.1));
  box-shadow: 0px 0px 10px -1px rgba(0,0,0,0.92);
  border-radius:1%
}

.error{
  font-weight:bold;
  font-size: 20px;
  margin-bottom: 10%;
  font-family:'Champagne'
}

.button {
  text-align: center;
  text-transform: uppercase;
  cursor: pointer;
  font-size: 18px;
  font-family:'Champagne';
  position: relative;
  background-color: #1a1a1a;
  border: none;
  color: rgb(255, 255, 255);
  padding: 10px;
  /*width: 200px;*/
  text-align: center;
  transition-duration: 0.4s;
  overflow: hidden;
 /* box-shadow: 0 5px 15px #1b334b;*/
  border-radius: 4px;
  margin-bottom:15px;
}

.button:hover {
  background: rgb(51, 51, 51);
  box-shadow: 0px 2px 10px 1px rgba(253, 253, 253, 0.774);
  color: rgb(231, 231, 231);
}

.button:after {
  content: "";
  background: #f1f1f1;
  display: block;
  position: absolute;
  padding-top: 300%;
  padding-left: 350%;
  margin-left: -20px !important;
  margin-top: -120%;
  opacity: 0;
  transition: all 0.8s
}

.button:active:after {
  padding: 0;
  margin: 0;
  opacity: 1;
  transition: 0s
}

.button:focus { outline:0; }

</style>
