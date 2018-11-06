<template>
    <v-container align-center grid-list-md>
      <v-layout row wrap>
        <v-flex xs12>
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
          :items="students"
          class="elevation-8">
          <template slot="items" slot-scope="props">
            <td>{{ props.item.arithmosMitroou }}</td>
            <td>{{ props.item.surname }}</td>
            <td>{{ props.item.name }}</td>
          </template>
        </v-data-table>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs6>
        <v-btn @click="onClickListStudents()">List Students</v-btn>
        </v-flex>
        <v-flex xs6>
        <v-btn @click="showStudents = !showStudents">Toggle Students</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
</template>
<script>
import UserService from '@/services/UserService.js'
export default {
  name: 'MathimaView',
  data () {
    return {
      showStudents: true,
      students: [],
      teacher: 'Raptopoulos',
      studentsLoading: false,
      headers: [
        {
          text: 'Arithmos Mitroou',
          sortable: true,
          value: 'arithmosMitroou'
        },
        { text: 'Onoma', value: 'name' },
        { text: 'Epitheto', value: 'surname' }
      ]
    }
  },
  methods: {
    async onClickListStudents () {
      this.studentsLoading = true
      try {
        this.students = await UserService.getAllStudents()
        console.log(this.students)
      } catch (error) {
        alert(error)
      }
      this.studentsLoading = false
    }
  }
}
</script>

<style scoped>
</style>
