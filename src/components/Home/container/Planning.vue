<template>
  <div class="boa-greet margin-auto boa-white">
    <vue-cal
      editable-events 
      style="height: 400px"
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

export default {
  name: 'planning',
  components: { VueCal },
  data () {
    return {
      events: [
        {
          start: '2019-05-01 8:00',
          end: '2019-05-01 9:00',
          title: 'Need to go shopping',
          class: 'leisure',
          background: true
        },
      ]
    }
  }
}
</script>

<style>

</style>
