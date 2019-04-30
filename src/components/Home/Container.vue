<template>
  <main class="boa-content flex-row">
    <transition
      :duration="800"
      name="custom-classes-transition"
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
      mode="out-in">
      <div v-if="!($router.history.current.name === 'default')">
        <button class="cta-btn btn-rtr" @click="$router.go( -1 )">
          <i class="fa fa-angle-left"></i>
        </button>
      </div>
    </transition>
    <transition
      :duration="800"
      name="custom-classes-transition"
      enter-active-class="animated fadeInLeft"
      leave-active-class="animated fadeOut"
      mode="out-in">
      <router-view/>
    </transition>
  </main>
</template>

<script>
export default {
  name: 'container',
}
</script>

<style>

</style>
