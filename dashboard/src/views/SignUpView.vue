<template>
  <v-flex xs6 offset-xs3 pb-5 mb-5>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="firstname"
        :counter="30"
        :rules="nameRules"
        label="First Name"
        required
      ></v-text-field>

      <v-text-field v-model="lastname" :counter="30" :rules="nameRules" label="Last Name" required></v-text-field>

      <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>

      <v-text-field
      :type="'password'"
      v-model="password"
      :error-messages="passwordErrors"
      label="Κωδικός"
      required
      @input="$v.password.$touch()"
      @blur="$v.password.$touch()"
    ></v-text-field>
    <v-text-field
      :type="'password'"
      v-model="password"
      :error-messages="passwordErrors"
      label="Επαλήθευση Κωδικού"
      required
      @input="$v.password.$touch()"
      @blur="$v.password.$touch()"
    ></v-text-field>

      <v-select
        v-model="select"
        :items="items"
        :rules="[v => !!v || 'Usertype is required']"
        label="Usertype"
        required
      ></v-select>
      <v-menu
        ref="menu"
        :close-on-content-click="false"
        v-model="menu"
        :nudge-right="40"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        min-width="290px"
      >
      </v-menu>

      <v-checkbox
        v-model="checkbox"
        :rules="[v => !!v || 'You must agree to continue!']"
        label="Do you agree?"
        required
      ></v-checkbox>

      <v-btn round :disabled="!valid" color="success" @click="validate">Validate</v-btn>
    </v-form>
  </v-flex>
</template>

<script>
import UserService from '@/services/UserService.js'
export default {
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    modal: false,
    valid: false,
    firstname: '',
    lastname: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 30) || 'Name must be less than 30 characters'
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid'
    ],
    select: null,
    items: [
      'σπουδαστής',
      'γραμματέας',
      'καθηγητής'
    ],
    age: '',
    ageRules: [
      v => !!v || 'Age is required',
      v => (v && v > 16) || 'You should be over 16 years old'
    ],

    passwordRules: [
      v => !!v || 'Password is required',
      v => (v && v >= 8) || 'Password must be at least 8 characters long'
    ],
    checkbox: false,
    User: {
      Name: '',
      Surname: '',
      Email: this.Name.substring(0, 4) + '.' + this.Surname.substring(0, 4) + '@tei.edu',
      Password: '',
      userType: ''
    }
  }),
  watch: {
    menu (val) {
      val && this.$nextTick(() => (this.$refs.picker.activePicker = 'YEAR'))
    }
  },

  methods: {
    validate () {
      if (this.$refs.form.validate()) {
        console.log('validated')
      }
    },
    save (date) {
      this.$refs.menu.save(date)
    },
    async addNewUser () {
      try {
        this.user = await UserService.register
      } catch (error) {
        window.alert(error)
      }
    }
  }
}
</script>
