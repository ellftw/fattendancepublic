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
            @click:append="show1 = !show1"
          ></v-text-field>
          <v-text-field
            :append-icon="show4 ? 'visibility' : 'visibility_off'"
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
             <v-layout row justify-start>
              <v-dialog v-model="dialog" persistent max-width="290">
                <template v-slot:activator="{ on }">
                  <v-btn round dark v-on="on">Δημιουργια</v-btn>
                </template>
                <v-card>
                  <v-card-title class="headline">Δημιουργια νεου μαθηματος</v-card-title>
                  <v-card-text>Ειστε σιγουροι οτι τα στοιχεια του μαθηματος ειναι σωστα και οτι θελετε να δημιουργησετε αυτο το μαθημα;
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="pink darken-1" flat @click="dialog = false">Disagree</v-btn>
                    <v-btn color="pink darken-1" flat @click="createNewUser(newUser)">Agree</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
import UserService from '@/services/UserService'
// import TeacherService from '@/services/TeacherService'
// import StudentService from '@/services/StudentService'
export default {
  data () {
    return {
      show1: false,
      show4: false,
      dialog: false,
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters',
        emailMatch: () => ('The email and password you entered don\'t match')
      },
      userType: [
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
      let response = await UserService.register(nu)
      if (response.success === true) {
        this.newUser = {
          email: '',
          password: '',
          name: '',
          surname: '',
          userType: ''
        }
        this.dialog = false
      }
    }
  }
}
</script>
