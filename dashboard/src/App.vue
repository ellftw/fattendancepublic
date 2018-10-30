<template>
<div>
  <v-app dark>
    <v-navigation-drawer :clipped="clipped" v-model="drawer" enable-resize-watcher fixed temporary app>

      <v-list>
        <v-list-tile :to="item.route" value="true" v-for="(item, i) in items" :key="i">
          <v-list-tile-action >
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app :clipped-left="clipped">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      clipped: true,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-chart-bubble',
          title: 'Αρχική',
          route: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Λίστα Μαθημάτων',
          route: '/subjectList'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Επόμενο Μάθημα',
          route: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Ρυθμίσεις',
          route: '/'
        }
      ],
      right: true,
      title: 'Ψηφιακό Παρουσιολόγιο'
    }
  }
}
</script>

<style>

</style>
