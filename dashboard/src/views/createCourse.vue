<template>
  <v-container>
    <v-layout xs10 offset-xs1>
      <v-flex xs6 offset-xs3>
        <form>
          <v-text-field
            v-model="name"
            :error-messages="nameErrors"
            label="Name"
            required
            @input="$v.name.$touch()"
            @blur="$v.name.$touch()"
          ></v-text-field>
          <v-text-field
            v-model="CourseCode"
            :error-messages="emailErrors"
            label="CourseCode"
            required
            @input="$v.email.$touch()"
            @blur="$v.email.$touch()"
          ></v-text-field>
          <v-text-field
            v-model="NumberOfLessons"
            :error-messages="selectErrors"
            label="Number Of Lessons"
            required
            @change="$v.select.$touch()"
            @blur="$v.select.$touch()"
          ></v-text-field>
          <v-btn round @click="createCourseForTeacher()">Cancel</v-btn>
          <!-- v-if submit true href teacherview -->
          <v-btn round>OK</v-btn>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import TeacherService from '@/services/TeacherService'
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
    async createCourseForTeacher (course) {
      try {
        await TeacherService.createCourseForTeacher(this.Course)
      } catch (error) {
        window.alert(error)
      }
    }
  }
}
</script>
<style>
</style>
