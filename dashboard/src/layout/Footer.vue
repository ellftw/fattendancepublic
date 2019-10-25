<template app>
  <v-footer dark height="auto">
    <v-card flat tile class="grey white--text text-xs-center">
      <v-card-text>
        <v-btn v-for="icon in icons" :key="icon" class="mx-3 white--text" icon>
          <v-icon size="24px">{{ icon }}</v-icon>
        </v-btn>
      </v-card-text>

      <v-card-text class="white--text pt-0">
        Η παρούσα πτυχιακή δημιουργήθηκε από τους φοιτητές: Καλαϊτζίδης Αλέξανδρος, Σαββίδης Αναστάσιος και τα περιεχόμενα είναι καθαρά και μόνο για τους λόγους της εργασίας. Τα πρόσωπα είναι φανταστικά και τα περιεχόμενα και οι πληροφορίες δεν ανήκουν σε εμάς αλλά στο τμήμα και χρησιμοποιούνται καθαρά για ενδεικτικούς λόγους.
      </v-card-text>
      <v-divider></v-divider>

      <v-card-text class="white--text">
        &copy;2019 —
        <strong>Καλαϊτζίδης Αλέξανδρος, Σαββίδης Αναστάσιος</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: 'Footer',
  data: () => ({
    icons: [
      'mdi-github-circle',
      'mdi-gmail',
      'mdi-linkedin',
      'mdi-instagram'
    ]
  })
}
</script>
