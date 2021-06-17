import Vue from 'vue'
import Router from 'vue-router'
import Home from "../components/Home.vue"
import Serch from "../components/Serch.vue"
import Login from "../components/Login.vue"
import Register from "../components/Register.vue"
import Order from "../components/Order.vue"
import User from "../components/User.vue"
import Shops from "../components/detail/Shops.vue"
import Evaluate from "../components/detail/Evaluate.vue"
import Merchant from "../components/detail/Merchant.vue"
import Orders from "../components/detail/Orders.vue"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/serch',
      props:true,
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
    {
      path: '/shops/:id',
      name: 'shops',
      props:true,
      component: Shops
    },
    {
      path: '/evaluate',
      name: 'evaluate',
      component: Evaluate
    },
    {
      path: '/merchant',
      name: 'merchant',
      component: Merchant
    },
    {
      path: '/orders',
      name: 'orders',
      component: Orders
    },
  ]
  
})
