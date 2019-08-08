<template>
  <v-container fluid grid-list-md>
    <v-data-iterator
      :items="courses.courses"
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
          <v-card>
            <v-card-title><h4>{{ props.item.name }}</h4></v-card-title>
            <v-divider></v-divider>
            <v-list dense>
              <v-list-tile>
                <v-list-tile-content>Παρουσίες:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ '-' }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Βαθμολογία:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ '-' }}</v-list-tile-content>
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
  mounted () {
    this.getCurrentStudent()
    this.getAllCourses()
  },
  methods: {
    async getCurrentStudent () {
      let all = await StudentService.getAllStudents()
      for (let i = 0; i < all.length; i++) {
        if (all[i].name === this.$store.getters.user.name) {
          this.student[0] = all[i]
          console.log(this.student[0])
          return this.student[0]
        }
      }
    },
    async getAllCourses () {
      let allcourses = await CourseService.getAllCourses()
      for (let i = 0; i < allcourses.length; i++) {
      if (this.student[0].studentCourses.indexOf(allcourses.courses[i].courseCode) >= 0) {
      this.courses.push(allcourses.courses[i])
      }
      }
      console.log(this.courses.length)
      console.log(allcourses.courses[0].courseCode)
      console.log(this.student[0].studentCourses)
    }
  }
}
</script>
