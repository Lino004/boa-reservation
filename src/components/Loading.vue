<template>
  <v-dialog
      v-model="getLoading"
      persistent
      width="300"
    >
      <v-card
        color="#008544"
        dark
      >
        <v-card-text>
          Veillez patienter
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'loading',
  data: () => ({}),
  computed: {
    ...mapGetters([
      'getLoading',
    ]),
  },
};
</script>

<style>

</style>
