import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import store from './store'
import {USER_REQUEST} from "./store/actions/user";

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/pages/Login.vue')
    },
    {
      path: '/registration',
      name: 'registration',
      component: () => import('./views/pages/Registration.vue')
    },
    {
      path: '/cabinet',
      name: 'cabinet',
      redirect: '/cabinet/dashboard',
      component: () => import('./containers/Cabinet.vue'),
      meta: {requiresAuth: true},
      children: [
        {
          path: '/cabinet/dashboard',
          name: 'dashboard',
          component: () => import('./views/Dashboard.vue')
        },
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isAuthenticated) {
      store.dispatch(USER_REQUEST);
      next()
      return
    }
    
    next('/login')
  } else if (to.matched.some(record => record.meta.withoutAuth)) {
    if (store.getters.isAuthenticated) {
      next('/cabinet')
      return
    }
    next()
  }else {
    next()
  }
})

export default router;
