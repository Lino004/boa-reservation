import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Horaires from './views/Horaires.vue';
import Reservation from './views/Reservation.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/horaires',
      name: 'horaires',
      component: Horaires,
    },
    {
      path: '/reservation',
      name: 'reservation',
      component: Reservation,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
