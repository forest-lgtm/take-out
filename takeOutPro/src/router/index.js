import Vue from 'vue'
import Router from 'vue-router'
import Home from "../components/Home.vue"
import Serch from "../components/Serch.vue"
import Login from "../components/Login.vue"
import Register from "../components/Register.vue"
import Order from "../components/Order.vue"
import User from "../components/User.vue"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/serch',
      name: 'serch',
      component: Serch
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/order',
      name: 'order',
      component: Order
    },
    {
      path: '/user',
      name: 'user',
      component: User
    },
  ]
  
})
