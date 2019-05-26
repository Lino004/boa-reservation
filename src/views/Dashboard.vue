<template>
  <v-layout :class="classColumnRow" class="white--text">
    <v-flex class="boa-dash-bg" mx-3 xs1>
      <v-layout align-center justify-center :class="classRowColumn" fill-height>
        <div>
          <v-btn
            :color="menuDash === 0 ? 'green darken-4' : 'green darken-2'"
            :small="menuDash != 0"
            fab dark
            @click="menuDash = 0"
          >
            <v-icon>list</v-icon>
          </v-btn>
        </div>
        <div>
          <v-btn
            :color="menuDash === 1 ? 'green darken-4' : 'green darken-2'"
            :small="menuDash != 1"
            fab dark
            @click="menuDash = 1"
          >
            <v-icon>account_circle</v-icon>
          </v-btn>
        </div>
      </v-layout>
    </v-flex>
    <v-flex data-simplebar xs12 sm10 :style="`height: ${heightDetect}px;`" class="scroll-y">
      <v-container pa-3>
        <v-card-title class="pa-0">
          <p class="headline font-weight-bold">Tableau de bord</p>
        </v-card-title>
        <DashPCS v-if="menuDash === 0"/>
        <DashUser v-if="menuDash === 1"/>
      </v-container>
    </v-flex>
    <ModalAddPCS :dialog="addPCSdialog"/>
  </v-layout>
</template>

<script>
import { auth } from '@/firebase';
import DashPCS from '@/components/dashbord/DashPCS.vue';
import DashUser from '@/components/dashbord/DashUser.vue';
import ModalAddPCS from '@/components/dashbord/ModalAddPCS.vue';

export default {
  name: 'dashboad',
  components: {
    DashPCS,
    DashUser,
    ModalAddPCS,
  },
  computed: {
    fontSizeTitle() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 'headline';
        default: return 'display-1';
      }
    },
    classColumnRow() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 'column';
        default: return 'row';
      }
    },
    classRowColumn() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 'row';
        default: return 'column';
      }
    },
    heightDetect() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return this.height - 150;
        default: return this.height - 82;
      }
    },
  },
  data() {
    return {
      menuDash: 0,
      height: '',
      addPCSdialog: false,
    };
  },
  beforeMount() {
    if (!auth.currentUser) this.$router.push('/connexion');
  },
  mounted() {
    const style = window.getComputedStyle(document.getElementById('layoutContent'), null);
    this.height = parseInt(style.getPropertyValue('height'), 10);
  },
};
</script>

<style>

</style>
