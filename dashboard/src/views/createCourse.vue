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
            v-model="SubjectCode"
            :error-messages="emailErrors"
            label="SubjectCode"
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
          <v-btn round href="/">Cancel</v-btn>
          <!-- v-if submit true href teacherview -->
          <v-btn round>OK</v-btn>
        </form>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs6>
        <v-date-picker v-model="dates" multiple></v-date-picker>
      </v-flex>
      <v-flex xs6>
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="dates"
          min-width="290px"
        >
          <v-combobox
            v-model="dates"
            multiple
            chips
            small-chips
            label="Multiple picker in menu"
            prepend-icon="event"
          ></v-combobox>
        </v-menu>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import UserService from '@/services/UserService'
export default {
  data: () => ({
    dates: ['2018-09-15", "2018-09-20'],
    menu: true,

  }),
  methods: {

  }
}
</script>
<style>
</style>
