<template>
  <v-dialog v-model="dialog" persistent max-width="350">
    <v-card>
      <v-card-title class="headline">Ajouter un PCS</v-card-title>
      <v-card-text class="px-3 py-0">
        <!--
        <v-text-field
           color="green darken-2"
           label="Titre du PCS"
        ></v-text-field>
        <v-textarea
          name="input-7-1"
          color="green darken-2"
          label="Description du problème"
        ></v-textarea>
        -->
        <vue-editor v-model="content"></vue-editor>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" flat @click="$parent.addPCSdialog = false">Disagree</v-btn>
        <v-btn color="green darken-1" flat @click="dialog = false">Agree</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { VueEditor } from "vue2-editor";

export default {
  name: 'modalAddPCS',
  components: {
    VueEditor,
  },
  props: ['dialog'],
  data: () => ({
    content: "<h1>Some initial content</h1>",
  }),
};
</script>

<style>

</style>
