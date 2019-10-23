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
            <td>{{ signedStudents }}</td>
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
import StudentService from '@/services/StudentService.js'
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
      courses: [],
      signedStudents: []
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
    // async getSignedStudents () {
    //   let courses = await TeacherService.getCoursesForTeacher(this.$store.getters.user.email)
    //   console.log(courses)
    //   for (let i=0; i=allStudents.length; i++) {
    //     for (let j=0; j=courses.length; j++) {
    //       this.signedStudents[j] = 0
    //       if (allStudents[i].studentCourses.includes(courses[j]))
    //       this.signedStudents[j] = this.signedStudents[j]++
    //     }
    //   }
    // },
    async getAllStudentCourses () {
      try {
        let allStudents = await StudentService.getAllStudents()
        console.log(allStudents[26].studentCourses)
      } catch (error) {
        console.log(error)
      }
    }
  },
  mounted () {
    this.getCoursesForTeacher(this.$store.getters.user.email)
    this.getAllStudentCourses()
  }
}
</script>

<style scoped>
</style>
