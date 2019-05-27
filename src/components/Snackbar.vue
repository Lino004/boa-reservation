<template>
  <v-snackbar
    :value.sync="getSnackbar.value"
    bottom
    :timeout="10000"
    :color="getSnackbar.type"
    multi-line
  >
    {{ getSnackbar.message }}
    <v-btn
      color="white"
      flat
      @click="getSnackbar.value = false"
    >
      Fermer
    </v-btn>
  </v-snackbar>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'snackbar',
  computed: {
    ...mapGetters([
      'getSnackbar',
    ]),
  },
};
</script>

<style>

</style>
