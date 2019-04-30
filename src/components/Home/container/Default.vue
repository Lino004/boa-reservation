<template>
  <section class="boa-greet">
    <div class="fx fx-slide-left push-bottom"><h1>Bienvenue dans notre espace réservation</h1></div>
    <div class="fx fx-slide-left fx-delay-1 push-bottom">
      Grâce à notre nouvelle application web, vous avez la possibilité de réduire votre temps d'attente dans nos banques en
      réservant votre ticket de place à l'avance.
    </div>
    <div class="fx fx-slide-up fx-delay-2 pad-top" @click="$router.push('formulaire')">
      <button class="cta-btn">
        Faire une réservation
      </button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'default',
}
</script>

<style>

</style>
