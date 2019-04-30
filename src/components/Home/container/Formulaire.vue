<template>
  <section class="boa-greet margin-auto boa-from">
    <h5 class="fx fx-slide-left fx-delay-1 text-center margin-b-20">Fiche de réservation</h5>
    <div class="form-input fx fx-slide-up fx-delay-1 push-bottom">
      <label for="select"> Type de pièce :&nbsp;&nbsp;
        <select class="boa-green" v-model="form.carte">
          <option>Choisissez</option>
          <option>Carte d'identité</option>
          <option>Passeport</option>
        </select>&nbsp;
        <i class="fa fa-angle-down boa-green"></i>
      </label>
    </div>
    <div class="form-input fx fx-slide-up fx-delay-1 push-bottom">
      <label for="numPiece"> N° de la pièce : </label>
      <input
        type="text"
        id="numPiece"
        placeholder="Entrez le numéro de la pièce"
        class="boa-green"
        v-model="form.num">
    </div>
    <div class="form-input fx fx-slide-up fx-delay-1 push-bottom">
      <label for="nom"> Nom : </label>
      <input
        type="text"
        id="nom"
        placeholder="Entrez votre nom"
        class="boa-green"
        v-model="form.nom">
    </div>
    <div class="form-input fx fx-slide-up fx-delay-1 push-bottom">
      <label for="prenom">Prénom : </label>
      <input
        type="text"
        id="prenom"
        placeholder="Entrez votre prénom"
        class="boa-green"
        v-model="form.prenom">
    </div>
    <div class="flex-row flex-space">
      <div class="fx fx-slide-up fx-delay-2 boa-error">
        <p v-if="errorMess">ERREUR: CHAMP INVALIDE</p>
      </div>
      <div class="fx fx-slide-up fx-delay-2" @click="continuer()">
        <button class="cta-btn">
          Continuer
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'formulaire',
  data () {
    return {
      form: {
        carte: 'Choisissez',
        num: '',
        nom: '',
        prenom: '',
      },
      errorMess: false,
    };
  },
  methods: {
    ...mapActions([
      'updateFrom'
    ]),
    isValid() {
      if ((this.form.carte !== 'Choisissez') && this.form.num && this.form.nom && this.form.prenom) {
        return true;
      }
      return false;
    },
    messError(){
      this.errorMess = false;
    },
    continuer() {
      if (this.isValid()) {
        this.updateFrom(this.form);
        this.$router.push('planning');
      } else {
        this.errorMess = true;
        setTimeout(this.messError, 5000)
      }
    }
  }
}
</script>

<style>

</style>
