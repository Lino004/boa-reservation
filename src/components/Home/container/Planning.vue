<template>
  <div class="boa-greet margin-auto boa-white">
    planning
    <vue-cal
      style="height: 400px"
      locale="fr"
      hide-weekends
      default-view="day"
      :disable-views="['years', 'year', 'month']"
      :time-from="8 * 60"
      :time-to="17 * 60"
      :time-step="30"
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
        
      ]
    }
  }
}
</script>

<style>

</style>
