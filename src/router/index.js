import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Auth/Login/Login.vue'
import Register from '../views/Auth/Register/Register.vue'
import Overview from '../views/Dashboard/Overview/Overview.vue'
import Inventory from '../views/Dashboard/Inventory/Inventory.vue'
import Planner from '../views/Dashboard/Planner/Planner.vue'
import Transactions from '../views/Dashboard/Transactions/Transactions.vue'
import Settings from '../views/Dashboard/Settings/Settings.vue'
import Success from '../views/Auth/Success.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta :{
      requiresGuest : true
    }
  },
  {
    path: '/account-created',
    name: 'Success',
    component: Success,
  },
  {
    path: '/create-account',
    name: 'Register',
    component: Register,
    meta :{
      requiresGuest : true
    }
  },
  {
    path: '/',
    name: 'Overview',
    component: Overview,
    meta :{
      requiresAuth: true
    }
  },
  {
    path: '/transactions',
    name: 'Transactions',
    component: Transactions,
    meta :{
      requiresAuth: true
    }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    
  },
  {
    path: '/inventory',
    name: 'Inventory',
    component: Inventory
  },
  {
    path: '/planner',
    name: 'Planner',
    component: Planner
  }
 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)){
    if(!localStorage.getItem('token')){
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    }
    else{
      next();
    }

 }
 else   if(to.matched.some(record => record.meta.requiresGuest)){
   if(localStorage.getItem('token')){
     next({
       path: '/',
       query: {
         redirect: to.fullPath
       }
     })
   }
   else{
     next();
   }

}
else{
 next();
}
});


export default router
