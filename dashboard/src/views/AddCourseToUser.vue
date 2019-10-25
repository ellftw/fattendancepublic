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
            <td>{{ props.item.subscribed }}</td>
            <td>
              <v-btn round @click="addCourseToUser(props.item.courseCode)">Add Course</v-btn>
            </td>
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
          value: 'subscribed',
          sortable: true
        },
        {
          text: 'Επιλογή',
          value: '',
          sortable: false
        }
      ],
      courses: [],
      currentUser: [],
      attends: []
    }
  },
  methods: {
    async getAllCourses () {
      try {
        const response = await CourseService.getAllCourses()
        const allteachers = await TeacherService.getAllTeachers()
        const allstudents = await StudentService.getAllStudents()
        for (let k = 0; k < allteachers.length; k++) {
          if (this.$store.getters.user.email === allteachers[k].email) {
            this.currentUser.push({
              email: allteachers[k].email,
              name: allteachers[k].name,
              surname: allteachers[k].surname,
              teachingCourses: allteachers[k].teachingCourses
            })
          }
        }
        for (let j = 0; j < allstudents.length; j++) {
          if (this.$store.getters.user.email === allstudents[j].email) {
            this.currentUser.push({
              arithmosMitroou: allstudents[j].arithmosMitroou,
              attendance: allstudents[j].attendance,
              email: allstudents[j].email,
              name: allstudents[j].name,
              surname: allstudents[j].surname,
              semester: allstudents[j].semester,
              studentCourses: allstudents[j].studentCourses
            })
          }
        }
        for (let i = 0; i < response.courses.length; i++) {
          if (
            this.$store.getters.user.userType === 'καθηγητής' &&
            this.currentUser[0].teachingCourses.indexOf(
              response.courses[i].courseCode
            ) === -1
          ) {
            this.courses.push({
              courseCode: response.courses[i].courseCode,
              name: response.courses[i].name,
              numberOfLessons: response.courses[i].numberOfLessons,
              subscribed: 0
            })
          }
          if (
            this.$store.getters.user.userType === 'σπουδαστής' &&
            this.currentUser[0].studentCourses.indexOf(
              response.courses[i].courseCode
            ) === -1
          ) {
            this.courses.push({
              courseCode: response.courses[i].courseCode,
              name: response.courses[i].name,
              numberOfLessons: response.courses[i].numberOfLessons,
              subscribed: 0
            })
          }
        }
        for (let i = 0; i < allstudents.length; i++) {
          for (let j = 0; j < allstudents[i].attendance.length; j++) {
            this.attends.push({
              course: allstudents[i].attendance[j].course,
              attends: allstudents[i].attendance[j].attends
            })
          }
        }
        for (let i = 0; i < this.courses.length; i++) {
          for (let j = 0; j < this.attends.length; j++) {
            if (this.courses[i].courseCode.indexOf(this.attends[j].course) !== -1) {
              this.courses[i].subscribed = this.courses[i].subscribed + 1
            }
          }
        }
      } catch (error) {
        console.log(error)
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
        if (courseToAdd.success === true) {
          location.reload(true)
        }
      } else {
        let courseToAdd = await StudentService.addCourseToStudent(theeCourse)
        console.log(courseToAdd)
        if (courseToAdd.success === true) {
          location.reload(true)
        }
        console.log(this.courses)
        console.log(this.currentUser)
      }
    }
  },
  mounted () {
    this.getAllCourses()
    console.log(this.currentUser)
  }
}
</script>

<style scoped>
</style>
