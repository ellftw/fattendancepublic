<template>
  <v-navigation-drawer
   :clipped="clipped" v-model="drawerVisible" temporary disable-resize-watcher app>
    <v-list v-if="!isLoggedIn">
      <v-list-tile :to="item.route" value="true" v-for="(item, i) in unAuthorizedItems" :key="i">
        <v-list-tile-action >
          <v-icon v-html="item.icon"></v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title v-text="item.title"></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>

    <v-list v-if="isLoggedIn && userType === 'καθηγητής'">
      <v-list-tile :to="item.route" value="true" v-for="(item, i) in teacherItems" :key="i">
        <v-list-tile-action >
          <v-icon v-html="item.icon"></v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title v-text="item.title"></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>

    <v-list v-if="isLoggedIn && userType === 'γραμματέας'">
      <v-list-tile :to="item.route" value="true" v-for="(item, i) in secretaryItems" :key="i">
        <v-list-tile-action >
          <v-icon v-html="item.icon"></v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title v-text="item.title"></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>

    <v-divider/>

    <v-list>
      <v-list-tile :to="item.route" value="true" v-for="(item, i) in additionalItems" :key="i">
        <v-list-tile-action >
          <v-icon v-html="item.icon"></v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title v-text="item.title"></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>

  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'NavigationDrawer',
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn
    },
    userType: function () {
      return this.$store.getters.user.userType
    },
    drawerVisible: {
      get: function () {
        return this.$store.getters.navigationDrawerVisible
      },
      set: function (value) {
        if (value !== this.$store.getters.navigationDrawerVisible) this.$store.dispatch('toggleNavigationDrawer')
      }
    }
  },
  data () {
    return {
      clipped: true,
      fixed: false,
      teacherItems: [   
            {
          icon: 'mdi-library-books',
          title: 'Λίστα Μαθημάτων',
          route: '/subjectList'
        },
                   {
          icon: 'mdi-library-books',
          title: 'Λίστα Μαθητών Μαθήματος',
          route: '/mathima'
        },
        ],
      secretaryItems: [      
        {
          icon: 'mdi-account-plus',
          title: 'Εγγραφή',
          route: '/register'
        }],
      unAuthorizedItems: [
        {
          icon: 'mdi-home',
          title: 'Αρχική',
          route: '/home'
        },
        // {
        //   icon: 'mdi-chart-bubble',
        //   title: 'Επόμενο Μάθημα',
        //   route: '/'
        // },
        {
          icon: 'mdi-login',
          title: 'Είσοδος',
          route: '/login'
        },
      ],
      additionalItems: [
        {
          icon: 'mdi-information',
          title: 'Πληροφορίες',
          route: '/info'
        },
        {
          icon: 'mdi-settings',
          title: 'Ρυθμίσεις',
          route: '/settings'
        }
      ]
    }
  },
  methods: {
    toggleNavigationDrawer () {
      this.$store.dispatch('toggleNavigationDrawer')
    }
  }
}
</script>
