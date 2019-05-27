<template>
  <v-content>
    <v-card-title class="pa-0">
      <div v-if="show === 0" class="title">Gestion des Problèmes, Causes, Solutions</div>
      <div v-if="show === 1" class="title">Ajouté un PCS</div>
      <div v-if="show === 2" class="title">Modification du PCS</div>
      <v-spacer></v-spacer>
      <v-btn
        @click="show = 1"
        fab dark small
        color="green darken-2"
        v-if="show === 0"
      >
        <v-icon dark>add</v-icon>
      </v-btn>
      <v-btn
        @click="show = 0"
        fab dark small
        color="green darken-2"
        v-if="show === 1"
      >
        <v-icon dark>list</v-icon>
      </v-btn>
    </v-card-title>
    <div v-if="show === 0">
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
        :items="dataPCS"
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
          <td>{{ props.item.titre }}</td>
          <td class="justify-end layout px-4">
            <v-icon
              color="green darken-2"
              small
              class="mr-2"
              @click="modPCS(props.item)"
            >
              edit
            </v-icon>
            <v-icon
              color="red"
              small
              @click="deletePCS(props.item)"
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
    <AddPCS v-if="show === 1"/>
    <ModPCS :data="currentPCS" v-if="show === 2"/>
  </v-content>
</template>

<script>
import { mapActions } from 'vuex';
import AddPCS from '@/components/dashbord/AddPCS.vue';
import ModPCS from '@/components/dashbord/ModPCS.vue';
import { db } from '@/firebase';

export default {
  name: 'dashPCS',
  components: {
    AddPCS,
    ModPCS,
  },
  data: () => ({
    show: 0,
    height: '',
    headers: [
      {
        text: 'Titre',
        value: 'name',
        sortable: false,
        class: 'subheading',
      },
      {
        text: 'Actions',
        align: 'right',
        sortable: false,
        class: 'subheading',
      },
    ],
    dataPCS: [],
    search: '',
    pagination: {},
    currentPCS: {},
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
    getData() {
      db.ref('pcs/').on('value', (snap) => {
        if (snap.val()) {
          this.dataPCS = Object.values(snap.val());
        } else {
          this.dataPCS = [];
        }
      });
    },
    modPCS(info) {
      this.currentPCS = info;
      this.show = 2;
    },
    deletePCS(info) {
      db.ref('pcs').child(info.key).remove();
    },
  },
  mounted() {
    this.getData();
  },
  destroyed() {
    db.ref('pcs/').off();
  },
};
</script>

<style>

</style>
