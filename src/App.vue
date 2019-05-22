<template>
  <v-app>
    <v-container d-flex align-center justify-center class="boa-bg" fluid>
      <v-layout boa-wrap boa-layout>
        <v-layout boa-layout-content justify-space-between column>
          <Toolbar/>
          <div>
            <transition
              mode="out-in"
              name="custom-classes-transition"
              enter-active-class="animated pulse"
              leave-active-class="animated bounceOutRight"
            >
              <router-view/>
            </transition>
          </div>
          <FooterApp/>
        </v-layout>
      </v-layout>
    </v-container>
    <Loading :dialog="true"/>
  </v-app>
</template>

<script>
import { auth } from '@/firebase';
import Toolbar from '@/components/Toolbar.vue';
import FooterApp from '@/components/FooterApp.vue';
import Loading from '@/components/Loading.vue';

export default {
  name: 'App',
  components: {
    Toolbar,
    FooterApp,
    Loading
  },
  data() {
    return {
      //
    };
  },
  methods: {
    getCurrentUser() {
      auth.onAuthStateChanged((user) => {
        if (user) {
          console.log('user connect is : ', user);
        } else {
          console.log('user is not connected');
        }
      });
    },
  },
  mounted() {
    this.getCurrentUser();
  },
};
</script>

<style>
@import './assets/app.css';
</style>
