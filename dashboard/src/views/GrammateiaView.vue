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
      :items="students"
      :search="search"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.surname }}</td>
        <td class="text-xs-left">{{ props.item.name }}</td>
        <td class="text-xs-left">{{ props.item.arithmosMitroou }}</td>
        <!-- <td class="text-xs-left">{{ props.item.eksamino }}</td>
        <td class="text-xs-left">{{ props.item.perasmena }}</td> -->
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
import StudentService from '@/services/StudentService'
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
          value: 'surname'
        },
        { text: 'Όνομα', value: 'name' },
        { text: 'Αριθμός Μητρώου', value: 'arithmosMitroou' }
        // { text: 'Εξάμηνο', value: 'eksamino' },
        // { text: 'Περασμένα Μαθήματα', value: 'perasmena' }
      ],
      students: []
    }
  },
  watch: {
    loader () {
      const l = this.loader
      this[l] = !this[l]

      setTimeout(() => (this[l] = false), 1000)

      this.loader = null
    }
  },
  mounted () {
    this.getAllStudents()
  },
  methods: {
    async getAllStudents () {
      try {
        this.students = (await StudentService.getAllStudents())
      } catch (error) {
        window.alert(error)
      }
    }
  }
}
</script>

<style scoped>

</style>
