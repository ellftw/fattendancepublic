<template>
    <div>
        <h3>
            Mathima - 05568 Athlitiki Eidiseografia II
        </h3>
        <!-- <button class="button" v-on:click="changeTitle"> Allakse Kathigiti
        </button> -->
        <h4 >
            Kathigitis : {{teacher}}
        </h4>
        <li v-if="!studentsLoading" class="li"  v-for="student in this.students" :key="student.arithmosMitroou" v-bind:style="[student.present ? {'color': 'green', 'textShadow': '2px 2px 4px white'} : {'color':'red', 'textShadow': '2px 2px 4px black'}]">
            {{student.surname}}
            {{student.name}}
            {{student.arithmosMitroou}}
        </li>
        <!-- Vres mathiti an einai parwn : {{parwnSearch}} -->
        <!-- <p v-bind:class="parwnSearch">
        <input type="text" v-on:input="parwnSearch = $event.target.value">
        </p> -->
        <button class="button" type="submit" v-on:click="onClickListStudents()">List Students</button>
    </div>
</template>

<script>
import UserService from '@/services/user.js'
export default {
  name: 'MathimaView',
  data () {
    return {
      students: [],
      teacher: 'Raptopoulos',
      studentsLoading: false
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
