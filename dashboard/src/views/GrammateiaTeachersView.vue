<template>
    <v-layout>
        <v-flex xs8 offset-xs2 pt-3>
            <v-card>
      <v-card-title>
        Πίνακας Καθηγητών γραμματείας
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="teachers" :search="search">
        <template slot="items" slot-scope="props">
          <td>{{ props.item.surname}}</td>
          <td class="text-xs-left">{{ props.item.name }}</td>
          <td class="text-xs-left">{{ props.item.teachingCourses }}</td>
          <td class="text-xs-left">{{ props.item.email }}</td>
          <td class="text-xs-left"><v-dialog v-model="dialog" persistent max-width="290">
                <template v-slot:activator="{ on }">
                  <v-btn round dark v-on="on">διαγραφη</v-btn>
                </template>
                <v-card>
                  <v-card-title class="headline">Διαγραφη Καθηγητη</v-card-title>
                  <v-card-text>Η διαδικασια ειναι μη ανατρεψιμη. Ειστε σιγουροι οτι θελετε να διαγραψετε τον συγκεκριμενο καθηγητη;         
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="pink darken-1" flat @click="dialog = false">Disagree</v-btn>
                    <v-btn color="pink darken-1" flat @click="deleteTeacher(props.item.email)">Agree</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog></td>
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
    </v-layout>
</template>

<script>
import TeacherService from '@/services/TeacherService'
export default {
  name: 'Teachers',
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
        { text: 'Διδάσκοντα Μαθήματα', value: 'teachingCourses' },
        { text: 'Email', value: 'email' },
        { text: 'Επιλογές', value: '' }
      ],
      teachers: []

    }
  },
  watch: {},
  mounted () {
    this.getAllTeachers()
  },
  methods: {
    async getAllTeachers () {
      try {
        this.teachers = await TeacherService.getAllTeachers()
        console.log(this.teachers)
      } catch (error) {
        window.alert(error)
      }
    },
    async deleteTeacher (email) {
      try {
        let deletedTeacher = await TeacherService.deleteTeacher(email)
        if (deletedTeacher && deletedTeacher.ok === 1) {
          this.teachers = this.teachers.filter((sd) => sd.email !== email)
        } this.dialog = false
      } catch (error) {
        window.alert(error)
      }
    }
  }
}
</script>

<style>

</style>
