<template>
  <v-layout justify-center row class="white--text">
    <v-flex pa-4 xs12 sm8>
      <v-layout
        py-0
        align-center
        justify-center
        column
        fill-height
      >
        <div
          dark
          :class="fontSizeTitle"
          class="mb-1 mt-3 text-xs-center boa-souligne"
        >
          Consultation
        </div>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import { auth } from '@/firebase';

export default {
  name: 'consultation',
  computed: {
    fontSizeTitle() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 'headline';
        default: return 'display-1';
      }
    },
  },
  data() {
    return {};
  },
  beforeMount() {
    if (!auth.currentUser) this.$router.push('/connexion');
  },
};
</script>

<style>

</style>
