<template>
  <v-container>
    <v-layout xs10 offset-xs1 pt-3>
      <v-flex xs6 offset-xs3>
        <v-form class="form">
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
          <v-text-field
            v-model="Course.semester"
            label="Semester"
          ></v-text-field>
          <v-btn round>Cancel</v-btn>
          <v-btn round @click="createCourse(Course)">OK</v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// import TeacherService from '@/services/TeacherService'
import CourseService from '@/services/CourseService'
export default {
  data () {
    return {
      Course: {
        name: '',
        courseCode: '',
        numberOfLessons: '',
        semester: ''
      }
    }
  },
  methods: {
    async createCourse () {
      try {
        let newCourse = {
          name: this.Course.name,
          courseCode: this.Course.courseCode,
          numberOfLessons: this.Course.numberOfLessons,
          semester: this.Course.semester
        }
        let response = await CourseService.createCourse(newCourse)
        if (response.success == true) {
          window.alert('Course successfully registered')
          this.Course = {
          name: '',
          courseCode: '',
          numberOfLessons: '',
          semester: ''
        } 
        }
      } catch (error) {
        window.alert(error)
      }
    }
  }
}
</script>
<style>
</style>
