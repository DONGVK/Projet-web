const Home = window.httpVueLoader('./components/Home.vue')
const SearchProfil = window.httpVueLoader('./components/SearchProfil.vue')
const Register = window.httpVueLoader('./components/Register.vue')
const Login = window.httpVueLoader('./components/Login.vue')
const Profil = window.httpVueLoader('./components/Profil.vue')
const SeeProfil = window.httpVueLoader('./components/SeeProfil.vue')
const Like = window.httpVueLoader('./components/Like.vue')

const routes = [
  { path: '/', component: Home },
  { path: '/searchprofil', component: SearchProfil },
  { path: '/register', component: Register },
  { path: '/login', component: Login },
  { path: '/profil', component: Profil},
  { path: '/seeprofil', component: SeeProfil },
  { path: '/like', component: Like }
]

const router = new VueRouter({
  routes
})

var app = new Vue({
  router,
  el: '#app',
  data: {
    user:{id: null, connected: null, firstname: '', lastname: ''},
    profils: [],
    profil: [],
    seep: null,
    like: []
  },
  async mounted(){
    const seepro = await axios.get('/api/seeprofil')
    this.seep = seepro
    const ilikeit = await axios.get('api/like')
    this.like = ilikeit.data
    const res = await axios.get('/api/profils')
    this.profils = res.data
    const connected = await axios.get('/api/me')
    if(connected.data.id != null){
      this.user.id = connected.data.id
      this.user.connected = true
      this.user.firstname = connected.data.firstname
      this.user.lastname = connected.data.lastname
    }
    try{
      const pro = await axios.get('/api/profil/' + this.user.id)
      this.profil = pro.data
    }catch(error){
      console.log('no profil yet')
    }
  },
  methods: {
    async addUser (newUser, addProfil) { // User registers
      const res = await axios.post('/api/register', {firstname: newUser.firstname, lastname: newUser.lastname ,email: newUser.email, password: newUser.password})
      const addpro = await axios.post('/api/profils', {firstname: addProfil.firstname, lastname: addProfil.lastname ,domain: addProfil.domain, competences: addProfil.competences, linkedin: addProfil.linkedin})
      
      this.profils.push({
        id: this.profils[this.profils.length - 1] + 1,
        firstname: addProfil.firstname, 
        lastname: addProfil.lastname ,
        domain: addProfil.domain, 
        competences: addProfil.competences, 
        linkedin: addProfil.linkedin
      })
      console.log(res)
      console.log(addpro)
    },
    async connexionUser(user){//User log in
      try{
        const res = await axios.post('/api/login', {email: user.email, password: user.password})
        this.user ={id: res.data.id, connected: true, firstname: res.data.first_name, lastname: res.data.last_name}
        this.$router.push({ path: '/profil' })
      }catch (error){
        console.log(error)
        this.user.connected = false
      }
    },
    async disconnectionUser(){
      try{
        const res = await axios.get('api/logout')
        console.log(res)
        this.user = {id: null, connected: null, firstname: '', lastname: ''}
        this.$router.push('/')
      }catch(error){
        console.log(error)
      }
    },
    async seeProfil(id){
      const res = await axios.get('api/profil/'+id)
      this.seep = res
      this.$router.push('/seeprofil')
    },
    async likeProfil(id){
      await axios.post('api/like', {id: id})
      this.like.push(id)
      console.log("L'id est : " + id)
    }
  }
})
