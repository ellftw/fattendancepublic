<template>
  <v-flex xs8 offset-xs2 pt-3>
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
          <td class="text-xs-left">{{ props.item.semester }}</td>
          <td>
            <v-dialog v-model="dialog" persistent max-width="290">
                <template v-slot:activator="{ on }">
                  <v-btn round small v-on="on">διαγραφη</v-btn>
                </template>
                <v-card>
                  <v-card-title class="headline">Διαγραφη σπουδαστη</v-card-title>
                  <v-card-text>Η διαδικασια ειναι μη ανατρεψιμη. Ειστε σιγουροι οτι θελετε να διαγραψετε τον συγκεκριμενο σπουδαστη;         
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="pink darken-1" flat @click="dialog = false">Disagree</v-btn>
                    <v-btn color="pink darken-1" flat @click="deleteStudent(props.item.arithmosMitroou)">Agree</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            <v-btn round small>Μαθηματα</v-btn>
          </td>
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
      dialog: false,
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
        { text: 'Εξάμηνο', value: 'semester' },
        { text: 'Επιλογες', value: '', sortable: false }
        // { text: 'Περασμένα Μαθήματα', value: 'perasmena' }
      ],
      students: []

    }
  },
  watch: {},
  mounted () {
    this.getAllStudents()
  },
  methods: {
    async getAllStudents () {
      try {
        this.students = await StudentService.getAllStudents()
        console.log(this.students)
      } catch (error) {
        window.alert(error)
      }
      console.log(this.students)
    },
    async deleteStudent (arithmosMitroou) {
      try {
        let deletedStudent = await StudentService.deleteStudent(arithmosMitroou)
        if (deletedStudent && deletedStudent.ok === 1) {
          this.students = this.students.filter((sd) => sd.arithmosMitroou !== arithmosMitroou)
        } this.dialog = false
      } catch (error) {
        window.alert(error)
      }
    }
  }
}
</script>

<style scoped>
</style>
