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
      <v-data-table :headers="headers" :items="students" :search="search">
        <template slot="items" slot-scope="props">
          <td>{{ props.item.surname }}</td>
          <td class="text-xs-left">{{ props.item.name }}</td>
          <td class="text-xs-left">{{ props.item.arithmosMitroou }}</td>
          <td style="padding:0 0 0 0 ">
            <v-btn round small @click="deleteStudent()">Διαγραφη</v-btn>
            <v-btn round small>Μαθηματα</v-btn>
            <v-btn round small>Βεβαιωση</v-btn>
          </td>
          <!-- <td class="text-xs-left">{{ props.item.eksamino }}</td>
          <td class="text-xs-left">{{ props.item.perasmena }}</td>-->
        </template>
        <v-alert
          slot="no-results"
          :value="true"
          color="error"
          icon="mdi-alert"
        >Your search for "{{ search }}" found no results.</v-alert>
      </v-data-table>
    </v-card>
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
        { text: 'Αριθμός Μητρώου', value: 'arithmosMitroou' },
        { text: 'Επιλογες', value: '', sortable: false }
        // { text: 'Εξάμηνο', value: 'eksamino' },
        // { text: 'Περασμένα Μαθήματα', value: 'perasmena' }
      ],
      students: []

    }
  },
  watch: {
  
  },
  mounted () {
    this.getAllStudents()
    
    console.log(this.getAllStudents())
  },
  methods: {
    async getAllStudents () {
      try {
        this.students = await StudentService.getAllStudents()
      } catch (error) {
        window.alert(error)
      }
    },
    async deleteStudent (data) {
      try {
        this.deletethestudent = await StudentService.deleteStudent(data)
      } catch (error) {
        window.alert(error)
      }
    }
  }
}
</script>

<style scoped>
</style>
