<template>
  <v-container align-center grid-list-md>
    <v-layout row wrap>
      <v-flex xs12>
        <h1>Όλα τα μαθήματα</h1>
        <v-data-table :headers="headers" :items="courses" class="elevation-8">
          <template slot="items" slot-scope="props">
            <td>{{ props.item.courseCode }}</td>
            <td>{{ props.item.name }}</td>
            <td>{{ props.item.numberOfLessons }}</td>
            <td>{{ props.item.SignedStudents }}</td>
            <td><v-btn round @click="addCourseToUser(props.item.courseCode)">Add Course</v-btn></td>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import StudentService from '@/services/StudentService.js'
import TeacherService from '@/services/TeacherService.js'
import CourseService from '@/services/CourseService.js'
export default {
  name: 'All courses',
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
        },
        {
          text: 'Επιλογή',
          value: '',
          sortable: false
        }
      ],
      courses: []
    }
  },
  methods: {
    async getAllCourses () {
      try {
        const response = await CourseService.getAllCourses()
        this.courses = response.courses
      } catch (error) {
        window.alert(error)
      }
    },
    async addCourseToUser (courseCode) {
      const mail = this.$store.getters.user.email
      let theeCourse = {
        email: mail,
        courseCode: courseCode
      }
      if (this.$store.getters.user.userType === 'καθηγητής') {
        let courseToAdd = await TeacherService.addCourseToTeacher(theeCourse)
        if (courseToAdd && courseToAdd.ok === 1) {
          this.courses = this.courses.filter((c) => c.courseCode !== courseCode)
          console.log(this.courses)
        }
      } else {
        let courseToAdd = await StudentService.addCourseToStudent(theeCourse)
        if (courseToAdd && courseToAdd.ok === 1) {
          this.courses = this.courses.filter((c) => c.courseCode !== courseCode)
          console.log(this.courses)
        }
      }
    }
  },
  mounted () {
    this.getAllCourses()
  }
}
</script>

<style scoped>
</style>
