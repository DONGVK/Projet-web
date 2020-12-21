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
    articles: [],
    panier: {
      createdAt: null,
      updatedAt: null,
      articles: []
    },
    user:{id: null, connected: null}
  }
})
