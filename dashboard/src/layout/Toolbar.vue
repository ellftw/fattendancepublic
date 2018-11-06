<template>
  <v-toolbar app :clipped-left="clipped">
    <v-toolbar-side-icon @click.stop="toggleNavigationDrawer()"></v-toolbar-side-icon>
    <v-toolbar-title v-text="title"></v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-title v-if="isLoggedIn" v-text="fullName"></v-toolbar-title>
    <v-toolbar-items v-if="isLoggedIn">
      <v-menu offset-y>
        <v-btn icon slot="activator"><v-icon v-html="'mdi-account'"></v-icon></v-btn>
        <v-list>
          <v-list-tile
            v-for="(item, index) in accountActions"
            :key="index" @click="item.action"
          >
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  name: 'Toolbar',
  watch: {
    $route (to, from) {
      this.title = to.name
    }
  },
  computed: {
    isLoggedIn () {
      return this.$store.getters.isLoggedIn
    },
    fullName () {
      let user = this.$store.getters.user
      return `${user.name} ${user.surname}`
    }
  },
  data () {
    return {
      clipped: false,
      title: this.$route.name,
      accountActions: [
        {
          title: 'Αποσύνδεση',
          action: this.logout
        },
        {
          title: 'Ρυθμίσεις Λογαριασμού',
          action: this.goToAccountSettings
        }
      ]
    }
  },
  methods: {
    toggleNavigationDrawer () {
      this.$store.dispatch('toggleNavigationDrawer')
    },
    logout () {
      this.$store.commit('unsetUser')
      this.$store.commit('unsetToken')
      this.$router.push('/login')
    },
    goToAccountSettings () {
    }
  }
}
</script>
