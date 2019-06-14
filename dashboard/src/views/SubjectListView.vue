<template>
    <v-container align-center grid-list-md>

      <v-layout row wrap>
        <v-flex xs12>

          <v-data-table :headers="headers" :items="subjects" item-key="kwdikosMathimatos" class="elevation-8">
            <template slot="items" slot-scope="props">
              <tr @click="props.expanded = !props.expanded">
                <td>{{ props.item.name }}</td>
                <td>{{ props.item.kwdikosMathimatos }}</td>
                <td> Unavailable </td>
              </tr>
            </template>
            <template slot="expand" slot-scope="props">
              <v-card>
                <v-card-text>Μάθημα 1ο</v-card-text>
                <v-card-action><v-btn>Hello</v-btn></v-card-action>
              </v-card>
              <v-card flat>
                <v-card-text>Μάθημα 2ο</v-card-text>
              </v-card>
              <v-card flat>
                <v-card-text>Μάθημα 3ο</v-card-text>
              </v-card>
            </template>
          </v-data-table>

        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex xs6>
        <v-btn round @click="onClickListSubjects()">List Subjects</v-btn>
        </v-flex>
        <v-flex xs6>
          <v-btn round href="/#/createSubject">Create new subject</v-btn>
        </v-flex>
      </v-layout>

    </v-container>
</template>

<script>
import SubjectService from '@/services/SubjectService.js'
export default {
  name: 'SubjectList',
  data () {
    return {
      subjects: [],
      subjectsLoading: false,
      headers: [
        { text: 'Όνομα Μαθήματος', value: 'name' },
        {
          text: 'Κωδικός Μαθήματος',
          sortable: true,
          value: 'kwdikosMathimatos'
        },
        {
          text: 'Σύνολο Μαθημάτων',
          value: 'synoloMathimaton'
        }
      ]
    }
  },
  methods: {
    async onClickListSubjects () {
      this.subjectsLoading = true
      try {
        let teacher = this.$store.getters.user
        this.subjects = await SubjectService.getSubjectsForTeacher(teacher)
      } catch (error) {
        alert(error)
      }
      this.subjectsLoading = false
    }
  }
}
</script>

<style scoped>
</style>
