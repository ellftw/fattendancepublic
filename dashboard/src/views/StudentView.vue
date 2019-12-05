<template>
<!-- eslint-disable -->
  <v-container fluid grid-list-md>
    <v-data-iterator
      :items="courses"
      :rows-per-page-items="rowsPerPageItems"
      :pagination.sync="pagination"
      content-tag="v-layout"
      row
      wrap
    >
      <template v-slot:item="props">
        <v-flex
          xs12
          sm6
          md4
          lg3
        >
          <v-card >
            <v-card-title><h4>{{ props.item.name }}<br>{{props.item.courseCode }}</h4></v-card-title>
            <v-divider></v-divider>
            <v-list dense >
              <v-list-tile>
                <v-list-tile-content>Παρουσίες:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{props.item.attends}}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Εξάμηνο:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.semester }}</v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-flex>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
import StudentService from '@/services/StudentService'
import CourseService from '@/services/CourseService'
export default {
  data: () => ({
    rowsPerPageItems: [4, 8, 12],
    pagination: {
      rowsPerPage: 4
    },
    student: [],
    courses: []
  }),
  beforeMount () {
    this.getCurrentStudent()
    this.getAllCourses()
  },
  methods: {
    async getCurrentStudent () {
      let all = await StudentService.getAllStudents()
      for (let i = 0; i < all.length; i++) {
        if (all[i].email === this.$store.getters.user.email) {
          this.student[0] = all[i]
          return this.student[0]
        }
      }
    },
    async getAllCourses () {
      let allcourses = await CourseService.getAllCourses()
      for (let i = 0; i < allcourses.courses.length; i++) {
        if (this.student[0].studentCourses.indexOf(allcourses.courses[i].courseCode) > -1) {
          this.courses.push({
            name: allcourses.courses[i].name,
            courseCode: allcourses.courses[i].courseCode,
            semester: allcourses.courses[i].semester,
            attends: ''})
        }
      }
      for (let j = 0; j < this.courses.length; j++) {
        for (let i = 0; i < this.student[0].attendance.length; i++) {
          if (this.courses[j].courseCode === this.student[0].attendance[i].course) {
            this.courses[j].attends = this.student[0].attendance[i].attends
          }
        }
      }
    }
  }
}
</script>
