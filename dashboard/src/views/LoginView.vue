<template>

  <v-container grid-list-xl>
    <v-layout row wrap>
      <v-flex xs6 offset-xs3>
        <v-card>
          <v-card-text>
            <form>
              <v-text-field
                v-model="email"
                :error-messages="emailErrors"
                label="E-mail"
                required
                @input="$v.email.$touch()"
                @blur="$v.email.$touch()"
              ></v-text-field>
              <v-text-field
                :type="'password'"
                v-model="password"
                :error-messages="passwordErrors"
                label="Κωδικός"
                required
                @input="$v.password.$touch()"
                @blur="$v.password.$touch()"
              ></v-text-field>
              <v-btn :disabled="disabledButton" :loading="loading" @click="login">Είσοδος</v-btn>
              <v-btn @click="forgotPassword">Απωλεια Κωδικου</v-btn>
              <v-alert :value="showAlert" :type="alertType" transition="scale-transition"> {{alertMessage}} </v-alert>
            </form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, email } from 'vuelidate/lib/validators'
import UserService from '@/services/UserService.js'
import util from '@/utils/util.js'

export default {
  mixins: [validationMixin],

  validations: {
    email: { required, email },
    password: { required, minLength: minLength(8) }
  },

  data: () => ({
    loading: false,
    email: 'example@example.com',
    password: '12345678',
    showAlert: false,
    alertMessage: '',
    alertType: 'info'
  }),

  computed: {
    disabledButton () {
      return !(this.emailErrors.length === 0 && this.passwordErrors.length === 0)
    },
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Λάθος είδος email')
      !this.$v.email.required && errors.push('Το πεδίο απαιτείται')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.minLength && errors.push('Ο κωδικός δε μπορεί να είναι μικρότερος από 8 χαρακτήρες')
      !this.$v.password.required && errors.push('Το πεδίο απαιτείται')
      return errors
    }
  },
  methods: {
    async login () {
      this.showAlert = false
      this.loading = true
      try {
        let user = await UserService.login(this.email, this.password)
        this.alertMessage = 'Είσοδος επιτυχής!'
        this.alertType = 'success'
        this.showAlert = true
        await util.sleep(900)
        this.$store.commit('setUser', user)
        this.$store.commit('setToken', user.token)
        if (this.$store.getters.user.userType === 'καθηγητής') {
          this.$router.push('/teacherView')
        } else if (this.$store.getters.user.userType === 'γραμματέας') {
          this.$router.push('/grammateia')
        } else {
          this.$router.push('/')
        }
      } catch (error) {
        console.log(`${error}`)
        this.alertMessage = `${error}`
        this.alertType = 'error'
        await util.sleep(900)
      } finally {
        this.showAlert = true
        this.loading = false
      }
    },
    async forgotPassword () {
      this.showAlert = false
      this.loading = true
      try {
        this.alertMessage = 'Παρακαλώ επικοινωνήστε με τη γραμματεία'
        this.alertType = 'info'
      } finally {
        this.showAlert = true
        this.loading = false
      }
    }
  }
}
</script>
