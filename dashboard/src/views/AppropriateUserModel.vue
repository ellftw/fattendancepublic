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
      expand: false
    }
  },
  methods: {
    async getNonModeledUsers () {
      try {
        let allUsers = await UserService.getAllUsers()
        let teachers = await TeacherService.getAllTeachers()
        let students = await StudentService.getAllStudents()
        let users = []
        let j = 0
        let k = 0 
        console.log(allUsers[0].name)
        console.log(teachers[0].name)
        console.log(students[0].name)
       
        console.log(users)
      } catch (error) {
        window.alert(error)
        console.log(error)
      }
    }
  },
  mounted () {
    this.getNonModeledUsers()
  }
}
</script>

<style>
</style>
