import Vue from 'vue'
import VueRouter from 'vue-router'
import Montage from '../views/Montage.vue'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/montage',
    name: 'Montage',
    component: Montage
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/profile',
    name: 'profile',
    // lazy-loaded
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/montage',
    name: 'montage',
    // lazy-loaded
    component: () => import('../views/Montage.vue')
  },
  {
    path: '/verify',
    name: 'Verified',
    component: () => import('../views/Verified.vue')
  },
  {
    path: '/passwordreset',
    name: 'passwordReset',
    component: () => import('../views/PasswordReset.vue')
  },
  {
    path: '/newpassword',
    name: 'Newpassword',
    component: () => import('../views/NewPassword.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register', '/', '/verify', '/passwordreset', '/newpassword'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});