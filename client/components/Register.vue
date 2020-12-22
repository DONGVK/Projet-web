<template>
  <div class="gradient-border" id="box">
    <form v-on:submit.prevent="addUser()">
        <h2> Inscription </h2>
        <div class="group">
          <input type='text' v-model="connexionUser.lastname"  required/>
          <span class="highlight"></span>
          <span class="bar"></span>
          <label>Nom</label>
        </div>
        <div class="group">
          <input type='text' v-model="connexionUser.firstname"  required/>
          <span class="highlight"></span>
          <span class="bar"></span>
          <label>Prénom</label>
        </div>
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
  background-image:#d4d4d4; 
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

