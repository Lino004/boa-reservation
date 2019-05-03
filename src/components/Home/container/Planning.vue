<template>
  <div class="boa-greet margin-auto boa-white">
    <h5 class="fx fx-slide-left fx-delay-1 text-center margin-b-20 boa-souligne">
      Planning de réservation</h5>
    <vue-cal 
      style="height: 300px"
      locale="fr"
      hide-weekends
      default-view="day"
      :disable-views="['years', 'year', 'month']"
      :time-from="8 * 60"
      :time-to="17 * 60"
      :time-step="15"
      :events="events"></vue-cal>
  </div>
</template>

<script>
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
import { db } from '@/firebase';

export default {
  name: 'planning',
  components: { VueCal },
  data () {
    return {
      events: [],
    }
  },
  methods: {
    initEvents() {
      db.ref('events/').on('value', snap => {
        this.events = Object.values(snap.val());
      });
    },
  },
  mounted () {
    this.initEvents();
  },
  destroyed () {
     db.ref('events/').off();
  }
}
</script>

<style>

</style>
