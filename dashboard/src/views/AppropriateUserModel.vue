<template>
  <v-container fluid>
    <v-layout justify-center align-center>
      <v-flex xs12 pt-5 mt-5 text-xs-center>
        <h1 class="heading pb-5 mb-5">This page is in order to verify users that have signed up but they dont have their appropriate model</h1>
        <v-dialog v-model="dialog1" persistent max-width="700">
      <template v-slot:activator="{ on }">
        <v-btn round large dark v-on="on">Verify Teacher</v-btn>
      </template>
      <v-card>
      <v-card-title>
          <span class="headline">Teacher</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md6>
                <v-text-field v-model="teacher.name" label="Legal first name*" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field
                  label="Legal last name*"
                  persistent-hint
                  v-model="teacher.surname"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="teacher.email" label="Email*" required></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog1 = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="dialog1 = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog2" persistent max-width="700">
      <template v-slot:activator="{ on }">
        <v-btn round large dark v-on="on">Verify Student</v-btn>
      </template>
      <v-card>
      <v-card-title>
          <span class="headline">Student</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md6>
                <v-text-field v-model="student.name" label="Legal first name*" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field
                  v-model="student.surname"
                  label="Legal last name*"
                  persistent-hint
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="student.email" label="Email*" required></v-text-field>
              </v-flex>
                <v-flex xs12 sm6 md6>
                <v-text-field
                  v-model="student.arithmosMitroou"
                  label="Student Number*"
                  persistent-hint
                  disabled
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field
                  v-model="student.semester"
                  label="Semester*"
                  persistent-hint
                  disabled
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12 text-xs-center>
                <v-icon class="material-icons" style="border:2px solid; padding:18px; border-radius:2px" size="72">fingerprint</v-icon>
                <h1 class="heading font-weight-light">Fingerprint ID verify</h1>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog2 = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="dialog2 = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import StudentService from '@/services/StudentService'
export default {
  data () {
    return {
      dialog1: false,
      dialog2: false,
      teacher: {
        name: '',
        surname: '',
        email: '',
        teachingCourses: []
      },
      student: {
        name: '',
        surname: '',
        semester: 1,
        studentCourses: [],
        fingerprintID: '',
        arithmosMitroou: ''
      },
      allstudents: []
    }
  },
  beforeMount () {
    this.getStudentNumber()
  },

  methods: {
    async getStudentNumber () {
      try {
        this.allstudents = await StudentService.getAllStudents()
        this.student.arithmosMitroou = this.allstudents[0].arithmosMitroou + 1
      } catch (error) {
        window.alert(error)
      }
    }
  }

}
</script>

<style>

</style>
