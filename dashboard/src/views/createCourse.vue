<template>
  <v-container>
    <v-layout xs10 offset-xs1>
      <v-flex xs6 offset-xs3>
        <form>
          <v-text-field
            v-model="Course.name"
            label="Name"
            required
          ></v-text-field>
          <v-text-field
            v-model="Course.courseCode"
            label="CourseCode"
            required
          ></v-text-field>
          <v-text-field
            v-model="Course.numberOfLessons"
            label="Number Of Lessons"
          ></v-text-field>
          <v-btn round>Cancel</v-btn>
          <v-btn round @click="createCourse()">OK</v-btn>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import TeacherService from '@/services/TeacherService'
import CourseService from '@/services/CourseService'
export default {
  data () {
    return {
      Course: {
        name: '',
        courseCode: '',
        numberOfLessons: ''
      }
    }
  },
  methods: {
    async createCourse (course) {
      try {
        await CourseService.createCourse(this.Course)
      } catch (error) {
        window.alert(error)
      }
    }
  }
}
</script>
<style>
</style>
