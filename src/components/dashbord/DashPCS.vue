<template>
  <v-content>
    <v-card-title class="pa-0">
      <div class="title">Gestion des Problèmes, Causes, Solutions</div>
    </v-card-title>
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
      <div class="xs6">
        <v-btn @click="$parent.addPCSdialog = true" fab dark small color="green darken-2">
          <v-icon dark>add</v-icon>
        </v-btn>
      </div>
    </v-layout>
    <v-data-table
      :headers="headers"
      :items="desserts"
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
        <td>{{ props.item.name }}</td>
        <td class="justify-center layout px-0">
          <v-icon
            small
            class="mr-2"
            @click="editItem(props.item)"
          >
            edit
          </v-icon>
          <v-icon
            small
            @click="deleteItem(props.item)"
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
  </v-content>
</template>

<script>
export default {
  name: 'dashPCS',
  data: () => ({
    height: '',
    headers: [
      { text: 'Titre', value: 'name' },
      { text: 'Actions', value: 'calories', align: 'center' },
    ],
    desserts: [
      { name: 'Frozen Yogurt' },
      { name: 'Frozen Yogurt' },
      { name: 'Frozen Yogurt' },
      { name: 'Frozen Yogurt' },
      { name: 'Frozen Yogurt' },
      { name: 'Frozen Yogurt' },
      { name: 'Frozen Yogurt' },
    ],
    search: '',
    pagination: {},
  }),
  computed: {
    pages() {
      if (this.pagination.rowsPerPage == null || this.pagination.totalItems == null) return 0;
      return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage);
    },
  },
};
</script>

<style>

</style>
