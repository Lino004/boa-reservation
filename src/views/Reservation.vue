<template>
  <v-layout justify-center row class="white--text">
    <v-flex pa-4 xs12 sm8>
      <v-layout px-5 py-0 class="boa-form" align-center justify-center column fill-height>
        <v-form
          ref="form"
          lazy-validation
          style="width: 100%"
        >
          <div dark :class="fontSizeTitle" class="mb-1 text-xs-center boa-souligne">
            Fiche de réservation
          </div>

          <div class="boa-form__content">
            <v-select
              dark
              color="white--text"
              v-model="select"
              :items="pieces"
              :rules="[v => !!v || 'Le choix de la pièce nécessaire']"
              label="Type de pièce :"
              required
              prepend-icon="ballot"
              class=""
            ></v-select>

            <v-text-field
              dark
              color="white--text"
              v-model="numero"
              :rules="numeroRules"
              label="Entrez le numéro de la pièce"
              required
              prepend-icon="format_list_numbered"
            ></v-text-field>

            <v-text-field
              dark
              color="white--text"
              v-model="nom"
              :rules="nomRules"
              label="Entrez votre nom"
              required
              prepend-icon="account_box"
            ></v-text-field>

            <v-text-field
              dark
              color="white--text"
              v-model="prenom"
              :rules="prenomRules"
              label="Entrez votre prenom"
              required
              prepend-icon="account_box"
            ></v-text-field>

            <v-dialog
              ref="dialog"
              v-model="modal"
              :return-value.sync="time"
              persistent
              lazy
              full-width
              width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  dark
                  color="white--text"
                  v-model="time"
                  :rules="timeRules"
                  label="Entrez l'heure de votre arrivé"
                  prepend-icon="access_time"
                  readonly
                  required
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker
                v-if="modal"
                v-model="time"
                full-width
                color="#008544"
                format="24hr"
                scrollable
                min="8:15"
                max="17:00"
                :allowed-minutes="allowedMinutes"
              >
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                <v-btn flat color="primary" @click="$refs.dialog.save(time)">OK</v-btn>
              </v-time-picker>
            </v-dialog>
          </div>

          <div style="text-align: right">
            <v-btn
              :disabled="!validBtn"
              color="success"
              @click="validate"
            >
              Validate
            </v-btn>
          </div>
        </v-form>
      </v-layout>
    </v-flex>
    <v-snackbar
      v-model="snackbar.value"
      bottom
      :timeout="10000"
      :color="snackbar.type"
      multi-line
    >
      {{ snackbar.message }}
      <v-btn
        color="white"
        flat
        @click="snackbar.value = false"
      >
        Fermer
      </v-btn>
    </v-snackbar>
  </v-layout>
</template>

<script>
import { db } from '@/firebase';
import moment from 'moment';
import { mapActions } from 'vuex';

export default {
  name: 'reservation',
  data: () => ({
    numero: '',
    numeroRules: [
      v => !!v || 'Le champ numéro est important',
    ],
    nom: '',
    nomRules: [
      v => !!v || 'Le champ nom est important',
    ],
    prenom: '',
    prenomRules: [
      v => !!v || 'Le champ prenom est important',
    ],
    select: null,
    pieces: [
      "Carte d'Identité National",
      'Passport',
    ],
    time: null,
    timeRules: [
      v => !!v || 'E-mail is required',
    ],
    snackbar: {
      value: false,
      message: '',
      type: '',
    },
    modal: false,
  }),
  computed: {
    validBtn() {
      if (this.numero && this.nom && this.prenom && this.select && this.time) {
        return true;
      }
      return false;
    },
    fontSizeTitle() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 'headline';
        default: return 'display-1';
      }
    },
  },
  methods: {
    ...mapActions([
      'updateUser',
    ]),
    allowedMinutes: m => m % 15 === 0,
    validate() {
      this.saveEvent();
      this.snackbarOn({
        value: true,
        message: `Réservation validée. Veillez vous rendre dans une de nos agence avant ${this.time}.
                  Passer ce délai, votre réservation sera annulée.`,
        type: 'success',
      });
      this.reset();
    },
    snackbarOn(data) {
      this.snackbar.value = data.value;
      this.snackbar.type = data.type;
      this.snackbar.message = data.message;
    },
    reset() {
      this.$refs.form.reset();
    },
    saveEvent() {
      const date = moment().format('YYYY-MM-DD');
      const endTime = moment(this.time, 'hh:mm').add(15, 'm').format('hh:mm');
      db.ref('events/').push({
        start: `${date} ${this.time}`,
        end: `${date} ${endTime}`,
        title: 'Place réservée',
        background: true,
        class: 'event-now',
        carte: this.select,
        num: this.numero,
        nom: this.nom,
        prenom: this.prenom,
        time: this.time,
        date: moment().format('dddd Do MMMM YYYY'),
        confirm: true,
      }).catch(() => {
        this.snackbarOn({
          value: true,
          message: 'Erreur serveur E',
          type: 'red',
        });
      });
    },
  },
};
</script>

<style>
.boa-form {
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  border: #008544 solid 2px;
}
.boa-souligne{
  text-decoration-line: underline;
  -moz-text-decoration-line: underline;
}
.v-select__selection{
  color: #008544;
}
.v-text-field input{
  color: #008544 !important;
}
.v-input__icon .v-icon{
  color: #008544;
}

@media only screen and (max-height: 568px) {
  .boa-form__content{
    max-height: 250px;
    overflow-y: auto;
  }
}
</style>
