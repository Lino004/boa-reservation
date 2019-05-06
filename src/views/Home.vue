<template>
  <v-layout class="white--text">
    <v-flex pa-4 xs12 sm8>
      <div dark :class="fontSizeH1">Bienvenue dans notre espace réservation</div>
      <div dark class="body-1 py-2">
        Grâce à notre nouvelle application web, vous avez la possibilité de réduire
        votre temps d'attente dans nos banques en réservant votre ticket de place
        de la journée à l'avance.
      </div>
      <v-btn
        to="reservation"
        round
        color="#008544"
        class="ma-0 white--text"
      >Faire une réservation</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>

export default {
  name: 'home',
  computed: {
    fontSizeH1() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 'display-1';
        default: return 'display-2';
      }
    },
  },
};
</script>
