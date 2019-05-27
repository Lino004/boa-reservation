<template>
  <v-app v-if="showApp">
    <v-container d-flex align-center justify-center class="boa-bg" fluid>
      <v-layout boa-wrap boa-layout>
        <v-layout boa-layout-content justify-space-between column id="layoutContent">
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
    <Loading/>
    <Snackbar/>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex';
import { auth, db } from '@/firebase';
import Toolbar from '@/components/Toolbar.vue';
import FooterApp from '@/components/FooterApp.vue';
import Loading from '@/components/Loading.vue';
import Snackbar from '@/components/Snackbar.vue';

export default {
  name: 'App',
  components: {
    Toolbar,
    FooterApp,
    Loading,
    Snackbar,
  },
  data() {
    return {
      showApp: false,
    };
  },
  methods: {
    ...mapActions([
      'updateLoading',
      'updateUser',
    ]),
    initAuth() {
      auth.onAuthStateChanged((user) => {
        this.showApp = false;
        this.updateLoading(true);
        if (user) {
          db.ref(`users/${user.uid}`).once('value').then((snap) => {
            this.updateUser(snap.val());
          });
          this.showApp = true;
          this.updateLoading(false);
        } else {
          this.$router.push('/connexion');
          this.updateUser(null);
          this.showApp = true;
          this.updateLoading(false);
        }
      });
    },
  },
  beforeMount() {
    this.initAuth();
  },
};
</script>

<style>
@import './assets/app.css';
</style>
