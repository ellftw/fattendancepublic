<template>
  <v-container align-center justify-center grid-list-md>
    <v-layout row wrap>
      <v-flex xs10 offset-xs1>
        <p class="display-3">{{selectedCourse}}</p>
        <v-data-table :headers="headers" :items="studentsToAttend" class="elevation-8">
          <template slot="items" slot-scope="props">
            <td>{{ props.item.arithmosMitroou }}</td>
            <td>{{ props.item.surname }}</td>
            <td>{{ props.item.name }}</td>
            <td>
              <v-btn
                round
                dark
                @click="postAttend(props.item.arithmosMitroou, selectedCourse, props.item.attendance.attends) "
              >Εισαγωγη παρουσιας</v-btn>
            </td>
          </template>
        </v-data-table>
        <v-dialog v-model="dialog" scrollable max-width="300px">
          <template v-slot:activator="{ on }">
            <v-btn round v-on="on" @click="getCoursesForTeacher()">Επελεξε Μαθημα</v-btn>
          </template>
          <v-card>
            <v-card-title>Select Course</v-card-title>
            <v-divider></v-divider>
            <v-card-text style="height: 300px;">
              <v-radio-group
                v-model="selectedCourse"
                column
                v-for="course in courses.courseList"
                :key="course"
              >
                <v-radio :label="course.courseCode" :value="course.courseCode"></v-radio>
              </v-radio-group>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn flat @click="dialog = false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-btn round v-if="selectedCourse" @click="getStudentsToAttend(selectedCourse)">Λιστα μαθητων</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import TeacherService from '@/services/TeacherService.js'
import StudentService from '@/services/StudentService.js'
export default {
  name: 'MathimaView',
  data () {
    return {
      dialog: false,
      dialog1: false,
      selectedCourse: '',
      courses: [],
      showStudents: true,
      students: [],
      studentsToAttend: [],
      headers: [
        {
          text: 'Αριθμός μητρώου',
          sortable: true,
          value: 'arithmosMitroou'
        },
        { text: 'Όνομα', sortable: true, value: 'name' },
        { text: 'Επίθετο', sortable: true, value: 'surname' },
        { text: 'Παρουσίες', sortable: true, value: 'attends' }
      ]
    }
  },
  methods: {
    async getCoursesForTeacher () {
      try {
        this.courses = await TeacherService.getCoursesForTeacher(
          this.$store.getters.user.email
        )
        console.log(this.courses)
      } catch (error) {
        console.log(error)
      }
    },
    async getAllStudents () {
      try {
        this.students = await StudentService.getAllStudents()
        console.log(this.students[1].attendance[0])
      } catch (error) {
        console.log(error)
      }
    },
    async getStudentsToAttend (selectedCourse) {
      let as = await StudentService.getAllStudents()
      for (let i = 0; i < as.length; i++) {
        for (let j = 0; j < as[i].attendance.length; j++) {
          if (selectedCourse.indexOf(as[i].attendance[j].course) !== -1) {
            this.studentsToAttend.push(as[i])
          }
        }
      }
    },
    async postAttend (arithmosMitroou, course, attends) {
      let sta = this.studentsToAttend.filter(
        x => x.arithmosMitroou === arithmosMitroou
      )
      try {
        for (let i = 0; i < sta[0].attendance.length; i++) {
          console.log(sta[0].attendance[i])
          if (course.indexOf(sta[0].attendance[i].course) !== -1) {
            attends = sta[0].attendance[i].attends + 1
          }
        }
      } catch (error) {
        console.log(error)
      }
      console.log(attends)
      await StudentService.postAttend(arithmosMitroou, course, attends)
    }
  },
  mounted () {
    this.getAllStudents()
  }
}
</script>

<style scoped>
</style>
