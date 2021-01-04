<template>
  <div class="formbox">
    <div class="firstform">
    <form v-on:submit.prevent="addUser()">
        <h2> Inscription </h2>
          <div class="group">
            <input type='text' v-model="newUsers.lastname" required/>
            <span class="highlight"></span>
            <span class="bar"></span>
            <label>Nom</label>
          </div>
          <div class="group">
            <input  type='text' v-model="newUsers.firstname"  required/>
            <span class="highlight"></span>
            <span class="bar"></span>
            <label>Prénom</label>
          </div>
          <div class="group">
            <input  type='text' v-model="newUsers.email"  required/>
            <span class="highlight"></span>
            <span class="bar"></span>
            <label>Adresse mail</label>
          </div>
          <div class="group">
            <input type='password' v-model="newUsers.password"  required/>
            <span class="highlight"></span>
            <span class="bar"></span>
            <label>Mot de passe</label>
          </div>
          <button  class='button' type="submit">Suivant</button>
    </form>
    </div>
    <div class="secondform">
      <form>
        <h2> Informations du Profil <h2>
          <div class="group">
            <span class="highlight"></span>
            <label>Domaine</label>
              <select name="domains">
                <option value="">Votre domaine</option>
                <option value="SE">Software Engineering</option>
                <option value="BIA">Business Intelligence and Analytics</option>
                <option value="DT">Digital Transformation</option>
                <option value="CYB">Cybersécurité</option>
                <option value="NCI">Networks and Cloud Infrastructure</option>
                <option value="BDML">Big Data and Machine Learning</option>
                <option value="ITF">IT for finance</option>
                <option value="BF">Bio Informatique</option>
                <option value="SRD">Systèmes robotiques et drones</option>
                <option value="TI">Transports intelligents</option>
                <option value="IRV">Imagerie et Réalité Virtuelle</option>
                <option value="ES">Energie et Smartgrids</option>
              </select>
          </div>
          <div class="group">
            <div class='competenceitems'>
              <ul class='compétencelist'>
                <h4>Vos compétences<h4>
                  <li  v-for="compétence of compétences" v-bind:key="compétence" >{{compétence}}<button v-on:click="supprimer(compétence)">❌</button></li>
              </ul>
              <input type="text" v-model="compétencetoadd" placeholder="ajouter une compétence" required/>
              <button class='button' v-on:click="ajouter()">Ajouter</button>
            </div>
            <div class='competencemodifier'>
              <select >
                  <option v-for="(compétence,index) of compétences" v-bind:key="compétence" >{{compétence}}</option>
              </select>
              <textarea v-model="remplaceur"> </textarea><button class='button' v-on:click="modifier(remplaceur)">Modifier</button>
            </div>
          </div>
        
          
          <div class="group">
            <h4>Expérience<h4>
            <textarea id="exp" name="experience">
            </textarea>
            <span class="highlight"></span>
            <span class="bar"></span>
           
          </div>
          <button  class='button' type="submit">S'inscrire</button>
  </div>
</template>
 
<script>
module.exports = {
  data () {
    return {
        newUsers: {
          firstname: '',
          lastname: '',
          email: '',
          password: ''
      },
      compétences:['html', 'css'],
      compétencetoadd:'',
      remplaceur:''
    }
  },
  methods: {
      addUser() {
        this.$emit('add-user', this.newUsers)
      },
      ajouter(){
        if(this.compétencetoadd===''){console.log('Veuillez renseigner une compétence valide')}
        else{
        this.compétences.push(this.compétencetoadd)
        }
      },
      modifier(remplaceur){
        var index=this.compétences.findIndex(element=>element===compétence);
        this.compétences(index)=this.remplaceur
      },
      supprimer(compétence){
        var index=this.compétences.findIndex(element=>element ===compétence);//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
        this.compétences.splice(index,1);
      }
  }
}
</script>
 
<style scoped>
.compétencelist{
  font-family:'Champagne';
  font-size:18px;
}
h4{
  font-family:'Champagne';
  font-size:18px;
  text-align:center;
}

/* form starting stylings ------------------------------- */

.group 			  { 
  position:relative; 
  margin-bottom:45px; 
}
input,textarea 				{
  font-size:18px;
  padding:10px 10px 10px 5px;
  display:block;
  width:300px;
  border:none;
  color:white;
  font-family:'Champagne';
  background-color:rgba(71, 71, 71, 0.493);
  border-bottom:1px solid #757575;
  box-shadow: 0px 0px 10px -1px rgba(0,0,0,0.92);
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
  background:linear-gradient(to left, #e7e7e7, #999999); 
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
form{
  text-align:center;
  padding-top:0px;
  padding-bottom:80px;
}


  @import url('https://fonts.googleapis.com/css?family=Raleway:200');
.formbox {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  margin-left: auto;
  margin-right: auto;
  width: 80%;
  height: 100%;
  color: white;
  font-size: 2.5rem;
  background-image: linear-gradient(rgba(56, 56, 56, 0.295),rgba(5, 5, 5, 1));
  box-shadow: 0px 0px 10px -1px rgba(0,0,0,0.92);
  border-radius:1%


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
  text-align: center;
  transition-duration: 0.4s;
  overflow: hidden;
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

