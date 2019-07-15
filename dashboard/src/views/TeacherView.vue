<template>
    <v-container align-center grid-list-md>
      <v-layout row wrap>
        <v-flex xs12>
            <h1>Καλωσηρθες {{this.$store.getters.user.name}} {{this.$store.getters.user.surname}} </h1>
        <!-- <h3>
            Mathima - 05568 Athlitiki Eidiseografia II
        </h3>
        <p>
            Kathigitis : {{teacher}}
        </p> -->
        <!-- <ul v-if="showStudents">
          <li class="li"  v-for="student in this.students" :key="student.arithmosMitroou" :style="[student.present ? {'color': 'green', 'textShadow': '2px 2px 4px white'} : {'color':'red', 'textShadow': '2px 2px 4px black'}]">
              {{student.surname}}
              {{student.name}}
              {{student.arithmosMitroou}}
          </li>
        </ul> -->
        <v-data-table
          :headers="headers"
          :items="subjects"
          class="elevation-8">
          <template slot="items" slot-scope="props">
            <td>{{ props.item.kwdikosMathimatos }}</td>
            <td>{{ props.item.name }}</td>
          </template>
        </v-data-table>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs6>
        <v-btn round color="blue-grey" @click="onClickListSubjects()">List Subjects</v-btn>
        <v-btn round color="blue-grey" @click="onClickListLectures()">List Lectures</v-btn>
        </v-flex>
        <v-flex xs6>
        </v-flex>
      </v-layout>
    </v-container>
</template>
<script>
import UserService from '@/services/UserService.js'
export default {
  name: 'TeacherView',
  data () {
    return {
      subjects: [],
      teacher: { name: 'Κλεφτης', surname: 'Κλεφτη', email: 'ilove.xounta1967@greekarmy.com' },
      subjectsLoading: false,
      lecturesLoading: false,
      headers: [
        {
          text: 'Kwdikos Mathimatos',
          sortable: true,
          value: 'kwdikosMathimatos'
        },
        { text: 'Onoma', value: 'name' }
      ]
    }
  },
  methods: {
    async onClickListSubjects () {
      this.subjectsLoading = true
      try {
        this.subjects = await UserService.getSubjectsForTeacher(this.$store.getters.user)
      } catch (error) {
        alert(error)
      }
      this.subjectsLoading = false
    },
    async onClickListLectures () {
      this.lecturesLoading = true
      try {
        this.subjects = await UserService.getLecturesForSubject(this.subjects)
      } catch (error) {
        alert(error)
      }
      this.lecturesLoading = false
    }
  }
}
</script>

<style scoped>
</style>
