<template>
  <v-container align-center grid-list-md>
    <v-layout row wrap>
      <v-flex xs12>
        <h1>Καλωσηρθες {{this.$store.getters.user.name}} {{this.$store.getters.user.surname}}</h1>
        <v-data-table :headers="headers" :items="courses" class="elevation-8">
          <template slot="items" slot-scope="props">
            <td>{{ props.item.subjectCode }}</td>
            <td>{{ props.item.name }}</td>
            <td>{{ props.item.NumberOfLessons }}</td>
            <td>{{ props.item.SignedStudents }}</td>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs6>
        <v-btn round href="/#/createCourse">Create new course</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
// import UserService from '@/services/UserService.js'
import TeacherService from '@/services/TeacherService.js'
export default {
  name: 'TeacherView',
  data () {
    return {
      coursesLoading: false,
      lecturesLoading: false,
      headers: [
        {
          text: 'Κωδικός Μαθήματος',
          value: 'subjectCode',
          sortable: true
        },
        { text: 'Όνομα Μαθήματος', value: 'name', sortable: true },
        { text: 'Αριθμός Μαθημάτων', value: 'NumberOfLessons', sortable: true },
        {
          text: 'Αριθμός Εγγεγραμμένων',
          value: 'SignedStudents',
          sortable: true
        }
      ],
      User: {
        Name: '',
        Surname: '',
        Email: Name.substring(0, 4) + '.' + Surname.substring(0, 4) + '@tei.edu',
        Password: '',
        userType: ''
      }
    }
  },
  methods: {
    async getCourseForTeacher () {
      try {
        this.courses = await TeacherService.getCourseForTeacher()
      } catch (error) {
        window.alert(error)
      }
    }
  },
  mounted () {
    this.getCourseForTeacher()
    console.log(this.$store.getters.user)
  }
}
</script>

<style scoped>
</style>
