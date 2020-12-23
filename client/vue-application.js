const Home = window.httpVueLoader('./components/Home.vue')
const SearchProfil = window.httpVueLoader('./components/SearchProfil.vue')
const Register = window.httpVueLoader('./components/Register.vue')
const Login = window.httpVueLoader('./components/Login.vue')

const routes = [
  { path: '/', component: Home },
  { path: '/searchprofil', component: SearchProfil },
  { path: '/register', component: Register },
  { path: '/login', component: Login }
]

const router = new VueRouter({
  routes
})

var app = new Vue({
  router,
  el: '#app',
  data: {
    user:{id: null, connected: null}
  },
  methods: {
    async addUser (newUser) { // User registers
      const res = await axios.post('/api/register', {firstname: newUser.firstname, lastname: newUser.lastname ,email: newUser.email, password: newUser.password})
      console.log(res)
    },
    async connexionUser(user){//User log in
      const res = await axios.post('api/login', {email: user.email, password: user.password})
      console.log(res)
    }
  }
})
