<template>
<div id='portfolio'>
    <div id="like"><button class="button" v-on:click="likeProfil(seep.data.id)">J'aime</button></div>
    <div id='presentation' class="section" v-if="seep.data != null">
            <img class="pp" :src="seep.data.img"/>
            <p><span style="white-space: pre-line">{{seep.data.firstname}}  {{seep.data.lastname}}</span></p>
            <p><span style="white-space: pre-line">{{seep.data.description}}</span></p>
    </div>
      <div id='skills' class="section">
          <h4>Compétences<h4>
          <div v-for="item of seep.data.skills">
            • {{item.name}}
         </div>
     </div>
      <div id='experiences' class="section">
          <h4>Expériences<h4>
          {{seep.data.experience}}
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
            <div class="center">
                <div id="social-test">
                    <ul class="social">
                        <li class="link"><a :href="seep.data.linkedin" target="_blank"><i class="fa fa-linkedin" aria-hidden="true"></a></i></li>
                    </ul>
                </div>
            </div>
      </div>
</template>
 
<script>
module.exports = {
    props:{
        seep: {type: Object},
        user: {type: Object},
    },
    methods: {
      likeProfil(id){
      this.$emit('like-profil', id)
    }
  }
}
</script>
 
<style scoped>
p{
    color: white;
    text-align: center;
    font-size: 3vh;
}

#portfolio{
    position: absolute;
    top:0;
    left:0;
    width: 100%;
    height: 100vh;
}

#portfolio > div{
    width: 100%;
    height: 100vh;
    overflow: hidden;
}
#presentation{
    background-color: transparent;
}

.section{
    width:50%;
    display:flex;
    flex-direction: column;
    justify-content:center;
    align-items:center;
    height:auto;
    font-size:35px;

}
h4{
    font-weight:bold;
    font-family:'Champagne';
    font-size:50px;
}
#skills{
    background-image:url('../src/img/bgd.jpg');
    background-size: cover;
}
#experiences{
    background-image:url('../src/img/bgd2.jpg');
    background-size: cover;
}

.pp{
    display: block;
    margin-top: 5%;
    margin-bottom: 1%;
    border-radius: 50%;
    margin-left: auto;
    margin-right: auto;
    height: 200px;
    width: 200px;
}
#like{
    position: fixed;
    top: 2%;
    left: 5%;
}

.button {
  text-align: center;
  text-transform: uppercase;
  cursor: pointer;
  font-size: 18px;
  font-family:'Champagne';
  position: relative;
  background-color: white;
  border: none;
  color: rgb(102, 102, 102);
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

