<template>
  <v-toolbar height="48" dark color="rgba(30, 31, 48, .2)" class="border-rt">
    <v-toolbar-title class="headline text-uppercase">
      <img class="logo" src="@/assets/logo.png" alt="Acceuil" height="30" srcset="">
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-xs-only" v-if="getUser">
      <v-tooltip color="green" bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            small
            to="/home"
            flat
            v-on="on"
          >
            <v-icon>home</v-icon>
          </v-btn>
        </template>
        <span>Acceuil</span>
      </v-tooltip>

      <v-tooltip color="green" bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            small
            to="/consultation"
            flat
            v-on="on"
          >
            <v-icon>search</v-icon>
          </v-btn>
        </template>
        <span>Recherche</span>
      </v-tooltip>

      <v-tooltip color="green" bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            small
            to="/dashboard"
            flat
            v-on="on"
            v-if="getUser.profile === 'admin' ||
              getUser.profile === 'superAdmin'"
          >
            <v-icon>list</v-icon>
          </v-btn>
        </template>
        <span>Tableau de bord</span>
      </v-tooltip>

      <v-tooltip color="green" bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            small
            @click="deconnected()"
            flat
            v-on="on"
          >
            <v-icon>lock</v-icon>
          </v-btn>
        </template>
        <span>Déconnection</span>
      </v-tooltip>

    </v-toolbar-items>

    <v-menu v-if="getUser">

      <template v-slot:activator="{ on }">
        <v-toolbar-side-icon class="hidden-sm-and-up" v-on="on"></v-toolbar-side-icon>
      </template>

      <v-list dark>

        <v-list-tile>
          <v-list-tile-title>
            <router-link to="/home">Acceuil</router-link>
          </v-list-tile-title>
        </v-list-tile>

        <v-list-tile>
          <v-list-tile-title>
            <router-link to="/consultation">Consultation</router-link>
          </v-list-tile-title>
        </v-list-tile>

        <v-list-tile
          v-if="getUser.profile === 'admin' ||
                getUser.profile === 'superAdmin'"
        >
          <v-list-tile-title>
            <router-link to="/dashboard">Tableau de bord</router-link>
          </v-list-tile-title>
        </v-list-tile>

        <v-list-tile>
          <v-list-tile-title @click="deconnected()">
            Déconnexion
          </v-list-tile-title>
        </v-list-tile>

      </v-list>
    </v-menu>
  </v-toolbar>
</template>

<script>
import { mapGetters } from 'vuex';
import { auth } from '@/firebase';

export default {
  name: 'toolbar',
  data: () => ({
    connected: false,
  }),
  computed: {
    ...mapGetters([
      'getUser',
    ]),
  },
  methods: {
    deconnected() {
      auth.signOut();
    },
  },
};
</script>

<style>

</style>
