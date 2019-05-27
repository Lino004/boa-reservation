<template>
  <v-content>
    <v-card-title class="pa-0">
      <div class="title">Gestion des utilisateurs</div>
      <v-spacer></v-spacer>
      <v-btn
        fab dark small
        color="green darken-2"
      >
        <v-icon dark>add</v-icon>
      </v-btn>
    </v-card-title>
    <div>
      <v-layout justify-space-between pb-3>
        <v-flex xs6>
          <v-text-field
            dark
            color="white"
            class="white--text"
            v-model="search"
            append-icon="search"
            label="Recherche"
            single-line
            hide-details
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-data-table
        :headers="headers"
        :items="dataUser"
        :search="search"
        hide-actions
        :pagination.sync="pagination"
      >
        <template v-slot:no-data>
          <v-alert :value="true" color="error" icon="warning">
            Désolé aucune donnée disponible :(
          </v-alert>
        </template>
        <template v-slot:items="props">
          <td>{{ props.item.nom }}</td>
          <td>{{ props.item.prenom }}</td>
          <td>{{ getProfile(props.item.profile) }}</td>
          <td class="justify-end layout px-4">
            <v-icon
              color="green darken-2"
              small
              class="mr-2"
              @click="modUser(props.item)"
            >
              edit
            </v-icon>
            <v-icon
              color="red"
              small
              @click="deleteUser(props.item)"
            >
              delete
            </v-icon>
          </td>
        </template>
        <template v-slot:no-results>
          <v-alert :value="true" color="error" icon="warning">
            Aucun résultat pour "{{ search }}".
          </v-alert>
        </template>
      </v-data-table>
      <div class="text-xs-center pt-2">
        <v-pagination
          color="green darken-2"
          v-model="pagination.page"
          :length="pages"></v-pagination>
      </div>
    </div>
  </v-content>
</template>

<script>
import { mapActions } from 'vuex';
import { db } from '@/firebase';

export default {
  name: 'dashUser',
  data: () => ({
    search: '',
    headers: [
      {
        text: 'Nom(s)',
        value: 'nom',
        class: 'subheading',
      },
      {
        text: 'Prenom(s)',
        value: 'prenom',
        class: 'subheading',
      },
      {
        text: 'Profile',
        value: 'profile',
        class: 'subheading',
      },
      {
        text: 'Actions',
        align: 'right',
        sortable: false,
        class: 'subheading',
      },
    ],
    dataUser: [],
    pagination: {},
  }),
  computed: {
    pages() {
      if (this.pagination.rowsPerPage == null || this.pagination.totalItems == null) return 0;
      return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage);
    },
  },
  methods: {
    ...mapActions([
      'updateSnackbar',
    ]),
    getProfile(profile) {
      if (profile === 'superAdmin') return 'Super Administrateur';
      if (profile === 'admin') return 'Administrateur';
      if (profile === 'user') return 'Utilisateur';
      return 'Inconnu';
    },
    getData() {
      db.ref('users/').on('value', (snap) => {
        if (snap.val()) {
          this.dataUser = Object.values(snap.val());
        } else {
          this.dataUser = [];
        }
      });
    },
  },
  mounted() {
    this.getData();
  },
  destroyed() {
    db.ref('users/').off();
  },
};
</script>

<style>

</style>
