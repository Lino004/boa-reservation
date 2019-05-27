<template>
  <v-layout
    column
    fill-height
    :style="`height: ${heightDetect}px;`"
    class="white--text scroll-y"
    xs12>
    <v-layout :class="marge" column v-if="!showPCS">
      <div dark :class="fontSizeTitle" class="my-3">
        Consultation
      </div>
      <div class="pb-3">
        <v-flex xs12 sm4>
          <v-text-field
            dark
            color="white"
            class="white--text"
            v-model="search"
            prepend-inner-icon="search"
            single-line
            hide-details
          ></v-text-field>
        </v-flex>
      </div>
      <v-layout align-start row fill-heigh wrap>
        <v-flex v-for="(item, index) in dataPCSfilter" :key="index" xs12 sm4 pa-2>
          <v-hover>
            <v-card
              slot-scope="{ hover }"
              :class="`elevation-${hover ? 12 : 2}`"
              class="transparent"
            >
              <v-img
                :aspect-ratio="16/9"
                :src="url(item.imgUrl)"
              >
                <v-expand-transition>
                  <div
                    v-if="hover"
                    class="d-flex
                      transition-fast-in-fast-out
                      black darken-2
                      v-card--reveal display-3 white--text"
                    style="height: 100%; cursor: pointer"
                    @click="pcsShow(item)"
                  >
                    Voir plus
                  </div>
                </v-expand-transition>
              </v-img>
              <v-card-title class="boa-dash-bg">
                <div class="title text-truncate white--text"> {{item.titre}} </div>
              </v-card-title>
            </v-card>
          </v-hover>
        </v-flex>
      </v-layout>
    </v-layout>
    <v-layout class="boa-dash-bg" :class="marge" column v-else>
      <v-btn
        absolute
        small
        style="right: 130px"
        class="mt-3"
        fab dark
        color="green darken-2"
        @click="showPCS = false">
        <v-icon dark>chevron_left</v-icon>
      </v-btn>
      <v-flex class="text-xs-center display-1 ma-3 font-weight-bold">
        Titre : {{currentPCS.titre}}
      </v-flex>
      <v-flex>
        <v-img height="250" :src="url(currentPCS.imgUrl)"></v-img>
      </v-flex>
      <v-flex ma-4>
        <div v-html="currentPCS.content"></div>
      </v-flex>
      <v-flex class="text-xs-right ma-4 font-weight-bold font-italic">
        <div>Auteur:</div>
        <div>{{ currentPCS.autor }}</div>
        <div> le {{ currentPCS.date }}</div>
      </v-flex>
    </v-layout>
  </v-layout>
</template>

<script>
import { auth, db } from '@/firebase';

export default {
  name: 'consultation',
  data() {
    return {
      height: 0,
      dataPCS: [],
      search: '',
      pagination: {},
      currentPCS: {},
      showPCS: false,
    };
  },
  computed: {
    fontSizeTitle() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 'headline';
        default: return 'display-1';
      }
    },
    heightDetect() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return this.height - 150;
        default: return this.height - 82;
      }
    },
    marge() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 'ma-3';
        default: return 'ma-5';
      }
    },
    dataPCSfilter() {
      const result = this.dataPCS;
      if (!this.search) return result;
      const filterValue = this.search.toLowerCase();
      const filter = el => el.titre.toLowerCase().includes(filterValue)
                           || el.content.toLowerCase().includes(filterValue);
      return result.filter(filter);
    },
  },
  methods: {
    getData() {
      db.ref('pcs/').on('value', (snap) => {
        if (snap.val()) {
          this.dataPCS = Object.values(snap.val());
        } else {
          this.dataPCS = [];
        }
      });
    },
    url(e) {
      if (e) return e;
      return require('@/assets/default.png'); // eslint-disable-line global-require
    },
    pcsShow(pcs) {
      this.currentPCS = pcs;
      this.showPCS = true;
    },
  },
  beforeMount() {
    if (!auth.currentUser) this.$router.push('/connexion');
  },
  mounted() {
    const style = window.getComputedStyle(document.getElementById('layoutContent'), null);
    this.height = parseInt(style.getPropertyValue('height'), 10);
    this.getData();
  },
  destroyed() {
    db.ref('pcs/').off();
  },
};
</script>

<style>

</style>
