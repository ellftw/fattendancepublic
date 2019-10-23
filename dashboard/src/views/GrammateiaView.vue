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
          <td style="padding:0 0 0 0 ">
            <v-btn round small @click="deleteStudent(props.item.arithmosMitroou)">Διαγραφη</v-btn>
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
            <v-btn round @click="semesterBegin()">Εκκινηση νεου εξαμηνου</v-btn>
  </v-flex>
</template>

<script>
import StudentService from '@/services/StudentService'
import UserService from '@/services/UserService'
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
        await StudentService.deleteStudent(arithmosMitroou)
      } catch (error) {
        window.alert(error)
      }
    },
    async semesterBegin () {
      let semester = await UserService.semesterBegin()
      console.log(semester)
    }
  }
}
</script>

<style scoped>
</style>
