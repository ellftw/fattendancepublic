<template>
  <v-container align-center grid-list-md>
    <v-layout row wrap>
      <v-flex xs12>
        <h1 @click="test($store.getters.user)">Καλωσηρθες {{this.$store.getters.user.name}} {{this.$store.getters.user.surname}}</h1>
        <v-data-table :headers="headers" :items="courses" class="elevation-8">
          <template slot="items" slot-scope="props">
            <td>{{ props.item.courseCode }}</td>
            <td>{{ props.item.name }}</td>
            <td>{{ props.item.numberOfLessons }}</td>
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
          value: 'courseCode',
          sortable: true
        },
        { text: 'Όνομα Μαθήματος', value: 'name', sortable: true },
        { text: 'Αριθμός Μαθημάτων', value: 'numberOfLessons', sortable: true },
        {
          text: 'Αριθμός Εγγεγραμμένων',
          value: 'SignedStudents',
          sortable: true
        }
      ],
      courses: []
    }
  },
  methods: {
    async getCoursesForTeacher (email) {
      try {
        const response = await TeacherService.getCoursesForTeacher(this.$store.getters.user.email)
        console.log(response)
        this.courses = response.courseList
      } catch (error) {
        window.alert(error)
      }
    },
    test (a) {
      console.log(a)
    }
  },
  mounted () {
    this.getCoursesForTeacher(this.$store.getters.user.email)
  }
}
</script>

<style scoped>
</style>
