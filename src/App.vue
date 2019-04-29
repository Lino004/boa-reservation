<template>
  <div class="app-wrap" id="app">
    <main class="boa-wrap fx fx-fade-in">
      <figure class="boa-bg no-margin" ref="boaBg"></figure>
      <canvas class="boa-canvas" ref="boaCanvas"></canvas>
      <section class="boa-layout">
        <router-view class="boa-layout"/>
      </section>
    </main>
  </div>
</template>

<script>

export default {
  name: 'app',
}
</script>

<style>
@import './assets/css/app.css';
</style>
