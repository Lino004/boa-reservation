<template>
  <v-layout justify-center row class="white--text">
    <v-flex pa-4 xs12 sm8>
      <v-layout py-0 :class="classForm" align-center justify-center column fill-height>
        <v-form
          ref="form"
          lazy-validation
          style="width: 100%"
        >
          <div dark :class="fontSizeTitle" class="mb-1 mt-3 text-xs-center boa-souligne">
            Connexion
          </div>

          <div class="boa-form__content">

            <v-text-field
              dark
              color="white--text"
              v-model="email"
              :rules="emailRules"
              label="Entrez votre email"
              required
              prepend-icon="email"
            ></v-text-field>

            <v-text-field
              dark
              v-model="password"
              :append-icon="showPass ? 'visibility' : 'visibility_off'"
              :rules="[passwordRules.required, passwordRules.min]"
              :type="showPass ? 'text' : 'password'"
              color="white--text"
              name="input-10-1"
              label="Entrer votre mot de passe"
              hint="Au moins 8 caractères"
              counter
              @click:append="showPass = !showPass"
              prepend-icon="lock"
            ></v-text-field>

          </div>

          <div style="text-align: right">
            <v-btn
              :disabled="false"
              color="success"
              @click="validate()"
            >
              Se connecter
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
import { auth } from '@/firebase';

export default {
  name: 'connexion',
  data: () => ({
    email: '',
    emailRules: [
      v => !!v || 'Un e-mail est requis',
      v => /.+@.+./.test(v) || "L'e-mail que vous avez rentrer est incorrecte",
    ],
    password: '',
    passwordRules: {
      required: value => !!value || 'Mot de passe requis.',
      min: v => v.length >= 8 || 'Au moins 8 caractères',
    },
    showPass: false,
    snackbar: {
      value: false,
      message: '',
      type: '',
    },
  }),
  computed: {
    fontSizeTitle() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 'headline';
        default: return 'display-1';
      }
    },
    classForm() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 'boa-form-mobile';
        default: return 'boa-form';
      }
    },
  },
  methods: {
    snackbarOn(data) {
      this.snackbar.value = data.value;
      this.snackbar.type = data.type;
      this.snackbar.message = data.message;
    },
    async validate() {
      try {
        if (this.$refs.form.validate()) {
          const user = await auth.signInWithEmailAndPassword(this.email, this.password);
          this.snackbarOn({
            value: true,
            message: 'Connexion réussie',
            type: 'success',
          });
          this.email = '';
          this.password = '';
          this.password2 = '';
          this.$router.push('/connexion');
        } else {
          this.snackbarOn({
            value: true,
            message: 'Champs manquant. Veillez vérifier',
            type: 'error',
          });
        }
      } catch (error) {
        this.snackbarOn({
          value: true,
          message: error.message,
          type: 'error',
        });
      }
    },
  },
};
</script>

<style>

</style>
