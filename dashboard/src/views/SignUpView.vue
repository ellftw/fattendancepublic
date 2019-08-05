<template>
  <v-form>
    <v-container>
      <v-layout row wrap>

        <v-flex xs6 offset-xs3>
          <v-text-field
          v-model="newUser.email"
          label="E-mail"
          placeholder="something@tei.edu"
          ></v-text-field>
          <v-text-field
            v-model="newUser.password"
            :append-icon="show1 ? 'visibility' : 'visibility_off'"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Password"
            hint="At least 8 characters"
            counter
            @click:append="show1 = !show1"
          ></v-text-field>
          <v-text-field
            :append-icon="show4 ? 'visibility' : 'visibility_off'"
            :rules="[rules.required, rules.emailMatch]"
            :type="show4 ? 'text' : 'password'"
            name="input-10-2"
            label="Repeat Password"
            hint="At least 8 characters"
            error
            @click:append="show4 = !show4"
          ></v-text-field>
          <v-text-field
          v-model="newUser.name"
          label="Name"
          placeholder="John"
          ></v-text-field>
          <v-text-field
          v-model="newUser.surname"
          label="Surname"
          placeholder="Doe"
          ></v-text-field>
          <v-select
              v-model="newUser.userType"
              :items="userType"
              :rules="rules.animal"
              label="User Type"
              required
            ></v-select>
            <v-btn round @click="createNewUser(newUser)">Submit User</v-btn>
        </v-flex>

      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
import UserService from '@/services/UserService'
  export default {
    data () {
      return {
        show1: false,
        show4: false,
        rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          emailMatch: () => ('The email and password you entered don\'t match')
        },
        userType:[
          'σπουδαστής', 'καθηγητής', 'γραμματέας'
        ],
        newUser: {
          email: '',
          password: '',
          name: '',
          surname: '',
          userType: ''
        }
      }
    },
    methods: {
      async createNewUser () {
        let nu = {
          email: this.newUser.email,
          password: this.newUser.password,
          name: this.newUser.name,
          surname: this.newUser.surname,
          userType: this.newUser.userType
        }
        console.log(nu)
        await UserService.register(nu)
      }
    }
  }
</script>