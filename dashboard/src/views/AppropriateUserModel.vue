<template>
  <div>
    <v-card>
      <v-card-title>
        Πινακας μη καταχωρημενων χρηστων
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="UnlistedUsers" :search="search" :expand="expand" item-key="name">
        <template v-slot:items="props">
          <tr @click="props.expanded = !props.expanded">
            <td>{{ props.item.name }}</td>
            <td class="text-xs-left">{{ props.item.surname }}</td>
            <td class="text-xs-left">{{ props.item.email }}</td>
            <td class="text-xs-left">{{ props.item.userType }}</td>
            <td class="text-xs-left">{{ props.item.fingerprintID }}</td>
          </tr>
        </template>
        <template v-slot:no-results>
          <v-alert
            :value="true"
            color="error"
            icon="warning"
          >Your search for "{{ search }}" found no results.</v-alert>
        </template>
        <template v-slot:expand="props" >
          <v-card flat v-if="props.item.userType==='καθηγητής'">
          <v-card-text><v-card style="background: linear-gradient(to bottom, #323232 0%, #3F3F3F 40%, #1C1C1C 150%), linear-gradient(to top, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.25) 200%);
          background-blend-mode: multiply;">
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs6 >
                <v-text-field disabled v-model="newTeacher.name" label="name" :placeholder="props.item.name"></v-text-field>
              </v-flex>
              <v-flex xs6 >
                <v-text-field disabled v-model="newTeacher.surname" label="surname" :placeholder="props.item.surname"></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field disabled v-model="newTeacher.email" label="E-mail" :placeholder="props.item.email"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="createTeacher(props.item.name, props.item.surname, props.item.email)">Create</v-btn>
        </v-card-actions>
      </v-card></v-card-text></v-card>
          <v-card flat v-else>
          <v-card-text><v-card style="background: linear-gradient(to bottom, #323232 0%, #3F3F3F 40%, #1C1C1C 150%),linear-gradient(to top, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.25) 200%);
          background-blend-mode: multiply;">
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs6 >
                <v-text-field disabled v-model="newStudent.name" label="name" :placeholder="props.item.name"></v-text-field>
              </v-flex>
              <v-flex xs6 >
                <v-text-field disabled v-model="newStudent.surname" label="surname" :placeholder="props.item.surname"></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field disabled v-model="newStudent.email" label="E-mail" :placeholder="props.item.email"></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field v-model="newStudent.arithmosMitroou" label="Student Number" placeholder="newStudent.arithmosMitroou"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field v-model="newStudent.semester" label="semester"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="createStudent(props.item.name, props.item.surname, props.item.email, newStudent.arithmosMitroou, newStudent.semester)">Create</v-btn>
        </v-card-actions>
      </v-card></v-card-text>
          </v-card>
        </template>
      </v-data-table>
    </v-card>
    <v-btn class="mb-5 mt-4" round @click="getNonModeledTeachers()">list Teachers</v-btn>
    <v-btn class="mb-5 mt-4" round @click="getNonModeledStudents()">list Students</v-btn>
  </div>
</template>

<script>
import StudentService from '@/services/StudentService'
import TeacherService from '@/services/TeacherService'
import UserService from '@/services/UserService'
export default {
  data () {
    return {
      headers: [
        { text: 'Όνομα', value: 'name', sortable: true },
        { text: 'Επίθετο', value: 'surname', sortable: true },
        { text: 'Email', value: 'email', sortable: true },
        { text: 'Τύπος Χρήστη', value: 'userType', sortable: true },
        { text: 'Δακτυλικο αποτυπωμα', value: 'fingerprintID', sortable: true }
      ],
      users: [],
      teachers: [],
      students: [],
      UnlistedUsers: [],
      search: '',
      expand: true,
      newStudent: {
        name: '',
        surname: '',
        email: '',
        studentCourses: [],
        semester: 1,
        attendance: [],
        arithmosMitroou: ''
      },
      newTeacher: {
        email: '',
        name: '',
        surname: '',
        teachingCourses: []
      }
    }
  },
  beforeMount () {
    this.getStudentNumber()
  },

  methods: {
    async getAllUsers () {
      try {
        this.users = await UserService.getAllUsers()
      } catch (error) {
        console.log(error)
      }
    },
    async getAllTeachers () {
      try {
        this.teachers = await TeacherService.getAllTeachers()
      } catch (error) {
        console.log(error)
      }
    },
    async getAllStudents () {
      try {
        this.students = await StudentService.getAllStudents()
      } catch (error) {
        console.log(error)
      }
    },
    async getNonModeledTeachers () {
      let u = []
      let t = []
      for (let i = 0; i < this.users.length; i++) {
        u.push(this.users[i].email)
      }
      for (let i = 0; i < this.teachers.length; i++) {
        t.push(this.teachers[i].email)
      }
      for (let i = 0; i < u.length; i++) {
        if (this.users[i].userType === 'καθηγητής' && t.indexOf(u[i]) === -1) {
          this.UnlistedUsers.push(this.users[i])
        }
      }
    },
    async getNonModeledStudents () {
      let u = []
      let s = []
      for (let i = 0; i < this.users.length; i++) {
        u.push(this.users[i].email)
      }
      for (let i = 0; i < this.students.length; i++) {
        s.push(this.students[i].email)
      }
      for (let i = 0; i < u.length; i++) {
        if (this.users[i].userType === 'σπουδαστής' && s.indexOf(u[i]) === -1) {
          this.UnlistedUsers.push(this.users[i])
        }
      }
    },
    async getStudentNumber () {
      let am = []
      let as = await StudentService.getAllStudents()
      for (let i = 0; i < as.length; i++) {
        am.push(as[i].arithmosMitroou)
        am.sort(function (a, b) { return b - a })
      }
      this.newStudent.arithmosMitroou = am[0] + 1
    },
    async createStudent (name, surname, email, arithmosMitroou, semester) {
      let ns = {
        name: name,
        surname: surname,
        email: email,
        studentCourses: [],
        semester: semester,
        attendance: [],
        arithmosMitroou: arithmosMitroou
      }
      let response = await StudentService.createStudent(ns)
      try {
        if (response.success === true) {
          window.alert('Successfully modeled student')
          location.reload(true)
        }
      } catch (error) {
        console.log(error)
      }
    },
    async createTeacher (name, surname, email) {
      let nt = {
        email: email,
        name: name,
        surname: surname,
        teachingCourses: []
      }
      let response = await TeacherService.createNewTeacher(nt)
      try {
        if (response.success === true) {
          window.alert('Successfully modeled teacher')
          location.reload(true)
        }
      } catch (error) {
        console.log(error)
      }
    },
    async getNonFingerprintEnrolledUsers () {
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].fingerprintID === 0) {
          this.UnlistedUsers.push(this.users[i])
        }
      }
    }
  },
  mounted () {
    this.getAllUsers()
    this.getAllTeachers()
    this.getAllStudents()
    this.getStudentNumber()
  }

}
</script>

<style>

</style>
