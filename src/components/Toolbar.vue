<template>
  <v-toolbar dark color="rgba(30, 31, 48, .2)" class="border-rt">
      <v-toolbar-title class="headline text-uppercase">
        <img class="logo" src="@/assets/logo.png" alt="Acceuil" height="30" srcset="">
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn to="/" flat>
          Acceuil<v-icon class="ml-1" right>home</v-icon>
        </v-btn>
        <v-btn to="/reservation" flat>
          Réservation<v-icon class="ml-1" right>list</v-icon>
        </v-btn>
        <v-btn to="/horaires" flat>
          Horaires<v-icon class="ml-1" right>timer</v-icon>
        </v-btn>
      </v-toolbar-items>
      <v-menu>
        <template v-slot:activator="{ on }">
          <v-toolbar-side-icon class="hidden-sm-and-up" v-on="on"></v-toolbar-side-icon>
        </template>
        <v-list dark>
          <v-list-tile>
            <v-list-tile-title>
              <router-link to="/">Acceuil</router-link>
            </v-list-tile-title>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-title>
              <router-link to="/horaires">Horaires</router-link>
            </v-list-tile-title>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-title>
              <router-link to="/reservation">Réservation</router-link>
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
  </v-toolbar>
</template>

<script>
export default {
  name: 'toolbar',
  computed: {
    route() {
      return this.$router.history.current.name;
    },
  },
  mounted() {},
};
</script>

<style>
.fx {
    position: relative;
    animation-direction: normal;
    animation-duration: 400ms;
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    animation-iteration-count: 1;
    animation-fill-mode: forwards
}

.fx-notx {
    transition: none !important
}

.fx-ibk {
    display: inline-block !important
}

.fx-delay-1 {
    animation-delay: calc(calc(400ms / 3) * 1)
}

.fx-delay-2 {
    animation-delay: calc(calc(400ms / 3) * 2)
}

.fx-delay-3 {
    animation-delay: calc(calc(400ms / 3) * 3)
}

.fx-delay-4 {
    animation-delay: calc(calc(400ms / 3) * 4)
}

.fx-delay-5 {
    animation-delay: calc(calc(400ms / 3) * 5)
}

.fx-delay-6 {
    animation-delay: calc(calc(400ms / 3) * 6)
}

.fx-delay-7 {
    animation-delay: calc(calc(400ms / 3) * 7)
}

.fx-delay-8 {
    animation-delay: calc(calc(400ms / 3) * 8)
}

@keyframes spinRight {
    0% {
        transform: rotate(0deg)
    }

    100% {
        transform: rotate(359deg)
    }
}

.fx-spin-right {
    animation-name: spinRight;
    animation-duration: 1s;
    animation-timing-function: linear;
    animation-iteration-count: infinite
}

@keyframes spinLeft {
    0% {
        transform: rotate(359deg)
    }

    100% {
        transform: rotate(0deg)
    }
}

.fx-spin-left {
    animation-name: spinLeft;
    animation-duration: 1s;
    animation-timing-function: linear;
    animation-iteration-count: infinite
}

@keyframes fadeIn {
    0% {
        opacity: 0
    }

    100% {
        opacity: 1
    }
}

.fx-fade-in {
    opacity: 0;
    animation-name: fadeIn
}

@keyframes fadeOut {
    0% {
        opacity: 1
    }

    100% {
        opacity: 0
    }
}

.fx-fade-out {
    opacity: 1;
    animation-name: fadeOut
}

@keyframes dropIn {
    0% {
        opacity: 0;
        transform: scale(1.4)
    }

    100% {
        opacity: 1;
        transform: scale(1)
    }
}

.fx-drop-in {
    opacity: 0;
    transform: scale(1.4);
    animation-name: dropIn
}

@keyframes zoomIn {
    0% {
        opacity: 0;
        transform: scale(.4)
    }

    100% {
        opacity: 1;
        transform: scale(1)
    }
}

.fx-zoom-in {
    opacity: 0;
    transform: scale(.4);
    animation-name: zoomIn
}

@keyframes zoomOut {
    0% {
        opacity: 1;
        transform: scale(1)
    }

    100% {
        opacity: 0;
        transform: scale(.4)
    }
}

.fx-zoom-out {
    opacity: 1;
    transform: scale(1);
    animation-name: zoomOut
}

@keyframes slideLeft {
  0% {
    opacity: 0;
    transform: translateX(80px)
  }

  100% {
    opacity: 1;
    transform: translateX(0)
  }
}

.fx-slide-left {
  opacity: 0;
  transform: translateX(80px);
  animation-name: slideLeft
}

@keyframes slideRight {
  0% {
    opacity: 0;
    transform: translateX(calc(0 - 80px))
  }

  100% {
    opacity: 1;
    transform: translateX(0)
  }
}

.fx-slide-right {
  opacity: 0;
  transform: translateX(calc(0 - 80px));
  animation-name: slideRight
}

@keyframes slideUp {
  0% {
    opacity: 0;
    transform: translateY(80px)
  }

  100% {
    opacity: 1;
    transform: translateY(0)
  }
}

.fx-slide-up {
  opacity: 0;
  transform: translateY(80px);
  animation-name: slideUp
}

@keyframes slideDown {
  0% {
    opacity: 0;
    transform: translateY(calc(0 - 80px))
  }

  100% {
    opacity: 1;
    transform: translateY(0)
  }
}

.fx-slide-down {
  opacity: 0;
  transform: translateY(calc(0 - 80px));
  animation-name: slideDown
}

@keyframes pulseFade {
  0% {
    opacity: 0.7
  }

  50% {
    opacity: 1.0
  }

  100% {
    opacity: 0.7
  }
}

.fx-pulse {
  opacity: 0.7;
  animation-name: pulseFade;
  animation-duration: 1s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}
</style>
