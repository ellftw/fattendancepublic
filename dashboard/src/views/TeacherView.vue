<template>
  <v-container align-center grid-list-md>
    <v-layout row wrap>
      <v-flex xs12>
        <h1>Καλωσηρθες {{this.$store.getters.user.name}} {{this.$store.getters.user.surname}}</h1>
        <v-data-table :headers="headers" :items="courses" class="elevation-8">
          <template slot="items" slot-scope="props">
            <td>{{ props.item.courseCode }}</td>
            <td>{{ props.item.name }}</td>
            <td>{{ props.item.numberOfLessons }}</td>
            <td>{{ props.item.subscribed }}</td>
            <td>{{ props.item.semester }}</td>
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
          value: 'subscribed',
          sortable: true
        },
        { text: 'Εξάμηνο', value: 'semester', sortable: true }
      ],
      courses: [],
      attends: []
    }
  },
  methods: {
    async getCoursesForTeacher (email) {
      try {
        const response = await TeacherService.getCoursesForTeacher(this.$store.getters.user.email)
        for (let i = 0; i < response.courseList.length; i++) {
          this.courses.push({
            courseCode: response.courseList[i].courseCode,
            name: response.courseList[i].name,
            numberOfLessons: response.courseList[i].numberOfLessons,
            semester: response.courseList[i].semester,
            subscribed: 0
          })
        }
        const allstudents = await StudentService.getAllStudents()
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
        window.alert(error)
      }
    }
  },
  mounted () {
    this.getCoursesForTeacher(this.$store.getters.user.email)
  }
}
</script>

<style scoped>
</style>
