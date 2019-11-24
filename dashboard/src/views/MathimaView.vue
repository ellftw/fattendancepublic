<template>
  <v-container align-center justify-center grid-list-md>
    <v-layout row wrap>
      <v-flex xs10 offset-xs1>
        <p class="display-3">{{selectedCourse}}</p>
        <v-data-table :headers="headers" :items="studentsToAttend" class="elevation-8" >
          <template slot="items" slot-scope="props">
            <td>{{ props.item.arithmosMitroou }}</td>
            <td>{{ props.item.surname }}</td>
            <td>{{ props.item.name }}</td>
            <td>{{ props.item.attendance[props.item.index].attends}}</td>
            <td>
              <v-btn
                round
                dark
                @click="postAttend(props.item.arithmosMitroou, selectedCourse) "
              >Εισαγωγη παρουσιας</v-btn>
              </td>
          </template>
        </v-data-table>
        <v-dialog v-model="dialog" persistent scrollable max-width="300px">
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
import FingerprintService from '@/services/FingerprintService.js'
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
        { text: 'Παρουσίες', sortable: true, value: 'attends' },
        { text: 'Επιλογές', sortable: true, value: '' }
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
            this.studentsToAttend.push({
              arithmosMitroou: as[i].arithmosMitroou,
              attendance: as[i].attendance,
              email: as[i].email,
              name: as[i].name,
              semester: as[i].semester,
              studentCourses: as[i].studentCourses,
              surname: as[i].surname,
              index: 0
            })
          }
        }
      }
      this.getAttendIndex()
    },
    async postAttend (arithmosMitroou, course) {
      try {
        let index = ''
        let response1 = await StudentService.postAttend(arithmosMitroou, course)
        let response2 = await FingerprintService.createFingerprint(69)
        for (let i = 0; i < this.studentsToAttend.length; i++) {
          if (this.studentsToAttend[i].arithmosMitroou === arithmosMitroou) {
            index = i
          }
        }
        console.log(index)
        console.log(this.studentsToAttend[index])
        if (response1.success === true || response2.success === true) {
          this.studentsToAttend.splice(index, 1)
        }
      } catch (error) {
        console.log(error)
      }
    },
    async getAttendIndex () {
      for (let i = 0; i < this.studentsToAttend.length; i++) {
        for (let j = 0; j < this.studentsToAttend[i].attendance.length; j++) {
          if (this.studentsToAttend[i].attendance[j].course === this.selectedCourse) {
            this.studentsToAttend[i].index = j
          }
        }
      }
    }
  },
  mounted () {
    this.getAllStudents()
  }
}
</script>

<style scoped>
</style>
