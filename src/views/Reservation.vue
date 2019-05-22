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
              v-model="selectPiece"
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

            <v-select
              dark
              color="white--text"
              v-model="selectMomentDay"
              :items="momentDay"
              :rules="[v => !!v || 'Le choix du moment est nécessaire']"
              label="Quel jour ?"
              required
              prepend-icon="date_range"
              class=""
            ></v-select>

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
                max="16:45"
                :allowed-minutes="allowedMinutes"
              >
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                <v-btn flat color="primary" @click="timeValid()">OK</v-btn>
              </v-time-picker>
            </v-dialog>
          </div>
          <div style="text-align: right">
            <v-btn
              :disabled="false"
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
    selectPiece: null,
    selectMomentDay: null,
    pieces: [
      "Carte d'Identité National",
      'Passport',
    ],
    time: null,
    snackbar: {
      value: false,
      message: '',
      type: '',
    },
    modal: false,
    dateTimes: [],
  }),
  computed: {
    validBtn() {
      if (this.numero && this.nom && this.prenom && this.selectPiece && this.time) {
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
    momentDay() {
      const a = moment().locale('fr');
      const b = moment('17:00', 'hh:mm');
      if (b.diff(a, 'hour') > 0) {
        return ["Aujourd'hui", 'Demain'];
      }
      return ['Demain'];
    },
    dateEvent() {
      if (this.selectMomentDay === "Aujourd'hui") return moment().locale('fr').format('YYYY-MM-DD');
      return moment().locale('fr').add(1, 'days').format('YYYY-MM-DD');
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
        message: `Réservation validée. Veillez vous rendre dans une de nos agence ${this.selectMomentDay} avant  ${this.time}.
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
      const locale = moment.locale('fr');
      const endTime = moment(this.time, 'hh:mm').add(15, 'm').locale('fr');
      console.log(endTime);
      /*const idEvent = db.ref().child('events/').push().key;
      db.ref(`events/${idEvent}`).set({
        start: `${this.dateEvent} ${this.time}`,
        end: `${this.dateEvent} ${endTime}`,
        title: 'Place réservée',
        background: true,
        class: 'event-now',
        id: idEvent,
        carte: this.selectPiece,
        num: this.numero,
        nom: this.nom,
        prenom: this.prenom,
        time: this.time,
        date: this.dateEvent,
        confirm: true,
      }).catch(() => {
        this.snackbarOn({
          value: true,
          message: 'Erreur serveur E',
          type: 'red',
        });
      });*/
    },
    initTimes() {
      db.ref('events/').on('value', (snap) => {
        if (snap.val()) {
          Object.values(snap.val()).forEach((el) => {
            this.dateTimes.push(el.start);
          });
        }
      });
    },
    timeValid() {
      const a = moment().locale('fr');
      const b = moment(`${this.dateEvent}  ${this.time}`, 'YYYY-MM-DD hh:mm');
      if (b.diff(a) > 0) {
        if (this.dateTimes.includes(b.format('YYYY-MM-DD hh:mm'))) {
          this.snackbarOn({
            value: true,
            message: 'Cette heure est déjà réservée',
            type: 'red',
          });
        } else {
          this.$refs.dialog.save(this.time);
        }
      } else {
        this.snackbarOn({
          value: true,
          message: 'Attention!!! Cette heure est déjà passée',
          type: 'red',
        });
      }
    },
  },
  mounted() {
    this.initTimes();
  },
  destroyed() {
    db.ref('events/').off();
  },
};
</script>

<style>

</style>
