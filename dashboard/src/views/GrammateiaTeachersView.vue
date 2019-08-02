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
        { text: 'Διδάσκοντα Μαθήματα', value: 'teachingCourses' }
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
    // async deleteStudent (arithmosMitroou) {
    //   try {
    //     let deletedStudent = await StudentService.deleteStudent(arithmosMitroou)
    //     if (deletedStudent && deletedStudent.ok === 1) {
    //       this.students = this.students.filter((sd) => sd.arithmosMitroou !== arithmosMitroou)
    //     }
    //   } catch (error) {
    //     window.alert(error)
    //   }
    // }
  }
}
</script>

<style>

</style>
