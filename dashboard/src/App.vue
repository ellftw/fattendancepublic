<template>
  <v-app dark>
    <navigation-drawer/>
    <toolbar/>
    <v-content>
      <transition appear name="fade" mode="out-in">
        <router-view/>
      </transition>
    </v-content>
  </v-app>
</template>

<script>
import NavigationDrawer from '@/layout/NavigationDrawer.vue'
import Toolbar from '@/layout/Toolbar.vue'

export default {
  name: 'App',
  components: {
    NavigationDrawer,
    Toolbar
  },
  data () {
    return {
    }
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

.fade-leave {}

.fade-leave-active {
  transition: opacity 0.12s ease;
  opacity: 0;
}
</style>
