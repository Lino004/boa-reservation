<template>
  <div class="boa-greet margin-auto boa-white">
    {{events}}
  </div>
</template>

<script>
import { db } from '@/firebase';

export default {
  name: 'test',
  data () {
    return {
      events: null
    }
  },
  methods: {},
  mounted () {
    db.ref('events/').on('value', snap => {
      //this.events.push(...snap.val());
      this.events = snap.val();
    });
  }
}
</script>

<style>

</style>
