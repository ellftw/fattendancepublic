<template>
  <div>
    <v-toolbar>
      <v-toolbar-title>Expandable Table</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="users"
      :expand="expand"
      item-key="name"
    >
      <template v-slot:items="props">
        <tr @click="props.expanded = !props.expanded">
          <td>{{ props.item.name }}</td>
          <td class="text-xs-right">{{ props.item.surname }}</td>
          <td class="text-xs-right">{{ props.item.email }}</td>
          <td class="text-xs-right">{{ props.item.userType }}</td>
        </tr>
      </template>
      <template v-slot:expand="props">
        <v-card flat>
          <v-card-text>Peek-a-boo!</v-card-text>
        </v-card>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import UserService from '@/services/UserService'
import StudentService from '@/services/StudentService'
import TeacherService from '@/services/TeacherService'
export default {
  data () {
    return {
      headers: [
        {text: 'Όνομα', value: 'name', sortable: true},
        {text: 'Επίθετο', value: 'surname', sortable: true},
        {text: 'Email', value: 'email', sortable: true},
        {text: 'Τύπος Χρήστη', value: 'userType', sortable: true}
      ],
      users: [],
      teachers: [],
      students: [],
      allUsers: [],
      expand: false
    }
  },
  methods: {
    async getAllUsers () {
      try {
        this.allUsers = await UserService.getAllUsers()
        for (let i = 0; i = this.allUsers.length; i++)
        console.log(this.allUsers[i].name)
      } catch (error) {
        window.alert(error)
      }
    },
    async getAllTeachers () {
      try {
        this.teachers = await TeacherService.getAllTeachers()
        console.log(this.teachers)
      } catch (error) {
        window.alert(error)
      }
    },
    async getAllStudents () {
      try {
        this.students = await StudentService.getAllStudents()
        console.log(this.students.name)
      } catch (error) {
        window.alert(error)
      }
    },
    async filterNonModeledUsers (users, teachers, students) {
      try {
      } catch (error) {
        window.alert(error)
      }
    }
  },
  mounted () {
    this.getAllUsers()
    this.getAllTeachers()
    this.getAllStudents()
    this.filterNonModeledUsers()
  }
}
</script>

<style>
</style>
