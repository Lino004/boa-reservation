<template>
  <v-content class="pt-3">
    <v-text-field
      label="Entrez le titre du PCS"
      solo
      v-model="titre"
      required
      :rules="titreRules"
    ></v-text-field>
    <v-layout align-center column xs12>
      <div>
        <img
          :src="imageUrl"
          height="150"
          @click='pickFile'
          v-if="imageUrl"
          class="mb-4"/>
        <div
          v-else
          class="boa-dash-bg mb-4"
          style="height: 150px; width: 150px; border: dashed;"
          @click='pickFile'>
          <v-layout align-center justify-space-around column fill-height>
            <v-btn fab dark large color="green darken-2">
              <v-icon dark>add</v-icon>
            </v-btn>
          </v-layout>
        </div>
        <input
            type="file"
            style="display: none"
            ref="image"
            accept="image/*"
            @change="onFilePicked($event.target.files[0])"
        >
      </div>
    </v-layout>
    <vue-editor
      :value.sync="content"
      class="white grey--text text--darken-3"
      :editorToolbar="customToolbar"></vue-editor>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn @click="$parent.$parent.show = 0" color="error">Annuler</v-btn>
      <v-btn @click="updateImg()" dark color="green darken-2">Enrégistrer</v-btn>
    </v-card-actions>
  </v-content>
</template>

<script>
import { VueEditor } from 'vue2-editor';
import { mapGetters, mapActions } from 'vuex';
import { db, storage } from '@/firebase';
import moment from 'moment';

export default {
  name: 'addPCS',
  components: {
    VueEditor,
  },
  data: () => ({
    titre: 'Titre du problème',
    titreRules: [
      v => !!v || 'Un titre est requis',
    ],
    customToolbar: [
      [{ header: [false, 1, 2, 3, 4, 5, 6] }],
      ['bold', 'italic', 'underline', 'strike'],
      [
        { align: '' },
        { align: 'center' },
        { align: 'justify' },
      ],
      ['code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ color: [] }, { background: [] }],
      ['link', 'formula'],
      ['clean'],
    ],
    imageName: '',
    imageUrl: '',
    imageFile: [],
    urlImage: '',
  }),
  computed: {
    ...mapGetters([
      'getUser',
    ]),
    content() {
      return `<h1>${this.titre}</h1><p>Petite description.</p><h2>Causes possible du problème</h2><p>Différentes causes possibles:</p><ul><li>Cause 1</li><li>Cause 2</li><li>Cause 3</li><li>...</li></ul><h2>Solutions possibles</h2><p>Marches à suivre:</p><ol><li>......</li><li>......</li><li>......</li></ol><p><br></p>`;
    },
  },
  methods: {
    ...mapActions([
      'updateSnackbar',
      'updateLoading',
    ]),
    pickFile() {
      this.$refs.image.click();
    },
    onFilePicked(file) {
      if (file) {
        this.imageName = file.name;
        if (this.imageName.lastIndexOf('.') <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(file);
        fr.addEventListener('load', () => {
          this.imageUrl = fr.result;
          this.imageFile = file;
        });
      } else {
        this.imageName = '';
        this.imageFile = '';
        this.imageUrl = '';
      }
    },
    async updateImg() {
      try {
        this.updateLoading(true);
        if (this.imageFile) {
          const reponse = await storage.ref(`images/${this.imageFile.name}`).put(this.imageFile);
          reponse.ref.getDownloadURL().then((url) => {
            this.urlImage = url;
            this.save();
          });
        } else {
          this.save();
        }
      } catch (error) {
        this.save();
      }
    },
    save() {
      if (this.titre !== '' && this.content) {
        const pcsKey = db.ref().child('pcs').push().key;
        const pcs = {
          autor: `${this.getUser.nom} ${this.getUser.prenom}`,
          uidAutor: this.getUser.id,
          titre: this.titre,
          content: this.content,
          date: moment().local('fr').format('DD/MM/YYYY [à] hh[h]mm'),
          key: pcsKey,
          imgUrl: this.urlImage,
        };
        db.ref(`pcs/${pcsKey}`).set(pcs, (error) => {
          if (error) {
            this.updateLoading(false);
            this.updateSnackbar({
              value: true,
              type: 'error',
              message: 'Erreur: sauvegarde échouée',
            });
          } else {
            this.updateLoading(false);
            this.updateSnackbar({
              value: true,
              type: 'success',
              message: 'Sauvegarde réussie',
            });
            this.titre = 'Titre du problème';
            this.imageName = '';
            this.imageFile = '';
            this.imageUrl = '';
            this.$parent.$parent.show = 0;
          }
        });
      } else {
        this.updateLoading(false);
        this.updateSnackbar({
          value: true,
          type: 'error',
          message: 'Erreur: champs requis manquant',
        });
      }
    },
  },
};
</script>

<style>
.ql-editor {
  max-height: 300px;
}
</style>
