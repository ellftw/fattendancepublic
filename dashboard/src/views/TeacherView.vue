<template>
  <v-container align-center grid-list-md>
    <v-layout row wrap>
      <v-flex xs12>
        <h1>Καλωσηρθες {{this.$store.getters.user.name}} {{this.$store.getters.user.surname}}</h1>
        <v-data-table :headers="headers" :items="subjects" class="elevation-8">
          <template slot="items" slot-scope="props">
            <td>{{ props.item.subjectCode }}</td>
            <td>{{ props.item.name }}</td>
            <td>{{ props.item.NumberOfLessons }}</td>
            <td>{{ props.item.SignedStudents }}</td>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs6>
        <v-btn round href="/#/createSubject">Create new subject</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
// import UserService from '@/services/UserService.js'
import TeacherService from '@/services/TeacherService.js'
export default {
  name: 'TeacherView',
  data () {
    return {
      subjectsLoading: false,
      lecturesLoading: false,
      headers: [
        {
          text: 'Κωδικός Μαθήματος',
          value: 'subjectCode',
          sortable: true
        },
        { text: 'Όνομα Μαθήματος', value: 'name', sortable: true },
        { text: 'Αριθμός Μαθημάτων', value: 'NumberOfLessons', sortable: true },
        {
          text: 'Αριθμός Εγγεγραμμένων',
          value: 'SignedStudents',
          sortable: true
        }
      ]
    }
  },
  methods: {
    async getSubjectForTeacher () {
      try {
        this.subjects = await TeacherService.getSubjectForTeacher()
      } catch (error) {
        window.alert(error)
      }
    }
  },
  mounted () {
    this.getSubjectForTeacher()
  }
}
</script>

<style scoped>
</style>
