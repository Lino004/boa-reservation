<template>
  <v-snackbar
    v-model="snackbar.value"
    bottom
    :timeout="10000"
    :color="snackbar.type"
    multi-line
  >
    {{ snackbar.message }}
    <v-btn
      color="white"
      flat
      @click="snackbar.value = false"
    >
      Fermer
    </v-btn>
  </v-snackbar>
</template>

<script>
export default {
  name: 'snackbar',
  props: ['snackbar'],
}
</script>

<style>

</style>
