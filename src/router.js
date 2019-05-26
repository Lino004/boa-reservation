import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Consultation from './views/Consultation.vue';
import Dashboard from './views/Dashboard.vue';
import Connexion from './views/Connexion.vue';
import Inscription from './views/Inscription.vue';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/connexion',
    },
    {
      path: '/',
      redirect: '/connexion',
    },
    {
      path: '/connexion',
      name: 'connexion',
      component: Connexion,
    },
    {
      path: '/inscription',
      name: 'Inscription',
      component: Inscription,
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
    },
    {
      path: '/consultation',
      name: 'consultation',
      component: Consultation,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
    },
  ],
});

export default router;
