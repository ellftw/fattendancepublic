<template>
  <v-app dark>
    <navigation-drawer/>
    <toolbar/>
    <v-content>
      <transition appear name="fade" mode="out-in">
        <router-view/>
      </transition>
    </v-content>
  <Footer/>
  </v-app>
</template>

<script>
import NavigationDrawer from '@/layout/NavigationDrawer.vue'
import Toolbar from '@/layout/Toolbar.vue'
import Footer from '@/layout/Footer.vue'

export default {
  name: 'App',
  components: {
    NavigationDrawer,
    Toolbar,
    Footer
  },
  data () {
    return {}
  }
}
</script>

<style>
.router-link-active {
  color: red;
}

.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity 0.3s ease;
}

.fade-leave-active {
  transition: opacity 0.12s ease;
  opacity: 0;
}
</style>
