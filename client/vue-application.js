const Home = window.httpVueLoader('./components/Home.vue')
const SearchProfil = window.httpVueLoader('./components/SearchProfil.vue')
const Register = window.httpVueLoader('./components/Register.vue')
const Login = window.httpVueLoader('./components/Login.vue')
const Profil = window.httpVueLoader('./components/Profil.vue')

const routes = [
  { path: '/', component: Home },
  { path: '/searchprofil', component: SearchProfil },
  { path: '/register', component: Register },
  { path: '/login', component: Login },
  { path: '/profil', component: Profil}
]

const router = new VueRouter({
  routes
})

var app = new Vue({
  router,
  el: '#app',
  data: {
    user:{id: null, connected: null, firstname: '', lastname: ''},
    profil: [],
  },
  async mounted(){
    const res = await axios.get('/api/profils')
    this.profils = res.data
    const connected = await axios.get('/api/me')
    if(connected.data.id != null){
      this.user.id = connected.data.id
      this.user.connected = true
      this.user.firstname = connected.data.firstname
      this.user.lastname = connected.data.lastname
    }
  },
  methods: {
    async addUser (newUser) { // User registers
      const res = await axios.post('/api/register', {firstname: newUser.firstname, lastname: newUser.lastname ,email: newUser.email, password: newUser.password})
      console.log(res)
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
    }
  }
})
