<template>
  <section class="boa-greet margin-auto">
    <div class="boa-form" v-if="!ficheValid">
      <h5 class="fx fx-slide-left fx-delay-1 text-center margin-b-20">Fiche de réservation</h5>
      
      <div class="form-input fx fx-slide-up fx-delay-1 push-bottom">
        <label style="width: 130px" for="select"> Type de pièce :</label>&nbsp;&nbsp;
        <select class="boa-green" v-model="form.carte">
          <option>Choisissez</option>
          <option>Carte d'identité</option>
          <option>Passeport</option>
        </select>&nbsp;
        <i class="fa fa-angle-down boa-green"></i>
      </div>
      
      <div class="form-input fx fx-slide-up fx-delay-1 push-bottom">
        <label style="width: 130px" for="numPiece"> N° de la pièce : </label>
        <input
          type="text"
          id="numPiece"
          placeholder="Entrez le numéro de la pièce"
          class="boa-green"
          v-model="form.num">
      </div>
      
      <div class="form-input fx fx-slide-up fx-delay-1 push-bottom">
        <label style="width: 130px" for="nom"> Nom : </label>
        <input
          type="text"
          id="nom"
          placeholder="Entrez votre nom"
          class="boa-green"
          v-model="form.nom">
      </div>
      
      <div class="form-input fx fx-slide-up fx-delay-1 push-bottom">
        <label style="width: 130px" for="prenom">Prénom : </label>
        <input
          type="text"
          id="prenom"
          placeholder="Entrez votre prénom"
          class="boa-green"
          v-model="form.prenom">
      </div>
      
      <v-dialog
        v-model="dialog"
        width="500"
        :dark="true"
        class="text-center">
        <template v-slot:activator="{ on }">
          <div class="form-input fx fx-slide-up fx-delay-1 push-bottom">
            <label style="width: 130px" for="prenom">Heure d'arrivé : </label>
            <input
              :min="minTime"
              :max="maxTime"
              type="time"
              id="time"
              class="boa-green"
              v-model="form.time"
              v-on="on">
            <a class="boa-lien" @click="$router.push('planning')">Voir les horaires</a>
          </div>
        </template>
        <div>
          <v-time-picker
            v-model="form.time"
            color="#3e8545"
            :allowed-minutes="allowedMinutes"
            :min="minTime"
            :max="maxTime"
            format="24hr">
          </v-time-picker>
          <p class="boa-error" v-if="errorMessModal">Cette heure n'est pas disponible</p>
        </div>
        <v-btn color="#ff0000" @click="dialog = false">
          Annuler
        </v-btn>
        <v-btn color="#008544" @click="dialog = false">
          Valider
        </v-btn>
      </v-dialog>

      <div class="flex-row flex-space">
        <div class="fx fx-slide-up fx-delay-2 boa-error">
          <p v-if="errorMess">ERREUR: CHAMP INVALIDE</p>
        </div>
        <div class="fx fx-slide-up fx-delay-2" @click="confirmer()">
          <button class="cta-btn">
            Confirmer
          </button>
        </div>
      </div>
    </div>
    <div class="boa-form text-center" v-else>
      <h5>Félicitation ! Votre réservation a été enrégistré</h5>
      <p class="boa-white">
        Vous devez vous rendre à l'une de nos agence avant
        <strong class="boa-green"> {{rdvTime}} d'aujourd'hui</strong>
        muni votre pièce d'identité. Passé ce delai, votre réservation sera annulée. Merci...
      </p>
    </div>
  </section>
</template>

<script>
import { VTimePicker, VDialog, VBtn } from 'vuetify/lib';
import { db } from '@/firebase';
import store from '@/store';
import moment from 'moment';

export default {
  name: 'formulaire',
  components: {
    VTimePicker, VDialog, VBtn
  },
  data () {
    return {
      form: {
        carte: 'Choisissez',
        num: '',
        nom: '',
        prenom: '',
        time: '',
        date: ''
      },
      errorMess: false,
      dialog: false,
      errorMessModal: false,
      time: null,
      maxTime: '16:45',
      minTime: '08:00',
    };
  },
  computed: {
    ficheValid() {
      return store.getters.getFicheValid;
    },
    rdvTime() {
      return store.getters.getdate;
    },
  },
  methods: {
    allowedMinutes: m => m % 15 === 0,
    isValid() {
      if ((this.form.carte !== 'Choisissez') && this.form.num && this.form.nom && this.form.prenom  && this.form.time) {
        return true;
      }
      return false;
    },
    messError(){
      this.errorMess = false;
    },
    saveEvent(time, idUser) {
      const date = moment().format('YYYY-MM-DD');
      const endTime = moment(time, 'hh:mm').add(15, 'm').format('hh:mm');
      const key =  db.ref().child('events').push().key;
      db.ref('events/' + key).set({
        start: date + ' ' + time,
        end: date + ' ' + endTime,
        id: key,
        title: 'Place réservée',
        background: true,
        idUser: idUser
      }).catch(() => {
        alert('error DataBase Event');
      });
    },
    saveUser(user, key) {
      db.ref('users/' + key).set({
        nom: user.nom,
        prenom: user.prenom,
        id: key,
        numero: user.num,
        typeCarte: user.carte,
      }).catch(() => {
        alert('error DataBase User');
      });
    },
    updateFicheValid(etat) {
      store.commit('UPDATE_FICHEVALID', etat);
    },
    updateDate(d) {
      store.commit('UPDATE_DATE', d);
    },
    confirmer() {
      if (this.isValid()) {
        this.form.date = moment().format('YYYY-MM-DD');
        const key =  db.ref().child('users').push().key;
        this.saveUser(this.form, key);
        this.saveEvent(this.form.time, key);
        this.updateDate(this.form.time);
        this.updateFicheValid(true);
      } else {
        this.errorMess = true;
        setTimeout(this.messError, 5000);
      }
    }
  }
}
</script>

<style>

</style>
