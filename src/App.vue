<template>
  <v-app>
    <v-container d-flex align-center justify-center class="boa-bg" fluid>
      <v-layout boa-wrap boa-layout>
        <v-layout boa-layout-content justify-space-between column>
          <Toolbar/>
          <div>
            <transition
              mode="out-in"
              name="custom-classes-transition"
              enter-active-class="animated pulse"
              leave-active-class="animated bounceOutRight"
            >
              <router-view/>
            </transition>
          </div>
          <FooterApp/>
        </v-layout>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import Toolbar from '@/components/Toolbar.vue';
import FooterApp from '@/components/FooterApp.vue';

export default {
  name: 'App',
  components: {
    Toolbar,
    FooterApp,
  },
  data() {
    return {
      //
    };
  },
};
</script>

<style>
/*@import '/assets/css/app.css';*/
html,
body {
  display: block;
  position: relative;
  max-width: 100vw;
  min-height: 100vh;
}

html {
  overflow: hidden;
  overflow-y: auto;
  font-family: "Roboto Condensed", sans-serif !important;
}

.boa-bg{
  background-color: #8086a0;
  background-image:
    linear-gradient(80deg, rgba(0, 133, 68, 0.8), rgba(0, 133, 68, 0) 70.71%),
    linear-gradient(160deg, rgba(128, 134, 160, 0), rgba(128, 134, 160, 0) 70.71%),
    linear-gradient(240deg, rgba(251, 251, 251, 0.8), rgba(251, 251, 251, 0) 70.71%)
}
.boa-layout{
  height: 100%;
  background-image: url("./assets/bg.jpg");
  background-position: bottom right;
  background-repeat: no-repeat;
  background-size: cover;
}
@media only screen and (min-width: 720px) {
  .boa-wrap {
    margin: 0 2em;
    max-width: 1080px;
    height: calc(100vh - (1em * 4));
    max-height: 700px;
    border-radius: 6px;
    box-shadow: 0 1px 30px rgba(0, 0, 0, 1)
  }
}
@media only screen and (max-width: 720px) {
  .boa-wrap {
    position: absolute;
    margin: auto;
    width: 100%;
    height: 100%;
  }
  .border-rt{
    border-radius: 0px !important;
  }
  .border-rb{
    border-radius: 0px !important;
  }
  .container{
    padding: 0%
  }
  .logo{
    height: 20px !important;
  }
}
.boa-layout-content{
  height: 100%;
  border-radius: 6px;
  background-color: rgba(30, 31, 48, .6);
}
.border-rt{
  border-radius: 6px 6px 0px 0px
}
.border-rb{
  border-radius: 0px 0px 6px 6px
}
.boa-green{
  color: #008544;
}
.v-list__tile__title a{
  color: white !important;
  text-decoration-line: none;
}
</style>
