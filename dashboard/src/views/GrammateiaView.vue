<template>
<v-flex xs8 offset-xs2>
  <v-card>
    <v-card-title>
      Πίνακας σπουδαστών γραμματείας
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :search="search"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.lastname }}</td>
        <td class="text-xs-left">{{ props.item.firstname }}</td>
        <td class="text-xs-left">{{ props.item.aem }}</td>
        <td class="text-xs-left">{{ props.item.eksamino }}</td>
        <td class="text-xs-left">{{ props.item.perasmena }}</td>
      </template>
      <v-alert slot="no-results" :value="true" color="error" icon="mdi-alert">
        Your search for "{{ search }}" found no results.
      </v-alert>
    </v-data-table>
  </v-card>

    <v-btn round
      :loading="loading"
      :disabled="loading"
      color="blue-grey"
      class="white--text"
      @click="loader = 'loading'"
    >
      Εκτύπωση Βεβαίωσης Σπουδών
      <v-icon right dark>mdi-printer</v-icon>
    </v-btn>
    <v-btn round
      :loading="loading1"
      :disabled="loading1"
      color="blue-grey"
      class="white--text elevation-$12"
      @click="loader = 'loading1'"
    >
    Εμφάνισε Όλα Τα Μαθήματα
      <v-icon right dark>mdi-book-variant</v-icon>
    </v-btn>
  </v-flex>
</template>

<script>
export default {
  name: 'grammateia',
  data () {
    return {
      loader: null,
      loading: false,
      loading1: false,
      search: '',
      headers: [
        {
          text: 'Επίθετο',
          align: 'left',
          sortable: true,
          value: 'lastname'
        },
        { text: 'Όνομα', value: 'firstname' },
        { text: 'Αριθμός Μητρώου', value: 'aem' },
        { text: 'Εξάμηνο', value: 'eksamino' },
        { text: 'Περασμένα Μαθήματα', value: 'perasmena' }
      ],
      desserts: [
        {
          value: false,
          lastname: 'Καλαϊτζίδης',
          firstname: 'Αλέξανδρος',
          aem: 3253,
          eksamino: 14,
          perasmena: 31
        },
        {
          value: false,
          lastname: 'Σαββίδης',
          firstname: 'Αναστάσιος',
          aem: 3190,
          eksamino: 14,
          perasmena: 41
        },
        {
          value: false,
          lastname: 'Κολαχλίδης',
          firstname: 'Μάριο',
          aem: 1,
          eksamino: 9000,
          perasmena: 3
        },
        {
          value: false,
          lastname: 'Αδελφός',
          firstname: 'Ιάκωβος',
          aem: 33,
          eksamino: 33,
          perasmena: 33
        },
        {
          value: false,
          lastname: 'Χαλιά-μοκέτες',
          firstname: 'Σούλα',
          aem: 666,
          eksamino: 49,
          perasmena: 39
        },
        {
          value: false,
          lastname: 'Βean',
          firstname: 'Mister',
          aem: 0,
          eksamino: 94,
          perasmena: 0
        },
        {
          value: false,
          lastname: 'Blinders',
          firstname: 'Γύφτοι',
          aem: 123,
          eksamino: 123,
          perasmena: 123
        },
        {
          value: false,
          lastname: 'Ross',
          firstname: 'Bob',
          aem: 3993,
          eksamino: 2,
          perasmena: 5
        },
        {
          value: false,
          lastname: 'Τυρομουνίδου',
          firstname: 'Ερμιόνη',
          aem: 3666,
          eksamino: 8,
          perasmena: 31
        },
        {
          value: false,
          lastname: 'Επαμεινώνδας',
          firstname: 'Πελοπίδας',
          aem: 26.0,
          eksamino: 65,
          perasmena: 7
        }
      ]
    }
  },
  watch: {
    loader () {
      const l = this.loader
      this[l] = !this[l]

      setTimeout(() => (this[l] = false), 1000)

      this.loader = null
    }
  }
}
</script>

<style scoped>

</style>
