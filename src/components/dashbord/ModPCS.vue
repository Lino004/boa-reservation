<template>
  <v-content class="pt-3">
    <v-text-field
      label="Entrez le titre du PCS"
      solo
      v-model="data.titre"
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
      v-model="data.content"
      class="white grey--text text--darken-3"
      :editorToolbar="customToolbar"></vue-editor>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn @click="$parent.$parent.show = 0" color="error">Annuler</v-btn>
      <v-btn @click.prevent="updateImg()" dark color="green darken-2">Enrégistrer</v-btn>
    </v-card-actions>
  </v-content>
</template>

<script>
import { VueEditor } from 'vue2-editor';
import { mapGetters, mapActions } from 'vuex';
import { db, storage } from '@/firebase';
import moment from 'moment';

export default {
  name: 'modPCS',
  props: ['data'],
  components: {
    VueEditor,
  },
  data: () => ({
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
    content: '',
    imageName: '',
    imageUrl: '',
    imageFile: [],
    urlImage: '',
  }),
  computed: {
    ...mapGetters([
      'getUser',
    ]),
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
        }
      } catch (error) {
        this.save();
      }
    },
    save() {
      if (this.data.titre !== '' && this.data.content) {
        const pcs = {
          autor: `${this.getUser.nom} ${this.getUser.prenom}`,
          uidAutor: this.getUser.id,
          titre: this.data.titre,
          content: this.data.content,
          date: moment().local('fr').format('DD/MM/YYYY [à] hh[h]mm'),
          imgUrl: this.urlImage ? this.urlImage : this.data.imgUrl,
        };
        db.ref('pcs/').child(`${this.data.key}`).update(pcs).then(() => {
          this.updateSnackbar({
            value: true,
            type: 'success',
            message: 'Mise à jour réussie',
          });
          this.updateLoading(false);
          this.$parent.$parent.show = 0;
        })
          .catch((e) => {
            this.updateSnackbar({
              value: true,
              type: 'error',
              message: e.message,
            });
            this.updateLoading(false);
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
  mounted() {
    this.imageUrl = this.data.imgUrl;
  },
};
</script>

<style>
.ql-editor {
  max-height: 300px;
}
</style>
