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
import UserService from '@/services/UserService.js'
export default {
  name: 'AllCourses',
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
      courses: [],
      currentUser: []
    }
  },
  methods: {
    async getAllCourses () {
      try {
        const response = await CourseService.getAllCourses()
        const allteachers = await TeacherService.getAllTeachers()
        const allstudents = await StudentService.getAllStudents()
        for (let k = 0; k < allteachers.length; k++) {
          if (this.$store.getters.user.name === allteachers[k].name) {
            this.currentUser[0] = allteachers[k]
          } 
        }
        for (let j = 0; j < allstudents.length; j++) {
          if (this.$store.getters.user.name === allstudents[j].name) {
            this.currentUser[0] = allstudents[j]
          }
        }
        for (let i = 0; i < response.courses.length; i++) {
          if (this.$store.getters.user.userType === 'καθηγητής' && this.currentUser[0].teachingCourses.indexOf(response.courses[i].courseCode) === -1) {
            this.courses.push(response.courses[i])
          } else if (this.$store.getters.user.userType === 'σπουδαστής' && this.currentUser[0].studentCourses.indexOf(response.courses[i].courseCode) === -1) {
            this.courses.push(response.courses[i])
          }
        }
        console.log(this.$store.getters.user.name)
        console.log(response.courses[0].courseCode)
        console.log(this.currentUser[0])
        console.log(this.courses[0])
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
