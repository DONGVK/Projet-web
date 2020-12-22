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
        <div class="error">Voulez-vous vous <router-link class='red' to='/register'>inscrire</router-link> ?</div>

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
* { box-sizing:border-box; }

/* form starting stylings ------------------------------- */

.group 			  { 
  position:relative; 
  margin-bottom:45px; 
}
input 				{
  font-size:18px;
  color:white;
  padding:10px 10px 10px 5px;
  display:block;
  width:300px;
  background-color:rgba(39, 39, 39, 0.733);
  border:none;
  border-bottom:1px solid #757575;
  font-family:'Champagne';
}
input:focus 		{ outline:none; }

/* LABEL ======================================= */
label 				 {
  color:rgb(235, 231, 231); 
  font-size:18px;
  font-weight:normal;
  font-family:'Champagne';
  position:absolute;
  pointer-events:none;
  left:5px;
  top:10px;
  transition:0.2s ease all; 
  -moz-transition:0.2s ease all; 
  -webkit-transition:0.2s ease all;
}

/* active state */
input:focus ~ label, input:valid ~ label 		{
  top:-20px;
  font-size:14px;
  color:#e2e3e5;
  
}

/* BOTTOM BARS ================================= */
.bar 	{ position:relative; display:block; width:300px; }
.bar:before, .bar:after 	{
  content:'';
  height:2px; 
  width:0;
  bottom:1px; 
  position:absolute;
  background:#d4d4d4; 
  transition:0.2s ease all; 
  -moz-transition:0.2s ease all; 
  -webkit-transition:0.2s ease all;
}
.bar:before {
  left:50%;
}
.bar:after {
  right:50%; 
}

/* active state */
input:focus ~ .bar:before, input:focus ~ .bar:after {
  width:50%;
  
}

/* HIGHLIGHTER ================================== */
.highlight {
  position:absolute;
  height:60%; 
  width:100px; 
  top:25%; 
  left:0;
  pointer-events:none;
  opacity:0.5;
  
}

/* active state */
input:focus ~ .highlight {
  -webkit-animation:inputHighlighter 0.3s ease;
  -moz-animation:inputHighlighter 0.3s ease;
  animation:inputHighlighter 0.3s ease;
}

/* ANIMATIONS ================ */
@-webkit-keyframes inputHighlighter {
	from { background:#5264AE; }
  to 	{ width:0; background:transparent; }
}
@-moz-keyframes inputHighlighter {
	from { background:#5264AE; }
  to 	{ width:0; background:transparent; }
}
@keyframes inputHighlighter {
	from { background:#5264AE; }
  to 	{ width:0; background:transparent; }
}
/*form input{
  border:none;
  background-color: rgb(24, 23, 23);
  color: white;
  height: 6vh;
  width: 80%;
}*/

.red{
  color: rgb(255, 255, 255);
  font-weight: bold;
  text-decoration: none;
  font-family:'Champagne';
}
form{
  text-align:center;
}

/*input{
  margin-bottom:10px;
  text-align: center;
  color:white;
  margin-left:auto;
  margin-right:auto;
  background-color:rgb(26,26,26);
  opacity: 0.5;
  border:none;
 border-bottom:1px solid white;
  font-family: "Bebas Neue";
}

input:focus{
  opacity: 1;
}*/

#box {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
 /* background-color: rgba(94, 94, 94, 0.575); */
  margin-left: auto;
  margin-right: auto;
  width: 400px;
  height: 100%;
  color: white;
  font-size: 2.5rem;
  background-image: linear-gradient(	 rgba(56, 56, 56, 1),rgba(5, 5, 5, 0.1));
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
  color: rgb(223, 222, 222);
  padding: 10px;
  /*width: 200px;*/
  text-align: center;
  transition-duration: 0.4s;
  overflow: hidden;
  box-shadow: 0 5px 15px #1b334b;
  border-radius: 4px;
  margin-bottom:15px;
}

.button:hover {
  background: rgb(51, 51, 51);
  box-shadow: 0px 2px 10px 1px #e0e0e0b7;
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
