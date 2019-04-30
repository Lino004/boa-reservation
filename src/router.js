import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import Default from './components/Home/container/Default'
import Formulaire from './components/Home/container/Formulaire'
import Planning from './components/Home/container/Planning'
import Dashboard from './views/Dashboard'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect: '/default',
      children: [
        {
          path: '/default',
          name: 'default',
          component: Default,
        },
        {
          path: '/formulaire',
          name: 'formulaire',
          component: Formulaire,
        },
        {
          path: '/planning',
          name: 'planning',
          component: Planning,
        },
      ],
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
    },
    {
      path: '*',
      redirect: '/',
    }
  ]
})
