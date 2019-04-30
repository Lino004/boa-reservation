<template>
  <header class="boa-header flex-row flex-middle flex-stretch">
    <div class="text-clip flex-1" @click="$router.push('/')">
      <img src="@/assets/img/logo.png" alt="Acceuil" height="30" srcset="">
    </div>
    <div class="text-nowrap common-btn"></div>
  </header>
</template>

<script>
export default {
  name: 'entete',
}
</script>

<style>

</style>
