<template>
  <v-layout align-center justify-center column class="white--text">
    <div dark :class="fontSizeTitle" class="mb-1 text-xs-center boa-souligne">
      Planning de réservation
    </div>
    <vue-cal
      style="width: 80%; height: 300px"
      locale="fr"
      hide-weekends
      default-view="day"
      :disable-views="['years', 'year', 'month']"
      :time-from="8 * 60"
      :time-to="17 * 60"
      :time-step="15"
      :events="events"
    ></vue-cal>
  </v-layout>
</template>

<script>
import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';
import { db } from '@/firebase';
import moment from 'moment';

export default {
  name: 'horaires',
  components: { VueCal },
  data() {
    return {
      events: [],
    };
  },
  computed: {
    fontSizeTitle() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 'headline';
        default: return 'display-1';
      }
    },
  },
  methods: {
    initEvents() {
      db.ref('events/').on('value', (snap) => {
        if (snap.val()) {
          this.events = Object.values(snap.val());
          this.verifHour();
        }
      });
    },
    verifHour() {
      const a = moment().locale('fr');
      this.events.forEach((el) => {
        const b = moment(el.end, 'YYYY-MM-DD hh:mm');
        if (b.diff(a) < 0) {
          db.ref('events/').child(el.id).update({
            title: 'Place Annulée',
            class: 'event-pass',
          });
        }
      });
    },
  },
  mounted() {
    this.initEvents();
  },
  destroyed() {
    db.ref('events/').off();
  },
};
</script>

<style>
.vuecal__flex .vuecal__menu {
  display: none;
}
.vuecal__event.lunch {
  background: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 10px,
    #f2f2f2 10px,
    #f2f2f2 20px
  );/* IE 10+ */
  color: #999;
  display: flex;
  justify-content: center;
  align-items: center;
}
.vuecal__event.lunch .vuecal__event-time {
  display: none;align-items: center;
}
.vuecal{
  background-color: rgba(0, 0, 0, 0.5)
}
.vuecal__title{
  color: #008544;
}
.vuecal__event-time, .vuecal__event-title{
  color: white;
  font-size: 15px;
}
.event-now{
  background-color: rgba(0, 133, 64, 0.5) !important;
}
.event-pass{
  background: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 10px,
    rgba(0, 133, 64, 0.5) 10px,
    rgba(0, 133, 64, 0.5) 20px);
}
</style>
